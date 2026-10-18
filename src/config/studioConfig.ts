export interface StudioBenefit {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: 'Sparkles' | 'Award' | 'Feather' | 'Leaf';
}

export interface StudioService {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: 'classic' | 'relax' | 'recovery' | 'rituals';
  categoryLabel: string;
  durationMinutes: number;
  price: number;
  description: string;
  sensoryNotes: string[];
  intensity: 'Мягкая' | 'Средняя' | 'Глубокая' | 'Адаптивная';
  image: string;
  imageAlt: string;
  featuredNote?: string;
}

export interface StudioSpecialist {
  id: string;
  name: string;
  role: string;
  experienceYears: string;
  approach: string;
  quote: string;
  specialties: string[];
  serviceIds: string[];
  workingDays: number[]; // 0 = Sun, 1 = Mon, ... 6 = Sat
  image: string;
  imageAlt: string;
}

export interface StudioGalleryItem {
  id: string;
  title: string;
  category: string;
  materialNote: string;
  description: string;
  aspectClass: string;
  gridSpanClass: string;
  image: string;
  imageAlt: string;
}

export interface StudioCertificateTier {
  id: string;
  title: string;
  subtitle: string;
  amountLabel: string;
  amountValue: number;
  details: string;
}

export interface StudioTestimonial {
  id: string;
  guestLabel: string;
  ritualTitle: string;
  quote: string;
  atmosphereNote: string;
}

export interface StudioFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StudioConfig {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    eyebrow: string;
    description: string;
    city: string;
    currency: string;
    currencySymbol: string;
    currencyCode: string;
    bookingReferencePrefix: string;
    isDemoNotice: string;
  };
  contacts: {
    phone: string;
    phoneDisplay: string;
    phoneHref: string;
    email: string;
    address: string;
    addressLine1: string;
    addressLine2: string;
    hours: string;
    workingHours: string;
    mapQuery: string;
    routeGuide: string;
    parkingNote: string;
    socialLinks: {
      telegram: string;
      telegramLabel: string;
      whatsapp: string;
      whatsappLabel: string;
      instagram: string;
      instagramLabel: string;
    };
  };
  navigation: Array<{
    label: string;
    href: string;
  }>;
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    fullTitle: string;
    subtitle: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    personalApproachNote: string;
    heroImage: string;
    heroImageAlt: string;
    secondaryImage: string;
    secondaryImageAlt: string;
    highlights: Array<{ label: string; value: string }>;
  };
  benefits: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: StudioBenefit[];
  };
  philosophy: {
    eyebrow: string;
    title: string;
    lead: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
    pillars: Array<{
      number: string;
      title: string;
      text: string;
    }>;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: Array<{ id: string; label: string }>;
    items: StudioService[];
  };
  specialists: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: StudioSpecialist[];
  };
  spaceGallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: StudioGalleryItem[];
  };
  giftCertificates: {
    eyebrow: string;
    title: string;
    description: string;
    validityNote: string;
    ctaLabel: string;
    tiers: StudioCertificateTier[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    disclaimer: string;
    items: StudioTestimonial[];
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: StudioFaqItem[];
  };
}

export const studioConfig: StudioConfig = {
  brand: {
    name: 'ÉLAN Wellness',
    shortName: 'ÉLAN',
    tagline: 'MASSAGE · BODY · MIND',
    eyebrow: 'MASSAGE · BODY · MIND',
    description:
      'Премиальная массажная студия и приватное wellness-пространство. Профессиональный массаж, расслабление и восстановление. Выберите процедуру и запишитесь онлайн.',
    city: 'Алматы',
    currency: '₸',
    currencySymbol: '₸',
    currencyCode: 'KZT',
    bookingReferencePrefix: 'ELAN',
    isDemoNotice:
      'Демонстрационный проект премиальной студии. Контакты, цены и расписание представлены для ознакомления с интерфейсом.',
  },

  contacts: {
    phone: '+7 (727) 345-67-89',
    phoneDisplay: '+7 (727) 345-67-89 (Демо)',
    phoneHref: 'tel:+77273456789',
    email: 'concierge@elan-wellness.kz',
    address: 'пр. Достык, 128, Villa Boutiques & Restaurants',
    addressLine1: 'пр. Достык, 128',
    addressLine2: 'Villa Boutiques & Restaurants · Алматы',
    hours: 'Ежедневно с 10:00 до 22:00 · По предварительной записи',
    workingHours: 'Ежедневно с 10:00 до 22:00 · По предварительной записи',
    mapQuery: 'Алматы, проспект Достык 128',
    routeGuide:
      'Вход через центральную галерею Villa Boutiques, 2 этаж, восточное крыло с отдельным входом. За 30 минут до визита гостю направляется персональный код доступа в сьют.',
    parkingNote:
      'Для гостей студии предусмотрен персональный паркинг во внутреннем дворе Villa Boutiques по предварительному согласованию номера автомобиля.',
    socialLinks: {
      telegram: 'https://t.me/elan_wellness_demo',
      telegramLabel: 'Telegram Concierge',
      whatsapp: 'https://wa.me/77273456789',
      whatsappLabel: 'WhatsApp',
      instagram: 'https://instagram.com/elan_wellness_demo',
      instagramLabel: 'Instagram',
    },
  },

  navigation: [
    { label: 'Услуги', href: '#services' },
    { label: 'Специалисты', href: '#specialists' },
    { label: 'Пространство', href: '#space' },
    { label: 'О нас', href: '#philosophy' },
    { label: 'Контакты', href: '#contacts' },
  ],

  hero: {
    eyebrow: 'MASSAGE · BODY · MIND',
    titleLine1: 'Вернитесь',
    titleLine2: 'к себе.',
    fullTitle: 'Вернитесь к себе.',
    subtitle: 'Пространство тишины, восстановления и заботы о теле.',
    lead: 'Тихая архитектура натурального льна, тёплого камня и выверенных прикосновений. Вдали от городского шума, суеты и формальных протоколов.',
    primaryCta: 'Записаться онлайн',
    secondaryCta: 'Познакомиться со студией',
    personalApproachNote:
      'Между визитами гостей мы закладываем 25 минут тишины — чтобы вы никогда не встречались в коридоре со спешкой, а кабинет встречал вас свежим воздухом и нагретым льном.',
    heroImage:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    heroImageAlt:
      'Премиальный массажный кабинет ÉLAN Wellness с натуральным льном, тёплым деревом и мягким дневным светом',
    secondaryImage:
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=900&q=85',
    secondaryImageAlt:
      'Деталь интерьера студии: керамика, тёмное стекло с натуральными маслами и фактура камня',
    highlights: [
      { label: 'Приватность', value: '3 камерных сьюта без потокового трафика' },
      { label: 'Текстиль и масла', value: 'Небелёный европейский лён и органические базовые масла' },
      { label: 'Персонализация', value: 'Настройка света, звука, температуры и нажима до начала' },
    ],
  },

  benefits: {
    eyebrow: 'ПОЧЕМУ МЫ',
    title: 'Внимание к каждой детали вашего отдыха',
    subtitle:
      'Мы объединили принципы бутик-отеля, доказательные массажные методики и бережное отношение к личному времени.',
    items: [
      {
        id: 'benefit-individual',
        title: 'Индивидуальный подход',
        description: 'Подбираем процедуру под ваши задачи.',
        badge: 'Персонализация',
        iconName: 'Sparkles',
      },
      {
        id: 'benefit-specialists',
        title: 'Опытные специалисты',
        description: 'Профессионалы с практическим опытом.',
        badge: 'Экспертность',
        iconName: 'Award',
      },
      {
        id: 'benefit-atmosphere',
        title: 'Комфортная атмосфера',
        description: 'Пространство, где можно действительно расслабиться.',
        badge: 'Приватность',
        iconName: 'Feather',
      },
      {
        id: 'benefit-materials',
        title: 'Натуральные материалы',
        description: 'Внимание к каждой детали пространства.',
        badge: 'Экологичность',
        iconName: 'Leaf',
      },
    ],
  },

  philosophy: {
    eyebrow: 'ФИЛОСОФИЯ СТУДИИ',
    title: 'Забота, которая начинается с внимания',
    lead: 'Мы создали ÉLAN Wellness как тихую альтернативу шумным городским SPA и формальным массажным кабинетам.',
    paragraphs: [
      'Каждое посещение начинается не с таймера, а с короткой беседы за чашкой тёплого травяного сбора. Мастер уточняет ваше самочувствие, привычный ритм дня, чувствительность к прикосновениям и пожелания к ароматам или полной тишине.',
      'В интерьере мы отказались от визуального шума и искусственного блеска в пользу тактильной честности: необработанный травертин, тёплый дуб, плотный фактурный лён и мягкий рассеянный свет помогают нервной системе переключиться ещё до начала процедуры.',
    ],
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Текстура натурального льна, дерева и мягкий солнечный свет в интерьере студии',
    pillars: [
      {
        number: '01',
        title: 'Индивидуальный диалог',
        text: 'Мы не работаем по жёсткому заученному протоколу — акценты сеанса адаптируются под запрос вашего тела сегодня.',
      },
      {
        number: '02',
        title: 'Сенсорная чистота',
        text: 'Вы сами выбираете атмосферу: звучание живого эмбиента или абсолютная тишина, ботанический аромат или нейтральное масло.',
      },
      {
        number: '03',
        title: 'Время без спешки',
        text: 'После завершения ритуала у вас всегда есть 25 минут, чтобы спокойно прийти в себя в чайной гостиной.',
      },
    ],
  },

  services: {
    eyebrow: 'КАТАЛОГ ПРОЦЕДУР',
    title: 'Наши услуги',
    subtitle:
      'Профессиональные техники массажа для восстановления, расслабления и заботы о теле.',
    categories: [
      { id: 'all', label: 'Все услуги' },
      { id: 'classic', label: 'Классика и баланс' },
      { id: 'relax', label: 'Релаксация' },
      { id: 'recovery', label: 'Глубокая проработка' },
      { id: 'rituals', label: 'Арома и парные' },
    ],
    items: [
      {
        id: 'classic-massage-60',
        code: '01',
        title: 'Классический массаж',
        subtitle: 'Традиционная европейская методика гармонизации мышечного тонуса',
        category: 'classic',
        categoryLabel: 'Классика и баланс',
        durationMinutes: 60,
        price: 8000,
        description:
          'Базовая техника для улучшения циркуляции, мягкого снятия общего утомления и поддержания мышечного корсета. Оптимальный выбор для регулярного ухода за телом.',
        sensoryNotes: ['Тёплое миндальное масло', 'Умеренный ритм', 'Комплексный тонус'],
        intensity: 'Средняя',
        image:
          'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Мастер выполняет классический массаж спины гостя в светлом кабинете',
        featuredNote: 'Базовая регулярная практика',
      },
      {
        id: 'relaxing-massage-75',
        code: '02',
        title: 'Расслабляющий массаж',
        subtitle: 'Плавное погружение в состояние покоя и снятие эмоционального стресса',
        category: 'relax',
        categoryLabel: 'Релаксация',
        durationMinutes: 75,
        price: 9000,
        description:
          'Непрерывные волнообразные скользящие движения с подогретым маслом снимают напряжение с нервной системы, нормализуют сон и возвращают ощущение лёгкости.',
        sensoryNotes: ['Подогретое масло жожоба', 'Приглушённый свет 2700K', 'Медленный темп'],
        intensity: 'Мягкая',
        image:
          'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Спокойная атмосфера массажного кабинета с тёплым светом и натуральным текстилем',
        featuredNote: 'Выбор для снятия усталости',
      },
      {
        id: 'deep-tissue-60',
        code: '03',
        title: 'Глубокотканный массаж',
        subtitle: 'Структурная работа с триггерными точками и фасциальными слоями',
        category: 'recovery',
        categoryLabel: 'Глубокая проработка',
        durationMinutes: 60,
        price: 9500,
        description:
          'Выверенная анатомическая проработка глубоких слоёв мышц без резкой боли. Снимает застарелые зажимы в плечах, лопатках и пояснице после тренировок или малоподвижной работы.',
        sensoryNotes: ['Фасциальные техники', 'Масло виноградной косточки', 'Точечный нажим'],
        intensity: 'Глубокая',
        image:
          'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Глубокая структурная проработка мышц спины и плечевого пояса',
        featuredNote: 'При мышечных спазмах и сидячей работе',
      },
      {
        id: 'aroma-massage-75',
        code: '04',
        title: 'Аромамассаж',
        subtitle: 'Ольфакторный ритуал с натуральными ботаническими композициями',
        category: 'rituals',
        categoryLabel: 'Арома и парные',
        durationMinutes: 75,
        price: 9500,
        description:
          'Перед сеансом вы выбираете индивидуальную ароматическую композицию на основе эфиров кедра, бергамота или ветивера. Сочетает мягкий массаж всего тела и дыхательную релаксацию.',
        sensoryNotes: ['Выбор ботанического аромата', 'Дыхательная настройка', 'Тёплый компресс стоп'],
        intensity: 'Мягкая',
        image:
          'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Флаконы из тёмного стекла с эфирными маслами на каменной поверхности',
        featuredNote: 'Авторский сенсорный ритуал',
      },
      {
        id: 'couples-massage-90',
        code: '05',
        title: 'Парный массаж',
        subtitle: 'Синхронный ритуал для двоих в уединённом просторном сьюте',
        category: 'rituals',
        categoryLabel: 'Арома и парные',
        durationMinutes: 90,
        price: 15000,
        description:
          'Два мастера работают одновременно в едином ритме в приватном кабинете для двух гостей. Каждый гость может выбрать собственную интенсивность и масло. Включает неспешное чаепитие.',
        sensoryNotes: ['Приватный сьют для двоих', 'Два мастера синхронно', 'Чайная пауза в лаунже'],
        intensity: 'Адаптивная',
        image:
          'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Просторный светлый сьют для парных процедур с двумя кушетками',
        featuredNote: 'Приватный отдых для двоих',
      },
      {
        id: 'back-neck-focus-40',
        code: '06',
        title: 'Массаж спины и шейно-воротниковой зоны',
        subtitle: 'Точечная экспресс-разгрузка верхней части тела за 40 минут',
        category: 'recovery',
        categoryLabel: 'Глубокая проработка',
        durationMinutes: 40,
        price: 6500,
        description:
          'Быстрое и эффективное снятие спазма с трапециевидных мышц, шеи и зоны между лопатками. Возвращает ясность мыслям и свободу поворота головы.',
        sensoryNotes: ['Локальный прогрев', 'Деликатная растяжка шеи', 'Быстрый результат'],
        intensity: 'Средняя',
        image:
          'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Мастер прорабатывает шейно-воротниковую зону гостя',
      },
      {
        id: 'full-body-signature-90',
        code: '07',
        title: 'Авторский массаж всего тела',
        subtitle: 'Максимальное полуторачасовое погружение от стоп до макушки',
        category: 'classic',
        categoryLabel: 'Классика и баланс',
        durationMinutes: 90,
        price: 12000,
        description:
          'Полный цикл внимания к телу без компромиссов по времени. Включает проработку ног, спины, рук, грудного отдела, шеи и мягкий точечный массаж головы.',
        sensoryNotes: ['90 минут внимания', 'Массаж головы и стоп', 'Полная перезагрузка'],
        intensity: 'Адаптивная',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Массажный сьют с естественным дневным освещением и льном',
      },
    ],
  },

  specialists: {
    eyebrow: 'КОМАНДА СТУДИИ',
    title: 'Профессионалы, которые заботятся о вас',
    subtitle:
      'Каждый мастер ÉLAN обладает профильным образованием, опытом практической работы и чутким вниманием к индивидуальным границам гостя.',
    items: [
      {
        id: 'anna-petrova',
        name: 'Анна Петрова',
        role: 'Массажист · 5 лет опыта',
        experienceYears: '5 лет опыта',
        approach:
          'Специализируется на расслабляющих и классических техниках массажа. Мягко адаптирует нажим под чувствительность гостя, уделяя внимание снятию накопленной тревожности и восстановлению ровного дыхания.',
        quote: '«Прикосновение должно успокаивать мысли так же глубоко, как расслабляет мышцы».',
        specialties: ['Расслабляющий массаж', 'Классический массаж', 'Аромамассаж'],
        serviceIds: [
          'classic-massage-60',
          'relaxing-massage-75',
          'aroma-massage-75',
          'couples-massage-90',
          'full-body-signature-90',
        ],
        workingDays: [1, 2, 3, 5, 6], // Пн, Вт, Ср, Пт, Сб
        image:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85',
        imageAlt: 'Мастер Анна Петрова в светлом пространстве студии',
      },
      {
        id: 'mark-levitsky',
        name: 'Марк Левицкий',
        role: 'Специалист по глубокотканным техникам · 7 лет опыта',
        experienceYears: '7 лет опыта',
        approach:
          'Специализируется на структурной работе со спиной, мышечным корсетом и фасциями. Выстраивает сеанс так, чтобы снять блоки и вернуть телу лёгкость без болезненных спазмов.',
        quote: '«Точность прикосновения важнее грубой силы: правильный вектор снимает усталость глубже любого давления».',
        specialties: ['Глубокотканный массаж', 'Спина и ШВЗ', 'Классический массаж'],
        serviceIds: [
          'classic-massage-60',
          'deep-tissue-60',
          'back-neck-focus-40',
          'couples-massage-90',
          'full-body-signature-90',
        ],
        workingDays: [0, 2, 4, 5, 6], // Вс, Вт, Чт, Пт, Сб
        image:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
        imageAlt: 'Специалист Марк Левицкий в спокойном естественном освещении',
      },
      {
        id: 'elena-voronova',
        name: 'Елена Воронова',
        role: 'Ведущий мастер холистических практик · 9 лет опыта',
        experienceYears: '9 лет опыта',
        approach:
          'Работает на стыке мягких остеопатических и глубоких восстановительных техник. Особое внимание уделяет балансу между физическим снятием спазма и гармонией эмоционального состояния.',
        quote: '«Тело отпускает напряжение тогда, когда чувствует безопасность и уважение к своему ритму».',
        specialties: ['Авторский массаж 90 мин', 'Глубокотканный массаж', 'Классический массаж'],
        serviceIds: [
          'classic-massage-60',
          'relaxing-massage-75',
          'deep-tissue-60',
          'back-neck-focus-40',
          'full-body-signature-90',
          'couples-massage-90',
        ],
        workingDays: [1, 2, 4, 5, 6], // Пн, Вт, Чт, Пт, Сб
        image:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85',
        imageAlt: 'Ведущий мастер Елена Воронова в интерьере студии',
      },
      {
        id: 'sofia-korsakova',
        name: 'София Корсакова',
        role: 'Мастер ароматерапевтических ритуалов · 6 лет опыта',
        experienceYears: '6 лет опыта',
        approach:
          'Создаёт обволакивающие, медитативные ритуалы с натуральными эфирными маслами для сенсорной разгрузки. Подбирает температуру масел и музыку под текущее состояние гостя.',
        quote: '«Истинный отдых начинается в ту минуту, когда вам больше не нужно никуда торопиться».',
        specialties: ['Аромамассаж', 'Расслабляющий массаж', 'Парный массаж'],
        serviceIds: [
          'relaxing-massage-75',
          'aroma-massage-75',
          'couples-massage-90',
          'full-body-signature-90',
        ],
        workingDays: [0, 1, 3, 4, 6], // Вс, Пн, Ср, Чт, Сб
        image:
          'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=900&q=85',
        imageAlt: 'Мастер ароматерапии София Корсакова в тёплой атмосфере студии',
      },
    ],
  },

  spaceGallery: {
    eyebrow: 'АРХИТЕКТУРА И ТАКТИЛЬНОСТЬ',
    title: 'Пространство для вашего отдыха',
    subtitle:
      'Небелёный лён, тёплый травертин, массив дуба и отсутствие прямого слепящего света. Каждая деталь спроектирована так, чтобы снизить сенсорную нагрузку.',
    items: [
      {
        id: 'suite-linen',
        title: 'Камерный массажный сьют №1',
        category: 'Массажный кабинет',
        materialNote: 'Небелёный лён · Массив дуба · Подогреваемый стол',
        description:
          'Просторный кабинет с регулируемым мягким светом, индивидуальной климатической системой и собственной душевой зоной.',
        aspectClass: 'aspect-[4/5] md:aspect-[16/11]',
        gridSpanClass: 'md:col-span-7',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85',
        imageAlt: 'Массажный кабинет с льняным текстилем и тёплым утренним светом',
      },
      {
        id: 'tea-lounge',
        title: 'Гостиная тишины и чайной паузы',
        category: 'Зона отдыха',
        materialNote: 'Известковая штукатурка · Травертин · Травяные сборы',
        description:
          'Камерная лаунж-зона, где гость настраивается перед процедурой и неспешно возвращается к городскому ритму после сеанса.',
        aspectClass: 'aspect-[4/5]',
        gridSpanClass: 'md:col-span-5',
        image:
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Минималистичная зона ожидания в тёплых природных оттенках',
      },
      {
        id: 'tactile-materials',
        title: 'Ботаническая коллекция масел',
        category: 'Натуральные материалы',
        materialNote: 'Холодный отжим · Эфиры ветивера, кедра и бергамота',
        description:
          'Мы используем только чистые базовые масла миндаля, жожоба и виноградной косточки, подогретые до комфортной температуры тела.',
        aspectClass: 'aspect-[4/3]',
        gridSpanClass: 'md:col-span-4',
        image:
          'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=900&q=85',
        imageAlt: 'Флаконы с натуральными эфирными маслами и керамика ручной работы',
      },
      {
        id: 'interior-details',
        title: 'Архитектура мягкого света',
        category: 'Освещение и текстуры',
        materialNote: 'Рассеянный тёплый спектр 2700K · Натуральный камень',
        description:
          'Сценарии освещения спроектированы так, чтобы взгляд в положении лёжа никогда не встречал открытого источника света.',
        aspectClass: 'aspect-[4/3]',
        gridSpanClass: 'md:col-span-4',
        image:
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85',
        imageAlt: 'Мягкий солнечный свет и тени на текстурной стене в интерьере студии',
      },
      {
        id: 'couples-suite',
        title: 'Приватный сьют для парных практик',
        category: 'Детали интерьера',
        materialNote: 'Акустический комфорт · Две синхронные кушетки',
        description:
          'Уединённое пространство для совместного отдыха, где каждая деталь подчинена ощущению спокойствия и приватности.',
        aspectClass: 'aspect-[4/3]',
        gridSpanClass: 'md:col-span-4',
        image:
          'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=900&q=85',
        imageAlt: 'Интерьер приватного сьюта для парных процедур с натуральным текстилем',
      },
    ],
  },

  giftCertificates: {
    eyebrow: 'ПОДАРОЧНЫЕ СЕРТИФИКАТЫ',
    title: 'Подарите время для себя',
    description:
      'Сертификат ÉLAN Wellness — это осязаемое проявление заботы о близком человеке. Мы подготовим тактильное приглашение на плотной хлопковой бумаге в льняном конверте или отправим именную электронную версию.',
    validityNote: 'Срок действия сертификата — 6 месяцев с даты оформления.',
    ctaLabel: 'Подарочный сертификат',
    tiers: [
      {
        id: 'cert-classic',
        title: 'Ритуал 60 минут',
        subtitle: 'Классический или расслабляющий массаж на выбор гостя',
        amountLabel: '15 000 ₸',
        amountValue: 15000,
        details: 'Льняной конверт или мгновенная электронная версия · Свободный выбор мастера',
      },
      {
        id: 'cert-recovery',
        title: 'Глубокое восстановление 75 минут',
        subtitle: 'Аромамассаж или глубокотканная проработка + чайная церемония',
        amountLabel: '25 000 ₸',
        amountValue: 25000,
        details: 'Включает индивидуальный подбор ароматической композиции и чайную паузу в лаунже',
      },
      {
        id: 'cert-couples',
        title: 'Приватный парный сьют',
        subtitle: 'Синхронный ритуал для двоих в отдельном сьюте (90 минут)',
        amountLabel: '50 000 ₸',
        amountValue: 50000,
        details: 'Два мастера одновременно + приватное чаепитие с органическими сладостями',
      },
    ],
  },

  testimonials: {
    eyebrow: 'ОТЗЫВЫ ГОСТЕЙ · МАКЕТ',
    title: 'Атмосфера, в которую хочется возвращаться',
    disclaimer:
      'Ниже представлены демонстрационные примеры карточек для визуализации макета. На реальном коммерческом проекте блок подключается к верифицированным отзывам гостей студии.',
    items: [
      {
        id: 'review-1',
        guestLabel: 'Айгерим С. · Гость студии (пример для макета)',
        ritualTitle: 'Расслабляющий массаж · 75 минут',
        quote:
          '«Очень спокойная атмосфера и действительно внимательный специалист. После процедуры почувствовала себя намного лучше. Никакой спешки, тёплый лён и идеальный нажим мастера Анны».',
        atmosphereNote: 'Отмечено в анкете: бережное отношение и глубокий покой',
      },
      {
        id: 'review-2',
        guestLabel: 'Данияр К. · Гость студии (пример для макета)',
        ritualTitle: 'Глубокотканный массаж · 60 минут',
        quote:
          '«После частых перелётов спина была зажата. Марк очень точно нашёл все триггеры в плечевом поясе — глубокая анатомическая работа без болезненных резких рывков. Вернусь снова».',
        atmosphereNote: 'Отмечено в анкете: точечная проработка зажимов',
      },
      {
        id: 'review-3',
        guestLabel: 'Мадина и Арман · Гости студии (пример для макета)',
        ritualTitle: 'Парный массаж · 90 минут',
        quote:
          '«Ощущение отдыха в бутик-отеле посреди рабочей недели. Возможность индивидуально выбрать музыку, масла и степень нажима для каждого из нас сделала визит идеальным».',
        atmosphereNote: 'Отмечено в анкете: уединение парного сьюта',
      },
    ],
  },

  faq: {
    eyebrow: 'ЧАСТЫЕ ВОПРОСЫ',
    title: 'Детали вашего визита',
    subtitle:
      'Мы продумали каждый шаг посещения так, чтобы вам не нужно было ни о чём беспокоиться.',
    items: [
      {
        id: 'faq-prep',
        question: 'Как подготовиться к массажу?',
        answer:
          'Никакой специальной подготовки не требуется. Всё необходимое — мягкие халаты, тапочки, одноразовое бельё, натуральная косметика для душа и свежие полотенца — ждёт вас в вашем сьюте. Рекомендуем прийти за 10–15 минут до назначенного времени, чтобы спокойно выпить травяной чай и настроиться на сеанс.',
      },
      {
        id: 'faq-specialist',
        question: 'Можно ли выбрать специалиста?',
        answer:
          'Да, при бронировании вы можете выбрать конкретного мастера студии или воспользоваться опцией «Любой свободный специалист». Все наши специалисты обладают профильной квалификацией и работают по единым стандартам заботы.',
      },
      {
        id: 'faq-reschedule',
        question: 'Можно ли перенести запись?',
        answer:
          'Да, перенести или отменить визит можно бесплатно не позднее чем за 6 часов до начала сеанса, связавшись с администратором в мессенджере или по телефону. Это позволяет нам уважительно относиться к рабочему графику мастеров.',
      },
      {
        id: 'faq-duration',
        question: 'Сколько длится процедура?',
        answer:
          'В каталоге указано чистое время работы мастера: 40, 60, 75 или 90 минут. В дополнение к этому времени мы бесплатно резервируем 25 минут на приветственный разговор за чаем, переодевание и плавное возвращение после процедуры.',
      },
      {
        id: 'faq-multiple',
        question: 'Можно ли записаться на несколько процедур?',
        answer:
          'Да, вы можете забронировать несколько последовательных ритуалов для комплексного восстановления (например, глубокотканный массаж спины и ольфакторный аромамассаж) либо забронировать сеансы для нескольких гостей одновременно.',
      },
      {
        id: 'faq-couples',
        question: 'Есть ли парный массаж?',
        answer:
          'Да, в нашей студии есть отдельный просторный сьют для парных ритуалов с двумя синхронными кушетками. Два мастера работают одновременно, а после сеанса для вас сервируется травяной сбор в приватной лаунж-зоне.',
      },
    ],
  },
};
