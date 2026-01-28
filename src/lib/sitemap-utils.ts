import { SITEMAP_0_LOCATIONS, SITEMAP_1_LOCATIONS, SERVICE_SLUGS } from './sitemap-config';
import { getAllBlogPosts } from './blog-data';
import { getAllSEOServices } from './seo-data';

/**
 * Calculate URL counts for sitemap planning
 */

const STATIC_PAGES = 32; // From current sitemap.ts

export function calculateSitemapURLCounts() {
    const blogPosts = getAllBlogPosts();
    const services = getAllSEOServices();

    // Sitemap 0: Primary Local & Northwest
    const sitemap0Locations = SITEMAP_0_LOCATIONS.length;
    const sitemap0LocationServices = sitemap0Locations * services.length;
    const sitemap0Total = STATIC_PAGES + blogPosts.length + 1 + sitemap0Locations + sitemap0LocationServices;
    // 1 = /locations index page

    // Sitemap 1: Extended Gauteng
    const sitemap1Locations = SITEMAP_1_LOCATIONS.length;
    const sitemap1LocationServices = sitemap1Locations * services.length;
    const sitemap1Total = sitemap1Locations + sitemap1LocationServices;
    // No static pages or blog in sitemap 1

    return {
        sitemap0: {
            staticPages: STATIC_PAGES,
            blogPosts: blogPosts.length,
            locationIndexPage: 1,
            locationHubs: sitemap0Locations,
            locationServicePages: sitemap0LocationServices,
            total: sitemap0Total,
            breakdown: {
                locations: sitemap0Locations,
                servicesPerLocation: services.length,
            }
        },
        sitemap1: {
            locationHubs: sitemap1Locations,
            locationServicePages: sitemap1LocationServices,
            total: sitemap1Total,
            breakdown: {
                locations: sitemap1Locations,
                servicesPerLocation: services.length,
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
    console.log(`Blog posts:                ${counts.sitemap0.blogPosts.toLocaleString()}`);
    console.log(`Location index:            ${counts.sitemap0.locationIndexPage.toLocaleString()}`);
    console.log(`Location hubs:             ${counts.sitemap0.locationHubs.toLocaleString()}`);
    console.log(`Location service pages:    ${counts.sitemap0.locationServicePages.toLocaleString()}`);
    console.log(`  (${counts.sitemap0.breakdown.locations} locations × ${counts.sitemap0.breakdown.servicesPerLocation} services)`);
    console.log('------------------------------------------');
    console.log(`SITEMAP 0 TOTAL:           ${counts.sitemap0.total.toLocaleString()} URLs`);
    console.log(`Capacity used:             ${((counts.sitemap0.total / counts.maxUrlsPerSitemap) * 100).toFixed(1)}%\n`);

    console.log('SITEMAP 1: Extended Gauteng Coverage');
    console.log('------------------------------------------');
    console.log(`Location hubs:             ${counts.sitemap1.locationHubs.toLocaleString()}`);
    console.log(`Location service pages:    ${counts.sitemap1.locationServicePages.toLocaleString()}`);
    console.log(`  (${counts.sitemap1.breakdown.locations} locations × ${counts.sitemap1.breakdown.servicesPerLocation} services)`);
    console.log('------------------------------------------');
    console.log(`SITEMAP 1 TOTAL:           ${counts.sitemap1.total.toLocaleString()} URLs`);
    console.log(`Capacity used:             ${((counts.sitemap1.total / counts.maxUrlsPerSitemap) * 100).toFixed(1)}%\n`);

    console.log('========================================');
    console.log(`GRAND TOTAL:               ${counts.grandTotal.toLocaleString()} URLs`);
    console.log(`Max per sitemap:           ${counts.maxUrlsPerSitemap.toLocaleString()} URLs`);
    console.log('========================================\n');

    return counts;
}
