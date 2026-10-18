import * as React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  CalendarPlus,
  Check,
  Clock,
  Download,
  ExternalLink,
  Info,
  Loader2,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  SERVICES_CATALOG,
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from '@/config/services';
import { SPECIALISTS_CATALOG } from '@/config/specialists';
import { studioConfig } from '@/config/studioConfig';
import {
  formatHumanDate,
  formatRussianPhoneInput,
  generateDemoReferenceCode,
  generateDemoTimeSlots,
  getServiceById,
  getSpecialistsForService,
  saveSessionDemoBooking,
  toLocalIsoDate,
  validateBookingContacts,
  type BookingContactErrors,
  type DemoBookingRecord,
} from '@/lib/booking';
import { downloadIcsCalendar, getGoogleCalendarUrl } from '@/lib/calendarExport';
import { cn, formatPrice } from '@/lib/utils';

export interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialServiceId?: string | null;
  initialSpecialistId?: string | null;
  onBookingCreated?: (record: DemoBookingRecord) => void;
  onOpenPrivacyPolicy?: () => void;
}

type BookingStep = 1 | 2 | 3 | 4 | 5 | 6;

const STEP_LABELS: Array<{ step: BookingStep; title: string; short: string }> = [
  { step: 1, title: 'Выберите услугу', short: 'Услуга' },
  { step: 2, title: 'Выберите специалиста', short: 'Специалист' },
  { step: 3, title: 'Выберите дату', short: 'Дата' },
  { step: 4, title: 'Выберите время', short: 'Время' },
  { step: 5, title: 'Ваши данные', short: 'Контакты' },
  { step: 6, title: 'Подтверждение', short: 'Итог' },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onOpenChange,
  initialServiceId,
  initialSpecialistId,
  onBookingCreated,
  onOpenPrivacyPolicy,
}) => {
  // По умолчанию выбираем завтрашний день
  const defaultDateIso = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toLocalIsoDate(d);
  }, []);

  const [step, setStep] = React.useState<BookingStep>(1);
  const [categoryFilter, setCategoryFilter] = React.useState<ServiceCategory>('all');
  const [serviceId, setServiceId] = React.useState<string>(
    initialServiceId || SERVICES_CATALOG[0].id
  );
  const [specialistId, setSpecialistId] = React.useState<string>(
    initialSpecialistId || 'any'
  );
  const [dateIso, setDateIso] = React.useState<string>(defaultDateIso);
  const [timeSlot, setTimeSlot] = React.useState<string>('');
  const [guestName, setGuestName] = React.useState<string>('');
  const [guestPhone, setGuestPhone] = React.useState<string>('');
  const [guestComment, setGuestComment] = React.useState<string>('');
  const [atmospherePreference, setAtmospherePreference] = React.useState<
    'silence' | 'ambient' | 'undecided'
  >('undecided');
  const [consentAccepted, setConsentAccepted] = React.useState<boolean>(false);

  const [contactErrors, setContactErrors] = React.useState<BookingContactErrors>({});
  const [stepError, setStepError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [completedBooking, setCompletedBooking] =
    React.useState<DemoBookingRecord | null>(null);
  const [calendarMenuOpen, setCalendarMenuOpen] = React.useState(false);

  const errorSummaryRef = React.useRef<HTMLDivElement | null>(null);

  // Синхронизация при открытии модального окна
  React.useEffect(() => {
    if (!open) return;

    setCompletedBooking(null);
    setStepError(null);
    setContactErrors({});
    setIsSubmitting(false);
    setCalendarMenuOpen(false);

    if (initialServiceId && initialSpecialistId) {
      setServiceId(initialServiceId);
      setSpecialistId(initialSpecialistId);
      setStep(3);
    } else if (initialServiceId) {
      setServiceId(initialServiceId);
      const allowed = getSpecialistsForService(initialServiceId);
      if (
        specialistId !== 'any' &&
        !allowed.some((sp) => sp.id === specialistId)
      ) {
        setSpecialistId('any');
      }
      setStep(2);
    } else if (initialSpecialistId) {
      setSpecialistId(initialSpecialistId);
      const sp = SPECIALISTS_CATALOG.find((s) => s.id === initialSpecialistId);
      if (sp && !sp.serviceIds.includes(serviceId)) {
        setServiceId(sp.serviceIds[0] || SERVICES_CATALOG[0].id);
      }
      setStep(1);
    } else {
      setStep(1);
    }
  }, [open, initialServiceId, initialSpecialistId]);

  const selectedService = React.useMemo(
    () => getServiceById(serviceId) || SERVICES_CATALOG[0],
    [serviceId]
  );

  const compatibleSpecialists = React.useMemo(
    () => getSpecialistsForService(selectedService.id),
    [selectedService.id]
  );

  const selectedSpecialistObj = React.useMemo(
    () => SPECIALISTS_CATALOG.find((s) => s.id === specialistId),
    [specialistId]
  );

  const specialistDisplayName = React.useMemo(() => {
    if (specialistId === 'any') {
      return 'Любой свободный специалист';
    }
    return selectedSpecialistObj?.name || 'Любой свободный специалист';
  }, [specialistId, selectedSpecialistObj]);

  // Слоты времени для выбранной даты и мастера
  const { slots, isSpecialistDayOff, scheduleNote } = React.useMemo(
    () =>
      generateDemoTimeSlots({
        dateIso,
        serviceId: selectedService.id,
        specialistId,
      }),
    [dateIso, selectedService.id, specialistId]
  );

  // Сброс выбранного слота, если он стал недоступен
  React.useEffect(() => {
    if (!timeSlot) return;
    const found = slots.find((s) => s.time === timeSlot && s.available);
    if (!found) {
      setTimeSlot('');
    }
  }, [slots, timeSlot]);

  const filteredServices = React.useMemo(() => {
    if (categoryFilter === 'all') return SERVICES_CATALOG;
    return SERVICES_CATALOG.filter((s) => s.category === categoryFilter);
  }, [categoryFilter]);

  const handleNextStep = () => {
    setStepError(null);

    if (step === 1) {
      if (!serviceId) {
        setStepError('Пожалуйста, выберите услугу.');
        return;
      }
      if (
        specialistId !== 'any' &&
        !compatibleSpecialists.some((s) => s.id === specialistId)
      ) {
        setSpecialistId('any');
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!dateIso) {
        setStepError('Пожалуйста, выберите дату визита в календаре.');
        return;
      }
      setStep(4);
      return;
    }

    if (step === 4) {
      if (!timeSlot) {
        setStepError('Пожалуйста, выберите удобное время для записи.');
        return;
      }
      setStep(5);
      return;
    }

    if (step === 5) {
      const validation = validateBookingContacts({
        guestName,
        guestPhone,
        consentAccepted,
      });
      setContactErrors(validation.errors);
      if (!validation.isValid) {
        window.requestAnimationFrame(() => {
          errorSummaryRef.current?.focus();
        });
        return;
      }
      setStep(6);
      return;
    }
  };

  const handlePrevStep = () => {
    setStepError(null);
    if (step > 1) {
      setStep((prev) => (prev - 1) as BookingStep);
    }
  };

  const handleConfirmBooking = () => {
    if (isSubmitting || completedBooking) return;

    const validation = validateBookingContacts({
      guestName,
      guestPhone,
      consentAccepted,
    });
    if (!validation.isValid) {
      setContactErrors(validation.errors);
      setStep(5);
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      const record: DemoBookingRecord = {
        referenceCode: generateDemoReferenceCode(studioConfig.brand.bookingReferencePrefix),
        createdAtIso: new Date().toISOString(),
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        durationMinutes: selectedService.durationMinutes,
        price: selectedService.price,
        specialistId,
        specialistName: specialistDisplayName,
        dateIso,
        dateFormatted: formatHumanDate(dateIso),
        timeSlot,
        guestName: guestName.trim(),
        guestPhone: guestPhone.trim(),
        guestComment: guestComment.trim(),
        atmospherePreference,
        isDemoOnly: true,
      };

      saveSessionDemoBooking(record);
      setIsSubmitting(false);
      setCompletedBooking(record);
      onBookingCreated?.(record);
    }, 600);
  };

  const handleResetAndBookAnother = () => {
    setCompletedBooking(null);
    setTimeSlot('');
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-5 sm:p-8 max-h-[92vh] overflow-y-auto">
        {completedBooking ? (
          /* SUCCESS STATE — ВАША ЗАПИСЬ ПОДТВЕРЖДЕНА */
          <div className="py-2 sm:py-4 space-y-7 animate-fade-up">
            {/* Большая check icon по спецификации */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#667052]/15 text-[#667052] ring-8 ring-[#667052]/10">
              <Check className="h-10 w-10 text-[#667052]" strokeWidth={2.5} aria-hidden="true" />
            </div>

            <div className="text-center space-y-2">
              <DialogTitle className="font-serif text-3xl sm:text-4xl font-normal text-[#292A23]">
                Ваша запись подтверждена
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base text-[#5E5E53] max-w-lg mx-auto">
                Ждём вас в студии {studioConfig.brand.name}. Мы подготовим сьют и подогретые льняные полотенца к вашему приходу.
              </DialogDescription>
            </div>

            {/* Карточка номера записи */}
            <div className="rounded-2xl border border-[#C6B99F]/70 bg-[#FFFCF6] p-5 text-center shadow-sm">
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#77776B]">
                Номер записи
              </span>
              <p className="mt-1 font-mono text-2xl sm:text-3xl font-bold tracking-wider text-[#667052]">
                {completedBooking.referenceCode}
              </p>
            </div>

            {/* Сводная карточка параметров визита */}
            <div className="rounded-2xl border border-[#E5E0D5] bg-[#F7F4ED] p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E5E0D5]">
                <span className="font-serif text-xl font-medium text-[#292A23]">
                  Детали визита
                </span>
                <span className="rounded-full bg-[#667052]/12 border border-[#667052]/30 px-3 py-1 text-xs font-medium text-[#4F5B3E]">
                  Подтверждено
                </span>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs text-[#77776B]">Услуга</dt>
                  <dd className="mt-0.5 font-medium text-[#292A23]">
                    {completedBooking.serviceTitle} ({completedBooking.durationMinutes} мин)
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#77776B]">Специалист</dt>
                  <dd className="mt-0.5 font-medium text-[#292A23]">
                    {completedBooking.specialistName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#77776B]">Дата и время</dt>
                  <dd className="mt-0.5 font-medium text-[#292A23] capitalize">
                    {completedBooking.dateFormatted}, в {completedBooking.timeSlot}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#77776B]">Стоимость</dt>
                  <dd className="mt-0.5 font-semibold text-[#292A23] text-base">
                    {formatPrice(completedBooking.price)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#77776B]">Гость</dt>
                  <dd className="mt-0.5 text-[#292A23]">
                    {completedBooking.guestName} · {completedBooking.guestPhone}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#77776B]">Адрес студии</dt>
                  <dd className="mt-0.5 text-[#292A23]">
                    {studioConfig.contacts.addressLine1}
                  </dd>
                </div>
              </dl>

              {completedBooking.guestComment && (
                <div className="pt-3 border-t border-[#E5E0D5] text-xs text-[#5E5E53]">
                  <span className="font-medium text-[#292A23]">Пожелания: </span>
                  {completedBooking.guestComment}
                </div>
              )}
            </div>

            {/* Блок добавления в календарь */}
            <div className="rounded-xl border border-[#C6B99F]/60 bg-[#EFECE4]/80 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#667052]">
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                <span>Сохраните событие в свой календарь</span>
              </div>
              <p className="text-xs text-[#5E5E53] leading-relaxed">
                Добавьте визит в календарь вашего смартфона или компьютера, чтобы не забыть о записи и получить автоматическое напоминание за 2 часа до начала.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => downloadIcsCalendar(completedBooking)}
                  className="bg-[#FFFCF6] hover:bg-[#667052] hover:text-[#FFFCF6] text-xs gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Скачать .ics (Apple, Outlook)</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(getGoogleCalendarUrl(completedBooking), '_blank')}
                  className="bg-[#FFFCF6] hover:bg-[#667052] hover:text-[#FFFCF6] text-xs gap-1.5"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Google Календарь</span>
                </Button>
              </div>
            </div>

            {/* Главные кнопки завершения: Вернуться на главную + Добавить в календарь */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleResetAndBookAnother}
                className="order-2 sm:order-1 text-xs"
              >
                Оформить ещё одну запись
              </Button>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 order-1 sm:order-2">
                <Button
                  type="button"
                  onClick={() => downloadIcsCalendar(completedBooking)}
                  className="bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] gap-2"
                >
                  <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                  <span>Добавить в календарь</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Вернуться на главную
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* ПОШАГОВЫЙ СЦЕНАРИЙ ОНЛАЙН-ЗАПИСИ (ШАГИ 1–6) */
          <>
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#667052]">
                <span>{studioConfig.brand.name}</span>
                <span aria-hidden="true">·</span>
                <span>Шаг {step} из 6</span>
              </div>
              <DialogTitle className="mt-1 font-serif text-2xl sm:text-3xl text-[#292A23]">
                {STEP_LABELS[step - 1].title}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-[#5E5E53]">
                {step === 1 &&
                  'Выберите подходящую технику массажа. Мастер скорректирует нажим и акценты перед началом сеанса.'}
                {step === 2 &&
                  'Выберите конкретного мастера или опцию «Любой свободный специалист» для максимального выбора времени.'}
                {step === 3 &&
                  'Выберите желаемую дату визита. Прошедшие дни автоматически заблокированы.'}
                {step === 4 &&
                  'Выберите удобное время. Между сеансами мы оставляем 25 минут для проветривания и подготовки сьюта.'}
                {step === 5 &&
                  'Укажите контактные данные для согласования деталей и подтверждения визита.'}
                {step === 6 &&
                  'Проверьте все параметры визита перед окончательным подтверждением.'}
              </DialogDescription>
            </DialogHeader>

            {/* Прогресс-бар с номерами шагов */}
            <nav
              aria-label="Шаги бронирования"
              className="grid grid-cols-6 gap-1.5 sm:gap-2 border-y border-[#E5E0D5] py-2.5 my-2"
            >
              {STEP_LABELS.map((item) => {
                const isCurrent = item.step === step;
                const isDone = item.step < step;
                const isAccessible = item.step <= step;

                return (
                  <button
                    key={item.step}
                    type="button"
                    disabled={!isAccessible}
                    onClick={() => isAccessible && setStep(item.step)}
                    aria-current={isCurrent ? 'step' : undefined}
                    className={cn(
                      'flex flex-col items-center gap-1 rounded-lg py-1 px-1 text-center transition-all cursor-pointer',
                      isCurrent && 'bg-[#667052]/10 text-[#4F5B3E] font-semibold',
                      isDone && 'text-[#667052] hover:bg-[#F7F4ED]',
                      !isAccessible && 'text-[#77776B]/40 cursor-not-allowed opacity-60'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                        isCurrent
                          ? 'bg-[#667052] text-[#FFFCF6]'
                          : isDone
                          ? 'bg-[#EFECE4] text-[#4F5B3E]'
                          : 'bg-[#E5E0D5] text-[#77776B]'
                      )}
                    >
                      {isDone ? <Check className="h-3.5 w-3.5" /> : item.step}
                    </span>
                    <span
                      className={cn(
                        'hidden sm:inline text-[10px] font-medium truncate w-full',
                        isCurrent ? 'text-[#292A23]' : 'text-[#77776B]'
                      )}
                    >
                      {item.short}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Сводка уже выбранных параметров на шагах 2–5 */}
            {step > 1 && step < 6 && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-[#E5E0D5] bg-[#F7F4ED] px-3.5 py-2 text-xs text-[#5E5E53]">
                <span className="font-medium text-[#292A23]">
                  {selectedService.title} ({selectedService.durationMinutes} мин ·{' '}
                  {formatPrice(selectedService.price)})
                </span>
                {step > 2 && (
                  <>
                    <span aria-hidden="true" className="text-[#C6B99F]">
                      •
                    </span>
                    <span>{specialistDisplayName}</span>
                  </>
                )}
                {step > 3 && dateIso && (
                  <>
                    <span aria-hidden="true" className="text-[#C6B99F]">
                      •
                    </span>
                    <span className="capitalize">{formatHumanDate(dateIso)}</span>
                  </>
                )}
                {step > 4 && timeSlot && (
                  <>
                    <span aria-hidden="true" className="text-[#C6B99F]">
                      •
                    </span>
                    <span className="font-semibold text-[#667052]">{timeSlot}</span>
                  </>
                )}
              </div>
            )}

            {/* Ошибка текущего шага */}
            {stepError && (
              <div
                role="alert"
                className="rounded-xl border border-[#B44C3E]/40 bg-[#B44C3E]/10 px-4 py-2.5 text-xs sm:text-sm text-[#8C3327]"
              >
                {stepError}
              </div>
            )}

            {/* ШАГ 1: ВЫБЕРИТЕ УСЛУГУ (Фото, название, описание, длительность, цена) */}
            {step === 1 && (
              <div className="space-y-4">
                <div
                  className="flex flex-wrap gap-1.5"
                  role="tablist"
                  aria-label="Фильтр категорий услуг"
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={categoryFilter === cat.id}
                      onClick={() => setCategoryFilter(cat.id)}
                      className={cn(
                        'rounded-full px-3.5 py-1 text-xs font-medium transition-colors cursor-pointer',
                        categoryFilter === cat.id
                          ? 'bg-[#292A23] text-[#FFFCF6]'
                          : 'bg-[#F7F4ED] text-[#5E5E53] border border-[#E5E0D5] hover:border-[#667052]'
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div
                  className="grid grid-cols-1 gap-2.5 max-h-[46vh] overflow-y-auto pr-1"
                  role="radiogroup"
                  aria-label="Список доступных услуг"
                >
                  {filteredServices.map((srv) => {
                    const isSelected = srv.id === serviceId;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setServiceId(srv.id)}
                        className={cn(
                          'group flex items-center gap-3.5 rounded-2xl border p-3 sm:p-4 text-left transition-all cursor-pointer',
                          isSelected
                            ? 'border-[#667052] bg-[#F7F4ED] ring-1 ring-[#667052]'
                            : 'border-[#E5E0D5] bg-[#FFFCF6] hover:border-[#C6B99F] hover:bg-[#F7F4ED]/60'
                        )}
                      >
                        {/* Фотография услуги по спецификации */}
                        <div className="relative h-16 w-20 sm:h-20 sm:w-24 shrink-0 overflow-hidden rounded-xl border border-[#E5E0D5]">
                          <img
                            src={srv.image}
                            alt={srv.imageAlt}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-serif text-lg sm:text-xl font-medium text-[#292A23] truncate">
                              {srv.title}
                            </span>
                            {srv.featuredNote && (
                              <span className="hidden sm:inline-block rounded-full bg-[#EFECE4] border border-[#C6B99F]/60 px-2 py-0.5 text-[10px] text-[#5E5E53]">
                                {srv.featuredNote}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#5E5E53] line-clamp-1 sm:line-clamp-2">
                            {srv.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-[#77776B] pt-0.5">
                            <span className="inline-flex items-center gap-1 font-medium text-[#667052]">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              {srv.durationMinutes} мин
                            </span>
                            <span>•</span>
                            <span className="font-semibold text-[#292A23]">
                              {formatPrice(srv.price)}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 pl-1">
                          <div
                            className={cn(
                              'flex h-6 w-6 items-center justify-center rounded-full border transition-colors',
                              isSelected
                                ? 'border-[#667052] bg-[#667052] text-[#FFFCF6]'
                                : 'border-[#E5E0D5] bg-transparent text-transparent'
                            )}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ШАГ 2: ВЫБЕРИТЕ СПЕЦИАЛИСТА (Конкретный или "Любой свободный специалист") */}
            {step === 2 && (
              <div
                className="space-y-3 max-h-[50vh] overflow-y-auto pr-1"
                role="radiogroup"
                aria-label="Выбор специалиста"
              >
                {/* Вариант: "Любой свободный специалист" */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={specialistId === 'any'}
                  onClick={() => setSpecialistId('any')}
                  className={cn(
                    'flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all cursor-pointer',
                    specialistId === 'any'
                      ? 'border-[#667052] bg-[#F7F4ED] ring-1 ring-[#667052]'
                      : 'border-[#E5E0D5] bg-[#FFFCF6] hover:border-[#C6B99F]'
                  )}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EFECE4] text-[#667052]">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif text-xl font-medium text-[#292A23]">
                        Любой свободный специалист
                      </span>
                      <span className="rounded-full bg-[#667052]/12 px-2.5 py-0.5 text-[11px] font-medium text-[#4F5B3E]">
                        Больше свободных слотов
                      </span>
                    </div>
                    <p className="text-xs text-[#5E5E53] leading-relaxed">
                      Мы автоматически назначим профильного мастера для ритуала «{selectedService.title}» на выбранное вами время.
                    </p>
                  </div>
                </button>

                {/* Конкретные специалисты */}
                {compatibleSpecialists.map((sp) => {
                  const isSelected = specialistId === sp.id;
                  return (
                    <button
                      key={sp.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSpecialistId(sp.id)}
                      className={cn(
                        'flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all cursor-pointer',
                        isSelected
                          ? 'border-[#667052] bg-[#F7F4ED] ring-1 ring-[#667052]'
                          : 'border-[#E5E0D5] bg-[#FFFCF6] hover:border-[#C6B99F]'
                      )}
                    >
                      <img
                        src={sp.image}
                        alt={sp.imageAlt}
                        className="h-14 w-14 shrink-0 rounded-full object-cover border border-[#E5E0D5]"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-serif text-xl font-medium text-[#292A23]">
                            {sp.name}
                          </span>
                          <span className="text-xs text-[#77776B]">
                            {sp.experienceYears}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-[#667052]">{sp.role}</p>
                        <p className="text-xs text-[#5E5E53] leading-relaxed line-clamp-2">
                          {sp.approach}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ШАГ 3: ВЫБЕРИТЕ ДАТУ (Calendar UI, прошлые даты disabled) */}
            {step === 3 && (
              <div className="space-y-4">
                <Calendar
                  value={dateIso}
                  onChange={(iso) => {
                    setDateIso(iso);
                    setStepError(null);
                  }}
                  isDateDisabled={(_iso, dateObj) => {
                    if (specialistId === 'any' || !selectedSpecialistObj) return false;
                    return !selectedSpecialistObj.workingDays.includes(dateObj.getDay());
                  }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-[#E5E0D5] bg-[#F7F4ED] px-4 py-3 text-xs">
                  <div className="flex items-center gap-2 text-[#292A23]">
                    <CalendarIcon className="h-4 w-4 text-[#667052]" aria-hidden="true" />
                    <span>
                      Выбранная дата:{' '}
                      <strong className="capitalize">{formatHumanDate(dateIso)}</strong>
                    </span>
                  </div>
                  {selectedSpecialistObj && (
                    <span className="text-[#77776B]">
                      Рабочие дни специалиста выделены в календаре
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* ШАГ 4: ВЫБЕРИТЕ ВРЕМЯ (Аккуратная сетка time slots) */}
            {step === 4 && (
              <div className="space-y-4">
                {isSpecialistDayOff ? (
                  <div className="rounded-2xl border border-[#C6B99F] bg-[#F7F4ED] p-5 text-sm text-[#292A23] space-y-3">
                    <p>{scheduleNote}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setStep(3)}
                      >
                        Выбрать другую дату
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setSpecialistId('any')}
                      >
                        Любой свободный специалист
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1">
                      {(['Утро', 'День', 'Вечер'] as const).map((period) => {
                        const periodSlots = slots.filter((s) => s.period === period);
                        if (periodSlots.length === 0) return null;
                        return (
                          <div key={period} className="space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#77776B]">
                              {period}
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
                              {periodSlots.map((slot) => {
                                const isSelected = timeSlot === slot.time;
                                return (
                                  <button
                                    key={slot.time}
                                    type="button"
                                    disabled={!slot.available}
                                    onClick={() => {
                                      setTimeSlot(slot.time);
                                      setStepError(null);
                                    }}
                                    aria-pressed={isSelected}
                                    title={slot.reason || `Выбрать время ${slot.time}`}
                                    className={cn(
                                      'flex flex-col items-center justify-center rounded-xl border py-2.5 px-2 text-sm transition-all cursor-pointer',
                                      isSelected
                                        ? 'border-[#667052] bg-[#667052] text-[#FFFCF6] font-semibold shadow-sm scale-[1.02]'
                                        : slot.available
                                        ? 'border-[#E5E0D5] bg-[#FFFCF6] text-[#292A23] hover:border-[#667052] hover:bg-[#F7F4ED]'
                                        : 'border-[#E5E0D5]/60 bg-[#F7F4ED]/50 text-[#77776B]/45 cursor-not-allowed'
                                    )}
                                  >
                                    <span className="font-medium">{slot.time}</span>
                                    <span
                                      className={cn(
                                        'text-[10px] mt-0.5',
                                        isSelected
                                          ? 'text-[#FFFCF6]/85'
                                          : slot.available
                                          ? 'text-[#667052]'
                                          : 'text-[#77776B]/60 line-through'
                                      )}
                                    >
                                      {slot.available ? 'Свободно' : 'Занято'}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="rounded-xl border border-[#E5E0D5] bg-[#F7F4ED] p-3 text-xs text-[#5E5E53] flex items-start gap-2.5">
                      <Info
                        className="h-4 w-4 shrink-0 text-[#667052] mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{scheduleNote}</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ШАГ 5: ВАШИ ДАННЫЕ (Имя, Телефон, Комментарий, Согласие) */}
            {step === 5 && (
              <div className="space-y-4">
                {Object.keys(contactErrors).length > 0 && (
                  <div
                    ref={errorSummaryRef}
                    role="alert"
                    tabIndex={-1}
                    aria-labelledby="booking-error-summary-title"
                    className="rounded-xl border border-[#B44C3E]/50 bg-[#B44C3E]/10 p-3.5 text-xs sm:text-sm text-[#8C3327] space-y-1"
                  >
                    <p
                      id="booking-error-summary-title"
                      className="font-semibold text-[#7A281D]"
                    >
                      Пожалуйста, проверьте заполнение формы:
                    </p>
                    <ul className="list-disc pl-5 space-y-0.5 text-xs">
                      {contactErrors.guestName && (
                        <li>
                          <a href="#booking-guest-name" className="underline">
                            {contactErrors.guestName}
                          </a>
                        </li>
                      )}
                      {contactErrors.guestPhone && (
                        <li>
                          <a href="#booking-guest-phone" className="underline">
                            {contactErrors.guestPhone}
                          </a>
                        </li>
                      )}
                      {contactErrors.consentAccepted && (
                        <li>
                          <a href="#booking-consent" className="underline">
                            {contactErrors.consentAccepted}
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-guest-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#292A23]"
                    >
                      Имя <span className="text-[#8C3327]">*</span>
                    </label>
                    <Input
                      id="booking-guest-name"
                      placeholder="Как к вам обращаться"
                      value={guestName}
                      onChange={(e) => {
                        setGuestName(e.target.value);
                        if (contactErrors.guestName) {
                          setContactErrors((prev) => ({ ...prev, guestName: undefined }));
                        }
                      }}
                      className={contactErrors.guestName ? 'border-[#B44C3E]' : ''}
                      required
                    />
                    {contactErrors.guestName && (
                      <p className="text-xs text-[#8C3327]">{contactErrors.guestName}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-guest-phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#292A23]"
                    >
                      Телефон <span className="text-[#8C3327]">*</span>
                    </label>
                    <Input
                      id="booking-guest-phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={guestPhone}
                      onChange={(e) => {
                        const formatted = formatRussianPhoneInput(e.target.value);
                        setGuestPhone(formatted);
                        if (contactErrors.guestPhone) {
                          setContactErrors((prev) => ({ ...prev, guestPhone: undefined }));
                        }
                      }}
                      className={contactErrors.guestPhone ? 'border-[#B44C3E]' : ''}
                      required
                    />
                    {contactErrors.guestPhone && (
                      <p className="text-xs text-[#8C3327]">{contactErrors.guestPhone}</p>
                    )}
                  </div>
                </div>

                {/* Предпочтения по атмосфере сьюта */}
                <div className="space-y-2 pt-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#292A23]">
                    Предпочтения по атмосфере сьюта
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'undecided', label: 'Решим на месте' },
                      { id: 'silence', label: 'Сеанс в полной тишине' },
                      { id: 'ambient', label: 'Мягкий эмбиент-звук' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setAtmospherePreference(
                            opt.id as 'silence' | 'ambient' | 'undecided'
                          )
                        }
                        aria-pressed={atmospherePreference === opt.id}
                        className={cn(
                          'rounded-xl border px-3 py-2 text-xs font-medium transition-colors cursor-pointer',
                          atmospherePreference === opt.id
                            ? 'border-[#667052] bg-[#667052]/12 text-[#292A23] font-semibold'
                            : 'border-[#E5E0D5] bg-[#FFFCF6] text-[#5E5E53] hover:border-[#C6B99F]'
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Комментарий */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-guest-comment"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#292A23]"
                  >
                    Комментарий или пожелания (необязательно)
                  </label>
                  <textarea
                    id="booking-guest-comment"
                    rows={2}
                    placeholder="Например: акцент на шейно-воротниковой зоне или нейтральное масло без аромата"
                    value={guestComment}
                    onChange={(e) => setGuestComment(e.target.value)}
                    className="flex w-full rounded-xl border border-[#E5E0D5] bg-[#F7F4ED]/70 px-4 py-2.5 text-sm text-[#292A23] placeholder:text-[#77776B]/80 focus-visible:border-[#667052] focus-visible:bg-[#FFFCF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667052]/25"
                  />
                </div>

                {/* Согласие */}
                <div className="pt-1">
                  <label
                    htmlFor="booking-consent"
                    className="flex items-start gap-3 cursor-pointer text-xs text-[#5E5E53]"
                  >
                    <input
                      id="booking-consent"
                      type="checkbox"
                      checked={consentAccepted}
                      aria-invalid={Boolean(contactErrors.consentAccepted)}
                      onChange={(e) => {
                        setConsentAccepted(e.target.checked);
                        if (contactErrors.consentAccepted) {
                          setContactErrors((prev) => ({
                            ...prev,
                            consentAccepted: undefined,
                          }));
                        }
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-[#667052] text-[#667052] focus:ring-[#667052] accent-[#667052] cursor-pointer"
                    />
                    <span className="leading-relaxed">
                      Я согласен(на) на{' '}
                      <button
                        type="button"
                        onClick={() => onOpenPrivacyPolicy?.()}
                        className="underline text-[#292A23] hover:text-[#667052] cursor-pointer"
                      >
                        обработку персональных данных
                      </button>{' '}
                      в соответствии с политикой конфиденциальности студии.
                    </span>
                  </label>
                  {contactErrors.consentAccepted && (
                    <p className="mt-1 text-xs text-[#8C3327]">
                      {contactErrors.consentAccepted}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ШАГ 6: ПОДТВЕРЖДЕНИЕ (Услуга, Специалист, Дата, Время, Стоимость + "Подтвердить запись") */}
            {step === 6 && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#E5E0D5] bg-[#F7F4ED] p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E0D5]">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#77776B]">
                        Услуга
                      </span>
                      <h4 className="font-serif text-2xl font-medium text-[#292A23]">
                        {selectedService.title}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#77776B]">
                        {selectedService.durationMinutes} мин
                      </span>
                      <p className="text-xl font-semibold text-[#292A23]">
                        {formatPrice(selectedService.price)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
                    <div className="flex items-start gap-2.5">
                      <User
                        className="h-4 w-4 text-[#667052] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="block text-xs text-[#77776B]">Специалист</span>
                        <span className="font-medium text-[#292A23]">
                          {specialistDisplayName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CalendarIcon
                        className="h-4 w-4 text-[#667052] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="block text-xs text-[#77776B]">Дата и время</span>
                        <span className="font-medium text-[#292A23] capitalize">
                          {formatHumanDate(dateIso)}, в {timeSlot}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5E0D5] text-xs text-[#5E5E53] space-y-1">
                    <p>
                      <strong className="text-[#292A23]">Гость:</strong> {guestName} ·{' '}
                      {guestPhone}
                    </p>
                    <p>
                      <strong className="text-[#292A23]">Атмосфера:</strong>{' '}
                      {atmospherePreference === 'silence'
                        ? 'Сеанс в полной тишине'
                        : atmospherePreference === 'ambient'
                        ? 'Мягкий эмбиент-звук'
                        : 'Обсудить перед началом визита'}
                    </p>
                    {guestComment && (
                      <p>
                        <strong className="text-[#292A23]">Пожелания:</strong>{' '}
                        {guestComment}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-[#E5E0D5] bg-[#FFFCF6] p-3 text-xs text-[#5E5E53]">
                  <ShieldCheck
                    className="h-4 w-4 text-[#667052] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Предварительная оплата онлайн не требуется. Оплата производится после завершения визита в студии.
                  </span>
                </div>
              </div>
            )}

            {/* Кнопки навигации по шагам */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E5E0D5]">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Назад</span>
                </Button>
              ) : (
                <div />
              )}

              {step < 6 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={step === 4 && isSpecialistDayOff}
                >
                  <span>Далее</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="min-w-[210px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Формируем запись...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Подтвердить запись</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
