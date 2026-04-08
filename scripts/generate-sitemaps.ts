import fs from 'node:fs/promises';
import path from 'node:path';
import {
  assertSectionFitsSitemapLimit,
  buildSitemapIndexXml,
  buildSitemapXml,
  getSectionSitemapUrl,
  getSitemapEntries,
  getTopLevelSitemapUrls,
} from '../src/lib/sitemap-helpers';

const repoRoot = process.cwd();
const publicDir = path.join(repoRoot, 'public');
const sitemapRoot = path.join(publicDir, 'sitemaps');

async function ensureCleanDir(dir: string) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function writeFile(targetPath: string, contents: string) {
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, contents, 'utf8');
}

async function writeSection(section: '0' | '1') {
  const urlCount = assertSectionFitsSitemapLimit(section);

  await writeFile(
    path.join(sitemapRoot, `${section}.xml`),
    buildSitemapXml(getSitemapEntries(section))
  );

  return urlCount;
}

async function main() {
  if (process.env.GALEO_SITEMAP_COMPILE_ONLY === '1') {
    console.log('Sitemap generator compiled successfully.');
    return;
  }

  await fs.mkdir(publicDir, { recursive: true });
  await ensureCleanDir(sitemapRoot);

  await writeFile(path.join(publicDir, 'sitemap.xml'), buildSitemapIndexXml(getTopLevelSitemapUrls()));

  const [sitemap0Count, sitemap1Count] = await Promise.all([
    writeSection('0'),
    writeSection('1'),
  ]);

  console.log('Generated sitemap.xml with 2 direct sitemap files.');
  console.log(`Generated ${getSectionSitemapUrl('0')} with ${sitemap0Count.toLocaleString()} URLs.`);
  console.log(`Generated ${getSectionSitemapUrl('1')} with ${sitemap1Count.toLocaleString()} URLs.`);
}

main().catch((error) => {
  console.error('Failed to generate sitemap files.');
  console.error(error);
  process.exit(1);
});
