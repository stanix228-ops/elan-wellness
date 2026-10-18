import * as React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SPECIALISTS_CATALOG } from '@/config/specialists';
import { studioConfig } from '@/config/studioConfig';
import { Button } from '@/components/ui/button';
import { WellnessImage } from '@/components/ui/wellness-image';

interface SpecialistsSectionProps {
  onSelectSpecialistForBooking: (specialistId: string) => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({
  onSelectSpecialistForBooking,
}) => {
  return (
    <section
      id="specialists"
      aria-labelledby="specialists-heading"
      className="py-20 sm:py-28 lg:py-32 border-t border-[#E5E0D5] bg-[#FFFCF6]"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E5E0D5]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#667052]">
              {studioConfig.specialists.eyebrow}
            </p>
            <h2
              id="specialists-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[#292A23]"
            >
              {studioConfig.specialists.title}
            </h2>
          </div>

          <p className="text-sm text-[#77776B] max-w-sm leading-relaxed">
            {studioConfig.specialists.subtitle}
          </p>
        </div>

        {/* Сетка специалистов */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SPECIALISTS_CATALOG.map((specialist) => (
            <article
              key={specialist.id}
              className="group flex flex-col justify-between rounded-[26px] border border-[#E5E0D5] bg-[#F7F4ED] p-5 sm:p-6 transition-all duration-300 hover:border-[#667052]/50 hover:bg-[#FFFCF6] hover:shadow-md"
            >
              <div className="space-y-5">
                {/* Фотография мастера с мягким эффектом */}
                <div className="relative overflow-hidden rounded-2xl border border-[#E5E0D5]">
                  <WellnessImage
                    src={specialist.image}
                    alt={specialist.imageAlt}
                    containerClassName="aspect-[4/5] w-full"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-[#FFFCF6]/95 backdrop-blur-sm border border-[#E5E0D5] px-3 py-1 text-[11px] font-medium text-[#292A23] shadow-sm">
                    {specialist.experienceYears}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-[26px] font-medium text-[#292A23] group-hover:text-[#667052] transition-colors">
                    {specialist.name}
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#667052]">
                    {specialist.role}
                  </p>
                </div>

                <blockquote className="font-serif text-base italic leading-snug text-[#292A23]/85 border-l-2 border-[#C6B99F] pl-3 py-0.5">
                  {specialist.quote}
                </blockquote>

                <p className="text-xs sm:text-sm leading-relaxed text-[#5E5E53]">
                  {specialist.approach}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {specialist.specialties.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#FFFCF6] border border-[#E5E0D5] px-2.5 py-1 text-[11px] text-[#5E5E53]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Кнопка "Выбрать" специалиста */}
              <div className="mt-6 pt-5 border-t border-[#E5E0D5]">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between group/btn hover:bg-[#667052] hover:text-[#FFFCF6] transition-all"
                  onClick={() => onSelectSpecialistForBooking(specialist.id)}
                  aria-label={`Выбрать специалиста ${specialist.name} для записи`}
                >
                  <span className="font-medium text-xs uppercase tracking-wider">Выбрать</span>
                  <ArrowUpRight className="h-4 w-4 text-[#667052] group-hover/btn:text-[#FFFCF6] transition-colors" aria-hidden="true" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
