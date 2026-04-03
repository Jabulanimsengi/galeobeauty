
import { Metadata } from "next";
import { Suspense } from "react";
import { RouteLoadingScreen } from "@/components/ui/RouteLoadingScreen";
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

export default function PricesPage() {
    return (
        <Suspense fallback={<RouteLoadingScreen message="Loading treatments..." />}>
            <PricesClient />
        </Suspense>
    );
}
