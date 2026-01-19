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
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
                {items.map((item, index) => (
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
                            <div
                                className={`relative w-full ${
                                    item.aspect === "portrait"
                                        ? "aspect-[3/4]"
                                        : item.aspect === "landscape"
                                          ? "aspect-[4/3]"
                                          : "aspect-square"
                                }`}
                            >
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

            <Lightbox
                images={lightboxImages}
                initialIndex={currentIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </>
    );
}
