
import { TARGET_LOCATIONS } from '../src/lib/seo-data';
import { serviceCategories } from '../src/lib/services-data';

// Helper to simulate getAllSEOServices
function getAllSEOServices() {
    const services = [];
    for (const category of serviceCategories) {
        for (const subcategory of category.subcategories) {
            for (const item of subcategory.items) {
                services.push({ slug: item.id });
            }
        }
    }
    return services;
}

async function analyze() {
    console.log("Analyzing sitemap potential size...");

    const staticPagesCount = 32; // Hardcoded in sitemap.ts
    // Blog posts - assuming small number or mocking
    const blogPostsCount = 20;

    const locations = TARGET_LOCATIONS;
    const services = getAllSEOServices();

    console.log(`Total Locations: ${locations.length}`);
    console.log(`Total Services: ${services.length}`);

    const potentialLocationPages = locations.length * services.length;
    console.log(`Potential Location Pages: ${potentialLocationPages}`);

    const totalPotential = staticPagesCount + blogPostsCount + potentialLocationPages;
    console.log(`Total Potential URLs: ${totalPotential}`);

    if (totalPotential > 50000) {
        console.warn(`WARNING: Sitemap limit (50,000) exceeded by ${totalPotential - 50000} URLs.`);
        console.warn("Truncation is occurring.");

        // Calculate dropped items
        const maxLocationPages = 50000 - staticPagesCount - blogPostsCount;
        const fullyCoveredLocations = Math.floor(maxLocationPages / services.length);

        console.log(`Only first ${fullyCoveredLocations} locations are fully covered.`);
        console.log(`Locations after index ${fullyCoveredLocations} are partially or fully dropped.`);

        if (fullyCoveredLocations < locations.length) {
            console.log(`Dropped Locations start from: ${locations[fullyCoveredLocations].name}`);
        }
    } else {
        console.log("Sitemap fits within limit.");
    }
}

analyze();
