import { Metadata } from "next";
import { generateBreadcrumbSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Specials & Promotions | Galeo Beauty Hartbeespoort",
    description:
        "Don't miss our latest beauty specials & promotions at Galeo Beauty in Hartbeespoort. Discounted facials, IPL packages, nail deals, lash specials & seasonal offers. Limited availability.",
    keywords: [
        "beauty specials Hartbeespoort",
        "salon promotions near me",
        "beauty deals Hartbeespoort Dam",
        "facial specials near me",
        "IPL package deals Hartbeespoort",
        "nail specials Hartbeespoort",
        "lash extension deals near me",
        "Galeo Beauty specials",
        "beauty vouchers Hartbeespoort",
        "spa deals near Pretoria",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/specials",
    },
    openGraph: {
        title: "Specials & Promotions | Galeo Beauty Hartbeespoort",
        description:
            "Latest beauty specials & promotions at Galeo Beauty. Discounted treatments, seasonal offers & package deals in Hartbeespoort.",
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
