"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";
import { Lightbox } from "@/components/ui/lightbox";
import type { GalleryItem } from "@/lib/gallery-utils";

interface GalleryGridProps {
    items: GalleryItem[];
}

// Assign varying heights to each image for visual variety
const getHeightClass = (index: number): string => {
    const heights = [
        "h-[280px]",   // Standard
        "h-[380px]",   // Tall
        "h-[240px]",   // Short
        "h-[320px]",   // Medium-tall
        "h-[260px]",   // Medium-short
        "h-[400px]",   // Extra tall
        "h-[300px]",   // Standard
        "h-[350px]",   // Tall
        "h-[220px]",   // Short
        "h-[360px]",   // Tall
        "h-[280px]",   // Standard
        "h-[420px]",   // Extra tall
    ];
    return heights[index % heights.length];
};

export function GalleryGrid({ items }: GalleryGridProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const lightboxImages = items.map((item) => ({
        src: item.src,
        alt: item.alt,
    }));

    return (
        <>
            {/* True Masonry Layout using CSS Columns - No gaps */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                        className="break-inside-avoid mb-3 md:mb-4"
                    >
                        <button
                            onClick={() => openLightbox(index)}
                            className={`relative w-full ${getHeightClass(index)} overflow-hidden rounded-xl cursor-zoom-in group`}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content on Hover */}
                            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-gold text-xs font-bold uppercase tracking-wider mb-1">
                                    {item.category}
                                </span>
                                <h3 className="text-white font-serif text-base md:text-lg line-clamp-2">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Zoom Icon */}
                            <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75">
                                <ZoomIn className="w-4 h-4 text-white" />
                            </div>
                        </button>
                    </motion.div>
                ))}
            </div>

            <Lightbox
                images={lightboxImages}
                initialIndex={currentIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </>
    );
}
