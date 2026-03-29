import { Metadata } from "next";
import { generateBreadcrumbSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Specials & Promotions | Galeo Beauty Hartbeespoort",
    description:
        "Explore the latest specials at Galeo Beauty in Hartbeespoort, including curated savings on facials, lashes, massage, and seasonal treatment offers.",
    keywords: [
        "beauty specials Hartbeespoort",
        "beauty promotions Hartbeespoort",
        "facial specials Hartbeespoort",
        "IPL package deals Hartbeespoort",
        "nail specials Hartbeespoort",
        "lash specials Hartbeespoort",
        "Galeo Beauty specials",
        "beauty vouchers Hartbeespoort",
        "seasonal salon offers Hartbeespoort",
        "treatment packages Hartbeespoort",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/specials",
    },
    openGraph: {
        title: "Specials & Promotions | Galeo Beauty Hartbeespoort",
        description:
            "Latest curated treatment offers from Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/specials",
        type: "website",
    },
};

const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.galeobeauty.com" },
    { name: "Specials", url: "https://www.galeobeauty.com/specials" },
]);

export default function SpecialsLayout({
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
