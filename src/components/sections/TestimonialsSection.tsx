import * as React from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = BRAND_CONFIG;
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.items.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === testimonials.items.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-20 sm:py-28 border-t border-[#E5E0D5]"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#E5E0D5]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C6B99F] bg-[#EFECE4] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#5E5E53]">
              <Info className="h-3.5 w-3.5 text-[#667052]" aria-hidden="true" />
              <span>{testimonials.eyebrow}</span>
            </div>
            <h2
              id="testimonials-heading"
              className="font-serif text-4xl sm:text-5xl font-normal leading-[1.08] text-[#292A23]"
            >
              {testimonials.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#77776B] max-w-md leading-relaxed">
            {testimonials.disclaimer}
          </p>
        </div>

        {/* Десктоп: редакционная сетка из 3 карточек; Мобильные: карусель с кнопками */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.items.map((item, idx) => (
            <article
              key={item.id}
              className={`flex flex-col justify-between rounded-[24px] border border-[#E5E0D5] bg-[#FFFCF6] p-6 sm:p-8 space-y-6 ${
                idx === activeIndex ? 'block' : 'hidden lg:flex'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs text-[#667052]">
                  <span className="font-medium">{item.ritualTitle}</span>
                  <span className="rounded-full bg-[#F7F4ED] border border-[#E5E0D5] px-2.5 py-0.5 text-[10px] text-[#77776B]">
                    Макет отзыва
                  </span>
                </div>

                <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed text-[#292A23]">
                  {item.quote}
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#E5E0D5] space-y-1">
                <p className="text-sm font-medium text-[#292A23]">
                  {item.guestLabel}
                </p>
                <p className="text-xs text-[#77776B]">{item.atmosphereNote}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Управление слайдами на мобильных и планшетах */}
        <div className="mt-6 flex lg:hidden items-center justify-between">
          <span
            className="text-xs text-[#77776B]"
            aria-live="polite"
          >
            Пример {activeIndex + 1} из {testimonials.items.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Предыдущий пример отзыва"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E0D5] bg-[#FFFCF6] text-[#292A23] hover:border-[#667052] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Следующий пример отзыва"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E0D5] bg-[#FFFCF6] text-[#292A23] hover:border-[#667052] cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
