import { studioConfig, type StudioSpecialist } from './studioConfig';

export type SpecialistProfile = StudioSpecialist;

export const SPECIALISTS_CATALOG: SpecialistProfile[] = studioConfig.specialists.items;
