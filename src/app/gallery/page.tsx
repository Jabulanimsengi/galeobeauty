"use client";

import { useState } from "react";
import { Header, Footer } from "@/components/layout";
import { Lightbox } from "@/components/ui/lightbox";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

const galleryItems = [
    {
        id: "1",
        src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=800&fit=crop",
        alt: "Luxury facial treatment at Galeo Beauty",
        title: "Luxury Facial",
        category: "facial",
    },
    {
        id: "2",
        src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=800&fit=crop",
        alt: "Professional nail art design",
        title: "Nail Art",
        category: "nails",
    },
    {
        id: "3",
        src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=800&fit=crop",
        alt: "Relaxing hot stone massage",
        title: "Hot Stone Massage",
        category: "massage",
    },
    {
        id: "4",
        src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop",
        alt: "Galeo Beauty salon interior",
        title: "Our Salon",
        category: "salon",
    },
    {
        id: "5",
        src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop",
        alt: "Professional hair styling",
        title: "Hair Styling",
        category: "hair",
    },
    {
        id: "6",
        src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=800&fit=crop",
        alt: "Premium skincare products",
        title: "Premium Products",
        category: "skincare",
    },
    {
        id: "7",
        src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=800&fit=crop",
        alt: "Advanced skin treatment",
        title: "Skin Treatment",
        category: "facial",
    },
    {
        id: "8",
        src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&h=800&fit=crop",
        alt: "Gel manicure service",
        title: "Gel Manicure",
        category: "nails",
    },
];

export default function GalleryPage() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const lightboxImages = galleryItems.map(item => ({
        src: item.src,
        alt: item.alt,
    }));

    return (
        <>
            <Header />
            <main>
                {/* Page Hero */}
                <section className="bg-gradient-to-b from-muted/50 to-background py-20 md:py-28">
                    <div className="container mx-auto px-4 text-center">
                        <span className="text-gold text-xs uppercase tracking-[0.3em] mb-3 block font-sans font-semibold">
                            Our Work
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
                            Beauty <span className="text-gold">Gallery</span>
                        </h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Browse our portfolio of treatments, transformations, and salon ambiance.
                            Click any image to view in full screen.
                        </p>
                    </div>
                </section>

                {/* Gallery Grid */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {galleryItems.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => openLightbox(index)}
                                    className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <ZoomIn className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="text-white">
                                            <h3 className="font-serif text-lg font-semibold">
                                                {item.title}
                                            </h3>
                                            <span className="text-sm text-white/70 capitalize">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Lightbox */}
            <Lightbox
                images={lightboxImages}
                initialIndex={currentIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </>
    );
}
