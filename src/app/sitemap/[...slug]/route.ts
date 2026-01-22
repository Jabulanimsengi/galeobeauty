import { NextRequest, NextResponse } from 'next/server';

/**
 * Individual Sitemap Route Handler
 * Handles /sitemap/0.xml, /sitemap/1.xml, etc.
 * 
 * Sitemap 0: Static pages (home, prices, specials, gallery, about, contact, blog)
 * Sitemap 1+: Location/service pages (placeholder for production build)
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;
    const filename = slug?.[0] || '0.xml';

    // Extract ID from filename (e.g., "0.xml" -> 0)
    const match = filename.match(/^(\d+)\.xml$/);
    if (!match) {
        return new NextResponse('Not Found', { status: 404 });
    }

    const id = parseInt(match[1], 10);
    const baseUrl = 'https://www.galeobeauty.com';

    // Sitemap 0: Static pages
    if (id === 0) {
        const urls: string[] = [];

        // Base pages
        const staticPages = [
            { url: baseUrl, priority: 1, changefreq: 'weekly' },
            { url: `${baseUrl}/prices`, priority: 0.9, changefreq: 'weekly' },
            { url: `${baseUrl}/specials`, priority: 0.8, changefreq: 'weekly' },
            { url: `${baseUrl}/gallery`, priority: 0.7, changefreq: 'monthly' },
            { url: `${baseUrl}/about`, priority: 0.6, changefreq: 'monthly' },
            { url: `${baseUrl}/contact`, priority: 0.8, changefreq: 'monthly' },
            { url: `${baseUrl}/blog`, priority: 0.85, changefreq: 'weekly' },
            { url: `${baseUrl}/careers`, priority: 0.5, changefreq: 'monthly' },
        ];

        // Service category pages
        const categories = [
            'hart-aesthetics', 'fat-freezing', 'slimming', 'dermalogica',
            'ipl', 'makeup', 'medical', 'permanent-makeup', 'pro-skin',
            'qms-facial', 'sunbed', 'waxing', 'hair', 'nails', 'lashes', 'hair-extensions'
        ];

        for (const cat of categories) {
            staticPages.push({ url: `${baseUrl}/prices/${cat}`, priority: 0.85, changefreq: 'weekly' });
        }

        // Service landing pages
        const servicePages = [
            'microblading', 'fat-freezing-treatment', 'lash-extensions',
            'lip-fillers', 'brazilian-wax', 'dermalogica-facial', 'nail-art', 'massage-therapy'
        ];

        for (const svc of servicePages) {
            staticPages.push({ url: `${baseUrl}/services/${svc}`, priority: 0.85, changefreq: 'monthly' });
        }

        for (const page of staticPages) {
            urls.push(`
    <url>
        <loc>${page.url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`);
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

        return new NextResponse(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });
    }

    // Sitemap 1+: Return placeholder (location pages are generated at build time)
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<!-- Location/service pages are generated during production build -->
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
