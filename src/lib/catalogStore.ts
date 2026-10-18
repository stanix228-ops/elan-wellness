import * as React from 'react';
import { studioConfig, type StudioService, type StudioSpecialist } from '@/config/studioConfig';

export type WellnessService = StudioService;
export type SpecialistProfile = StudioSpecialist;

const SERVICES_STORAGE_KEY = 'elan_wellness_services_v1';
const SPECIALISTS_STORAGE_KEY = 'elan_wellness_specialists_v1';
const CATALOG_EVENT_NAME = 'elan_catalog_updated';

/**
 * Библиотека проверенных высококачественных фотографий студии для удобного выбора
 */
export const PRESET_SERVICE_IMAGES = [
  {
    label: 'Массаж спины и плеч (тёплый свет, льняные простыни)',
    url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Релакс с аромамаслами и травами',
    url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Глубокотканный массаж (аккуратный фокус на мышцах)',
    url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Ароматерапия, натуральные эфирные масла',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Парный ритуал (два массажных стола, свечи)',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Горячие базальтовые камни и натуральный лен',
    url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Минималистичный SPA-кабинет из светлого дуба',
    url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80',
  },
];

export const PRESET_SPECIALIST_IMAGES = [
  {
    label: 'Мастер Анна (светлая форма, спокойный уверенный взгляд)',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Мастер Михаил (сильный специалист по глубоким техникам)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Мастер София (восточные техники, ароматерапия)',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Мастер Данияр (реабилитация, кинезиотейпирование)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Мастер Елена (мягкий релакс, антистресс-практики)',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
  },
];

function notifyCatalogUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CATALOG_EVENT_NAME));
  }
}

// ==================== УСЛУГИ ====================

export function getServicesCatalog(): WellnessService[] {
  if (typeof window === 'undefined') return studioConfig.services.items;
  try {
    const raw = window.localStorage.getItem(SERVICES_STORAGE_KEY);
    if (!raw) return studioConfig.services.items;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return studioConfig.services.items;
  } catch {
    return studioConfig.services.items;
  }
}

export function saveServicesCatalog(items: WellnessService[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(items));
    notifyCatalogUpdate();
  } catch {
    // ignore
  }
}

export function saveService(service: WellnessService): WellnessService[] {
  const current = getServicesCatalog();
  const index = current.findIndex((s) => s.id === service.id);
  let updated: WellnessService[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = service;
  } else {
    updated = [service, ...current];
  }

  saveServicesCatalog(updated);
  return updated;
}

export function deleteService(serviceId: string): WellnessService[] {
  const current = getServicesCatalog();
  const updated = current.filter((s) => s.id !== serviceId);
  saveServicesCatalog(updated);
  return updated;
}

export function resetServicesCatalog(): WellnessService[] {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(SERVICES_STORAGE_KEY);
    notifyCatalogUpdate();
  }
  return studioConfig.services.items;
}

// ==================== СПЕЦИАЛИСТЫ ====================

export function getSpecialistsCatalog(): SpecialistProfile[] {
  if (typeof window === 'undefined') return studioConfig.specialists.items;
  try {
    const raw = window.localStorage.getItem(SPECIALISTS_STORAGE_KEY);
    if (!raw) return studioConfig.specialists.items;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return studioConfig.specialists.items;
  } catch {
    return studioConfig.specialists.items;
  }
}

export function saveSpecialistsCatalog(items: SpecialistProfile[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SPECIALISTS_STORAGE_KEY, JSON.stringify(items));
    notifyCatalogUpdate();
  } catch {
    // ignore
  }
}

export function saveSpecialist(specialist: SpecialistProfile): SpecialistProfile[] {
  const current = getSpecialistsCatalog();
  const index = current.findIndex((s) => s.id === specialist.id);
  let updated: SpecialistProfile[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = specialist;
  } else {
    updated = [specialist, ...current];
  }

  saveSpecialistsCatalog(updated);
  return updated;
}

export function deleteSpecialist(specialistId: string): SpecialistProfile[] {
  const current = getSpecialistsCatalog();
  const updated = current.filter((s) => s.id !== specialistId);
  saveSpecialistsCatalog(updated);
  return updated;
}

export function resetSpecialistsCatalog(): SpecialistProfile[] {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(SPECIALISTS_STORAGE_KEY);
    notifyCatalogUpdate();
  }
  return studioConfig.specialists.items;
}

// ==================== REACT HOOK ДЛЯ ЖИВОГО ОБНОВЛЕНИЯ ====================

export function useStudioCatalog() {
  const [services, setServices] = React.useState<WellnessService[]>(() =>
    getServicesCatalog()
  );
  const [specialists, setSpecialists] = React.useState<SpecialistProfile[]>(() =>
    getSpecialistsCatalog()
  );

  const refresh = React.useCallback(() => {
    setServices(getServicesCatalog());
    setSpecialists(getSpecialistsCatalog());
  }, []);

  React.useEffect(() => {
    const handleUpdate = () => refresh();

    window.addEventListener(CATALOG_EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(CATALOG_EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refresh]);

  return {
    services,
    specialists,
    refresh,
    saveService: (item: WellnessService) => {
      const updated = saveService(item);
      setServices(updated);
    },
    removeService: (id: string) => {
      const updated = deleteService(id);
      setServices(updated);
    },
    restoreServices: () => {
      const def = resetServicesCatalog();
      setServices(def);
    },
    saveSpecialist: (item: SpecialistProfile) => {
      const updated = saveSpecialist(item);
      setSpecialists(updated);
    },
    removeSpecialist: (id: string) => {
      const updated = deleteSpecialist(id);
      setSpecialists(updated);
    },
    restoreSpecialists: () => {
      const def = resetSpecialistsCatalog();
      setSpecialists(def);
    },
  };
}

/**
 * Сжимает загруженный файл фотографии и конвертирует в base64 data URL
 * Оптимизирует размер до 1200px, чтобы не переполнять localStorage браузера
 */
export function compressAndReadFileAsDataUrl(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Выбранный файл не является изображением'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        reject(new Error('Не удалось прочитать файл'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };

      img.onerror = () => resolve(result);
      img.src = result;
    };

    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.readAsDataURL(file);
  });
}

