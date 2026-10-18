import * as React from 'react';
import { ArrowDownRight, Clock, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';
import { Button } from '@/components/ui/button';
import { WellnessImage } from '@/components/ui/wellness-image';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const { hero } = BRAND_CONFIG;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-4 pb-16 sm:pt-8 sm:pb-24 lg:pt-10 lg:pb-28 lg:min-h-[85vh] flex flex-col justify-between"
    >
      <div className="mx-auto max-w-[1360px] w-full px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-between">
        {/* Верхняя редакционная строка */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#E5E0D5] reveal-up">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#667052]">
            {hero.eyebrow}
          </p>
          <p className="text-xs text-[#77776B]">
            Камерное wellness-пространство · Индивидуальный резерв времени
          </p>
        </div>

        {/* Асимметричная редакционная композиция */}
        <div className="my-auto py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Левая колонка с крупной антиквой и манифестом */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-7 reveal-up">
            <div className="space-y-5">
              <h1
                id="hero-heading"
                className="font-serif text-5xl sm:text-6xl xl:text-[82px] font-normal leading-[0.95] tracking-[-0.025em] text-[#292A23]"
              >
                Вернитесь<br />
                <span className="italic text-[#667052]/90">к себе.</span>
              </h1>

              <p className="font-serif text-2xl sm:text-[28px] italic font-normal leading-snug text-[#5E5E53] max-w-md">
                {hero.subtitle}
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-[#5E5E53] max-w-md">
                Тихая архитектура натурального льна, тёплого камня и выверенных прикосновений. Вдали от городского ритма, спешки и лишнего шума.
              </p>
            </div>

            {/* CTA группа */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Button
                type="button"
                size="lg"
                onClick={onOpenBooking}
                className="px-8 text-sm tracking-wide shadow-sm"
              >
                <span>{hero.primaryCta}</span>
              </Button>

              <a
                href="#philosophy"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#E5E0D5] bg-[#FFFCF6]/80 px-6 text-sm font-medium text-[#292A23] transition-colors hover:border-[#667052] hover:text-[#667052]"
              >
                <span>{hero.secondaryCta}</span>
                <ArrowDownRight className="h-4 w-4 text-[#667052]" aria-hidden="true" />
              </a>
            </div>

            {/* Подпись о персональном времени для каждого гостя */}
            <div className="rounded-2xl border border-[#E5E0D5] bg-[#FFFCF6] p-5 sm:p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#667052]">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Ритуал приватного времени</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[#5E5E53]">
                {hero.personalApproachNote}
              </p>
            </div>
          </div>

          {/* Правая архитектурная фото-композиция с многослойным кадрированием */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-5 items-end reveal-up">
            {/* Главное атмосферное фото кабинета */}
            <div className="sm:col-span-8 group relative">
              <WellnessImage
                src={hero.heroImage}
                alt={hero.heroImageAlt}
                loading="eager"
                containerClassName="aspect-[4/5] sm:aspect-[5/6] rounded-[28px] border border-[#E5E0D5] shadow-sm"
                className="image-zoom-calm"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-[#77776B] px-1">
                <span>Сьют №1 · Естественный утренний свет</span>
                <span className="uppercase tracking-widest">27°C · Лён и травертин</span>
              </div>
            </div>

            {/* Вторичный вертикальный кадр детали + тактильная карточка */}
            <div className="sm:col-span-4 flex flex-col gap-5">
              <div className="group">
                <WellnessImage
                  src={hero.secondaryImage}
                  alt={hero.secondaryImageAlt}
                  containerClassName="aspect-[4/3] sm:aspect-[3/4] rounded-2xl border border-[#E5E0D5]"
                  className="image-zoom-calm"
                />
              </div>

              <div className="rounded-2xl border border-[#E5E0D5] bg-[#EFECE4]/85 p-5 space-y-2.5">
                <Sparkles className="h-4 w-4 text-[#667052]" aria-hidden="true" />
                <p className="font-serif text-lg leading-snug text-[#292A23]">
                  Только 3 приватных сьюта
                </p>
                <p className="text-xs leading-relaxed text-[#5E5E53]">
                  Никакого ожидания в общей очереди. Кабинет готовится индивидуально под вашу запись.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя полоса принципов пространства */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#E5E0D5]">
          {hero.highlights.map((item, idx) => (
            <div key={item.label} className="flex items-start gap-4">
              <span className="font-serif text-lg italic text-[#667052]">
                0{idx + 1}
              </span>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#292A23]">
                  {item.label}
                </h2>
                <p className="mt-1 text-sm text-[#5E5E53] leading-relaxed">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
