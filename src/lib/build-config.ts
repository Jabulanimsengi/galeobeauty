type StaticParamGroup =
    | "categories"
    | "services"
    | "locations"
    | "locationServices"
    | "intentPages"
    | "blogPosts";

const REDUCED_SCOPE_VALUES = new Set(["reduced", "local", "fast"]);
const FULL_SCOPE_VALUES = new Set(["full", "server", "complete"]);

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

export const STATIC_BUILD_SCOPE: "full" | "reduced" =
    EXPLICIT_BUILD_SCOPE && FULL_SCOPE_VALUES.has(EXPLICIT_BUILD_SCOPE)
        ? "full"
        : EXPLICIT_BUILD_SCOPE && REDUCED_SCOPE_VALUES.has(EXPLICIT_BUILD_SCOPE)
            ? "reduced"
            : inferredFullBuild
                ? "full"
                : "reduced";

export const isReducedStaticBuild = STATIC_BUILD_SCOPE === "reduced";

const REDUCED_STATIC_PARAM_LIMITS: Record<StaticParamGroup, number> = {
    categories: 6,
    services: 18,
    locations: 8,
    locationServices: 24,
    intentPages: 10,
    blogPosts: 8,
};

/**
 * Local builds stay intentionally small unless GALEO_BUILD_SCOPE=full
 * (or the build is running in CI/Vercel/Hetzner). This keeps `next build`
 * fast on a workstation while preserving the full SEO build on the server.
 */
export function limitStaticParams<T>(params: T[], group: StaticParamGroup): T[] {
    if (!isReducedStaticBuild) {
        return params;
    }

    return params.slice(0, REDUCED_STATIC_PARAM_LIMITS[group]);
}
