import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Valid category IDs — keep in sync with services-content.ts
// Middleware runs in Edge Runtime so we can't import from src/lib directly
const VALID_CATEGORIES = new Set<string>();

// We can't import from src/lib here since middleware runs in Edge Runtime,
// so we inline the category IDs. Keep this in sync with services-content.ts.
const CATEGORY_IDS = [
  "hart-aesthetics", "fat-freezing", "slimming", "massages", "dermalogica",
  "ipl", "makeup", "medical", "permanent-makeup", "qms", "sunbed",
  "waxing", "hair", "nails", "lashes-brows", "hair-extensions",
];
CATEGORY_IDS.forEach((id) => VALID_CATEGORIES.add(id));

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // 1. Redirect non-www to www (for production only)
  if (
    hostname.startsWith('galeobeauty.com') &&
    !hostname.startsWith('www.') &&
    !hostname.startsWith('localhost') &&
    !hostname.includes('127.0.0.1')
  ) {
    const newUrl = new URL(request.url);
    newUrl.hostname = `www.${hostname}`;
    return NextResponse.redirect(newUrl, 301);
  }

  // 2. Redirect old sitemap URLs to the current sitemap
  const oldSitemapPatterns = [
    '/sitemap-seo/0.xml',
    '/sitemap-seo/1.xml',
    '/sitemap/0.xml',
    '/sitemap/1.xml',
    '/sitemap/2.xml',
  ];

  if (oldSitemapPatterns.includes(pathname)) {
    return NextResponse.redirect(
      new URL('/sitemap.xml', request.url),
      301
    );
  }

  // 3. Handle old sitemap index patterns
  if (pathname.match(/^\/sitemap(-seo)?\/\d+\.xml$/)) {
    return NextResponse.redirect(
      new URL('/sitemap.xml', request.url),
      301
    );
  }

  // 4. Catch-all: Flat /prices/[slug] where slug is NOT a valid category
  //    Redirects stale indexed URLs like /prices/massage-45min → /prices
  //    This covers ALL flat URLs that Google has indexed, without needing
  //    to enumerate every possible slug.
  const pricesMatch = pathname.match(/^\/prices\/([^/]+)$/);
  if (pricesMatch) {
    const segment = pricesMatch[1];
    if (!VALID_CATEGORIES.has(segment)) {
      // Not a valid category — redirect to prices hub
      // (next.config.ts handles known slugs with specific redirects;
      //  this catches anything that slips through)
      return NextResponse.redirect(
        new URL('/prices', request.url),
        301
      );
    }
  }

  return NextResponse.next();
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
