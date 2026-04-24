
import { Metadata } from "next";
import { PricesClient } from "./PricesClient";
import { buildPricesPageKeywords } from "@/lib/seo-keywords";

export const metadata: Metadata = {
    title: "Services Offered & Prices in Hartbeespoort",
    description: "Browse services and prices at Galeo Beauty in Hartbeespoort, from hair, nails, lash lift and tint, and facials to massage, waxing, IPL, and advanced aesthetics.",
    keywords: buildPricesPageKeywords(),
    alternates: {
        canonical: "https://www.galeobeauty.com/prices",
    },
};

type PricesPageProps = {
    searchParams: Promise<{
        category?: string | string[];
        q?: string | string[];
    }>;
};

export default async function PricesPage({ searchParams }: PricesPageProps) {
    const resolvedSearchParams = await searchParams;
    const categoryParam = Array.isArray(resolvedSearchParams.category)
        ? resolvedSearchParams.category[0]
        : resolvedSearchParams.category;
    const queryParam = Array.isArray(resolvedSearchParams.q)
        ? resolvedSearchParams.q[0]
        : resolvedSearchParams.q;

    return (
        <PricesClient categoryParam={categoryParam} queryParam={queryParam} />
    );
}
