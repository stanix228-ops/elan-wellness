import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getActiveBrandPreset } from '@/config/brandPresets';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number,
  currency?: string
): string {
  const symbol = currency || getActiveBrandPreset().currencySymbol || '₽';
  return new Intl.NumberFormat('ru-RU').format(price) + ' ' + symbol;
}


