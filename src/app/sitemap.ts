import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.galeobeauty.com';

export default function sitemap(): MetadataRoute.Sitemap {
    // This file generates /sitemap.xml as a sitemap index
    // pointing to /sitemaps/0.xml and /sitemaps/1.xml
    return [
        {
            url: `${BASE_URL}/sitemaps/0.xml`,
            lastModified: new Date(),
        },
        {
            url: `${BASE_URL}/sitemaps/1.xml`,
            lastModified: new Date(),
        },
    ];
}
