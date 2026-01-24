import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog-data';
import { TARGET_LOCATIONS } from '@/lib/sitemap-config';
import { getAllSEOServices } from '@/lib/seo-data';

/**
 * OPTIMIZED SITEMAP - 50,000 URLs (Google's limit)
 *
 * Distribution:
 * - Static pages: 32 URLs
 * - Blog articles: 16 URLs
 * - Location pages: 49,952 URLs (203 locations × 246 services)
 * Total: 50,000 URLs exactly
 *
 * Note: This includes 203 out of 208 locations. Remaining 5 locations
 * (lanseria, kagiso, mohlakeng, khutsong, bekkersdal) will be discovered via crawling.
 */

const BASE_URL = 'https://www.galeobeauty.com';
const MAX_URLS = 50000;

const STATIC_PAGES = [
    { path: '', priority: 1.0, changefreq: 'weekly' as const },
    { path: '/prices', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/specials', priority: 0.8, changefreq: 'weekly' as const },
    { path: '/gallery', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/about', priority: 0.6, changefreq: 'monthly' as const },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/blog', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/careers', priority: 0.5, changefreq: 'monthly' as const },
    { path: '/prices/hart-aesthetics', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/fat-freezing', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/slimming', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/dermalogica', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/ipl', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/makeup', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/medical', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/permanent-makeup', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/pro-skin', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/qms-facial', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/sunbed', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/waxing', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/hair', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/nails', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/lashes', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/prices/hair-extensions', priority: 0.85, changefreq: 'weekly' as const },
    { path: '/services/microblading', priority: 0.85, changefreq: 'monthly' as const },
    { path: '/services/fat-freezing-treatment', priority: 0.85, changefreq: 'monthly' as const },
    { path: '/services/lash-extensions', priority: 0.85, changefreq: 'monthly' as const },
    { path: '/services/lip-fillers', priority: 0.85, changefreq: 'monthly' as const },
    { path: '/services/brazilian-wax', priority: 0.85, changefreq: 'monthly' as const },
    { path: '/services/dermalogica-facial', priority: 0.85, changefreq: 'monthly' as const },
    { path: '/services/nail-art', priority: 0.85, changefreq: 'monthly' as const },
    { path: '/services/massage-therapy', priority: 0.85, changefreq: 'monthly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapEntries: MetadataRoute.Sitemap = [];
    let urlCount = 0;

    // 1. Add Static Pages
    for (const page of STATIC_PAGES) {
        sitemapEntries.push({
            url: `${BASE_URL}${page.path}`,
            lastModified: new Date(),
            changeFrequency: page.changefreq,
            priority: page.priority,
        });
        urlCount++;
    }

    // 2. Add Blog Articles
    const blogPosts = getAllBlogPosts();
    for (const post of blogPosts) {
        sitemapEntries.push({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly',
            priority: 0.8,
        });
        urlCount++;
    }

    // 3. Add Location Pages - up to 50,000 URL limit
    // Get actual services from services-data.ts to ensure valid URLs
    const services = getAllSEOServices();

    for (const location of TARGET_LOCATIONS) {
        for (const service of services) {
            if (urlCount >= MAX_URLS) {
                break;
            }

            sitemapEntries.push({
                url: `${BASE_URL}/locations/${location}/${service.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
            urlCount++;
        }

        if (urlCount >= MAX_URLS) {
            break;
        }
    }

    return sitemapEntries;
}
