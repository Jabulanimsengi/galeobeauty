/**
 * Test the sitemap.ts file to ensure it's valid
 */
import { generateSitemaps, default as sitemap } from '../src/app/sitemap';

async function test() {
    console.log('Testing generateSitemaps...');
    const sitemaps = generateSitemaps();
    console.log('Generated sitemaps:', sitemaps);

    for (const { id } of sitemaps) {
        console.log(`\nTesting sitemap with id: ${id}`);
        const urls = await sitemap({ id });
        console.log(`  Total URLs: ${urls.length}`);
        console.log(`  First 3 URLs:`, urls.slice(0, 3).map(u => u.url));
    }
}

test().catch(console.error);
