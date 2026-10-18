import {
  studioConfig,
  type StudioGalleryItem,
  type StudioCertificateTier,
  type StudioTestimonial,
  type StudioFaqItem,
} from './studioConfig';

export type SpaceGalleryItem = StudioGalleryItem;
export type GiftCertificateTier = StudioCertificateTier;
export type DemoTestimonial = StudioTestimonial;
export type FaqItem = StudioFaqItem;

export const BRAND_CONFIG = {
  name: studioConfig.brand.name,
  shortName: studioConfig.brand.shortName,
  tagline: studioConfig.brand.tagline,
  city: studioConfig.brand.city,
  isDemoNotice: studioConfig.brand.isDemoNotice,
  navigation: studioConfig.navigation,
  hero: studioConfig.hero,
  philosophy: studioConfig.philosophy,
  spaceGallery: studioConfig.spaceGallery.items,
  giftCertificates: studioConfig.giftCertificates,
  testimonials: studioConfig.testimonials,
  faq: studioConfig.faq.items,
  contacts: studioConfig.contacts,
};
