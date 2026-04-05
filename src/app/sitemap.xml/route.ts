import { BASE_URL, buildSitemapIndexXml, xmlResponse } from '@/lib/sitemap-helpers';

export async function GET() {
  return xmlResponse(
    buildSitemapIndexXml([
      `${BASE_URL}/sitemaps/0.xml`,
      `${BASE_URL}/sitemaps/1.xml`,
    ])
  );
}
