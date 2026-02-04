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
// These key SEO target locations are pre-built at build time (~3,500 pages).
// All other location/service combinations are generated on-demand with ISR.
// REDUCED TO 12 LOCATIONS to stay under Vercel's 75MB deployment size limit.

export const PRIORITY_LOCATIONS = [
    // Primary locations - EQUAL RANKING (Most Critical!)
    'hartbeespoort',                // Main town name
    'harties',                      // Short name for Hartbeespoort (equally important)
    'landsmeer',                    // 🏢 ACTUAL SALON LOCATION: Shop 6, Landsmeer Estate
    'landsmeer-estate',             // 🏢 Salon location (estate variant)

    // Hartbeespoort Core Area - Big 5 Suburbs (Top 3 only)
    'schoemansville',               // Tourist hub (2km) - Old town
    'meerhof',                      // ⭐ CRITICAL - Pretoria entry point, large stands
    'melodie',                      // 5km - Commercial heart (Village Mall area)

    // Top Immediate neighbors (most searched estates)
    'ifafi',                        // 3km - Exclusive estate with views
    'the-islands-estate',           // 4km - Luxury lakeside canals
    'pecanwood',                    // 4km - Golf & wealthy estate

    // Key commuter cities (highest search volume)
    'johannesburg',                 // 1hr - Major metro - HIGHEST SEARCH VOLUME
    'pretoria',                     // 45min - Capital city - HIGHEST SEARCH VOLUME

    // Total: 12 locations × ~262 services = ~3,144 pages
    // Focus: Core Hartbeespoort area (0-5km) + major metros
    // All other locations available via on-demand ISR
    // REDUCED FROM 43 TO 12 LOCATIONS TO STAY UNDER VERCEL 75MB DEPLOYMENT LIMIT
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

/**
 * Get priority location/service combinations for ISR pre-building.
 * Generates ALL services for priority locations at build time (~1,000 pages).
 * Other pages are generated on-demand when first visited.
 */
export function getPriorityParams(): { location: string; service: string }[] {
    const services = getCachedSEOServices();
    const params: { location: string; service: string }[] = [];

    for (const loc of PRIORITY_LOCATIONS) {
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
 * Category-specific benefits for "Why Choose Us" section
 * Returns unique benefits based on service category
 */
export function getCategoryBenefits(categoryId: string): string[] {
    const benefitsByCategory: Record<string, string[]> = {
        "hart-aesthetics": [
            "Administered by qualified medical professionals",
            "Premium FDA-approved injectable products",
            "Natural-looking results tailored to your facial structure",
            "Comprehensive consultation before every treatment",
            "Safe, sterile clinical environment",
            "Follow-up care and support included",
        ],
        "fat-freezing": [
            "Non-invasive body contouring technology",
            "CE-approved cryolipolysis equipment",
            "No downtime - return to activities immediately",
            "Permanent fat cell reduction in treated areas",
            "Customized treatment plans for your body goals",
            "Comfortable, relaxing treatment experience",
        ],
        "dermalogica": [
            "Official Dermalogica Pro treatments",
            "Skin analysis using Face Mapping technology",
            "Products formulated without common irritants",
            "Treatments customized to your skin concerns",
            "Professional-grade active ingredients",
            "Take-home skincare recommendations included",
        ],
        "qms": [
            "Medical-grade QMS Medicosmetics products",
            "Collagen-boosting advanced formulations",
            "Anti-aging treatments backed by science",
            "Luxury spa experience with clinical results",
            "Suitable for sensitive and mature skin",
            "German precision skincare technology",
        ],
        "skin-treatments": [
            "Advanced skin rejuvenation technologies",
            "Treatments for all skin types and concerns",
            "Combined therapies for optimal results",
            "Minimal discomfort with maximum efficacy",
            "Visible improvement from first session",
            "Expert skin therapists with specialized training",
        ],
        "hair-care": [
            "Premium Moroccanoil and Milkshake products",
            "Customized treatments for your hair type",
            "Damage repair and prevention focus",
            "Scalp health assessment included",
            "Long-lasting color and styling results",
            "Argan oil-infused luxury treatments",
        ],
        "nails": [
            "Hygienic nail care with sterilized tools",
            "Long-lasting gel and acrylic options",
            "Trendy nail art by skilled technicians",
            "Nourishing treatments for nail health",
            "Relaxing manicure and pedicure experience",
            "Wide selection of premium polish colors",
        ],
        "lashes-brows": [
            "Precision shaping for your face shape",
            "High-quality lash extension materials",
            "Long-lasting tints and lifts",
            "Patch testing available for sensitive clients",
            "Natural-looking enhancement options",
            "Quick touch-up appointments available",
        ],
        "waxing": [
            "Premium wax for sensitive skin",
            "Hygiene-first approach with disposable applicators",
            "Quick and efficient hair removal",
            "Long-lasting smooth results",
            "Pre and post-wax skincare included",
            "Experienced therapists for minimal discomfort",
        ],
        "tinting": [
            "Salon-grade professional tints",
            "Patch testing for safety",
            "Natural-looking color enhancement",
            "Lasts 4-6 weeks with proper care",
            "Quick 15-30 minute appointments",
            "Expert color matching for your features",
        ],
    };

    // Default benefits if category not found
    const defaultBenefits = [
        "Premium products from world-renowned brands",
        "Experienced and certified therapists",
        "Luxurious, relaxing environment",
        "Competitive pricing with exceptional results",
        "Easy booking via WhatsApp or phone",
        "Convenient location near Hartbeespoort Dam",
    ];

    return benefitsByCategory[categoryId] || defaultBenefits;
}

/**
 * Generate unique intro paragraph based on service and location
 */
export function generateServiceIntro(service: SEOService, location: SEOLocation): string {
    const category = serviceCategories.find((cat) => cat.id === service.categoryId);
    const categoryName = category?.title || "beauty treatment";

    const intros: Record<string, string> = {
        "hart-aesthetics": `Experience the artistry of advanced aesthetic treatments at Galeo Beauty Salon. Our ${service.keyword} service combines medical expertise with an eye for natural beauty, helping salon clients from ${location.name} achieve subtle, rejuvenating results.`,
        "fat-freezing": `Transform your body contours with our professional ${service.keyword} treatment at Galeo Beauty Salon. Serving clients from ${location.name} and the ${location.region} area, our salon uses advanced cryolipolysis technology to target stubborn fat without surgery or downtime.`,
        "dermalogica": `Discover the power of professional salon skincare with our ${service.keyword} service. Using Dermalogica's renowned products and techniques at our Hartbeespoort salon, we help clients from ${location.name} achieve their healthiest, most radiant skin.`,
        "qms": `Indulge in medical-grade skincare with our ${service.keyword} treatment at Galeo Beauty Salon. Clients from ${location.name} trust our salon for QMS Medicosmetics' scientifically-formulated solutions that deliver visible anti-aging results.`,
        "skin-treatments": `Revitalize your skin with our professional ${service.keyword} service at Galeo Beauty Salon. We welcome clients from ${location.name} to experience advanced salon skin treatments that address everything from fine lines to uneven texture.`,
        "hair-care": `Give your hair the luxury salon treatment it deserves with our ${service.keyword} service. Clients from ${location.name} choose Galeo Beauty Salon for our premium hair care using Moroccanoil and Milkshake products.`,
        "nails": `Treat yourself to beautiful nails at our beauty salon with our ${service.keyword} service. Whether you're from ${location.name} or anywhere in ${location.region}, our skilled salon nail technicians deliver stunning, long-lasting results.`,
        "lashes-brows": `Frame your face perfectly with our ${service.keyword} treatment at Galeo Beauty Salon. Clients from ${location.name} love our salon's attention to detail and ability to enhance natural beauty through expertly shaped brows and lashes.`,
        "waxing": `Experience smooth, long-lasting hair removal with our ${service.keyword} salon service. We provide ${location.name} residents with comfortable, hygienic waxing treatments at our beauty salon using premium products.`,
        "tinting": `Enhance your natural features with our professional ${service.keyword} salon service. Clients from ${location.name} appreciate our salon's precise color-matching and long-lasting tinting results.`,
    };

    return intros[service.categoryId] || `Looking for a professional ${service.keyword} salon near ${location.name}? Galeo Beauty Salon offers premium ${categoryName.toLowerCase()} treatments that deliver exceptional results. Clients from across ${location.region} trust our beauty salon for quality and care.`;
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

