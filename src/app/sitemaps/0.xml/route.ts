import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog-data';
import { getAllSEOServices, PRIORITY_LOCATIONS } from '@/lib/seo-data';

const BASE_URL = 'https://www.galeobeauty.com';

const STATIC_PAGES = [
    { path: '', priority: 1.0, changefreq: 'weekly' },
    { path: '/prices', priority: 0.9, changefreq: 'weekly' },
    { path: '/specials', priority: 0.8, changefreq: 'weekly' },
    { path: '/gallery', priority: 0.7, changefreq: 'monthly' },
    { path: '/about', priority: 0.6, changefreq: 'monthly' },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog', priority: 0.85, changefreq: 'weekly' },
    { path: '/careers', priority: 0.5, changefreq: 'monthly' },
    // SEO Landing Pages (High Priority)
    { path: '/body-contouring', priority: 0.9, changefreq: 'monthly' },
    { path: '/anti-aging', priority: 0.9, changefreq: 'monthly' },
    { path: '/permanent-makeup', priority: 0.9, changefreq: 'monthly' },
    { path: '/medical-spa', priority: 0.9, changefreq: 'monthly' },
    { path: '/bridal-beauty', priority: 0.9, changefreq: 'monthly' },
    { path: '/laser-hair-removal', priority: 0.9, changefreq: 'monthly' },
    { path: '/prices/hart-aesthetics', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/fat-freezing', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/slimming', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/dermalogica', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/ipl', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/makeup', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/medical', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/permanent-makeup', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/pro-skin', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/qms-facial', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/sunbed', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/waxing', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/hair', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/nails', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/lashes', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/hair-extensions', priority: 0.85, changefreq: 'weekly' },
    // Note: All 262 service pages are added dynamically below
];

function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export async function GET() {
    const services = getAllSEOServices();
    const entries: string[] = [];

    // Add static pages
    for (const page of STATIC_PAGES) {
        entries.push(`
  <url>
    <loc>${escapeXml(BASE_URL + page.path)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
    }

    // Add blog posts
    const blogPosts = getAllBlogPosts();
    for (const post of blogPosts) {
        entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/blog/${post.slug}`)}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }

    // Add ALL service pages (262 total) - targets generic keywords like "gel nails", "microblading"
    for (const service of services) {
        entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/services/${service.slug}`)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`);
    }

    // Add location index
    entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/locations`)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);

    // Add location hubs for PRIORITY_LOCATIONS only (pages that are actually pre-built)
    for (const location of PRIORITY_LOCATIONS) {
        entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/locations/${location}`)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }

    // Add location service pages for PRIORITY_LOCATIONS only (avoid 404s)
    for (const location of PRIORITY_LOCATIONS) {
        for (const service of services) {
            entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/locations/${location}/${service.slug}`)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
        }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join('')}
</urlset>`;

    return new NextResponse(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
