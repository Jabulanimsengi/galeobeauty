import fs from 'node:fs/promises';
import path from 'node:path';
import {
  buildSitemapIndexXml,
  buildSitemapXml,
  getSitemapChunkCount,
  getSitemapChunkEntries,
  getSitemapIndexUrls,
  getTopLevelSitemapIndexUrls,
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
  const chunkCount = getSitemapChunkCount(section);
  const sectionDir = path.join(sitemapRoot, section);

  await fs.mkdir(sectionDir, { recursive: true });
  await writeFile(
    path.join(sitemapRoot, `${section}.xml`),
    buildSitemapIndexXml(getSitemapIndexUrls(section))
  );

  for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex += 1) {
    await writeFile(
      path.join(sectionDir, `${chunkIndex}.xml`),
      buildSitemapXml(getSitemapChunkEntries(section, chunkIndex))
    );
  }

  return chunkCount;
}

async function main() {
  if (process.env.GALEO_SITEMAP_COMPILE_ONLY === '1') {
    console.log('Sitemap generator compiled successfully.');
    return;
  }

  await fs.mkdir(publicDir, { recursive: true });
  await ensureCleanDir(sitemapRoot);

  await writeFile(path.join(publicDir, 'sitemap.xml'), buildSitemapIndexXml(getTopLevelSitemapIndexUrls()));

  const [sitemap0Chunks, sitemap1Chunks] = await Promise.all([
    writeSection('0'),
    writeSection('1'),
  ]);

  console.log(`Generated sitemap.xml with 2 child indexes.`);
  console.log(`Generated /public/sitemaps/0.xml with ${sitemap0Chunks} chunk files.`);
  console.log(`Generated /public/sitemaps/1.xml with ${sitemap1Chunks} chunk files.`);
}

main().catch((error) => {
  console.error('Failed to generate sitemap files.');
  console.error(error);
  process.exit(1);
});
