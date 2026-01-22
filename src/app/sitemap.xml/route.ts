import { NextResponse } from 'next/server';
import { TARGET_LOCATIONS, getCachedSEOServices } from '@/lib/seo-data';

// Maximum URLs per sitemap
const MAX_URLS_PER_SITEMAP = 40000;

export async function GET() {
    const baseUrl = 'https://www.galeobeauty.com';

    // Calculate number of location sitemaps needed
    const services = getCachedSEOServices();
    const totalLocationPages = TARGET_LOCATIONS.length * services.length;
    const numLocationSitemaps = Math.ceil(totalLocationPages / MAX_URLS_PER_SITEMAP);

    // Total sitemaps: 1 (static/blog) + location sitemaps
    const totalSitemaps = 1 + numLocationSitemaps;

    // Build sitemap index XML
    const sitemapEntries = Array.from({ length: totalSitemaps }, (_, i) => `
    <sitemap>
        <loc>${baseUrl}/sitemap/${i}.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
