import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog-data';
import { SITEMAP_0_LOCATIONS, SITEMAP_1_LOCATIONS } from '@/lib/sitemap-config';
import { getAllSEOServices } from '@/lib/seo-data';

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

/**
 * Generate XML sitemap for a specific sitemap ID
 */
function generateSitemapXML(locations: string[], includeStatic: boolean = false): string {
    const now = new Date().toISOString();
    const services = getAllSEOServices();
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages only for sitemap 0
    if (includeStatic) {
        for (const page of STATIC_PAGES) {
            xml += '  <url>\n';
            xml += `    <loc>${BASE_URL}${page.path}</loc>\n`;
            xml += `    <lastmod>${now}</lastmod>\n`;
            xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;
            xml += '  </url>\n';
        }

        // Add blog posts only for sitemap 0
        const blogPosts = getAllBlogPosts();
        for (const post of blogPosts) {
            xml += '  <url>\n';
            xml += `    <loc>${BASE_URL}/blog/${post.slug}</loc>\n`;
            xml += `    <lastmod>${new Date(post.date).toISOString()}</lastmod>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`;
            xml += `    <priority>0.8</priority>\n`;
            xml += '  </url>\n';
        }

        // Add location index only for sitemap 0
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}/locations</loc>\n`;
        xml += `    <lastmod>${now}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.9</priority>\n`;
        xml += '  </url>\n';
    }

    // Add location hub pages
    for (const location of locations) {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}/locations/${location}</loc>\n`;
        xml += `    <lastmod>${now}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += '  </url>\n';
    }

    // Add location service pages
    for (const location of locations) {
        for (const service of services) {
            xml += '  <url>\n';
            xml += `    <loc>${BASE_URL}/locations/${location}/${service.slug}</loc>\n`;
            xml += `    <lastmod>${now}</lastmod>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`;
            xml += `    <priority>0.7</priority>\n`;
            xml += '  </url>\n';
        }
    }

    xml += '</urlset>';
    return xml;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    let xml: string;

    switch (id) {
        case '0':
            // Sitemap 0: Primary Local & Northwest Areas
            xml = generateSitemapXML(SITEMAP_0_LOCATIONS, true);
            break;
        case '1':
            // Sitemap 1: Extended Gauteng Coverage
            xml = generateSitemapXML(SITEMAP_1_LOCATIONS, false);
            break;
        default:
            return new NextResponse('Sitemap not found', { status: 404 });
    }

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
