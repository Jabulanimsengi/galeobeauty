import { MetadataRoute } from 'next';

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/"],
            },
            {
                userAgent: "OAI-SearchBot",
                allow: "/",
                disallow: ["/api/", "/_next/"],
            },
            {
                userAgent: "PerplexityBot",
                allow: "/",
                disallow: ["/api/", "/_next/"],
            },
            {
                userAgent: "GPTBot",
                disallow: "/",
            },
        ],
        sitemap: "https://www.galeobeauty.com/sitemap.xml",
    };
}
