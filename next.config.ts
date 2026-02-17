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

    // 2. Category inference for stale slugs (services that were renamed/removed but are still indexed)
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
      // Sunbed
      "sunbed-10-sessions": "sunbed", "sunbed-20-sessions": "sunbed", "spraytan": "sunbed",
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

    // 3. Build redirect rules for ALL indexed slugs
    const flatServiceRedirects: Array<{ source: string; destination: string; permanent: boolean }> = [];
    const seen = new Set<string>();

    // Handle all slugs from sitemap-config (previously indexed)
    for (const slug of SERVICE_SLUGS) {
      if (seen.has(slug)) continue;
      seen.add(slug);

      const currentCat = slugToCat.get(slug);
      if (currentCat) {
        // Current service → redirect to exact page
        flatServiceRedirects.push({
          source: `/prices/${slug}`,
          destination: `/prices/${currentCat}/${slug}`,
          permanent: true,
        });
      } else {
        // Stale slug → redirect to category page
        const fallbackCat = staleCategoryMap[slug] || null;
        flatServiceRedirects.push({
          source: `/prices/${slug}`,
          destination: fallbackCat ? `/prices/${fallbackCat}` : `/prices`,
          permanent: true,
        });
      }
    }

    // Also redirect current services not in SERVICE_SLUGS
    for (const [slug, cat] of slugToCat) {
      if (!seen.has(slug)) {
        flatServiceRedirects.push({
          source: `/prices/${slug}`,
          destination: `/prices/${cat}/${slug}`,
          permanent: true,
        });
      }
    }

    return [
      // === /services → /prices consolidation ===
      { source: '/services', destination: '/prices', permanent: true },
      { source: '/services/:category', destination: '/prices/:category', permanent: true },
      { source: '/services/:category/:service', destination: '/prices/:category/:service', permanent: true },

      // === Flat /prices/[slug] → /prices/[category]/[slug] or /prices/[category] ===
      ...flatServiceRedirects,
    ];
  },
};

export default nextConfig;
