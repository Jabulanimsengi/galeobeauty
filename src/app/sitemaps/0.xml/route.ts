import {
  buildSitemapIndexXml,
  getSitemapIndexUrls,
  SITEMAP_REVALIDATE,
  xmlResponse,
} from '@/lib/sitemap-helpers';

export const dynamic = 'force-static';
export const revalidate = SITEMAP_REVALIDATE;

export async function GET() {
  return xmlResponse(buildSitemapIndexXml(getSitemapIndexUrls('0')));
}
