import { studioConfig } from './studioConfig';
import { getSpecialistsCatalog, type SpecialistProfile } from '@/lib/catalogStore';

export type { SpecialistProfile };
export { getSpecialistsCatalog };

export const SPECIALISTS_CATALOG: SpecialistProfile[] = studioConfig.specialists.items;
