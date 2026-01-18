// ============================================
// SEO DATA - Locations & Services for Programmatic SEO
// ============================================
// This file powers the generation of 20,000+ landing pages
// targeting Gauteng Province and surrounding areas.
// ============================================

import { serviceCategories, type ServiceCategory } from "./services-data";

// ============================================
// TARGET LOCATIONS
// ============================================
// Comprehensive list of Gauteng suburbs and surrounding areas

export interface SEOLocation {
    slug: string;
    name: string;
    region: string;
}

export const TARGET_LOCATIONS: SEOLocation[] = [
    // ========================================
    // HARTBEESPOORT AREA (Primary - Salon Location)
    // ========================================
    { slug: "hartbeespoort", name: "Hartbeespoort", region: "North West" },
    { slug: "schoemansville", name: "Schoemansville", region: "Hartbeespoort" },
    { slug: "meerhof", name: "Meerhof", region: "Hartbeespoort" },
    { slug: "ifafi", name: "Ifafi", region: "Hartbeespoort" },
    { slug: "kosmos", name: "Kosmos", region: "Hartbeespoort" },
    { slug: "pecanwood", name: "Pecanwood", region: "Hartbeespoort" },
    { slug: "melodie", name: "Melodie", region: "Hartbeespoort" },
    { slug: "leloko", name: "Leloko", region: "Hartbeespoort" },
    { slug: "magaliesburg", name: "Magaliesburg", region: "North West" },
    { slug: "brits", name: "Brits", region: "North West" },
    { slug: "broederstroom", name: "Broederstroom", region: "North West" },

    // ========================================
    // JOHANNESBURG - Strategic Areas
    // ========================================
    { slug: "johannesburg", name: "Johannesburg", region: "Gauteng" },
    { slug: "sandton", name: "Sandton", region: "Johannesburg" },
    { slug: "bryanston", name: "Bryanston", region: "Johannesburg" },
    { slug: "rivonia", name: "Rivonia", region: "Johannesburg" },
    { slug: "fourways", name: "Fourways", region: "Johannesburg" },
    { slug: "morningside", name: "Morningside", region: "Johannesburg" },
    { slug: "douglasdale", name: "Douglasdale", region: "Johannesburg" },
    { slug: "sunninghill", name: "Sunninghill", region: "Johannesburg" },
    { slug: "paulshof", name: "Paulshof", region: "Johannesburg" },
    { slug: "lonehill", name: "Lonehill", region: "Johannesburg" },
    { slug: "woodmead", name: "Woodmead", region: "Johannesburg" },
    { slug: "rosebank", name: "Rosebank", region: "Johannesburg" },
    { slug: "parkhurst", name: "Parkhurst", region: "Johannesburg" },
    { slug: "houghton", name: "Houghton", region: "Johannesburg" },
    { slug: "melville", name: "Melville", region: "Johannesburg" },
    { slug: "greenside", name: "Greenside", region: "Johannesburg" },
    { slug: "randburg", name: "Randburg", region: "Johannesburg" },
    { slug: "northcliff", name: "Northcliff", region: "Johannesburg" },
    { slug: "linden", name: "Linden", region: "Johannesburg" },
    { slug: "blairgowrie", name: "Blairgowrie", region: "Johannesburg" },
    { slug: "ferndale", name: "Ferndale", region: "Johannesburg" },
    { slug: "roodepoort", name: "Roodepoort", region: "Johannesburg" },
    { slug: "florida", name: "Florida", region: "Johannesburg" },
    { slug: "north-riding", name: "North Riding", region: "Johannesburg" },
    { slug: "honeydew", name: "Honeydew", region: "Johannesburg" },
    { slug: "glenvista", name: "Glenvista", region: "Johannesburg" },
    { slug: "mulbarton", name: "Mulbarton", region: "Johannesburg" },

    // ========================================
    // MIDRAND - Strategic Areas
    // ========================================
    { slug: "midrand", name: "Midrand", region: "Gauteng" },
    { slug: "kyalami", name: "Kyalami", region: "Midrand" },
    { slug: "waterfall", name: "Waterfall", region: "Midrand" },
    { slug: "waterfall-city", name: "Waterfall City", region: "Midrand" },
    { slug: "blue-hills", name: "Blue Hills", region: "Midrand" },
    { slug: "halfway-house", name: "Halfway House", region: "Midrand" },
    { slug: "carlswald", name: "Carlswald", region: "Midrand" },

    // ========================================
    // PRETORIA/TSHWANE - Strategic Areas
    // ========================================
    { slug: "pretoria", name: "Pretoria", region: "Gauteng" },
    { slug: "pretoria-east", name: "Pretoria East", region: "Pretoria" },
    { slug: "garsfontein", name: "Garsfontein", region: "Pretoria" },
    { slug: "moreleta-park", name: "Moreleta Park", region: "Pretoria" },
    { slug: "faerie-glen", name: "Faerie Glen", region: "Pretoria" },
    { slug: "lynnwood", name: "Lynnwood", region: "Pretoria" },
    { slug: "silver-lakes", name: "Silver Lakes", region: "Pretoria" },
    { slug: "menlyn", name: "Menlyn", region: "Pretoria" },
    { slug: "waterkloof", name: "Waterkloof", region: "Pretoria" },
    { slug: "montana", name: "Montana", region: "Pretoria" },
    { slug: "annlin", name: "Annlin", region: "Pretoria" },
    { slug: "wonderboom", name: "Wonderboom", region: "Pretoria" },
    { slug: "arcadia", name: "Arcadia", region: "Pretoria" },
    { slug: "hatfield", name: "Hatfield", region: "Pretoria" },
    { slug: "brooklyn", name: "Brooklyn", region: "Pretoria" },

    // ========================================
    // CENTURION - Strategic Areas
    // ========================================
    { slug: "centurion", name: "Centurion", region: "Gauteng" },
    { slug: "irene", name: "Irene", region: "Centurion" },
    { slug: "die-hoewes", name: "Die Hoewes", region: "Centurion" },
    { slug: "lyttelton", name: "Lyttelton", region: "Centurion" },
    { slug: "eldoraigne", name: "Eldoraigne", region: "Centurion" },
    { slug: "pierre-van-ryneveld", name: "Pierre van Ryneveld", region: "Centurion" },
    { slug: "midstream", name: "Midstream", region: "Centurion" },

    // ========================================
    // EAST RAND - Strategic Areas
    // ========================================
    { slug: "kempton-park", name: "Kempton Park", region: "East Rand" },
    { slug: "glen-marais", name: "Glen Marais", region: "East Rand" },
    { slug: "birchleigh", name: "Birchleigh", region: "East Rand" },
    { slug: "boksburg", name: "Boksburg", region: "East Rand" },
    { slug: "benoni", name: "Benoni", region: "East Rand" },
    { slug: "bedfordview", name: "Bedfordview", region: "East Rand" },
    { slug: "edenvale", name: "Edenvale", region: "East Rand" },
    { slug: "greenstone-hill", name: "Greenstone Hill", region: "East Rand" },
    { slug: "alberton", name: "Alberton", region: "East Rand" },

    // ========================================
    // WEST RAND - Strategic Areas
    // ========================================
    { slug: "krugersdorp", name: "Krugersdorp", region: "West Rand" },
    { slug: "muldersdrift", name: "Muldersdrift", region: "West Rand" },
    { slug: "lanseria", name: "Lanseria", region: "West Rand" },
];

// ============================================
// SEO SERVICES - Extracted from all categories
// ============================================

export interface SEOService {
    slug: string;
    keyword: string;
    categoryId: string;
    subcategoryId: string;
    itemId: string;
    price: string;
    duration?: string;
}

/**
 * Extracts ALL services from the main services-data.ts file
 * and formats them for SEO page generation.
 */
export function getAllSEOServices(): SEOService[] {
    const services: SEOService[] = [];

    for (const category of serviceCategories) {
        for (const subcategory of category.subcategories) {
            for (const item of subcategory.items) {
                services.push({
                    slug: item.id,
                    keyword: item.name,
                    categoryId: category.id,
                    subcategoryId: subcategory.id,
                    itemId: item.id,
                    price: item.price,
                    duration: item.duration,
                });
            }
        }
    }

    return services;
}

/**
 * Get all valid location-service combinations for static generation
 */
export function getAllSEOParams(): { location: string; service: string }[] {
    const services = getAllSEOServices();
    const params: { location: string; service: string }[] = [];

    for (const location of TARGET_LOCATIONS) {
        for (const service of services) {
            params.push({
                location: location.slug,
                service: service.slug,
            });
        }
    }

    return params;
}

/**
 * Get location data by slug
 */
export function getLocationBySlug(slug: string): SEOLocation | undefined {
    return TARGET_LOCATIONS.find((loc) => loc.slug === slug);
}

/**
 * Get service data by slug
 */
export function getServiceBySlug(slug: string): SEOService | undefined {
    return getAllSEOServices().find((svc) => svc.slug === slug);
}

/**
 * Get the parent category for a service
 */
export function getCategoryForService(serviceSlug: string): ServiceCategory | undefined {
    const service = getServiceBySlug(serviceSlug);
    if (!service) return undefined;
    return serviceCategories.find((cat) => cat.id === service.categoryId);
}

// Pre-calculate for performance during build
export const ALL_SEO_SERVICES = getAllSEOServices();
export const ALL_SEO_PARAMS = getAllSEOParams();

// Stats for logging
export const SEO_STATS = {
    totalLocations: TARGET_LOCATIONS.length,
    totalServices: ALL_SEO_SERVICES.length,
    totalPages: ALL_SEO_PARAMS.length,
};

console.log(`[SEO] Generating ${SEO_STATS.totalPages} pages (${SEO_STATS.totalLocations} locations x ${SEO_STATS.totalServices} services)`);
