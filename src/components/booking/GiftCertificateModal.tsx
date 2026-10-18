import * as React from 'react';
import { Check, Gift, Info, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BRAND_CONFIG, type GiftCertificateTier } from '@/config/brand';
import {
  formatRussianPhoneInput,
  generateDemoReferenceCode,
  saveSessionCertificateRequest,
  type DemoCertificateRequest,
} from '@/lib/booking';
import { cn } from '@/lib/utils';

interface GiftCertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTierId?: string | null;
}

export const GiftCertificateModal: React.FC<GiftCertificateModalProps> = ({
  open,
  onOpenChange,
  initialTierId,
}) => {
  const tiers = BRAND_CONFIG.giftCertificates.tiers;
  const [selectedTierId, setSelectedTierId] = React.useState<string>(
    initialTierId || tiers[0].id
  );
  const [format, setFormat] = React.useState<'linen-envelope' | 'electronic'>(
    'linen-envelope'
  );
  const [recipientName, setRecipientName] = React.useState('');
  const [buyerName, setBuyerName] = React.useState('');
  const [buyerPhone, setBuyerPhone] = React.useState('');
  const [personalMessage, setPersonalMessage] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedCert, setSubmittedCert] =
    React.useState<DemoCertificateRequest | null>(null);

  React.useEffect(() => {
    if (open) {
      setSubmittedCert(null);
      setError(null);
      setIsSubmitting(false);
      if (initialTierId) {
        setSelectedTierId(initialTierId);
      }
    }
  }, [open, initialTierId]);

  const currentTier: GiftCertificateTier =
    tiers.find((t) => t.id === selectedTierId) || tiers[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (buyerName.trim().length < 2 || buyerPhone.replace(/\D/g, '').length < 11) {
      setError('Пожалуйста, укажите ваше имя и полный номер телефона для согласования сертификата.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    window.setTimeout(() => {
      const record: DemoCertificateRequest = {
        referenceCode: generateDemoReferenceCode('CERT'),
        createdAtIso: new Date().toISOString(),
        tierId: currentTier.id,
        tierTitle: currentTier.title,
        amountLabel: currentTier.amountLabel,
        format,
        recipientName: recipientName.trim() || 'Для близкого человека',
        buyerName: buyerName.trim(),
        buyerPhone: buyerPhone.trim(),
        personalMessage: personalMessage.trim(),
      };
      saveSessionCertificateRequest(record);
      setIsSubmitting(false);
      setSubmittedCert(record);
    }, 550);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        {submittedCert ? (
          <div className="space-y-5 py-2 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#667052]/30 bg-[#667052]/10 px-3.5 py-1 text-xs font-medium text-[#4F5B3E]">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Демо-заявка на сертификат оформлена</span>
            </div>

            <DialogTitle className="text-3xl">
              Сертификат подготовлен к согласованию
            </DialogTitle>
            <DialogDescription>
              Номер демонстрационной заявки:{' '}
              <strong className="font-mono text-[#292A23]">
                {submittedCert.referenceCode}
              </strong>
              . Онлайн-оплата на демонстрационном сайте не подключена — этот экран показывает сценарий оформления заявки без ложного списания средств.
            </DialogDescription>

            <div className="rounded-2xl border border-[#E5E0D5] bg-[#F7F4ED] p-4 text-sm space-y-2">
              <p>
                <span className="text-[#77776B]">Номинал / ритуал:</span>{' '}
                <strong className="text-[#292A23]">
                  {submittedCert.tierTitle} ({submittedCert.amountLabel})
                </strong>
              </p>
              <p>
                <span className="text-[#77776B]">Исполнение:</span>{' '}
                {submittedCert.format === 'linen-envelope'
                  ? 'Печатный сертификат в льняном конверте'
                  : 'Именной электронный сертификат'}
              </p>
              <p>
                <span className="text-[#77776B]">Для кого:</span>{' '}
                {submittedCert.recipientName}
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={() => onOpenChange(false)}>
                Готово
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#667052]">
                <Gift className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Заявка на подарочный сертификат (демо)</span>
              </div>
              <DialogTitle>Оформление сертификата ÉLAN</DialogTitle>
              <DialogDescription>
                Выберите формат приглашения. Онлайн-оплата не подключена в демо-режиме — мы сформируем демонстрационную заявку.
              </DialogDescription>
            </DialogHeader>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-[#B44C3E]/40 bg-[#B44C3E]/10 px-4 py-2.5 text-xs text-[#8C3327]"
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#292A23]">
                1. Номинал сертификата
              </span>
              <div className="grid grid-cols-1 gap-2">
                {tiers.map((tier) => {
                  const active = tier.id === selectedTierId;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTierId(tier.id)}
                      className={cn(
                        'flex items-center justify-between rounded-xl border p-3.5 text-left transition-all cursor-pointer',
                        active
                          ? 'border-[#667052] bg-[#F7F4ED] ring-1 ring-[#667052]'
                          : 'border-[#E5E0D5] bg-[#FFFCF6] hover:border-[#C6B99F]'
                      )}
                    >
                      <div>
                        <p className="font-serif text-lg font-medium text-[#292A23]">
                          {tier.title}
                        </p>
                        <p className="text-xs text-[#5E5E53]">{tier.subtitle}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#292A23] pl-3">
                        {tier.amountLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#292A23]">
                2. Формат вручения
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormat('linen-envelope')}
                  className={cn(
                    'rounded-xl border p-3 text-left text-xs transition-colors cursor-pointer',
                    format === 'linen-envelope'
                      ? 'border-[#667052] bg-[#F7F4ED] font-medium text-[#292A23]'
                      : 'border-[#E5E0D5] bg-[#FFFCF6] text-[#5E5E53]'
                  )}
                >
                  Льняной конверт с сургучной печатью
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('electronic')}
                  className={cn(
                    'rounded-xl border p-3 text-left text-xs transition-colors cursor-pointer',
                    format === 'electronic'
                      ? 'border-[#667052] bg-[#F7F4ED] font-medium text-[#292A23]'
                      : 'border-[#E5E0D5] bg-[#FFFCF6] text-[#5E5E53]'
                  )}
                >
                  Электронная версия (PDF / мессенджер)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="cert-buyer-name"
                  className="text-xs font-medium text-[#292A23]"
                >
                  Ваше имя *
                </label>
                <Input
                  id="cert-buyer-name"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Александр"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="cert-buyer-phone"
                  className="text-xs font-medium text-[#292A23]"
                >
                  Ваш телефон *
                </label>
                <Input
                  id="cert-buyer-phone"
                  type="tel"
                  value={buyerPhone}
                  onChange={(e) =>
                    setBuyerPhone(formatRussianPhoneInput(e.target.value))
                  }
                  placeholder="+7 (999) 000-00-00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="cert-recipient"
                  className="text-xs font-medium text-[#292A23]"
                >
                  Имя получателя (на открытке)
                </label>
                <Input
                  id="cert-recipient"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Екатерина"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="cert-message"
                  className="text-xs font-medium text-[#292A23]"
                >
                  Пожелание (необязательно)
                </label>
                <Input
                  id="cert-message"
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  placeholder="Время для тепла и тишины"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-[#F7F4ED] p-3 text-[11px] text-[#5E5E53]">
              <Info className="h-4 w-4 text-[#667052] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Демонстрационная форма: реальная оплата не производится. Заявка сохраняется локально в рамках вашей сессии.
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Отмена
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Оформляем...</span>
                  </>
                ) : (
                  <span>Оставить демо-заявку</span>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
