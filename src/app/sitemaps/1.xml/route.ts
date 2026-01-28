import { NextResponse } from 'next/server';
import { SITEMAP_1_LOCATIONS } from '@/lib/sitemap-config';
import { getAllSEOServices } from '@/lib/seo-data';

const BASE_URL = 'https://www.galeobeauty.com';

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

    // Add location hubs for SITEMAP_1_LOCATIONS
    for (const location of SITEMAP_1_LOCATIONS) {
        entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/locations/${location}`)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }

    // Add location service pages for SITEMAP_1_LOCATIONS
    for (const location of SITEMAP_1_LOCATIONS) {
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
