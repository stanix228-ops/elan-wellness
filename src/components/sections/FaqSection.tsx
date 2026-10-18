import * as React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

interface FaqSectionProps {
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 sm:py-28 lg:py-32 border-t border-[#E5E0D5] bg-[#FFFCF6]"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Левая колонка: заголовок и карточка заботы */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#667052]">
              ЧАСТЫЕ ВОПРОСЫ
            </p>
            <h2
              id="faq-heading"
              className="font-serif text-4xl sm:text-5xl font-normal leading-[1.08] text-[#292A23]"
            >
              Детали вашего визита
            </h2>
            <p className="text-sm sm:text-base text-[#5E5E53] leading-relaxed">
              Мы продумали каждый этап посещения так, чтобы вы могли прийти налегке и ни о чём не беспокоиться.
            </p>

            <div className="rounded-2xl border border-[#E5E0D5] bg-[#F7F4ED] p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#667052]">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Индивидуальный подбор</span>
              </div>
              <p className="font-serif text-2xl text-[#292A23]">
                Не уверены, какой ритуал выбрать?
              </p>
              <p className="text-xs sm:text-sm text-[#5E5E53] leading-relaxed">
                Оставьте заявку на базовый 60-минутный сеанс и укажите в комментарии «Подобрать на месте» — мастер поможет определиться перед началом практики.
              </p>
              <Button type="button" variant="outline" size="sm" onClick={onOpenBooking}>
                Перейти к выбору времени
              </Button>
            </div>
          </div>

          {/* Правая колонка: доступный аккордеон с клавиатурной навигацией */}
          <div className="lg:col-span-7">
            <Accordion
              type="single"
              collapsible
              defaultValue={BRAND_CONFIG.faq[0].id}
              className="w-full border-t border-[#E5E0D5]"
            >
              {BRAND_CONFIG.faq.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
