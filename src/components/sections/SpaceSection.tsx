import * as React from 'react';
import { Expand } from 'lucide-react';
import { BRAND_CONFIG, type SpaceGalleryItem } from '@/config/brand';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { WellnessImage } from '@/components/ui/wellness-image';
import { cn } from '@/lib/utils';

export const SpaceSection: React.FC = () => {
  const [selectedItem, setSelectedItem] =
    React.useState<SpaceGalleryItem | null>(null);

  return (
    <section
      id="space"
      aria-labelledby="space-heading"
      className="py-20 sm:py-28 lg:py-32 border-t border-[#E5E0D5]"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E5E0D5]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#667052]">
              АРХИТЕКТУРА И ТАКТИЛЬНОСТЬ
            </p>
            <h2
              id="space-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[#292A23]"
            >
              Пространство для вашего отдыха
            </h2>
          </div>

          <p className="text-sm text-[#5E5E53] max-w-md leading-relaxed">
            Массажные сьюты, текстурный травертин, мягкий свет свечей, подогретый лён, живые растения и ботанические масла. Каждая деталь создана для снижения сенсорной нагрузки.
          </p>
        </div>

        {/* Асимметричная галерея из 5 кадров */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {BRAND_CONFIG.spaceGallery.map((item) => (
            <figure
              key={item.id}
              className={cn(
                'group flex flex-col justify-between rounded-[24px] border border-[#E5E0D5] bg-[#FFFCF6] p-4 sm:p-5 transition-colors hover:border-[#C6B99F]',
                item.gridSpanClass
              )}
            >
              <button
                type="button"
                onClick={() => setSelectedItem(item)}
                aria-label={`Открыть описание зоны: ${item.title}`}
                className="relative block w-full text-left overflow-hidden rounded-2xl cursor-pointer"
              >
                <WellnessImage
                  src={item.image}
                  alt={item.imageAlt}
                  containerClassName={cn('w-full rounded-2xl', item.aspectClass)}
                  className="image-zoom-calm"
                />
                <span className="absolute left-3.5 top-3.5 rounded-full bg-[#FFFCF6]/92 backdrop-blur-sm border border-[#E5E0D5] px-3 py-1 text-[11px] font-medium text-[#292A23]">
                  {item.category}
                </span>
                <span className="absolute right-3.5 bottom-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFCF6]/90 text-[#292A23] opacity-90 transition-transform duration-200 group-hover:scale-105">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>

              <figcaption className="mt-4 space-y-1.5 px-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-2xl font-medium text-[#292A23]">
                    {item.title}
                  </h3>
                  <span className="text-xs text-[#667052] font-medium">
                    {item.materialNote}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5E5E53] leading-relaxed">
                  {item.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Модальное окно детального просмотра фотографии пространства */}
      <Dialog
        open={Boolean(selectedItem)}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      >
        <DialogContent className="max-w-3xl">
          {selectedItem && (
            <div className="space-y-4">
              <DialogHeader>
                <span className="text-xs uppercase tracking-[0.16em] text-[#667052]">
                  {selectedItem.category} · {selectedItem.materialNote}
                </span>
                <DialogTitle>{selectedItem.title}</DialogTitle>
                <DialogDescription>{selectedItem.description}</DialogDescription>
              </DialogHeader>

              <WellnessImage
                src={selectedItem.image}
                alt={selectedItem.imageAlt}
                containerClassName="aspect-[16/10] w-full rounded-2xl border border-[#E5E0D5]"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
