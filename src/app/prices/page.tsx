
import { Metadata } from "next";
import { Suspense } from "react";
import { Header, Footer } from "@/components/layout";
import { PricesClient } from "./PricesClient";

export const metadata: Metadata = {
    title: "Price List | Beauty Treatment Costs in Hartbeespoort",
    description: "View our comprehensive price list for facials, massages, nails, lashes, and aesthetic treatments. Transparent pricing for premium beauty services at Galeo Beauty.",
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
