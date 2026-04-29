
import { Metadata } from "next";
import { ServicesClient } from "./ServicesClient";
import { buildServicesPageKeywords } from "@/lib/seo-keywords";

export const metadata: Metadata = {
    title: "Beauty Services in Hartbeespoort | Galeo Beauty",
    description: "Browse the Galeo Beauty service menu in Hartbeespoort, from hair, nails, lash lift and tint, and facials to massage, waxing, IPL, and advanced aesthetics.",
    keywords: buildServicesPageKeywords(),
    alternates: {
        canonical: "https://www.galeobeauty.com/services",
    },
};

type ServicesPageProps = {
    searchParams: Promise<{
        category?: string | string[];
        q?: string | string[];
    }>;
};

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
    const resolvedSearchParams = await searchParams;
    const categoryParam = Array.isArray(resolvedSearchParams.category)
        ? resolvedSearchParams.category[0]
        : resolvedSearchParams.category;
    const queryParam = Array.isArray(resolvedSearchParams.q)
        ? resolvedSearchParams.q[0]
        : resolvedSearchParams.q;

    return (
        <ServicesClient categoryParam={categoryParam} queryParam={queryParam} />
    );
}
