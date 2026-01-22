import { NextResponse } from 'next/server';

/**
 * Sitemap Index - Lists all sitemap files
 * Access at /sitemap.xml
 * 
 * This generates a sitemap index pointing to individual sitemaps.
 * Sitemap 0 contains static pages, Sitemap 1+ contain location/service combos.
 */
export async function GET() {
    const baseUrl = 'https://www.galeobeauty.com';

    // We have 2 sitemaps: 
    // - sitemap/0.xml: static pages, blog, categories, services
    // - sitemap/1.xml: location/service pages (all 60K+ combinations)
    const totalSitemaps = 2;

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
