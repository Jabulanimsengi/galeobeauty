import { serviceCategoriesContent, type ServiceCategoryContent, type ServiceItem } from "./services-content";
import { isKnownLocationSlug } from "./location-route-manifest";

export type LocalRouteRelation = "in" | "near";

export interface LocalCategoryRoute {
  category: ServiceCategoryContent;
  categoryId: string;
  locationSlug: string;
  locationName: string;
  relation: LocalRouteRelation;
  phrase: string;
  phraseLabel: string;
  slug: string;
  href: string;
  h1: string;
}

export interface LocalServiceRoute extends LocalCategoryRoute {
  service: ServiceItem;
  serviceSlug: string;
  servicePhrase: string;
  serviceLabel: string;
  servicePathSlug: string;
  serviceHref: string;
  serviceH1: string;
}

type CategoryRouteConfig = {
  inPhrase: string;
  nearPhrase?: string;
  label: string;
  aliases?: string[];
};

const CANONICAL_LOCAL_LOCATION_SLUG = "hartbeespoort";

const LOCATION_ALIASES: Record<string, string> = {
  harties: CANONICAL_LOCAL_LOCATION_SLUG,
  "hartbeespoort-dam": CANONICAL_LOCAL_LOCATION_SLUG,
  "kosmos-village": "kosmos",
  "pecanwood-estate": "pecanwood",
  "xanadu-nature-estate": "xanadu",
  "leloko-lifestyle-estate": "leloko",
  "landsmeer-estate": "landsmeer",
  "damdoryn-junction": "damdoryn",
  "jasmyn-farm": "jasmyn",
  "waterfall-city": "waterfall",
};

const LOCATION_NAME_OVERRIDES: Record<string, string> = {
  hartbeespoort: "Hartbeespoort",
  harties: "Harties",
  pretoria: "Pretoria",
  centurion: "Centurion",
  brits: "Brits",
  johannesburg: "Johannesburg",
  sandton: "Sandton",
  hammanskraal: "Hammanskraal",
  "north-west": "North West",
  "south-africa": "South Africa",
  gauteng: "Gauteng",
};

const CATEGORY_ROUTE_CONFIG: Record<string, CategoryRouteConfig> = {
  nails: {
    inPhrase: "nail-salon",
    label: "Nail Salon",
    aliases: ["nails", "manicure-and-pedicure"],
  },
  waxing: {
    inPhrase: "waxing",
    label: "Waxing",
    aliases: ["hair-removal"],
  },
  dermalogica: {
    inPhrase: "facials",
    label: "Facials",
    aliases: ["skin-treatments", "dermalogica-facials"],
  },
  massages: {
    inPhrase: "massage",
    label: "Massage",
    aliases: ["massages", "massage-spa"],
  },
  "lashes-brows": {
    inPhrase: "lash-extensions",
    label: "Lash Extensions",
    aliases: ["lashes-and-brows", "eyelash-extensions"],
  },
  makeup: {
    inPhrase: "makeup-artist",
    nearPhrase: "bridal-makeup",
    label: "Makeup Artist",
    aliases: ["makeup"],
  },
  hair: {
    inPhrase: "hair-salon",
    label: "Hair Salon",
    aliases: ["hairdresser"],
  },
  ipl: {
    inPhrase: "ipl-hair-removal",
    label: "IPL Hair Removal",
    aliases: ["laser-hair-removal"],
  },
  "hair-extensions": {
    inPhrase: "hair-extensions",
    label: "Hair Extensions",
  },
  "permanent-makeup": {
    inPhrase: "permanent-makeup",
    label: "Permanent Makeup",
    aliases: ["microblading"],
  },
  "hart-aesthetics": {
    inPhrase: "aesthetics-clinic",
    label: "Aesthetics Clinic",
    aliases: ["botox-and-fillers", "anti-aging"],
  },
  "fat-freezing": {
    inPhrase: "fat-freezing",
    label: "Fat Freezing",
    aliases: ["body-contouring"],
  },
  slimming: {
    inPhrase: "body-contouring",
    label: "Body Contouring",
    aliases: ["slimming"],
  },
  medical: {
    inPhrase: "skin-clinic",
    label: "Skin Clinic",
    aliases: ["clinical-skin-treatments"],
  },
  qms: {
    inPhrase: "qms-facial",
    label: "QMS Facial",
    aliases: ["qms-facials"],
  },
  sunbed: {
    inPhrase: "tanning",
    label: "Tanning",
    aliases: ["spray-tan", "sunbed-tanning"],
  },
};

const SERVICE_PHRASE_OVERRIDES: Record<string, string> = {
  pedicure: "pedicure",
  "pedicure-gel": "gel-pedicure",
  "gel-overlay-hands": "gel-nails",
  "rubber-base": "rubber-base-nails",
  "acrylic-tips": "acrylic-nails",
  "gel-tips": "gel-nail-extensions",
  "full-manicure": "manicure",
  "wax-eyebrow": "eyebrow-wax",
  "wax-brazilian": "brazilian-wax",
  "wax-hollywood": "hollywood-wax",
  "wax-full-leg": "full-leg-wax",
  "wax-underarm": "underarm-wax",
  "pro-skin-60": "deep-cleansing-facial",
  "facial-60": "deep-cleansing-facial",
  hydraderm: "hydrating-facial",
  "pro-clear": "acne-facial",
  "pro-microneedling": "microneedling",
  "pro-power-peel": "chemical-peel",
  "full-body-massage": "full-body-massage",
  "deep-tissue-60": "deep-tissue-massage",
  "swedish-massage-60": "swedish-massage",
  "hot-stone-60": "hot-stone-massage",
  "classic-lashes": "classic-lash-extensions",
  "hybrid-lashes": "hybrid-lash-extensions",
  "volume-lashes": "volume-lash-extensions",
  "lash-lift-tint": "lash-lift-and-tint",
  "brow-lamination": "brow-lamination",
  "bridal-makeup": "bridal-makeup",
  "evening-makeup": "evening-makeup",
  "day-makeup": "day-makeup",
  balayage: "balayage",
  "ladies-cut": "ladies-haircut",
  "gents-cut": "mens-haircut",
  "brazilian-medium": "brazilian-hair-treatment",
  botox: "hair-botox",
  "ipl-full-leg": "full-leg-ipl-hair-removal",
  "ipl-underarm": "underarm-ipl-hair-removal",
  "ipl-brazilian": "brazilian-ipl-hair-removal",
  "ipl-full-face": "facial-ipl-hair-removal",
  "lip-filler-1ml": "lip-filler",
  "tox-per-unit": "botox",
  microblading: "microblading",
  "powderpixel-brows": "powder-brows",
  "fat-freezing-session": "fat-freezing",
  "fractional-laser": "fractional-laser",
  plasmage: "plasmage",
  "collagen-facial": "collagen-facial",
};

const CATEGORY_BY_ID = new Map(serviceCategoriesContent.map((category) => [category.id, category]));

export const PRIMARY_LOCAL_ROUTE_LOCATIONS = [
  "hartbeespoort",
  "pretoria",
  "centurion",
  "brits",
  "johannesburg",
  "sandton",
  "hammanskraal",
] as const;

function titleizeSlug(slug: string): string {
  return LOCATION_NAME_OVERRIDES[slug] ?? slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function titleizeSearchPhrase(phrase: string): string {
  const acronyms = new Set(["ems", "ipl", "iv", "qms"]);
  const titleOverrides: Record<string, string> = {
    botox: "Botox",
    mens: "Men's",
  };

  return phrase
    .split("-")
    .filter(Boolean)
    .map((part, index) => {
      if (part === "and" && index > 0) return "and";
      if (acronyms.has(part)) return part.toUpperCase();
      return titleOverrides[part] ?? part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function normalizeLocationSlug(locationSlug: string): string {
  return LOCATION_ALIASES[locationSlug] ?? locationSlug;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[&+]/g, " and ")
    .replace(/[^\w\s-]/g, "")
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCategoryConfig(categoryId: string): CategoryRouteConfig | undefined {
  return CATEGORY_ROUTE_CONFIG[categoryId];
}

function getCategoryPhrases(categoryId: string, relation: LocalRouteRelation): string[] {
  const config = getCategoryConfig(categoryId);
  if (!config) return [];

  const preferred = relation === "near"
    ? config.nearPhrase ?? config.inPhrase
    : config.inPhrase;

  return [preferred, config.inPhrase, ...(config.aliases ?? [])].filter((value, index, arr) =>
    Boolean(value) && arr.indexOf(value) === index
  );
}

function findServiceInCategory(category: ServiceCategoryContent, serviceSlug: string): ServiceItem | undefined {
  for (const subcategory of category.subcategories) {
    const service = subcategory.items.find((item) => item.id === serviceSlug);
    if (service) return service;
  }

  return undefined;
}

export function getLocalRouteRelation(locationSlug: string): LocalRouteRelation {
  return normalizeLocationSlug(locationSlug) === CANONICAL_LOCAL_LOCATION_SLUG ? "in" : "near";
}

export function getLocalServicePhrase(service: Pick<ServiceItem, "id" | "name">): string {
  return SERVICE_PHRASE_OVERRIDES[service.id] ?? slugify(service.name);
}

export function getLocalCategoryRoute(categoryId: string, locationSlug = CANONICAL_LOCAL_LOCATION_SLUG): LocalCategoryRoute | null {
  const category = CATEGORY_BY_ID.get(categoryId);
  const config = getCategoryConfig(categoryId);
  const normalizedLocationSlug = normalizeLocationSlug(locationSlug);

  if (!category || !config || !isKnownLocationSlug(normalizedLocationSlug)) {
    return null;
  }

  const relation = getLocalRouteRelation(normalizedLocationSlug);
  const phrase = relation === "near" ? config.nearPhrase ?? config.inPhrase : config.inPhrase;
  const phraseLabel = titleizeSearchPhrase(phrase);
  const locationName = titleizeSlug(normalizedLocationSlug);
  const slug = `${phrase}-${relation}-${normalizedLocationSlug}`;
  const h1 = `${phraseLabel} ${relation === "in" ? "in" : "near"} ${locationName}`;

  return {
    category,
    categoryId,
    locationSlug: normalizedLocationSlug,
    locationName,
    relation,
    phrase,
    phraseLabel,
    slug,
    href: `/${slug}`,
    h1,
  };
}

export function getLocalServiceRoute(categoryId: string, serviceSlug: string, locationSlug = CANONICAL_LOCAL_LOCATION_SLUG): LocalServiceRoute | null {
  const categoryRoute = getLocalCategoryRoute(categoryId, locationSlug);
  if (!categoryRoute) return null;

  const service = findServiceInCategory(categoryRoute.category, serviceSlug);
  if (!service) return null;

  const servicePhrase = getLocalServicePhrase(service);
  const serviceLabel = titleizeSearchPhrase(servicePhrase);
  const servicePathSlug = `${servicePhrase}-${categoryRoute.relation}-${categoryRoute.locationSlug}`;
  const serviceH1 = `${serviceLabel} ${categoryRoute.relation === "in" ? "in" : "near"} ${categoryRoute.locationName}`;

  return {
    ...categoryRoute,
    service,
    serviceSlug,
    servicePhrase,
    serviceLabel,
    servicePathSlug,
    serviceHref: `${categoryRoute.href}/${servicePathSlug}`,
    serviceH1,
  };
}

export function resolveLocalCategoryRoute(slug: string): LocalCategoryRoute | null {
  for (const category of serviceCategoriesContent) {
    for (const relation of ["in", "near"] as const) {
      for (const phrase of getCategoryPhrases(category.id, relation)) {
        const prefix = `${phrase}-${relation}-`;
        if (!slug.startsWith(prefix)) continue;

        const locationSlug = normalizeLocationSlug(slug.slice(prefix.length));
        const route = getLocalCategoryRoute(category.id, locationSlug);
        if (route && route.relation === relation) {
          return route;
        }
      }
    }
  }

  return null;
}

export function resolveLocalServiceRoute(categorySlug: string, servicePathSlug: string): LocalServiceRoute | null {
  const categoryRoute = resolveLocalCategoryRoute(categorySlug);
  if (!categoryRoute) return null;

  const suffix = `-${categoryRoute.relation}-${categoryRoute.locationSlug}`;
  if (!servicePathSlug.endsWith(suffix)) {
    return null;
  }

  const requestedServicePhrase = servicePathSlug.slice(0, -suffix.length);

  for (const subcategory of categoryRoute.category.subcategories) {
    for (const service of subcategory.items) {
      if (getLocalServicePhrase(service) !== requestedServicePhrase) {
        continue;
      }

      return getLocalServiceRoute(categoryRoute.categoryId, service.id, categoryRoute.locationSlug);
    }
  }

  return null;
}

export function getCanonicalLocalCategoryPath(categoryId: string, locationSlug = CANONICAL_LOCAL_LOCATION_SLUG): string | null {
  return getLocalCategoryRoute(categoryId, locationSlug)?.href ?? null;
}

export function getCanonicalLocalServicePath(categoryId: string, serviceSlug: string, locationSlug = CANONICAL_LOCAL_LOCATION_SLUG): string | null {
  return getLocalServiceRoute(categoryId, serviceSlug, locationSlug)?.serviceHref ?? null;
}

export function getAllLocalCategoryRoutes(locationSlugs: string[]): LocalCategoryRoute[] {
  return locationSlugs.flatMap((locationSlug) =>
    serviceCategoriesContent.flatMap((category) => {
      const route = getLocalCategoryRoute(category.id, locationSlug);
      return route ? [route] : [];
    })
  );
}
