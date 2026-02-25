import type { NextConfig } from "next";
import { serviceCategoriesContent } from "./src/lib/services-content";
import { SERVICE_SLUGS } from "./src/lib/sitemap-config";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    webpackMemoryOptimizations: true,
  },

  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.mixkit.co",
        pathname: "/**",
      },
    ],
  },

  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  async redirects() {
    // 1. Build slug → categoryId map from current services
    const slugToCat = new Map<string, string>();
    for (const cat of serviceCategoriesContent) {
      for (const sub of cat.subcategories) {
        for (const item of sub.items) {
          slugToCat.set(item.id, cat.id);
        }
      }
    }

    // 2. Category inference for stale slugs (services renamed/removed but still indexed by Google)
    const staleCategoryMap: Record<string, string> = {
      // Skin / Dermalogica
      "multivitamin-skin": "dermalogica", "pro-dermaplaning-30": "dermalogica", "neurosculpt-30": "dermalogica",
      "pro-skin-treatment": "dermalogica", "pro-calm-skin": "dermalogica", "pro-firm-treatment": "dermalogica",
      "pro-power-peel": "dermalogica", "pro-dermaplaning-55": "dermalogica", "neurosculpt-55": "dermalogica",
      "infusion-undereye-peel": "dermalogica", "luminfusion": "dermalogica", "melanopro-peel": "dermalogica",
      "hydraderm": "dermalogica", "pro-microneedling": "dermalogica", "nanoinfusion": "dermalogica",
      "ultra-calming-facial": "dermalogica", "skin-clearing-facial": "dermalogica",
      "skin-brightening-facial": "dermalogica", "age-smart-facial": "dermalogica",
      "power-peel-30": "dermalogica", "power-peel-60": "dermalogica",
      "facial-30": "dermalogica", "facial-60": "dermalogica",
      "dermaplaning-pro": "dermalogica", "dermaplaning-maintenance": "dermalogica",
      "microneedling-hands": "dermalogica", "microneedling-pro": "dermalogica",
      "high-frequency-facial": "dermalogica",
      // QMS
      "basic-facial-qms": "qms", "sensitive-skin-facial": "qms", "activator-treatment": "qms",
      "deep-pore-cleansing": "qms", "rejuvenating-facial": "qms", "collagen-facial": "qms",
      "chemical-peel": "qms",
      // Slimming / EMS
      "ems-single": "slimming", "ems-package-4": "slimming", "ems-package-6": "slimming",
      // IPL
      "moustache-ipl": "ipl", "beardline-ipl": "ipl", "neck-ipl-men": "ipl", "neck-ipl": "ipl",
      "full-face-ipl": "ipl", "full-face-neck-ipl": "ipl", "under-arm-ipl": "ipl",
      "belly-button-ipl": "ipl", "stomach-ipl": "ipl", "toes-feet-ipl": "ipl",
      "full-buttocks-ipl": "ipl", "bikini-sides-ipl": "ipl", "brazillian-ipl": "ipl",
      "hollywood-ipl": "ipl", "half-leg-ipl": "ipl", "full-leg-ipl": "ipl",
      "full-leg-ipl-premium": "ipl", "half-arm-ipl": "ipl", "full-arm-ipl": "ipl",
      "full-arm-ipl-premium": "ipl", "tattoo-removal": "ipl",
      // Makeup
      "day-makeup": "makeup", "evening-makeup": "makeup",
      // Permanent Makeup
      "powderpixel-brows": "permanent-makeup", "hybrid-brows": "permanent-makeup",
      "eyeliner-top": "permanent-makeup", "eyeliner-bottom": "permanent-makeup",
      "full-lips-contour": "permanent-makeup", "lip-liner": "permanent-makeup",
      // Sunbed — old naming conventions
      "sunbed-10-sessions": "sunbed", "sunbed-20-sessions": "sunbed", "spraytan": "sunbed",
      "sunbed-course-10": "sunbed", "sunbed-course-20": "sunbed",
      // Waxing
      "lip-wax": "waxing", "cheek-wax": "waxing", "nose-wax": "waxing", "ear-wax": "waxing",
      "under-arm-wax": "waxing", "full-tummy-wax": "waxing", "chest-wax": "waxing",
      "half-back-wax": "waxing", "full-back-wax": "waxing", "men-back-wax": "waxing",
      "butt-wax": "waxing", "half-arm-wax": "waxing", "full-arm-wax": "waxing",
      "half-leg-wax": "waxing", "full-leg-wax": "waxing", "brazillian-wax": "waxing",
      "hollywood-wax": "waxing",
      // Hair
      "cut-0-5-years": "hair", "haircut-short": "hair", "haircut-medium": "hair",
      "haircut-long": "hair", "pensioner-cut-blow": "hair", "medium-blow": "hair",
      "extra-long-blow": "hair", "long-blow": "hair",
      "short-blow-10x": "hair", "medium-blow-10x": "hair", "long-blow-10x": "hair",
      "extra-long-blow-10x": "hair", "roots": "hair", "short-color": "hair",
      "medium-color": "hair", "long-color": "hair", "extra-long-color": "hair",
      "cap-highlights": "hair",
      "short-half-head-foils": "hair", "medium-half-head-foils": "hair",
      "long-half-head-foils": "hair", "extra-long-half-head-foils": "hair",
      "short-full-head-foils": "hair", "medium-full-head-foils": "hair",
      "long-full-head-foils": "hair", "extra-long-full-head-foils": "hair",
      "short-toner": "hair", "medium-toner": "hair", "long-toner": "hair",
      "osmo-intensive-mask": "hair", "osmo-silver-mask": "hair",
      "care-vital-mask": "hair", "care-keratin-mask": "hair",
      "botox-short": "hair", "botox-medium": "hair", "botox-long": "hair",
      "brazilian-blow-short": "hair", "brazilian-blow-long": "hair",
      "brazilian-blow-extra-long": "hair",
      "short-upstyle": "hair", "medium-upstyle": "hair", "long-upstyle": "hair",
      // Nails
      "acrylic-fill": "nails", "full-set-acrylic-tips": "nails",
      "sculpted-acrylic": "nails", "full-set-designer": "nails",
      "acrylic-soak-off": "nails", "gel-toes": "nails", "gel-overlay": "nails",
      "gel-fill": "nails", "rubber-base-fill": "nails", "gel-soak-off": "nails",
      "nail-repair": "nails", "buff-only": "nails",
      // Lashes
      "full-set-silk": "lashes-brows", "full-set-classic": "lashes-brows",
      "full-set-volume": "lashes-brows", "glamour-lashes": "lashes-brows",
      "lash-fill": "lashes-brows", "lash-lamination": "lashes-brows",
      "brow-henna": "lashes-brows",
      // Hair extensions (u-tip variants)
      "utip-35cm-dark": "hair-extensions", "utip-35cm-light": "hair-extensions",
      "utip-40cm-dark": "hair-extensions", "utip-40cm-light": "hair-extensions",
      "utip-45cm-dark": "hair-extensions", "utip-45cm-light": "hair-extensions",
      "utip-50cm-dark": "hair-extensions", "utip-50cm-light": "hair-extensions",
      "utip-55cm-dark": "hair-extensions", "utip-55cm-light": "hair-extensions",
      "utip-60cm-dark": "hair-extensions", "utip-60cm-light": "hair-extensions",
    };

    // 2b. Precise old-slug → current-slug remaps.
    //     When known, redirect to the specific service page rather than just the category.
    const staleSlugRemaps: Record<string, string> = {
      // Sunbed
      "sunbed-course-10": "sunbed-10",
      "sunbed-course-20": "sunbed-20",
      "sunbed-10-sessions": "sunbed-10",
      "sunbed-20-sessions": "sunbed-20",
      "spraytan": "spraytan",
      // Waxing (old slug → current item id)
      "brazillian-wax": "wax-brazilian",
      "hollywood-wax": "wax-hollywood",
      "lip-wax": "wax-lip",
      "cheek-wax": "wax-cheek",
      "nose-wax": "wax-nose",
      "ear-wax": "wax-ear",
      "under-arm-wax": "wax-underarm",
      "full-tummy-wax": "wax-tummy",
      "chest-wax": "wax-chest",
      "half-back-wax": "wax-half-back",
      "full-back-wax": "wax-full-back",
      "men-back-wax": "wax-men-back",
      "butt-wax": "wax-butt",
      "half-arm-wax": "wax-half-arm",
      "full-arm-wax": "wax-full-arm",
      "half-leg-wax": "wax-half-leg",
      "full-leg-wax": "wax-full-leg",
      // IPL (old slug → current item id)
      "brazillian-ipl": "ipl-brazilian",
      "hollywood-ipl": "ipl-hollywood",
      "full-face-ipl": "ipl-full-face",
      "full-face-neck-ipl": "ipl-full-face-neck",
      "under-arm-ipl": "ipl-underarm",
      "belly-button-ipl": "ipl-belly-button",
      "stomach-ipl": "ipl-stomach",
      "toes-feet-ipl": "ipl-toes-feet",
      "full-buttocks-ipl": "ipl-buttocks",
      "bikini-sides-ipl": "ipl-bikini-sides",
      "half-leg-ipl": "ipl-half-leg",
      "full-leg-ipl": "ipl-full-leg",
      "half-arm-ipl": "ipl-half-arm",
      "full-arm-ipl": "ipl-full-arm",
      "beardline-ipl": "ipl-beardline",
      "neck-ipl": "ipl-neck",
      "neck-ipl-men": "ipl-neck-men",
      "tattoo-removal": "tattoo-removal",
      // Dermalogica — slugs that still exist unchanged
      "pro-dermaplaning-30": "pro-dermaplaning-30",
      "neurosculpt-30": "neurosculpt-30",
      "luminfusion": "luminfusion",
      "melanopro-peel": "melanopro-peel",
      "hydraderm": "hydraderm",
      "pro-microneedling": "pro-microneedling",
      "nanoinfusion": "nanoinfusion",
      "ultra-calming-facial": "ultra-calming-facial",
      "skin-clearing-facial": "skin-clearing-facial",
      "age-smart-facial": "age-smart-facial",
      "power-peel-30": "power-peel-30",
      "power-peel-60": "power-peel-60",
      // QMS — slugs that still exist unchanged
      "activator-treatment": "activator-treatment",
      "deep-pore-cleansing": "deep-pore-cleansing",
      "rejuvenating-facial": "rejuvenating-facial",
      "collagen-facial": "collagen-facial",
      "sensitive-skin-facial": "sensitive-skin-facial",
      // Permanent Makeup — unchanged
      "powderpixel-brows": "powderpixel-brows",
      "hybrid-brows": "hybrid-brows",
      "eyeliner-top": "eyeliner-top",
      "eyeliner-bottom": "eyeliner-bottom",
      "full-lips-contour": "full-lips-contour",
      "lip-liner": "lip-liner",
      // Makeup — unchanged
      "day-makeup": "day-makeup",
      "evening-makeup": "evening-makeup",
      // Lashes — where current id is known
      "glamour-lashes": "glamour-lashes",
      "lash-lamination": "lash-lamination",
      "brow-henna": "brow-henna",
      // Hair — old slug → current item id
      "botox-short": "botox",
      "botox-medium": "botox",
      "botox-long": "botox",
      "brazilian-blow-short": "brazilian-short",
      "brazilian-blow-long": "brazilian-long",
      "brazilian-blow-extra-long": "brazilian-xl",
      "short-upstyle": "upstyle-short",
      "medium-upstyle": "upstyle-medium",
      "long-upstyle": "upstyle-long",
      "medium-blow": "blow-medium",
      "long-blow": "blow-long",
      "extra-long-blow": "blow-xl",
    };

    // 3. Build flat /prices/[slug] redirect rules for all previously indexed slugs
    const flatServiceRedirects: Array<{ source: string; destination: string; permanent: boolean }> = [];
    const seen = new Set<string>();

    for (const slug of SERVICE_SLUGS) {
      if (seen.has(slug)) continue;
      seen.add(slug);

      const currentCat = slugToCat.get(slug);
      if (currentCat) {
        // Current service: redirect flat URL to canonical category/slug page
        flatServiceRedirects.push({
          source: `/prices/${slug}`,
          destination: `/prices/${currentCat}/${slug}`,
          permanent: true,
        });
      } else {
        // Stale slug: redirect to specific service if remapped, otherwise to category
        const fallbackCat = staleCategoryMap[slug] || null;
        const remappedSlug = staleSlugRemaps[slug] || null;
        flatServiceRedirects.push({
          source: `/prices/${slug}`,
          destination: fallbackCat
            ? (remappedSlug ? `/prices/${fallbackCat}/${remappedSlug}` : `/prices/${fallbackCat}`)
            : `/prices`,
          permanent: true,
        });
      }
    }

    // Also cover any current services not yet in SERVICE_SLUGS
    for (const [slug, cat] of slugToCat) {
      if (!seen.has(slug)) {
        flatServiceRedirects.push({
          source: `/prices/${slug}`,
          destination: `/prices/${cat}/${slug}`,
          permanent: true,
        });
      }
    }

    // 4. Generate /prices/[category]/[staleSlug] redirects for ALL stale slugs.
    //    This is the key fix: Google indexed category/service URLs with old slugs.
    //    Since dynamicParams=false, any unrecognised slug in the [service] segment 404s.
    //    We must redirect /prices/[cat]/[oldSlug] → /prices/[cat]/[currentSlug or just /prices/[cat].
    const staleCategoryServiceRedirects: Array<{ source: string; destination: string; permanent: boolean }> = [];
    for (const [staleSlug, cat] of Object.entries(staleCategoryMap)) {
      // If this slug still exists as a current service, no redirect needed — the page still works
      if (slugToCat.has(staleSlug)) continue;
      const remappedSlug = staleSlugRemaps[staleSlug] || null;
      staleCategoryServiceRedirects.push({
        source: `/prices/${cat}/${staleSlug}`,
        destination: remappedSlug ? `/prices/${cat}/${remappedSlug}` : `/prices/${cat}`,
        permanent: true,
      });
    }

    return [
      // === /services → /prices consolidation ===
      { source: '/services', destination: '/prices', permanent: true },
      { source: '/services/:category', destination: '/prices/:category', permanent: true },
      { source: '/services/:category/:service', destination: '/prices/:category/:service', permanent: true },

      // === Category URL corrections (old wrong slugs → correct category IDs) ===
      { source: '/prices/lashes', destination: '/prices/lashes-brows', permanent: true },
      { source: '/prices/qms-facial', destination: '/prices/qms', permanent: true },
      { source: '/prices/pro-skin', destination: '/prices/dermalogica', permanent: true },

      // === Root-level service page consolidation → /prices/ ===
      { source: '/laser-hair-removal', destination: '/prices/ipl', permanent: true },
      { source: '/anti-aging', destination: '/prices/hart-aesthetics', permanent: true },
      { source: '/body-contouring', destination: '/prices/fat-freezing', permanent: true },
      { source: '/medical-spa', destination: '/prices/medical', permanent: true },
      { source: '/permanent-makeup', destination: '/prices/permanent-makeup', permanent: true },
      { source: '/bridal-beauty', destination: '/prices', permanent: true },
      { source: '/matric-dance', destination: '/prices', permanent: true },

      // === Programmatically generated: /prices/[category]/[staleSlug] → correct page ===
      ...staleCategoryServiceRedirects,

      // === Flat /prices/[slug] → /prices/[category]/[slug] or /prices/[category] ===
      ...flatServiceRedirects,
    ];
  },
};

export default nextConfig;
