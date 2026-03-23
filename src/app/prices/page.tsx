
import { Metadata } from "next";
import { Suspense } from "react";
import { RouteLoadingScreen } from "@/components/ui/RouteLoadingScreen";
import { PricesClient } from "./PricesClient";
import { buildPricesPageKeywords } from "@/lib/seo-keywords";

export const metadata: Metadata = {
    title: "Beauty Treatment Prices Hartbeespoort & Harties | Galeo Beauty Salon",
    description: "Full price list for beauty treatments in Hartbeespoort (Harties). Facials, injectables, IPL, nails, lashes, waxing, hair & more near Hartbeespoort Dam. Serving Centurion & Pretoria, North West.",
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
