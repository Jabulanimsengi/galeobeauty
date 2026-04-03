import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";

import { GalleryGrid } from "@/components/gallery";
import { getGalleryImages } from "@/lib/gallery-utils";
import { generateBreadcrumbSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Treatment Gallery in Hartbeespoort",
    description:
        "Browse our gallery of beauty treatments, nail art, skincare results, and salon ambiance at Galeo Beauty in Hartbeespoort. See real before & after results.",
    keywords: [
        "beauty salon gallery Hartbeespoort",
        "nail art photos Hartbeespoort",
        "before and after beauty treatments",
        "skincare results gallery",
        "lash extensions results Hartbeespoort",
        "salon interior Hartbeespoort",
        "permanent makeup results",
        "facial treatment photos",
        "Galeo Beauty portfolio",
        "beauty transformation gallery South Africa",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/gallery",
    },
    openGraph: {
        title: "Treatment Gallery in Hartbeespoort",
        description:
            "Browse real treatment results, nail art, skincare before & afters at Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/gallery",
        type: "website",
        images: [
            {
                url: "https://www.galeobeauty.com/images/gallery/facials/professional-skin-facial-treatment-in-progress.jpg",
                alt: "Gallery of real treatment results at Galeo Beauty in Hartbeespoort",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Treatment Gallery in Hartbeespoort",
        description:
            "Browse real treatment results, nail art, skincare before & afters at Galeo Beauty in Hartbeespoort.",
        images: ["https://www.galeobeauty.com/images/gallery/facials/professional-skin-facial-treatment-in-progress.jpg"],
    },
};

const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.galeobeauty.com" },
    { name: "Gallery", url: "https://www.galeobeauty.com/gallery" },
]);

export default function GalleryPage() {
    const images = getGalleryImages();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Header />
            <main className="bg-background min-h-screen">
                <section className="relative overflow-hidden px-6 pt-32 pb-16 lg:pt-40 lg:pb-24">
                    <div className="absolute top-0 right-0 h-full w-2/3 -z-10 skew-x-12 bg-rose-50/20" />
                    <div className="container mx-auto text-center">
                        <div>
                            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
                                Galeo Beauty Hartbeespoort Portfolio
                            </span>
                            <h1 className="mb-6 font-serif text-4xl text-foreground sm:text-5xl lg:text-6xl">
                                Our <span className="italic text-gold">Gallery</span> in Hartbeespoort
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
                                A curated glimpse into Galeo Beauty - treatment results, nail artistry, and salon moments near Hartbeespoort Dam.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-amber-50/20 py-16 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                        <h2 className="mb-12 text-center font-serif text-3xl text-foreground md:text-4xl">
                            Life at Galeo Beauty <span className="text-gold">Hartbeespoort</span>
                        </h2>

                        {images.length > 0 ? (
                            <GalleryGrid items={images} />
                        ) : (
                            <p className="text-center text-muted-foreground">
                                No gallery images found. Add images to{" "}
                                <code className="rounded bg-secondary px-2 py-1">
                                    public/images/gallery/
                                </code>
                            </p>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
