"use client";

import { useState } from "react";
import { Header, Footer } from "@/components/layout";
import { Lightbox } from "@/components/ui/lightbox";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

// Enhanced gallery data with aspect ratio hints for masonry goodness
const galleryItems = [
    {
        id: "1",
        src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=1200&fit=crop",
        alt: "Luxury facial treatment",
        title: "Medical Facial",
        category: "Skin",
        aspect: "portrait", // Vertical
    },
    {
        id: "2",
        src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop",
        alt: "Spa Massage Room",
        title: "Serenity Suite",
        category: "Ambiance",
        aspect: "landscape", // Horizontal
    },
    {
        id: "3",
        src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop",
        alt: "Professional Makeup",
        title: "Bridal Glow",
        category: "Makeup",
        aspect: "portrait",
    },
    {
        id: "4",
        src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop",
        alt: "Hair Styling",
        title: "Volume & Shine",
        category: "Hair",
        aspect: "square",
    },
    {
        id: "5",
        src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=1200&fit=crop",
        alt: "Advanced Skin Treatment",
        title: "IPL Therapy",
        category: "Medical",
        aspect: "portrait",
    },
    {
        id: "6",
        src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&h=800&fit=crop",
        alt: "Nail Art",
        title: "Designer Nails",
        category: "Nails",
        aspect: "square",
    },
    {
        id: "7",
        src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=1000&fit=crop",
        alt: "Skincare Products",
        title: "Babor Collection",
        category: "Products",
        aspect: "portrait",
    },
    {
        id: "8",
        src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&h=800&fit=crop",
        alt: "Manicure Station",
        title: "Nail Bar",
        category: "Ambiance",
        aspect: "landscape",
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
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-secondary/10 -z-10 skew-x-12" />
                    <div className="container mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 block">
                                Portfolio
                            </span>
                            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-foreground mb-6">
                                Visual <span className="italic text-gold">Artistry</span>
                            </h1>
                            <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto leading-relaxed">
                                A curated glimpse into our world of beauty, precision, and transformative care.
                            </p>
                        </motion.div>
                    </div>
                </section>



                {/* Masonry Gallery Grid */}
                <section className="py-16 md:py-24 bg-white/50">
                    <div className="container mx-auto px-4 sm:px-6">
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 text-center">Galeo Life</h2>

                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
                            {galleryItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                    className="break-inside-avoid"
                                >
                                    <button
                                        onClick={() => openLightbox(index)}
                                        className="group relative w-full overflow-hidden rounded-lg cursor-zoom-in"
                                    >
                                        <div className={`relative w-full ${item.aspect === 'portrait' ? 'aspect-[3/4]' :
                                            item.aspect === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'
                                            }`}>
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                                            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span className="text-gold text-xs font-bold uppercase tracking-wider mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    {item.category}
                                                </span>
                                                <h3 className="text-white font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                                    {item.title}
                                                </h3>
                                            </div>

                                            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                <ZoomIn className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            <Lightbox
                images={lightboxImages}
                initialIndex={currentIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </>
    );
}
