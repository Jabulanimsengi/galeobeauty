import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.galeobeauty.com';

export default function sitemap(): MetadataRoute.Sitemap {
    // This file generates /sitemap.xml as a sitemap index
    // Only including sitemap 0 with priority locations to avoid 404s
    return [
        {
            url: `${BASE_URL}/sitemaps/0.xml`,
            lastModified: new Date(),
        },
        // Sitemap 1 removed: Only pre-built priority location pages are included
        // to prevent Google from crawling 404 pages
    ];
}
