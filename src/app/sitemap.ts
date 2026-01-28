import { MetadataRoute } from 'next';

/**
 * MULTI-SITEMAP INDEX
 *
 * This sitemap index references two separate sitemaps:
 *
 * SITEMAP 0: Primary Local & Northwest Areas (36,769 URLs)
 * - Hartbeespoort/Harties and all estates
 * - Pretoria, Centurion, and surrounding areas
 * - Northwest Province (Brits, Rustenburg, Potchefstroom, etc.)
 * - All static pages, blog posts, and location index
 *
 * SITEMAP 1: Extended Gauteng Coverage (27,540 URLs)
 * - Johannesburg and all suburbs
 * - East Rand, West Rand
 * - Midrand, Kempton Park
 * - Vaal Triangle
 *
 * Total: 64,309 URLs across 2 sitemaps
 * Both sitemaps are well under Google's 50,000 URL limit per sitemap
 */

const BASE_URL = 'https://www.galeobeauty.com';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${BASE_URL}/sitemap/0.xml`,
            lastModified: new Date(),
        },
        {
            url: `${BASE_URL}/sitemap/1.xml`,
            lastModified: new Date(),
        },
    ];
}
