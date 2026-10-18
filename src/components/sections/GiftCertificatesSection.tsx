import * as React from 'react';
import { ArrowUpRight, Gift, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';
import { Button } from '@/components/ui/button';

interface GiftCertificatesSectionProps {
  onOpenCertificateModal: (tierId?: string) => void;
}

export const GiftCertificatesSection: React.FC<GiftCertificatesSectionProps> = ({
  onOpenCertificateModal,
}) => {
  const { giftCertificates } = BRAND_CONFIG;

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="py-20 sm:py-28 lg:py-32 border-t border-[#E5E0D5] bg-[#FFFCF6]"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        <div className="rounded-[32px] border border-[#E5E0D5] bg-[#F7F4ED] p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Левая часть: описание и визуальный макет конверта */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[#667052]">
                <Gift className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{giftCertificates.eyebrow}</span>
              </div>

              <h2
                id="certificates-heading"
                className="font-serif text-4xl sm:text-5xl font-normal leading-[1.08] text-[#292A23]"
              >
                {giftCertificates.title}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-[#5E5E53]">
                {giftCertificates.description}
              </p>

              {/* Тактильная карточка-превью печатного сертификата */}
              <div className="rounded-2xl border border-[#C6B99F]/70 bg-[#FFFCF6] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
                  <span className="font-serif text-xl tracking-[0.06em] text-[#292A23]">
                    ÉLAN <span className="italic text-[#667052]">Wellness</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#77776B]">
                    GIFT INVITATION · DEMO
                  </span>
                </div>
                <p className="font-serif text-2xl italic text-[#292A23]">
                  «Персональное приглашение в пространство тишины и бережного восстановления»
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#77776B] pt-1">
                  <span>Хлопковая бумага 350 г/м² · Льняной конверт</span>
                  <span>Или мгновенная электронная версия</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => onOpenCertificateModal()}
                >
                  <span>{giftCertificates.ctaLabel}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <span className="text-xs text-[#77776B]">
                  {giftCertificates.validityNote}
                </span>
              </div>
            </div>

            {/* Правая часть: варианты номиналов */}
            <div className="lg:col-span-6 space-y-4">
              {giftCertificates.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#E5E0D5] bg-[#FFFCF6] p-5 sm:p-6 transition-all hover:border-[#667052]"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Sparkles
                        className="h-3.5 w-3.5 text-[#667052]"
                        aria-hidden="true"
                      />
                      <h3 className="font-serif text-2xl font-medium text-[#292A23]">
                        {tier.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#5E5E53]">{tier.subtitle}</p>
                    <p className="text-xs text-[#77776B]">{tier.details}</p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E5E0D5]">
                    <span className="font-serif text-2xl font-semibold text-[#292A23]">
                      {tier.amountLabel}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenCertificateModal(tier.id)}
                    >
                      Оформить заявку
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
