import * as React from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';
import {
  BRAND_PRESETS_LIST,
  getActiveBrandPreset,
  getActiveBrandPresetId,
  setBrandPreset,
  applyBrandTheme,
  type BrandPreset,
} from '@/config/brandPresets';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const BrandSwitcherBar: React.FC = () => {
  const [currentPresetId, setCurrentPresetId] = React.useState<string>(() =>
    getActiveBrandPresetId()
  );
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [copiedUrl, setCopiedUrl] = React.useState(false);

  // Плашка показывается ТОЛЬКО если вы явно указали ?demo=1 / ?demo=true в ссылке или включили её в админке.
  // Обычный клиент по ссылке ?brand=aura НЕ УВИДИТ эту плашку вообще!
  const [isVisible, setIsVisible] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const params = new URLSearchParams(window.location.search);
      const demoParam = params.get('demo');
      if (demoParam === '1' || demoParam === 'true') return true;
      return window.localStorage.getItem('elan_show_demo_bar') === 'true';
    } catch {
      return false;
    }
  });

  // Применяем цветовую палитру при первой загрузке
  React.useEffect(() => {
    const preset = getActiveBrandPreset();
    applyBrandTheme(preset.theme);

    const onBrandChanged = (e: CustomEvent<BrandPreset>) => {
      setCurrentPresetId(e.detail.id);
    };

    window.addEventListener('elan_brand_changed', onBrandChanged as EventListener);
    return () => {
      window.removeEventListener('elan_brand_changed', onBrandChanged as EventListener);
    };
  }, []);

  const handleSelectPreset = (presetId: string) => {
    setCurrentPresetId(presetId);
    setBrandPreset(presetId);
  };

  const handleCopyClientUrl = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('brand', currentPresetId);
    url.searchParams.delete('demo'); // Убираем параметр демо, чтобы клиент открыл идеально чистый сайт
    url.hash = '';

    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2800);
    });
  };

  const handleClosePermanently = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('elan_show_demo_bar');
      const url = new URL(window.location.href);
      url.searchParams.delete('demo');
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Если плашка отключена (для всех клиентов по умолчанию), ничего не рендерим
  if (!isVisible) {
    return null;
  }

  const activePreset = BRAND_PRESETS_LIST.find((p) => p.id === currentPresetId) || BRAND_PRESETS_LIST[0];

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50 animate-fade-up">
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="inline-flex items-center gap-2 rounded-full border border-[#E5E0D5] bg-[#FFFCF6]/95 backdrop-blur-md px-3.5 py-2 text-xs font-semibold text-[#292A23] shadow-lg hover:border-[#667052] hover:bg-[#F7F4ED] transition-all cursor-pointer"
          title="Открыть панель брендов"
        >
          <Layers className="h-4 w-4 text-[#667052]" />
          <span>Бренд: <strong className="text-[#667052]">{activePreset.shortName}</strong></span>
          <ChevronUp className="h-3.5 w-3.5 text-[#77776B]" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-xl z-50 animate-fade-up">
      <div className="rounded-2xl border-2 border-[#667052]/40 bg-[#FFFCF6]/95 backdrop-blur-md p-3.5 sm:p-4 shadow-2xl space-y-2.5">
        <div className="flex items-center justify-between gap-2 border-b border-[#E5E0D5] pb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#667052]">
            <Sparkles className="h-4 w-4" />
            <span>Панель разработчика: выбор бренда для презентации</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="p-1 text-[#77776B] hover:text-[#292A23] rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
              title="Свернуть"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleClosePermanently}
              className="p-1 text-[#77776B] hover:text-[#B44C3E] rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
              title="Скрыть эту панель (клиенты её не видят)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Кнопки пресетов */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {BRAND_PRESETS_LIST.map((preset) => {
            const isActive = preset.id === currentPresetId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset.id)}
                className={cn(
                  'rounded-xl border p-2 text-left transition-all cursor-pointer flex flex-col justify-between',
                  isActive
                    ? 'border-[#667052] bg-[#667052]/10 ring-1 ring-[#667052] shadow-xs'
                    : 'border-[#E5E0D5] bg-[#F7F4ED]/60 hover:bg-[#F7F4ED] hover:border-[#C6B99F]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xs sm:text-sm font-semibold text-[#292A23] truncate">
                    {preset.shortName}
                  </span>
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0 border border-black/10"
                    style={{ backgroundColor: preset.theme.primary }}
                  />
                </div>
                <p className="text-[10px] text-[#77776B] truncate mt-0.5">
                  {preset.city} · {preset.id === 'aura' ? 'Терракот' : preset.id === 'nordic' ? 'Шалфей' : 'Олива'}
                </p>
              </button>
            );
          })}
        </div>

        {/* Копирование персональной ссылки клиенту */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1 text-xs">
          <p className="text-[11px] text-[#5E5E53] leading-snug">
            Чистая ссылка для клиента: <strong className="text-[#292A23]">{activePreset.name}</strong>
          </p>

          <Button
            type="button"
            size="sm"
            onClick={handleCopyClientUrl}
            className="h-8 text-xs bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] font-medium gap-1.5 shadow-xs cursor-pointer shrink-0"
          >
            {copiedUrl ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Чистая ссылка скопирована!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Скопировать ссылку для клиента</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
