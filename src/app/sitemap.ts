import { MetadataRoute } from 'next';

/**
 * SITEMAP INDEX
 *
 * This file serves as the sitemap index that points to our two main sitemaps:
 *
 * SITEMAP 0: Primary Local & Northwest Areas (36,769 URLs)
 * - /sitemap/0.xml
 * - Hartbeespoort/Harties and all estates
 * - Pretoria, Centurion, and surrounding areas
 * - Northwest Province (Brits, Rustenburg, Potchefstroom, etc.)
 * - All static pages, blog posts, and location index
 *
 * SITEMAP 1: Extended Gauteng Coverage (27,540 URLs)
 * - /sitemap/1.xml
 * - Johannesburg and all suburbs
 * - East Rand, West Rand
 * - Midrand, Kempton Park
 * - Vaal Triangle
 *
 * Total: 64,309 URLs across 2 sitemaps
 * Both sitemaps are well under Google's 50,000 URL limit per sitemap
 *
 * Access URLs:
 * - /sitemap.xml (this file - sitemap index)
 * - /sitemap/0.xml (sitemap 0)
 * - /sitemap/1.xml (sitemap 1)
 */

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.galeobeauty.com/sitemap/0.xml',
            lastModified: new Date(),
        },
        {
            url: 'https://www.galeobeauty.com/sitemap/1.xml',
            lastModified: new Date(),
        },
    ];
}
