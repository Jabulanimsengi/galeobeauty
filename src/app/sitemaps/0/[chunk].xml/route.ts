import { NextResponse } from 'next/server';
import {
  buildSitemapXml,
  getSitemapChunkCount,
  getSitemapChunkEntries,
  xmlResponse,
} from '@/lib/sitemap-helpers';

export async function GET(
  _: Request,
  { params }: { params: Promise<Record<string, string | string[] | undefined>> }
) {
  const chunkParam = (await params).chunk;
  const chunk = Array.isArray(chunkParam) ? chunkParam[0] : chunkParam;
  const chunkIndex = Number.parseInt(chunk ?? '', 10);

  if (!Number.isInteger(chunkIndex) || chunkIndex < 0 || chunkIndex >= getSitemapChunkCount('0')) {
    return NextResponse.json({ error: 'Sitemap chunk not found' }, { status: 404 });
  }

  return xmlResponse(buildSitemapXml(getSitemapChunkEntries('0', chunkIndex)));
}
