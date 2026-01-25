import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
