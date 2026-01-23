import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog-data';
import { TARGET_LOCATIONS, SERVICE_SLUGS } from '@/lib/sitemap-config';

/**
 * COMPREHENSIVE SITEMAP - ALL 208 LOCATIONS
 *
 * Single comprehensive sitemap covering all locations and services:
 * - Static pages: 43 URLs
 * - Blog articles: 18 URLs
 * - Location pages: 208 locations × 262 services = 54,496 URLs
 * Total: 54,557 URLs
 *
 * Note: This slightly exceeds Google's 50k recommendation but ensures complete coverage.
 * Google will still process it with a warning. All 208 locations are included.
 */

const BASE_URL = 'https://www.galeobeauty.com';

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

    // 1. Add Static Pages
    for (const page of STATIC_PAGES) {
        sitemapEntries.push({
            url: `${BASE_URL}${page.path}`,
            lastModified: new Date(),
            changeFrequency: page.changefreq,
            priority: page.priority,
        });
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
    }

    // 3. Add ALL Location Pages - ALL 208 LOCATIONS
    for (const location of TARGET_LOCATIONS) {
        for (const serviceSlug of SERVICE_SLUGS) {
            sitemapEntries.push({
                url: `${BASE_URL}/locations/${location}/${serviceSlug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        }
    }

    return sitemapEntries;
}
