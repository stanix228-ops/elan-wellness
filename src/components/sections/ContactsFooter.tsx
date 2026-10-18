import * as React from 'react';
import {
  ArrowUpRight,
  Clock,
  Compass,
  MapPin,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';
import { Button } from '@/components/ui/button';
import type { LegalDocType } from '@/components/booking/LegalModal';

interface ContactsFooterProps {
  onOpenBooking: () => void;
  onOpenLegalModal: (type: LegalDocType) => void;
}

export const ContactsFooter: React.FC<ContactsFooterProps> = ({
  onOpenBooking,
  onOpenLegalModal,
}) => {
  const { contacts } = BRAND_CONFIG;
  const [showRouteNote, setShowRouteNote] = React.useState(false);

  return (
    <footer
      id="contacts"
      aria-labelledby="contacts-heading"
      className="border-t border-[#E5E0D5] bg-[#F7F4ED] pt-20 pb-28 lg:pb-16"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        {/* Верхний блок контактов и архитектурной схемы расположения */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#E5E0D5]">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#667052]">
              КОНТАКТЫ И РАСПОЛОЖЕНИЕ
            </p>
            <h2
              id="contacts-heading"
              className="font-serif text-4xl sm:text-5xl font-normal leading-[1.08] text-[#292A23]"
            >
              Мы будем рады вас видеть
            </h2>

            <div className="space-y-4 pt-2 text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  className="h-4 w-4 text-[#667052] shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-[#292A23]">
                    {contacts.addressLine1}
                  </p>
                  <p className="text-[#5E5E53]">{contacts.addressLine2}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock
                  className="h-4 w-4 text-[#667052] shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-[#292A23]">Часы работы</p>
                  <p className="text-[#5E5E53]">{contacts.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  className="h-4 w-4 text-[#667052] shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-[#292A23]">
                    Телефон студии
                  </p>
                  <a
                    href={contacts.phoneHref}
                    className="text-[#5E5E53] hover:text-[#667052] transition-colors"
                  >
                    {contacts.phoneDisplay}
                  </a>
                  <p className="text-xs text-[#77776B] mt-0.5">{contacts.email}</p>
                </div>
              </div>
            </div>

            {/* Мессенджеры и действия */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <Button type="button" onClick={onOpenBooking}>
                  <span>Записаться онлайн</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>

                <a
                  href={`https://yandex.ru/maps/?text=${encodeURIComponent(contacts.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-[#E5E0D5] bg-[#FFFCF6] px-5 text-xs font-medium text-[#292A23] transition-colors hover:border-[#667052] hover:text-[#667052]"
                >
                  <Compass className="h-3.5 w-3.5 text-[#667052]" aria-hidden="true" />
                  <span>Построить маршрут</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#77776B]">
                <span>Быстрая связь:</span>
                <a
                  href={contacts.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E0D5] bg-[#FFFCF6] px-3 py-1.5 text-xs font-medium text-[#292A23] hover:border-[#667052] transition-colors"
                >
                  <MessageSquare className="h-3 w-3 text-[#667052]" aria-hidden="true" />
                  <span>Telegram</span>
                </a>
                <a
                  href={contacts.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E0D5] bg-[#FFFCF6] px-3 py-1.5 text-xs font-medium text-[#292A23] hover:border-[#667052] transition-colors"
                >
                  <Phone className="h-3 w-3 text-[#667052]" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Правая колонка: архитектурная схема расположения */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[28px] border border-[#E5E0D5] bg-[#EFECE4] p-6 sm:p-8 min-h-[340px] flex flex-col justify-between">
              {/* Декоративные архитектурные линии квартала */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
                viewBox="0 0 600 360"
                fill="none"
              >
                <path
                  d="M0 90 H600 M0 210 H600 M0 300 H600 M140 0 V360 M320 0 V360 M470 0 V360"
                  stroke="#C6B99F"
                  strokeWidth="1.2"
                />
                <path
                  d="M60 0 L420 360 M240 0 L580 340"
                  stroke="#D5CEBF"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="320"
                  cy="210"
                  r="42"
                  stroke="#667052"
                  strokeWidth="1"
                  fill="#667052"
                  fillOpacity="0.08"
                />
              </svg>

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFCF6] border border-[#E5E0D5] px-3.5 py-1.5 text-xs font-medium text-[#292A23]">
                  <Compass className="h-3.5 w-3.5 text-[#667052]" aria-hidden="true" />
                  <span>Схема расположения · Патриаршие пруды (Демо-локация)</span>
                </span>
                <span className="rounded-full bg-[#F7F4ED]/90 border border-[#C6B99F]/60 px-3 py-1 text-[11px] text-[#5E5E53]">
                  Интерактивная карта подключается по API-ключу
                </span>
              </div>

              {/* Центральный пин студии */}
              <div className="relative z-10 my-8 flex items-center gap-4 self-start rounded-2xl border border-[#E5E0D5] bg-[#FFFCF6] p-4 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#667052] text-[#FFFCF6]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-serif text-xl font-medium text-[#292A23]">
                    ÉLAN Wellness Sanctuary
                  </p>
                  <p className="text-xs text-[#5E5E53]">
                    Тихий внутренний двор · Отдельный вход без вывески на фасаде
                  </p>
                </div>
              </div>

              <div className="relative z-10 space-y-3 rounded-2xl border border-[#E5E0D5] bg-[#FFFCF6]/95 p-4 text-xs text-[#5E5E53]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span>{contacts.parkingNote}</span>
                  <button
                    type="button"
                    onClick={() => setShowRouteNote((v) => !v)}
                    className="font-medium text-[#667052] underline underline-offset-4 cursor-pointer"
                  >
                    {showRouteNote ? 'Скрыть ориентиры входа' : 'Как пройти во двор'}
                  </button>
                </div>
                {showRouteNote && (
                  <p className="pt-2 border-t border-[#E5E0D5] text-[#292A23]">
                    Демо-маршрут: вход через кованую арку между домами 22 и 24, далее направо к двухэтажному флигелю цвета тёплого известняка. За 30 минут до визита гостю направляется код доступа.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Нижний колонтитул */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-[#77776B]">
          <div className="space-y-1">
            <p className="font-serif text-lg text-[#292A23]">
              ÉLAN <span className="italic text-[#667052]">Wellness</span> · ©{' '}
              {new Date().getFullYear()}
            </p>
            <p>{BRAND_CONFIG.isDemoNotice}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-[#292A23] underline underline-offset-4 cursor-pointer"
            >
              Политика конфиденциальности
            </button>
            <button
              type="button"
              onClick={() => onOpenLegalModal('personal-data')}
              className="hover:text-[#292A23] underline underline-offset-4 cursor-pointer"
            >
              Обработка персональных данных
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
