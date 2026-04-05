import { getAllBlogPosts } from './blog-data';
import { getAllSEOServices, isIndexableLocationService } from './seo-data';
import { SITEMAP_0_LOCATIONS, SITEMAP_1_LOCATIONS } from './sitemap-config';
import { SITEMAP_STATIC_PAGES } from './sitemap-static-pages';
import { toAbsoluteUrl } from './site-url';

export const BASE_URL = 'https://www.galeobeauty.com';
export const FALLBACK_IMAGE = `${BASE_URL}/images/logo.png`;
export const SITEMAP_REVALIDATE = 86400;
export const SITEMAP_CHUNK_SIZE = 2000;

const BUILD_DATE = new Date().toISOString();
const blogPosts = getAllBlogPosts();
const services = getAllSEOServices();

export type SitemapSection = '0' | '1';

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
  image?: {
    loc: string;
    title: string;
    caption: string;
  };
};

export function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildSitemapXml(entries: SitemapEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries
    .map((entry) => {
      const image = entry.image
        ? `
    <image:image>
      <image:loc>${escapeXml(entry.image.loc)}</image:loc>
      <image:title>${escapeXml(entry.image.title)}</image:title>
      <image:caption>${escapeXml(entry.image.caption)}</image:caption>
    </image:image>`
        : '';

      return `
  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${image}
  </url>`;
    })
    .join('')}
</urlset>`;
}

export function buildSitemapIndexXml(urls: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map(
      (url) => `
  <sitemap>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
  </sitemap>`
    )
    .join('')}
</sitemapindex>`;
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

function createEntry(
  loc: string,
  priority: number,
  changefreq: string,
  image?: SitemapEntry['image']
): SitemapEntry {
  return {
    loc,
    lastmod: BUILD_DATE,
    changefreq,
    priority,
    image,
  };
}

function walkSitemap0(visitor: (entry: SitemapEntry) => void) {
  for (const page of SITEMAP_STATIC_PAGES) {
    visitor(createEntry(`${BASE_URL}${page.path}`, page.priority, page.changefreq));
  }

  for (const post of blogPosts) {
    visitor({
      loc: `${BASE_URL}/blog/${post.slug}`,
      lastmod: new Date(post.date).toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    });
  }

  for (const service of services) {
    visitor(
      createEntry(`${BASE_URL}/prices/${service.categoryId}/${service.slug}`, 0.85, 'monthly', {
        loc: toAbsoluteUrl(service.image || FALLBACK_IMAGE),
        title: `${service.keyword} at Galeo Beauty`,
        caption: service.imageAlt,
      })
    );
  }

  visitor(createEntry(`${BASE_URL}/locations`, 0.9, 'weekly'));

  for (const location of SITEMAP_0_LOCATIONS) {
    visitor(createEntry(`${BASE_URL}/locations/${location}`, 0.8, 'weekly'));
  }

  for (const location of SITEMAP_0_LOCATIONS) {
    for (const service of services) {
      if (!isIndexableLocationService(location, service.slug)) {
        continue;
      }

      visitor(
        createEntry(`${BASE_URL}/locations/${location}/${service.slug}`, 0.7, 'monthly', {
          loc: toAbsoluteUrl(service.image || FALLBACK_IMAGE),
          title: `${service.keyword} near ${location}`,
          caption: service.imageAlt,
        })
      );
    }
  }
}

function walkSitemap1(visitor: (entry: SitemapEntry) => void) {
  for (const location of SITEMAP_1_LOCATIONS) {
    visitor(createEntry(`${BASE_URL}/locations/${location}`, 0.6, 'weekly'));
  }

  for (const location of SITEMAP_1_LOCATIONS) {
    for (const service of services) {
      if (!isIndexableLocationService(location, service.slug)) {
        continue;
      }

      visitor(createEntry(`${BASE_URL}/locations/${location}/${service.slug}`, 0.5, 'monthly'));
    }
  }
}

function walkSection(section: SitemapSection, visitor: (entry: SitemapEntry) => void) {
  if (section === '0') {
    walkSitemap0(visitor);
    return;
  }

  walkSitemap1(visitor);
}

function countSectionEntries(section: SitemapSection): number {
  let count = 0;

  walkSection(section, () => {
    count += 1;
  });

  return count;
}

export function getSitemapChunkCount(section: SitemapSection): number {
  return Math.max(1, Math.ceil(countSectionEntries(section) / SITEMAP_CHUNK_SIZE));
}

export function getSitemapIndexUrls(section: SitemapSection): string[] {
  return Array.from(
    { length: getSitemapChunkCount(section) },
    (_, index) => `${BASE_URL}/sitemaps/${section}/${index}.xml`
  );
}

export function getSitemapChunkEntries(section: SitemapSection, chunkIndex: number): SitemapEntry[] {
  const start = chunkIndex * SITEMAP_CHUNK_SIZE;
  const end = start + SITEMAP_CHUNK_SIZE;
  const entries: SitemapEntry[] = [];
  let index = 0;

  walkSection(section, (entry) => {
    if (index >= start && index < end) {
      entries.push(entry);
    }

    index += 1;
  });

  return entries;
}

export function getTopLevelSitemapIndexUrls(): string[] {
  return [`${BASE_URL}/sitemaps/0.xml`, `${BASE_URL}/sitemaps/1.xml`];
}
