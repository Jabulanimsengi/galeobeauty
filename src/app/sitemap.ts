import { MetadataRoute } from 'next';
import { serviceCategories } from '@/lib/services-data';
import { TARGET_LOCATIONS, PRIORITY_LOCATIONS, getCachedSEOServices } from '@/lib/seo-data';
import { getAllBlogPosts } from '@/lib/blog-data';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://galeobeauty.com';

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
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
    ];

    // Blog article pages
    const blogPosts = getAllBlogPosts();
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Dynamic service category pages
    const categoryPages: MetadataRoute.Sitemap = serviceCategories.map((category) => ({
        url: `${baseUrl}/prices/${category.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // SEO Location + Service pages - Include ALL combinations for Google to crawl
    // Priority locations get higher priority score
    const seoPages: MetadataRoute.Sitemap = [];
    const services = getCachedSEOServices();

    for (const location of TARGET_LOCATIONS) {
        const isPriority = PRIORITY_LOCATIONS.includes(location.slug);

        for (const service of services) {
            seoPages.push({
                url: `${baseUrl}/locations/${location.slug}/${service.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: isPriority ? 0.8 : 0.6,
            });
        }
    }

    return [...staticPages, ...blogPages, ...categoryPages, ...seoPages];
}

