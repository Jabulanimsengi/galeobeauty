/**
 * Test the generated sitemap files to ensure they're valid.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

async function test() {
    console.log('Testing generated sitemap index...');
    const xml = await fs.readFile(path.resolve(__dirname, '../public/sitemap.xml'), 'utf8');
    console.log('Sitemap index XML:');
    console.log(xml);

    // Verify it's a sitemapindex
    if (xml.includes('<sitemapindex')) {
        console.log('\n✅ Valid sitemapindex format');
    } else {
        console.error('\n❌ Missing <sitemapindex> — not a valid sitemap index');
    }

    // Count sub-sitemaps
    const sitemapCount = (xml.match(/<sitemap>/g) || []).length;
    console.log(`Found ${sitemapCount} sub-sitemaps`);
}

test().catch(console.error);
