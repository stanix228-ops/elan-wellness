/**
 * Централизованные дизайн-токены ÉLAN Wellness
 * Используются для темизации, проверки контрастности и быстрой адаптации под бренд клиента.
 */

export const designTokens = {
  colors: {
    background: '#F7F4ED', // Тёплый кремовый
    surface: '#FFFCF6', // Молочный
    primary: '#667052', // Оливковый
    primaryHover: '#4F5B3E', // Глубокий оливковый
    textPrimary: '#292A23', // Мягкий почти чёрный
    textSecondary: '#77776B', // Приглушённый серо-оливковый
    border: '#E5E0D5', // Тонкие тёплые границы
    accent: '#C6B99F', // Песочный
  },
  typography: {
    headingFont: 'Cormorant Garamond, Georgia, serif',
    bodyFont: 'Manrope, system-ui, -apple-system, sans-serif',
  },
  motion: {
    easingCalm: 'cubic-bezier(0.22, 1, 0.36, 1)',
    durationFast: '200ms',
    durationBase: '350ms',
    durationSlow: '700ms',
  },
  layout: {
    maxContainerWidth: '1360px',
    sectionSpacingDesktop: '8rem',
    sectionSpacingMobile: '5rem',
  },
} as const;
