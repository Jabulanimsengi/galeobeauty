import {
  buildSitemapIndexXml,
  getSitemapIndexUrls,
  xmlResponse,
} from '@/lib/sitemap-helpers';

export async function GET() {
  return xmlResponse(buildSitemapIndexXml(getSitemapIndexUrls('1')));
}
