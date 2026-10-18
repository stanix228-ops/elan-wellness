import { studioConfig } from './studioConfig';
import { getServicesCatalog, type WellnessService } from '@/lib/catalogStore';

export type ServiceCategory = 'all' | 'classic' | 'relax' | 'recovery' | 'rituals';

export type { WellnessService };
export { getServicesCatalog };

export const SERVICE_CATEGORIES: { id: ServiceCategory; label: string }[] =
  studioConfig.services.categories as { id: ServiceCategory; label: string }[];

export const SERVICES_CATALOG: WellnessService[] = studioConfig.services.items;
