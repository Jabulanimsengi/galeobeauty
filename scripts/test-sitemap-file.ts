/**
 * Test the sitemap files to ensure they're valid
 */
import sitemap from '../src/app/sitemap';

async function test() {
    console.log('Testing sitemap index...');
    const sitemapIndex = sitemap();
    console.log('Sitemap index entries:', sitemapIndex.length);
    console.log('URLs:', sitemapIndex.map(u => u.url));
}

test().catch(console.error);
