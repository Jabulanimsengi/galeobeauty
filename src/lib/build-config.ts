type StaticParamGroup =
    | "categories"
    | "services"
    | "locations"
    | "locationServices"
    | "intentPages"
    | "blogPosts";

export type StaticBuildScope = "local" | "production" | "full-seo";

const LOCAL_SCOPE_VALUES = new Set(["local", "reduced", "fast"]);
const PRODUCTION_SCOPE_VALUES = new Set(["production", "prod", "server", "deploy", "hetzner"]);
const FULL_SCOPE_VALUES = new Set(["full", "full-seo", "complete", "all"]);

const EXPLICIT_BUILD_SCOPE = process.env.GALEO_BUILD_SCOPE?.trim().toLowerCase();
const DEPLOY_TARGET = process.env.GALEO_DEPLOY_TARGET?.trim().toLowerCase();
const IS_HETZNER_DEPLOY =
    DEPLOY_TARGET === "hetzner" ||
    process.env.HETZNER === "1" ||
    process.env.HETZNER === "true";

const inferredFullBuild =
    IS_HETZNER_DEPLOY ||
    process.env.VERCEL === "1" ||
    process.env.CI === "true" ||
    process.env.GITHUB_ACTIONS === "true";

export const STATIC_BUILD_SCOPE: StaticBuildScope =
    EXPLICIT_BUILD_SCOPE && FULL_SCOPE_VALUES.has(EXPLICIT_BUILD_SCOPE)
        ? "full-seo"
        : EXPLICIT_BUILD_SCOPE && PRODUCTION_SCOPE_VALUES.has(EXPLICIT_BUILD_SCOPE)
            ? "production"
            : EXPLICIT_BUILD_SCOPE && LOCAL_SCOPE_VALUES.has(EXPLICIT_BUILD_SCOPE)
                ? "local"
                : inferredFullBuild
                    ? "production"
                    : "local";

export const isLocalStaticBuild = STATIC_BUILD_SCOPE === "local";
export const isProductionStaticBuild = STATIC_BUILD_SCOPE === "production";
export const isFullSEOStaticBuild = STATIC_BUILD_SCOPE === "full-seo";

const LOCAL_STATIC_PARAM_LIMITS: Record<StaticParamGroup, number> = {
    categories: 6,
    services: 18,
    locations: 8,
    locationServices: 24,
    intentPages: 10,
    blogPosts: 8,
};

const PRODUCTION_STATIC_PARAM_LIMITS: Record<StaticParamGroup, number> = {
    categories: 24,
    services: 400,
    locations: 256,
    locationServices: 5000,
    intentPages: 40,
    blogPosts: 40,
};

/**
 * Local builds stay intentionally small unless GALEO_BUILD_SCOPE is raised.
 * Production builds prebuild all core pages plus a larger location-service set.
 * Full SEO builds return every static param and are best reserved for special releases.
 */
export function limitStaticParams<T>(params: T[], group: StaticParamGroup): T[] {
    if (isFullSEOStaticBuild) {
        return params;
    }

    const limit =
        STATIC_BUILD_SCOPE === "production"
            ? PRODUCTION_STATIC_PARAM_LIMITS[group]
            : LOCAL_STATIC_PARAM_LIMITS[group];

    return params.slice(0, limit);
}
