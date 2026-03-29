
import { Metadata } from "next";
import { Suspense } from "react";
import { RouteLoadingScreen } from "@/components/ui/RouteLoadingScreen";
import { PricesClient } from "./PricesClient";
import { buildPricesPageKeywords } from "@/lib/seo-keywords";

export const metadata: Metadata = {
    title: "Beauty Treatment Prices | Galeo Beauty Hartbeespoort",
    description: "Explore Galeo Beauty's treatment prices in Hartbeespoort, from facials and injectables to hair, nails, massage, lashes, and body treatments.",
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
