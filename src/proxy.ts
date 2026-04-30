import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { serviceCategoriesContent } from './lib/services-content';
import { resolveLegacyServiceRedirect } from './lib/legacy-service-redirects';
import { isKnownLocationSlug } from './lib/location-route-manifest';

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
    return `/services/${canonicalCategoryId}/${serviceSegment}`;
  }

  const legacyRedirectPath = resolveLegacyServiceRedirect(serviceSegment);

  if (!legacyRedirectPath) {
    return null;
  }

  return legacyRedirectPath.serviceSlug
    ? `/services/${legacyRedirectPath.categoryId}/${legacyRedirectPath.serviceSlug}`
    : `/services/${legacyRedirectPath.categoryId}`;
}

function getLegacyServiceRedirectPath(serviceSegment: string): string | null {
  const legacyRedirectPath = resolveLegacyServiceRedirect(serviceSegment);

  if (!legacyRedirectPath) {
    return null;
  }

  if (!legacyRedirectPath.serviceSlug) {
    return VALID_SERVICE_SLUGS.has(serviceSegment)
      ? null
      : `/services/${legacyRedirectPath.categoryId}`;
  }

  if (legacyRedirectPath.serviceSlug === serviceSegment) {
    return null;
  }

  return `/services/${legacyRedirectPath.categoryId}/${legacyRedirectPath.serviceSlug}`;
}

function getLegacyLocationServiceRedirectPath(locationSlug: string, serviceSegment: string): string | null {
  const legacyRedirectPath = resolveLegacyServiceRedirect(serviceSegment);

  if (!legacyRedirectPath) {
    return null;
  }

  if (!legacyRedirectPath.serviceSlug) {
    return VALID_SERVICE_SLUGS.has(serviceSegment)
      ? null
      : `/services/${legacyRedirectPath.categoryId}`;
  }

  if (legacyRedirectPath.serviceSlug === serviceSegment) {
    return null;
  }

  return `/locations/${locationSlug}/${legacyRedirectPath.serviceSlug}`;
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

  if (pathname === '/prices' || pathname.startsWith('/prices/')) {
    const pricesServiceMatch = pathname.match(/^\/prices\/([^/]+)\/([^/]+)$/);
    if (pricesServiceMatch) {
      const [, , serviceSegment] = pricesServiceMatch;
      const legacyRedirectPath = getLegacyServiceRedirectPath(serviceSegment);

      if (legacyRedirectPath) {
        return NextResponse.redirect(
          new URL(legacyRedirectPath, request.url),
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

  const singleServiceSegmentMatch = pathname.match(/^\/services\/([^/]+)$/);
  if (singleServiceSegmentMatch) {
    const segment = singleServiceSegmentMatch[1];
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

    if (VALID_CATEGORIES.has(categorySegment) && legacyRedirectPath) {
      return NextResponse.redirect(
        new URL(legacyRedirectPath, request.url),
        301
      );
    }
  }

  const locationHubMatch = pathname.match(/^\/locations\/([^/]+)$/);
  if (locationHubMatch) {
    const [, locationSlug] = locationHubMatch;
    if (!isKnownLocationSlug(locationSlug)) {
      return rewriteToAppNotFound(request);
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
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
