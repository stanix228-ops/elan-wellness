import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isPastDate, parseLocalIsoDate, toLocalIsoDate } from '@/lib/booking';

export interface CalendarProps {
  value: string; // YYYY-MM-DD
  onChange: (isoDate: string) => void;
  isDateDisabled?: (isoDate: string, dateObj: Date) => boolean;
  className?: string;
}

const WEEKDAYS_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTHS_RU = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

/**
 * Доступный календарь выбора даты (по анатомии Astryx Calendar & shadcn Calendar).
 * Блокирует прошедшие даты, отмечает сегодняшний день и поддерживает навигацию по месяцам.
 */
export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  isDateDisabled,
  className,
}) => {
  const today = React.useMemo(() => new Date(), []);
  const todayIso = React.useMemo(() => toLocalIsoDate(today), [today]);

  const initialDate = React.useMemo(
    () => (value ? parseLocalIsoDate(value) : today),
    [value, today]
  );

  const [viewYear, setViewYear] = React.useState<number>(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = React.useState<number>(initialDate.getMonth());

  const canGoPrevMonth =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const handlePrevMonth = () => {
    if (!canGoPrevMonth) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Генерируем дни месяца (неделя начинается с понедельника)
  const calendarCells = React.useMemo(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    // Преобразуем 0 (Вс) .. 6 (Сб) в 0 (Пн) .. 6 (Вс)
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

    const cells: Array<{
      iso: string | null;
      dayNumber: number | null;
      dateObj?: Date;
    }> = [];

    for (let i = 0; i < startOffset; i++) {
      cells.push({ iso: null, dayNumber: null });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(viewYear, viewMonth, day);
      const iso = toLocalIsoDate(dateObj);
      cells.push({ iso, dayNumber: day, dateObj });
    }

    return cells;
  }, [viewYear, viewMonth]);

  return (
    <div
      className={cn(
        'astryx-calendar rounded-2xl border border-[#E5E0D5] bg-[#F7F4ED]/65 p-4 sm:p-5',
        className
      )}
      role="group"
      aria-label="Календарь выбора даты визита"
    >
      {/* Month header */}
      <div className="flex items-center justify-between pb-4 mb-3 border-b border-[#E5E0D5]">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={!canGoPrevMonth}
          aria-label="Предыдущий месяц"
          className="astryx-calendar-nav inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E0D5] bg-[#FFFCF6] text-[#292A23] transition-colors hover:border-[#667052] disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div
          className="font-serif text-xl sm:text-2xl font-medium text-[#292A23]"
          aria-live="polite"
        >
          {MONTHS_RU[viewMonth]} {viewYear}
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          aria-label="Следующий месяц"
          className="astryx-calendar-nav inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E0D5] bg-[#FFFCF6] text-[#292A23] transition-colors hover:border-[#667052] cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {WEEKDAYS_RU.map((dayName) => (
          <div
            key={dayName}
            className="py-1 text-xs font-medium uppercase tracking-wider text-[#77776B]"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* 7-column day grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {calendarCells.map((cell, index) => {
          if (!cell.iso || !cell.dayNumber || !cell.dateObj) {
            return <div key={`empty-${index}`} className="h-10 sm:h-11" aria-hidden="true" />;
          }

          const past = isPastDate(cell.iso, today);
          const customDisabled = isDateDisabled
            ? isDateDisabled(cell.iso, cell.dateObj)
            : false;
          const disabled = past || customDisabled;
          const isSelected = value === cell.iso;
          const isToday = cell.iso === todayIso;

          return (
            <button
              key={cell.iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(cell.iso!)}
              aria-pressed={isSelected}
              aria-label={`${cell.dayNumber} ${MONTHS_RU[viewMonth]} ${viewYear}${
                isToday ? ', сегодня' : ''
              }${disabled ? ', недоступно' : ''}`}
              className={cn(
                'astryx-calendar-day relative flex h-10 sm:h-11 w-full items-center justify-center rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer',
                isSelected
                  ? 'bg-[#667052] text-[#FFFCF6] shadow-sm font-semibold'
                  : disabled
                  ? 'text-[#77776B]/35 cursor-not-allowed line-through decoration-[#77776B]/30'
                  : 'bg-[#FFFCF6] text-[#292A23] border border-transparent hover:border-[#667052]/50 hover:bg-[#EFECE4]',
                isToday && !isSelected && 'border-[#C6B99F] font-semibold'
              )}
            >
              <span>{cell.dayNumber}</span>
              {isToday && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-1.5 h-1 w-1 rounded-full',
                    isSelected ? 'bg-[#FFFCF6]' : 'bg-[#667052]'
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
