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

const CATEGORY_IDS = [
  'hart-aesthetics', 'fat-freezing', 'slimming', 'massages', 'dermalogica',
  'ipl', 'makeup', 'medical', 'permanent-makeup', 'qms', 'sunbed',
  'waxing', 'hair', 'nails', 'lashes-brows', 'hair-extensions',
];
CATEGORY_IDS.forEach((id) => VALID_CATEGORIES.add(id));

const NOT_FOUND_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>404 | Galeo Beauty</title>
    <meta name="robots" content="noindex, nofollow" />
    <style>
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #faf8f4; color: #171717; }
      main { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      section { max-width: 640px; text-align: center; background: #ffffff; border: 1px solid #e8e2d8; border-radius: 24px; padding: 40px 28px; box-shadow: 0 24px 64px rgba(23, 23, 23, 0.08); }
      .eyebrow { display: inline-block; margin-bottom: 16px; color: #9b7a3d; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
      h1 { margin: 0 0 12px; font-size: clamp(2rem, 4vw, 3rem); }
      p { margin: 0 0 24px; line-height: 1.6; color: #57534e; }
      nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
      a { display: inline-block; text-decoration: none; border-radius: 999px; padding: 12px 18px; font-weight: 600; }
      .primary { background: #b89555; color: #171717; }
      .secondary { border: 1px solid #d6c8ad; color: #171717; background: #ffffff; }
    </style>
  </head>
  <body>
    <main>
      <section>
        <span class="eyebrow">404</span>
        <h1>Page Not Found</h1>
        <p>The page you requested is not available. You can continue exploring Galeo Beauty from one of the links below.</p>
        <nav>
          <a class="primary" href="/">Return Home</a>
          <a class="secondary" href="/prices">View Services</a>
          <a class="secondary" href="/locations">Browse Locations</a>
          <a class="secondary" href="/contact">Contact Us</a>
        </nav>
      </section>
    </main>
  </body>
</html>`;

function buildNotFoundResponse() {
  return new NextResponse(NOT_FOUND_HTML, {
    status: 404,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=300',
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

  const pricesMatch = pathname.match(/^\/prices\/([^/]+)$/);
  if (pricesMatch) {
    const segment = pricesMatch[1];
    if (!VALID_CATEGORIES.has(segment)) {
      return NextResponse.redirect(
        new URL('/prices', request.url),
        301
      );
    }
  }

  const locationHubMatch = pathname.match(/^\/locations\/([^/]+)$/);
  if (locationHubMatch) {
    const [, locationSlug] = locationHubMatch;
    if (!isKnownLocationSlug(locationSlug)) {
      return buildNotFoundResponse();
    }
  }

  const locationServiceMatch = pathname.match(/^\/locations\/([^/]+)\/([^/]+)$/);
  if (locationServiceMatch) {
    const [, locationSlug, serviceSegment] = locationServiceMatch;

    if (!isKnownLocationSlug(locationSlug)) {
      return buildNotFoundResponse();
    }

    if (!isRecognizedLocationServiceSegment(serviceSegment)) {
      return buildNotFoundResponse();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
