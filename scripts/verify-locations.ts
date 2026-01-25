
import { TARGET_LOCATIONS as CONFIG_LOCATIONS } from '../src/lib/sitemap-config';
import { TARGET_LOCATIONS as SEO_LOCATIONS } from '../src/lib/seo-data';

// Compare the two lists
function compareLocations() {
    console.log(`Checking location consistency...`);
    console.log(`sitemap-config locations (used by sitemap): ${CONFIG_LOCATIONS.length}`);
    console.log(`seo-data locations (used by app): ${SEO_LOCATIONS.length}`);

    const configSet = new Set(CONFIG_LOCATIONS);
    const seoSet = new Set(SEO_LOCATIONS.map(l => l.slug));

    const missingInSitemap = SEO_LOCATIONS.filter(l => !configSet.has(l.slug));
    const missingInApp = CONFIG_LOCATIONS.filter(l => !seoSet.has(l));

    if (missingInSitemap.length > 0) {
        console.warn(`\n⚠️ WARNING: ${missingInSitemap.length} locations are in App but MISSING from Sitemap source:`);
        missingInSitemap.slice(0, 10).forEach(l => console.log(` - ${l.slug}`));
        if (missingInSitemap.length > 10) console.log(`... and ${missingInSitemap.length - 10} more.`);
    }

    if (missingInApp.length > 0) {
        console.warn(`\n⚠️ WARNING: ${missingInApp.length} locations are in Sitemap but MISSING from App data:`);
        missingInApp.slice(0, 10).forEach(l => console.log(` - ${l}`));
    }

    if (missingInSitemap.length === 0 && missingInApp.length === 0) {
        console.log("\n✅ Success: Location sources are perfectly synced.");
    }
}

compareLocations();
