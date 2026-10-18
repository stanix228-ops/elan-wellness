import { SERVICES_CATALOG, type WellnessService } from '@/config/services';
import { SPECIALISTS_CATALOG, type SpecialistProfile } from '@/config/specialists';

export interface TimeSlot {
  time: string;
  period: 'Утро' | 'День' | 'Вечер';
  available: boolean;
  reason?: string;
}

export interface BookingContactErrors {
  guestName?: string;
  guestPhone?: string;
  consentAccepted?: string;
}

export type BookingStatus = 'new' | 'confirmed' | 'completed' | 'cancelled';

export interface TelegramSettings {
  botToken: string;
  chatId: string;
  enabled: boolean;
}

export interface DemoBookingRecord {
  referenceCode: string;
  createdAtIso: string;
  serviceId: string;
  serviceTitle: string;
  durationMinutes: number;
  price: number;
  specialistId: string; // 'any' or specialist ID
  specialistName: string;
  dateIso: string; // YYYY-MM-DD
  dateFormatted: string;
  timeSlot: string;
  guestName: string;
  guestPhone: string;
  guestComment: string;
  atmospherePreference: 'silence' | 'ambient' | 'undecided';
  status?: BookingStatus;
  isDemoOnly: true;
}

export interface DemoCertificateRequest {
  referenceCode: string;
  createdAtIso: string;
  tierId: string;
  tierTitle: string;
  amountLabel: string;
  format: 'electronic' | 'linen-envelope';
  recipientName: string;
  buyerName: string;
  buyerPhone: string;
  personalMessage: string;
}

const BOOKINGS_STORAGE_KEY_V2 = 'elan_wellness_bookings_v2';
const BOOKINGS_STORAGE_KEY_V1 = 'elan_wellness_demo_bookings_v1';
const CERTIFICATES_STORAGE_KEY = 'elan_wellness_demo_certificates_v1';
const TELEGRAM_SETTINGS_KEY = 'elan_wellness_telegram_settings_v1';
const ADMIN_AUTH_KEY = 'elan_wellness_admin_auth_v1';

/**
 * Возвращает локальную дату в формате YYYY-MM-DD без смещения часового пояса
 */
export function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseLocalIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function isPastDate(isoDate: string, todayDate: Date = new Date()): boolean {
  const todayIso = toLocalIsoDate(todayDate);
  return isoDate < todayIso;
}

export function formatHumanDate(isoDate: string): string {
  if (!isoDate) return '';
  const date = parseLocalIsoDate(isoDate);
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
}

/**
 * Централизованный генератор демонстрационных слотов расписания.
 * Архитектурно выделен в чистую функцию, которую на продакшене заменяет запрос к API CRM (YCLIENTS / Bnovo / собственному backend).
 */
export function generateDemoTimeSlots(params: {
  dateIso: string;
  serviceId: string;
  specialistId: string; // 'any' | specialist.id
}): {
  slots: TimeSlot[];
  isSpecialistDayOff: boolean;
  scheduleNote: string;
} {
  const { dateIso, serviceId, specialistId } = params;
  if (!dateIso || isPastDate(dateIso)) {
    return {
      slots: [],
      isSpecialistDayOff: false,
      scheduleNote: 'Выберите актуальную дату в календаре.',
    };
  }

  const dateObj = parseLocalIsoDate(dateIso);
  const dayOfWeek = dateObj.getDay(); // 0..6
  const dayOfMonth = dateObj.getDate();

  // Если выбран конкретный мастер, проверяем его демонстрационные рабочие дни
  if (specialistId !== 'any') {
    const specialist = SPECIALISTS_CATALOG.find((s) => s.id === specialistId);
    if (specialist && !specialist.workingDays.includes(dayOfWeek)) {
      return {
        slots: [],
        isSpecialistDayOff: true,
        scheduleNote: `В выбранный день недели ${specialist.name} не ведёт приём в демо-расписании. Выберите другую дату или опцию «Любой доступный мастер».`,
      };
    }
  }

  const baseSchedule: Array<{ time: string; period: TimeSlot['period'] }> = [
    { time: '10:00', period: 'Утро' },
    { time: '10:30', period: 'Утро' },
    { time: '11:00', period: 'Утро' },
    { time: '11:30', period: 'Утро' },
    { time: '12:00', period: 'Утро' },
    { time: '12:30', period: 'Утро' },
    { time: '13:00', period: 'День' },
    { time: '14:00', period: 'День' },
    { time: '15:00', period: 'День' },
    { time: '16:00', period: 'День' },
    { time: '17:00', period: 'День' },
    { time: '18:00', period: 'Вечер' },
    { time: '19:00', period: 'Вечер' },
    { time: '20:00', period: 'Вечер' },
  ];

  // Проверяем уже созданные в текущей сессии демо-записи
  const sessionBookings = getSessionDemoBookings();

  // Детерминированный хеш от даты, услуги и специалиста для реалистичной сетки занятых слотов
  const seedString = `${dateIso}:${serviceId}:${specialistId}`;
  let seed = 0;
  for (let i = 0; i < seedString.length; i++) {
    seed = (seed * 31 + seedString.charCodeAt(i)) % 997;
  }

  const slots: TimeSlot[] = baseSchedule.map((item, idx) => {
    const alreadyBookedInSession = sessionBookings.some(
      (b) =>
        b.dateIso === dateIso &&
        b.timeSlot === item.time &&
        (specialistId === 'any' || b.specialistId === 'any' || b.specialistId === specialistId)
    );

    if (alreadyBookedInSession) {
      return {
        ...item,
        available: false,
        reason: 'Забронировано вами в этой демо-сессии',
      };
    }

    // Детерминированно блокируем несколько слотов в день для демонстрации занятого времени
    const isBlockedByDemoPattern =
      (dayOfMonth + idx * 4 + seed) % 4 === 0 || (dayOfWeek === 6 && (idx === 2 || idx === 8));

    return {
      ...item,
      available: !isBlockedByDemoPattern,
      reason: isBlockedByDemoPattern ? 'Время занято (демо-расписание)' : undefined,
    };
  });

  return {
    slots,
    isSpecialistDayOff: false,
    scheduleNote:
      'Тестовое расписание: слоты формируются алгоритмом для демонстрации интерфейса. Между сеансами автоматически заложено 25 минут тишины.',
  };
}

export function getSpecialistsForService(serviceId: string): SpecialistProfile[] {
  if (!serviceId) return SPECIALISTS_CATALOG;
  return SPECIALISTS_CATALOG.filter((sp) => sp.serviceIds.includes(serviceId));
}

export function getServiceById(serviceId: string): WellnessService | undefined {
  return SERVICES_CATALOG.find((s) => s.id === serviceId);
}

export function formatRussianPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';

  let normalized = digits;
  if (normalized.startsWith('8')) {
    normalized = '7' + normalized.slice(1);
  } else if (!normalized.startsWith('7')) {
    normalized = '7' + normalized;
  }

  normalized = normalized.slice(0, 11);

  const p1 = normalized.slice(1, 4);
  const p2 = normalized.slice(4, 7);
  const p3 = normalized.slice(7, 9);
  const p4 = normalized.slice(9, 11);

  let result = '+7';
  if (p1) result += ` (${p1}`;
  if (p1.length === 3 && (p2 || raw.length > 6)) result += ')';
  if (p2) result += ` ${p2}`;
  if (p3) result += `-${p3}`;
  if (p4) result += `-${p4}`;

  return result;
}

export function validateBookingContacts(input: {
  guestName: string;
  guestPhone: string;
  consentAccepted: boolean;
}): { isValid: boolean; errors: BookingContactErrors } {
  const errors: BookingContactErrors = {};
  const trimmedName = input.guestName.trim();
  const phoneDigits = input.guestPhone.replace(/\D/g, '');

  if (trimmedName.length < 2) {
    errors.guestName = 'Укажите ваше имя (не менее 2 символов), чтобы мы знали, как к вам обращаться.';
  }

  if (phoneDigits.length < 11) {
    errors.guestPhone = 'Введите полный номер телефона в формате +7 (999) 000-00-00 для связи с администратором.';
  }

  if (!input.consentAccepted) {
    errors.consentAccepted =
      'Необходимо подтвердить согласие на обработку персональных данных для формирования заявки.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateDemoReferenceCode(prefix = 'ELAN'): string {
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `#${prefix}${randomPart}`;
}

export function getSessionDemoBookings(): DemoBookingRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    // 1. Проверяем персистентный localStorage
    const rawV2 = window.localStorage.getItem(BOOKINGS_STORAGE_KEY_V2);
    if (rawV2) {
      const parsed = JSON.parse(rawV2) as DemoBookingRecord[];
      return parsed.map((item) => ({
        ...item,
        status: item.status || 'new',
      }));
    }

    // 2. Фоллбек / миграция из старого sessionStorage
    const rawV1 = window.sessionStorage.getItem(BOOKINGS_STORAGE_KEY_V1);
    if (rawV1) {
      const parsed = JSON.parse(rawV1) as DemoBookingRecord[];
      const normalized = parsed.map((item) => ({
        ...item,
        status: item.status || 'new',
      }));
      window.localStorage.setItem(BOOKINGS_STORAGE_KEY_V2, JSON.stringify(normalized));
      return normalized;
    }

    return [];
  } catch {
    return [];
  }
}

export function saveSessionDemoBooking(record: DemoBookingRecord): DemoBookingRecord[] {
  const normalizedRecord: DemoBookingRecord = {
    ...record,
    status: record.status || 'new',
  };

  if (typeof window === 'undefined') return [normalizedRecord];

  try {
    const existing = getSessionDemoBookings();
    const updated = [normalizedRecord, ...existing.filter((b) => b.referenceCode !== normalizedRecord.referenceCode)];
    
    // Сохраняем в оба хранилища для надёжности
    window.localStorage.setItem(BOOKINGS_STORAGE_KEY_V2, JSON.stringify(updated));
    window.sessionStorage.setItem(BOOKINGS_STORAGE_KEY_V1, JSON.stringify(updated));

    // Проигрываем ненавязчивый звуковой сигнал
    playNewBookingChime();

    // Если подключён Telegram-бот студии — отправляем мгновенное уведомление
    sendTelegramBookingNotification(normalizedRecord).catch(() => {
      // Игнорируем сетевые сбои в фоновом режиме
    });

    return updated;
  } catch {
    return [normalizedRecord];
  }
}

export function updateBookingStatus(
  referenceCode: string,
  newStatus: BookingStatus
): DemoBookingRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const list = getSessionDemoBookings();
    const updated = list.map((item) =>
      item.referenceCode === referenceCode ? { ...item, status: newStatus } : item
    );
    window.localStorage.setItem(BOOKINGS_STORAGE_KEY_V2, JSON.stringify(updated));
    window.sessionStorage.setItem(BOOKINGS_STORAGE_KEY_V1, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function deleteBooking(referenceCode: string): DemoBookingRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const list = getSessionDemoBookings();
    const updated = list.filter((item) => item.referenceCode !== referenceCode);
    window.localStorage.setItem(BOOKINGS_STORAGE_KEY_V2, JSON.stringify(updated));
    window.sessionStorage.setItem(BOOKINGS_STORAGE_KEY_V1, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearAllBookings(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(BOOKINGS_STORAGE_KEY_V2);
    window.sessionStorage.removeItem(BOOKINGS_STORAGE_KEY_V1);
  } catch {
    // ignore
  }
}

export function getNewBookingsCount(bookings: DemoBookingRecord[]): number {
  return bookings.filter((b) => !b.status || b.status === 'new').length;
}

export function saveSessionCertificateRequest(record: DemoCertificateRequest): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.sessionStorage.getItem(CERTIFICATES_STORAGE_KEY);
    const existing = raw ? (JSON.parse(raw) as DemoCertificateRequest[]) : [];
    window.sessionStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify([record, ...existing]));
  } catch {
    // ignore storage errors in restricted environments
  }
}

/**
 * Настройки Telegram-уведомлений
 */
export function getTelegramSettings(): TelegramSettings {
  if (typeof window === 'undefined') {
    return { botToken: '', chatId: '', enabled: false };
  }
  try {
    const raw = window.localStorage.getItem(TELEGRAM_SETTINGS_KEY);
    if (!raw) return { botToken: '', chatId: '', enabled: false };
    return JSON.parse(raw) as TelegramSettings;
  } catch {
    return { botToken: '', chatId: '', enabled: false };
  }
}

export function saveTelegramSettings(settings: TelegramSettings): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(TELEGRAM_SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

/**
 * Формирует читаемое текстовое сообщение для Telegram
 */
export function formatTelegramBookingMessage(booking: DemoBookingRecord): string {
  const lines = [
    '🌿 *НОВАЯ ЗАПИСЬ В ÉLAN WELLNESS*',
    '━━━━━━━━━━━━━━━━━━━━',
    `🔖 *Номер записи:* \`${booking.referenceCode}\``,
    `👤 *Гость:* ${booking.guestName}`,
    `📞 *Телефон:* ${booking.guestPhone}`,
    `💆 *Процедура:* ${booking.serviceTitle} (${booking.durationMinutes} мин)`,
    `💰 *Стоимость:* ${booking.price.toLocaleString('ru-RU')} ₸`,
    `📅 *Дата:* ${booking.dateFormatted}`,
    `⏰ *Время:* ${booking.timeSlot}`,
    `🌿 *Специалист:* ${booking.specialistName}`,
  ];

  if (booking.atmospherePreference === 'silence') {
    lines.push('🤫 *Атмосфера:* В полной тишине');
  } else if (booking.atmospherePreference === 'ambient') {
    lines.push('🎵 *Атмосфера:* Мягкий эмбиент');
  }

  if (booking.guestComment) {
    lines.push(`💬 *Пожелания:* ${booking.guestComment}`);
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━');
  const cleanPhone = booking.guestPhone.replace(/\D/g, '');
  if (cleanPhone) {
    lines.push(`📲 [Написать в WhatsApp](https://wa.me/${cleanPhone})`);
  }

  return lines.join('\n');
}

/**
 * Отправляет сообщение в Telegram через официальный Telegram Bot API
 */
export async function sendTelegramNotification(
  text: string,
  overrideSettings?: TelegramSettings
): Promise<{ success: boolean; error?: string }> {
  const settings = overrideSettings || getTelegramSettings();
  if (!settings.enabled || !settings.botToken.trim() || !settings.chatId.trim()) {
    return { success: false, error: 'Telegram-уведомления не настроены или отключены' };
  }

  try {
    const token = settings.botToken.trim();
    const chatId = settings.chatId.trim();
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();
    if (data.ok) {
      return { success: true };
    }
    return { success: false, error: data.description || 'Ошибка Telegram Bot API' };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Сетевая ошибка при отправке в Telegram';
    return { success: false, error: message };
  }
}

export async function sendTelegramBookingNotification(
  booking: DemoBookingRecord
): Promise<{ success: boolean; error?: string }> {
  const text = formatTelegramBookingMessage(booking);
  return sendTelegramNotification(text);
}

/**
 * Генерирует прямую ссылку WhatsApp с вежливым текстом подтверждения
 */
export function getWhatsAppConfirmationUrl(booking: DemoBookingRecord): string {
  const digits = booking.guestPhone.replace(/\D/g, '');
  if (!digits) return '';

  const message = `Здравствуйте, ${booking.guestName}! Вас приветствует студия массажа ÉLAN Wellness. Вы оставили заявку на запись:\n\n• Процедура: ${booking.serviceTitle}\n• Мастер: ${booking.specialistName}\n• Дата: ${booking.dateFormatted}, в ${booking.timeSlot}\n• Стоимость: ${booking.price.toLocaleString('ru-RU')} ₸\n\nПодтверждаем ваш визит? Если есть вопросы или особые пожелания, напишите нам!`;

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/**
 * Авторизация в кабинете администратора (простой и удобный PIN-код, по умолчанию 1234)
 */
export const DEFAULT_ADMIN_PIN = '1234';

export function getAdminAuthStatus(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthStatus(authenticated: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (authenticated) {
      window.sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      window.sessionStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch {
    // ignore
  }
}

/**
 * Воспроизводит мягкий и приятный перелив колокольчика (Web Audio API)
 */
export function playNewBookingChime(): void {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (мажорное арпеджио)
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.5);
    });
  } catch {
    // Web Audio blocked or not supported
  }
}
