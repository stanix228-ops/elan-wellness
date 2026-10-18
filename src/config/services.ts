import { studioConfig, type StudioService } from './studioConfig';

export type ServiceCategory = 'all' | 'classic' | 'relax' | 'recovery' | 'rituals';

export type WellnessService = StudioService;

export const SERVICE_CATEGORIES: { id: ServiceCategory; label: string }[] =
  studioConfig.services.categories as { id: ServiceCategory; label: string }[];

export const SERVICES_CATALOG: WellnessService[] = studioConfig.services.items;
