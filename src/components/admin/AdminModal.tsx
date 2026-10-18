import * as React from 'react';
import {
  AlertCircle,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Edit3,
  ExternalLink,
  Filter,
  Image as ImageIcon,
  KeyRound,
  Lock,
  LogOut,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  Shield,
  Sparkles,
  Trash2,
  Upload,
  User,
  Users,
  X,
} from 'lucide-react';
import {
  BRAND_PRESETS_LIST,
  getActiveBrandPreset,
  setBrandPreset,
  type BrandPreset,
} from '@/config/brandPresets';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { studioConfig } from '@/config/studioConfig';
import {
  clearAllBookings,
  DEFAULT_ADMIN_PIN,
  deleteBooking,
  formatHumanDate,
  formatRussianPhoneInput,
  generateDemoReferenceCode,
  getAdminAuthStatus,
  getAdminPin,
  getSessionDemoBookings,
  getTelegramSettings,
  getWhatsAppConfirmationUrl,
  resetAdminPin,
  saveSessionDemoBooking,
  saveTelegramSettings,
  sendTelegramNotification,
  setAdminAuthStatus,
  setAdminPin,
  toLocalIsoDate,
  updateBookingStatus,
  verifyAdminPin,
  type BookingStatus,
  type DemoBookingRecord,
  type TelegramSettings,
} from '@/lib/booking';
import {
  useStudioCatalog,
  PRESET_SERVICE_IMAGES,
  PRESET_SPECIALIST_IMAGES,
  compressAndReadFileAsDataUrl,
  type WellnessService,
  type SpecialistProfile,
} from '@/lib/catalogStore';
import { cn, formatPrice } from '@/lib/utils';

interface AdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingsUpdated?: () => void;
}

type AdminTab =
  | 'bookings'
  | 'services'
  | 'specialists'
  | 'telegram'
  | 'new-booking'
  | 'settings';

const DAYS_OF_WEEK = [
  { day: 1, label: 'Пн' },
  { day: 2, label: 'Вт' },
  { day: 3, label: 'Ср' },
  { day: 4, label: 'Чт' },
  { day: 5, label: 'Пт' },
  { day: 6, label: 'Сб' },
  { day: 0, label: 'Вс' },
];

const SERVICE_CATEGORY_OPTIONS: Array<{
  id: 'classic' | 'relax' | 'recovery' | 'rituals';
  label: string;
}> = [
  { id: 'classic', label: 'Классический массаж' },
  { id: 'relax', label: 'Расслабление и релакс' },
  { id: 'recovery', label: 'Восстановление мышц' },
  { id: 'rituals', label: 'Авторские спа-ритуалы' },
];

export const AdminModal: React.FC<AdminModalProps> = ({
  open,
  onOpenChange,
  onBookingsUpdated,
}) => {
  // Живой каталог услуг и мастеров
  const {
    services,
    specialists,
    saveService: saveCatalogService,
    removeService: removeCatalogService,
    restoreServices: restoreCatalogServices,
    saveSpecialist: saveCatalogSpecialist,
    removeSpecialist: removeCatalogSpecialist,
    restoreSpecialists: restoreCatalogSpecialists,
  } = useStudioCatalog();

  // Авторизация по PIN-коду (по умолчанию 1234)
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() =>
    getAdminAuthStatus()
  );
  const [pinInput, setPinInput] = React.useState<string>('');
  const [pinError, setPinError] = React.useState<string | null>(null);

  // Вкладка
  const [activeTab, setActiveTab] = React.useState<AdminTab>('bookings');

  // Данные записей
  const [bookings, setBookings] = React.useState<DemoBookingRecord[]>(() =>
    getSessionDemoBookings()
  );
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Настройки Telegram
  const [tgSettings, setTgSettings] = React.useState<TelegramSettings>(() =>
    getTelegramSettings()
  );
  const [tgTesting, setTgTesting] = React.useState(false);
  const [tgTestResult, setTgTestResult] = React.useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  // Форма ручного добавления записи
  const [manualServiceId, setManualServiceId] = React.useState(
    () => services[0]?.id || 'classic-massage'
  );
  const [manualSpecialistId, setManualSpecialistId] = React.useState('any');
  const [manualDateIso, setManualDateIso] = React.useState(() =>
    toLocalIsoDate(new Date())
  );
  const [manualTime, setManualTime] = React.useState('14:00');
  const [manualName, setManualName] = React.useState('');
  const [manualPhone, setManualPhone] = React.useState('');
  const [manualComment, setManualComment] = React.useState('');
  const [manualSuccessMsg, setManualSuccessMsg] = React.useState<string | null>(
    null
  );

  // Состояния редактирования УСЛУГ
  const [editingService, setEditingService] =
    React.useState<WellnessService | null>(null);
  const [isServiceFormOpen, setIsServiceFormOpen] = React.useState(false);
  const [serviceFeedback, setServiceFeedback] = React.useState<string | null>(
    null
  );
  const [isCompressingServiceImage, setIsCompressingServiceImage] =
    React.useState(false);
  const serviceFileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Состояния редактирования МАСТЕРОВ
  const [editingSpecialist, setEditingSpecialist] =
    React.useState<SpecialistProfile | null>(null);
  const [isSpecialistFormOpen, setIsSpecialistFormOpen] = React.useState(false);
  const [specialistFeedback, setSpecialistFeedback] = React.useState<
    string | null
  >(null);
  const [isCompressingSpecialistImage, setIsCompressingSpecialistImage] =
    React.useState(false);
  const specialistFileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Смена PIN-кода администратора
  const [currentPinInput, setCurrentPinInput] = React.useState('');
  const [newPinInput, setNewPinInput] = React.useState('');
  const [confirmPinInput, setConfirmPinInput] = React.useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = React.useState<string | null>(null);
  const [pinChangeError, setPinChangeError] = React.useState<string | null>(null);

  // Активный бренд студии (White-label)
  const [activeBrandPreset, setActiveBrandPreset] = React.useState<BrandPreset>(
    () => getActiveBrandPreset()
  );
  const [showDemoBarOnSite, setShowDemoBarOnSite] = React.useState<boolean>(
    () =>
      typeof window !== 'undefined'
        ? window.localStorage.getItem('elan_show_demo_bar') === 'true'
        : false
  );

  // Перезагрузка списка при открытии
  React.useEffect(() => {
    if (open) {
      setBookings(getSessionDemoBookings());
      setTgSettings(getTelegramSettings());
      setTgTestResult(null);
      setManualSuccessMsg(null);
      setServiceFeedback(null);
      setSpecialistFeedback(null);
      setPinChangeSuccess(null);
      setPinChangeError(null);
      setActiveBrandPreset(getActiveBrandPreset());
      setShowDemoBarOnSite(
        window.localStorage.getItem('elan_show_demo_bar') === 'true'
      );
      setIsAuthenticated(getAdminAuthStatus());
    }
  }, [open]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput)) {
      setIsAuthenticated(true);
      setAdminAuthStatus(true);
      setPinError(null);
      setPinInput('');
    } else {
      setPinError('Неверный PIN-код. Проверьте правильность ввода.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuthStatus(false);
    setPinInput('');
  };

  const handleServiceImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsCompressingServiceImage(true);
      const dataUrl = await compressAndReadFileAsDataUrl(file, 1200, 1200, 0.82);
      if (editingService) {
        setEditingService({
          ...editingService,
          image: dataUrl,
        });
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка при загрузке фото');
    } finally {
      setIsCompressingServiceImage(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleSpecialistImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsCompressingSpecialistImage(true);
      const dataUrl = await compressAndReadFileAsDataUrl(file, 800, 800, 0.85);
      if (editingSpecialist) {
        setEditingSpecialist({
          ...editingSpecialist,
          image: dataUrl,
        });
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка при загрузке фото');
    } finally {
      setIsCompressingSpecialistImage(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeSuccess(null);
    setPinChangeError(null);

    if (!verifyAdminPin(currentPinInput)) {
      setPinChangeError('Текущий PIN-код указан неверно.');
      return;
    }
    if (newPinInput.length < 4 || newPinInput.length > 8) {
      setPinChangeError('Новый PIN-код должен содержать от 4 до 8 символов.');
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setPinChangeError('Новый PIN-код и подтверждение не совпадают.');
      return;
    }

    setAdminPin(newPinInput);
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
    setPinChangeSuccess(
      `PIN-код успешно изменён на ${newPinInput}! Запомните его для следующих входов.`
    );
  };

  const handleResetPin = () => {
    if (
      window.confirm(
        `Сбросить PIN-код до заводского по умолчанию (${DEFAULT_ADMIN_PIN})?`
      )
    ) {
      resetAdminPin();
      setCurrentPinInput('');
      setNewPinInput('');
      setConfirmPinInput('');
      setPinChangeSuccess(`PIN-код сброшен до стандартного: ${DEFAULT_ADMIN_PIN}`);
      setPinChangeError(null);
    }
  };

  const handleStatusChange = (
    referenceCode: string,
    newStatus: BookingStatus
  ) => {
    const updated = updateBookingStatus(referenceCode, newStatus);
    setBookings(updated);
    onBookingsUpdated?.();
  };

  const handleDeleteBooking = (referenceCode: string) => {
    if (window.confirm(`Удалить запись ${referenceCode} из журнала?`)) {
      const updated = deleteBooking(referenceCode);
      setBookings(updated);
      onBookingsUpdated?.();
    }
  };

  const handleSaveTelegram = (e: React.FormEvent) => {
    e.preventDefault();
    saveTelegramSettings(tgSettings);
    setTgTestResult({
      success: true,
      message: 'Настройки Telegram сохранены в памяти браузера.',
    });
  };

  const handleTestTelegram = async () => {
    setTgTesting(true);
    setTgTestResult(null);

    const testText =
      '🌿 *ÉLAN Wellness — Тестовое оповещение*\n━━━━━━━━━━━━━━━━━━━━\nБот успешно подключён к системе онлайн-записи студии!\nТеперь все новые бронирования будут мгновенно приходить сюда.';

    const res = await sendTelegramNotification(testText, tgSettings);
    setTgTesting(false);
    if (res.success) {
      setTgTestResult({
        success: true,
        message: 'Тестовое сообщение успешно отправлено в ваш Telegram!',
      });
    } else {
      setTgTestResult({
        success: false,
        message:
          res.error ||
          'Не удалось отправить сообщение. Проверьте Bot Token и Chat ID.',
      });
    }
  };

  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim() || manualPhone.replace(/\D/g, '').length < 11) {
      alert('Пожалуйста, укажите имя гостя и корректный номер телефона.');
      return;
    }

    const srv =
      services.find((s) => s.id === manualServiceId) || services[0];
    const spec =
      manualSpecialistId === 'any'
        ? { name: 'Любой доступный мастер' }
        : specialists.find((s) => s.id === manualSpecialistId) || {
            name: 'Мастер студии',
          };

    const newRecord: DemoBookingRecord = {
      referenceCode: generateDemoReferenceCode('CRM'),
      createdAtIso: new Date().toISOString(),
      serviceId: srv.id,
      serviceTitle: srv.title,
      durationMinutes: srv.durationMinutes,
      price: srv.price,
      specialistId: manualSpecialistId,
      specialistName: spec.name,
      dateIso: manualDateIso,
      dateFormatted: formatHumanDate(manualDateIso),
      timeSlot: manualTime,
      guestName: manualName.trim(),
      guestPhone: manualPhone,
      guestComment: manualComment.trim()
        ? `[Создано администратором] ${manualComment.trim()}`
        : '[Создано администратором]',
      atmospherePreference: 'undecided',
      status: 'confirmed',
      isDemoOnly: true,
    };

    const updated = saveSessionDemoBooking(newRecord);
    setBookings(updated);
    onBookingsUpdated?.();

    setManualSuccessMsg(
      `Запись ${newRecord.referenceCode} успешно добавлена в расписание студии!`
    );
    setManualName('');
    setManualPhone('');
    setManualComment('');

    setTimeout(() => {
      setActiveTab('bookings');
      setManualSuccessMsg(null);
    }, 1800);
  };

  const handleExportCsv = () => {
    if (bookings.length === 0) {
      alert('Нет записей для экспорта');
      return;
    }

    const header = [
      'Номер записи',
      'Статус',
      'Дата создания',
      'Услуга',
      'Длительность (мин)',
      'Цена (тенге)',
      'Специалист',
      'Дата визита',
      'Время',
      'Имя гостя',
      'Телефон',
      'Комментарий',
    ];

    const rows = bookings.map((b) => [
      `"${b.referenceCode}"`,
      `"${b.status || 'new'}"`,
      `"${b.createdAtIso}"`,
      `"${b.serviceTitle}"`,
      b.durationMinutes,
      b.price,
      `"${b.specialistName}"`,
      `"${b.dateFormatted}"`,
      `"${b.timeSlot}"`,
      `"${b.guestName}"`,
      `"${b.guestPhone}"`,
      `"${(b.guestComment || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      '\uFEFF' + [header.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `elan-wellness-bookings-${toLocalIsoDate(new Date())}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSeedDemoBookings = () => {
    const srv1 = services[0] || {
      id: 'classic-massage',
      title: 'Классический массаж',
      durationMinutes: 60,
      price: 8000,
    };
    const srv2 = services[1] || {
      id: 'relax-massage',
      title: 'Расслабляющий массаж',
      durationMinutes: 75,
      price: 9000,
    };
    const spec1 = specialists[0] || { id: 'anna-petrova', name: 'Анна Петрова' };
    const spec2 = specialists[1] || { id: 'mikhail-volkov', name: 'Михаил Волков' };

    const demo1: DemoBookingRecord = {
      referenceCode: '#ELAN9120',
      createdAtIso: new Date(Date.now() - 3600000 * 2).toISOString(),
      serviceId: srv1.id,
      serviceTitle: srv1.title,
      durationMinutes: srv1.durationMinutes,
      price: srv1.price,
      specialistId: spec1.id,
      specialistName: spec1.name,
      dateIso: toLocalIsoDate(new Date()),
      dateFormatted: formatHumanDate(toLocalIsoDate(new Date())),
      timeSlot: '15:00',
      guestName: 'Елена Воронова',
      guestPhone: '+7 (777) 234-56-78',
      guestComment: 'Болит шея после работы за компьютером',
      atmospherePreference: 'ambient',
      status: 'new',
      isDemoOnly: true,
    };

    const demo2: DemoBookingRecord = {
      referenceCode: '#ELAN7841',
      createdAtIso: new Date(Date.now() - 3600000 * 5).toISOString(),
      serviceId: srv2.id,
      serviceTitle: srv2.title,
      durationMinutes: srv2.durationMinutes,
      price: srv2.price,
      specialistId: spec2.id,
      specialistName: spec2.name,
      dateIso: toLocalIsoDate(new Date(Date.now() + 86400000)),
      dateFormatted: formatHumanDate(toLocalIsoDate(new Date(Date.now() + 86400000))),
      timeSlot: '17:00',
      guestName: 'Арман Сабитов',
      guestPhone: '+7 (701) 555-88-99',
      guestComment: 'После тренировки, нужен сильный нажим',
      atmospherePreference: 'silence',
      status: 'confirmed',
      isDemoOnly: true,
    };

    saveSessionDemoBooking(demo1);
    const final = saveSessionDemoBooking(demo2);
    setBookings(final);
    onBookingsUpdated?.();
  };

  // ================= УПРАВЛЕНИЕ УСЛУГАМИ =================

  const handleAddNewService = () => {
    const id = 'service-' + Date.now();
    setEditingService({
      id,
      code: 'SRV' + Math.floor(100 + Math.random() * 900),
      title: '',
      subtitle: 'Восстановление баланса и глубокое расслабление мышц',
      category: 'relax',
      categoryLabel: 'Расслабление',
      durationMinutes: 60,
      price: 9000,
      description:
        'Индивидуальный ритуал для снятия мышечных спазмов, улучшения кровообращения и глубокого психоэмоционального отдыха.',
      sensoryNotes: ['льняные полотенца', 'масло жожоба', 'тишина'],
      intensity: 'Средняя',
      image: PRESET_SERVICE_IMAGES[0].url,
      imageAlt: 'Массаж студии',
      featuredNote: 'Новинка',
    });
    setIsServiceFormOpen(true);
  };

  const handleEditService = (srv: WellnessService) => {
    setEditingService({ ...srv });
    setIsServiceFormOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title.trim()) {
      alert('Пожалуйста, укажите название услуги.');
      return;
    }
    saveCatalogService(editingService);
    setServiceFeedback(`Услуга «${editingService.title}» успешно сохранена!`);
    setIsServiceFormOpen(false);
    setTimeout(() => setServiceFeedback(null), 3500);
  };

  const handleDeleteService = (id: string, title: string) => {
    if (services.length <= 1) {
      alert('В каталоге должна оставаться хотя бы одна услуга.');
      return;
    }
    if (window.confirm(`Удалить услугу «${title}» из каталога студии?`)) {
      removeCatalogService(id);
      setServiceFeedback(`Услуга «${title}» удалена из каталога.`);
      setTimeout(() => setServiceFeedback(null), 3500);
    }
  };

  const handleRestoreServices = () => {
    if (
      window.confirm(
        'Сбросить все услуги и цены к исходному базовому каталогу студии?'
      )
    ) {
      restoreCatalogServices();
      setServiceFeedback('Каталог услуг возвращён к исходным настройкам.');
      setTimeout(() => setServiceFeedback(null), 3500);
    }
  };

  // ================= УПРАВЛЕНИЕ МАСТЕРАМИ =================

  const handleAddNewSpecialist = () => {
    const id = 'specialist-' + Date.now();
    setEditingSpecialist({
      id,
      name: '',
      role: 'Массажист-терапевт',
      experienceYears: '4 года опыта',
      approach:
        'Бережное внимание к анатомическим особенностям гостя и мягкое погружение в комфорт.',
      quote: 'Тишина и правильное прикосновение лечат быстрее любых слов.',
      specialties: ['Расслабляющий массаж', 'Классические техники'],
      serviceIds: services.map((s) => s.id),
      workingDays: [1, 2, 3, 4, 5], // Пн-Пт
      image: PRESET_SPECIALIST_IMAGES[0].url,
      imageAlt: 'Мастер студии',
    });
    setIsSpecialistFormOpen(true);
  };

  const handleEditSpecialist = (sp: SpecialistProfile) => {
    setEditingSpecialist({
      ...sp,
      workingDays: [...sp.workingDays],
      serviceIds: [...sp.serviceIds],
      specialties: [...sp.specialties],
    });
    setIsSpecialistFormOpen(true);
  };

  const handleToggleSpecialistDay = (day: number) => {
    if (!editingSpecialist) return;
    const exists = editingSpecialist.workingDays.includes(day);
    const updated = exists
      ? editingSpecialist.workingDays.filter((d) => d !== day)
      : [...editingSpecialist.workingDays, day];

    setEditingSpecialist({
      ...editingSpecialist,
      workingDays: updated,
    });
  };

  const handleToggleSpecialistService = (srvId: string) => {
    if (!editingSpecialist) return;
    const exists = editingSpecialist.serviceIds.includes(srvId);
    const updated = exists
      ? editingSpecialist.serviceIds.filter((id) => id !== srvId)
      : [...editingSpecialist.serviceIds, srvId];

    setEditingSpecialist({
      ...editingSpecialist,
      serviceIds: updated,
    });
  };

  const handleSaveSpecialist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSpecialist || !editingSpecialist.name.trim()) {
      alert('Пожалуйста, укажите имя мастера.');
      return;
    }
    if (editingSpecialist.workingDays.length === 0) {
      alert('Выберите хотя бы один рабочий день для мастера.');
      return;
    }
    saveCatalogSpecialist(editingSpecialist);
    setSpecialistFeedback(`Мастер «${editingSpecialist.name}» успешно сохранён!`);
    setIsSpecialistFormOpen(false);
    setTimeout(() => setSpecialistFeedback(null), 3500);
  };

  const handleDeleteSpecialist = (id: string, name: string) => {
    if (specialists.length <= 1) {
      alert('В студии должен оставаться хотя бы один специалист.');
      return;
    }
    if (window.confirm(`Удалить профиль мастера «${name}»?`)) {
      removeCatalogSpecialist(id);
      setSpecialistFeedback(`Мастер «${name}» удалён.`);
      setTimeout(() => setSpecialistFeedback(null), 3500);
    }
  };

  const handleRestoreSpecialists = () => {
    if (
      window.confirm(
        'Сбросить список специалистов студии к базовой команде?'
      )
    ) {
      restoreCatalogSpecialists();
      setSpecialistFeedback('Список специалистов возвращён к исходному.');
      setTimeout(() => setSpecialistFeedback(null), 3500);
    }
  };

  // Фильтрация записей
  const filteredBookings = React.useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus =
        statusFilter === 'all' ? true : (b.status || 'new') === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        b.referenceCode.toLowerCase().includes(q) ||
        b.guestName.toLowerCase().includes(q) ||
        b.guestPhone.includes(q) ||
        b.serviceTitle.toLowerCase().includes(q) ||
        b.specialistName.toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [bookings, statusFilter, searchQuery]);

  // Статистика
  const stats = React.useMemo(() => {
    const total = bookings.length;
    const newCount = bookings.filter((b) => !b.status || b.status === 'new').length;
    const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
    const completedCount = bookings.filter((b) => b.status === 'completed').length;
    const revenue = bookings
      .filter((b) => b.status !== 'cancelled')
      .reduce((sum, b) => sum + (b.price || 0), 0);

    return { total, newCount, confirmedCount, completedCount, revenue };
  }, [bookings]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 flex flex-col max-h-[94vh] sm:max-h-[90vh] h-[92vh] sm:h-[86vh] overflow-hidden rounded-[24px]">
        {!isAuthenticated ? (
          /* ЭКРАН АВТОРИЗАЦИИ ПО PIN-КОДУ */
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 text-center max-w-md mx-auto">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#667052]/15 text-[#667052] ring-8 ring-[#667052]/10 mb-5">
              <Lock className="h-8 w-8" aria-hidden="true" />
            </div>

            <DialogHeader className="text-center sm:text-center pr-0 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#667052]">
                <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                <span>ÉLAN CRM & Управление студией</span>
              </div>
              <DialogTitle className="font-serif text-3xl font-medium text-[#292A23]">
                Кабинет администратора
              </DialogTitle>
              <DialogDescription className="text-sm text-[#5E5E53]">
                Управление журналом бронирований, редактирование услуг, цен и мастеров студии, настройка Telegram-оповещений.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleLogin} className="w-full mt-6 space-y-4">
              <div className="space-y-2 text-left">
                <label
                  htmlFor="admin-pin"
                  className="text-xs font-medium uppercase tracking-wider text-[#77776B]"
                >
                  Введите PIN-код доступа
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#77776B]" />
                  <Input
                    id="admin-pin"
                    type="password"
                    maxLength={8}
                    placeholder="Например: 1234"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="pl-10 text-center text-lg tracking-widest font-mono h-12"
                    autoFocus
                  />
                </div>
              </div>

              {pinError && (
                <div className="p-2.5 rounded-xl border border-[#B44C3E]/40 bg-[#B44C3E]/10 text-xs text-[#8C3327]">
                  {pinError}
                </div>
              )}

              {/* Подсказка PIN */}
              <div className="rounded-xl border border-[#C6B99F]/70 bg-[#F7F4ED] p-3 text-xs text-[#5E5E53] flex items-center justify-between">
                <span>Текущий PIN:</span>
                <button
                  type="button"
                  onClick={() => setPinInput(getAdminPin())}
                  className="font-mono font-bold text-[#667052] underline cursor-pointer hover:text-[#4F5B3E]"
                >
                  {getAdminPin()} (нажмите, чтобы подставить)
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-sm font-semibold bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6]"
              >
                Войти в кабинет студии
              </Button>
            </form>
          </div>
        ) : (
          /* АВТОРИЗОВАННЫЙ КАБИНЕТ АДМИНИСТРАТОРА */
          <div className="flex flex-col h-full min-h-0">
            {/* ШАПКА КАБИНЕТА */}
            <div className="shrink-0 p-4 sm:p-6 pb-3 border-b border-[#E5E0D5] bg-[#FFFCF6] relative z-10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 pr-10">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#667052] font-semibold">
                    <span>{studioConfig.brand.name}</span>
                    <span aria-hidden="true">·</span>
                    <span>Панель управления</span>
                    {stats.newCount > 0 && (
                      <span className="rounded-full bg-[#667052] text-[#FFFCF6] px-2 py-0.5 text-[10px] font-bold animate-pulse">
                        +{stats.newCount} новых
                      </span>
                    )}
                  </div>
                  <DialogTitle className="mt-0.5 font-serif text-2xl font-medium text-[#292A23]">
                    Управление студией
                  </DialogTitle>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="h-9 px-3 text-xs gap-1.5 text-[#77776B] hover:text-[#B44C3E] hover:border-[#B44C3E]"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Выйти</span>
                  </Button>
                </div>
              </div>

              {/* МЕНЮ ВКЛАДОК */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#E5E0D5] overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0',
                    activeTab === 'bookings'
                      ? 'bg-[#667052] text-[#FFFCF6]'
                      : 'text-[#5E5E53] hover:bg-[#F7F4ED]'
                  )}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Заявки ({bookings.length})</span>
                  {stats.newCount > 0 && (
                    <span className="flex h-2 w-2 rounded-full bg-[#C6B99F]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0',
                    activeTab === 'services'
                      ? 'bg-[#667052] text-[#FFFCF6]'
                      : 'text-[#5E5E53] hover:bg-[#F7F4ED]'
                  )}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Услуги и цены ({services.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('specialists')}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0',
                    activeTab === 'specialists'
                      ? 'bg-[#667052] text-[#FFFCF6]'
                      : 'text-[#5E5E53] hover:bg-[#F7F4ED]'
                  )}
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Мастера ({specialists.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('telegram')}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0',
                    activeTab === 'telegram'
                      ? 'bg-[#667052] text-[#FFFCF6]'
                      : 'text-[#5E5E53] hover:bg-[#F7F4ED]'
                  )}
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Telegram</span>
                  {tgSettings.enabled && (
                    <span className="rounded-full bg-emerald-500/20 text-emerald-700 px-1 text-[9px] font-bold">
                      Вкл
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('new-booking')}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0',
                    activeTab === 'new-booking'
                      ? 'bg-[#667052] text-[#FFFCF6]'
                      : 'text-[#5E5E53] hover:bg-[#F7F4ED]'
                  )}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Записать вручную</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0',
                    activeTab === 'settings'
                      ? 'bg-[#667052] text-[#FFFCF6]'
                      : 'text-[#5E5E53] hover:bg-[#F7F4ED]'
                  )}
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>Настройки и PIN</span>
                </button>
              </div>
            </div>

            {/* ОСНОВНОЕ СОДЕРЖИМОЕ ВКЛАДОК */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* ================= ВКЛАДКА 1: ЖУРНАЛ ЗАПИСЕЙ ================= */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  {/* KPI-виджеты */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                    <div className="rounded-xl border border-[#E5E0D5] bg-[#F7F4ED] p-3">
                      <p className="text-[11px] uppercase tracking-wider text-[#77776B]">
                        Всего записей
                      </p>
                      <p className="font-serif text-2xl font-bold text-[#292A23] mt-0.5">
                        {stats.total}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#C6B99F] bg-[#FFFCF6] p-3 shadow-xs">
                      <p className="text-[11px] uppercase tracking-wider text-[#667052] font-semibold">
                        Ожидают подтверждения
                      </p>
                      <p className="font-serif text-2xl font-bold text-[#667052] mt-0.5">
                        {stats.newCount}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#E5E0D5] bg-[#F7F4ED] p-3">
                      <p className="text-[11px] uppercase tracking-wider text-[#77776B]">
                        Подтверждено
                      </p>
                      <p className="font-serif text-2xl font-bold text-[#4F5B3E] mt-0.5">
                        {stats.confirmedCount}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#E5E0D5] bg-[#F7F4ED] p-3">
                      <p className="text-[11px] uppercase tracking-wider text-[#77776B]">
                        Сумма заказов
                      </p>
                      <p className="font-serif text-xl sm:text-2xl font-bold text-[#292A23] mt-0.5">
                        {formatPrice(stats.revenue)}
                      </p>
                    </div>
                  </div>

                  {/* Фильтры и поиск */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      {[
                        { id: 'all', label: `Все (${stats.total})` },
                        { id: 'new', label: `Новые (${stats.newCount})` },
                        {
                          id: 'confirmed',
                          label: `Подтверждены (${stats.confirmedCount})`,
                        },
                        {
                          id: 'completed',
                          label: `Завершены (${stats.completedCount})`,
                        },
                      ].map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setStatusFilter(f.id)}
                          className={cn(
                            'rounded-full px-3 py-1 font-medium transition-colors cursor-pointer',
                            statusFilter === f.id
                              ? 'bg-[#292A23] text-[#FFFCF6]'
                              : 'bg-[#EFECE4] text-[#5E5E53] hover:bg-[#E5E0D5]'
                          )}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>

                    <div className="relative min-w-[220px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#77776B]" />
                      <Input
                        placeholder="Поиск по имени, номеру, телефону..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 text-xs h-9"
                      />
                    </div>
                  </div>

                  {/* Список карточек записей */}
                  {filteredBookings.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#E5E0D5] p-8 text-center space-y-3">
                      <p className="text-sm text-[#77776B]">
                        Записей по выбранному фильтру пока нет.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleSeedDemoBookings}
                          className="text-xs"
                        >
                          Загрузить примеры записей
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => setActiveTab('new-booking')}
                          className="text-xs bg-[#667052] text-[#FFFCF6]"
                        >
                          Создать запись вручную
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredBookings.map((b) => {
                        const status = b.status || 'new';
                        const waUrl = getWhatsAppConfirmationUrl(b);
                        const cleanPhone = b.guestPhone.replace(/\D/g, '');

                        return (
                          <div
                            key={b.referenceCode}
                            className={cn(
                              'rounded-2xl border p-4 sm:p-5 transition-all shadow-xs space-y-3.5',
                              status === 'new'
                                ? 'border-[#C6B99F] bg-[#FFFCF6] ring-1 ring-[#C6B99F]/60'
                                : status === 'confirmed'
                                ? 'border-[#667052]/40 bg-[#F7F4ED]'
                                : 'border-[#E5E0D5] bg-[#F7F4ED]/80 opacity-90'
                            )}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#E5E0D5]">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-bold text-[#667052]">
                                  {b.referenceCode}
                                </span>
                                <span className="text-xs text-[#77776B]">
                                  от {new Date(b.createdAtIso).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <span
                                  className={cn(
                                    'rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize',
                                    status === 'new' &&
                                      'bg-[#C6B99F]/25 text-[#4F5B3E] border border-[#C6B99F]',
                                    status === 'confirmed' &&
                                      'bg-[#667052]/15 text-[#4F5B3E] border border-[#667052]/40',
                                    status === 'completed' &&
                                      'bg-gray-200 text-gray-700',
                                    status === 'cancelled' &&
                                      'bg-red-100 text-red-700'
                                  )}
                                >
                                  {status === 'new' && '• Новая заявка'}
                                  {status === 'confirmed' && '✓ Подтверждена'}
                                  {status === 'completed' && 'Завершена'}
                                  {status === 'cancelled' && 'Отменена'}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs sm:text-sm">
                              <div className="md:col-span-7 space-y-1.5">
                                <p className="font-serif text-lg font-medium text-[#292A23]">
                                  {b.serviceTitle}{' '}
                                  <span className="font-sans text-xs text-[#77776B]">
                                    ({b.durationMinutes} мин)
                                  </span>
                                </p>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5E5E53]">
                                  <span className="font-semibold text-[#667052]">
                                    {b.dateFormatted}, в {b.timeSlot}
                                  </span>
                                  <span>•</span>
                                  <span>Мастер: {b.specialistName}</span>
                                </div>
                                {b.guestComment && (
                                  <p className="text-xs text-[#77776B] bg-[#EFECE4]/60 rounded-lg p-2 border border-[#E5E0D5]">
                                    <strong className="text-[#292A23]">Пожелания:</strong>{' '}
                                    {b.guestComment}
                                  </p>
                                )}
                              </div>

                              <div className="md:col-span-5 space-y-1.5 md:border-l md:border-[#E5E0D5] md:pl-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#77776B]">Гость</span>
                                  <span className="font-semibold text-base text-[#292A23]">
                                    {formatPrice(b.price)}
                                  </span>
                                </div>
                                <p className="font-medium text-[#292A23]">
                                  {b.guestName}
                                </p>
                                <p className="font-mono text-xs text-[#667052]">
                                  {b.guestPhone}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E5E0D5]">
                              <div className="flex flex-wrap items-center gap-2">
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 px-3.5 py-1.5 text-xs font-semibold text-[#128C7E] transition-colors"
                                >
                                  <MessageSquare className="h-3.5 w-3.5" />
                                  <span>Написать в WhatsApp</span>
                                </a>

                                <a
                                  href={`tel:${cleanPhone}`}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E0D5] bg-[#FFFCF6] hover:border-[#667052] px-3 py-1.5 text-xs font-medium text-[#292A23] transition-colors"
                                >
                                  <Phone className="h-3.5 w-3.5 text-[#667052]" />
                                  <span>Позвонить</span>
                                </a>
                              </div>

                              <div className="flex items-center gap-1.5">
                                {status !== 'confirmed' && (
                                  <Button
                                    type="button"
                                    size="sm"
                                    onClick={() =>
                                      handleStatusChange(b.referenceCode, 'confirmed')
                                    }
                                    className="h-8 px-2.5 text-xs bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6]"
                                  >
                                    <Check className="h-3 w-3 mr-1" />
                                    <span>Подтвердить</span>
                                  </Button>
                                )}

                                {status === 'confirmed' && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleStatusChange(b.referenceCode, 'completed')
                                    }
                                    className="h-8 px-2.5 text-xs"
                                  >
                                    Завершить визит
                                  </Button>
                                )}

                                {status !== 'cancelled' && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleStatusChange(b.referenceCode, 'cancelled')
                                    }
                                    className="h-8 px-2 text-xs text-[#77776B] hover:text-[#B44C3E]"
                                  >
                                    Отменить
                                  </Button>
                                )}

                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteBooking(b.referenceCode)}
                                  className="h-8 w-8 p-0 text-[#77776B] hover:text-[#B44C3E]"
                                  title="Удалить запись"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ================= ВКЛАДКА 2: УСЛУГИ И ЦЕНЫ ================= */}
              {activeTab === 'services' && (
                <div className="space-y-4">
                  {/* Верхняя плашка действий */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl border border-[#E5E0D5] bg-[#FFFCF6]">
                    <div>
                      <h3 className="font-serif text-lg font-medium text-[#292A23]">
                        Каталог процедур и стоимость
                      </h3>
                      <p className="text-xs text-[#5E5E53]">
                        Все изменения сразу обновляют главную страницу и форму онлайн-записи.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddNewService}
                        className="bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] text-xs gap-1.5"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Добавить услугу</span>
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRestoreServices}
                        className="text-xs gap-1.5 text-[#77776B]"
                        title="Сбросить все услуги к базовым настройкам"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Сброс</span>
                      </Button>
                    </div>
                  </div>

                  {serviceFeedback && (
                    <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-medium">
                      {serviceFeedback}
                    </div>
                  )}

                  {/* ФОРМА РЕДАКТИРОВАНИЯ / ДОБАВЛЕНИЯ УСЛУГИ */}
                  {isServiceFormOpen && editingService && (
                    <form
                      onSubmit={handleSaveService}
                      className="rounded-2xl border-2 border-[#667052]/50 bg-[#FFFCF6] p-5 sm:p-6 space-y-4 shadow-md animate-fade-up"
                    >
                      <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
                        <span className="font-serif text-xl font-medium text-[#292A23]">
                          {editingService.title
                            ? `Редактирование: ${editingService.title}`
                            : 'Новая услуга'}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsServiceFormOpen(false)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#292A23]">
                            Название процедуры *
                          </label>
                          <Input
                            placeholder="Например: Лимфодренажный детокс-массаж"
                            value={editingService.title}
                            onChange={(e) =>
                              setEditingService({
                                ...editingService,
                                title: e.target.value,
                              })
                            }
                            className="h-10 text-xs"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#292A23]">
                            Категория *
                          </label>
                          <select
                            value={editingService.category}
                            onChange={(e) => {
                              const cat = e.target.value as any;
                              const label =
                                SERVICE_CATEGORY_OPTIONS.find((c) => c.id === cat)
                                  ?.label || 'Массаж';
                              setEditingService({
                                ...editingService,
                                category: cat,
                                categoryLabel: label,
                              });
                            }}
                            className="w-full h-10 rounded-xl border border-[#E5E0D5] bg-[#FFFCF6] px-3 text-xs text-[#292A23] focus:ring-1 focus:ring-[#667052]"
                          >
                            {SERVICE_CATEGORY_OPTIONS.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#292A23]">
                            Цена (в тенге, ₸) *
                          </label>
                          <Input
                            type="number"
                            min={1000}
                            step={500}
                            placeholder="9000"
                            value={editingService.price}
                            onChange={(e) =>
                              setEditingService({
                                ...editingService,
                                price: Number(e.target.value) || 0,
                              })
                            }
                            className="h-10 text-xs font-mono"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#292A23]">
                            Длительность (в минутах) *
                          </label>
                          <Input
                            type="number"
                            min={15}
                            step={5}
                            placeholder="60"
                            value={editingService.durationMinutes}
                            onChange={(e) =>
                              setEditingService({
                                ...editingService,
                                durationMinutes: Number(e.target.value) || 60,
                              })
                            }
                            className="h-10 text-xs font-mono"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#292A23]">
                            Интенсивность нажима
                          </label>
                          <select
                            value={editingService.intensity}
                            onChange={(e) =>
                              setEditingService({
                                ...editingService,
                                intensity: e.target.value as any,
                              })
                            }
                            className="w-full h-10 rounded-xl border border-[#E5E0D5] bg-[#FFFCF6] px-3 text-xs text-[#292A23]"
                          >
                            <option value="Мягкая">Мягкая</option>
                            <option value="Средняя">Средняя</option>
                            <option value="Глубокая">Глубокая</option>
                            <option value="Адаптивная">Адаптивная</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#292A23]">
                            Особая метка (бейдж)
                          </label>
                          <Input
                            placeholder="Например: Выбор гостей / Новинка"
                            value={editingService.featuredNote || ''}
                            onChange={(e) =>
                              setEditingService({
                                ...editingService,
                                featuredNote: e.target.value,
                              })
                            }
                            className="h-10 text-xs"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <label className="font-semibold text-[#292A23]">
                          Краткое описание процедуры
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Опишите технику, результат и кому подходит процедура..."
                          value={editingService.description}
                          onChange={(e) =>
                            setEditingService({
                              ...editingService,
                              description: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-[#E5E0D5] bg-[#FFFCF6] p-3 text-xs text-[#292A23] focus:ring-1 focus:ring-[#667052]"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <label className="font-semibold text-[#292A23]">
                          Сенсорные детали (через запятую)
                        </label>
                        <Input
                          placeholder="льняные простыни, подогретые полотенца, масло миндаля"
                          value={editingService.sensoryNotes.join(', ')}
                          onChange={(e) =>
                            setEditingService({
                              ...editingService,
                              sensoryNotes: e.target.value
                                .split(',')
                                .map((s) => s.trim())
                                .filter(Boolean),
                            })
                          }
                          className="h-10 text-xs"
                        />
                      </div>

                      {/* ВЫБОР ФОТОГРАФИИ ДЛЯ УСЛУГИ БЕЗ URL-ПОЛЕЙ */}
                      <div className="space-y-3 pt-2 border-t border-[#E5E0D5] text-xs">
                        <div className="flex items-center justify-between">
                          <label className="font-semibold text-[#292A23] flex items-center gap-1.5">
                            <ImageIcon className="h-4 w-4 text-[#667052]" />
                            <span>Фотография процедуры</span>
                          </label>
                          <span className="text-[11px] text-[#77776B]">
                            Загрузка с телефона или компьютера
                          </span>
                        </div>

                        {/* Превью текущей фотографии и кнопка загрузки файла */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-2xl border border-[#E5E0D5] bg-[#F7F4ED]/50">
                          <div className="relative shrink-0 overflow-hidden rounded-xl border border-[#E5E0D5] bg-black/5 shadow-inner w-full sm:w-44 h-32 flex items-center justify-center">
                            {editingService.image ? (
                              <img
                                src={editingService.image}
                                alt="Превью услуги"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center p-3 text-[#77776B]">
                                <ImageIcon className="h-8 w-8 mx-auto mb-1 opacity-40" />
                                <span>Фото не выбрано</span>
                              </div>
                            )}
                            {isCompressingServiceImage && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-medium">
                                Обработка фото...
                              </div>
                            )}
                          </div>

                          <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                            <input
                              ref={serviceFileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleServiceImageFileChange}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              onClick={() => serviceFileInputRef.current?.click()}
                              disabled={isCompressingServiceImage}
                              className="w-full sm:w-auto h-10 bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] text-xs font-semibold gap-2 shadow-xs cursor-pointer"
                            >
                              <Upload className="h-4 w-4" />
                              <span>{isCompressingServiceImage ? 'Загрузка...' : 'Выбрать фото с устройства'}</span>
                            </Button>
                            <p className="text-[11px] text-[#77776B] leading-relaxed">
                              Выберите файл из галереи телефона или файлов компьютера (JPG, PNG, WebP). Фото автоматически сжимается для мгновенной загрузки сайта.
                            </p>
                          </div>
                        </div>

                        {/* Быстрые пресеты фото из коллекции студии */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-medium text-[#77776B]">
                            Или выберите готовое фото из коллекции студии:
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {PRESET_SERVICE_IMAGES.map((preset, idx) => {
                              const isSelected = editingService.image === preset.url;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() =>
                                    setEditingService({
                                      ...editingService,
                                      image: preset.url,
                                    })
                                  }
                                  className={cn(
                                    'group relative rounded-xl border p-1.5 transition-all text-left flex items-center gap-2 cursor-pointer',
                                    isSelected
                                      ? 'border-[#667052] bg-[#667052]/10 ring-1 ring-[#667052]'
                                      : 'border-[#E5E0D5] bg-[#FFFCF6] hover:border-[#C6B99F]'
                                  )}
                                >
                                  <img
                                    src={preset.url}
                                    alt="Пресет"
                                    className="h-10 w-10 rounded-lg object-cover shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="text-[11px] font-semibold text-[#292A23] truncate">
                                      Образец {idx + 1}
                                    </p>
                                    <p className="text-[10px] text-[#77776B] truncate">
                                      {preset.label.split('(')[0]}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5E0D5]">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsServiceFormOpen(false)}
                          className="text-xs"
                        >
                          Отмена
                        </Button>
                        <Button
                          type="submit"
                          className="bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] text-xs font-semibold px-6"
                        >
                          Сохранить услугу
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* СПИСОК УСЛУГ */}
                  <div className="grid grid-cols-1 gap-3">
                    {services.map((srv) => (
                      <div
                        key={srv.id}
                        className="rounded-2xl border border-[#E5E0D5] bg-[#FFFCF6] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#C6B99F] shadow-xs"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={srv.image}
                            alt={srv.title}
                            className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover shrink-0 border border-[#E5E0D5]"
                          />
                          <div className="min-w-0 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-serif text-lg font-medium text-[#292A23] truncate">
                                {srv.title}
                              </h4>
                              {srv.featuredNote && (
                                <span className="rounded-full bg-[#EFECE4] border border-[#C6B99F]/60 px-2 py-0.5 text-[10px] text-[#5E5E53]">
                                  {srv.featuredNote}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#77776B]">
                              <span className="font-semibold text-[#667052]">
                                {formatPrice(srv.price)}
                              </span>
                              <span>•</span>
                              <span>{srv.durationMinutes} мин</span>
                              <span>•</span>
                              <span>{srv.categoryLabel}</span>
                              <span>•</span>
                              <span>{srv.intensity}</span>
                            </div>
                            <p className="text-xs text-[#5E5E53] line-clamp-1 max-w-xl">
                              {srv.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditService(srv)}
                            className="h-9 px-3 text-xs gap-1.5"
                          >
                            <Edit3 className="h-3.5 w-3.5 text-[#667052]" />
                            <span>Изменить</span>
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteService(srv.id, srv.title)}
                            className="h-9 w-9 p-0 text-[#77776B] hover:text-[#B44C3E]"
                            title="Удалить услугу"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= ВКЛАДКА 3: МАСТЕРА СТУДИИ ================= */}
              {activeTab === 'specialists' && (
                <div className="space-y-4">
                  {/* Верхняя плашка действий */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl border border-[#E5E0D5] bg-[#FFFCF6]">
                    <div>
                      <h3 className="font-serif text-lg font-medium text-[#292A23]">
                        Команда специалистов студии
                      </h3>
                      <p className="text-xs text-[#5E5E53]">
                        Редактируйте имена мастеров, специализацию, рабочие дни недели и фото.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddNewSpecialist}
                        className="bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] text-xs gap-1.5"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Добавить мастера</span>
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRestoreSpecialists}
                        className="text-xs gap-1.5 text-[#77776B]"
                        title="Сбросить всех мастеров к базовым настройкам"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Сброс</span>
                      </Button>
                    </div>
                  </div>

                  {specialistFeedback && (
                    <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-medium">
                      {specialistFeedback}
                    </div>
                  )}

                  {/* ФОРМА РЕДАКТИРОВАНИЯ / ДОБАВЛЕНИЯ МАСТЕРА */}
                  {isSpecialistFormOpen && editingSpecialist && (
                    <form
                      onSubmit={handleSaveSpecialist}
                      className="rounded-2xl border-2 border-[#667052]/50 bg-[#FFFCF6] p-5 sm:p-6 space-y-4 shadow-md animate-fade-up"
                    >
                      <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
                        <span className="font-serif text-xl font-medium text-[#292A23]">
                          {editingSpecialist.name
                            ? `Редактирование: ${editingSpecialist.name}`
                            : 'Новый специалист'}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsSpecialistFormOpen(false)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#292A23]">
                            Имя и фамилия мастера *
                          </label>
                          <Input
                            placeholder="Например: Анна Петрова"
                            value={editingSpecialist.name}
                            onChange={(e) =>
                              setEditingSpecialist({
                                ...editingSpecialist,
                                name: e.target.value,
                              })
                            }
                            className="h-10 text-xs"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#292A23]">
                            Должность / специализация *
                          </label>
                          <Input
                            placeholder="Массажист-терапевт"
                            value={editingSpecialist.role}
                            onChange={(e) =>
                              setEditingSpecialist({
                                ...editingSpecialist,
                                role: e.target.value,
                              })
                            }
                            className="h-10 text-xs"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#292A23]">
                            Опыт работы *
                          </label>
                          <Input
                            placeholder="5 лет опыта"
                            value={editingSpecialist.experienceYears}
                            onChange={(e) =>
                              setEditingSpecialist({
                                ...editingSpecialist,
                                experienceYears: e.target.value,
                              })
                            }
                            className="h-10 text-xs"
                            required
                          />
                        </div>
                      </div>

                      {/* ВЫБОР РАБОЧИХ ДНЕЙ (ПН-ВС) */}
                      <div className="space-y-2 text-xs">
                        <label className="font-semibold text-[#292A23]">
                          Рабочие дни недели (влияет на доступные даты в онлайн-записи)
                        </label>
                        <div className="flex flex-wrap items-center gap-2">
                          {DAYS_OF_WEEK.map(({ day, label }) => {
                            const isWorking = editingSpecialist.workingDays.includes(day);
                            return (
                              <button
                                key={day}
                                type="button"
                                onClick={() => handleToggleSpecialistDay(day)}
                                className={cn(
                                  'h-9 w-12 rounded-xl border text-xs font-semibold transition-all cursor-pointer',
                                  isWorking
                                    ? 'border-[#667052] bg-[#667052] text-[#FFFCF6] shadow-xs'
                                    : 'border-[#E5E0D5] bg-[#FFFCF6] text-[#77776B] hover:border-[#C6B99F]'
                                )}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* ПРИВЯЗКА К УСЛУГАМ */}
                      <div className="space-y-2 text-xs">
                        <label className="font-semibold text-[#292A23]">
                          Оказываемые процедуры (к каким услугам гость может выбрать этого мастера)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 rounded-xl border border-[#E5E0D5] bg-[#F7F4ED]/60">
                          {services.map((srv) => {
                            const isChecked = editingSpecialist.serviceIds.includes(srv.id);
                            return (
                              <label
                                key={srv.id}
                                className="flex items-center gap-2 text-xs text-[#292A23] cursor-pointer hover:text-[#667052]"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleToggleSpecialistService(srv.id)}
                                  className="h-4 w-4 rounded border-[#C6B99F] text-[#667052] focus:ring-[#667052]"
                                />
                                <span className="truncate">{srv.title}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#292A23]">
                            Цитата / кредо мастера
                          </label>
                          <Input
                            placeholder="«Внимательное прикосновение и тишина лечат тело»"
                            value={editingSpecialist.quote}
                            onChange={(e) =>
                              setEditingSpecialist({
                                ...editingSpecialist,
                                quote: e.target.value,
                              })
                            }
                            className="h-10 text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-semibold text-[#292A23]">
                            Подход к гостю (краткий bio)
                          </label>
                          <Input
                            placeholder="Специализируется на расслабляющих и классических техниках..."
                            value={editingSpecialist.approach}
                            onChange={(e) =>
                              setEditingSpecialist({
                                ...editingSpecialist,
                                approach: e.target.value,
                              })
                            }
                            className="h-10 text-xs"
                          />
                        </div>
                      </div>

                      {/* ВЫБОР ФОТОГРАФИИ МАСТЕРА БЕЗ URL-ПОЛЕЙ */}
                      <div className="space-y-3 pt-2 border-t border-[#E5E0D5] text-xs">
                        <div className="flex items-center justify-between">
                          <label className="font-semibold text-[#292A23] flex items-center gap-1.5">
                            <ImageIcon className="h-4 w-4 text-[#667052]" />
                            <span>Портрет мастера</span>
                          </label>
                          <span className="text-[11px] text-[#77776B]">
                            Загрузка с телефона или компьютера
                          </span>
                        </div>

                        {/* Превью фотографии мастера и кнопка выбора файла */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-2xl border border-[#E5E0D5] bg-[#F7F4ED]/50">
                          <div className="relative shrink-0 overflow-hidden rounded-2xl border border-[#E5E0D5] bg-black/5 shadow-inner h-28 w-28 flex items-center justify-center">
                            {editingSpecialist.image ? (
                              <img
                                src={editingSpecialist.image}
                                alt="Портрет мастера"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center p-2 text-[#77776B]">
                                <User className="h-8 w-8 mx-auto mb-1 opacity-40" />
                                <span>Нет фото</span>
                              </div>
                            )}
                            {isCompressingSpecialistImage && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-medium">
                                Сжатие...
                              </div>
                            )}
                          </div>

                          <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                            <input
                              ref={specialistFileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleSpecialistImageFileChange}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              onClick={() => specialistFileInputRef.current?.click()}
                              disabled={isCompressingSpecialistImage}
                              className="w-full sm:w-auto h-10 bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] text-xs font-semibold gap-2 shadow-xs cursor-pointer"
                            >
                              <Upload className="h-4 w-4" />
                              <span>{isCompressingSpecialistImage ? 'Загрузка...' : 'Выбрать портрет с устройства'}</span>
                            </Button>
                            <p className="text-[11px] text-[#77776B] leading-relaxed">
                              Загрузите фото мастера прямо со смартфона или компьютера. Система автоматически оптимизирует размер кадра.
                            </p>
                          </div>
                        </div>

                        {/* Быстрые пресеты портретов */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-medium text-[#77776B]">
                            Или выберите готовый портрет из каталога:
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {PRESET_SPECIALIST_IMAGES.map((preset, idx) => {
                              const isSelected = editingSpecialist.image === preset.url;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() =>
                                    setEditingSpecialist({
                                      ...editingSpecialist,
                                      image: preset.url,
                                    })
                                  }
                                  className={cn(
                                    'group relative rounded-xl border p-1.5 transition-all text-left flex items-center gap-2 cursor-pointer',
                                    isSelected
                                      ? 'border-[#667052] bg-[#667052]/10 ring-1 ring-[#667052]'
                                      : 'border-[#E5E0D5] bg-[#FFFCF6] hover:border-[#C6B99F]'
                                  )}
                                >
                                  <img
                                    src={preset.url}
                                    alt="Пресет"
                                    className="h-10 w-10 rounded-full object-cover shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="text-[11px] font-semibold text-[#292A23] truncate">
                                      Портрет {idx + 1}
                                    </p>
                                    <p className="text-[10px] text-[#77776B] truncate">
                                      {preset.label.split('(')[0]}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5E0D5]">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsSpecialistFormOpen(false)}
                          className="text-xs"
                        >
                          Отмена
                        </Button>
                        <Button
                          type="submit"
                          className="bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] text-xs font-semibold px-6"
                        >
                          Сохранить мастера
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* СПИСОК МАСТЕРОВ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {specialists.map((sp) => (
                      <div
                        key={sp.id}
                        className="rounded-2xl border border-[#E5E0D5] bg-[#FFFCF6] p-4 flex flex-col justify-between gap-3 transition-all hover:border-[#C6B99F] shadow-xs"
                      >
                        <div className="flex items-start gap-3.5">
                          <img
                            src={sp.image}
                            alt={sp.name}
                            className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover shrink-0 border border-[#E5E0D5]"
                          />
                          <div className="min-w-0 space-y-1">
                            <h4 className="font-serif text-lg font-medium text-[#292A23] truncate">
                              {sp.name}
                            </h4>
                            <p className="text-xs text-[#667052] font-medium">
                              {sp.role} · {sp.experienceYears}
                            </p>
                            <p className="text-xs text-[#5E5E53] line-clamp-2">
                              {sp.approach}
                            </p>
                          </div>
                        </div>

                        {/* Рабочие дни мастера */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E5E0D5] text-xs">
                          <div className="flex items-center gap-1">
                            {DAYS_OF_WEEK.map(({ day, label }) => {
                              const isWork = sp.workingDays.includes(day);
                              return (
                                <span
                                  key={day}
                                  className={cn(
                                    'h-5 w-6 flex items-center justify-center rounded text-[10px] font-semibold',
                                    isWork
                                      ? 'bg-[#667052]/15 text-[#4F5B3E]'
                                      : 'bg-transparent text-gray-300'
                                  )}
                                >
                                  {label}
                                </span>
                              );
                            })}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditSpecialist(sp)}
                              className="h-8 px-2.5 text-xs gap-1"
                            >
                              <Edit3 className="h-3 w-3 text-[#667052]" />
                              <span>Изменить</span>
                            </Button>

                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSpecialist(sp.id, sp.name)}
                              className="h-8 w-8 p-0 text-[#77776B] hover:text-[#B44C3E]"
                              title="Удалить мастера"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= ВКЛАДКА 4: НАСТРОЙКА TELEGRAM ================= */}
              {activeTab === 'telegram' && (
                <div className="space-y-6 max-w-2xl">
                  {/* Пояснительная карточка */}
                  <div className="rounded-2xl border border-[#C6B99F]/80 bg-[#FFFCF6] p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#667052]">
                      <Send className="h-4 w-4" />
                      <span>Как вы будете мгновенно узнавать о новых записях?</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5E5E53] leading-relaxed">
                      При каждой новой записи на сайте система автоматически отправляет моментальное сообщение на ваш телефон в Telegram со всеми контактами клиента, выбранной услугой, датой и кнопкой перехода в WhatsApp.
                    </p>
                    <div className="rounded-xl bg-[#F7F4ED] p-3 text-xs text-[#292A23] space-y-1.5">
                      <p className="font-semibold text-[#667052]">
                        Инструкция по настройке за 2 минуты:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-[#5E5E53]">
                        <li>
                          Откройте в Telegram бота{' '}
                          <a
                            href="https://t.me/BotFather"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#667052] font-semibold underline"
                          >
                            @BotFather
                          </a>{' '}
                          и отправьте команду <code className="bg-[#EFECE4] px-1 py-0.5 rounded">/newbot</code>.
                        </li>
                        <li>
                          Задайте имя боту (например, <em>ÉLAN Studio Bot</em>) и скопируйте полученный <strong>API Token</strong>.
                        </li>
                        <li>
                          Напишите боту любое сообщение или узнайте свой <strong>Chat ID</strong> через бота{' '}
                          <a
                            href="https://t.me/userinfobot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#667052] font-semibold underline"
                          >
                            @userinfobot
                          </a>.
                        </li>
                        <li>Вставьте значения в поля ниже и нажмите «Сохранить».</li>
                      </ol>
                    </div>
                  </div>

                  {/* Форма настроек */}
                  <form onSubmit={handleSaveTelegram} className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl border border-[#E5E0D5] bg-[#F7F4ED] p-3.5">
                      <div className="space-y-0.5">
                        <label
                          htmlFor="tg-enable"
                          className="text-xs font-semibold uppercase tracking-wider text-[#292A23] cursor-pointer"
                        >
                          Включить отправку в Telegram
                        </label>
                        <p className="text-xs text-[#77776B]">
                          Отправлять уведомление сразу при клике «Подтвердить запись» клиентом
                        </p>
                      </div>
                      <input
                        id="tg-enable"
                        type="checkbox"
                        checked={tgSettings.enabled}
                        onChange={(e) =>
                          setTgSettings((prev) => ({
                            ...prev,
                            enabled: e.target.checked,
                          }))
                        }
                        className="h-5 w-5 rounded border-[#C6B99F] text-[#667052] focus:ring-[#667052] cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="tg-token"
                        className="text-xs font-medium uppercase tracking-wider text-[#77776B]"
                      >
                        Telegram Bot Token
                      </label>
                      <Input
                        id="tg-token"
                        placeholder="Например: 7123456789:AAHq_mX7..."
                        value={tgSettings.botToken}
                        onChange={(e) =>
                          setTgSettings((prev) => ({
                            ...prev,
                            botToken: e.target.value,
                          }))
                        }
                        className="font-mono text-xs h-11"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="tg-chat-id"
                        className="text-xs font-medium uppercase tracking-wider text-[#77776B]"
                      >
                        Ваш Chat ID (или ID группы администраторов)
                      </label>
                      <Input
                        id="tg-chat-id"
                        placeholder="Например: 123456789 или -100123456789"
                        value={tgSettings.chatId}
                        onChange={(e) =>
                          setTgSettings((prev) => ({
                            ...prev,
                            chatId: e.target.value,
                          }))
                        }
                        className="font-mono text-xs h-11"
                      />
                    </div>

                    {tgTestResult && (
                      <div
                        className={cn(
                          'p-3 rounded-xl border text-xs',
                          tgTestResult.success
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                            : 'border-red-200 bg-red-50 text-red-800'
                        )}
                      >
                        {tgTestResult.message}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button
                        type="submit"
                        className="bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] text-xs font-semibold"
                      >
                        Сохранить настройки
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleTestTelegram}
                        disabled={tgTesting || !tgSettings.botToken || !tgSettings.chatId}
                        className="text-xs gap-1.5"
                      >
                        <Send className="h-3.5 w-3.5 text-[#667052]" />
                        <span>{tgTesting ? 'Отправляем...' : 'Отправить тест'}</span>
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* ================= ВКЛАДКА 5: РУЧНОЕ СОЗДАНИЕ ЗАПИСИ ================= */}
              {activeTab === 'new-booking' && (
                <div className="space-y-5 max-w-xl">
                  <div className="rounded-xl border border-[#E5E0D5] bg-[#F7F4ED] p-4 text-xs text-[#5E5E53]">
                    <strong className="text-[#292A23]">Быстрое бронирование:</strong>{' '}
                    Используйте эту форму, если клиент позвонил по телефону или написал в соцсети, чтобы зафиксировать слот и включить его в единый журнал студии.
                  </div>

                  {manualSuccessMsg && (
                    <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-medium">
                      {manualSuccessMsg}
                    </div>
                  )}

                  <form onSubmit={handleCreateManualBooking} className="space-y-4 text-xs sm:text-sm">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-[#77776B]">
                        Услуга
                      </label>
                      <select
                        value={manualServiceId}
                        onChange={(e) => setManualServiceId(e.target.value)}
                        className="w-full h-11 rounded-xl border border-[#E5E0D5] bg-[#FFFCF6] px-3 text-xs text-[#292A23] focus:outline-none focus:ring-1 focus:ring-[#667052]"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title} ({s.durationMinutes} мин · {formatPrice(s.price)})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-[#77776B]">
                        Специалист
                      </label>
                      <select
                        value={manualSpecialistId}
                        onChange={(e) => setManualSpecialistId(e.target.value)}
                        className="w-full h-11 rounded-xl border border-[#E5E0D5] bg-[#FFFCF6] px-3 text-xs text-[#292A23] focus:outline-none focus:ring-1 focus:ring-[#667052]"
                      >
                        <option value="any">Любой свободный мастер</option>
                        {specialists.map((sp) => (
                          <option key={sp.id} value={sp.id}>
                            {sp.name} ({sp.role})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium uppercase tracking-wider text-[#77776B]">
                          Дата
                        </label>
                        <Input
                          type="date"
                          value={manualDateIso}
                          onChange={(e) => setManualDateIso(e.target.value)}
                          className="h-11 text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium uppercase tracking-wider text-[#77776B]">
                          Время
                        </label>
                        <Input
                          type="text"
                          placeholder="14:00"
                          value={manualTime}
                          onChange={(e) => setManualTime(e.target.value)}
                          className="h-11 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium uppercase tracking-wider text-[#77776B]">
                          Имя гостя
                        </label>
                        <Input
                          placeholder="Анна"
                          value={manualName}
                          onChange={(e) => setManualName(e.target.value)}
                          className="h-11 text-xs"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium uppercase tracking-wider text-[#77776B]">
                          Телефон гостя
                        </label>
                        <Input
                          placeholder="+7 (___) ___-__-__"
                          value={manualPhone}
                          onChange={(e) =>
                            setManualPhone(formatRussianPhoneInput(e.target.value))
                          }
                          className="h-11 text-xs font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-[#77776B]">
                        Комментарий или пожелания
                      </label>
                      <Input
                        placeholder="Например: запись по рекомендации подруги"
                        value={manualComment}
                        onChange={(e) => setManualComment(e.target.value)}
                        className="h-11 text-xs"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] font-semibold text-xs mt-2"
                    >
                      Сохранить запись в журнал студии
                    </Button>
                  </form>
                </div>
              )}

              {/* ================= ВКЛАДКА 6: НАСТРОЙКИ, БЕЗОПАСНОСТЬ И ДАННЫЕ ================= */}
              {activeTab === 'settings' && (
                <div className="space-y-5 max-w-xl">
                  {/* ВЫБОР ПРОФИЛЯ СТУДИИ (WHITE-LABEL) */}
                  <div className="rounded-2xl border-2 border-[#667052]/40 bg-[#FFFCF6] p-5 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#667052]/15 text-[#667052]">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-serif text-lg font-medium text-[#292A23]">
                            Профиль бренда студии (White-label)
                          </p>
                          <p className="text-xs text-[#77776B]">
                            Переключайте сайт под конкретного клиента в один клик
                          </p>
                        </div>
                      </div>

                      <span className="hidden sm:inline-block rounded-full bg-[#667052]/15 text-[#4F5B3E] px-2.5 py-0.5 text-xs font-semibold">
                        Активен: {activeBrandPreset.shortName}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {BRAND_PRESETS_LIST.map((preset) => {
                        const isCurrent = preset.id === activeBrandPreset.id;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              const updated = setBrandPreset(preset.id);
                              setActiveBrandPreset(updated);
                            }}
                            className={cn(
                              'p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5',
                              isCurrent
                                ? 'border-[#667052] bg-[#667052]/10 ring-1 ring-[#667052]'
                                : 'border-[#E5E0D5] bg-[#F7F4ED]/60 hover:border-[#C6B99F]'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-serif font-bold text-sm text-[#292A23]">
                                {preset.shortName}
                              </span>
                              <span
                                className="h-3 w-3 rounded-full border border-black/10"
                                style={{ backgroundColor: preset.theme.primary }}
                              />
                            </div>
                            <p className="text-xs font-medium text-[#667052] truncate">
                              {preset.name}
                            </p>
                            <p className="text-[11px] text-[#77776B]">
                              {preset.city} · {preset.id === 'aura' ? 'Терракот' : preset.id === 'nordic' ? 'Шалфей' : 'Олива'}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    <div className="rounded-xl border border-[#E5E0D5] bg-[#F7F4ED] p-3 text-xs space-y-2.5">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                        <span className="text-[#5E5E53] font-medium">
                          Чистая ссылка для клиента:
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => {
                            const url = new URL(window.location.href);
                            url.searchParams.set('brand', activeBrandPreset.id);
                            url.searchParams.delete('demo');
                            url.hash = '';
                            navigator.clipboard.writeText(url.toString());
                            alert(`Чистая ссылка скопирована в буфер обмена!\n\n${url.toString()}\n\nКлиент откроет сайт без каких-либо панелей разработчика.`);
                          }}
                          className="h-8 text-xs bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span>Скопировать чистую ссылку</span>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E5E0D5]">
                        <label
                          htmlFor="toggle-demo-bar"
                          className="text-xs text-[#5E5E53] cursor-pointer"
                        >
                          Отображать плавающую демо-панель на сайте для быстрых тестов
                        </label>
                        <input
                          id="toggle-demo-bar"
                          type="checkbox"
                          checked={showDemoBarOnSite}
                          onChange={(e) => {
                            const val = e.target.checked;
                            setShowDemoBarOnSite(val);
                            if (val) {
                              window.localStorage.setItem('elan_show_demo_bar', 'true');
                            } else {
                              window.localStorage.removeItem('elan_show_demo_bar');
                            }
                            window.location.reload();
                          }}
                          className="h-4 w-4 rounded border-[#C6B99F] text-[#667052] focus:ring-[#667052] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* СМЕНА PIN-КОДА АДМИНИСТРАТОРА */}
                  <div className="rounded-2xl border-2 border-[#667052]/40 bg-[#FFFCF6] p-5 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#667052]/15 text-[#667052]">
                          <Lock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-serif text-lg font-medium text-[#292A23]">
                            Безопасность и смена PIN-кода
                          </p>
                          <p className="text-xs text-[#77776B]">
                            Установите свой персональный PIN для входа в панель управления
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:block text-right">
                        <span className="text-[10px] uppercase tracking-wider text-[#77776B]">
                          Текущий PIN:
                        </span>
                        <p className="font-mono font-bold text-sm text-[#667052]">
                          {getAdminPin()}
                        </p>
                      </div>
                    </div>

                    {pinChangeSuccess && (
                      <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{pinChangeSuccess}</span>
                      </div>
                    )}

                    {pinChangeError && (
                      <div className="p-3 rounded-xl border border-[#B44C3E]/30 bg-[#B44C3E]/10 text-[#8C3327] text-xs font-medium flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0 text-[#B44C3E]" />
                        <span>{pinChangeError}</span>
                      </div>
                    )}

                    <form onSubmit={handleChangePin} className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="font-semibold text-[#292A23]">
                          Текущий PIN-код *
                        </label>
                        <Input
                          type="password"
                          maxLength={8}
                          placeholder="Введите действующий PIN"
                          value={currentPinInput}
                          onChange={(e) => setCurrentPinInput(e.target.value)}
                          className="h-10 text-xs font-mono"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-semibold text-[#292A23]">
                            Новый PIN-код (4–8 знаков) *
                          </label>
                          <Input
                            type="password"
                            maxLength={8}
                            placeholder="Например: 5678"
                            value={newPinInput}
                            onChange={(e) => setNewPinInput(e.target.value)}
                            className="h-10 text-xs font-mono"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-semibold text-[#292A23]">
                            Повторите новый PIN-код *
                          </label>
                          <Input
                            type="password"
                            maxLength={8}
                            placeholder="Повторите ввод"
                            value={confirmPinInput}
                            onChange={(e) => setConfirmPinInput(e.target.value)}
                            className="h-10 text-xs font-mono"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E5E0D5]">
                        <Button
                          type="submit"
                          className="bg-[#667052] hover:bg-[#4F5B3E] text-[#FFFCF6] text-xs font-semibold px-5 h-10 cursor-pointer"
                        >
                          Сохранить новый PIN
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleResetPin}
                          className="text-xs text-[#77776B] hover:text-[#B44C3E] cursor-pointer"
                        >
                          Сбросить на 1234
                        </Button>
                      </div>
                    </form>
                  </div>

                  <div className="rounded-2xl border border-[#E5E0D5] bg-[#FFFCF6] p-5 space-y-3">
                    <p className="font-serif text-lg font-medium text-[#292A23]">
                      Экспорт и резервное копирование
                    </p>
                    <p className="text-xs text-[#5E5E53] leading-relaxed">
                      Выгрузите журнал записей в формате CSV (совместим с Excel, Google Таблицами и Numbers) для финансового учёта или передачи бухгалтеру.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleExportCsv}
                      className="text-xs gap-2"
                    >
                      <Download className="h-4 w-4 text-[#667052]" />
                      <span>Скачать файл CSV (Excel)</span>
                    </Button>
                  </div>

                  <div className="rounded-2xl border border-[#E5E0D5] bg-[#FFFCF6] p-5 space-y-3">
                    <p className="font-serif text-lg font-medium text-[#292A23]">
                      Управление демо-данными
                    </p>
                    <p className="text-xs text-[#5E5E53] leading-relaxed">
                      Если вы хотите очистить тестовые записи или, наоборот, добавить реалистичные примеры для демонстрации студии:
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleSeedDemoBookings}
                        className="text-xs"
                      >
                        Загрузить примеры записей
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (window.confirm('Очистить все записи из журнала?')) {
                            clearAllBookings();
                            setBookings([]);
                            onBookingsUpdated?.();
                          }
                        }}
                        className="text-xs text-[#B44C3E] hover:border-[#B44C3E]"
                      >
                        Очистить все записи
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#E5E0D5] bg-[#F7F4ED] p-4 text-xs text-[#77776B] space-y-1">
                    <p className="font-semibold text-[#292A23]">
                      {studioConfig.brand.name}
                    </p>
                    <p>{studioConfig.contacts.addressLine1}</p>
                    <p>Телефон: {studioConfig.contacts.phoneDisplay}</p>
                    <p>Режим работы: {studioConfig.contacts.hours}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
