/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        elan: {
          bg: 'var(--elan-bg)',
          surface: 'var(--elan-surface)',
          primary: 'var(--elan-primary)',
          'primary-hover': 'var(--elan-primary-hover)',
          text: 'var(--elan-text)',
          muted: 'var(--elan-text-muted)',
          subtle: 'var(--elan-text-subtle)',
          border: 'var(--elan-border)',
          accent: 'var(--elan-accent)',
          'accent-soft': 'var(--elan-accent-soft)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
        'accordion-up': 'accordion-up 0.24s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
