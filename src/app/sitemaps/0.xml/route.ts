import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog-data';
import { getAllSEOServices } from '@/lib/seo-data';
import { SITEMAP_0_LOCATIONS } from '@/lib/sitemap-config';

const BASE_URL = 'https://www.galeobeauty.com';

// Stable timestamp captured at build/deploy time — avoids lastmod changing on every request
const BUILD_DATE = new Date().toISOString();

// Stable timestamp captured at build/deploy time — avoids lastmod changing on every request
// BUILD_DATE is already computed above


const STATIC_PAGES = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: '/prices', priority: 0.9, changefreq: 'weekly' },
  { path: '/specials', priority: 0.8, changefreq: 'weekly' },
  { path: '/gallery', priority: 0.7, changefreq: 'monthly' },
  { path: '/about', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/blog', priority: 0.85, changefreq: 'weekly' },
  { path: '/careers', priority: 0.5, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
  // Note: Root-level service pages (/laser-hair-removal, /anti-aging, /body-contouring,
  //       /medical-spa, /permanent-makeup, /bridal-beauty, /matric-dance) have been
  //       permanently redirected to their /prices/ equivalents and removed from sitemap.
  { path: '/prices/hart-aesthetics', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/fat-freezing', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/slimming', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/massages', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/dermalogica', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/ipl', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/makeup', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/medical', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/permanent-makeup', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/qms', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/sunbed', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/waxing', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/hair', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/nails', priority: 0.85, changefreq: 'weekly' },
  { path: '/prices/lashes-brows', priority: 0.85, changefreq: 'weekly' },
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
    <lastmod>${BUILD_DATE}</lastmod>
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
  // Canonical URL: /prices/[category]/[service]
  for (const service of services) {
    entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/prices/${service.categoryId}/${service.slug}`)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
    <image:image>
      <image:loc>https://www.galeobeauty.com/images/og-image.jpg</image:loc>
      <image:title>${escapeXml(service.keyword + " at Galeo Beauty")}</image:title>
    </image:image>
  </url>`);
  }

  // Add location index
  entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/locations`)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);

  // Add location hubs for all SITEMAP_0_LOCATIONS (136 locations)
  for (const location of SITEMAP_0_LOCATIONS) {
    // EXCLUSION STRATEGY: Exclude home base from sitemap as pages are disabled
    if (location === 'hartbeespoort' || location === 'harties') continue;

    entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/locations/${location}`)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  // Add location service pages for all SITEMAP_0_LOCATIONS (excluding low-value variants)
  for (const location of SITEMAP_0_LOCATIONS) {
    // EXCLUSION STRATEGY: Exclude home base from sitemap as pages are disabled
    if (location === 'hartbeespoort' || location === 'harties') continue;

    for (const service of services) {
      entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/locations/${location}/${service.slug}`)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries.join('')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
