import { TARGET_LOCATIONS as SEOTargets, SEOLocation } from "./seo-data";

// Regions to group into Sitemap 0 (Primary Local & NW & Pretoria)
const SITEMAP_0_REGIONS = [
    "North West",
    "Hartbeespoort",
    "Pretoria",
    "Centurion",
];

// Combine into arrays based on region
export const SITEMAP_0_LOCATIONS: string[] = SEOTargets
    .filter((loc: SEOLocation) => SITEMAP_0_REGIONS.includes(loc.region) || (loc.slug === "pretoria"))
    .map((loc: SEOLocation) => loc.slug);

export const SITEMAP_1_LOCATIONS: string[] = SEOTargets
    .filter((loc: SEOLocation) => !SITEMAP_0_LOCATIONS.includes(loc.slug))
    .map((loc: SEOLocation) => loc.slug);

// Combined list for backward compatibility
export const TARGET_LOCATIONS: string[] = SEOTargets.map(loc => loc.slug);

// Re-export services just in case, though it's better to use getAllSEOServices everywhere
import { getAllSEOServices } from "./seo-data";
export const SERVICE_SLUGS = getAllSEOServices().map(s => s.slug);
