import { MetadataRoute } from 'next';
import { serviceCategories } from '@/lib/services-data';
import { TARGET_LOCATIONS, PRIORITY_LOCATIONS, getCachedSEOServices } from '@/lib/seo-data';
import { getAllBlogPosts } from '@/lib/blog-data';

// Maximum URLs per sitemap (Google's limit is 50,000, using 40K for safety)
const MAX_URLS_PER_SITEMAP = 40000;

// Pre-calculate total pages for sitemap chunking
const services = getCachedSEOServices();
const totalLocationPages = TARGET_LOCATIONS.length * services.length;
const numLocationSitemaps = Math.ceil(totalLocationPages / MAX_URLS_PER_SITEMAP);

/**
 * Generate sitemap IDs for Next.js sitemap index
 * Creates /sitemap/0.xml, /sitemap/1.xml, etc.
 */
export async function generateSitemaps() {
    // Sitemap 0: Static pages, blog, categories, services
    // Sitemap 1+: Location/service pages in chunks
    const sitemaps: { id: number }[] = [];

    for (let i = 0; i <= numLocationSitemaps; i++) {
        sitemaps.push({ id: i });
    }

    return sitemaps;
}

/**
 * Generate sitemap entries for a specific sitemap ID
 * Next.js 16 passes id as Promise<string>
 */
export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
    const idStr = await props.id;
    const id = parseInt(idStr, 10);
    const baseUrl = 'https://www.galeobeauty.com';

    // Sitemap 0: Static pages, blog, categories
    if (id === 0) {
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

        // Individual service landing pages
        const serviceSlugPages = [
            'microblading',
            'fat-freezing-treatment',
            'lash-extensions',
            'lip-fillers',
            'brazilian-wax',
            'dermalogica-facial',
            'nail-art',
            'massage-therapy',
        ];
        const servicePages: MetadataRoute.Sitemap = serviceSlugPages.map((slug) => ({
            url: `${baseUrl}/services/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.85,
        }));

        return [...staticPages, ...blogPages, ...categoryPages, ...servicePages];
    }

    // Sitemap 1+: Location/service pages in chunks
    const allLocationPages: { location: string; service: string; isPriority: boolean }[] = [];

    for (const location of TARGET_LOCATIONS) {
        const isPriority = PRIORITY_LOCATIONS.includes(location.slug);
        for (const service of services) {
            allLocationPages.push({
                location: location.slug,
                service: service.slug,
                isPriority,
            });
        }
    }

    // Calculate chunk boundaries (id=1 is first location chunk)
    const chunkIndex = id - 1;
    const startIndex = chunkIndex * MAX_URLS_PER_SITEMAP;
    const endIndex = Math.min(startIndex + MAX_URLS_PER_SITEMAP, allLocationPages.length);

    // If chunk is out of range, return empty
    if (startIndex >= allLocationPages.length) {
        return [];
    }

    const chunkPages = allLocationPages.slice(startIndex, endIndex);

    return chunkPages.map((page) => ({
        url: `${baseUrl}/locations/${page.location}/${page.service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: page.isPriority ? 0.8 : 0.6,
    }));
}
