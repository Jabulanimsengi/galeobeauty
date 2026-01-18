"use client";

import { useState } from "react";
import { Header, Footer } from "@/components/layout";
import { Lightbox } from "@/components/ui/lightbox";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

// Gallery data using local images from public/images/gallery
const galleryItems = [
    {
        id: "1",
        src: "/images/gallery/Gallery_image_01 (1).jpeg",
        alt: "Galeo Beauty Treatment",
        title: "Beauty Treatment",
        category: "Treatments",
        aspect: "portrait",
    },
    {
        id: "2",
        src: "/images/gallery/Gallery_image_01 (2).jpeg",
        alt: "Galeo Beauty Experience",
        title: "Spa Experience",
        category: "Ambiance",
        aspect: "landscape",
    },
    {
        id: "3",
        src: "/images/gallery/Gallery_image_01 (3).jpeg",
        alt: "Galeo Beauty Skincare",
        title: "Skincare",
        category: "Skin",
        aspect: "square",
    },
    {
        id: "4",
        src: "/images/gallery/Gallery_image_01 (4).jpeg",
        alt: "Galeo Beauty Nails",
        title: "Nail Art",
        category: "Nails",
        aspect: "portrait",
    },
    {
        id: "5",
        src: "/images/gallery/Gallery_image_01 (5).jpeg",
        alt: "Galeo Beauty Hair",
        title: "Hair Styling",
        category: "Hair",
        aspect: "landscape",
    },
    {
        id: "6",
        src: "/images/gallery/Gallery_image_01 (6).jpeg",
        alt: "Galeo Beauty Treatment Room",
        title: "Treatment Room",
        category: "Ambiance",
        aspect: "square",
    },
    {
        id: "7",
        src: "/images/gallery/Gallery_image_01 (7).jpeg",
        alt: "Galeo Beauty Facial",
        title: "Facial Treatment",
        category: "Skin",
        aspect: "portrait",
    },
    {
        id: "8",
        src: "/images/gallery/Gallery_image_01 (8).jpeg",
        alt: "Galeo Beauty Results",
        title: "Glowing Results",
        category: "Results",
        aspect: "landscape",
    },
    {
        id: "9",
        src: "/images/gallery/Gallery_image_01 (9).jpeg",
        alt: "Galeo Beauty Makeup",
        title: "Makeup Artistry",
        category: "Makeup",
        aspect: "portrait",
    },
    {
        id: "10",
        src: "/images/gallery/Gallery_image_01 (10).jpeg",
        alt: "Galeo Beauty Client",
        title: "Happy Client",
        category: "Results",
        aspect: "square",
    },
    {
        id: "11",
        src: "/images/gallery/Gallery_image_01 (11).jpeg",
        alt: "Galeo Beauty Wellness",
        title: "Wellness",
        category: "Treatments",
        aspect: "portrait",
    },
    {
        id: "12",
        src: "/images/gallery/Gallery_image_01 (12).jpeg",
        alt: "Galeo Beauty Interior",
        title: "Our Space",
        category: "Ambiance",
        aspect: "landscape",
    },
    {
        id: "13",
        src: "/images/gallery/Gallery_image_01 (13).jpeg",
        alt: "Galeo Beauty Products",
        title: "Premium Products",
        category: "Products",
        aspect: "square",
    },
    {
        id: "14",
        src: "/images/gallery/Gallery_image_01 (14).jpeg",
        alt: "Galeo Beauty Lashes",
        title: "Lash Extensions",
        category: "Lashes",
        aspect: "portrait",
    },
    {
        id: "15",
        src: "/images/gallery/Gallery_image_01 (15).jpeg",
        alt: "Galeo Beauty Brows",
        title: "Brow Perfection",
        category: "Brows",
        aspect: "square",
    },
    {
        id: "16",
        src: "/images/gallery/Gallery_image_01 (16).jpeg",
        alt: "Galeo Beauty Team",
        title: "Our Team",
        category: "Team",
        aspect: "landscape",
    },
    {
        id: "17",
        src: "/images/gallery/Gallery_image_01 (17).jpeg",
        alt: "Galeo Beauty Relaxation",
        title: "Relaxation",
        category: "Ambiance",
        aspect: "portrait",
    },
    {
        id: "18",
        src: "/images/gallery/Gallery_image_01 (18).jpeg",
        alt: "Galeo Beauty Aesthetics",
        title: "Aesthetics",
        category: "Medical",
        aspect: "square",
    },
    {
        id: "19",
        src: "/images/gallery/Gallery_image_01 (19).jpeg",
        alt: "Galeo Beauty Transformation",
        title: "Transformation",
        category: "Results",
        aspect: "portrait",
    },
    {
        id: "20",
        src: "/images/gallery/Gallery_image_01 (20).jpeg",
        alt: "Galeo Beauty Waxing",
        title: "Smooth Skin",
        category: "Waxing",
        aspect: "landscape",
    },
    {
        id: "21",
        src: "/images/gallery/Gallery_image_01 (21).jpeg",
        alt: "Galeo Beauty Pamper",
        title: "Pamper Session",
        category: "Treatments",
        aspect: "square",
    },
    {
        id: "22",
        src: "/images/gallery/Gallery_image_01 (22).jpeg",
        alt: "Galeo Beauty Detail",
        title: "Attention to Detail",
        category: "Nails",
        aspect: "portrait",
    },
    {
        id: "23",
        src: "/images/gallery/Gallery_image_01 (23).jpeg",
        alt: "Galeo Beauty Experience",
        title: "The Experience",
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
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
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
