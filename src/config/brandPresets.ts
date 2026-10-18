import { studioConfig, type StudioConfig, type StudioService, type StudioSpecialist } from './studioConfig';

export interface BrandColorTheme {
  bg: string;
  surface: string;
  primary: string;
  primaryHover: string;
  accent: string;
  accentSoft: string;
  text: string;
  textMuted: string;
  border: string;
}

export interface BrandPreset {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  eyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroImage: string;
  city: string;
  currency: string;
  currencySymbol: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  workingHours: string;
  theme: BrandColorTheme;
  services: StudioService[];
  specialists: StudioSpecialist[];
}

// 1. Пресет: ÉLAN Wellness (Базовый премиум-релакс, Алматы, Олива & Лен)
const ELAN_PRESET: BrandPreset = {
  id: 'elan',
  name: 'ÉLAN Wellness',
  shortName: 'ÉLAN',
  tagline: 'Пространство тишины, восстановления и заботы о теле.',
  eyebrow: 'MASSAGE · BODY · MIND',
  heroTitleLine1: 'Вернитесь',
  heroTitleLine2: 'к себе.',
  heroSubtitle: 'Пространство тишины, восстановления и заботы о теле в центре Алматы.',
  heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
  city: 'Алматы',
  currency: 'KZT',
  currencySymbol: '₸',
  phone: '+77772345678',
  phoneDisplay: '+7 (777) 234-56-78',
  address: 'г. Алматы, пр. Достык, 180 (вход со стороны парка)',
  workingHours: 'Ежедневно: 10:00 — 22:00',
  theme: {
    bg: '#F7F4ED',
    surface: '#FFFCF6',
    primary: '#667052',
    primaryHover: '#4F5B3E',
    accent: '#C6B99F',
    accentSoft: '#EFECE4',
    text: '#292A23',
    textMuted: '#5E5E53',
    border: '#E5E0D5',
  },
  services: studioConfig.services.items,
  specialists: studioConfig.specialists.items,
};

// 2. Пресет: AURA Rituals & SPA (Восточный & Балийский SPA, Астана, Тёплый терракот & Сандал)
const AURA_PRESET: BrandPreset = {
  id: 'aura',
  name: 'AURA Rituals & SPA',
  shortName: 'AURA',
  tagline: 'Оазис безмятежности и телесного баланса в центре столицы.',
  eyebrow: 'SPA · RITUALS · TRANQUILITY',
  heroTitleLine1: 'Искусство',
  heroTitleLine2: 'замедлиться.',
  heroSubtitle: 'Тайские и балийские техники, натуральные масла и глубокое сенсорное расслабление в Астане.',
  heroImage: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1800&q=85',
  city: 'Астана',
  currency: 'KZT',
  currencySymbol: '₸',
  phone: '+77018884422',
  phoneDisplay: '+7 (701) 888-44-22',
  address: 'г. Астана, ул. Достык, 16 (Talan Towers, 3 этаж)',
  workingHours: 'Ежедневно: 09:00 — 23:00',
  theme: {
    bg: '#FAF5EE',
    surface: '#FFFDF9',
    primary: '#8C533E', // Тёплый терракот
    primaryHover: '#703E2D',
    accent: '#D4A373', // Янтарь / Сандал
    accentSoft: '#F2E8DC',
    text: '#2C2523',
    textMuted: '#685955',
    border: '#E8DDD0',
  },
  services: [
    {
      id: 'aura-bali-75',
      code: 'AURA-01',
      title: 'Балийский массаж с тёплыми маслами',
      subtitle: 'Мягкие растяжения и глубокое расслабление',
      category: 'relax',
      categoryLabel: 'Релакс & SPA',
      durationMinutes: 75,
      price: 12000,
      description: 'Традиционная индонезийская техника: комбинация акупрессуры, рефлексотерапии и мягких скользящих движений с маслом сандала и франжипани.',
      sensoryNotes: ['масло сандала', 'тихий шум воды', 'балийские чаши'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Балийский массаж с ароматическими маслами',
      featuredNote: 'Хит студии',
    },
    {
      id: 'aura-stones-90',
      code: 'AURA-02',
      title: 'Стоун-терапия горячими базальтовыми камнями',
      subtitle: 'Прогревание глубоких мышц и снятие стресса',
      category: 'rituals',
      categoryLabel: 'Спа-ритуалы',
      durationMinutes: 90,
      price: 16000,
      description: 'Вулканические камни вулканического происхождения удерживают тепло и снимают глубокие спазмы вдоль всего позвоночника.',
      sensoryNotes: ['горячий базальт', 'льняные простыни', 'масло жасмина'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Массаж горячими камнями',
      featuredNote: 'Премиум',
    },
    {
      id: 'aura-silk-60',
      code: 'AURA-03',
      title: 'Арома-ритуал «Шёлковый путь»',
      subtitle: 'Антистресс-программа для тела и головы',
      category: 'relax',
      categoryLabel: 'Релакс & SPA',
      durationMinutes: 60,
      price: 11000,
      description: 'Нежный расслабляющий массаж от кончиков пальцев ног до кожи головы с индивидуально подобранной композицией эфирных масел.',
      sensoryNotes: ['эфир лаванды и бергамота', 'массаж головы', 'тёплый свет'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Ароматерапия и релакс',
    },
    {
      id: 'aura-couples-120',
      code: 'AURA-04',
      title: 'Парный спа-ритуал для двоих',
      subtitle: 'Синхронный массаж в приватном сьюте со свечами',
      category: 'rituals',
      categoryLabel: 'Для двоих',
      durationMinutes: 120,
      price: 28000,
      description: 'Два мастера работают одновременно в просторном уединённом сьюте. Включает массаж всего тела, чайную церемонию и фруктовое угощение.',
      sensoryNotes: ['свечи', 'чайная церемония', 'две кушетки'],
      intensity: 'Адаптивная',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Парный ритуал в спа',
      featuredNote: 'Для пар',
    },
  ],
  specialists: [
    {
      id: 'aura-kamila',
      name: 'Камила Сабитова',
      role: 'Мастер восточных спа-практик · 6 лет опыта',
      experienceYears: '6 лет опыта',
      approach: 'Обучалась на Бали и в Таиланде. Мягко снимает ментальную усталость через работу с энергетическими меридианами и аромамаслами.',
      quote: '«Тело — это храм. Прикосновение должно быть уважительным, бережным и тёплым».',
      specialties: ['Балийский массаж', 'Стоун-терапия', 'Ароматерапия'],
      serviceIds: ['aura-bali-75', 'aura-stones-90', 'aura-silk-60', 'aura-couples-120'],
      workingDays: [1, 2, 3, 5, 6],
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Мастер Камила Сабитова',
    },
    {
      id: 'aura-damir',
      name: 'Дамир Ибраев',
      role: 'Ведущий специалист по стоун-терапии · 8 лет опыта',
      experienceYears: '8 лет опыта',
      approach: 'Идеально рассчитывает температуру базальтовых камней и нажим для глубокого расслабления зажатых плеч и спины.',
      quote: '«Глубокое тепло расслабляет даже те спазмы, до которых невозможно добраться руками».',
      specialties: ['Массаж камнями', 'Глубокий релакс', 'Парные программы'],
      serviceIds: ['aura-stones-90', 'aura-bali-75', 'aura-couples-120'],
      workingDays: [0, 2, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Специалист Дамир Ибраев',
    },
  ],
};

// 3. Пресет: NORDIC Therapy (Здоровая спина, спорт, кинезио, Алматы, Скандинавский сланец & Шалфей)
const NORDIC_PRESET: BrandPreset = {
  id: 'nordic',
  name: 'NORDIC Therapy',
  shortName: 'NORDIC',
  tagline: 'Свобода движения, здоровая осанка и восстановление мышц.',
  eyebrow: 'RECOVERY · POSTURE · PERFORMANCE',
  heroTitleLine1: 'Движение',
  heroTitleLine2: 'без зажимов.',
  heroSubtitle: 'Специализированная проработка спины, триггерных зон и спортивное восстановление в Алматы.',
  heroImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1800&q=85',
  city: 'Алматы',
  currency: 'KZT',
  currencySymbol: '₸',
  phone: '+77073219900',
  phoneDisplay: '+7 (707) 321-99-00',
  address: 'пр. Аль-Фараби, 77/8 (БЦ Esentai Park, блок B)',
  workingHours: 'Пн — Сб: 08:30 — 21:30, Вс: 10:00 — 20:00',
  theme: {
    bg: '#F2F5F3',
    surface: '#FAFCFA',
    primary: '#3D5A53', // Скандинавский сланец
    primaryHover: '#2B403B',
    accent: '#8EA89F', // Шалфейный минерал
    accentSoft: '#E2EBE6',
    text: '#1E2825',
    textMuted: '#52625D',
    border: '#D7E2DC',
  },
  services: [
    {
      id: 'nordic-back-45',
      code: 'NORDIC-01',
      title: 'Терапевтическая проработка спины и шеи',
      subtitle: 'Снятие зажимов от сидячей работы',
      category: 'recovery',
      categoryLabel: 'Здоровая спина',
      durationMinutes: 45,
      price: 8500,
      description: 'Прицельная работа с шейно-воротниковой зоной, грудным отделом и поясницей. Устраняет ноющие боли, улучшает приток крови к голове.',
      sensoryNotes: ['охлаждающий бальзам', 'ортопедическая кушетка', 'точечный нажим'],
      intensity: 'Глубокая',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Терапевтический массаж спины',
      featuredNote: 'Топ при болях в шее',
    },
    {
      id: 'nordic-sport-60',
      code: 'NORDIC-02',
      title: 'Спортивный восстановительный массаж',
      subtitle: 'Выведение молочной кислоты и мобилизация суставов',
      category: 'recovery',
      categoryLabel: 'Спорт & Реабилитация',
      durationMinutes: 60,
      price: 10500,
      description: 'Интенсивная силовая проработка крупных мышечных групп после тренировок, бега или соревнований. Ускоряет регенерацию связок.',
      sensoryNotes: ['масло арники', 'растяжка', 'силовой нажим'],
      intensity: 'Глубокая',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Спортивный массаж',
      featuredNote: 'Для спортсменов',
    },
    {
      id: 'nordic-mfr-75',
      code: 'NORDIC-03',
      title: 'Миофасциальный релиз всего тела',
      subtitle: 'Восстановление эластичности фасций',
      category: 'recovery',
      categoryLabel: 'Кинезио',
      durationMinutes: 75,
      price: 13000,
      description: 'Мягкое, но очень глубокое расслабление фасциальных футляров тела. Возвращает анатомическую лёгкость походке и снимает хронические спазмы.',
      sensoryNotes: ['мягкий свет', 'медленное погружение', 'ортопедический комфорт'],
      intensity: 'Адаптивная',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Миофасциальный массаж',
    },
    {
      id: 'nordic-classic-60',
      code: 'NORDIC-04',
      title: 'Общий классический массаж',
      subtitle: 'Комплексный тонус и лимфодренаж',
      category: 'classic',
      categoryLabel: 'Классика',
      durationMinutes: 60,
      price: 9500,
      description: 'Классическая шведская методика: поглаживание, растирание, разминание и вибрация для улучшения лимфотока и общего самочувствия.',
      sensoryNotes: ['масло виноградной косточки', 'тёплые полотенца'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Классический массаж',
    },
  ],
  specialists: [
    {
      id: 'nordic-artem',
      name: 'Артём Смирнов',
      role: 'Спортивный реабилитолог · 8 лет опыта',
      experienceYears: '8 лет опыта',
      approach: 'Работал со сборными командами. Безошибочно находит триггерные точки и зажатые нервные корешки, быстро возвращая подвижность.',
      quote: '«Здоровое тело не должно напоминать о себе болью при каждом наклоне».',
      specialties: ['Спортивный массаж', 'Терапия спины', 'МФР'],
      serviceIds: ['nordic-back-45', 'nordic-sport-60', 'nordic-mfr-75', 'nordic-classic-60'],
      workingDays: [1, 2, 3, 4, 5],
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Артём Смирнов',
    },
    {
      id: 'nordic-daria',
      name: 'Дарья Волкова',
      role: 'Кинезиотерапевт · 6 лет опыта',
      experienceYears: '6 лет опыта',
      approach: 'Мягко выравнивает тонус антагонистов мышц, помогая избавиться от сутулости и головных болей напряжения.',
      quote: '«Осанка меняет не только походку, но и уровень внутренней энергии».',
      specialties: ['Коррекция осанки', 'Массаж спины и шеи', 'Классика'],
      serviceIds: ['nordic-back-45', 'nordic-mfr-75', 'nordic-classic-60'],
      workingDays: [0, 2, 4, 6],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Дарья Волкова',
    },
  ],
};

export const BRAND_PRESETS: Record<string, BrandPreset> = {
  elan: ELAN_PRESET,
  aura: AURA_PRESET,
  nordic: NORDIC_PRESET,
};

export const BRAND_PRESETS_LIST: BrandPreset[] = [
  ELAN_PRESET,
  AURA_PRESET,
  NORDIC_PRESET,
];

const BRAND_PRESET_STORAGE_KEY = 'elan_active_brand_preset_id';

/**
 * Определяет активный пресет: сначала проверяет URL (?brand=aura), затем localStorage, иначе elan
 */
export function getActiveBrandPresetId(): string {
  if (typeof window === 'undefined') return 'elan';
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const fromUrl = urlParams.get('brand')?.toLowerCase().trim();
    if (fromUrl && BRAND_PRESETS[fromUrl]) {
      window.localStorage.setItem(BRAND_PRESET_STORAGE_KEY, fromUrl);
      return fromUrl;
    }

    const saved = window.localStorage.getItem(BRAND_PRESET_STORAGE_KEY);
    if (saved && BRAND_PRESETS[saved]) {
      return saved;
    }

    return 'elan';
  } catch {
    return 'elan';
  }
}

export function getActiveBrandPreset(): BrandPreset {
  const id = getActiveBrandPresetId();
  return BRAND_PRESETS[id] || ELAN_PRESET;
}

/**
 * Применяет CSS-переменные цветовой гаммы бренда на корень документа :root
 */
export function applyBrandTheme(theme: BrandColorTheme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--elan-bg', theme.bg);
  root.style.setProperty('--elan-surface', theme.surface);
  root.style.setProperty('--elan-primary', theme.primary);
  root.style.setProperty('--elan-primary-hover', theme.primaryHover);
  root.style.setProperty('--elan-accent', theme.accent);
  root.style.setProperty('--elan-accent-soft', theme.accentSoft);
  root.style.setProperty('--elan-text', theme.text);
  root.style.setProperty('--elan-text-muted', theme.textMuted);
  root.style.setProperty('--elan-border', theme.border);
}

/**
 * Переключает бренд и обновляет URL без перезагрузки страницы
 */
export function setBrandPreset(presetId: string): BrandPreset {
  const preset = BRAND_PRESETS[presetId] || ELAN_PRESET;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(BRAND_PRESET_STORAGE_KEY, preset.id);

    // Обновляем query параметр ?brand= в URL
    const url = new URL(window.location.href);
    url.searchParams.set('brand', preset.id);
    window.history.replaceState({}, '', url.toString());

    // Применяем цветовую палитру
    applyBrandTheme(preset.theme);

    // Оповещаем компоненты
    window.dispatchEvent(new CustomEvent('elan_brand_changed', { detail: preset }));
  }
  return preset;
}
