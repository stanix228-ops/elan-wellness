import { studioConfig } from '@/config/studioConfig';
import type { DemoBookingRecord } from '@/lib/booking';

/**
 * Парсит дату и время записи и возвращает Date объект в локальном времени
 */
function getBookingDateTime(dateIso: string, timeSlot: string): { start: Date; end: Date } {
  const [year, month, day] = dateIso.split('-').map(Number);
  const [hours, minutes] = timeSlot.split(':').map(Number);

  const start = new Date(year, month - 1, day, hours, minutes, 0);
  const end = new Date(start.getTime() + 90 * 60 * 1000); // 90 минут с учётом подготовки и отдыха

  return { start, end };
}

/**
 * Форматирует дату в формат UTC iCalendar (YYYYMMDDTHHmmssZ)
 */
function formatIcsUtcDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Форматирует дату для ссылки Google Calendar (YYYYMMDDTHHmmss)
 */
function formatGoogleDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  return `${y}${m}${d}T${h}${min}${s}`;
}

/**
 * Генерирует файл iCalendar (.ics) для добавления в Apple Calendar, Google Calendar, Outlook
 */
export function downloadIcsCalendar(booking: DemoBookingRecord): void {
  const { start, end } = getBookingDateTime(booking.dateIso, booking.timeSlot);
  const startUtc = formatIcsUtcDate(start);
  const endUtc = formatIcsUtcDate(end);
  const nowUtc = formatIcsUtcDate(new Date());

  const eventTitle = `${studioConfig.brand.name}: ${booking.serviceTitle}`;
  const description = [
    `Запись ${booking.referenceCode}`,
    `Процедура: ${booking.serviceTitle} (${booking.durationMinutes} мин)`,
    `Специалист: ${booking.specialistName}`,
    `Гость: ${booking.guestName} (${booking.guestPhone})`,
    `Адрес: ${studioConfig.contacts.address}`,
    `Телефон: ${studioConfig.contacts.phone}`,
    `Примечание: Пожалуйста, приезжайте за 10–15 минут до начала для спокойного чаепития и настройки.`,
  ].join('\\n');

  const location = `${studioConfig.brand.name}, ${studioConfig.contacts.address}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ELAN Wellness//Booking System//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:booking-${booking.referenceCode}-${Date.now()}@elan-wellness`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${eventTitle}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Напоминание о записи в ÉLAN Wellness через 2 часа',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `elan-booking-${booking.referenceCode.replace(/[^a-zA-Z0-9_-]/g, '')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Создаёт прямую ссылку на добавление события в веб-интерфейс Google Calendar
 */
export function getGoogleCalendarUrl(booking: DemoBookingRecord): string {
  const { start, end } = getBookingDateTime(booking.dateIso, booking.timeSlot);
  const startStr = formatGoogleDate(start);
  const endStr = formatGoogleDate(end);

  const title = encodeURIComponent(`${studioConfig.brand.name}: ${booking.serviceTitle}`);
  const details = encodeURIComponent(
    `Запись ${booking.referenceCode}\n` +
      `Процедура: ${booking.serviceTitle} (${booking.durationMinutes} мин)\n` +
      `Специалист: ${booking.specialistName}\n` +
      `Гость: ${booking.guestName}\n` +
      `Телефон студии: ${studioConfig.contacts.phone}`
  );
  const location = encodeURIComponent(`${studioConfig.brand.name}, ${studioConfig.contacts.address}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
}
