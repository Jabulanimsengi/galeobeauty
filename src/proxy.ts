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
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: radial-gradient(circle at top, rgba(184,149,85,0.18), transparent 32%), linear-gradient(180deg, #fbf8f2 0%, #ffffff 56%, #f5efe3 100%); color: #171717; }
      main { min-height: 100vh; padding: 24px; display: grid; place-items: center; }
      .shell { width: min(1120px, 100%); background: rgba(255,255,255,0.92); border: 1px solid rgba(23,23,23,0.06); border-radius: 32px; box-shadow: 0 30px 80px rgba(17,17,17,0.08); overflow: hidden; }
      .layout { display: grid; gap: 32px; padding: 32px; }
      .hero { display: grid; gap: 24px; }
      .eyebrow { display: inline-flex; align-items: center; width: fit-content; border-radius: 999px; border: 1px solid rgba(184,149,85,0.3); background: rgba(184,149,85,0.1); padding: 10px 16px; color: #9b7a3d; font-size: 12px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; }
      h1 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(2.75rem, 5vw, 4.5rem); line-height: 0.98; color: #9b7a3d; }
      h2 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(2rem, 3vw, 3rem); line-height: 1.08; }
      p { margin: 0; color: #57534e; line-height: 1.75; }
      .lead { font-size: 18px; }
      .actions, .quick-links, .steps { display: grid; gap: 12px; }
      .action-row { display: flex; flex-wrap: wrap; gap: 12px; }
      a { text-decoration: none; }
      .button { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 14px 20px; font-weight: 700; transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease; }
      .button:hover { transform: translateY(-1px); }
      .button-primary { background: #b89555; color: #171717; }
      .button-secondary { background: #ffffff; color: #171717; border: 1px solid #d6c8ad; }
      .card-grid { display: grid; gap: 14px; }
      .step-card, .link-card, .contact-card { border-radius: 24px; padding: 18px; }
      .step-card { border: 1px solid rgba(23,23,23,0.06); background: rgba(250,248,244,0.9); }
      .step-kicker, .section-kicker { margin-bottom: 10px; color: #9b7a3d; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; }
      .side-panel { display: grid; gap: 18px; border: 1px solid rgba(23,23,23,0.06); background: #f8f3e8; border-radius: 28px; padding: 24px; }
      .contact-card, .link-card { background: rgba(255,255,255,0.9); border: 1px solid rgba(23,23,23,0.06); }
      .link-card:hover { border-color: rgba(184,149,85,0.35); box-shadow: 0 18px 36px rgba(17,17,17,0.08); }
      .link-title { color: #171717; font-weight: 700; margin-bottom: 6px; }
      .contact-link { display: block; margin-top: 8px; color: #171717; font-weight: 600; }
      .contact-link.secondary { color: #57534e; font-weight: 500; }
      @media (min-width: 920px) {
        .layout { grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr); gap: 40px; padding: 48px; }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="shell">
        <div class="layout">
          <div class="hero">
            <div class="eyebrow">Error 404</div>
            <div>
              <h1>Page Not Found</h1>
              <h2>Let&apos;s get you back to the right treatment, location, or booking page.</h2>
            </div>
            <p class="lead">The page you requested is not available. It may have moved, expired, or never existed. The fastest way forward is to start from the service hub, the locations hub, or contact Galeo Beauty directly.</p>
            <div class="action-row">
              <a class="button button-primary" href="/prices">View Services</a>
              <a class="button button-secondary" href="/locations">Browse Locations</a>
              <a class="button button-secondary" href="/">Return Home</a>
            </div>
            <div class="steps card-grid">
              <div class="step-card">
                <div class="step-kicker">Step 1</div>
                <p>Check the URL for spelling mistakes or outdated service names.</p>
              </div>
              <div class="step-card">
                <div class="step-kicker">Step 2</div>
                <p>Use the main service and location hubs instead of guessing an older page path.</p>
              </div>
              <div class="step-card">
                <div class="step-kicker">Step 3</div>
                <p>Contact the salon if you want help finding the correct booking or treatment page.</p>
              </div>
            </div>
          </div>
          <aside class="side-panel">
            <div>
              <div class="section-kicker">Need help fast?</div>
              <h2>Speak to Galeo Beauty</h2>
              <p>If you were looking for a service, price, or booking page, the team can point you to the right destination quickly.</p>
            </div>
            <div class="contact-card">
              <div class="section-kicker">Direct help</div>
              <a class="contact-link" href="https://wa.me/27824447389?text=Hi%20Galeo%20Beauty%2C%20I%20landed%20on%20a%20page%20that%20could%20not%20be%20found%20and%20need%20help%20finding%20the%20right%20service%20or%20booking%20page.">WhatsApp: 082 444 7389</a>
              <a class="contact-link secondary" href="tel:+27121111730">Call: +27121111730</a>
              <a class="contact-link secondary" href="mailto:info@galeobeauty.com">Email: info@galeobeauty.com</a>
            </div>
            <div class="quick-links card-grid">
              <a class="link-card" href="/prices">
                <div class="link-title">Browse Services</div>
                <p>Start from the full treatment menu and jump into the exact service you need.</p>
              </a>
              <a class="link-card" href="/locations">
                <div class="link-title">Explore Locations</div>
                <p>See which pages are available for Hartbeespoort, Gauteng, and nearby areas.</p>
              </a>
              <a class="link-card" href="/contact">
                <div class="link-title">Contact Galeo Beauty</div>
                <p>Reach the team if you want help finding the right treatment or booking page.</p>
              </a>
              <a class="link-card" href="/specials">
                <div class="link-title">View Specials</div>
                <p>Check current offers if you were looking for a promotion or package deal.</p>
              </a>
            </div>
          </aside>
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
