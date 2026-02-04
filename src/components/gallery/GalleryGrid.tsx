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

// Responsive heights: shorter on mobile, taller on desktop for visual variety
const getHeightClass = (index: number): string => {
    const heights = [
        "h-[200px] sm:h-[240px] md:h-[280px]",   // Standard
        "h-[240px] sm:h-[300px] md:h-[380px]",   // Tall
        "h-[180px] sm:h-[220px] md:h-[240px]",   // Short
        "h-[220px] sm:h-[280px] md:h-[320px]",   // Medium-tall
        "h-[190px] sm:h-[240px] md:h-[260px]",   // Medium-short
        "h-[260px] sm:h-[320px] md:h-[400px]",   // Extra tall
        "h-[210px] sm:h-[260px] md:h-[300px]",   // Standard
        "h-[230px] sm:h-[290px] md:h-[350px]",   // Tall
        "h-[170px] sm:h-[200px] md:h-[220px]",   // Short
        "h-[250px] sm:h-[300px] md:h-[360px]",   // Tall
        "h-[200px] sm:h-[240px] md:h-[280px]",   // Standard
        "h-[270px] sm:h-[340px] md:h-[420px]",   // Extra tall
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
            {/* Responsive Masonry Layout: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-3 md:gap-4">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                        className="break-inside-avoid mb-2 sm:mb-3 md:mb-4"
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
