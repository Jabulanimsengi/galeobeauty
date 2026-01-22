import { NextRequest, NextResponse } from 'next/server';

/**
 * SEO Sitemap Route Handler
 * Handles /sitemap-seo/[id] requests (e.g., /sitemap-seo/0, /sitemap-seo/1)
 * 
 * Contains static pages + location/service URLs
 * Using Google's 50,000 URL limit per sitemap.
 */

const MAX_URLS_PER_SITEMAP = 50000;

// Static pages configuration
const STATIC_PAGES = [
    { path: '', priority: 1.0, changefreq: 'weekly' },
    { path: '/prices', priority: 0.9, changefreq: 'weekly' },
    { path: '/specials', priority: 0.8, changefreq: 'weekly' },
    { path: '/gallery', priority: 0.7, changefreq: 'monthly' },
    { path: '/about', priority: 0.6, changefreq: 'monthly' },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog', priority: 0.85, changefreq: 'weekly' },
    { path: '/careers', priority: 0.5, changefreq: 'monthly' },
    { path: '/prices/hart-aesthetics', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/fat-freezing', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/slimming', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/dermalogica', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/ipl', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/makeup', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/medical', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/permanent-makeup', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/pro-skin', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/qms-facial', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/sunbed', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/waxing', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/hair', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/nails', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/lashes', priority: 0.85, changefreq: 'weekly' },
    { path: '/prices/hair-extensions', priority: 0.85, changefreq: 'weekly' },
    { path: '/services/microblading', priority: 0.85, changefreq: 'monthly' },
    { path: '/services/fat-freezing-treatment', priority: 0.85, changefreq: 'monthly' },
    { path: '/services/lash-extensions', priority: 0.85, changefreq: 'monthly' },
    { path: '/services/lip-fillers', priority: 0.85, changefreq: 'monthly' },
    { path: '/services/brazilian-wax', priority: 0.85, changefreq: 'monthly' },
    { path: '/services/dermalogica-facial', priority: 0.85, changefreq: 'monthly' },
    { path: '/services/nail-art', priority: 0.85, changefreq: 'monthly' },
    { path: '/services/massage-therapy', priority: 0.85, changefreq: 'monthly' },
];

const TARGET_LOCATIONS = [
    "hartbeespoort", "harties", "schoemansville", "melodie", "ifafi", "meerhof", "kosmos", "kosmos-village",
    "the-islands-estate", "estate-dafrique", "caribbean-beach-club", "key-west-estate", "eagles-landing", "montego-bay",
    "pecanwood", "pecanwood-estate", "magalies-park", "seasons-lifestyle-estate", "cove-ridge", "magalies-golf-estate", "lakeland-estate",
    "xanadu", "xanadu-nature-estate", "leloko", "leloko-lifestyle-estate", "the-coves", "la-camargue", "redstone-estate", "birdwood-estate",
    "gateway-manor", "landsmeer", "landsmeer-estate", "kosmos-ridge", "mount-kos", "ile-du-lac", "kshane",
    "broederstroom", "skeerpoort", "rietfontein-ah", "melodie-ah", "remhoogte", "welgegund",
    "village-mall-hartbeespoort", "islands-shopping-mall", "damdoryn", "damdoryn-junction", "mountain-lake-shopping-centre", "sediba-plaza", "jasmyn", "jasmyn-farm",
    "hartbeespoort-dam", "dam-wall", "oberon", "zilkaatsnek", "buffelspoort", "kommando-nek", "safari-gardens", "elandsfontein", "hekpoort",
    "magaliesburg", "brits",
    "johannesburg", "sandton", "bryanston", "rivonia", "fourways", "morningside", "douglasdale", "sunninghill", "paulshof", "lonehill", "woodmead", "diepsloot", "alexandra",
    "johannesburg-cbd", "braamfontein", "rosebank", "parkhurst", "houghton", "melville", "greenside", "auckland-park",
    "randburg", "northcliff", "linden", "blairgowrie", "ferndale", "roodepoort", "florida", "constantia-kloof", "weltevredenpark", "zandspruit", "north-riding", "honeydew",
    "glenvista", "mulbarton", "mondeor", "winchester-hills", "southgate", "kibler-park", "soweto", "orange-farm", "lenasia", "ennerdale", "eldorado-park",
    "midrand", "kyalami", "waterfall", "waterfall-city", "blue-hills", "halfway-house", "carlswald", "vorna-valley", "ivory-park", "rabie-ridge",
    "pretoria", "pretoria-east", "garsfontein", "moreleta-park", "faerie-glen", "lynnwood", "silver-lakes", "menlyn", "constantia-park", "waterkloof", "mamelodi",
    "pretoria-north", "montana", "annlin", "wonderboom", "akasia", "florauna", "theresapark", "soshanguve", "mabopane", "ga-rankuwa",
    "centurion", "irene", "die-hoewes", "zwartkop", "lyttelton", "eldoraigne", "rooihuiskraal", "wierdapark", "pierre-van-ryneveld", "midstream", "olievenhoutbosch",
    "pretoria-cbd", "arcadia", "hatfield", "brooklyn", "pretoria-west", "lotus-gardens", "atteridgeville",
    "roodeplaat", "rayton", "cullinan", "hammanskraal", "temba", "winterveldt",
    "kempton-park", "glen-marais", "birchleigh", "rhodesfield", "isando", "jet-park", "tembisa",
    "boksburg", "sunward-park", "benoni", "northmead", "rynfield", "brakpan", "springs", "nigel", "daveyton", "kwathema", "tsakane", "duduza", "etwatwa",
    "germiston", "bedfordview", "edenvale", "greenstone-hill", "modderfontein", "alberton", "brackenhurst", "katlehong", "vosloorus", "thokoza",
    "vereeniging", "vanderbijlpark", "meyerton", "heidelberg", "sebokeng", "sharpeville", "evaton", "ratanda",
    "krugersdorp", "randfontein", "westonaria", "carletonville", "muldersdrift", "lanseria", "kagiso", "mohlakeng", "khutsong", "bekkersdal"
];

const SERVICE_SLUGS = [
    "nefertiti-lift", "liquid-facelift", "collagen-biostimulator", "tox-per-unit",
    "undereye-2-treatments", "undereye-1-treatment", "cheek-fillers-2ml", "cheek-fillers-1ml", "russian-lip-1ml", "dermal-filler-1ml",
    "fat-freezing-session", "ems-single", "ems-package-4", "ems-package-6",
    "multivitamin-skin", "pro-dermaplaning-30", "neurosculpt-30", "pro-skin-treatment", "pro-calm-skin", "pro-firm-treatment",
    "pro-power-peel", "pro-dermaplaning-55", "neurosculpt-55", "infusion-undereye-peel", "luminfusion", "melanopro-peel", "hydraderm", "pro-microneedling", "nanoinfusion",
    "ultra-calming-facial", "skin-clearing-facial", "skin-brightening-facial", "age-smart-facial", "power-peel-30", "power-peel-60", "facial-30", "facial-60",
    "moustache-ipl", "beardline-ipl", "neck-ipl-men", "neck-ipl", "full-face-ipl", "full-face-neck-ipl",
    "under-arm-ipl", "belly-button-ipl", "stomach-ipl", "toes-feet-ipl", "full-buttocks-ipl",
    "bikini-sides-ipl", "brazillian-ipl", "hollywood-ipl", "half-leg-ipl", "full-leg-ipl", "full-leg-ipl-premium",
    "half-arm-ipl", "full-arm-ipl", "full-arm-ipl-premium", "tattoo-removal",
    "day-makeup", "evening-makeup", "bridal-makeup",
    "vaginal-tightening", "fractional-laser", "plasmage",
    "powderpixel-brows", "microblading", "hybrid-brows", "eyeliner-top", "eyeliner-bottom", "full-lips-contour", "lip-liner",
    "dermaplaning-pro", "dermaplaning-maintenance", "microneedling-hands", "microneedling-pro", "high-frequency-facial",
    "basic-facial-qms", "sensitive-skin-facial", "activator-treatment", "deep-pore-cleansing", "rejuvenating-facial", "collagen-facial", "chemical-peel",
    "sunbed-session", "sunbed-10-sessions", "sunbed-20-sessions", "spraytan",
    "lip-wax", "cheek-wax", "nose-wax", "ear-wax", "under-arm-wax", "full-tummy-wax", "chest-wax", "half-back-wax", "full-back-wax", "men-back-wax", "butt-wax",
    "half-arm-wax", "full-arm-wax", "half-leg-wax", "full-leg-wax", "brazillian-wax", "hollywood-wax",
    "cut-0-5-years", "haircut-short", "haircut-medium", "haircut-long", "pensioner-cut-blow",
    "medium-blow", "extra-long-blow", "long-blow", "short-blow-10x", "medium-blow-10x", "long-blow-10x", "extra-long-blow-10x",
    "roots", "short-color", "medium-color", "long-color", "extra-long-color", "balayage",
    "cap-highlights", "short-half-head-foils", "medium-half-head-foils", "long-half-head-foils", "extra-long-half-head-foils",
    "short-full-head-foils", "medium-full-head-foils", "long-full-head-foils", "extra-long-full-head-foils",
    "short-toner", "medium-toner", "long-toner",
    "osmo-intensive-mask", "osmo-silver-mask", "care-vital-mask", "care-keratin-mask", "botox-short", "botox-medium", "botox-long",
    "brazilian-blow-short", "brazilian-blow-long", "brazilian-blow-extra-long", "short-upstyle", "medium-upstyle", "long-upstyle",
    "manicure-basic", "acrylic-fill", "acrylic-overlay", "full-set-acrylic-tips", "sculpted-acrylic", "full-set-designer", "acrylic-soak-off",
    "gel-toes", "gel-overlay", "gel-fill", "rubber-base-fill", "gel-soak-off", "pedicure-gel", "nail-repair", "buff-only",
    "full-set-silk", "full-set-classic", "full-set-volume", "hybrid-lashes", "glamour-lashes", "lash-fill",
    "lash-tint", "lash-lift", "lash-lamination", "brow-tint", "brow-lamination", "brow-henna",
    "tape-35cm-dark", "tape-35cm-light", "tape-40cm-dark", "tape-40cm-light", "tape-45cm-dark", "tape-45cm-light",
    "tape-50cm-dark", "tape-50cm-light", "tape-55cm-dark", "tape-55cm-light", "tape-60cm-dark", "tape-60cm-light",
    "utip-35cm-dark", "utip-35cm-light", "utip-40cm-dark", "utip-40cm-light", "utip-45cm-dark", "utip-45cm-light",
    "utip-50cm-dark", "utip-50cm-light", "utip-55cm-dark", "utip-55cm-light", "utip-60cm-dark", "utip-60cm-light",
    "microloop-35cm-dark", "microloop-35cm-light", "microloop-40cm-dark", "microloop-40cm-light", "microloop-45cm-dark", "microloop-45cm-light",
    "microloop-50cm-dark", "microloop-50cm-light", "microloop-55cm-dark", "microloop-55cm-light", "microloop-60cm-dark", "microloop-60cm-light",
    "clip-35cm-dark", "clip-35cm-light", "clip-40cm-dark", "clip-40cm-light", "clip-45cm-dark", "clip-45cm-light",
    "clip-50cm-dark", "clip-50cm-light", "clip-55cm-dark", "clip-55cm-light", "clip-60cm-dark", "clip-60cm-light",
    "halo-35cm-dark", "halo-35cm-light", "halo-40cm-dark", "halo-40cm-light", "halo-45cm-dark", "halo-45cm-light",
    "halo-50cm-dark", "halo-50cm-light", "halo-55cm-dark", "halo-55cm-light", "halo-60cm-dark", "halo-60cm-light",
    "ponytail-35cm-dark", "ponytail-35cm-light", "ponytail-40cm-dark", "ponytail-40cm-light", "ponytail-45cm-dark", "ponytail-45cm-light",
    "ponytail-50cm-dark", "ponytail-50cm-light", "ponytail-55cm-dark", "ponytail-55cm-light", "ponytail-60cm-dark", "ponytail-60cm-light"
];

function getAllUrls(): { url: string; priority: number; changefreq: string }[] {
    const urls: { url: string; priority: number; changefreq: string }[] = [];

    for (const page of STATIC_PAGES) {
        urls.push({ url: page.path, priority: page.priority, changefreq: page.changefreq });
    }

    for (const location of TARGET_LOCATIONS) {
        for (const service of SERVICE_SLUGS) {
            urls.push({ url: `/locations/${location}/${service}`, priority: 0.7, changefreq: 'monthly' });
        }
    }

    return urls;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);

    if (isNaN(id) || id < 0) {
        return new NextResponse('Not Found', { status: 404 });
    }

    const baseUrl = 'https://www.galeobeauty.com';
    const lastmod = new Date().toISOString();
    const allUrls = getAllUrls();

    const startIndex = id * MAX_URLS_PER_SITEMAP;
    const endIndex = Math.min(startIndex + MAX_URLS_PER_SITEMAP, allUrls.length);

    if (startIndex >= allUrls.length) {
        return new NextResponse('Not Found', { status: 404 });
    }

    const chunkUrls = allUrls.slice(startIndex, endIndex);
    const xmlUrls: string[] = [];

    for (const urlData of chunkUrls) {
        xmlUrls.push(`
    <url>
        <loc>${baseUrl}${urlData.url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${urlData.changefreq}</changefreq>
        <priority>${urlData.priority}</priority>
    </url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls.join('')}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
