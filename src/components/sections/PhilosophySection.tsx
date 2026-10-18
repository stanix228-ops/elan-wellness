import * as React from 'react';
import { BRAND_CONFIG } from '@/config/brand';
import { WellnessImage } from '@/components/ui/wellness-image';

export const PhilosophySection: React.FC = () => {
  const { philosophy } = BRAND_CONFIG;

  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="py-20 sm:py-28 lg:py-32 border-t border-[#E5E0D5] bg-[#FFFCF6]"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Выразительная фотография текстуры и света */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="group relative">
              <WellnessImage
                src={philosophy.image}
                alt={philosophy.imageAlt}
                containerClassName="aspect-[4/5] rounded-[28px] border border-[#E5E0D5]"
                className="image-zoom-calm"
              />
              <div className="mt-4 flex items-center justify-between text-xs text-[#77776B] px-1">
                <span>Тактильная среда · Натуральный лён и тёплый камень</span>
                <span>Без медицинского пафоса</span>
              </div>
            </div>
          </div>

          {/* Текстовая редакционная колонка */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#667052]">
                {philosophy.eyebrow}
              </p>
              <h2
                id="philosophy-heading"
                className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] tracking-tight text-[#292A23]"
              >
                {philosophy.title}
              </h2>
            </div>

            <p className="font-serif text-2xl sm:text-[26px] leading-snug text-[#292A23]/90">
              {philosophy.lead}
            </p>

            <div className="space-y-4 text-base leading-relaxed text-[#5E5E53] max-w-2xl">
              {philosophy.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Три принципа подхода */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E5E0D5]">
              {philosophy.pillars.map((pillar) => (
                <div key={pillar.number} className="space-y-2">
                  <span className="font-serif text-xl italic text-[#667052]">
                    {pillar.number}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#292A23]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#5E5E53]">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
