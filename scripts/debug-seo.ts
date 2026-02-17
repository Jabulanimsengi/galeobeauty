
import { generateServiceDescription } from '../src/lib/seo-generator';
import { getAllSEOServices, getLocationBySlug, getCategoryForService } from '../src/lib/seo-data';

async function main() {
    console.log("Starting debug...");

    const locationSlug = 'pecanwood';
    const serviceSlug = 'sensitive-skin-facial';

    console.log(`Testing: Location=${locationSlug}, Service=${serviceSlug}`);

    const location = getLocationBySlug(locationSlug);
    const service = getAllSEOServices().find(s => s.slug === serviceSlug);

    if (!location) {
        console.error("Location not found!");
        return;
    }
    if (!service) {
        console.error("Service not found!");
        return;
    }

    console.log("Found Service:", service.keyword);

    const category = getCategoryForService(serviceSlug);
    const categoryTitle = category?.title || "Beauty Services";

    console.log("Category Title:", categoryTitle);

    try {
        const richDescription = generateServiceDescription(
            // @ts-ignore
            { ...service, name: service.keyword },
            categoryTitle,
            ""
        );
        console.log("SUCCESS! Generated Description:");
        console.log(richDescription);
    } catch (error) {
        console.error("CRASHED during generation:", error);
    }
}

main();
