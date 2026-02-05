import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.galeobeauty.com';
const BUILD_DATE = new Date().toISOString();

export async function GET() {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemaps/0.xml</loc>
    <lastmod>${BUILD_DATE}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemaps/1.xml</loc>
    <lastmod>${BUILD_DATE}</lastmod>
  </sitemap>
</sitemapindex>`;

    return new NextResponse(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
