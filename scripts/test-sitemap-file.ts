/**
 * Test the sitemap route handlers to ensure they're valid
 */
import { GET } from '../src/app/sitemap.xml/route';

async function test() {
    console.log('Testing sitemap index...');
    const response = await GET();
    const xml = await response.text();
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
