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
// 4. ПРЕСЕТ: «ÉLAN Wellness» (Флагманский премиум-концепт, Алматы, Олива & Лен)
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
  'massazh-spa': MASSAZH_SPA_PRESET,
  'massazh_spa': MASSAZH_SPA_PRESET,
  'spa': MASSAZH_SPA_PRESET,

  'tairai': TAIRAY_PRESET,
  'tayray': TAIRAY_PRESET,
  'tairay': TAIRAY_PRESET,

  'just-relax': JUST_RELAX_PRESET,
  'just_relax': JUST_RELAX_PRESET,
  'justrelax': JUST_RELAX_PRESET,

  'elan': ELAN_PRESET,
};

// Список уникальных пресетов для переключателя и админки
export const BRAND_PRESETS_LIST: BrandPreset[] = [
  MASSAZH_SPA_PRESET,
  TAIRAY_PRESET,
  JUST_RELAX_PRESET,
  ELAN_PRESET,
];

const BRAND_PRESET_STORAGE_KEY = 'elan_active_brand_preset_id';

/**
 * Определяет активный пресет: сначала проверяет URL (?brand=tairai / ?brand=tayray), затем localStorage, иначе massazh-spa / elan
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
