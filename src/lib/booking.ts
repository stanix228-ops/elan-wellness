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

const BOOKINGS_STORAGE_KEY = 'elan_wellness_demo_bookings_v1';
const CERTIFICATES_STORAGE_KEY = 'elan_wellness_demo_certificates_v1';

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
    const raw = window.sessionStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DemoBookingRecord[];
  } catch {
    return [];
  }
}

export function saveSessionDemoBooking(record: DemoBookingRecord): DemoBookingRecord[] {
  if (typeof window === 'undefined') return [record];
  try {
    const existing = getSessionDemoBookings();
    const updated = [record, ...existing];
    window.sessionStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [record];
  }
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
