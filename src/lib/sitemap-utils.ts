import { SITEMAP_0_LOCATIONS, SITEMAP_1_LOCATIONS } from "./sitemap-config";
import { getAllBespokeServicePages } from "./bespoke-service-pages";
import { getAllBlogPosts } from "./blog-data";
import { getPublishedIntentPages } from "./intent-pages";
import { getAllSEOServices, isIndexableLocationService } from "./seo-data";
import { SITEMAP_STATIC_PAGES } from "./sitemap-static-pages";

/**
 * Calculate URL counts for sitemap planning
 */

const STATIC_PAGES = SITEMAP_STATIC_PAGES.length;

export function calculateSitemapURLCounts() {
    const blogPosts = getAllBlogPosts();
    const intentPages = getPublishedIntentPages();
    const bespokeServicePages = getAllBespokeServicePages();
    const services = getAllSEOServices();
    const indexableSitemap0LocationServices = SITEMAP_0_LOCATIONS.flatMap((location) =>
        services.filter((service) => isIndexableLocationService(location, service.slug))
    );
    const indexableSitemap1LocationServices = SITEMAP_1_LOCATIONS.flatMap((location) =>
        services.filter((service) => isIndexableLocationService(location, service.slug))
    );

    // Sitemap 0: Primary Local & Northwest
    const sitemap0Locations = SITEMAP_0_LOCATIONS.length;
    const sitemap0LocationServices = indexableSitemap0LocationServices.length;
    const sitemap0ServicePages = services.length;
    const sitemap0Total = STATIC_PAGES + intentPages.length + blogPosts.length + bespokeServicePages.length + sitemap0ServicePages + 1 + sitemap0Locations + sitemap0LocationServices;
    // 1 = /locations index page

    // Sitemap 1: Extended Gauteng
    const sitemap1Locations = SITEMAP_1_LOCATIONS.length;
    const sitemap1LocationServices = indexableSitemap1LocationServices.length;
    const sitemap1Total = sitemap1Locations + sitemap1LocationServices;
    // No static pages or blog in sitemap 1

    return {
        sitemap0: {
            staticPages: STATIC_PAGES,
            intentPages: intentPages.length,
            blogPosts: blogPosts.length,
            bespokeServicePages: bespokeServicePages.length,
            servicePages: sitemap0ServicePages,
            locationIndexPage: 1,
            locationHubs: sitemap0Locations,
            locationServicePages: sitemap0LocationServices,
            total: sitemap0Total,
            breakdown: {
                locations: sitemap0Locations,
                averageServicesPerLocation: sitemap0Locations === 0
                    ? 0
                    : Number((sitemap0LocationServices / sitemap0Locations).toFixed(1)),
            }
        },
        sitemap1: {
            locationHubs: sitemap1Locations,
            locationServicePages: sitemap1LocationServices,
            total: sitemap1Total,
            breakdown: {
                locations: sitemap1Locations,
                averageServicesPerLocation: sitemap1Locations === 0
                    ? 0
                    : Number((sitemap1LocationServices / sitemap1Locations).toFixed(1)),
            }
        },
        grandTotal: sitemap0Total + sitemap1Total,
        maxUrlsPerSitemap: 50000
    };
}

/**
 * Pretty print URL counts for debugging
 */
export function printSitemapCounts() {
    const counts = calculateSitemapURLCounts();

    console.log('\n========================================');
    console.log('SITEMAP URL COUNT ANALYSIS');
    console.log('========================================\n');

    console.log('SITEMAP 0: Primary Local & Northwest Areas');
    console.log('------------------------------------------');
    console.log(`Static pages:              ${counts.sitemap0.staticPages.toLocaleString()}`);
    console.log(`Intent pages:              ${counts.sitemap0.intentPages.toLocaleString()}`);
    console.log(`Blog posts:                ${counts.sitemap0.blogPosts.toLocaleString()}`);
    console.log(`Bespoke service pages:     ${counts.sitemap0.bespokeServicePages.toLocaleString()}`);
    console.log(`Service pages:             ${counts.sitemap0.servicePages.toLocaleString()}`);
    console.log(`Location index:            ${counts.sitemap0.locationIndexPage.toLocaleString()}`);
    console.log(`Location hubs:             ${counts.sitemap0.locationHubs.toLocaleString()}`);
    console.log(`Location service pages:    ${counts.sitemap0.locationServicePages.toLocaleString()}`);
    console.log(`  (${counts.sitemap0.breakdown.locations} locations × ${counts.sitemap0.breakdown.averageServicesPerLocation} average services)`);
    console.log('------------------------------------------');
    console.log(`SITEMAP 0 TOTAL:           ${counts.sitemap0.total.toLocaleString()} URLs`);
    console.log(`Capacity used:             ${((counts.sitemap0.total / counts.maxUrlsPerSitemap) * 100).toFixed(1)}%\n`);

    console.log('SITEMAP 1: Extended Gauteng Coverage');
    console.log('------------------------------------------');
    console.log(`Location hubs:             ${counts.sitemap1.locationHubs.toLocaleString()}`);
    console.log(`Location service pages:    ${counts.sitemap1.locationServicePages.toLocaleString()}`);
    console.log(`  (${counts.sitemap1.breakdown.locations} locations × ${counts.sitemap1.breakdown.averageServicesPerLocation} average services)`);
    console.log('------------------------------------------');
    console.log(`SITEMAP 1 TOTAL:           ${counts.sitemap1.total.toLocaleString()} URLs`);
    console.log(`Capacity used:             ${((counts.sitemap1.total / counts.maxUrlsPerSitemap) * 100).toFixed(1)}%\n`);

    console.log('========================================');
    console.log(`GRAND TOTAL:               ${counts.grandTotal.toLocaleString()} URLs`);
    console.log(`Max per sitemap:           ${counts.maxUrlsPerSitemap.toLocaleString()} URLs`);
    console.log('========================================\n');

    return counts;
}
