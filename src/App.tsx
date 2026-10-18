import * as React from 'react';
import { CalendarCheck, Sparkles } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SpecialistsSection } from '@/components/sections/SpecialistsSection';
import { SpaceSection } from '@/components/sections/SpaceSection';
import { GiftCertificatesSection } from '@/components/sections/GiftCertificatesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { ContactsFooter } from '@/components/sections/ContactsFooter';
import { BookingModal } from '@/components/booking/BookingModal';
import { GiftCertificateModal } from '@/components/booking/GiftCertificateModal';
import { LegalModal, type LegalDocType } from '@/components/booking/LegalModal';
import { AdminModal } from '@/components/admin/AdminModal';
import { studioConfig } from '@/config/studioConfig';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  getSessionDemoBookings,
  type DemoBookingRecord,
} from '@/lib/booking';
import { formatPrice } from '@/lib/utils';

export function App() {
  const [bookingModalOpen, setBookingModalOpen] = React.useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = React.useState<
    string | null
  >(null);
  const [preselectedSpecialistId, setPreselectedSpecialistId] = React.useState<
    string | null
  >(null);

  const [certificateModalOpen, setCertificateModalOpen] = React.useState(false);
  const [preselectedCertTierId, setPreselectedCertTierId] = React.useState<
    string | null
  >(null);

  const [legalDocType, setLegalDocType] = React.useState<LegalDocType>(null);
  const [adminModalOpen, setAdminModalOpen] = React.useState(false);

  const [sessionBookings, setSessionBookings] = React.useState<
    DemoBookingRecord[]
  >(() => getSessionDemoBookings());
  const [sessionBookingsModalOpen, setSessionBookingsModalOpen] =
    React.useState(false);

  const [showMobileFloatingCta, setShowMobileFloatingCta] =
    React.useState(false);

  // Слушатель хэша #admin в адресной строке
  React.useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setAdminModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowMobileFloatingCta(window.scrollY > 420);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenGeneralBooking = () => {
    setPreselectedServiceId(null);
    setPreselectedSpecialistId(null);
    setBookingModalOpen(true);
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedSpecialistId(null);
    setBookingModalOpen(true);
  };

  const handleSelectSpecialistForBooking = (specialistId: string) => {
    setPreselectedSpecialistId(specialistId);
    setPreselectedServiceId(null);
    setBookingModalOpen(true);
  };

  const handleOpenCertificateModal = (tierId?: string) => {
    setPreselectedCertTierId(tierId || null);
    setCertificateModalOpen(true);
  };

  const handleBookingCreated = () => {
    setSessionBookings(getSessionDemoBookings());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4ED] text-[#292A23]">
      {/* Skip-link для клавиатурной доступности */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#667052] focus:px-5 focus:py-2.5 focus:text-xs focus:font-medium focus:text-[#FFFCF6]"
      >
        Перейти к основному содержанию
      </a>

      <Header
        onOpenBooking={handleOpenGeneralBooking}
        sessionBookings={sessionBookings}
        onOpenSessionBookingsModal={() => setSessionBookingsModalOpen(true)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      <main id="main-content" className="flex-1">
        <HeroSection onOpenBooking={handleOpenGeneralBooking} />
        <WhyUsSection />
        <PhilosophySection />
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />
        <SpecialistsSection
          onSelectSpecialistForBooking={handleSelectSpecialistForBooking}
        />
        <SpaceSection />
        <GiftCertificatesSection
          onOpenCertificateModal={handleOpenCertificateModal}
        />
        <TestimonialsSection />
        <FaqSection onOpenBooking={handleOpenGeneralBooking} />
      </main>

      <ContactsFooter
        onOpenBooking={handleOpenGeneralBooking}
        onOpenLegalModal={(type) => setLegalDocType(type)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Ненавязчивая мобильная фиксированная панель записи */}
      {showMobileFloatingCta && !bookingModalOpen && (
        <div className="fixed bottom-4 inset-x-4 z-30 lg:hidden pointer-events-none">
          <div className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-3 rounded-full border border-[#E5E0D5] bg-[#FFFCF6]/95 p-2 pl-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs text-[#292A23] truncate">
              <Sparkles
                className="h-3.5 w-3.5 text-[#667052] shrink-0"
                aria-hidden="true"
              />
              <span className="font-medium truncate">{studioConfig.brand.shortName} · Онлайн-запись</span>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={handleOpenGeneralBooking}
              className="shrink-0 px-5"
            >
              Записаться
            </Button>
          </div>
        </div>
      )}

      {/* Пошаговое модальное окно онлайн-записи */}
      <BookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        initialServiceId={preselectedServiceId}
        initialSpecialistId={preselectedSpecialistId}
        onBookingCreated={handleBookingCreated}
        onOpenPrivacyPolicy={() => setLegalDocType('personal-data')}
      />

      {/* Модальное окно оформления подарочного сертификата (демо) */}
      <GiftCertificateModal
        open={certificateModalOpen}
        onOpenChange={setCertificateModalOpen}
        initialTierId={preselectedCertTierId}
      />

      {/* Модальное окно правовой информации */}
      <LegalModal
        docType={legalDocType}
        onClose={() => setLegalDocType(null)}
      />

      {/* Модальное окно со списком созданных в текущей сессии демо-записей */}
      <Dialog
        open={sessionBookingsModalOpen}
        onOpenChange={setSessionBookingsModalOpen}
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#667052]">
              <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Локальный журнал сессии (демо)</span>
            </div>
            <DialogTitle>Ваши демонстрационные заявки</DialogTitle>
            <DialogDescription>
              Заявки сохранены в `sessionStorage` вашего браузера для проверки работы сценария бронирования.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            {sessionBookings.map((item) => (
              <div
                key={item.referenceCode}
                className="rounded-2xl border border-[#E5E0D5] bg-[#F7F4ED] p-4 space-y-2 text-sm"
              >
                <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-2">
                  <span className="font-mono text-xs font-semibold text-[#667052]">
                    {item.referenceCode}
                  </span>
                  <span className="text-xs font-medium text-[#292A23]">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="font-serif text-xl font-medium text-[#292A23]">
                  {item.serviceTitle} ({item.durationMinutes} мин)
                </p>
                <p className="text-xs text-[#5E5E53]">
                  Мастер: {item.specialistName}
                </p>
                <p className="text-xs text-[#292A23] capitalize">
                  Дата: {item.dateFormatted}, в {item.timeSlot}
                </p>
                <p className="text-xs text-[#77776B]">
                  Гость: {item.guestName} ({item.guestPhone})
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSessionBookingsModalOpen(false);
                  handleOpenGeneralBooking();
                }}
                className="text-xs"
              >
                Создать новую запись
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSessionBookingsModalOpen(false);
                  setAdminModalOpen(true);
                }}
                className="text-xs text-[#667052] hover:bg-[#667052]/10"
              >
                Кабинет студии (CRM)
              </Button>
            </div>

            <Button
              type="button"
              size="sm"
              onClick={() => setSessionBookingsModalOpen(false)}
            >
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Личный кабинет администратора студии (CRM, Telegram-оповещения, WhatsApp) */}
      <AdminModal
        open={adminModalOpen}
        onOpenChange={setAdminModalOpen}
        onBookingsUpdated={handleBookingCreated}
      />
    </div>
  );
}

export default App;
