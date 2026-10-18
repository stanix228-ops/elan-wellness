import * as React from 'react';
import { Award, Feather, Leaf, Sparkles } from 'lucide-react';
import { studioConfig } from '@/config/studioConfig';
import { BRAND_CONFIG } from '@/config/brand';

const iconMap = {
  Sparkles,
  Award,
  Feather,
  Leaf,
};

export const WhyUsSection: React.FC = () => {
  const { benefits } = studioConfig;

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="py-16 sm:py-24 lg:py-28 border-t border-[#E5E0D5] bg-[#FFFCF6]"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        {/* Заголовок секции */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E5E0D5]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#667052]">
              {benefits.eyebrow}
            </p>
            <h2
              id="why-us-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292A23]"
            >
              {benefits.title}
            </h2>
          </div>
          <p className="text-sm text-[#77776B] max-w-md leading-relaxed">
            {benefits.subtitle}
          </p>
        </div>

        {/* 4 карточки преимуществ */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.items.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || Sparkles;

            return (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#E5E0D5] bg-[#F7F4ED] p-6 sm:p-7 transition-all duration-300 hover:border-[#667052]/50 hover:bg-[#FFFCF6] hover:shadow-sm"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFFCF6] border border-[#E5E0D5] text-[#667052] transition-colors group-hover:border-[#667052]/40 group-hover:bg-[#667052] group-hover:text-[#FFFCF6]">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-serif text-xs italic tracking-wider text-[#77776B]">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block text-[11px] uppercase tracking-wider font-medium text-[#667052]">
                      {item.badge}
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-[#292A23]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-[#5E5E53]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E0D5]/70 text-[11px] text-[#77776B]">
                  Стандарт {BRAND_CONFIG.name}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
