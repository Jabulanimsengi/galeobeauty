import { Metadata } from "next";
import { generateBreadcrumbSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "About Galeo Beauty | Top-Rated Salon in Hartbeespoort | Shop 6, Landsmeer",
    description: "Galeo Beauty is the top-rated beauty salon in Hartbeespoort, located at Shop 6, Landsmeer, Jan Smuts Rd, Hartbeespoort 0216. Founded in 2020, we offer premium facials, medical aesthetics, nail care, lash extensions & more. Serving Hartbeespoort Dam, Schoemansville, Melodie, Kosmos & Pretoria.",
    keywords: [
        "about galeo beauty",
        "beauty salon hartbeespoort",
        "salon in hartbeespoort",
        "hartbeespoort beauty salon",
        "hartbeespoort dam salon",
        "best salon hartbeespoort",
        "top rated salon hartbeespoort",
        "beauty salon near me hartbeespoort",
        "salon landsmeer hartbeespoort",
        "galeo beauty hartbeespoort",
        "beauty therapists hartbeespoort",
        "spa hartbeespoort",
        "day spa hartbeespoort dam",
        "facials hartbeespoort",
        "nails hartbeespoort",
        "lash extensions hartbeespoort",
        "skoonheidsalon hartbeespoort",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/about",
    },
    openGraph: {
        title: "About Galeo Beauty | Top-Rated Beauty Salon in Hartbeespoort",
        description: "Visit Galeo Beauty at Shop 6, Landsmeer, Jan Smuts Rd, Hartbeespoort 0216. Premium skincare, medical aesthetics, and luxury beauty treatments. 4.9★ rated.",
        url: "https://www.galeobeauty.com/about",
        type: "website",
    },
};

const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.galeobeauty.com" },
    { name: "About", url: "https://www.galeobeauty.com/about" },
]);

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
