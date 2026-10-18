import * as React from 'react';
import { CalendarCheck, Menu, ArrowUpRight, Shield } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getNewBookingsCount, type DemoBookingRecord } from '@/lib/booking';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onOpenBooking: () => void;
  sessionBookings: DemoBookingRecord[];
  onOpenSessionBookingsModal?: () => void;
  onOpenAdminModal?: () => void;
}

const PRIMARY_NAV = [
  { label: 'Услуги', href: '#services' },
  { label: 'Специалисты', href: '#specialists' },
  { label: 'Пространство', href: '#space' },
  { label: 'О нас', href: '#philosophy' },
  { label: 'Контакты', href: '#contacts' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  sessionBookings,
  onOpenSessionBookingsModal,
  onOpenAdminModal,
}) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const newBookingsCount = React.useMemo(
    () => getNewBookingsCount(sessionBookings),
    [sessionBookings]
  );

  React.useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300 ease-calm',
        isScrolled
          ? 'border-b border-[#E5E0D5] bg-[#F7F4ED]/92 backdrop-blur-md py-3.5'
          : 'border-b border-transparent bg-[#F7F4ED]/80 backdrop-blur-sm py-5'
      )}
    >
      <div className="mx-auto flex max-w-[1360px] items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Логотип */}
        <a
          href="#top"
          className="group flex flex-col focus-visible:outline-none"
          aria-label={`${BRAND_CONFIG.name} — На главную`}
        >
          <span className="font-serif text-2xl sm:text-[28px] font-medium tracking-[0.06em] text-[#292A23] leading-none">
            {BRAND_CONFIG.shortName}{' '}
            <span className="italic font-normal text-[#667052]">
              {BRAND_CONFIG.name.replace(BRAND_CONFIG.shortName, '').trim()}
            </span>
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.26em] text-[#77776B]">
            {BRAND_CONFIG.city} · Private Sanctuary
          </span>
        </a>

        {/* Десктопная навигация */}
        <nav
          aria-label="Основная навигация"
          className="hidden lg:flex items-center gap-8"
        >
          {PRIMARY_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-normal text-[#292A23]/85 transition-colors hover:text-[#667052] py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Действия справа */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenAdminModal}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E0D5] bg-[#FFFCF6] px-3.5 py-2 text-xs font-medium text-[#292A23] hover:border-[#667052] transition-colors cursor-pointer"
            title="Личный кабинет администратора студии (PIN: 1234)"
          >
            <Shield className="h-3.5 w-3.5 text-[#667052]" />
            <span>Кабинет студии</span>
            {newBookingsCount > 0 && (
              <span className="flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#667052] text-[#FFFCF6] text-[10px] font-bold">
                {newBookingsCount}
              </span>
            )}
          </button>

          {sessionBookings.length > 0 && (
            <button
              type="button"
              onClick={onOpenSessionBookingsModal}
              className="inline-flex items-center gap-2 rounded-full border border-[#C6B99F] bg-[#FFFCF6] px-3.5 py-2 text-xs font-medium text-[#292A23] transition-colors hover:border-[#667052] cursor-pointer"
            >
              <CalendarCheck className="h-3.5 w-3.5 text-[#667052]" aria-hidden="true" />
              <span>Мои демо-записи ({sessionBookings.length})</span>
            </button>
          )}

          <Button
            type="button"
            onClick={onOpenBooking}
            className="h-11 px-6 text-xs uppercase tracking-[0.14em]"
          >
            Записаться
          </Button>
        </div>

        {/* Мобильная кнопка меню + компактная запись */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenAdminModal}
            aria-label="Кабинет студии"
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#E5E0D5] bg-[#FFFCF6] px-2.5 text-xs font-medium text-[#292A23] cursor-pointer"
            title="Кабинет администратора"
          >
            <Shield className="h-3.5 w-3.5 text-[#667052]" />
            {newBookingsCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#667052] text-[#FFFCF6] text-[10px] font-bold">
                {newBookingsCount}
              </span>
            )}
          </button>

          {sessionBookings.length > 0 && (
            <button
              type="button"
              onClick={onOpenSessionBookingsModal}
              aria-label={`Мои демо-записи: ${sessionBookings.length}`}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#C6B99F] bg-[#FFFCF6] px-3 text-xs font-medium text-[#292A23] cursor-pointer"
            >
              <CalendarCheck className="h-3.5 w-3.5 text-[#667052]" aria-hidden="true" />
              <span>{sessionBookings.length}</span>
            </button>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Открыть меню навигации"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E0D5] bg-[#FFFCF6] text-[#292A23] transition-colors hover:border-[#667052] cursor-pointer"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </SheetTrigger>

            <SheetContent>
              <div className="space-y-8 pt-2">
                <div>
                  <SheetTitle className="tracking-[0.04em]">
                    {BRAND_CONFIG.shortName}{' '}
                    <span className="italic font-normal text-[#667052]">
                      {BRAND_CONFIG.name.replace(BRAND_CONFIG.shortName, '').trim()}
                    </span>
                  </SheetTitle>
                  <SheetDescription className="mt-1 uppercase tracking-[0.2em]">
                    {BRAND_CONFIG.tagline}
                  </SheetDescription>
                </div>

                <nav
                  aria-label="Мобильная навигация"
                  className="flex flex-col divide-y divide-[#E5E0D5]"
                >
                  {BRAND_CONFIG.navigation.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 font-serif text-2xl text-[#292A23] transition-colors hover:text-[#667052]"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        className="h-4 w-4 text-[#77776B]"
                        aria-hidden="true"
                      />
                    </a>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdminModal?.();
                    }}
                    className="flex items-center justify-between py-3.5 font-serif text-xl text-[#292A23] transition-colors hover:text-[#667052] text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-[#667052]" />
                      <span>Кабинет студии</span>
                    </span>
                    {newBookingsCount > 0 ? (
                      <span className="rounded-full bg-[#667052] text-[#FFFCF6] px-2 py-0.5 text-xs font-bold">
                        +{newBookingsCount}
                      </span>
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-[#77776B]" />
                    )}
                  </button>
                </nav>
              </div>

              <div className="space-y-4 pt-6 border-t border-[#E5E0D5]">
                <div className="space-y-1 text-xs text-[#5E5E53]">
                  <p className="font-medium text-[#292A23]">
                    {BRAND_CONFIG.contacts.addressLine1}
                  </p>
                  <p>{BRAND_CONFIG.contacts.hours}</p>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                >
                  Записаться на ритуал
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
