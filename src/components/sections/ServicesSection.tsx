import * as React from 'react';
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import {
  SERVICES_CATALOG,
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from '@/config/services';
import { studioConfig } from '@/config/studioConfig';
import { Button } from '@/components/ui/button';
import { WellnessImage } from '@/components/ui/wellness-image';
import { cn, formatPrice } from '@/lib/utils';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [activeCategory, setActiveCategory] =
    React.useState<ServiceCategory>('all');

  const filteredServices = React.useMemo(() => {
    if (activeCategory === 'all') return SERVICES_CATALOG;
    return SERVICES_CATALOG.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 sm:py-28 lg:py-32 border-t border-[#E5E0D5] bg-[#F7F4ED]"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        {/* Заголовок секции + фильтр */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#E5E0D5]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#667052]">
              {studioConfig.services.eyebrow}
            </p>
            <h2
              id="services-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[#292A23]"
            >
              {studioConfig.services.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5E5E53] leading-relaxed">
              {studioConfig.services.subtitle}
            </p>
          </div>

          {/* Табы категорий */}
          <div
            role="tablist"
            aria-label="Категории процедур"
            className="flex flex-wrap gap-2"
          >
            {SERVICE_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'rounded-full px-4 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer',
                    isSelected
                      ? 'bg-[#667052] text-[#FFFCF6] shadow-sm'
                      : 'border border-[#E5E0D5] bg-[#FFFCF6] text-[#5E5E53] hover:border-[#667052] hover:text-[#292A23]'
                  )}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Сетка премиальных карточек процедур */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col justify-between rounded-[26px] border border-[#E5E0D5] bg-[#FFFCF6] p-5 sm:p-6 transition-all duration-300 hover:border-[#667052]/40 hover:shadow-md"
            >
              <div className="space-y-5">
                {/* Фотография процедуры с мягким зумом при наведении */}
                <div className="relative overflow-hidden rounded-2xl border border-[#E5E0D5]">
                  <WellnessImage
                    src={service.image}
                    alt={service.imageAlt}
                    containerClassName="aspect-[16/11] w-full"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-full bg-[#FFFCF6]/95 backdrop-blur-sm border border-[#E5E0D5] px-3 py-1 text-[11px] font-medium text-[#292A23]">
                      {service.categoryLabel}
                    </span>
                    {service.featuredNote && (
                      <span className="hidden sm:inline-block rounded-full bg-[#667052] text-[#FFFCF6] px-2.5 py-1 text-[10px] font-medium tracking-wide">
                        {service.featuredNote}
                      </span>
                    )}
                  </div>
                  <div className="absolute right-3 bottom-3 rounded-full bg-[#292A23]/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-[#FFFCF6] flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-[#C6B99F]" aria-hidden="true" />
                    <span>{service.durationMinutes} мин</span>
                  </div>
                </div>

                {/* Название и метаданные */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-2xl sm:text-[26px] font-medium text-[#292A23] group-hover:text-[#667052] transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-xs font-medium text-[#77776B]">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-[#5E5E53] leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Сенсорные теги */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {service.sensoryNotes.map((note) => (
                    <span
                      key={note}
                      className="inline-flex items-center gap-1 rounded-full bg-[#F7F4ED] border border-[#E5E0D5] px-2.5 py-1 text-[11px] text-[#5E5E53]"
                    >
                      <Sparkles className="h-2.5 w-2.5 text-[#667052]" aria-hidden="true" />
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Нижняя часть карточки: длительность, цена и кнопка Записаться */}
              <div className="mt-6 pt-5 border-t border-[#E5E0D5] flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#77776B]">
                    {service.durationMinutes} мин
                  </span>
                  <span className="font-serif text-2xl font-semibold text-[#292A23]">
                    {formatPrice(service.price)}
                  </span>
                </div>

                <Button
                  type="button"
                  onClick={() => onSelectServiceForBooking(service.id)}
                  className="gap-2 px-5 group/btn"
                  aria-label={`Записаться на процедуру: ${service.title}`}
                >
                  <span>Записаться</span>
                  <ArrowUpRight className="h-4 w-4 text-[#FFFCF6] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
