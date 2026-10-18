import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export type LegalDocType = 'privacy' | 'personal-data' | null;

interface LegalModalProps {
  docType: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ docType, onClose }) => {
  return (
    <Dialog open={Boolean(docType)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <span className="text-xs uppercase tracking-[0.16em] text-[#667052]">
            Правовая информация · Демо-режим
          </span>
          <DialogTitle>
            {docType === 'privacy'
              ? 'Политика конфиденциальности (Демо-шаблон)'
              : 'Согласие на обработку персональных данных'}
          </DialogTitle>
          <DialogDescription>
            Документ подготовлен для демонстрационного интерфейса студии ÉLAN Wellness.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-sm text-[#5E5E53] leading-relaxed">
          <p>
            1. <strong>Статус демонстрационного сайта:</strong> Настоящий веб-сайт является демонстрационным проектом бренда <strong>ÉLAN Wellness</strong>. Все цены, расписание и контактные данные носят ознакомительный характер и не являются публичной офертой.
          </p>
          <p>
            2. <strong>Локальное хранение данных:</strong> В демонстрационном режиме введённые вами имя, номер телефона и комментарии <strong>не передаются на внешние серверы</strong> и сохраняются исключительно во временном хранилище вашего браузера (`sessionStorage`) для демонстрации работы сценария онлайн-записи.
          </p>
          <p>
            3. <strong>Коммерческий запуск:</strong> При интеграции сайта с реальной CRM студии (например, YCLIENTS или собственным backend-сервисом) сюда размещаются реквизиты юридического лица / ИП и полный текст политики в соответствии с 152-ФЗ.
          </p>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#E5E0D5]">
          <Button type="button" onClick={onClose}>
            Понятно
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
