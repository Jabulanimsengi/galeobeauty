import { NextResponse } from 'next/server';
import { SITEMAP_1_LOCATIONS } from '@/lib/sitemap-config';
import { getAllSEOServices } from '@/lib/seo-data';

const BASE_URL = 'https://www.galeobeauty.com';

// Stable timestamp captured at build/deploy time — avoids lastmod changing on every request
const BUILD_DATE = new Date().toISOString();

function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// SITEMAP 1: Extended Gauteng Coverage
// These pages generate on-demand via ISR (not pre-built)
export async function GET() {
    const services = getAllSEOServices();
    const entries: string[] = [];

    // Add location hubs for SITEMAP_1_LOCATIONS
    for (const location of SITEMAP_1_LOCATIONS) {
        entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/locations/${location}`)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }

    // Add location service pages for SITEMAP_1_LOCATIONS
    for (const location of SITEMAP_1_LOCATIONS) {
        for (const service of services) {
            entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/locations/${location}/${service.slug}`)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
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
