import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog-data';
import { getAllSEOServices } from '@/lib/seo-data';
import { SITEMAP_0_LOCATIONS } from '@/lib/sitemap-config';
import { SITEMAP_STATIC_PAGES } from '@/lib/sitemap-static-pages';
import { toAbsoluteUrl } from '@/lib/site-url';

const BASE_URL = 'https://www.galeobeauty.com';
const FALLBACK_IMAGE = 'https://www.galeobeauty.com/images/logo.png';

// Stable timestamp captured at build/deploy time — avoids lastmod changing on every request
const BUILD_DATE = new Date().toISOString();

// Stable timestamp captured at build/deploy time — avoids lastmod changing on every request
// BUILD_DATE is already computed above


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
  for (const page of SITEMAP_STATIC_PAGES) {
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
    const serviceImageUrl = toAbsoluteUrl(service.image || FALLBACK_IMAGE);
    entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/prices/${service.categoryId}/${service.slug}`)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
    <image:image>
      <image:loc>${escapeXml(serviceImageUrl)}</image:loc>
      <image:title>${escapeXml(service.keyword + " at Galeo Beauty")}</image:title>
      <image:caption>${escapeXml(service.imageAlt)}</image:caption>
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

  // Add location hubs for all SITEMAP_0_LOCATIONS
  for (const location of SITEMAP_0_LOCATIONS) {
    entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/locations/${location}`)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  // Add location service pages for all SITEMAP_0_LOCATIONS
  for (const location of SITEMAP_0_LOCATIONS) {
    for (const service of services) {
      const serviceImageUrl = toAbsoluteUrl(service.image || FALLBACK_IMAGE);
      entries.push(`
  <url>
    <loc>${escapeXml(`${BASE_URL}/locations/${location}/${service.slug}`)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${escapeXml(serviceImageUrl)}</image:loc>
      <image:title>${escapeXml(`${service.keyword} near ${location}`)}</image:title>
      <image:caption>${escapeXml(service.imageAlt)}</image:caption>
    </image:image>
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
