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

const NOT_FOUND_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>404 | Galeo Beauty</title>
    <meta name="robots" content="noindex, nofollow" />
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: linear-gradient(180deg, #fbf8f2 0%, #ffffff 100%); color: #171717; }
      main { min-height: 100vh; padding: 24px; display: grid; place-items: center; }
      .shell { width: min(760px, 100%); background: #ffffff; border: 1px solid rgba(23,23,23,0.05); border-radius: 32px; padding: 56px 32px; text-align: center; box-shadow: 0 24px 64px rgba(17,17,17,0.06); }
      .eyebrow { display: inline-flex; align-items: center; width: fit-content; border-radius: 999px; border: 1px solid rgba(184,149,85,0.25); background: rgba(184,149,85,0.1); padding: 10px 16px; color: #9b7a3d; font-size: 12px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; }
      h1 { margin: 20px 0 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1; color: #171717; }
      p { margin: 16px auto 0; max-width: 560px; color: #57534e; line-height: 1.75; font-size: 18px; }
      a { text-decoration: none; }
      .actions { display: grid; gap: 12px; margin: 40px auto 0; max-width: 560px; }
      .button { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 14px 20px; font-weight: 700; transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease; }
      .button-primary { background: #b89555; color: #171717; }
      .button-secondary { background: #ffffff; color: #171717; border: 1px solid #d6c8ad; }
      @media (min-width: 640px) {
        .actions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="shell">
        <div class="eyebrow">404</div>
        <h1>Page Not Found</h1>
        <p>The page you are looking for is unavailable. Continue browsing Galeo Beauty using one of the links below.</p>
        <div class="actions">
          <a class="button button-primary" href="/services">View Services</a>
          <a class="button button-secondary" href="/gallery">View Gallery</a>
          <a class="button button-secondary" href="/specials">View Specials</a>
          <a class="button button-secondary" href="/">Return Home</a>
        </div>
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
