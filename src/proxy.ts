import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { serviceCategoriesContent } from './lib/services-content';
import { resolveLegacyServiceRedirect } from './lib/legacy-service-redirects';
import { isKnownLocationSlug } from './lib/location-route-manifest';
import { INTENT_PAGE_REDIRECTS } from './lib/intent-redirects';
import {
  getCanonicalLocalCategoryPath,
  getCanonicalLocalServicePath,
  resolveLocalCategoryRoute,
  resolveLocalServiceRoute,
} from './lib/local-seo-routes';

const VALID_CATEGORIES = new Set<string>();
const VALID_SERVICE_SLUGS = new Set<string>(
  serviceCategoriesContent.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.items.map((item) => item.id)
    )
  )
);
const SERVICE_CATEGORY_BY_SLUG = new Map<string, string>();

serviceCategoriesContent.forEach((category) => {
  category.subcategories.forEach((subcategory) => {
    subcategory.items.forEach((item) => {
      SERVICE_CATEGORY_BY_SLUG.set(item.id, category.id);
    });
  });
});

const CATEGORY_IDS = [
  'hart-aesthetics', 'fat-freezing', 'slimming', 'massages', 'dermalogica',
  'ipl', 'makeup', 'medical', 'permanent-makeup', 'qms', 'sunbed',
  'waxing', 'hair', 'nails', 'lashes-brows', 'hair-extensions',
];
CATEGORY_IDS.forEach((id) => VALID_CATEGORIES.add(id));

const LEGACY_CATEGORY_SEGMENT_REDIRECTS: Record<string, string> = {
  'lashes': 'lashes-brows',
  'pro-skin': 'dermalogica',
  'qms-facial': 'qms',
  'skin': 'dermalogica',
};

const ROOT_SERVICE_REDIRECT_CATEGORIES: Record<string, string> = {
  'laser-hair-removal': 'ipl',
  'anti-aging': 'hart-aesthetics',
  'body-contouring': 'fat-freezing',
  'medical-spa': 'medical',
  'permanent-makeup': 'permanent-makeup',
};

function rewriteToAppNotFound(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/_not-found';
  url.search = '';

  return NextResponse.rewrite(url, {
    status: 404,
    headers: {
      'x-robots-tag': 'noindex, nofollow',
    },
  });
}

function isRecognizedLocationServiceSegment(segment: string): boolean {
  return (
    VALID_SERVICE_SLUGS.has(segment) ||
    VALID_CATEGORIES.has(segment) ||
    resolveLegacyServiceRedirect(segment) !== null
  );
}

function getCanonicalServicePath(serviceSegment: string): string | null {
  const canonicalCategoryId = SERVICE_CATEGORY_BY_SLUG.get(serviceSegment);

  if (canonicalCategoryId) {
    return getCanonicalLocalServicePath(canonicalCategoryId, serviceSegment) ??
      `/services/${canonicalCategoryId}/${serviceSegment}`;
  }

  const legacyRedirectPath = resolveLegacyServiceRedirect(serviceSegment);

  if (!legacyRedirectPath) {
    return null;
  }

  return legacyRedirectPath.serviceSlug
    ? getCanonicalLocalServicePath(legacyRedirectPath.categoryId, legacyRedirectPath.serviceSlug) ??
      `/services/${legacyRedirectPath.categoryId}/${legacyRedirectPath.serviceSlug}`
    : getCanonicalLocalCategoryPath(legacyRedirectPath.categoryId) ?? `/services/${legacyRedirectPath.categoryId}`;
}

function getLegacyServiceRedirectPath(serviceSegment: string): string | null {
  if (VALID_SERVICE_SLUGS.has(serviceSegment)) {
    return null;
  }

  const legacyRedirectPath = resolveLegacyServiceRedirect(serviceSegment);

  if (!legacyRedirectPath) {
    return null;
  }

  if (!legacyRedirectPath.serviceSlug) {
    return getCanonicalLocalCategoryPath(legacyRedirectPath.categoryId) ?? `/services/${legacyRedirectPath.categoryId}`;
  }

  if (legacyRedirectPath.serviceSlug === serviceSegment) {
    return null;
  }

  return getCanonicalLocalServicePath(legacyRedirectPath.categoryId, legacyRedirectPath.serviceSlug) ??
    `/services/${legacyRedirectPath.categoryId}/${legacyRedirectPath.serviceSlug}`;
}

function getLegacyLocationServiceRedirectPath(locationSlug: string, serviceSegment: string): string | null {
  if (VALID_SERVICE_SLUGS.has(serviceSegment)) {
    return null;
  }

  const legacyRedirectPath = resolveLegacyServiceRedirect(serviceSegment);

  if (!legacyRedirectPath) {
    return null;
  }

  if (!legacyRedirectPath.serviceSlug) {
    return getCanonicalLocalCategoryPath(legacyRedirectPath.categoryId) ?? `/services/${legacyRedirectPath.categoryId}`;
  }

  if (legacyRedirectPath.serviceSlug === serviceSegment) {
    return null;
  }

  return getCanonicalLocalServicePath(legacyRedirectPath.categoryId, legacyRedirectPath.serviceSlug, locationSlug) ??
    `/locations/${locationSlug}/${legacyRedirectPath.serviceSlug}`;
}

function getLegacySalonRedirectPath(pathname: string): string | null {
  const slug = pathname.match(/^\/salons\/([^/]+)/)?.[1] || "";

  if (!slug) {
    return "/services";
  }

  if (/wax/.test(slug)) return getCanonicalLocalCategoryPath("waxing") ?? "/services/waxing";
  if (/massage|spa/.test(slug)) return getCanonicalLocalCategoryPath("massages") ?? "/services/massages";
  if (/nail|manicure|pedicure/.test(slug)) return getCanonicalLocalCategoryPath("nails") ?? "/services/nails";
  if (/lash|brow/.test(slug)) return getCanonicalLocalCategoryPath("lashes-brows") ?? "/services/lashes-brows";
  if (/hair/.test(slug)) return getCanonicalLocalCategoryPath("hair") ?? "/services/hair";
  if (/skin|facial|aesthetic|clinic/.test(slug)) return getCanonicalLocalCategoryPath("dermalogica") ?? "/services/dermalogica";

  return "/services";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const forwardedProto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '');
  const isLocalhost =
    hostname.startsWith('localhost') ||
    hostname.includes('127.0.0.1');
  const isCanonicalHost = hostname === 'www.galeobeauty.com';

  if (
    !isLocalhost &&
    (hostname.endsWith('galeobeauty.com') || hostname === 'www.galeobeauty.com') &&
    (!isCanonicalHost || forwardedProto !== 'https')
  ) {
    const newUrl = new URL(request.url);
    newUrl.protocol = 'https:';
    newUrl.hostname = 'www.galeobeauty.com';
    newUrl.port = '';
    return NextResponse.redirect(newUrl, 301);
  }

  const flatIntentSlug = pathname.match(/^\/([^/]+)$/)?.[1];
  const localCategoryRoute = flatIntentSlug ? resolveLocalCategoryRoute(flatIntentSlug) : null;
  if (flatIntentSlug && localCategoryRoute) {
    if (localCategoryRoute.slug !== flatIntentSlug) {
      return NextResponse.redirect(
        new URL(localCategoryRoute.href, request.url),
        301
      );
    }

    return NextResponse.next();
  }

  const rootServiceCategoryId = flatIntentSlug ? ROOT_SERVICE_REDIRECT_CATEGORIES[flatIntentSlug] : null;
  if (rootServiceCategoryId) {
    const canonicalCategoryPath = getCanonicalLocalCategoryPath(rootServiceCategoryId);
    return NextResponse.redirect(
      new URL(canonicalCategoryPath ?? '/services', request.url),
      301
    );
  }

  const flatIntentRedirectPath = flatIntentSlug ? INTENT_PAGE_REDIRECTS[flatIntentSlug] : null;
  if (flatIntentRedirectPath) {
    return NextResponse.redirect(
      new URL(flatIntentRedirectPath, request.url),
      301
    );
  }

  if (pathname === '/prices' || pathname.startsWith('/prices/')) {
    const pricesServiceMatch = pathname.match(/^\/prices\/([^/]+)\/([^/]+)$/);
    if (pricesServiceMatch) {
      const [, categorySegment, serviceSegment] = pricesServiceMatch;
      const directLocalServicePath = VALID_CATEGORIES.has(categorySegment)
        ? getCanonicalLocalServicePath(categorySegment, serviceSegment)
        : null;

      if (directLocalServicePath) {
        return NextResponse.redirect(
          new URL(directLocalServicePath, request.url),
          301
        );
      }

      const legacyRedirectPath = getLegacyServiceRedirectPath(serviceSegment);

      if (legacyRedirectPath) {
        return NextResponse.redirect(
          new URL(legacyRedirectPath, request.url),
          301
        );
      }
    }

    const pricesCategoryMatch = pathname.match(/^\/prices\/([^/]+)$/);
    if (pricesCategoryMatch) {
      const [, categoryOrServiceSegment] = pricesCategoryMatch;
      const directLocalCategoryPath = VALID_CATEGORIES.has(categoryOrServiceSegment)
        ? getCanonicalLocalCategoryPath(categoryOrServiceSegment)
        : null;
      const directLocalServicePath = getCanonicalServicePath(categoryOrServiceSegment);

      if (directLocalCategoryPath || directLocalServicePath) {
        return NextResponse.redirect(
          new URL(directLocalCategoryPath ?? directLocalServicePath ?? '/services', request.url),
          301
        );
      }
    }

    const newUrl = new URL(request.url);
    newUrl.pathname = pathname
      .replace(/^\/prices\/lashes(?=\/|$)/, '/services/lashes-brows')
      .replace(/^\/prices\/qms-facial(?=\/|$)/, '/services/qms')
      .replace(/^\/prices\/pro-skin(?=\/|$)/, '/services/dermalogica')
      .replace(/^\/prices\/skin(?=\/|$)/, '/services/dermalogica')
      .replace(/^\/prices/, '/services');
    return NextResponse.redirect(newUrl, 301);
  }

  const oldSitemapPatterns = [
    '/sitemap-seo/0.xml',
    '/sitemap-seo/1.xml',
    '/sitemap/0.xml',
    '/sitemap/1.xml',
    '/sitemap/2.xml',
    '/sitemap_index.xml',
  ];

  if (oldSitemapPatterns.includes(pathname)) {
    return NextResponse.redirect(
      new URL('/sitemap.xml', request.url),
      301
    );
  }

  if (pathname.match(/^\/sitemap(-seo)?\/\d+\.xml$/)) {
    return NextResponse.redirect(
      new URL('/sitemap.xml', request.url),
      301
    );
  }

  const legacyChunkMatch = pathname.match(/^\/sitemaps\/([01])\/\d+\.xml$/);
  if (legacyChunkMatch) {
    return NextResponse.redirect(
      new URL(`/sitemaps/${legacyChunkMatch[1]}.xml`, request.url),
      301
    );
  }

  if (pathname === '/salons' || pathname.startsWith('/salons/')) {
    return NextResponse.redirect(
      new URL(getLegacySalonRedirectPath(pathname) || '/services', request.url),
      301
    );
  }

  const singleServiceSegmentMatch = pathname.match(/^\/services\/([^/]+)$/);
  if (singleServiceSegmentMatch) {
    const segment = singleServiceSegmentMatch[1];
    if (VALID_CATEGORIES.has(segment)) {
      const canonicalCategoryPath = getCanonicalLocalCategoryPath(segment);
      if (canonicalCategoryPath) {
        return NextResponse.redirect(
          new URL(canonicalCategoryPath, request.url),
          301
        );
      }
    }

    if (!VALID_CATEGORIES.has(segment)) {
      const canonicalServicePath = getCanonicalServicePath(segment);
      if (canonicalServicePath) {
        return NextResponse.redirect(
          new URL(canonicalServicePath, request.url),
          301
        );
      }

      return NextResponse.redirect(
        new URL('/services', request.url),
        301
      );
    }
  }

  const categoryServiceMatch = pathname.match(/^\/services\/([^/]+)\/([^/]+)$/);
  if (categoryServiceMatch) {
    const [, categorySegment, serviceSegment] = categoryServiceMatch;
    const legacyRedirectPath = getLegacyServiceRedirectPath(serviceSegment);
    const canonicalServicePath = VALID_CATEGORIES.has(categorySegment)
      ? getCanonicalLocalServicePath(categorySegment, serviceSegment)
      : null;

    if (!VALID_CATEGORIES.has(categorySegment)) {
      const legacyCategoryId = LEGACY_CATEGORY_SEGMENT_REDIRECTS[categorySegment];
      if (legacyCategoryId) {
        return NextResponse.redirect(
          new URL(getCanonicalServicePath(serviceSegment) || `/services/${legacyCategoryId}`, request.url),
          301
        );
      }
    }

    if (VALID_CATEGORIES.has(categorySegment) && legacyRedirectPath) {
      return NextResponse.redirect(
        new URL(legacyRedirectPath, request.url),
        301
      );
    }

    if (canonicalServicePath) {
      return NextResponse.redirect(
        new URL(canonicalServicePath, request.url),
        301
      );
    }
  }

  const localNestedRouteMatch = pathname.match(/^\/([^/]+)\/([^/]+)$/);
  if (localNestedRouteMatch) {
    const [, categorySlug, serviceSlug] = localNestedRouteMatch;
    if (resolveLocalServiceRoute(categorySlug, serviceSlug)) {
      return NextResponse.next();
    }
  }

  const locationHubMatch = pathname.match(/^\/locations\/([^/]+)$/);
  if (locationHubMatch) {
    const [, locationSlug] = locationHubMatch;
    if (!isKnownLocationSlug(locationSlug)) {
      return rewriteToAppNotFound(request);
    }

    const canonicalCategoryPath = getCanonicalLocalCategoryPath('nails', locationSlug);
    if (canonicalCategoryPath) {
      return NextResponse.redirect(
        new URL(canonicalCategoryPath, request.url),
        301
      );
    }
  }

  const locationServiceMatch = pathname.match(/^\/locations\/([^/]+)\/([^/]+)$/);
  if (locationServiceMatch) {
    const [, locationSlug, serviceSegment] = locationServiceMatch;
    const canonicalServicePath = getCanonicalServicePath(serviceSegment);
    const legacyRedirectPath = getLegacyLocationServiceRedirectPath(locationSlug, serviceSegment);

    if (!isKnownLocationSlug(locationSlug)) {
      if (canonicalServicePath) {
        return NextResponse.redirect(
          new URL(canonicalServicePath, request.url),
          301
        );
      }

      return rewriteToAppNotFound(request);
    }

    if (legacyRedirectPath) {
      return NextResponse.redirect(
        new URL(legacyRedirectPath, request.url),
        301
      );
    }

    if (!isRecognizedLocationServiceSegment(serviceSegment)) {
      return rewriteToAppNotFound(request);
    }

    if (VALID_CATEGORIES.has(serviceSegment)) {
      const canonicalLocalCategoryPath = getCanonicalLocalCategoryPath(serviceSegment, locationSlug);
      if (canonicalLocalCategoryPath) {
        return NextResponse.redirect(
          new URL(canonicalLocalCategoryPath, request.url),
          301
        );
      }
    }

    const categoryId = SERVICE_CATEGORY_BY_SLUG.get(serviceSegment);
    if (categoryId) {
      const canonicalLocalPath = getCanonicalLocalServicePath(categoryId, serviceSegment, locationSlug);
      if (canonicalLocalPath) {
        return NextResponse.redirect(
          new URL(canonicalLocalPath, request.url),
          301
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
