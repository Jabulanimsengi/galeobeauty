/**
 * Test the generated sitemap files to ensure they're valid.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

async function test() {
    console.log('Testing generated sitemap index...');
    const xml = await fs.readFile(path.resolve(scriptDir, '../public/sitemap.xml'), 'utf8');

    // Verify it's a sitemapindex
    if (xml.includes('<sitemapindex')) {
        console.log('\n✅ Valid sitemapindex format');
    } else {
        console.error('\n❌ Missing <sitemapindex> — not a valid sitemap index');
    }

    // Count direct child sitemaps
    const sitemapCount = (xml.match(/<sitemap>/g) || []).length;
    console.log(`Found ${sitemapCount} direct sitemap files`);

    for (const section of ['0', '1']) {
        const childXml = await fs.readFile(
            path.resolve(scriptDir, `../public/sitemaps/${section}.xml`),
            'utf8'
        );

        if (childXml.includes('<urlset')) {
            console.log(`âœ… sitemaps/${section}.xml is a urlset sitemap`);
        } else {
            console.error(`âŒ sitemaps/${section}.xml is not a urlset sitemap`);
        }

        if (childXml.includes('<sitemapindex')) {
            console.error(`âŒ sitemaps/${section}.xml is still a nested sitemap index`);
        }
    }
}

test().catch(console.error);
