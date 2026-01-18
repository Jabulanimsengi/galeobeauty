import { MetadataRoute } from 'next';
import { serviceCategories } from '@/lib/services-data';
import { TARGET_LOCATIONS, ALL_SEO_SERVICES } from '@/lib/seo-data';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://galeobeauty.co.za';

    // Base pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/prices`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/specials`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/careers`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // Dynamic service category pages
    const categoryPages: MetadataRoute.Sitemap = serviceCategories.map((category) => ({
        url: `${baseUrl}/prices/${category.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // SEO Location + Service pages
    const seoPages: MetadataRoute.Sitemap = [];
    for (const location of TARGET_LOCATIONS) {
        for (const service of ALL_SEO_SERVICES) {
            seoPages.push({
                url: `${baseUrl}/locations/${location.slug}/${service.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            });
        }
    }

    return [...staticPages, ...categoryPages, ...seoPages];
}
