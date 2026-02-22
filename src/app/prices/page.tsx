
import { Metadata } from "next";
import { Suspense } from "react";
import { Header, Footer } from "@/components/layout";
import { PricesClient } from "./PricesClient";

export const metadata: Metadata = {
    title: "Beauty Treatment Prices Hartbeespoort & Harties | Galeo Beauty Salon",
    description: "Full price list for beauty treatments in Hartbeespoort (Harties). Facials, injectables, IPL, nails, lashes, waxing, hair & more near Hartbeespoort Dam. Serving Centurion & Pretoria, North West.",
    keywords: ["beauty prices Hartbeespoort", "salon prices Harties", "treatment prices near Hartbeespoort Dam", "beauty salon Harties Dam area", "Galeo Beauty prices", "salon near Centurion", "beauty treatments near Pretoria", "beauty salon North West"],
    alternates: {
        canonical: "https://www.galeobeauty.com/prices",
    },
};

export default function PricesPage() {
    return (
        <Suspense fallback={
            <>
                <Header />
                <main className="min-h-screen pt-40 px-6 bg-background flex items-center justify-center">
                    <div className="text-gold font-medium">Loading treatments...</div>
                </main>
                <Footer />
            </>
        }>
            <PricesClient />
        </Suspense>
    );
}
