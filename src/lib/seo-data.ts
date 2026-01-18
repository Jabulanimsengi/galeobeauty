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
// These key SEO target locations are pre-built at build time (~1,000 pages).
// All other location/service combinations are generated on-demand with ISR.

export const PRIORITY_LOCATIONS = [
    // Key SEO targets - Main cities
    'johannesburg',
    'sandton',
    'pretoria',
    'midrand',
    'centurion',
    // Key SEO targets - East Rand
    'kempton-park',
    'boksburg',
    'benoni',
    'edenvale',
    // Primary salon location
    'hartbeespoort',
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

