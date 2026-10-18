import { getActiveBrandPreset, type BrandPreset } from './brandPresets';
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

export function getDynamicBrandConfig() {
  const preset: BrandPreset = getActiveBrandPreset();
  return {
    name: preset.name,
    shortName: preset.shortName,
    tagline: preset.tagline,
    city: preset.city,
    currency: preset.currency,
    currencySymbol: preset.currencySymbol,
    isDemoNotice: studioConfig.brand.isDemoNotice,
    navigation: studioConfig.navigation,
    hero: {
      ...studioConfig.hero,
      eyebrow: preset.eyebrow,
      titleLine1: preset.heroTitleLine1,
      titleLine2: preset.heroTitleLine2,
      subtitle: preset.heroSubtitle,
      image: preset.heroImage,
    },
    philosophy: studioConfig.philosophy,
    spaceGallery: studioConfig.spaceGallery.items,
    giftCertificates: studioConfig.giftCertificates,
    testimonials: studioConfig.testimonials,
    faq: studioConfig.faq.items,
    contacts: {
      ...studioConfig.contacts,
      phone: preset.phone,
      phoneDisplay: preset.phoneDisplay,
      phoneHref: `tel:${preset.phone}`,
      address: preset.address,
      addressLine1: preset.address,
      hours: preset.workingHours,
      workingHours: preset.workingHours,
    },
  };
}

export type DynamicBrandConfig = ReturnType<typeof getDynamicBrandConfig>;

export const BRAND_CONFIG: DynamicBrandConfig = new Proxy({} as DynamicBrandConfig, {
  get(_target, prop) {
    const dynamic = getDynamicBrandConfig();
    return (dynamic as any)[prop];
  },
});
