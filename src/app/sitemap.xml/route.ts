import { BASE_URL, buildSitemapIndexXml, SITEMAP_REVALIDATE, xmlResponse } from '@/lib/sitemap-helpers';

export const dynamic = 'force-static';
export const revalidate = SITEMAP_REVALIDATE;

export async function GET() {
  return xmlResponse(
    buildSitemapIndexXml([
      `${BASE_URL}/sitemaps/0.xml`,
      `${BASE_URL}/sitemaps/1.xml`,
    ])
  );
}
