import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";

import { GalleryGrid } from "@/components/gallery";
import { getGalleryImages } from "@/lib/gallery-utils";
import { generateBreadcrumbSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Gallery | Galeo Beauty Salon & Spa in Hartbeespoort",
    description:
        "Browse our gallery of beauty treatments, nail art, skincare results, and salon ambiance at Galeo Beauty in Hartbeespoort. See real before & after results.",
    keywords: [
        "beauty salon gallery Hartbeespoort",
        "nail art photos Hartbeespoort",
        "before and after beauty treatments",
        "skincare results gallery",
        "lash extensions gallery near me",
        "salon interior Hartbeespoort Dam",
        "permanent makeup results",
        "facial treatment photos",
        "Galeo Beauty portfolio",
        "beauty transformation gallery South Africa",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/gallery",
    },
    openGraph: {
        title: "Gallery | Galeo Beauty Salon & Spa Hartbeespoort",
        description:
            "Browse real treatment results, nail art, skincare before & afters at Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/gallery",
        type: "website",
    },
};

const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.galeobeauty.com" },
    { name: "Gallery", url: "https://www.galeobeauty.com/gallery" },
]);

export default function GalleryPage() {
    // This runs at build time - automatically reads images from the gallery folder
    const images = getGalleryImages();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-secondary/10 -z-10 skew-x-12" />
                    <div className="container mx-auto text-center">
                        <div>
                            <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 block">
                                Portfolio
                            </span>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                                <span className="sr-only">Galeo Beauty Treatment Gallery Hartbeespoort – </span>
                                Visual <span className="italic text-gold">Artistry</span>
                            </h1>
                            <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto leading-relaxed">
                                A curated glimpse into our world of beauty, precision, and
                                transformative care.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Masonry Gallery Grid */}
                <section className="py-16 md:py-24 bg-white/50">
                    <div className="container mx-auto px-4 sm:px-6">
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 text-center">
                            Galeo Life
                        </h2>

                        {images.length > 0 ? (
                            <GalleryGrid items={images} />
                        ) : (
                            <p className="text-center text-muted-foreground">
                                No gallery images found. Add images to{" "}
                                <code className="bg-secondary px-2 py-1 rounded">
                                    public/images/gallery/
                                </code>
                            </p>
                        )}
                    </div>
                </section>

                {/* Reviews Section */}

            </main>
            <Footer />
        </>
    );
}
