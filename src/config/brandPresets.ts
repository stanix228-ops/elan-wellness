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
  addressLine1?: string;
  addressLine2?: string;
  subway?: string;
  yandexMapsUrl?: string;
  workingHours: string;
  parkingNote?: string;
  paletteName?: string;
  theme: BrandColorTheme;
  services: StudioService[];
  specialists: StudioSpecialist[];
}

// ============================================================================
// 1. ПРЕСЕТ: «Массаж СПА» (Москва, ЖК «Прокшино», м. «Прокшино»)
// Ссылка: https://yandex.kz/maps/org/massazh_spa/110204625320/?ll=37.427560%2C55.594693&z=16
// ============================================================================
const MASSAZH_SPA_PRESET: BrandPreset = {
  id: 'massazh-spa',
  name: 'Массаж СПА',
  shortName: 'Массаж СПА',
  tagline: 'Пространство оздоровления, кедровой спа-терапии и глубокого релакса.',
  eyebrow: 'HEALTH · CEDAR SPA · BODY RENEWAL',
  heroTitleLine1: 'Возвращение сил',
  heroTitleLine2: 'и лёгкости.',
  heroSubtitle: 'Студия массажа и кедровой фитотерапии в ЖК «Прокшино». Профессиональное снятие спазмов, оздоровление спины и глубокий релакс.',
  heroImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1800&q=85',
  city: 'Москва',
  currency: 'RUB',
  currencySymbol: '₽',
  phone: '+79145089088',
  phoneDisplay: '+7 (914) 508-90-88',
  address: 'г. Москва, п. Сосенское, ул. Лобановский Лес, д. 11',
  addressLine1: 'Москва, п. Сосенское, ул. Лобановский Лес, д. 11',
  addressLine2: 'ЖК «Прокшино», м. «Прокшино»',
  subway: 'м. Прокшино',
  yandexMapsUrl: 'https://yandex.kz/maps/org/massazh_spa/110204625320/?ll=37.427560%2C55.594693&z=16',
  workingHours: 'Ежедневно: 10:00 — 22:00',
  parkingNote: 'Бесплатная парковка вокруг ЖК «Прокшино» · 8 минут пешком от м. Прокшино',
  paletteName: 'Хвойный лес & Кедр',
  theme: {
    bg: '#F6F8F5',
    surface: '#FCFDFC',
    primary: '#3B5B45', // Глубокий хвойно-зелёный
    primaryHover: '#2C4635',
    accent: '#B38F60', // Кедровое дерево / мёд
    accentSoft: '#EAE4D9',
    text: '#202923',
    textMuted: '#58695F',
    border: '#DCE4DC',
  },
  services: [
    {
      id: 'mspa-classic-60',
      code: 'MSPA-01',
      title: 'Классический оздоровительный массаж',
      subtitle: 'Комплексная проработка мышц всего тела',
      category: 'classic',
      categoryLabel: 'Классика',
      durationMinutes: 60,
      price: 3500,
      description: 'Глубокое разминание мышц спины, шеи, ног и рук. Устраняет зажимы, улучшает лимфоток и возвращает телу комфортную подвижность.',
      sensoryNotes: ['натуральное масло', 'тёплые полотенца', 'глубокое разминание'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Классический оздоровительный массаж',
      featuredNote: 'Базовая программа',
    },
    {
      id: 'mspa-back-45',
      code: 'MSPA-02',
      title: 'Массаж спины и шейно-воротниковой зоны',
      subtitle: 'Прицельное снятие зажимов в шее и трапециях',
      category: 'recovery',
      categoryLabel: 'Здоровая спина',
      durationMinutes: 45,
      price: 2600,
      description: 'Прицельная работа с триггерами в области лопаток, шеи и поясницы. Снимает головные боли напряжения и скованность после сидячей работы.',
      sensoryNotes: ['точечный нажим', 'ортопедическая кушетка', 'лёгкость в плечах'],
      intensity: 'Глубокая',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Массаж спины и шеи',
      featuredNote: 'Топ при сидячей работе',
    },
    {
      id: 'mspa-barrel-80',
      code: 'MSPA-03',
      title: 'СПА-ритуал: Кедровая бочка + массаж',
      subtitle: 'Распаривание на сибирских травах и релакс',
      category: 'rituals',
      categoryLabel: 'Спа-ритуалы',
      durationMinutes: 80,
      price: 4800,
      description: 'Прогревание в фитобочке из реликтового сибирского кедра с травяными сборами, после чего следует расслабляющий массаж с натуральными маслами.',
      sensoryNotes: ['сибирский кедр', 'целебные травы', 'травяной чай с мёдом'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Кедровая бочка и массаж',
      featuredNote: 'Фирменный ритуал',
    },
    {
      id: 'mspa-sport-60',
      code: 'MSPA-04',
      title: 'Спортивный восстановительный массаж',
      subtitle: 'Силовая проработка мышц и связок',
      category: 'recovery',
      categoryLabel: 'Спорт & Тонус',
      durationMinutes: 60,
      price: 3800,
      description: 'Интенсивная силовая техника для спортсменов и активных людей. Снимает гипертонус, выводит молочную кислоту и ускоряет регенерацию связок.',
      sensoryNotes: ['силовой нажим', 'растяжка связок', 'масло арники'],
      intensity: 'Глубокая',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Спортивный массаж',
    },
    {
      id: 'mspa-drain-75',
      code: 'MSPA-05',
      title: 'Лимфодренажный детокс-массаж',
      subtitle: 'Снятие отёчности и лёгкость во всём теле',
      category: 'relax',
      categoryLabel: 'Релакс & Детокс',
      durationMinutes: 75,
      price: 4200,
      description: 'Мягкие волнообразные движения по ходу лимфотока способствуют выводу лишней жидкости, активизируют метаболизм и подтягивают контуры тела.',
      sensoryNotes: ['дренажный ритм', 'детокс-эффект', 'ощущение невесомости'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Лимфодренажный массаж',
    },
    {
      id: 'mspa-harmony-90',
      code: 'MSPA-06',
      title: 'СПА-программа «Гармония и Релакс»',
      subtitle: 'Солевой пилинг с кедром и расслабляющий массаж',
      category: 'rituals',
      categoryLabel: 'Спа-ритуалы',
      durationMinutes: 90,
      price: 5500,
      description: 'Деликатное очищение кожи солевым скрабом с кедровой живицей, тёплое обёртывание и полноценный расслабляющий массаж всего тела.',
      sensoryNotes: ['солевой пилинг', 'кедровое масло', 'полное умиротворение'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Спа-программа Гармония и Релакс',
      featuredNote: 'Премиум уход',
    },
  ],
  specialists: [
    {
      id: 'mspa-mikhail',
      name: 'Михаил Воронов',
      role: 'Ведущий массажист · Спортивная и триггерная терапия (стаж 8 лет)',
      experienceYears: '8 лет опыта',
      approach: 'Специализируется на устранении хронических спазмов спины и глубокой мышечной проработке. Индивидуально подбирает интенсивность нажима.',
      quote: '«Каждое тело индивидуально. Моя цель — чтобы вы встали с кушетки свободными от боли и зажимов».',
      specialties: ['Спортивный массаж', 'Массаж спины и шеи', 'Классический массаж'],
      serviceIds: ['mspa-classic-60', 'mspa-back-45', 'mspa-sport-60'],
      workingDays: [1, 2, 3, 5, 6],
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Михаил Воронов',
    },
    {
      id: 'mspa-anna',
      name: 'Анна Белова',
      role: 'Мастер СПА-ритуалов и релакс-техник · Фитотерапевт (стаж 6 лет)',
      experienceYears: '6 лет опыта',
      approach: 'Тонко чувствует эмоциональное и физическое состояние гостя. Виртуозно проводит программы в кедровой бочке и релакс-ритуалы.',
      quote: '«Кедровая бочка и бережные прикосновения перезагружают нервную систему лучше недели отпуска».',
      specialties: ['Кедровая бочка', 'СПА-программы', 'Лимфодренажный массаж'],
      serviceIds: ['mspa-barrel-80', 'mspa-drain-75', 'mspa-harmony-90', 'mspa-classic-60'],
      workingDays: [0, 2, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Анна Белова',
    },
    {
      id: 'mspa-dmitry',
      name: 'Дмитрий Смирнов',
      role: 'Специалист классического и лимфодренажного массажа (стаж 5 лет)',
      experienceYears: '5 лет опыта',
      approach: 'Владеет мягкими дренажными и восстановительными методиками. Помогает избавиться от тяжести в ногах и мышечной скованности.',
      quote: '«Правильный лимфоток возвращает телу лёгкость, а коже — свежесть и упругость».',
      specialties: ['Классический массаж', 'Лимфодренаж', 'Релакс'],
      serviceIds: ['mspa-classic-60', 'mspa-drain-75', 'mspa-back-45'],
      workingDays: [1, 3, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Дмитрий Смирнов',
    },
  ],
};

// ============================================================================
// 2. ПРЕСЕТ: «ТАЙРАЙ» (Москва, ул. Большая Дорогомиловская, 10, м. «Киевская»)
// Ссылка: https://yandex.kz/maps/org/tayray/133642635708/?ll=37.563027%2C55.746259&z=16
// ============================================================================
const TAIRAY_PRESET: BrandPreset = {
  id: 'tairai',
  name: 'ТАЙРАЙ',
  shortName: 'ТАЙРАЙ',
  tagline: 'Аутентичный королевский тайский массаж и СПА в центре Москвы.',
  eyebrow: 'ROYAL THAI MASSAGE · SPA · LOTUS',
  heroTitleLine1: 'Королевские',
  heroTitleLine2: 'тайские ритуалы.',
  heroSubtitle: 'Аутентичный тайский массаж от дипломированных мастеров из Королевства Таиланд. Салон у метро «Киевская», Москва.',
  heroImage: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1800&q=85',
  city: 'Москва',
  currency: 'RUB',
  currencySymbol: '₽',
  phone: '+74952254242',
  phoneDisplay: '+7 (495) 225-42-42',
  address: 'г. Москва, ул. Большая Дорогомиловская, д. 10',
  addressLine1: 'Москва, ул. Большая Дорогомиловская, д. 10',
  addressLine2: '1 этаж, отдельный вход, м. «Киевская»',
  subway: 'м. Киевская',
  yandexMapsUrl: 'https://yandex.kz/maps/org/tayray/133642635708/?ll=37.563027%2C55.746259&z=16',
  workingHours: 'Ежедневно: 10:00 — 22:00',
  parkingNote: 'Городская парковка вдоль Большой Дорогомиловской · 4 минуты пешком от м. Киевская',
  paletteName: 'Тайский лотос & Тёплый тик',
  theme: {
    bg: '#FAF6EE', // Тёплый шёлковый крем
    surface: '#FFFCF7',
    primary: '#7B5234', // Богатый благородный тиковый орех
    primaryHover: '#613E24',
    accent: '#C99738', // Королевское тайское золото / янтарь
    accentSoft: '#F5E9D3',
    text: '#28221D',
    textMuted: '#695D52',
    border: '#E7DDCF',
  },
  services: [
    {
      id: 'tairai-trad-60',
      code: 'TR-01',
      title: 'Традиционный тайский массаж',
      subtitle: 'Пассивная йога и акупрессура на специальном мате',
      category: 'classic',
      categoryLabel: 'Тайские традиции',
      durationMinutes: 60,
      price: 4200,
      description: 'Древняя методика работы с энергетическими линиями Сен Сип. Выполняется в хлопковом кимоно без масел. Снимает блоки и возвращает телу невероятную гибкость.',
      sensoryNotes: ['хлопковое кимоно', 'тайский мат', 'глубокая растяжка'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Традиционный тайский массаж',
      featuredNote: 'Аутентичный ритуал',
    },
    {
      id: 'tairai-trad-90',
      code: 'TR-02',
      title: 'Традиционный тайский массаж',
      subtitle: 'Расширенная программа глубокой растяжки и раскрытия суставов',
      category: 'classic',
      categoryLabel: 'Тайские традиции',
      durationMinutes: 90,
      price: 5600,
      description: 'Полный полуторачасовой сеанс: проработка всех суставов, позвоночника, шеи и головы. Идеально снимает хроническую скованность и усталость.',
      sensoryNotes: ['мастер из Таиланда', 'пассивная йога', 'полное раскрытие суставов'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Традиционный тайский массаж 90 минут',
      featuredNote: 'Хит студии',
    },
    {
      id: 'tairai-oil-60',
      code: 'TR-03',
      title: 'Тайский ойл-массаж с аромамаслами',
      subtitle: 'Плавные скользящие техники с тёплым маслом',
      category: 'relax',
      categoryLabel: 'Ойл & Релакс',
      durationMinutes: 60,
      price: 4500,
      description: 'Нежное, но глубокое скольжение вдоль мышечных волокон с применением натуральных тайских масел (лемонграсс, франжипани, жасмин).',
      sensoryNotes: ['масло лемонграсса', 'тёплое скольжение', 'снятие стресса'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Тайский ойл-массаж',
      featuredNote: 'Любимый гостями',
    },
    {
      id: 'tairai-royal-90',
      code: 'TR-04',
      title: 'Королевский тайский ойл-массаж',
      subtitle: 'Комбинация акупрессуры и ароматических масел',
      category: 'rituals',
      categoryLabel: 'Спа-ритуалы',
      durationMinutes: 90,
      price: 5900,
      description: 'Синтез мягкой точечной проработки и обволакивающего масляного массажа. Максимальное расслабление каждой клеточки тела.',
      sensoryNotes: ['королевский уход', 'масло франжипани', 'массаж головы и стоп'],
      intensity: 'Адаптивная',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Королевский ойл массаж',
    },
    {
      id: 'tairai-herbal-75',
      code: 'TR-05',
      title: 'Массаж горячими травяными мешочками',
      subtitle: 'Прогревание целебными сборами трав Таиланда',
      category: 'rituals',
      categoryLabel: 'Спа-ритуалы',
      durationMinutes: 75,
      price: 5200,
      description: 'Распаренные полотняные мешочки с имбирём, камфорой, кафрским лаймом и куркумой мягко прогревают глубокие мышечные слои.',
      sensoryNotes: ['тайские травы', 'мягкое прогревание', 'аромат камфоры и лайма'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Массаж травяными мешочками',
    },
    {
      id: 'tairai-couple-120',
      code: 'TR-06',
      title: 'СПА-программа для двоих «Тайская сказка»',
      subtitle: 'Синхронный ритуал в VIP-комнате для двоих',
      category: 'rituals',
      categoryLabel: 'Для двоих',
      durationMinutes: 120,
      price: 11900,
      description: 'Приватный сьют со свечами: традиционное омовение ног с лепестками роз, ойл-массаж для двоих, массаж лица и чайная церемония с чаем Матум.',
      sensoryNotes: ['две кушетки', 'лепестки лотоса', 'чай Матум и фрукты'],
      intensity: 'Адаптивная',
      image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'СПА-программа для двоих',
      featuredNote: 'Для пар',
    },
  ],
  specialists: [
    {
      id: 'tairai-supatra',
      name: 'Супатра',
      role: 'Топ-мастер высшей категории · Школа Ват Пхо (Бангкок, 11 лет опыта)',
      experienceYears: '11 лет опыта',
      approach: 'Потомственный мастер из Таиланда, окончила легендарную монастырскую школу массажа Ват Пхо в Бангкоке. Виртуозно владеет акупрессурой и королевским ойл-массажем.',
      quote: '«Тайский массаж — это медитация в движении, исцеляющая тело и успокаивающая ум».',
      specialties: ['Традиционный тайский', 'Королевский ойл', 'Акупрессура'],
      serviceIds: ['tairai-trad-60', 'tairai-trad-90', 'tairai-royal-90', 'tairai-couple-120'],
      workingDays: [1, 2, 3, 5, 6],
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Супатра',
    },
    {
      id: 'tairai-kanya',
      name: 'Канья',
      role: 'Мастер традиционного тайского и ойл-массажа · 9 лет опыта',
      experienceYears: '9 лет опыта',
      approach: 'Мягкий, бережный и невероятно чуткий мастер. Превосходно снимает усталость в ногах и спине после перелётов и интенсивных рабочих дней.',
      quote: '«Тепло рук и чистое сердце мастера передают гармонию каждому гостю».',
      specialties: ['Ойл-массаж', 'Массаж ног', 'СПА для двоих'],
      serviceIds: ['tairai-oil-60', 'tairai-trad-60', 'tairai-couple-120'],
      workingDays: [0, 2, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Канья',
    },
    {
      id: 'tairai-pon',
      name: 'Пон',
      role: 'Специалист по прогреванию травяными мешочками · 7 лет опыта',
      experienceYears: '7 лет опыта',
      approach: 'Знаток тайской фитотерапии. Идеально рассчитывает температуру травяных мешочков для расслабления самых глубоких мышечных зажимов.',
      quote: '«Целебные травы Таиланда возвращают внутреннее равновесие и лёгкость духа».',
      specialties: ['Травяные мешочки', 'Стоун-терапия', 'Тайский массаж'],
      serviceIds: ['tairai-herbal-75', 'tairai-trad-60', 'tairai-oil-60'],
      workingDays: [1, 3, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Пон',
    },
  ],
};

// ============================================================================
// 3. ПРЕСЕТ: «Just Relax» (Москва, ул. Гашека, 11, м. «Маяковская» / «Белорусская»)
// Ссылка: https://yandex.kz/maps/org/just_relax/152852320837/?ll=37.591099%2C55.769753&z=16
// ============================================================================
const JUST_RELAX_PRESET: BrandPreset = {
  id: 'just-relax',
  name: 'Just Relax',
  shortName: 'Just Relax',
  tagline: 'Студия умного массажа и эстетики тела на Маяковской.',
  eyebrow: 'SMART MASSAGE · AESTHETICS · BODY BALANCE',
  heroTitleLine1: 'Телу нужен',
  heroTitleLine2: 'Just Relax.',
  heroSubtitle: 'Студия умного массажа и эстетики на Маяковской. Подогреваемые столы, бережная проработка триггеров и авторский чай после сеанса.',
  heroImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1800&q=85',
  city: 'Москва',
  currency: 'RUB',
  currencySymbol: '₽',
  phone: '+79999107341',
  phoneDisplay: '+7 (999) 910-73-41',
  address: 'г. Москва, ул. Гашека, д. 11',
  addressLine1: 'Москва, ул. Гашека, д. 11',
  addressLine2: 'Цокольный этаж, м. «Маяковская» / «Белорусская»',
  subway: 'м. Маяковская',
  yandexMapsUrl: 'https://yandex.kz/maps/org/just_relax/152852320837/?ll=37.591099%2C55.769753&z=16',
  workingHours: 'Ежедневно: 10:00 — 22:00',
  parkingNote: 'Парковка в тихих переулках вокруг ул. Гашека · 5 минут пешком от м. Маяковская',
  paletteName: 'Скандинавский графит & Песок',
  theme: {
    bg: '#F5F4F0', // Элегантный скандинавский песок
    surface: '#FAFAF7',
    primary: '#37433B', // Глубокий графитово-эвкалиптовый
    primaryHover: '#252E28',
    accent: '#B88A6E', // Терракотово-песочный нубук
    accentSoft: '#EDE5DC',
    text: '#222523',
    textMuted: '#5C635E',
    border: '#DEDCD4',
  },
  services: [
    {
      id: 'jr-relax-60',
      code: 'JR-01',
      title: 'Общий расслабляющий массаж',
      subtitle: 'Бережный релакс на подогреваемом анатомическом столе',
      category: 'relax',
      categoryLabel: 'Релакс',
      durationMinutes: 60,
      price: 3500,
      description: 'Снятие мышечного и ментального напряжения. Мягкие обволакивающие движения, приглушённый тёплый свет и расслабляющий плейлист.',
      sensoryNotes: ['стол с подогревом', 'ароматическое масло', 'чайная пауза'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Общий расслабляющий массаж',
      featuredNote: 'Популярный выбор',
    },
    {
      id: 'jr-drain-90',
      code: 'JR-02',
      title: 'Общий релакс / лимфодренажный массаж',
      subtitle: 'Глубокая проработка зажимов и снятие отёчности',
      category: 'relax',
      categoryLabel: 'Релакс & Дренаж',
      durationMinutes: 90,
      price: 5000,
      description: 'Полные 90 минут заботы: глубокая проработка спазмированных мышц спины и ног в сочетании с лимфодренажными техниками.',
      sensoryNotes: ['глубокий дренаж', 'лёгкость в теле', 'авторский травяной сбор'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Лимфодренажный массаж 90 мин',
      featuredNote: 'Хит 90 минут',
    },
    {
      id: 'jr-sport-60',
      code: 'JR-03',
      title: 'Спортивный массаж триггерных зон',
      subtitle: 'Прицельная проработка мышечных узлов и гипертонуса',
      category: 'recovery',
      categoryLabel: 'Спорт & Триггеры',
      durationMinutes: 60,
      price: 3500,
      description: 'Специализированная работа с триггерными точками, трапециями, поясницей и квадрицепсами. Освобождает тело от зажатости.',
      sensoryNotes: ['точечная работа', 'снятие гипертонуса', 'ортопедическая кушетка'],
      intensity: 'Глубокая',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Спортивный массаж триггерных зон',
    },
    {
      id: 'jr-reboot-105',
      code: 'JR-04',
      title: 'Фирменная программа «Перезагрузка»',
      subtitle: 'Тело (60 мин) + Лицо (30 мин) + Голова (15 мин)',
      category: 'rituals',
      categoryLabel: 'Флагманские программы',
      durationMinutes: 105,
      price: 5700,
      description: 'Флагманский авторский ритуал Just Relax: 60 минут массажа тела для полного расслабления, 30 минут скульптурирования лица и 15 минут точечного массажа головы.',
      sensoryNotes: ['комплексный уход', 'массаж лица и головы', 'полная перезагрузка'],
      intensity: 'Адаптивная',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Программа Перезагрузка',
      featuredNote: 'Флагман студии',
    },
    {
      id: 'jr-face-45',
      code: 'JR-05',
      title: 'Скульптурирующий массаж лица',
      subtitle: 'Миофасциальный лифтинг и снятие утренних отёков',
      category: 'recovery',
      categoryLabel: 'Эстетика лица',
      durationMinutes: 45,
      price: 2900,
      description: 'Прицельная проработка мышц лица, шеи и зоны декольте. Улучшает овал, подтягивает контуры и возвращает коже здоровое сияние.',
      sensoryNotes: ['лифтинг-эффект', 'сыворотка с пептидами', 'свежесть взгляда'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Скульптурирующий массаж лица',
    },
    {
      id: 'jr-couple-90',
      code: 'JR-06',
      title: 'Парный массаж Just Relax для двоих',
      subtitle: 'Синхронный сеанс в уютном кабинете со свечами',
      category: 'rituals',
      categoryLabel: 'Для двоих',
      durationMinutes: 90,
      price: 9500,
      description: 'Два мастера, два массажных стола с подогревом, индивидуальный выбор масел для каждого гостя и завершающая чайная церемония.',
      sensoryNotes: ['два мастера', 'свечи и тёплый плед', 'чайная церемония'],
      intensity: 'Адаптивная',
      image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Парный массаж Just Relax',
      featuredNote: 'Для пар',
    },
  ],
  specialists: [
    {
      id: 'jr-alina',
      name: 'Алина Ковалёва',
      role: 'Ведущий специалист по миофасциальному и лимфодренажному массажу (стаж 7 лет)',
      experienceYears: '7 лет опыта',
      approach: 'Обладает исключительной чуткостью рук. Автор лимфодренажных методик студии, снимает отёки и возвращает чувство лёгкости.',
      quote: '«Массаж — это диалог с телом без слов. Важно услышать, где телу нужно внимание».',
      specialties: ['Лимфодренажный массаж', 'Релакс', 'Скульптурирование лица'],
      serviceIds: ['jr-drain-90', 'jr-relax-60', 'jr-face-45', 'jr-reboot-105'],
      workingDays: [1, 2, 3, 5, 6],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Алина Ковалёва',
    },
    {
      id: 'jr-roman',
      name: 'Роман Селезнёв',
      role: 'Мастер спортивного массажа · Эксперт по триггерным зажимам (стаж 8 лет)',
      experienceYears: '8 лет опыта',
      approach: 'Глубоко понимает биомеханику движения. Мягко, но настойчиво распутывает хронические узлы в мышцах спины и плеч.',
      quote: '«Свободная шея и прямая спина меняют качество каждого вашего дня».',
      specialties: ['Спортивный массаж', 'Триггерная терапия', 'МФР'],
      serviceIds: ['jr-sport-60', 'jr-relax-60', 'jr-drain-90'],
      workingDays: [0, 2, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Роман Селезнёв',
    },
    {
      id: 'jr-ekaterina',
      name: 'Екатерина Морозова',
      role: 'Мастер эстетики тела и авторской программы «Перезагрузка» (стаж 5 лет)',
      experienceYears: '5 лет опыта',
      approach: 'Создаёт в кабинете атмосферу абсолютной безопасности и покоя. Виртуозно сочетает массаж тела со скульптурированием лица.',
      quote: '«Когда расслабляются мышцы лица и шеи, отступает даже самый тяжёлый стресс».',
      specialties: ['Программа Перезагрузка', 'Массаж лица', 'Парный массаж'],
      serviceIds: ['jr-reboot-105', 'jr-face-45', 'jr-couple-90', 'jr-relax-60'],
      workingDays: [1, 3, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Екатерина Морозова',
    },
  ],
};

// ============================================================================
// 4. ПРЕСЕТ: «Мари» (Москва, Новинский бульвар, 18Б, м. «Смоленская» / «Арбат»)
// Ссылка: https://yandex.kz/maps/org/mari/59408755279/?ll=37.585341%2C55.754872&z=16
// ============================================================================
const MARI_PRESET: BrandPreset = {
  id: 'mari',
  name: 'Мари',
  shortName: 'Мари',
  tagline: 'Камерная студия массажа, буккального лифтинга и заботы о теле на Арбате.',
  eyebrow: 'MASSAGE & BODY CARE · ARBAT · AESTHETICS',
  heroTitleLine1: 'Чувственная',
  heroTitleLine2: 'гармония тела.',
  heroSubtitle: 'Камерная студия массажа и эстетики на Новинском бульваре. Приватная атмосфера, глубокая мышечная терапия, буккальный массаж и расслабляющие спа-ритуалы.',
  heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
  city: 'Москва',
  currency: 'RUB',
  currencySymbol: '₽',
  phone: '+79153881818',
  phoneDisplay: '+7 (915) 388-18-18',
  address: 'г. Москва, Новинский бульвар, д. 18Б (цокольный этаж)',
  addressLine1: 'Москва, Новинский бульвар, д. 18Б',
  addressLine2: 'Цокольный этаж, м. «Смоленская» / «Баррикадная»',
  subway: 'м. Смоленская',
  yandexMapsUrl: 'https://yandex.kz/maps/org/mari/59408755279/?ll=37.585341%2C55.754872&z=16',
  workingHours: 'Ежедневно: 10:00 — 22:00',
  parkingNote: 'Парковка во дворах Новинского бульвара · 7 минут пешком от м. Смоленская',
  paletteName: 'Арбатская роза & Пудровый шёлк',
  theme: {
    bg: '#FAF5F2', // Пудрово-шелковый тёплый тон
    surface: '#FFFDFC',
    primary: '#7A4B56', // Благородная пыльная арбатская роза
    primaryHover: '#613742',
    accent: '#C99B82', // Пудровая карамель / тёплый персик
    accentSoft: '#F5EAE6',
    text: '#2B2225',
    textMuted: '#69575C',
    border: '#E8DBD7',
  },
  services: [
    {
      id: 'mari-classic-60',
      code: 'MARI-01',
      title: 'Общий классический массаж',
      subtitle: 'Гармоничная проработка мышц всего тела',
      category: 'classic',
      categoryLabel: 'Классика',
      durationMinutes: 60,
      price: 3800,
      description: 'Мягкое снятие усталости, восстановление мышечного баланса, улучшение микроциркуляции и глубокое общее расслабление.',
      sensoryNotes: ['миндальное масло', 'приглушённый свет', 'снятие напряжения'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Классический массаж Мари',
      featuredNote: 'Базовая программа',
    },
    {
      id: 'mari-buccal-60',
      code: 'MARI-02',
      title: 'Буккальный скульптурирующий массаж лица',
      subtitle: 'Глубокий лифтинг и проработка мимических зажимов',
      category: 'recovery',
      categoryLabel: 'Эстетика лица',
      durationMinutes: 60,
      price: 4200,
      description: 'Французская методика скульптурирования лица с интраоральной проработкой щёк и круговой мышцы рта. Мгновенно подтягивает овал и разглаживает носогубные складки.',
      sensoryNotes: ['безинъекционный лифтинг', 'скульптурирование', 'сияние кожи'],
      intensity: 'Адаптивная',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Буккальный массаж лица',
      featuredNote: 'Фирменная техника',
    },
    {
      id: 'mari-anticell-75',
      code: 'MARI-03',
      title: 'Антицеллюлитный + лимфодренажный массаж',
      subtitle: 'Активное моделирование силуэта и вывод отёков',
      category: 'recovery',
      categoryLabel: 'Коррекция фигуры',
      durationMinutes: 75,
      price: 4500,
      description: 'Интенсивная работа с проблемными зонами, активизация обменных процессов, выравнивание рельефа кожи и выраженный дренажный эффект.',
      sensoryNotes: ['крем с водорослями', 'моделирующий эффект', 'лёгкость в теле'],
      intensity: 'Глубокая',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Антицеллюлитный массаж',
    },
    {
      id: 'mari-relax-75',
      code: 'MARI-04',
      title: 'Релакс-массаж с аромамаслами',
      subtitle: 'Погружение в состояние глубокого покоя',
      category: 'relax',
      categoryLabel: 'Релакс',
      durationMinutes: 75,
      price: 4200,
      description: 'Плавные медитативные движения в сочетании с индивидуально подобранной композицией эфирных масел (французская лаванда, ваниль, сандал).',
      sensoryNotes: ['масло лаванды и сандала', 'тихая музыка', 'тёплый плед'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Релакс массаж Мари',
      featuredNote: 'Хит студии',
    },
    {
      id: 'mari-honey-45',
      code: 'MARI-05',
      title: 'Медовый детокс-массаж спины',
      subtitle: 'Глубокое очищение пор и прогревание мышц',
      category: 'rituals',
      categoryLabel: 'Детокс & Ритуалы',
      durationMinutes: 45,
      price: 3200,
      description: 'Старинная техника с натуральным алтайским мёдом. Вытягивает токсины, улучшает кровоснабжение и восстанавливает эластичность мышц спины.',
      sensoryNotes: ['цветочный мёд', 'бархатистая кожа', 'глубокое тепло'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Медовый массаж спины',
    },
    {
      id: 'mari-silk-105',
      code: 'MARI-06',
      title: 'СПА-программа «Шёлковый Арбат»',
      subtitle: 'Скрабирование + обёртывание + массаж всего тела',
      category: 'rituals',
      categoryLabel: 'Спа-ритуалы',
      durationMinutes: 105,
      price: 6900,
      description: 'Комплексный премиум-уход: нежный ягодный пилинг, питательное шоколадно-кремовое обёртывание и полноценный расслабляющий массаж тела.',
      sensoryNotes: ['ягодный скраб', 'шоколадное обёртывание', 'чай с сухофруктами'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'СПА программа Шелковый Арбат',
      featuredNote: 'Премиум СПА',
    },
  ],
  specialists: [
    {
      id: 'mari-marina',
      name: 'Марина Воронецкая',
      role: 'Основательница студии · Мастер буккального и скульптурного массажа (стаж 9 лет)',
      experienceYears: '9 лет опыта',
      approach: 'Сертифицированный специалист французской школы буккального моделирования. Бережно преображает овал лица и снимает челюстные зажимы.',
      quote: '«Лицо отражает наши эмоции. Расслабив лицо, мы возвращаем телу молодость и спокойствие».',
      specialties: ['Буккальный массаж', 'Скульптурирование', 'Антивозрастной уход'],
      serviceIds: ['mari-buccal-60', 'mari-classic-60', 'mari-silk-105'],
      workingDays: [1, 2, 3, 5, 6],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Марина Воронецкая',
    },
    {
      id: 'mari-olga',
      name: 'Ольга Лебедева',
      role: 'Специалист по моделирующему и антицеллюлитному массажу (стаж 7 лет)',
      experienceYears: '7 лет опыта',
      approach: 'Безупречно владеет методиками лимфодренажного и медового массажа. Гарантирует результат без синяков и дискомфорта.',
      quote: '«Тело отвечает взаимностью на заботу. Моя задача — подчеркнуть ваши природные линии».',
      specialties: ['Антицеллюлитный массаж', 'Лимфодренаж', 'Медовый массаж'],
      serviceIds: ['mari-anticell-75', 'mari-honey-45', 'mari-relax-75'],
      workingDays: [0, 2, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Ольга Лебедева',
    },
    {
      id: 'mari-alexey',
      name: 'Алексей Гришин',
      role: 'Мастер классического и расслабляющего массажа (стаж 6 лет)',
      experienceYears: '6 лет опыта',
      approach: 'Тонко подбирает степень нажима и темп массажа. Эксперт глубокого сенсорного расслабления и снятия стресса.',
      quote: '«Качественный массаж стирает усталость рабочей недели за один час».',
      specialties: ['Классический массаж', 'Релакс', 'СПА-программы'],
      serviceIds: ['mari-classic-60', 'mari-relax-75', 'mari-silk-105'],
      workingDays: [1, 3, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Алексей Гришин',
    },
  ],
};

// ============================================================================
// 5. ПРЕСЕТ: «Изумрудный Будда» (Москва, Нахимовский проспект, 33/2, м. «Профсоюзная»)
// Ссылка: https://yandex.kz/maps/org/izumrudny_budda/1165939516/?ll=37.577715%2C55.672163&z=14
// ============================================================================
const IZUMRUDNY_BUDDA_PRESET: BrandPreset = {
  id: 'izumrudny-budda',
  name: 'Изумрудный Будда',
  shortName: 'Изумрудный Будда',
  tagline: 'Восточный массаж, тибетские спа-ритуалы и гармония стихий.',
  eyebrow: 'ORIENTAL SPA · THAI & TIBET RITUALS · ENERGY',
  heroTitleLine1: 'Восточная мудрость',
  heroTitleLine2: 'исцеления.',
  heroSubtitle: 'Салон аутентичного восточного массажа и SPA на Нахимовском проспекте. Традиционные практики Таиланда, Китая и Тибета от дипломированных мастеров.',
  heroImage: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1800&q=85',
  city: 'Москва',
  currency: 'RUB',
  currencySymbol: '₽',
  phone: '+74991202506',
  phoneDisplay: '+7 (499) 120-25-06',
  address: 'г. Москва, Нахимовский проспект, д. 33, корп. 2 (1 этаж)',
  addressLine1: 'Москва, Нахимовский проспект, д. 33, корп. 2',
  addressLine2: '1 этаж, м. «Профсоюзная» / «Нахимовский проспект»',
  subway: 'м. Профсоюзная',
  yandexMapsUrl: 'https://yandex.kz/maps/org/izumrudny_budda/1165939516/?ll=37.577715%2C55.672163&z=14',
  workingHours: 'Ежедневно: 10:00 — 22:00',
  parkingNote: 'Удобный подъезд со стороны Нахимовского проспекта · 6 минут пешком от м. Профсоюзная',
  paletteName: 'Изумрудный нефрит & Восточное золото',
  theme: {
    bg: '#F5F8F5', // Нефритово-молочный фон
    surface: '#FCFEFC',
    primary: '#1E5638', // Благородный изумрудно-нефритовый
    primaryHover: '#16422B',
    accent: '#C5A059', // Храмовое античное золото
    accentSoft: '#EBF2EB',
    text: '#1D2620',
    textMuted: '#56695C',
    border: '#D5E0D7',
  },
  services: [
    {
      id: 'ib-thai-90',
      code: 'IB-01',
      title: 'Тайский массажный комплекс',
      subtitle: 'Традиционная акупрессура и йога-растяжка',
      category: 'classic',
      categoryLabel: 'Восточные практики',
      durationMinutes: 90,
      price: 5000,
      description: 'Полное восстановление энергетических меридианов по древней тайской методике. Прорабатывается всё тело от кончиков пальцев ног до макушки головы.',
      sensoryNotes: ['тайское кимоно', 'акупрессура', 'глубокая гибкость'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Тайский комплекс Изумрудный Будда',
      featuredNote: 'Аутентичный ритуал',
    },
    {
      id: 'ib-foot-45',
      code: 'IB-02',
      title: 'Восточный массаж стоп (Фут-массаж)',
      subtitle: 'Активация биологически активных зон тиковой палочкой',
      category: 'classic',
      categoryLabel: 'Рефлексотерапия',
      durationMinutes: 45,
      price: 2800,
      description: 'Древнекитайская рефлексотерапия стоп. Снимает синдром беспокойных ног, улучшает сон и гармонизирует работу всех внутренних органов.',
      sensoryNotes: ['тиковая палочка', 'ванночка с травами', 'мгновенная лёгкость'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Массаж стоп',
      featuredNote: 'Лёгкость в ногах',
    },
    {
      id: 'ib-vneck-60',
      code: 'IB-03',
      title: 'Моделирующий V-Neck массаж лица и Гуаша',
      subtitle: 'Скульптурирование овала лица нефритовым скребком',
      category: 'recovery',
      categoryLabel: 'Эстетика лица',
      durationMinutes: 60,
      price: 4000,
      description: 'Сочетание авторского моделирующего V-Neck массажа и древней китайской техники Гуаша с натуральным нефритом. Снимает отёки и подтягивает зону декольте.',
      sensoryNotes: ['нефритовый скребок Гуаша', 'пептидная сыворотка', 'чёткий овал лица'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'V-Neck массаж лица',
      featuredNote: 'Фирменный уход',
    },
    {
      id: 'ib-oil-60',
      code: 'IB-04',
      title: 'Ойл-массаж с тёплыми натуральными маслами',
      subtitle: 'Мягкое скольжение и глубокий антистресс',
      category: 'relax',
      categoryLabel: 'Ойл & Релакс',
      durationMinutes: 60,
      price: 3800,
      description: 'Традиционные восточные скользящие техники с применением тёплого кокосового и кунжутного масла. Питает кожу и гармонизирует нервную систему.',
      sensoryNotes: ['тёплое кокосовое масло', 'аромат лотоса', 'полный покой'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Ойл массаж Изумрудный Будда',
    },
    {
      id: 'ib-stone-75',
      code: 'IB-05',
      title: 'Стоунтерапия горячими базальтовыми камнями',
      subtitle: 'Глубокое прогревание вулканическим базальтом',
      category: 'rituals',
      categoryLabel: 'Спа-ритуалы',
      durationMinutes: 75,
      price: 4500,
      description: 'Гладкие вулканические камни бережно укладываются вдоль позвоночника и энергетических центров, глубоко расслабляя спазмированные мышечные слои.',
      sensoryNotes: ['вулканический базальт', 'глубокое тепло', 'эфирные масла'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Стоунтерапия базальтовыми камнями',
    },
    {
      id: 'ib-couple-120',
      code: 'IB-06',
      title: 'Восточная СПА-программа «Изумрудная гармония»',
      subtitle: 'Ритуал в восточном сьюте для двоих со свечами',
      category: 'rituals',
      categoryLabel: 'Для двоих',
      durationMinutes: 120,
      price: 11000,
      description: 'Синхронный ритуал от двух мастеров: омовение стоп в травяном настое, ойл-массаж тела, массаж лица нефритовыми валиками и чайная церемония с жасминовым улуном.',
      sensoryNotes: ['свечи', 'два мастера', 'жасминовый улун и сладости'],
      intensity: 'Адаптивная',
      image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'СПА для двоих Изумрудный Будда',
      featuredNote: 'Для пар',
    },
  ],
  specialists: [
    {
      id: 'ib-chompoo',
      name: 'Мастер Чомпху',
      role: 'Топ-мастер восточных и тайских практик · Школа Ват Пхо (стаж 10 лет)',
      experienceYears: '10 лет опыта',
      approach: 'Потомственный мастер из Таиланда. Тонко чувствует напряжение в энергетических каналах тела, возвращая абсолютное спокойствие.',
      quote: '«Истинный массаж исцеляет не только мышцы, но и возвращает внутренний свет».',
      specialties: ['Традиционный тайский', 'Ойл-массаж', 'Массаж стоп'],
      serviceIds: ['ib-thai-90', 'ib-foot-45', 'ib-oil-60', 'ib-couple-120'],
      workingDays: [1, 2, 3, 5, 6],
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Чомпху',
    },
    {
      id: 'ib-liwei',
      name: 'Ли Вэй',
      role: 'Специалист по китайской рефлексотерапии и Гуаша (стаж 8 лет)',
      experienceYears: '8 лет опыта',
      approach: 'Обучался в Пекине. Виртуозно использует нефритовые скребки Гуаша и тиковые палочки для мгновенного снятия мышечных спазмов.',
      quote: '«Нефрит вытягивает застойный жар и возвращает телу живую циркуляцию Ци».',
      specialties: ['Массаж Гуаша', 'Фут-массаж', 'Стоунтерапия'],
      serviceIds: ['ib-foot-45', 'ib-stone-75', 'ib-thai-90'],
      workingDays: [0, 2, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Специалист Ли Вэй',
    },
    {
      id: 'ib-irina',
      name: 'Ирина Светлова',
      role: 'Ведущий косметолог-эстетист · V-Neck скульптурирование (стаж 7 лет)',
      experienceYears: '7 лет опыта',
      approach: 'Сочетает древние восточные методы с современными протоколами омоложения. Создаёт выраженный лифтинг-эффект без инъекций.',
      quote: '«Красота лица начинается с расслабленной шеи и правильной осанки».',
      specialties: ['V-Neck массаж', 'Эстетика лица', 'СПА для двоих'],
      serviceIds: ['ib-vneck-60', 'ib-oil-60', 'ib-couple-120'],
      workingDays: [1, 3, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Косметолог Ирина Светлова',
    },
  ],
};

// ============================================================================
// 6. ПРЕСЕТ: «Центр массажа и эпиляции» (г. Московский, 3-й мкр-н, д. 9)
// Ссылка: https://yandex.kz/maps/org/tsentr_massazha_i_epilyatsii/15968009848/?ll=37.344673%2C55.595863&z=16
// ============================================================================
const MOSKOVSKY_PRESET: BrandPreset = {
  id: 'moskovsky',
  name: 'Центр массажа и эпиляции',
  shortName: 'Центр массажа',
  tagline: 'Профессиональный оздоровительный массаж и гладкость кожи в г. Московский.',
  eyebrow: 'MASSAGE · LASER EPILATION · BODY AESTHETICS',
  heroTitleLine1: 'Совершенство',
  heroTitleLine2: 'вашего тела.',
  heroSubtitle: 'Современная студия профессионального массажа и гладкой кожи в городе Московский. Снятие мышечных зажимов, скульптурирование тела и лазерная эпиляция на премиум-оборудовании.',
  heroImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1800&q=85',
  city: 'г. Московский',
  currency: 'RUB',
  currencySymbol: '₽',
  phone: '+79296959278',
  phoneDisplay: '+7 (929) 695-92-78',
  address: 'г. Москва, г. Московский, 3-й микрорайон, д. 9 (2 этаж)',
  addressLine1: 'Москва, г. Московский, 3-й микрорайон, д. 9',
  addressLine2: '2 этаж, м. «Филатов Луг» / «Аэропорт Внуково»',
  subway: 'м. Филатов Луг',
  yandexMapsUrl: 'https://yandex.kz/maps/org/tsentr_massazha_i_epilyatsii/15968009848/?ll=37.344673%2C55.595863&z=16',
  workingHours: 'Ежедневно: 10:00 — 21:00',
  parkingNote: 'Бесплатная парковка перед зданием в 3-м микрорайоне города Московский',
  paletteName: 'Морской сланец & Жемчужный лазурит',
  theme: {
    bg: '#F5F7F8', // Свежий жемчужный тон
    surface: '#FCFDFE',
    primary: '#2E4A62', // Глубокий нордический индиго / морской сланец
    primaryHover: '#1F3345',
    accent: '#88A9C3', // Мягкий прибрежный лазурит
    accentSoft: '#E4EDF4',
    text: '#1D262F',
    textMuted: '#536473',
    border: '#D5DFE8',
  },
  services: [
    {
      id: 'cme-classic-60',
      code: 'CME-01',
      title: 'Общий оздоровительный массаж тела',
      subtitle: 'Глубокая проработка спины, шеи, ног и рук',
      category: 'classic',
      categoryLabel: 'Классика',
      durationMinutes: 60,
      price: 3200,
      description: 'Устраняет зажимы, улучшает лимфоток, снимает мышечную скованность и дарит чувство лёгкости на всю рабочую неделю.',
      sensoryNotes: ['гипоаллергенное масло', 'ортопедическая кушетка', 'лёгкость в спине'],
      intensity: 'Средняя',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Оздоровительный массаж',
      featuredNote: 'Базовая программа',
    },
    {
      id: 'cme-back-45',
      code: 'CME-02',
      title: 'Терапевтический массаж спины и ШВЗ',
      subtitle: 'Снятие гипертонуса в лопатках, шее и пояснице',
      category: 'recovery',
      categoryLabel: 'Здоровая спина',
      durationMinutes: 45,
      price: 2400,
      description: 'Интенсивная работа с проблемными зонами спины, освобождение зажатых нервных окончаний, устранение ноющих болей от сидячей работы.',
      sensoryNotes: ['точечная проработка', 'снятие спазмов', 'свобода движений'],
      intensity: 'Глубокая',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Терапевтический массаж спины',
      featuredNote: 'Популярно у гостей',
    },
    {
      id: 'cme-sculpt-60',
      code: 'CME-03',
      title: 'Скульптурирующий антицеллюлитный массаж',
      subtitle: 'Активное моделирование контуров талии и бёдер',
      category: 'recovery',
      categoryLabel: 'Коррекция фигуры',
      durationMinutes: 60,
      price: 3500,
      description: 'Ручная скульптурирующая техника для уменьшения объёмов, активизации выработки коллагена и выравнивания текстуры кожи.',
      sensoryNotes: ['термо-крем с водорослями', 'упругость кожи', 'уменьшение объёмов'],
      intensity: 'Глубокая',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Скульптурирующий массаж',
      featuredNote: 'Хит для силуэта',
    },
    {
      id: 'cme-drain-75',
      code: 'CME-04',
      title: 'Лимфодренажный детокс-массаж',
      subtitle: 'Выведение лишней жидкости и снятие отёчности',
      category: 'relax',
      categoryLabel: 'Релакс & Детокс',
      durationMinutes: 75,
      price: 3800,
      description: 'Мягкие ритмичные движения по ходу лимфатических сосудов. Ускоряет метаболизм, выводит застойную жидкость и возвращает чувство невесомости.',
      sensoryNotes: ['дренажный эффект', 'лёгкие ноги', 'очищение организма'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Лимфодренажный детокс-массаж',
    },
    {
      id: 'cme-laser-60',
      code: 'CME-05',
      title: 'Лазерная эпиляция: Комплекс «Всё включено»',
      subtitle: 'Глубокое бикини + подмышечные впадины + голени',
      category: 'rituals',
      categoryLabel: 'Лазерная эпиляция',
      durationMinutes: 60,
      price: 4900,
      description: 'Безболезненная процедура на премиальном диодном аппарате с мощным сапфировым охлаждением. Гладкая шелковистая кожа без раздражений.',
      sensoryNotes: ['сапфировое охлаждение', 'безболезненно', 'идеальная гладкость'],
      intensity: 'Мягкая',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Лазерная эпиляция',
      featuredNote: 'Топ-комплекс',
    },
    {
      id: 'cme-couple-90',
      code: 'CME-06',
      title: 'Парная релакс-программа «Московский релакс»',
      subtitle: 'Расслабляющий массаж для двоих в уютном кабинете',
      category: 'rituals',
      categoryLabel: 'Для двоих',
      durationMinutes: 90,
      price: 7500,
      description: 'Синхронный массаж тела для двоих гостей, приятная атмосфера, тёплые полотенца и травяной чай со сладостями.',
      sensoryNotes: ['два специалиста', 'тихая атмосфера', 'авторский чай'],
      intensity: 'Адаптивная',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Парная релакс программа',
      featuredNote: 'Для двоих',
    },
  ],
  specialists: [
    {
      id: 'cme-kristina',
      name: 'Кристина Сергеева',
      role: 'Ведущий специалист по оздоровительному и лимфодренажному массажу (стаж 8 лет)',
      experienceYears: '8 лет опыта',
      approach: 'Чуткий мастер с медицинским образованием. Владеет техникой мягкого расслабления и миофасциального релиза.',
      quote: '«Здоровье тела начинается со своевременного отдыха и бережного внимания к себе».',
      specialties: ['Оздоровительный массаж', 'Лимфодренаж', 'Релакс'],
      serviceIds: ['cme-classic-60', 'cme-back-45', 'cme-drain-75'],
      workingDays: [1, 2, 3, 5, 6],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Специалист Кристина Сергеева',
    },
    {
      id: 'cme-valeria',
      name: 'Валерия Тихонова',
      role: 'Специалист по аппаратной косметологии и лазерной эпиляции (стаж 6 лет)',
      experienceYears: '6 лет опыта',
      approach: 'Эксперт по бережной лазерной эпиляции. Проводит процедуры абсолютно комфортно и безболезненно для любого фототипа кожи.',
      quote: '«Гладкая и ухоженная кожа — это ежедневная уверенность и комфорт».',
      specialties: ['Лазерная эпиляция', 'Депиляция', 'Уход за телом'],
      serviceIds: ['cme-laser-60', 'cme-sculpt-60'],
      workingDays: [0, 2, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Специалист Валерия Тихонова',
    },
    {
      id: 'cme-igor',
      name: 'Игорь Васильев',
      role: 'Мастер глубокотканного и антицеллюлитного массажа (стаж 7 лет)',
      experienceYears: '7 лет опыта',
      approach: 'Сильный специалист по проработке триггерных зон спины и моделированию контуров тела. Быстро снимает мышечный спазм.',
      quote: '«Глубокая проработка мышц возвращает лёгкость походке и снимает многомесячную усталость».',
      specialties: ['Антицеллюлитный массаж', 'Массаж спины', 'Спортивный массаж'],
      serviceIds: ['cme-sculpt-60', 'cme-back-45', 'cme-couple-90'],
      workingDays: [1, 3, 4, 5, 6],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Мастер Игорь Васильев',
    },
  ],
};

// ============================================================================
// 7. ПРЕСЕТ: «ÉLAN Wellness» (Флагманский премиум-концепт, Алматы, Олива & Лен)
// ============================================================================
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
  addressLine1: 'Алматы, пр. Достык, 180',
  addressLine2: 'Вход со стороны парка, отдельный сьют',
  workingHours: 'Ежедневно: 10:00 — 22:00',
  parkingNote: 'Приватная парковка со шлагбаумом для гостей студии',
  paletteName: 'Олива & Натуральный лён',
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

// Словарь пресетов и их псевдонимов для максимально удобного перехода по URL
export const BRAND_PRESETS: Record<string, BrandPreset> = {
  // 1. Массаж СПА
  'massazh-spa': MASSAZH_SPA_PRESET,
  'massazh_spa': MASSAZH_SPA_PRESET,
  'spa': MASSAZH_SPA_PRESET,

  // 2. ТАЙРАЙ
  'tairai': TAIRAY_PRESET,
  'tayray': TAIRAY_PRESET,
  'tairay': TAIRAY_PRESET,

  // 3. Just Relax
  'just-relax': JUST_RELAX_PRESET,
  'just_relax': JUST_RELAX_PRESET,
  'justrelax': JUST_RELAX_PRESET,

  // 4. Мари
  'mari': MARI_PRESET,
  'salon-mari': MARI_PRESET,
  'mari-spa': MARI_PRESET,

  // 5. Изумрудный Будда
  'izumrudny-budda': IZUMRUDNY_BUDDA_PRESET,
  'izumrudny_budda': IZUMRUDNY_BUDDA_PRESET,
  'greenbudda': IZUMRUDNY_BUDDA_PRESET,
  'budda': IZUMRUDNY_BUDDA_PRESET,

  // 6. Центр массажа и эпиляции (г. Московский)
  'moskovsky': MOSKOVSKY_PRESET,
  'tsentr_massazha_i_epilyatsii': MOSKOVSKY_PRESET,
  'tsentr-massazha': MOSKOVSKY_PRESET,
  'epil-moscow': MOSKOVSKY_PRESET,
  'lazer-moskovsky': MOSKOVSKY_PRESET,

  // 7. ÉLAN Wellness (демо / флагман)
  'elan': ELAN_PRESET,
};

// Список уникальных пресетов для переключателя и админки
export const BRAND_PRESETS_LIST: BrandPreset[] = [
  MASSAZH_SPA_PRESET,
  TAIRAY_PRESET,
  JUST_RELAX_PRESET,
  MARI_PRESET,
  IZUMRUDNY_BUDDA_PRESET,
  MOSKOVSKY_PRESET,
  ELAN_PRESET,
];

const BRAND_PRESET_STORAGE_KEY = 'elan_active_brand_preset_id';

/**
 * Определяет активный пресет: сначала проверяет URL (?brand=mari / ?brand=izumrudny_budda / ?brand=moskovsky и т.д.), затем localStorage, иначе massazh-spa
 */
export function getActiveBrandPresetId(): string {
  if (typeof window === 'undefined') return 'massazh-spa';
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const rawParam = urlParams.get('brand')?.toLowerCase().trim();
    if (rawParam && BRAND_PRESETS[rawParam]) {
      const canonicalId = BRAND_PRESETS[rawParam].id;
      window.localStorage.setItem(BRAND_PRESET_STORAGE_KEY, canonicalId);
      return canonicalId;
    }

    const saved = window.localStorage.getItem(BRAND_PRESET_STORAGE_KEY);
    if (saved && BRAND_PRESETS[saved]) {
      return BRAND_PRESETS[saved].id;
    }

    return 'massazh-spa';
  } catch {
    return 'massazh-spa';
  }
}

export function getActiveBrandPreset(): BrandPreset {
  const id = getActiveBrandPresetId();
  return BRAND_PRESETS[id] || MASSAZH_SPA_PRESET;
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
  const preset = BRAND_PRESETS[presetId] || MASSAZH_SPA_PRESET;
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
