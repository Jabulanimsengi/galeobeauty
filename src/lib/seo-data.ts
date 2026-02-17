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
    // Main Town
    { slug: "hartbeespoort", name: "Hartbeespoort", region: "North West" },
    { slug: "harties", name: "Harties", region: "Hartbeespoort" },

    // Big Five Residential Suburbs
    { slug: "schoemansville", name: "Schoemansville", region: "Hartbeespoort" },
    { slug: "melodie", name: "Melodie", region: "Hartbeespoort" },
    { slug: "ifafi", name: "Ifafi", region: "Hartbeespoort" },
    { slug: "meerhof", name: "Meerhof", region: "Hartbeespoort" },
    { slug: "kosmos", name: "Kosmos", region: "Hartbeespoort" },
    { slug: "kosmos-village", name: "Kosmos Village", region: "Hartbeespoort" },

    // Waterfront & Canal Estates
    { slug: "the-islands-estate", name: "The Islands Estate", region: "Hartbeespoort" },
    { slug: "estate-dafrique", name: "Estate d'Afrique", region: "Hartbeespoort" },
    { slug: "caribbean-beach-club", name: "Caribbean Beach Club", region: "Hartbeespoort" },
    { slug: "key-west-estate", name: "Key West Estate", region: "Hartbeespoort" },
    { slug: "eagles-landing", name: "Eagles Landing", region: "Hartbeespoort" },
    { slug: "montego-bay", name: "Montego Bay", region: "Hartbeespoort" },

    // Golf & Sport Estates
    { slug: "pecanwood", name: "Pecanwood", region: "Hartbeespoort" },
    { slug: "pecanwood-estate", name: "Pecanwood Golf Estate", region: "Hartbeespoort" },
    { slug: "magalies-park", name: "Magalies Park", region: "Hartbeespoort" },
    { slug: "seasons-lifestyle-estate", name: "Seasons Lifestyle Estate", region: "Hartbeespoort" },
    { slug: "cove-ridge", name: "Cove Ridge", region: "Hartbeespoort" },
    { slug: "magalies-golf-estate", name: "Magalies Golf Estate", region: "Hartbeespoort" },
    { slug: "lakeland-estate", name: "Lakeland Estate", region: "Hartbeespoort" },

    // Nature & Eco Estates
    { slug: "xanadu", name: "Xanadu", region: "Hartbeespoort" },
    { slug: "xanadu-nature-estate", name: "Xanadu Nature Estate", region: "Hartbeespoort" },
    { slug: "leloko", name: "Leloko", region: "Hartbeespoort" },
    { slug: "leloko-lifestyle-estate", name: "Leloko Lifestyle Estate", region: "Hartbeespoort" },
    { slug: "the-coves", name: "The Coves", region: "Hartbeespoort" },
    { slug: "la-camargue", name: "La Camargue Private Estate", region: "Hartbeespoort" },
    { slug: "redstone-estate", name: "Redstone Private Estate", region: "Hartbeespoort" },
    { slug: "birdwood-estate", name: "Birdwood Estate", region: "Hartbeespoort" },

    // Emerging & Boutique Estates
    { slug: "gateway-manor", name: "Gateway Manor", region: "Hartbeespoort" },
    { slug: "landsmeer", name: "Landsmeer", region: "Hartbeespoort" },
    { slug: "landsmeer-estate", name: "Landsmeer Residential Estate", region: "Hartbeespoort" },
    { slug: "kosmos-ridge", name: "Kosmos Ridge", region: "Hartbeespoort" },
    { slug: "mount-kos", name: "Mount Kos", region: "Hartbeespoort" },
    { slug: "ile-du-lac", name: "Ile du Lac", region: "Hartbeespoort" },
    { slug: "kshane", name: "K'Shane Estate", region: "Hartbeespoort" },

    // Surrounding Smallholdings
    { slug: "broederstroom", name: "Broederstroom", region: "North West" },
    { slug: "skeerpoort", name: "Skeerpoort", region: "Hartbeespoort" },
    { slug: "rietfontein-ah", name: "Rietfontein AH", region: "Hartbeespoort" },
    { slug: "melodie-ah", name: "Melodie AH", region: "Hartbeespoort" },
    { slug: "remhoogte", name: "Remhoogte", region: "Hartbeespoort" },
    { slug: "welgegund", name: "Welgegund", region: "Hartbeespoort" },

    // Shopping Hub Areas (Near Keywords)
    { slug: "village-mall-hartbeespoort", name: "Village Mall Hartbeespoort", region: "Hartbeespoort" },
    { slug: "islands-shopping-mall", name: "Islands Shopping Mall", region: "Hartbeespoort" },
    { slug: "damdoryn", name: "Damdoryn", region: "Hartbeespoort" },
    { slug: "damdoryn-junction", name: "Damdoryn Junction", region: "Hartbeespoort" },
    { slug: "mountain-lake-shopping-centre", name: "Mountain Lake Shopping Centre", region: "Hartbeespoort" },
    { slug: "sediba-plaza", name: "Sediba Plaza", region: "Hartbeespoort" },
    { slug: "jasmyn", name: "Jasmyn", region: "Hartbeespoort" },
    { slug: "jasmyn-farm", name: "Jasmyn Farm Products", region: "Hartbeespoort" },

    // Additional Hartbeespoort Areas
    { slug: "hartbeespoort-dam", name: "Hartbeespoort Dam", region: "North West" },
    { slug: "dam-wall", name: "Dam Wall", region: "Hartbeespoort" },
    { slug: "oberon", name: "Oberon", region: "Hartbeespoort" },
    { slug: "zilkaatsnek", name: "Zilkaatsnek", region: "Hartbeespoort" },
    { slug: "buffelspoort", name: "Buffelspoort", region: "Hartbeespoort" },
    { slug: "kommando-nek", name: "Kommando Nek", region: "Hartbeespoort" },
    { slug: "safari-gardens", name: "Safari Gardens", region: "Hartbeespoort" },
    { slug: "elandsfontein", name: "Elandsfontein", region: "Hartbeespoort" },
    { slug: "hekpoort", name: "Hekpoort", region: "North West" },

    // Other North West
    { slug: "magaliesburg", name: "Magaliesburg", region: "North West" },
    { slug: "brits", name: "Brits", region: "North West" },

    // ========================================
    // CITY OF JOHANNESBURG (Metropolitan)
    // ========================================
    // Northern Hub
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
    { slug: "diepsloot", name: "Diepsloot", region: "Johannesburg" },
    { slug: "alexandra", name: "Alexandra", region: "Johannesburg" },
    // Central/Business
    { slug: "johannesburg-cbd", name: "Johannesburg CBD", region: "Johannesburg" },
    { slug: "braamfontein", name: "Braamfontein", region: "Johannesburg" },
    { slug: "rosebank", name: "Rosebank", region: "Johannesburg" },
    { slug: "parkhurst", name: "Parkhurst", region: "Johannesburg" },
    { slug: "houghton", name: "Houghton", region: "Johannesburg" },
    { slug: "melville", name: "Melville", region: "Johannesburg" },
    { slug: "greenside", name: "Greenside", region: "Johannesburg" },
    { slug: "auckland-park", name: "Auckland Park", region: "Johannesburg" },
    // Western/Residential
    { slug: "randburg", name: "Randburg", region: "Johannesburg" },
    { slug: "northcliff", name: "Northcliff", region: "Johannesburg" },
    { slug: "linden", name: "Linden", region: "Johannesburg" },
    { slug: "blairgowrie", name: "Blairgowrie", region: "Johannesburg" },
    { slug: "ferndale", name: "Ferndale", region: "Johannesburg" },
    { slug: "roodepoort", name: "Roodepoort", region: "Johannesburg" },
    { slug: "florida", name: "Florida", region: "Johannesburg" },
    { slug: "constantia-kloof", name: "Constantia Kloof", region: "Johannesburg" },
    { slug: "weltevredenpark", name: "Weltevredenpark", region: "Johannesburg" },
    { slug: "zandspruit", name: "Zandspruit", region: "Johannesburg" },
    { slug: "north-riding", name: "North Riding", region: "Johannesburg" },
    { slug: "honeydew", name: "Honeydew", region: "Johannesburg" },
    // Southern/Residential
    { slug: "glenvista", name: "Glenvista", region: "Johannesburg" },
    { slug: "mulbarton", name: "Mulbarton", region: "Johannesburg" },
    { slug: "mondeor", name: "Mondeor", region: "Johannesburg" },
    { slug: "winchester-hills", name: "Winchester Hills", region: "Johannesburg" },
    { slug: "southgate", name: "Southgate", region: "Johannesburg" },
    { slug: "kibler-park", name: "Kibler Park", region: "Johannesburg" },
    { slug: "soweto", name: "Soweto", region: "Johannesburg" },
    { slug: "orange-farm", name: "Orange Farm", region: "Johannesburg" },
    { slug: "lenasia", name: "Lenasia", region: "Johannesburg" },
    { slug: "ennerdale", name: "Ennerdale", region: "Johannesburg" },
    { slug: "eldorado-park", name: "Eldorado Park", region: "Johannesburg" },
    // Northeast/Midrand
    { slug: "midrand", name: "Midrand", region: "Gauteng" },
    { slug: "kyalami", name: "Kyalami", region: "Midrand" },
    { slug: "waterfall", name: "Waterfall", region: "Midrand" },
    { slug: "waterfall-city", name: "Waterfall City", region: "Midrand" },
    { slug: "blue-hills", name: "Blue Hills", region: "Midrand" },
    { slug: "halfway-house", name: "Halfway House", region: "Midrand" },
    { slug: "carlswald", name: "Carlswald", region: "Midrand" },
    { slug: "vorna-valley", name: "Vorna Valley", region: "Midrand" },
    { slug: "ivory-park", name: "Ivory Park", region: "Midrand" },
    { slug: "rabie-ridge", name: "Rabie Ridge", region: "Midrand" },

    // ========================================
    // CITY OF TSHWANE (Metropolitan)
    // ========================================
    // Pretoria East
    { slug: "pretoria", name: "Pretoria", region: "Gauteng" },
    { slug: "pretoria-east", name: "Pretoria East", region: "Pretoria" },
    { slug: "garsfontein", name: "Garsfontein", region: "Pretoria" },
    { slug: "moreleta-park", name: "Moreleta Park", region: "Pretoria" },
    { slug: "faerie-glen", name: "Faerie Glen", region: "Pretoria" },
    { slug: "lynnwood", name: "Lynnwood", region: "Pretoria" },
    { slug: "silver-lakes", name: "Silver Lakes", region: "Pretoria" },
    { slug: "menlyn", name: "Menlyn", region: "Pretoria" },
    { slug: "constantia-park", name: "Constantia Park", region: "Pretoria" },
    { slug: "waterkloof", name: "Waterkloof", region: "Pretoria" },
    { slug: "mamelodi", name: "Mamelodi", region: "Pretoria" },
    // Pretoria North
    { slug: "pretoria-north", name: "Pretoria North", region: "Pretoria" },
    { slug: "montana", name: "Montana", region: "Pretoria" },
    { slug: "annlin", name: "Annlin", region: "Pretoria" },
    { slug: "wonderboom", name: "Wonderboom", region: "Pretoria" },
    { slug: "akasia", name: "Akasia", region: "Pretoria" },
    { slug: "florauna", name: "Florauna", region: "Pretoria" },
    { slug: "theresapark", name: "Theresapark", region: "Pretoria" },
    { slug: "soshanguve", name: "Soshanguve", region: "Pretoria" },
    { slug: "mabopane", name: "Mabopane", region: "Pretoria" },
    { slug: "ga-rankuwa", name: "Ga-Rankuwa", region: "Pretoria" },
    // Centurion
    { slug: "centurion", name: "Centurion", region: "Gauteng" },
    { slug: "irene", name: "Irene", region: "Centurion" },
    { slug: "die-hoewes", name: "Die Hoewes", region: "Centurion" },
    { slug: "zwartkop", name: "Zwartkop", region: "Centurion" },
    { slug: "lyttelton", name: "Lyttelton", region: "Centurion" },
    { slug: "eldoraigne", name: "Eldoraigne", region: "Centurion" },
    { slug: "rooihuiskraal", name: "Rooihuiskraal", region: "Centurion" },
    { slug: "wierdapark", name: "Wierdapark", region: "Centurion" },
    { slug: "pierre-van-ryneveld", name: "Pierre van Ryneveld", region: "Centurion" },
    { slug: "midstream", name: "Midstream", region: "Centurion" },
    { slug: "olievenhoutbosch", name: "Olievenhoutbosch", region: "Centurion" },
    // Central/West Pretoria
    { slug: "pretoria-cbd", name: "Pretoria CBD", region: "Pretoria" },
    { slug: "arcadia", name: "Arcadia", region: "Pretoria" },
    { slug: "hatfield", name: "Hatfield", region: "Pretoria" },
    { slug: "brooklyn", name: "Brooklyn", region: "Pretoria" },
    { slug: "pretoria-west", name: "Pretoria West", region: "Pretoria" },
    { slug: "lotus-gardens", name: "Lotus Gardens", region: "Pretoria" },
    { slug: "atteridgeville", name: "Atteridgeville", region: "Pretoria" },
    // Far North
    { slug: "roodeplaat", name: "Roodeplaat", region: "Pretoria" },
    { slug: "rayton", name: "Rayton", region: "Pretoria" },
    { slug: "cullinan", name: "Cullinan", region: "Pretoria" },
    { slug: "hammanskraal", name: "Hammanskraal", region: "Pretoria" },
    { slug: "temba", name: "Temba", region: "Pretoria" },
    { slug: "winterveldt", name: "Winterveldt", region: "Pretoria" },

    // ========================================
    // CITY OF EKURHULENI (Metropolitan)
    // ========================================
    // Airport Region
    { slug: "kempton-park", name: "Kempton Park", region: "East Rand" },
    { slug: "glen-marais", name: "Glen Marais", region: "East Rand" },
    { slug: "birchleigh", name: "Birchleigh", region: "East Rand" },
    { slug: "rhodesfield", name: "Rhodesfield", region: "East Rand" },
    { slug: "isando", name: "Isando", region: "East Rand" },
    { slug: "jet-park", name: "Jet Park", region: "East Rand" },
    { slug: "tembisa", name: "Tembisa", region: "East Rand" },
    // Industrial/Residential
    { slug: "boksburg", name: "Boksburg", region: "East Rand" },
    { slug: "sunward-park", name: "Sunward Park", region: "East Rand" },
    { slug: "benoni", name: "Benoni", region: "East Rand" },
    { slug: "northmead", name: "Northmead", region: "East Rand" },
    { slug: "rynfield", name: "Rynfield", region: "East Rand" },
    { slug: "brakpan", name: "Brakpan", region: "East Rand" },
    { slug: "springs", name: "Springs", region: "East Rand" },
    { slug: "nigel", name: "Nigel", region: "East Rand" },
    { slug: "daveyton", name: "Daveyton", region: "East Rand" },
    { slug: "kwathema", name: "KwaThema", region: "East Rand" },
    { slug: "tsakane", name: "Tsakane", region: "East Rand" },
    { slug: "duduza", name: "Duduza", region: "East Rand" },
    { slug: "etwatwa", name: "Etwatwa", region: "East Rand" },
    // West-East Border
    { slug: "germiston", name: "Germiston", region: "East Rand" },
    { slug: "bedfordview", name: "Bedfordview", region: "East Rand" },
    { slug: "edenvale", name: "Edenvale", region: "East Rand" },
    { slug: "greenstone-hill", name: "Greenstone Hill", region: "East Rand" },
    { slug: "modderfontein", name: "Modderfontein", region: "East Rand" },
    { slug: "alberton", name: "Alberton", region: "East Rand" },
    { slug: "brackenhurst", name: "Brackenhurst", region: "East Rand" },
    { slug: "katlehong", name: "Katlehong", region: "East Rand" },
    { slug: "vosloorus", name: "Vosloorus", region: "East Rand" },
    { slug: "thokoza", name: "Thokoza", region: "East Rand" },

    // ========================================
    // SEDIBENG DISTRICT (South - Vaal)
    // ========================================
    { slug: "vereeniging", name: "Vereeniging", region: "Sedibeng" },
    { slug: "vanderbijlpark", name: "Vanderbijlpark", region: "Sedibeng" },
    { slug: "meyerton", name: "Meyerton", region: "Sedibeng" },
    { slug: "heidelberg", name: "Heidelberg", region: "Sedibeng" },
    { slug: "sebokeng", name: "Sebokeng", region: "Sedibeng" },
    { slug: "sharpeville", name: "Sharpeville", region: "Sedibeng" },
    { slug: "evaton", name: "Evaton", region: "Sedibeng" },
    { slug: "ratanda", name: "Ratanda", region: "Sedibeng" },

    // ========================================
    // WEST RAND DISTRICT
    // ========================================
    { slug: "krugersdorp", name: "Krugersdorp", region: "West Rand" },
    { slug: "randfontein", name: "Randfontein", region: "West Rand" },
    { slug: "westonaria", name: "Westonaria", region: "West Rand" },
    { slug: "carletonville", name: "Carletonville", region: "West Rand" },
    { slug: "muldersdrift", name: "Muldersdrift", region: "West Rand" },
    { slug: "lanseria", name: "Lanseria", region: "West Rand" },
    { slug: "kagiso", name: "Kagiso", region: "West Rand" },
    { slug: "mohlakeng", name: "Mohlakeng", region: "West Rand" },
    { slug: "khutsong", name: "Khutsong", region: "West Rand" },
    { slug: "bekkersdal", name: "Bekkersdal", region: "West Rand" },
];

// ============================================
// PRIORITY LOCATIONS & SERVICES FOR PRE-BUILDING
// ============================================
// These key SEO target locations are pre-built at build time (~2,600 pages).
// All other location/service combinations are generated on-demand with ISR.
// 10 core locations - optimized to stay under Vercel's 75MB limit.

export const PRIORITY_LOCATIONS = [
    // Primary locations - EQUAL RANKING (Most Critical!)
    'hartbeespoort',                // Main town name
    'harties',                      // Short name for Hartbeespoort (equally important)
    'landsmeer',                    // 🏢 ACTUAL SALON LOCATION: Shop 6, Landsmeer Estate

    // Hartbeespoort Core Area - Big 3 Suburbs
    'schoemansville',               // Tourist hub (2km) - Old town
    'meerhof',                      // ⭐ CRITICAL - Pretoria entry point, large stands
    'melodie',                      // 5km - Commercial heart (Village Mall area)

    // Top Estates (Luxury & High-Traffic)
    'pecanwood',                    // 4km - Golf & wealthy estate
    'ifafi',                        // 3km - Exclusive estate with views

    // Key commuter cities (highest search volume)
    'johannesburg',                 // 1hr - Major metro - HIGHEST SEARCH VOLUME
    'pretoria',                     // 45min - Capital city - HIGHEST SEARCH VOLUME

    // Total: 10 locations × ~262 services = ~2,620 pages
    // Removed: landsmeer-estate, the-islands-estate, caribbean-beach-club, xanadu, 
    //          kosmos, hartbeespoort-dam, village-mall-hartbeespoort, magalies-park, broederstroom
    // These are now generated on-demand via ISR when first visited
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
    description?: string;
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
                    description: item.description,
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
        // EXCLUSION STRATEGY:
        // Do not generate /locations/hartbeespoort/* pages.
        // These are duplicates of the main /services/* pages which already target Hartbeespoort.
        if (location.slug === 'hartbeespoort' || location.slug === 'harties') {
            continue;
        }

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
 * Get all valid category-service combinations for static generation
 */
export function getAllServiceParams(): { category: string; service: string }[] {
    const services = getAllSEOServices();
    return services.map((service) => ({
        category: service.categoryId,
        service: service.slug,
    }));
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

/**
 * Get priority location/service combinations for ISR pre-building.
 * Generates ALL services for priority locations at build time (~1,000 pages).
 * Other pages are generated on-demand when first visited.
 */
export function getPriorityParams(): { location: string; service: string }[] {
    const services = getCachedSEOServices();
    const params: { location: string; service: string }[] = [];

    for (const loc of PRIORITY_LOCATIONS) {
        // EXCLUSION STRATEGY:
        // Exclude home base from programmatic generation
        if (loc === 'hartbeespoort' || loc === 'harties') {
            continue;
        }

        if (!getLocationBySlug(loc)) continue;

        for (const service of services) {
            params.push({ location: loc, service: service.slug });
        }
    }

    return params;
}

// Lazy-load services only when needed (not at module import time)
let _cachedServices: SEOService[] | null = null;
export function getCachedSEOServices(): SEOService[] {
    if (!_cachedServices) {
        _cachedServices = getAllSEOServices();
    }
    return _cachedServices;
}

// ============================================
// INTERNAL LINKING HELPERS
// ============================================

/**
 * Get nearby locations in the same region (for internal linking)
 * Returns up to 5 locations from the same region, excluding current
 */
export function getNearbyLocations(currentSlug: string, limit = 5): SEOLocation[] {
    const current = getLocationBySlug(currentSlug);
    if (!current) return [];

    // Get locations from same region first
    const sameRegion = TARGET_LOCATIONS.filter(
        (loc) => loc.region === current.region && loc.slug !== currentSlug
    );

    // If not enough, add locations where current location's name is the region
    const childLocations = TARGET_LOCATIONS.filter(
        (loc) => loc.region === current.name && loc.slug !== currentSlug
    );

    // Combine and dedupe
    const combined = [...sameRegion, ...childLocations];
    const unique = combined.filter((loc, idx, arr) =>
        arr.findIndex((l) => l.slug === loc.slug) === idx
    );

    return unique.slice(0, limit);
}

/**
 * Get related services from the same category (for internal linking)
 * Returns up to 4 services from same category, excluding current
 */
export function getRelatedServices(currentServiceSlug: string, limit = 4): SEOService[] {
    const current = getServiceBySlug(currentServiceSlug);
    if (!current) return [];

    const services = getCachedSEOServices();
    return services
        .filter((svc) => svc.categoryId === current.categoryId && svc.slug !== currentServiceSlug)
        .slice(0, limit);
}

/**
 * Get popular services from other categories (for cross-category linking)
 * Returns 1 service from each other category
 */
export function getPopularServicesFromOtherCategories(currentCategoryId: string, limit = 4): SEOService[] {
    const services = getCachedSEOServices();
    const otherCategories = serviceCategories.filter((cat) => cat.id !== currentCategoryId);

    const popularServices: SEOService[] = [];
    for (const cat of otherCategories) {
        const catService = services.find((svc) => svc.categoryId === cat.id);
        if (catService) {
            popularServices.push(catService);
        }
        if (popularServices.length >= limit) break;
    }

    return popularServices;
}

// ============================================
// UNIQUE CONTENT GENERATORS
// ============================================

/**
 * Service-specific benefits for "Why Choose Us" section
 * Generates unique benefits for each of 269 services based on attributes
 * Uses subcategory, duration, and price to create truly unique combinations
 */
export function getServiceSpecificBenefits(service: SEOService): string[] {
    // Benefit pools organized by category with multiple options
    const categoryBenefitPools: Record<string, string[]> = {
        "hart-aesthetics": [
            "Administered by qualified medical professionals",
            "Premium FDA-approved injectable products",
            "Natural-looking results tailored to your facial structure",
            "Comprehensive consultation before every treatment",
            "Safe, sterile clinical environment",
            "Follow-up care and support included",
            "Precise dosing for optimal aesthetic outcomes",
            "Minimal bruising with advanced injection techniques",
            "Gradual, natural-looking transformation",
            "Medical-grade products from trusted brands",
            "Detailed aftercare instructions provided",
            "Expert facial anatomy knowledge",
        ],
        "fat-freezing": [
            "Non-invasive body contouring technology",
            "CE-approved cryolipolysis equipment",
            "No downtime - return to activities immediately",
            "Permanent fat cell reduction in treated areas",
            "Customized treatment plans for your body goals",
            "Comfortable, relaxing treatment experience",
            "FDA-cleared fat reduction technology",
            "Targeted stubborn fat elimination",
            "Natural-looking body sculpting results",
            "Safe alternative to liposuction surgery",
            "Results visible within 8-12 weeks",
            "Multiple area treatment options available",
        ],
        "dermalogica": [
            "Official Dermalogica Pro treatments",
            "Skin analysis using Face Mapping technology",
            "Products formulated without common irritants",
            "Treatments customized to your skin concerns",
            "Professional-grade active ingredients",
            "Take-home skincare recommendations included",
            "Cruelty-free and vegan-friendly formulations",
            "Results-driven skincare backed by research",
            "Free skin consultation with every facial",
            "Advanced exfoliation and extraction techniques",
            "Suitable for sensitive and reactive skin",
            "Professional product retail available",
        ],
        "qms": [
            "Medical-grade QMS Medicosmetics products",
            "Collagen-boosting advanced formulations",
            "Anti-aging treatments backed by science",
            "Luxury spa experience with clinical results",
            "Suitable for sensitive and mature skin",
            "German precision skincare technology",
            "Patented Oxygen Complex delivery system",
            "Visible lift and firming from first treatment",
            "Exclusive collagen-stimulating ingredients",
            "Award-winning anti-aging formulations",
            "Red-carpet ready skin in one session",
            "Clinically proven wrinkle reduction",
        ],
        "skin-treatments": [
            "Advanced skin rejuvenation technologies",
            "Treatments for all skin types and concerns",
            "Combined therapies for optimal results",
            "Minimal discomfort with maximum efficacy",
            "Visible improvement from first session",
            "Expert skin therapists with specialized training",
            "Customized treatment protocols per client",
            "Latest innovations in aesthetic dermatology",
            "Safe for all Fitzpatrick skin types",
            "Pre-treatment skin prep included",
            "Post-treatment skincare guidance provided",
            "Progressive results with treatment series",
        ],
        "hair-care": [
            "Premium Moroccanoil and Milkshake products",
            "Customized treatments for your hair type",
            "Damage repair and prevention focus",
            "Scalp health assessment included",
            "Long-lasting color and styling results",
            "Argan oil-infused luxury treatments",
            "Sulfate-free and paraben-free formulas",
            "Color protection with UV filters",
            "Deep conditioning for damaged hair",
            "Frizz control and shine enhancement",
            "Keratin-enriched strengthening treatments",
            "Professional styling advice included",
        ],
        "nails": [
            "Hygienic nail care with sterilized tools",
            "Long-lasting gel and acrylic options",
            "Trendy nail art by skilled technicians",
            "Nourishing treatments for nail health",
            "Relaxing manicure and pedicure experience",
            "Wide selection of premium polish colors",
            "Professional-grade gel systems",
            "Chip-resistant finish lasting 2-3 weeks",
            "Nail strengthening treatments available",
            "Creative custom nail design options",
            "Cuticle care and hand massage included",
            "Walk-ins welcome for quick polish changes",
        ],
        "lashes-brows": [
            "Precision shaping for your face shape",
            "High-quality lash extension materials",
            "Long-lasting tints and lifts",
            "Patch testing available for sensitive clients",
            "Natural-looking enhancement options",
            "Quick touch-up appointments available",
            "Volume and classic lash extension styles",
            "Semi-permanent tinting lasting 4-6 weeks",
            "Keratin lash lift for natural lashes",
            "Brow mapping for perfect symmetry",
            "Hypoallergenic adhesives and products",
            "Expert color matching for your skin tone",
        ],
        "waxing": [
            "Premium wax for sensitive skin",
            "Hygiene-first approach with disposable applicators",
            "Quick and efficient hair removal",
            "Long-lasting smooth results",
            "Pre and post-wax skincare included",
            "Experienced therapists for minimal discomfort",
            "Gentle stripless wax for delicate areas",
            "Smooth skin lasting 3-6 weeks",
            "Ingrown hair prevention treatment",
            "Private, comfortable treatment rooms",
            "Hair growth reduction over time",
            "Suitable for all skin types",
        ],
        "tinting": [
            "Salon-grade professional tints",
            "Patch testing for safety",
            "Natural-looking color enhancement",
            "Lasts 4-6 weeks with proper care",
            "Quick 15-30 minute appointments",
            "Expert color matching for your features",
            "Vegan and cruelty-free tint formulas",
            "Perfect for fair or sparse brows/lashes",
            "No daily makeup application needed",
            "Waterproof and smudge-proof color",
            "Gradual fade for natural grow-out",
            "Complimentary consultation on best shade",
        ],
    };

    // Duration-based benefits
    const durationBenefits: Record<string, string[]> = {
        quick: ["Express service under 30 minutes", "Perfect for busy schedules", "Lunchtime beauty treatment"],
        medium: ["Relaxing 45-60 minute session", "Time to unwind and pamper yourself", "Thorough treatment with lasting results"],
        long: ["Comprehensive 90+ minute experience", "Ultimate relaxation and pampering", "Multi-step treatment for maximum results"],
    };

    // Price range benefits
    const priceBenefits: Record<string, string[]> = {
        affordable: ["Exceptional value for money", "Luxury treatments at accessible prices", "Budget-friendly beauty investment"],
        mid: ["Premium quality at fair pricing", "Professional results worth every rand", "Competitive rates without compromising quality"],
        premium: ["Exclusive high-end treatment", "Investment in long-term beauty goals", "Premium products and expert execution"],
    };

    // Universal benefits pool
    const universalBenefits = [
        "Experienced and certified therapists",
        "Luxurious, relaxing salon environment",
        "Easy online booking via WhatsApp",
        "Convenient Hartbeespoort location",
        "Complimentary consultation included",
        "Free parking at our salon",
        "Flexible appointment times available",
        "Loyalty rewards for returning clients",
        "Strict hygiene and safety protocols",
        "Personalized treatment approach",
    ];

    // Determine duration category
    let durationCategory = "medium";
    if (service.duration) {
        const minutes = parseInt(service.duration);
        if (minutes <= 30) durationCategory = "quick";
        else if (minutes >= 90) durationCategory = "long";
    }

    // Determine price category
    let priceCategory = "mid";
    if (service.price) {
        const priceNum = parseInt(service.price.replace(/[R,]/g, ""));
        if (priceNum < 500) priceCategory = "affordable";
        else if (priceNum > 3000) priceCategory = "premium";
    }

    // Build benefit pool for this specific service
    const categoryBenefits = categoryBenefitPools[service.categoryId] || [];
    const serviceDurationBenefits = durationBenefits[durationCategory] || [];
    const servicePriceBenefits = priceBenefits[priceCategory] || [];

    // Combine all possible benefits
    const allPossibleBenefits = [
        ...categoryBenefits,
        ...serviceDurationBenefits,
        ...servicePriceBenefits,
        ...universalBenefits,
    ];

    // Use hash to consistently select 6 unique benefits for this service
    const hash = hashString(service.slug);
    const selectedBenefits: string[] = [];
    const usedIndices = new Set<number>();

    // Select 6 unique benefits
    for (let i = 0; i < 6 && selectedBenefits.length < 6; i++) {
        const index = (hash + i * 7) % allPossibleBenefits.length;
        if (!usedIndices.has(index)) {
            selectedBenefits.push(allPossibleBenefits[index]);
            usedIndices.add(index);
        }
    }

    // Fallback: if we somehow don't have 6, add more
    if (selectedBenefits.length < 6) {
        for (let i = 0; i < allPossibleBenefits.length && selectedBenefits.length < 6; i++) {
            if (!usedIndices.has(i)) {
                selectedBenefits.push(allPossibleBenefits[i]);
                usedIndices.add(i);
            }
        }
    }

    return selectedBenefits;
}

/**
 * @deprecated Use getServiceSpecificBenefits instead for better uniqueness
 * Kept for backwards compatibility
 */
export function getCategoryBenefits(categoryId: string): string[] {
    // This function is now deprecated but kept for backwards compatibility
    const dummyService: SEOService = {
        slug: categoryId,
        keyword: categoryId,
        categoryId: categoryId,
        subcategoryId: "",
        itemId: "",
        price: "",
        duration: "",
    };
    return getServiceSpecificBenefits(dummyService);
}

/**
 * Generate unique intro paragraph based on service and location
 * 50+ template variations (5 per category) for improved uniqueness
 */
export function generateServiceIntro(service: SEOService, location: SEOLocation): string {
    const category = serviceCategories.find((cat) => cat.id === service.categoryId);
    const categoryName = category?.title || "beauty treatment";

    // 5 variations per category for 50+ total templates
    const introVariations: Record<string, string[]> = {
        "hart-aesthetics": [
            `Experience the artistry of advanced aesthetic treatments at Galeo Beauty Salon. Our ${service.keyword} service combines medical expertise with an eye for natural beauty, helping salon clients from ${location.name} achieve subtle, rejuvenating results.`,
            `Unlock your natural radiance with our ${service.keyword} treatment at Galeo Beauty Salon. Residents of ${location.name} trust our skilled practitioners to deliver sophisticated aesthetic enhancements that look refreshingly natural.`,
            `Elevate your aesthetic journey with our ${service.keyword} service. Galeo Beauty Salon welcomes ${location.name} clients seeking expert care and advanced techniques that enhance beauty while maintaining authenticity.`,
            `Discover refined aesthetic solutions through our ${service.keyword} treatment. Clients from ${location.name} and across ${location.region} choose our salon for results-driven procedures delivered with precision and artistry.`,
            `Transform your appearance naturally with our ${service.keyword} service at Galeo Beauty Salon. Serving ${location.name} with cutting-edge aesthetic treatments that honor your unique features while achieving remarkable improvements.`,
        ],
        "fat-freezing": [
            `Transform your body contours with our professional ${service.keyword} treatment at Galeo Beauty Salon. Serving clients from ${location.name} and the ${location.region} area, our salon uses advanced cryolipolysis technology to target stubborn fat without surgery or downtime.`,
            `Reshape your silhouette with our ${service.keyword} service. ${location.name} residents discover effective, non-invasive body contouring at Galeo Beauty Salon using FDA-cleared technology that eliminates fat cells permanently.`,
            `Achieve your body goals through our ${service.keyword} treatment at Galeo Beauty Salon. Clients from ${location.name} appreciate our proven approach to reducing stubborn fat deposits without needles, incisions, or recovery time.`,
            `Sculpt your dream physique with our ${service.keyword} service. Galeo Beauty Salon brings advanced body contouring to ${location.name}, helping you target resistant fat areas that diet and exercise can't touch.`,
            `Experience cutting-edge body transformation with our ${service.keyword} treatment. ${location.name} clients trust our salon's state-of-the-art cryolipolysis technology for safe, effective fat reduction with natural-looking results.`,
        ],
        "dermalogica": [
            `Discover the power of professional salon skincare with our ${service.keyword} service. Using Dermalogica's renowned products and techniques at our Hartbeespoort salon, we help clients from ${location.name} achieve their healthiest, most radiant skin.`,
            `Elevate your skincare routine with our ${service.keyword} treatment at Galeo Beauty Salon. ${location.name} residents benefit from Dermalogica's research-backed formulations applied by trained skin health experts.`,
            `Unlock radiant skin through our ${service.keyword} service. Clients from ${location.name} choose Galeo Beauty Salon for personalized Dermalogica treatments that address individual skin concerns with professional-grade products.`,
            `Transform your complexion with our ${service.keyword} treatment. Galeo Beauty Salon delivers advanced Dermalogica facials to ${location.name}, combining cutting-edge ingredients with expert application techniques.`,
            `Experience premium skincare through our ${service.keyword} service at Galeo Beauty Salon. We bring Dermalogica's industry-leading formulations to ${location.name} clients seeking visible improvements in skin health and appearance.`,
        ],
        "qms": [
            `Indulge in medical-grade skincare with our ${service.keyword} treatment at Galeo Beauty Salon. Clients from ${location.name} trust our salon for QMS Medicosmetics' scientifically-formulated solutions that deliver visible anti-aging results.`,
            `Experience pharmaceutical-quality skincare through our ${service.keyword} service. Galeo Beauty Salon brings QMS Medicosmetics' German precision to ${location.name}, offering treatments that combine luxury with clinical effectiveness.`,
            `Discover advanced collagen therapy with our ${service.keyword} treatment. ${location.name} residents choose our salon for QMS's patented formulations that target aging at the cellular level with proven results.`,
            `Rejuvenate your skin with our ${service.keyword} service at Galeo Beauty Salon. We offer ${location.name} clients exclusive access to QMS Medicosmetics' award-winning treatments developed by aesthetic medicine pioneers.`,
            `Unlock youthful radiance through our ${service.keyword} treatment. Galeo Beauty Salon delivers QMS's revolutionary collagen-based skincare to ${location.name}, blending scientific innovation with luxurious pampering.`,
        ],
        "skin-treatments": [
            `Revitalize your skin with our professional ${service.keyword} service at Galeo Beauty Salon. We welcome clients from ${location.name} to experience advanced salon skin treatments that address everything from fine lines to uneven texture.`,
            `Transform your complexion through our ${service.keyword} treatment. ${location.name} residents discover comprehensive skin solutions at Galeo Beauty Salon, where expert analysis meets customized care for optimal results.`,
            `Achieve luminous, healthy skin with our ${service.keyword} service. Galeo Beauty Salon offers ${location.name} clients targeted treatments combining advanced techniques with premium products for visible improvements.`,
            `Restore your skin's natural glow through our ${service.keyword} treatment at Galeo Beauty Salon. Clients from ${location.name} and ${location.region} trust our multi-faceted approach to addressing various skin concerns effectively.`,
            `Experience transformative skin rejuvenation with our ${service.keyword} service. Galeo Beauty Salon brings professional-grade treatments to ${location.name}, tackling aging signs, texture issues, and tone irregularities with proven methods.`,
        ],
        "hair-care": [
            `Give your hair the luxury salon treatment it deserves with our ${service.keyword} service. Clients from ${location.name} choose Galeo Beauty Salon for our premium hair care using Moroccanoil and Milkshake products.`,
            `Transform your tresses with our ${service.keyword} treatment at Galeo Beauty Salon. ${location.name} residents love our nourishing hair services featuring top-tier products that restore shine, strength, and vitality.`,
            `Indulge in superior hair care through our ${service.keyword} service. Galeo Beauty Salon delivers salon excellence to ${location.name} clients with treatments that repair, protect, and beautify every hair type.`,
            `Revitalize your hair with our ${service.keyword} treatment. Clients from ${location.name} discover the difference professional-grade products and expert techniques make at Galeo Beauty Salon's luxurious hair care station.`,
            `Unlock your hair's full potential with our ${service.keyword} service at Galeo Beauty Salon. We pamper ${location.name} clients with premium hair treatments using internationally-acclaimed brands for stunning, healthy results.`,
        ],
        "nails": [
            `Treat yourself to beautiful nails at our beauty salon with our ${service.keyword} service. Whether you're from ${location.name} or anywhere in ${location.region}, our skilled salon nail technicians deliver stunning, long-lasting results.`,
            `Elevate your nail game with our ${service.keyword} treatment at Galeo Beauty Salon. ${location.name} clients appreciate our meticulous attention to detail and creative artistry that transforms nails into beautiful statements.`,
            `Experience luxury nail care through our ${service.keyword} service. Galeo Beauty Salon offers ${location.name} residents impeccable manicures and pedicures using premium products and the latest techniques.`,
            `Pamper your hands and feet with our ${service.keyword} treatment. Clients from ${location.name} trust Galeo Beauty Salon for nail services that combine hygiene excellence, artistic flair, and lasting durability.`,
            `Discover nail perfection with our ${service.keyword} service at Galeo Beauty Salon. We bring professional nail artistry to ${location.name}, creating beautiful, healthy nails that make lasting impressions.`,
        ],
        "lashes-brows": [
            `Frame your face perfectly with our ${service.keyword} treatment at Galeo Beauty Salon. Clients from ${location.name} love our salon's attention to detail and ability to enhance natural beauty through expertly shaped brows and lashes.`,
            `Define your features with our ${service.keyword} service. ${location.name} residents choose Galeo Beauty Salon for precision brow shaping and lash enhancements that beautifully complement facial structure.`,
            `Elevate your eye game through our ${service.keyword} treatment at Galeo Beauty Salon. We help ${location.name} clients achieve perfectly sculpted brows and dramatic lashes that enhance natural beauty effortlessly.`,
            `Transform your look with our ${service.keyword} service. Galeo Beauty Salon brings expert brow and lash artistry to ${location.name}, creating stunning eye frames that open and define your features.`,
            `Discover eye-opening beauty through our ${service.keyword} treatment. Clients from ${location.name} and across ${location.region} trust our salon for brow and lash services that deliver natural-looking yet impactful results.`,
        ],
        "waxing": [
            `Experience smooth, long-lasting hair removal with our ${service.keyword} salon service. We provide ${location.name} residents with comfortable, hygienic waxing treatments at our beauty salon using premium products.`,
            `Achieve silky-smooth skin through our ${service.keyword} treatment at Galeo Beauty Salon. ${location.name} clients appreciate our gentle technique, premium wax formulations, and commitment to your comfort throughout the process.`,
            `Enjoy effortless smoothness with our ${service.keyword} service. Galeo Beauty Salon offers ${location.name} residents professional waxing treatments in a clean, relaxing environment using top-quality products.`,
            `Say goodbye to unwanted hair with our ${service.keyword} treatment. Clients from ${location.name} choose our salon for efficient, comfortable waxing services that leave skin smooth and irritation-free for weeks.`,
            `Experience premium hair removal through our ${service.keyword} service at Galeo Beauty Salon. We bring professional waxing expertise to ${location.name}, ensuring smooth results with minimal discomfort using superior products.`,
        ],
        "tinting": [
            `Enhance your natural features with our professional ${service.keyword} salon service. Clients from ${location.name} appreciate our salon's precise color-matching and long-lasting tinting results.`,
            `Define and intensify with our ${service.keyword} treatment at Galeo Beauty Salon. ${location.name} residents love how our expert tinting services enhance brows and lashes for a polished, maintenance-free look.`,
            `Elevate your features through our ${service.keyword} service. Galeo Beauty Salon offers ${location.name} clients customized tinting solutions that add depth and definition without daily makeup application.`,
            `Achieve effortless definition with our ${service.keyword} treatment. Clients from ${location.name} choose our salon for professional tinting that perfectly complements their coloring and enhances natural beauty.`,
            `Discover low-maintenance beauty through our ${service.keyword} service at Galeo Beauty Salon. We help ${location.name} residents wake up with defined features using safe, long-lasting professional tinting techniques.`,
        ],
    };

    // Use combined hash for location+service variation (different locations get different intros)
    const variations = introVariations[service.categoryId];
    if (variations && variations.length > 0) {
        const hash = hashString(service.slug + location.slug);
        const selectedVariation = variations[hash % variations.length];
        return selectedVariation;
    }

    // Fallback for any missing categories
    return `Looking for a professional ${service.keyword} salon near ${location.name}? Galeo Beauty Salon offers premium ${categoryName.toLowerCase()} treatments that deliver exceptional results. Clients from across ${location.region} trust our beauty salon for quality and care.`;
}

/**
 * Get driving context text based on location region
 */
export function getDrivingContext(location: SEOLocation): string {
    const contexts: Record<string, string> = {
        "Hartbeespoort": "Our salon is just minutes away from your doorstep",
        "North West": "A quick, scenic drive through the countryside to our salon",
        "Johannesburg": "An easy escape from the city to our tranquil Hartbeespoort salon",
        "Pretoria": "A relaxing 45-minute drive to our peaceful salon setting",
        "Centurion": "Our salon is conveniently accessible via the N1 highway",
        "Midrand": "Our salon is perfectly positioned between Johannesburg and Pretoria",
        "East Rand": "Worth the drive to our salon for a day of pampering by the dam",
        "Sedibeng": "A scenic journey to our lakeside salon location",
        "West Rand": "An easy trip along the N14 to our premium beauty salon",
    };

    return contexts[location.region] || "A worthwhile trip to our salon for premium beauty treatments";
}

/**
 * Generate location-specific insights for enhanced uniqueness
 * Returns contextual information about the location's characteristics
 */
export function getLocationInsights(location: SEOLocation): { characteristic: string; clientProfile: string; travelNote: string } {
    // Location-specific characteristics and demographics
    const locationProfiles: Record<string, { characteristic: string; clientProfile: string; travelNote: string }> = {
        // Hartbeespoort Core
        "hartbeespoort": {
            characteristic: "Known for its scenic dam views and vibrant tourism, Hartbeespoort is home to a diverse community that values quality beauty services.",
            clientProfile: "Our Hartbeespoort clients appreciate personalized service and enjoy treating themselves to premium beauty experiences in their own backyard.",
            travelNote: "Located in the heart of Hartbeespoort, our salon is easily accessible from all residential areas, estates, and the main commercial district."
        },
        "harties": {
            characteristic: "As the colloquial name for Hartbeespoort, Harties embodies the relaxed lakeside lifestyle that residents cherish.",
            clientProfile: "Harties residents love the convenience of world-class beauty treatments without leaving their tranquil dam-side community.",
            travelNote: "Whether you're from the estates or the village center, our salon is your neighborhood beauty destination."
        },
        "schoemansville": {
            characteristic: "This historic lakeside village combines old-world charm with modern estate living, creating a sophisticated community atmosphere.",
            clientProfile: "Schoemansville clients value tradition blended with modern luxury, seeking beauty services that match their refined lifestyle.",
            travelNote: "Just a short drive from Schoemansville's waterfront and estates, our salon offers convenient access with ample parking."
        },
        "melodie": {
            characteristic: "A peaceful residential suburb offering tranquil estate living with mountain and dam views.",
            clientProfile: "Melodie residents appreciate the serene environment and seek beauty services that complement their relaxed, nature-oriented lifestyle.",
            travelNote: "Easily accessible from Melodie via the R512, with convenient routes from both the residential areas and smallholdings."
        },
        "ifafi": {
            characteristic: "An exclusive estate known for its architectural beauty and affluent community.",
            clientProfile: "Ifafi residents expect premium service quality and appreciate attention to detail in their beauty treatments.",
            travelNote: "A convenient 10-15 minute drive from Ifafi estate, making regular beauty appointments effortlessly accessible."
        },
        "meerhof": {
            characteristic: "A well-established estate offering secure family living with excellent recreational facilities.",
            clientProfile: "Meerhof clients value reliability, professionalism, and family-friendly service in their beauty salon experience.",
            travelNote: "Quick access from Meerhof via the R512, perfect for scheduling appointments around your active lifestyle."
        },
        "pecanwood": {
            characteristic: "South Africa's premier golf estate combining luxury waterfront living with world-class amenities.",
            clientProfile: "Pecanwood residents expect exceptional quality and personalized attention worthy of their exclusive lifestyle.",
            travelNote: "Approximately 15 minutes from Pecanwood's main entrance, our salon is a convenient beauty destination for estate residents."
        },
        "the-islands-estate": {
            characteristic: "A prestigious canal estate offering Mediterranean-style waterfront living with private boat access.",
            clientProfile: "Islands Estate residents appreciate luxury, exclusivity, and the finest beauty services available in the area.",
            travelNote: "Conveniently located near the Islands Mall, making it easy to combine beauty appointments with shopping or dining."
        },
        "caribbean-beach-club": {
            characteristic: "An upmarket canal estate with a tropical island theme and direct dam access.",
            clientProfile: "Caribbean Beach Club residents enjoy resort-style living and seek beauty services that match their luxurious waterfront lifestyle.",
            travelNote: "Easy access from Caribbean Beach Club, with parking available for your convenience."
        },
        "kosmos": {
            characteristic: "One of Hartbeespoort's original residential areas, known for its tight-knit community and dam proximity.",
            clientProfile: "Kosmos residents value community, quality, and the convenience of local services they can trust.",
            travelNote: "A short, scenic drive from Kosmos along the dam, making regular salon visits easy and enjoyable."
        },
        "xanadu": {
            characteristic: "A nature estate offering wildlife, hiking trails, and eco-conscious living in a secure environment.",
            clientProfile: "Xanadu residents appreciate natural beauty and seek services that align with their health-conscious, outdoor lifestyle.",
            travelNote: "Accessible from Xanadu via the R512, perfect for adding a pampering session to your wellness routine."
        },
        "landsmeer": {
            characteristic: "A modern residential estate offering affordable security living with dam views.",
            clientProfile: "Landsmeer residents seek value-for-money beauty services without compromising on quality or professionalism.",
            travelNote: "Conveniently close to Landsmeer, our salon is your neighborhood destination for professional beauty care."
        },
        "magalies-park": {
            characteristic: "A spacious holiday resort and residential area popular with families and outdoor enthusiasts.",
            clientProfile: "Magalies Park residents balance active outdoor living with self-care, appreciating flexible appointment scheduling.",
            travelNote: "Easy access from Magalies Park, ideal for treating yourself after a day of outdoor activities."
        },
        "broederstroom": {
            characteristic: "A rural area with smallholdings and equestrian properties, offering peaceful country living.",
            clientProfile: "Broederstroom residents appreciate the journey to quality beauty services and value professional expertise.",
            travelNote: "Worth the scenic drive from Broederstroom for premium beauty treatments in a luxurious salon environment."
        },
        "johannesburg": {
            characteristic: "South Africa's economic hub, where busy professionals seek quality beauty services as an essential self-care ritual.",
            clientProfile: "Johannesburg clients appreciate escaping the city bustle for tranquil beauty treatments in Hartbeespoort's peaceful setting.",
            travelNote: "An easy hour's drive from Johannesburg, our salon offers the perfect excuse for a scenic getaway with pampering included."
        },
        "pretoria": {
            characteristic: "The administrative capital with a blend of historical charm and modern suburban development.",
            clientProfile: "Pretoria residents often combine beauty appointments with weekend trips to Hartbeespoort's scenic attractions.",
            travelNote: "A relaxing 45-minute drive from Pretoria makes our salon an ideal destination for a mini beauty retreat."
        },
        "centurion": {
            characteristic: "A modern city between Johannesburg and Pretoria, known for its shopping malls and suburban lifestyle.",
            clientProfile: "Centurion clients appreciate quality and convenience, often booking appointments during Hartbeespoort weekend getaways.",
            travelNote: "Conveniently accessible from Centurion via the N1 and R511, perfect for combining with a day trip to the dam."
        },
    };

    // Get location-specific profile or generate generic one
    const profile = locationProfiles[location.slug];

    if (profile) {
        return profile;
    }

    // Generate dynamic profile based on region for locations not explicitly mapped
    // Expanded to 12 variations each for maximum uniqueness across 270+ non-custom locations
    const hash = hashString(location.slug);
    const characteristicVariations = [
        `${location.name} offers a unique blend of ${location.region} charm and modern convenience, creating an ideal community for quality beauty services.`,
        `Residents of ${location.name} enjoy the benefits of ${location.region} living while having access to premium amenities and services.`,
        `${location.name} is a vibrant part of ${location.region}, where community members value both quality of life and professional service excellence.`,
        `As part of ${location.region}, ${location.name} combines tranquil living with easy access to world-class beauty and wellness services.`,
        `Known for its welcoming atmosphere, ${location.name} in ${location.region} is home to discerning residents who appreciate premium beauty experiences.`,
        `${location.name} stands out in ${location.region} for its community spirit and residents who value self-care and professional grooming.`,
        `The ${location.name} area within ${location.region} attracts beauty-conscious individuals who seek quality treatments from trusted professionals.`,
        `With its distinct ${location.region} character, ${location.name} fosters a community that values wellness, relaxation, and premium services.`,
        `${location.name} represents the best of ${location.region} living, combining accessibility with a clientele that appreciates exceptional beauty care.`,
        `As a growing hub in ${location.region}, ${location.name} residents increasingly seek professional beauty services that match their lifestyle aspirations.`,
        `The unique character of ${location.name} within ${location.region} creates demand for high-quality beauty treatments delivered with expertise.`,
        `${location.name}'s position in ${location.region} makes it a thriving community where residents prioritize professional self-care services.`,
    ];

    const clientProfileVariations = [
        `Our ${location.name} clients appreciate personalized attention and professional beauty services that fit their lifestyle.`,
        `Residents of ${location.name} seek quality beauty treatments delivered with expertise and care.`,
        `${location.name} clients value both convenience and excellence in their beauty service providers.`,
        `Our ${location.name} clientele enjoys treating themselves to premium beauty experiences close to home.`,
        `We've built lasting relationships with ${location.name} residents who return for consistent, high-quality results.`,
        `${location.name} clients trust our expertise and appreciate the personalized approach we bring to every appointment.`,
        `Beauty-conscious ${location.name} residents choose us for our commitment to quality and customer satisfaction.`,
        `Our loyal ${location.name} client base values the professional expertise and welcoming atmosphere we provide.`,
        `${location.name} residents appreciate that we understand their beauty goals and deliver consistently excellent results.`,
        `We're proud to serve ${location.name} clients who recognize the value of investing in professional beauty care.`,
        `${location.name} clients benefit from our tailored approach that considers individual preferences and skin types.`,
        `Our ${location.name} regulars appreciate the combination of skill, quality products, and genuine care we offer.`,
    ];

    const travelNoteVariations = [
        `Easily accessible from ${location.name}, our Hartbeespoort salon welcomes you with convenient parking and flexible scheduling.`,
        `A worthwhile journey from ${location.name} to experience premium beauty services in our tranquil salon setting.`,
        `Conveniently located for ${location.name} residents, making regular beauty appointments effortless and enjoyable.`,
        `Our salon is readily accessible from ${location.name}, offering you quality treatments without extensive travel.`,
        `${location.name} clients find our Hartbeespoort location convenient, with easy road access and ample parking.`,
        `The drive from ${location.name} to our salon is pleasant, and many clients combine visits with exploring Hartbeespoort.`,
        `We welcome ${location.name} visitors to our comfortable salon, conveniently situated for easy access from your area.`,
        `Many ${location.name} clients schedule their beauty appointments during weekend getaways to our scenic location.`,
        `Our central Hartbeespoort location is well-connected to ${location.name}, making beauty appointments hassle-free.`,
        `${location.name} residents enjoy the journey to our salon as part of their self-care experience in beautiful surroundings.`,
        `Accessible routes from ${location.name} make our salon a convenient choice for your regular beauty maintenance.`,
        `Our welcoming Hartbeespoort salon is worth the trip from ${location.name} for unparalleled beauty services.`,
    ];

    return {
        characteristic: characteristicVariations[hash % characteristicVariations.length],
        clientProfile: clientProfileVariations[(hash + 1) % clientProfileVariations.length],
        travelNote: travelNoteVariations[(hash + 2) % travelNoteVariations.length],
    };
}

// ============================================
// DYNAMIC CONTENT GENERATION FOR UNIQUENESS
// ============================================

/**
 * Simple hash function for consistent randomization
 */
function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

/**
 * Get dynamically related services based on current service
 * Returns 5 unique services that are contextually relevant
 */
export function getDynamicRelatedServices(currentServiceSlug: string, count: number = 5): SEOService[] {
    const allServices = getAllSEOServices();
    const currentService = allServices.find(s => s.slug === currentServiceSlug);

    if (!currentService) return [];

    // Get services from same category
    const sameCategoryServices = allServices.filter(
        s => s.categoryId === currentService.categoryId && s.slug !== currentServiceSlug
    );

    // Get complementary services (different category but related)
    const complementaryMap: Record<string, string[]> = {
        "hart-aesthetics": ["dermalogica", "qms", "skin-treatments"],
        "dermalogica": ["qms", "skin-treatments", "hart-aesthetics"],
        "qms": ["dermalogica", "skin-treatments", "hart-aesthetics"],
        "lashes-brows": ["permanent-makeup", "tinting", "waxing"],
        "permanent-makeup": ["lashes-brows", "tinting"],
        "nails": ["waxing", "tinting", "lashes-brows"],
        "waxing": ["nails", "skin-treatments", "lashes-brows"],
        "hair-care": ["nails", "waxing"],
        "fat-freezing": ["slimming", "skin-treatments"],
        "slimming": ["fat-freezing", "skin-treatments"],
        "skin-treatments": ["dermalogica", "qms", "hart-aesthetics"],
        "tinting": ["lashes-brows", "permanent-makeup", "waxing"],
    };

    const complementaryCategories = complementaryMap[currentService.categoryId] || [];
    const complementaryServices = allServices.filter(
        s => complementaryCategories.includes(s.categoryId)
    );

    // Use hash for consistent but varied selection
    const hash = hashString(currentServiceSlug);

    // Combine: 2 from same category, 3 from complementary
    const sameCategoryPicks = sameCategoryServices.slice(hash % sameCategoryServices.length, (hash % sameCategoryServices.length) + 2);
    const complementaryPicks = complementaryServices.slice((hash * 3) % complementaryServices.length, ((hash * 3) % complementaryServices.length) + 3);

    const related = [...sameCategoryPicks, ...complementaryPicks].slice(0, count);

    // Ensure we have enough services
    if (related.length < count) {
        const remaining = allServices
            .filter(s => s.slug !== currentServiceSlug && !related.includes(s))
            .slice(0, count - related.length);
        related.push(...remaining);
    }

    return related;
}

// ============================================
// PHASE 2: SERVICE-SPECIFIC FAQs
// ============================================

export interface FAQ {
    question: string;
    answer: string;
}

/**
 * Generate 3-4 unique FAQs for each service
 * Uses category, subcategory, and service attributes for variety
 */
export function getServiceFAQs(service: SEOService, location: SEOLocation): FAQ[] {
    const drivingContext = getDrivingContext(location);

    // Category-specific FAQ pools — location-aware answers
    const categoryFAQPools: Record<string, FAQ[]> = {
        "hart-aesthetics": [
            {
                question: `How long do ${service.keyword} results last for ${location.name} clients?`,
                answer: `Results from ${service.keyword} typically last 3-6 months, though this varies by individual metabolism and treatment area. ${location.name} clients often schedule follow-up appointments at our Hartbeespoort salon to maintain their desired look.`
            },
            {
                question: `Is ${service.keyword} painful at your salon near ${location.name}?`,
                answer: `Most ${location.name} clients report minimal discomfort during ${service.keyword}. We use fine needles and can apply numbing cream if needed. The sensation is often described as a slight pinch that subsides quickly.`
            },
            {
                question: `When will I see results from ${service.keyword}?`,
                answer: `For ${service.keyword}, initial results appear within 3-5 days, with full results visible at 10-14 days. We invite ${location.name} clients to return for a complimentary 2-week check at our salon to ensure satisfaction.`
            },
            {
                question: `Are there any side effects with ${service.keyword} for first-time clients?`,
                answer: `${service.keyword} is very safe when performed by qualified professionals. Minor temporary side effects may include slight swelling, redness, or bruising at injection sites, typically resolving within 24-48 hours. ${location.name} clients can return home comfortably after treatment.`
            },
            {
                question: `Can I return to work after ${service.keyword} at your Hartbeespoort salon?`,
                answer: `Yes! ${service.keyword} requires no downtime, making it ideal for ${location.name} clients who want results without disrupting their schedule. Any minor redness can be covered with makeup if needed.`
            },
            {
                question: `Who performs ${service.keyword} treatments at Galeo Beauty?`,
                answer: `All ${service.keyword} treatments are administered by qualified medical professionals with extensive training in facial anatomy and aesthetic medicine. ${location.name} clients benefit from the same practitioner consistency across visits.`
            },
        ],
        "fat-freezing": [
            {
                question: `How does ${service.keyword} work at your salon near ${location.name}?`,
                answer: `${service.keyword} uses controlled cooling technology to freeze and eliminate fat cells without surgery. ${location.name} clients see the targeted fat cells crystallize and naturally eliminate over 8-12 weeks.`
            },
            {
                question: `Is ${service.keyword} permanent for clients from ${location.name}?`,
                answer: `Yes! ${service.keyword} permanently eliminates fat cells in treated areas. Once destroyed, fat cells don't regenerate. ${location.name} clients maintain results long-term with a healthy lifestyle.`
            },
            {
                question: `How many ${service.keyword} sessions will I need?`,
                answer: `Most ${location.name} clients see significant results after 1-2 ${service.keyword} sessions per area. During your initial consultation at our Hartbeespoort salon, we'll create a personalized treatment plan tailored to your body goals.`
            },
            {
                question: `What can I expect during ${service.keyword} treatment?`,
                answer: `During ${service.keyword}, you'll feel intense cold for 5-10 minutes as the area numbs. Many ${location.name} clients bring a book or laptop — you can relax during the 35-60 minute session at our comfortable salon.`
            },
            {
                question: `When will I see ${service.keyword} results?`,
                answer: `You may notice changes as early as 3 weeks after ${service.keyword}. Most ${location.name} clients report dramatic results at 8-12 weeks as the body naturally eliminates destroyed fat cells.`
            },
            {
                question: `Is there downtime after ${service.keyword} for ${location.name} clients?`,
                answer: `${service.keyword} requires no downtime. You might experience temporary numbness or mild tenderness. ${location.name} clients drive home comfortably and return to normal activities immediately.`
            },
        ],
        "dermalogica": [
            {
                question: `What makes ${service.keyword} different from regular facials near ${location.name}?`,
                answer: `${service.keyword} uses professional-grade Dermalogica products and Face Mapping® skin analysis technology. Unlike generic facials, we customize each treatment for ${location.name} clients based on their unique skin concerns.`
            },
            {
                question: `How often should ${location.name} clients get ${service.keyword}?`,
                answer: `For optimal results, we recommend ${service.keyword} every 4-6 weeks. This aligns with your skin's natural renewal cycle. Many ${location.name} clients schedule their next appointment before leaving our salon.`
            },
            {
                question: `Can ${service.keyword} help with acne for clients in ${location.region}?`,
                answer: `Yes! ${service.keyword} can significantly improve acne-prone skin. ${location.region}'s climate can affect skin health, and we use Dermalogica products formulated to clear breakouts and prevent future blemishes.`
            },
            {
                question: `Will ${service.keyword} work for my sensitive skin?`,
                answer: `Absolutely! ${service.keyword} is suitable for sensitive skin. Dermalogica products are free from common irritants. We customize every treatment for ${location.name} clients based on individual skin tolerance.`
            },
            {
                question: `What should I do after ${service.keyword} at your salon?`,
                answer: `After ${service.keyword}, avoid harsh products for 24 hours, use SPF 30+ daily (especially important in ${location.region}'s sun), and follow the homecare recommendations we provide.`
            },
        ],
        "qms": [
            {
                question: `What is QMS Medicosmetics used in ${service.keyword}?`,
                answer: `QMS Medicosmetics is medical-grade German skincare featuring patented Oxygen Complex and collagen-boosting formulations. ${location.name} clients benefit from pharmaceutical-quality ingredients delivering clinical anti-aging results.`
            },
            {
                question: `How quickly will ${location.name} clients see results from ${service.keyword}?`,
                answer: `Many ${location.name} clients notice immediate radiance after ${service.keyword}. Cumulative benefits like reduced fine lines and improved firmness become more pronounced over 6-12 weeks with regular visits to our salon.`
            },
            {
                question: `Is ${service.keyword} suitable for mature skin?`,
                answer: `${service.keyword} is ideal for mature skin! QMS's collagen-stimulating formulations target aging concerns like loss of elasticity and deep wrinkles. Many ${location.name} clients in their 40s-60s see remarkable improvements.`
            },
            {
                question: `Can ${location.name} clients combine ${service.keyword} with other treatments?`,
                answer: `Yes! ${service.keyword} complements injectable treatments beautifully. Many ${location.name} clients pair QMS facials with aesthetic services for comprehensive results. Consult with us for an integrated approach.`
            },
        ],
        "skin-treatments": [
            {
                question: `What skin concerns does ${service.keyword} address for ${location.name} clients?`,
                answer: `${service.keyword} effectively treats fine lines, pigmentation, acne scarring, uneven texture, and dullness. We customize each treatment for ${location.name} clients based on their specific concerns and skin type.`
            },
            {
                question: `Is ${service.keyword} safe for all skin types in ${location.region}?`,
                answer: `Yes! ${service.keyword} is suitable for all Fitzpatrick skin types. We adjust treatment parameters based on your skin tone and sensitivity, important for ${location.region}'s diverse population.`
            },
            {
                question: `How many ${service.keyword} sessions do ${location.name} clients need?`,
                answer: `Most ${location.name} clients need 3-6 ${service.keyword} sessions spaced 2-4 weeks apart. During consultation at our Hartbeespoort salon, we'll create a personalized treatment plan based on your skin goals.`
            },
            {
                question: `Will ${service.keyword} hurt?`,
                answer: `${service.keyword} typically involves minimal discomfort. You may feel warmth or mild tingling. We adjust intensity levels for each ${location.name} client's comfort throughout the treatment.`
            },
            {
                question: `What's the recovery time for ${service.keyword}?`,
                answer: `${service.keyword} usually involves minimal downtime. You might experience temporary redness for 30 minutes to 24 hours. ${location.name} clients typically apply makeup and resume activities the next day.`
            },
        ],
        "hair-care": [
            {
                question: `What products are used in ${service.keyword} at your salon near ${location.name}?`,
                answer: `${service.keyword} features premium Moroccanoil and Milkshake products enriched with argan oil and natural ingredients. All products are sulfate-free and paraben-free, protecting ${location.name} clients' hair health.`
            },
            {
                question: `How often should ${location.name} clients get ${service.keyword}?`,
                answer: `For maintaining healthy hair, we recommend ${service.keyword} every 6-8 weeks. ${location.name} clients can schedule standing appointments at our salon for consistent hair maintenance.`
            },
            {
                question: `Will ${service.keyword} damage my hair?`,
                answer: `No! ${service.keyword} is designed to improve hair health. We use nourishing products and professional techniques. ${location.name} clients consistently see healthier, more vibrant hair after treatment.`
            },
            {
                question: `Can ${service.keyword} help with damaged hair from ${location.region}'s climate?`,
                answer: `Absolutely! ${service.keyword} includes intensive repair treatments that restore moisture and strengthen hair bonds. ${location.region}'s sun and dry air can affect hair health, making regular treatments beneficial.`
            },
        ],
        "nails": [
            {
                question: `How long does ${service.keyword} last for ${location.name} clients?`,
                answer: `${service.keyword} typically lasts 2-3 weeks for gel polish and 3-4 weeks for acrylics with proper care. ${location.name} clients love the durability of our professional-grade products.`
            },
            {
                question: `Is ${service.keyword} safe for my natural nails?`,
                answer: `Yes! ${service.keyword} is performed using proper techniques and quality products that minimize damage. We include cuticle care for every ${location.name} client to keep natural nails strong.`
            },
            {
                question: `Do you do custom nail art for ${location.name} clients?`,
                answer: `Absolutely! ${service.keyword} can include custom nail art designs. Our skilled technicians create everything from minimalist accents to intricate patterns. ${location.name} clients share their vision during appointments.`
            },
            {
                question: `How should I maintain ${service.keyword} results between salon visits?`,
                answer: `To extend ${service.keyword} results, moisturize cuticles daily, wear gloves for household tasks, and avoid using nails as tools. ${location.name} clients typically book touch-ups every 2-3 weeks.`
            },
        ],
        "lashes-brows": [
            {
                question: `How long does ${service.keyword} take at your salon near ${location.name}?`,
                answer: `${service.keyword} typically takes 15-60 minutes depending on the service. Lash extensions take 90-120 minutes for full sets. ${location.name} clients can plan their visit accordingly.`
            },
            {
                question: `How long do ${service.keyword} results last?`,
                answer: `${service.keyword} longevity varies: lash extensions last 3-4 weeks, tints 4-6 weeks, and lash lifts 6-8 weeks. ${location.name} clients schedule maintenance appointments to keep their look fresh.`
            },
            {
                question: `Will ${service.keyword} damage my natural lashes or brows?`,
                answer: `When done professionally, ${service.keyword} won't damage your natural features. We use high-quality products and proper techniques that ${location.name} clients trust for safe, beautiful results.`
            },
            {
                question: `Is ${service.keyword} suitable for sensitive eyes?`,
                answer: `Yes! ${service.keyword} can be performed on sensitive eyes. We use hypoallergenic products and offer patch testing for ${location.name} clients with any sensitivities.`
            },
            {
                question: `What's the aftercare for ${service.keyword}?`,
                answer: `After ${service.keyword}, avoid water for 24 hours, skip oil-based products near eyes, and brush lashes gently daily. We provide ${location.name} clients with detailed aftercare instructions at each visit.`
            },
        ],
        "waxing": [
            {
                question: `How long does ${service.keyword} take at your Hartbeespoort salon?`,
                answer: `${service.keyword} duration varies: facial areas take 10-15 minutes, legs 30-45 minutes, and full body up to 90 minutes. ${location.name} clients appreciate our efficient yet thorough approach.`
            },
            {
                question: `Is ${service.keyword} painful for first-time clients from ${location.name}?`,
                answer: `${service.keyword} involves brief discomfort, but we use premium wax formulated for sensitive skin. First-time ${location.name} clients often find it more tolerable than expected.`
            },
            {
                question: `How long will ${service.keyword} results last?`,
                answer: `${service.keyword} keeps skin smooth for 3-6 weeks depending on your hair growth cycle. Regular ${location.name} clients notice finer regrowth and longer-lasting smoothness over time.`
            },
            {
                question: `What should ${location.name} clients do before ${service.keyword}?`,
                answer: `Before ${service.keyword}, let hair grow to 1/4 inch, exfoliate 24 hours prior, and avoid sun exposure and retinol products. Arrive at our salon with clean, dry skin for best results.`
            },
            {
                question: `Can I wax during pregnancy?`,
                answer: `Most ${service.keyword} services are safe during pregnancy, though skin may be more sensitive. ${location.name} clients should consult their doctor first and inform our therapist so we can adjust our approach.`
            },
        ],
        "tinting": [
            {
                question: `How long does ${service.keyword} last for ${location.name} clients?`,
                answer: `${service.keyword} typically lasts 4-6 weeks depending on your hair growth cycle, sun exposure in ${location.region}, and skincare routine. We recommend avoiding oil-based products near treated areas.`
            },
            {
                question: `Will ${service.keyword} look natural?`,
                answer: `Yes! ${service.keyword} enhances your natural features subtly. We custom-match the color to your hair, skin tone, and preferences so ${location.name} clients leave with a flattering, natural result.`
            },
            {
                question: `Is ${service.keyword} safe?`,
                answer: `${service.keyword} uses salon-grade professional tints that are safe when applied correctly. We perform patch testing 24-48 hours before your appointment. ${location.name} clients can schedule their patch test separately.`
            },
            {
                question: `Can I still wear makeup after ${service.keyword}?`,
                answer: `Absolutely! Many ${location.name} clients love ${service.keyword} because it reduces daily makeup time. You can wear makeup over tinted areas, but many find they don't need to anymore.`
            },
        ],
    };

    // Location-specific FAQs — unique per location, always included
    const locationFAQs: FAQ[] = [
        {
            question: `How do I get to Galeo Beauty from ${location.name}?`,
            answer: `${drivingContext}. Our Hartbeespoort salon is easily accessible from ${location.name}, ${location.region}. We have ample parking and welcome walk-in ${service.keyword} appointments when available.`
        },
        {
            question: `Do you serve ${location.name} clients for ${service.keyword}?`,
            answer: `Yes! We welcome ${service.keyword} clients from ${location.name} and throughout ${location.region}. Many of our regular clients travel from ${location.name} for our professional treatments and personal service.`
        },
    ];

    // Universal FAQs with location context
    const universalFAQs: FAQ[] = [
        {
            question: `How do I book ${service.keyword} from ${location.name}?`,
            answer: `Booking ${service.keyword} is easy! Contact us via WhatsApp to schedule your appointment at our Hartbeespoort salon. ${service.keyword} is priced at ${service.price}. ${location.name} clients can also call us directly.`
        },
        {
            question: `Do you offer consultations for ${service.keyword} for ${location.name} residents?`,
            answer: `Yes! We offer complimentary ${service.keyword} consultations for ${location.name} clients. This allows us to assess your needs, discuss expectations, and create a personalized treatment plan.`
        },
    ];

    // Get category-specific FAQs
    const categoryFAQs = categoryFAQPools[service.categoryId] || [];

    // Use combined hash for location+service variation
    const hash = hashString(service.slug + location.slug);

    // Select 3 category FAQs using hash (different per location)
    const selectedCategoryFAQs: FAQ[] = [];
    const usedIndices = new Set<number>();
    for (let i = 0; i < 3 && selectedCategoryFAQs.length < 3 && categoryFAQs.length > 0; i++) {
        const index = (hash + i * 7) % categoryFAQs.length;
        if (!usedIndices.has(index)) {
            selectedCategoryFAQs.push(categoryFAQs[index]);
            usedIndices.add(index);
        }
    }

    // Select 1 location FAQ
    const selectedLocationFAQ = locationFAQs[hash % locationFAQs.length];

    // Select 1 universal FAQ
    const selectedUniversalFAQ = universalFAQs[(hash + 3) % universalFAQs.length];

    // Combine: 3 category + 1 location + 1 universal = 5 FAQs
    return [...selectedCategoryFAQs, selectedLocationFAQ, selectedUniversalFAQ];
}

// ============================================
// PHASE 2: TREATMENT PROCESS DESCRIPTIONS
// ============================================

export interface TreatmentStep {
    step: number;
    title: string;
    description: string;
    duration?: string;
}

/**
 * Generate treatment process "What to Expect" content
 * Returns 4-5 steps unique to each service
 */
export function getTreatmentProcess(service: SEOService, location: SEOLocation): TreatmentStep[] {
    // Category-specific treatment processes
    const processTemplates: Record<string, TreatmentStep[]> = {
        "hart-aesthetics": [
            {
                step: 1,
                title: "Consultation & Assessment",
                description: `Your ${service.keyword} journey begins with a thorough consultation. We discuss your aesthetic goals, assess your facial structure, and determine the best approach for natural-looking results.`,
                duration: "10-15 min"
            },
            {
                step: 2,
                title: "Treatment Planning & Numbing",
                description: `We mark treatment areas and apply numbing cream if needed. Photos are taken for before/after comparison, and we review the treatment plan one final time.`,
                duration: "10 min"
            },
            {
                step: 3,
                title: `${service.keyword} Treatment`,
                description: `Using precise injection techniques, our medical professional administers the treatment. You'll feel slight pinching sensations, but most clients find it very tolerable. We work carefully to ensure optimal placement and dosing.`,
                duration: service.duration || "20-30 min"
            },
            {
                step: 4,
                title: "Post-Treatment Care",
                description: `We apply ice if needed and provide detailed aftercare instructions. You can return to normal activities immediately, though we recommend avoiding exercise for 24 hours.`,
                duration: "5 min"
            },
            {
                step: 5,
                title: "Follow-Up & Touch-Ups",
                description: `We schedule a 2-week follow-up to assess results and perform any minor adjustments if needed. Most clients see full results within 10-14 days.`,
                duration: "Optional"
            },
        ],
        "fat-freezing": [
            {
                step: 1,
                title: "Body Assessment",
                description: `We begin your ${service.keyword} session by assessing the treatment area, measuring pinchable fat, and discussing your body contouring goals. Photos are taken for comparison.`,
                duration: "10 min"
            },
            {
                step: 2,
                title: "Area Preparation",
                description: `The treatment area is marked and a protective gel pad is applied to protect your skin. We position the applicator for optimal coverage of stubborn fat deposits.`,
                duration: "5-10 min"
            },
            {
                step: 3,
                title: `${service.keyword} Treatment`,
                description: `The cooling applicator is applied, creating suction. You'll feel intense cold for 5-10 minutes as the area numbs. Most clients read, work, or relax during this comfortable phase.`,
                duration: service.duration || "35-60 min"
            },
            {
                step: 4,
                title: "Massage & Completion",
                description: `After treatment, we massage the area vigorously for 2-3 minutes. This helps break up crystallized fat cells and improves results by up to 75%. Some temporary redness and numbness are normal.`,
                duration: "5 min"
            },
            {
                step: 5,
                title: "Recovery & Results",
                description: `No downtime! Resume normal activities immediately. You'll notice gradual changes over 4-12 weeks as your body naturally eliminates destroyed fat cells. Results are permanent with healthy lifestyle maintenance.`,
                duration: "Ongoing"
            },
        ],
        "dermalogica": [
            {
                step: 1,
                title: "Face Mapping® Analysis",
                description: `Your ${service.keyword} experience starts with Dermalogica's signature Face Mapping® skin analysis. We assess 14 zones to identify concerns and create your customized treatment plan.`,
                duration: "10 min"
            },
            {
                step: 2,
                title: "Double Cleanse",
                description: `We begin with Dermalogica's professional double cleanse technique to remove makeup, sunscreen, and impurities, preparing your skin for maximum product penetration.`,
                duration: "5 min"
            },
            {
                step: 3,
                title: "Exfoliation & Treatment",
                description: `Your ${service.keyword} includes customized exfoliation, targeted serums, and advanced techniques tailored to your skin concerns. This is where transformation happens.`,
                duration: service.duration || "30-40 min"
            },
            {
                step: 4,
                title: "Massage & Masque",
                description: `Enjoy a relaxing facial massage followed by a customized treatment masque. This boosts circulation, promotes lymphatic drainage, and allows active ingredients to deeply penetrate.`,
                duration: "15-20 min"
            },
            {
                step: 5,
                title: "Protection & Homecare",
                description: `We finish with hydration, SPF protection, and personalized product recommendations to maintain your ${service.keyword} results at home. Your skin glows immediately!`,
                duration: "5 min"
            },
        ],
        "qms": [
            {
                step: 1,
                title: "Skin Consultation",
                description: `We analyze your skin type, assess aging concerns, and determine which QMS Medicosmetics formulations will deliver the best results for your ${service.keyword} treatment.`,
                duration: "10 min"
            },
            {
                step: 2,
                title: "Deep Cleansing",
                description: `Your skin is thoroughly cleansed using QMS's medical-grade cleansers to remove impurities and prepare for optimal product absorption during ${service.keyword}.`,
                duration: "5 min"
            },
            {
                step: 3,
                title: "Active Treatment",
                description: `QMS's patented collagen-boosting formulations are applied with professional massage techniques. The ${service.keyword} system delivers concentrated active ingredients for immediate and cumulative anti-aging benefits.`,
                duration: service.duration || "45-60 min"
            },
            {
                step: 4,
                title: "Collagen Mask",
                description: `A signature QMS collagen mask is applied, infusing skin with hydration and firming actives. Many clients experience visible lifting and plumping during this step.`,
                duration: "15-20 min"
            },
            {
                step: 5,
                title: "Sealing & Results",
                description: `Treatment is sealed with QMS's Oxygen Complex for enhanced penetration. You'll see immediate radiance, with continued improvement over the following weeks as collagen production increases.`,
                duration: "5 min"
            },
        ],
        "skin-treatments": [
            {
                step: 1,
                title: "Skin Analysis",
                description: `Your ${service.keyword} begins with comprehensive skin analysis. We assess your concerns, discuss treatment goals, and explain how the technology will address your specific issues.`,
                duration: "10 min"
            },
            {
                step: 2,
                title: "Skin Preparation",
                description: `We cleanse and prepare your skin, removing any makeup, oils, or impurities. Protective eyewear may be provided, and treatment parameters are customized for your skin type.`,
                duration: "5-10 min"
            },
            {
                step: 3,
                title: `${service.keyword} Treatment`,
                description: `The treatment is performed with precision, targeting your specific concerns. You may feel warmth, tingling, or mild sensation depending on the technology used. We adjust intensity for your comfort throughout.`,
                duration: service.duration || "20-45 min"
            },
            {
                step: 4,
                title: "Cooling & Calming",
                description: `Post-treatment soothing products are applied to calm and hydrate skin. Any temporary redness usually subsides within hours, revealing smoother, brighter skin underneath.`,
                duration: "10 min"
            },
            {
                step: 5,
                title: "Aftercare & Series Planning",
                description: `We provide detailed aftercare instructions and discuss your treatment series. Most ${service.keyword} protocols require 3-6 sessions for optimal cumulative results.`,
                duration: "5 min"
            },
        ],
        "hair-care": [
            {
                step: 1,
                title: "Hair Consultation",
                description: `Your ${service.keyword} starts with a thorough hair consultation. We discuss your hair goals, assess current condition, and recommend the best products and techniques for your hair type.`,
                duration: "10 min"
            },
            {
                step: 2,
                title: "Cleansing & Scalp Care",
                description: `We begin with premium Moroccanoil or Milkshake shampoo customized for your hair needs. Scalp massage promotes circulation and relaxation while removing buildup.`,
                duration: "10 min"
            },
            {
                step: 3,
                title: `${service.keyword} Application`,
                description: `Your specific ${service.keyword} service is performed using professional techniques and premium products. Whether it's color, treatment, or styling, we ensure even application and optimal processing.`,
                duration: service.duration || "45-90 min"
            },
            {
                step: 4,
                title: "Conditioning & Treatment",
                description: `Deep conditioning treatments are applied to nourish, repair, and protect your hair. This step ensures your ${service.keyword} results last longer and hair remains healthy.`,
                duration: "10-15 min"
            },
            {
                step: 5,
                title: "Styling & Finishing",
                description: `Your hair is styled to perfection using professional techniques. We provide product recommendations and styling tips to maintain your beautiful ${service.keyword} results at home.`,
                duration: "20-30 min"
            },
        ],
        "nails": [
            {
                step: 1,
                title: "Consultation & Soaking",
                description: `Your ${service.keyword} begins with discussing your desired look and nail health assessment. Hands or feet are soaked in warm, aromatic water to soften cuticles and relax.`,
                duration: "10 min"
            },
            {
                step: 2,
                title: "Shaping & Cuticle Care",
                description: `Nails are expertly filed and shaped to your preferred length and style. Cuticles are gently pushed back and cleaned, creating the perfect canvas for ${service.keyword}.`,
                duration: "10-15 min"
            },
            {
                step: 3,
                title: `${service.keyword} Application`,
                description: `Your chosen nail service is applied with precision. Whether gel, acrylic, or polish, we ensure even coverage, clean edges, and professional finish that lasts.`,
                duration: service.duration || "30-45 min"
            },
            {
                step: 4,
                title: "Nail Art & Design",
                description: `If you've chosen nail art, your custom design is created. From simple accents to intricate patterns, our skilled technicians bring your vision to life.`,
                duration: "15-30 min (optional)"
            },
            {
                step: 5,
                title: "Hydration & Finishing",
                description: `Treatment concludes with cuticle oil and hand or foot massage. We provide care tips to extend your ${service.keyword} results and maintain nail health.`,
                duration: "5 min"
            },
        ],
        "lashes-brows": [
            {
                step: 1,
                title: "Consultation & Mapping",
                description: `Your ${service.keyword} starts with discussing your desired look. For brows, we map the ideal shape for your face structure. For lashes, we determine the best length, curl, and volume.`,
                duration: "10 min"
            },
            {
                step: 2,
                title: "Preparation & Protection",
                description: `The eye area is cleansed and prepared. Protective pads are applied, and we ensure you're comfortable for your ${service.keyword} service.`,
                duration: "5 min"
            },
            {
                step: 3,
                title: `${service.keyword} Application`,
                description: `Your treatment is performed with meticulous attention to detail. Whether shaping brows, applying extensions, or performing lifts and tints, precision is our priority.`,
                duration: service.duration || "30-90 min"
            },
            {
                step: 4,
                title: "Finishing Touches",
                description: `We perfect the look, ensuring symmetry and your complete satisfaction. Any adjustments are made before you review the final result.`,
                duration: "10 min"
            },
            {
                step: 5,
                title: "Aftercare Education",
                description: `Detailed aftercare instructions are provided to protect your ${service.keyword} investment. We discuss maintenance schedules and book your next appointment.`,
                duration: "5 min"
            },
        ],
        "waxing": [
            {
                step: 1,
                title: "Consultation & Preparation",
                description: `Your ${service.keyword} begins with a brief consultation about any sensitivities. The treatment area is cleansed and sanitized, ensuring a hygienic experience.`,
                duration: "5 min"
            },
            {
                step: 2,
                title: "Pre-Wax Application",
                description: `Pre-wax oil or powder is applied to protect your skin and ensure wax adheres only to hair, not skin. This minimizes discomfort during ${service.keyword}.`,
                duration: "2-3 min"
            },
            {
                step: 3,
                title: `${service.keyword} Treatment`,
                description: `Premium wax is applied and removed efficiently using proper technique. We work systematically through treatment areas, ensuring thorough hair removal with minimal discomfort.`,
                duration: service.duration || "15-45 min"
            },
            {
                step: 4,
                title: "Soothing & Finishing",
                description: `Post-wax serum is applied to calm skin, prevent ingrown hairs, and reduce redness. Any remaining wax residue is removed, leaving skin smooth and comfortable.`,
                duration: "5 min"
            },
            {
                step: 5,
                title: "Aftercare Advice",
                description: `We provide aftercare tips to extend your ${service.keyword} results and prevent ingrown hairs. You'll enjoy smooth skin for 3-6 weeks!`,
                duration: "2 min"
            },
        ],
        "tinting": [
            {
                step: 1,
                title: "Consultation & Patch Test",
                description: `We discuss your desired ${service.keyword} color and ensure patch testing was completed 24-48 hours prior. The eye area is cleansed and prepared for treatment.`,
                duration: "5 min"
            },
            {
                step: 2,
                title: "Protection & Setup",
                description: `Protective pads are positioned under eyes, and petroleum jelly creates a barrier to protect skin from tint during ${service.keyword}.`,
                duration: "3 min"
            },
            {
                step: 3,
                title: "Tint Application",
                description: `Professional-grade tint is carefully applied to each lash or brow hair. We ensure even coverage and saturation for uniform, natural-looking ${service.keyword} results.`,
                duration: service.duration || "10-15 min"
            },
            {
                step: 4,
                title: "Processing Time",
                description: `Tint is left to develop for the optimal time based on your desired depth. You relax while the color sets, creating long-lasting ${service.keyword} results.`,
                duration: "5-10 min"
            },
            {
                step: 5,
                title: "Removal & Reveal",
                description: `Tint is gently removed, revealing beautifully defined features. We shape brows if needed and provide care tips to maintain your ${service.keyword} color for 4-6 weeks.`,
                duration: "5 min"
            },
        ],
    };

    // Get category-specific process or return generic one
    const categoryProcess = processTemplates[service.categoryId];

    if (categoryProcess) {
        // Use combined hash for location+service variation
        const hash = hashString(service.slug + location.slug);

        // Location-aware variation pools
        const consultationVariations = [
            `${location.name} clients begin their ${service.keyword} journey with a thorough assessment of their unique needs and desired outcomes.`,
            `We start by listening to your goals and crafting a personalized ${service.keyword} approach for ${location.name} clients.`,
            `For ${location.name} residents, we take extra time to discuss lifestyle factors and desired ${service.keyword} outcomes.`,
            `Your consultation includes discussing how ${location.region}'s environment may affect your ${service.keyword} results.`,
        ];

        const prepVariations = [
            `Your comfort is paramount as we prepare for your ${service.keyword} session at our Hartbeespoort salon.`,
            `We ensure everything is perfectly ready for ${location.name} clients before beginning treatment.`,
            `Careful preparation sets the stage for excellent ${service.keyword} results for every ${location.name} client.`,
            `${location.name} clients appreciate our meticulous preparation process before ${service.keyword}.`,
        ];

        const aftercareVariations = [
            `We provide ${location.name} clients with personalized guidance to maximize their ${service.keyword} results.`,
            `Proper aftercare is essential — we equip ${location.name} clients with everything they need to maintain results.`,
            `Your ${service.keyword} journey continues at home in ${location.name} with our tailored aftercare plan.`,
            `${location.name} clients receive detailed aftercare instructions customized for their lifestyle.`,
        ];

        // Clone and modify steps with location-specific text
        const modifiedProcess = categoryProcess.map((step, index) => {
            const newStep = { ...step };

            // Vary consultation step (usually step 1)
            if (index === 0 && step.title.toLowerCase().includes('consult')) {
                const variation = consultationVariations[hash % consultationVariations.length];
                newStep.description = step.description + ` ${variation}`;
            }

            // Vary preparation step (usually step 2)
            if (index === 1 && (step.title.toLowerCase().includes('prep') || step.title.toLowerCase().includes('planning'))) {
                const variation = prepVariations[(hash + 1) % prepVariations.length];
                newStep.description = step.description + ` ${variation}`;
            }

            // Vary aftercare step (usually last step)
            if (index === categoryProcess.length - 1 && (step.title.toLowerCase().includes('aftercare') || step.title.toLowerCase().includes('follow'))) {
                const variation = aftercareVariations[(hash + 2) % aftercareVariations.length];
                newStep.description = step.description + ` ${variation}`;
            }

            return newStep;
        });

        return modifiedProcess;
    }

    // Fallback generic process with location-aware variations
    const hash = hashString(service.slug + location.slug);

    const genericConsultVariations = [
        `Your ${service.keyword} experience begins with a thorough consultation at our Hartbeespoort salon, creating a personalized treatment plan for ${location.name} clients.`,
        `We start with a detailed discussion about your ${service.keyword} expectations, tailored specifically for ${location.name} residents.`,
        `Every great ${service.keyword} result starts with understanding you—${location.name} clients appreciate our personalized approach.`,
    ];

    const genericPrepVariations = [
        `We prepare the treatment area and ensure ${location.name} clients are comfortable before beginning ${service.keyword}.`,
        `Proper preparation is key—we ensure optimal conditions for your ${service.keyword} treatment at our salon.`,
        `Your comfort matters. We carefully prepare everything needed for your ${service.keyword} session, as ${location.name} clients expect.`,
    ];

    const genericTreatmentVariations = [
        `Your ${service.keyword} treatment is performed with precision and care, using premium products that ${location.name} clients trust.`,
        `Expert hands deliver your ${service.keyword} service using proven methods and quality products at our Hartbeespoort salon.`,
        `We perform ${service.keyword} with meticulous attention to detail, a standard ${location.name} clients have come to expect.`,
    ];

    const genericFinishVariations = [
        `We complete your ${service.keyword} with finishing touches and soothing products. ${location.name} clients leave our salon feeling refreshed.`,
        `The finishing phase ensures your ${service.keyword} results look polished. Many ${location.name} clients extend their visit for additional pampering.`,
        `Final touches are applied to perfect your ${service.keyword} outcome, ensuring ${location.name} clients see lasting results.`,
    ];

    const genericAftercareVariations = [
        `Detailed aftercare instructions help ${location.name} clients maintain their beautiful ${service.keyword} results for as long as possible.`,
        `We equip ${location.name} clients with aftercare knowledge so your ${service.keyword} results last and you feel confident at home.`,
        `Your ${service.keyword} success continues at home in ${location.name}—we'll explain exactly how to protect and prolong your results.`,
    ];

    return [
        {
            step: 1,
            title: "Consultation",
            description: genericConsultVariations[hash % genericConsultVariations.length],
            duration: "10 min"
        },
        {
            step: 2,
            title: "Preparation",
            description: genericPrepVariations[(hash + 1) % genericPrepVariations.length],
            duration: "5-10 min"
        },
        {
            step: 3,
            title: "Treatment",
            description: genericTreatmentVariations[(hash + 2) % genericTreatmentVariations.length],
            duration: service.duration || "30-60 min"
        },
        {
            step: 4,
            title: "Finishing",
            description: genericFinishVariations[(hash + 3) % genericFinishVariations.length],
            duration: "5-10 min"
        },
        {
            step: 5,
            title: "Aftercare",
            description: genericAftercareVariations[(hash + 4) % genericAftercareVariations.length],
            duration: "5 min"
        },
    ];
}

// ============================================
// PHASE 2: LOCATION + SERVICE INSIGHTS
// ============================================

/**
 * Generate unique insights for specific location+service combinations
 * Creates ultra-specific content based on service+location pairing
 */
export function getLocationServiceInsight(service: SEOService, location: SEOLocation): string {
    // Hash both service and location for unique but consistent content
    const combinedHash = hashString(service.slug + location.slug);

    // Determine location type
    const luxuryKeywords = ['estate', 'pecanwood', 'islands', 'caribbean', 'xanadu', 'ifafi', 'kosmos', 'cove', 'camargue', 'redstone', 'birdwood'];
    const isLuxuryEstate = luxuryKeywords.some(keyword => location.slug.includes(keyword));
    const urbanAreas = ['johannesburg', 'pretoria', 'centurion', 'midrand', 'sandton', 'fourways', 'randburg', 'boksburg', 'germiston', 'bedfordview', 'edenvale', 'roodepoort', 'krugersdorp', 'kempton-park', 'benoni'];
    const isUrban = urbanAreas.some(area => location.slug.includes(area));
    const isLocal = location.region === 'Hartbeespoort' || location.region === 'North West';

    // Category-specific insight templates per location type
    const categoryInsights: Record<string, Record<string, string[]>> = {
        "hart-aesthetics": {
            luxury: [
                `${location.name} estate residents value the privacy and discretion our salon offers for ${service.keyword}, with many scheduling treatments for special occasions and regular maintenance.`,
                `Discerning ${location.name} clients choose our ${service.keyword} service for its combination of medical precision and the relaxed, private atmosphere our Hartbeespoort salon provides.`,
                `Many ${location.name} residents pair their ${service.keyword} appointment with a scenic drive along the dam, making beauty treatments part of their lifestyle routine.`,
            ],
            urban: [
                `${location.name} professionals escape the city for ${service.keyword} at our tranquil Hartbeespoort salon, where quality aesthetic treatments meet a peaceful, unhurried atmosphere.`,
                `Busy ${location.name} clients find our ${service.keyword} service worth the drive—they get city-quality results in a relaxing lakeside setting away from urban congestion.`,
                `Many ${location.name} clients schedule ${service.keyword} as part of a weekend Hartbeespoort getaway, combining aesthetic care with leisure time by the dam.`,
            ],
            local: [
                `${location.name} locals appreciate having expert ${service.keyword} treatments available in their own community without traveling to Johannesburg or Pretoria.`,
                `As your neighbourhood salon, we provide ${location.name} residents with the same ${service.keyword} quality you'd find at premium city clinics, at more affordable prices.`,
                `${location.name} residents trust our ${service.keyword} practitioners for consistent, natural-looking results that enhance their Hartbeespoort lifestyle.`,
            ],
        },
        "fat-freezing": {
            luxury: [
                `${location.name} residents preparing for pool season or special events choose ${service.keyword} at our salon for targeted body contouring in a luxurious, private setting.`,
                `Active ${location.name} estate residents complement their fitness routines with ${service.keyword} to target those last stubborn areas that exercise alone can't address.`,
            ],
            urban: [
                `Fitness-focused ${location.name} clients use ${service.keyword} to complement their gym routines, targeting stubborn fat deposits that resist even dedicated exercise programs.`,
                `${location.name} professionals appreciate the zero-downtime nature of ${service.keyword}—they can drive back to the city and resume their schedule immediately after treatment.`,
            ],
            local: [
                `${location.name} residents love that they can access professional ${service.keyword} treatments locally without traveling to expensive Johannesburg clinics.`,
                `Our ${service.keyword} service has helped many ${location.name} residents achieve their body confidence goals right here in the Hartbeespoort area.`,
            ],
        },
        "dermalogica": {
            luxury: [
                `${location.name} estate residents make ${service.keyword} facials a regular part of their self-care routine, appreciating the medical-grade skincare in our serene environment.`,
                `Many ${location.name} clients book monthly ${service.keyword} sessions, treating it as an investment in their skin health that complements their premium lifestyle.`,
            ],
            urban: [
                `${location.name} clients use their ${service.keyword} appointment as a peaceful escape from city life, combining professional skincare with the restorative atmosphere of Hartbeespoort.`,
                `Busy ${location.name} professionals find that regular ${service.keyword} treatments reduce their daily skincare routine time while delivering superior results.`,
            ],
            local: [
                `${location.name} residents enjoy convenient access to professional-grade ${service.keyword} treatments without the hassle of driving to city day spas.`,
                `Our ${service.keyword} facials have become a ${location.name} favourite, with many locals scheduling regular treatments for consistently healthy, glowing skin.`,
            ],
        },
        "hair-care": {
            luxury: [
                `${location.name} residents expect salon-quality ${service.keyword} with premium products, and our Moroccanoil and Milkshake treatments deliver exactly that level of luxury.`,
                `Many ${location.name} clients make ${service.keyword} part of their regular beauty routine, appreciating our salon's ability to match the quality of exclusive city hair studios.`,
            ],
            urban: [
                `${location.name} clients discover that ${service.keyword} at our Hartbeespoort salon offers the same premium products and expertise as top city salons, in a far more relaxing environment.`,
                `Smart ${location.name} professionals combine ${service.keyword} with a Hartbeespoort day trip, turning their hair appointment into a mini wellness retreat.`,
            ],
            local: [
                `${location.name} residents count on our salon for consistent, high-quality ${service.keyword} services that keep their hair looking its best year-round.`,
                `Our ${service.keyword} treatments are a ${location.name} community staple, with many local families trusting us for their entire household's hair care needs.`,
            ],
        },
        "nails": {
            luxury: [
                `${location.name} residents treat themselves to ${service.keyword} at our salon, where meticulous attention to detail meets the relaxed atmosphere of Hartbeespoort.`,
                `Many ${location.name} clients pair ${service.keyword} with other services for a full pampering session, making a day of their salon visit.`,
            ],
            urban: [
                `${location.name} clients find that ${service.keyword} at our Hartbeespoort salon is more relaxing than rushed city appointments, with unhurried attention to every detail.`,
                `Weekend nail appointments are popular with ${location.name} clients who combine ${service.keyword} with exploring the Hartbeespoort area's restaurants and markets.`,
            ],
            local: [
                `${location.name} locals know our salon as the go-to destination for quality ${service.keyword} that lasts, with many booking standing fortnightly appointments.`,
                `Our ${service.keyword} service has earned a loyal following among ${location.name} residents who appreciate consistent quality and friendly, professional service.`,
            ],
        },
    };

    // Get category-specific insights or fall back to generic
    const categoryId = service.categoryId;
    const locationType = isLuxuryEstate ? 'luxury' : isUrban ? 'urban' : 'local';

    const specificInsights = categoryInsights[categoryId]?.[locationType];

    if (specificInsights && specificInsights.length > 0) {
        return specificInsights[combinedHash % specificInsights.length];
    }

    // Fallback: generic insights by location type (expanded)
    const genericInsights: Record<string, string[]> = {
        luxury: [
            `Residents of ${location.name} appreciate the discretion and premium quality our ${service.keyword} treatments offer, with many becoming long-term regulars.`,
            `${location.name} clients often combine ${service.keyword} with other wellness services, creating comprehensive beauty days at our Hartbeespoort sanctuary.`,
            `Our ${service.keyword} service is popular among ${location.name} residents who value results-driven treatments in a luxurious, relaxing environment.`,
            `Many ${location.name} estate residents choose our salon for the perfect balance of proximity, quality, and privacy in their ${service.keyword} routine.`,
            `${location.name} clients love that our ${service.keyword} treatments match the premium standards they expect, all within easy reach of their estate.`,
        ],
        urban: [
            `${location.name} clients escape the city for ${service.keyword} at our peaceful Hartbeespoort location, often extending their visit with lunch by the dam.`,
            `For busy ${location.name} professionals, ${service.keyword} at Galeo Beauty offers a perfect mini-retreat from the urban pace.`,
            `Many ${location.name} residents schedule ${service.keyword} during weekend getaways, combining beauty treatments with Hartbeespoort's natural beauty.`,
            `Our ${service.keyword} service has become a favorite among ${location.name} clients seeking expert care in a tranquil setting away from city hustle.`,
            `${location.name} clients tell us the drive to our salon is part of the ${service.keyword} experience—a chance to decompress before their treatment even begins.`,
        ],
        local: [
            `As a ${location.name} local favourite, our ${service.keyword} treatment combines neighbourhood convenience with expertise you'd expect from top city salons.`,
            `${location.name} residents trust Galeo Beauty for ${service.keyword} because we understand the lifestyle and aesthetic preferences of our community.`,
            `Living in ${location.name} means premier ${service.keyword} services right in your area, with no need to travel to the city for quality results.`,
            `Our ${service.keyword} service has become part of many ${location.name} residents' self-care routines, with convenient scheduling that fits local lifestyles.`,
            `${location.name} clients appreciate that our ${service.keyword} prices are competitive with city salons while offering a more personalized experience.`,
        ],
    };

    const pool = genericInsights[locationType] || genericInsights.local;
    return pool[combinedHash % pool.length];
}

