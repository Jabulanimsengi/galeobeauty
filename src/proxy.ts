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
      const canonicalCategoryId = SERVICE_CATEGORY_BY_SLUG.get(segment);
      if (canonicalCategoryId) {
        return NextResponse.redirect(
          new URL(`/services/${canonicalCategoryId}/${segment}`, request.url),
          301
        );
      }

      const legacyRedirectPath = resolveLegacyServiceRedirect(segment);
      if (legacyRedirectPath) {
        const canonicalSlug = legacyRedirectPath.serviceSlug ?? segment;
        return NextResponse.redirect(
          new URL(`/services/${legacyRedirectPath.categoryId}/${canonicalSlug}`, request.url),
          301
        );
      }

      return NextResponse.redirect(
        new URL('/services', request.url),
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

    if (!isKnownLocationSlug(locationSlug)) {
      return rewriteToAppNotFound(request);
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
