import { NextResponse } from 'next/server';

/**
 * Sitemap Index - Lists all sitemap files
 * Access at /sitemap.xml
 */

const STATIC_PAGES_COUNT = 32;
const LOCATIONS_COUNT = 185;
const SERVICES_COUNT = 216;
const TOTAL_URLS = STATIC_PAGES_COUNT + (LOCATIONS_COUNT * SERVICES_COUNT);
const MAX_URLS_PER_SITEMAP = 50000;
const NUM_SITEMAPS = Math.ceil(TOTAL_URLS / MAX_URLS_PER_SITEMAP);

export async function GET() {
    const baseUrl = 'https://www.galeobeauty.com';
    const lastmod = new Date().toISOString();

    const sitemapUrls: string[] = [];

    for (let i = 0; i < NUM_SITEMAPS; i++) {
        sitemapUrls.push(`
    <sitemap>
        <loc>${baseUrl}/sitemap-seo/${i}</loc>
        <lastmod>${lastmod}</lastmod>
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
