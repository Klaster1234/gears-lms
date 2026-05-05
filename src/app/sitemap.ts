import type { MetadataRoute } from 'next';

const BASE_URL = 'https://gears.zieloneslaskie.pl';
const LOCALES = ['pl', 'en', 'sk'] as const;
const STATIC_PATHS = ['', '/about', '/modules', '/progress', '/certificate'] as const;
const MODULE_SLUGS = [
  'intro-5r',
  'waste-zero-waste',
  'composting',
  'sustainable-shopping',
  'circular-economy',
  'fast-slow-fashion',
  'green-consumption',
  'energy-efficiency',
  'community-action',
  'eco-anxiety',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : 0.7,
      });
    }
    for (const slug of MODULE_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/modules/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
