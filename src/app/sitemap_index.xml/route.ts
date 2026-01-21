import { NextResponse } from 'next/server';
import { TARGET_LOCATIONS, getCachedSEOServices } from '@/lib/seo-data';

const MAX_URLS_PER_SITEMAP = 40000;

/**
 * Sitemap Index - Lists all sitemap files
 * Access at /sitemap_index.xml
 */
export async function GET() {
    const baseUrl = 'https://www.galeobeauty.com';

    // Calculate number of sitemaps needed
    const services = getCachedSEOServices();
    const totalLocationPages = TARGET_LOCATIONS.length * services.length;
    const numLocationSitemaps = Math.ceil(totalLocationPages / MAX_URLS_PER_SITEMAP);
    const totalSitemaps = numLocationSitemaps + 1; // +1 for static pages sitemap

    // Build sitemap index XML
    const sitemapUrls = [];
    for (let i = 0; i < totalSitemaps; i++) {
        sitemapUrls.push(`
    <sitemap>
        <loc>${baseUrl}/sitemap/${i}.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('')}
</sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
