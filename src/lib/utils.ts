import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { studioConfig } from '@/config/studioConfig';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number,
  currency: string = studioConfig.brand.currencySymbol
): string {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency;
}

