"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbox } from "@/components/ui/lightbox";
import type { GalleryItem } from "@/lib/gallery-utils";

interface GalleryGridProps {
    items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentLightboxImages, setCurrentLightboxImages] = useState<{ src: string, alt: string }[]>([]);

    // Get unique categories and sort them by requested order
    const categories = Array.from(new Set(items.map((item) => item.category))).sort((a, b) => {
        const order = ["Lash Extensions & Brow Styling", "Nails", "Permanent Makeup & Microblading"];
        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.localeCompare(b);
    });

    // Default to all categories expanded
    const [expandedCategories, setExpandedCategories] = useState<string[]>(categories);

    const toggleCategory = (category: string) => {
        setExpandedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const openLightbox = (index: number, categoryItems: GalleryItem[]) => {
        setCurrentLightboxImages(categoryItems.map(item => ({ src: item.src, alt: item.alt })));
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="flex flex-col gap-6 md:gap-10">
            {categories.map((category) => {
                const categoryItems = items.filter((item) => item.category === category);
                const isExpanded = expandedCategories.includes(category);
                const totalItems = categoryItems.length;

                return (
                    <div key={category} className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
                        {/* Category Header (Accordion Toggle) */}
                        <div className="flex justify-start border-b border-border/40 md:border-b-0 md:border-r bg-white">
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 hover:bg-rose-50/30 transition-colors"
                            >
                                <h3 className="font-serif text-2xl md:text-3xl text-foreground flex items-center">
                                    {category}
                                    <span className="text-muted-foreground text-sm font-sans ml-3 font-normal">
                                        ({categoryItems.length})
                                    </span>
                                </h3>
                                <div
                                    className={`p-2 rounded-full bg-amber-50 text-gold transition-transform duration-300 ml-4 ${isExpanded ? "rotate-180" : ""
                                        }`}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </button>
                        </div>

                        {/* Collapsible Content */}
                        <AnimatePresence initial={false}>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="overflow-hidden border-t md:border-t-0 border-border/40"
                                >
                                    <div className="p-4 sm:p-5">
                                        {/* Uniform Grid Layout */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                            {categoryItems.map((item, index) => {
                                                // Mobile: Hide after 2nd item (index 1)
                                                // Desktop: Hide after 4th item (index 3)
                                                const isHiddenMobile = index > 1;
                                                const isHiddenDesktop = index > 3;

                                                const showMobileMore = index === 1 && totalItems > 2;
                                                const showDesktopMore = index === 3 && totalItems > 4;

                                                return (
                                                    <div
                                                        key={item.id}
                                                        className={`relative aspect-square overflow-hidden rounded-xl group ${isHiddenMobile ? "hidden md:block" : ""
                                                            } ${isHiddenDesktop ? "md:hidden" : ""}`}
                                                    >
                                                        <button
                                                            onClick={() => openLightbox(index, categoryItems)}
                                                            className="w-full h-full relative cursor-zoom-in"
                                                        >
                                                            <Image
                                                                src={item.src}
                                                                alt={item.alt}
                                                                fill
                                                                className="object-cover transition-all duration-700 group-hover:scale-110"
                                                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                                                            />

                                                            {/* Standard Gradient Overlay for image details */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                            <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                <h4 className="text-white font-serif text-sm md:text-base line-clamp-2">
                                                                    {item.title}
                                                                </h4>
                                                            </div>

                                                            <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75">
                                                                <ZoomIn className="w-4 h-4 text-white" />
                                                            </div>

                                                            {/* "More" Overlays */}
                                                            {showMobileMore && (
                                                                <div className="absolute inset-0 bg-black/50 flex md:hidden items-center justify-center backdrop-blur-sm transition-colors group-hover:bg-black/60">
                                                                    <span className="text-white font-medium text-lg">+{totalItems - 2} more</span>
                                                                </div>
                                                            )}
                                                            {showDesktopMore && (
                                                                <div className="absolute inset-0 bg-black/50 hidden md:flex items-center justify-center backdrop-blur-sm transition-colors group-hover:bg-black/60">
                                                                    <span className="text-white font-medium text-lg">+{totalItems - 4} more</span>
                                                                </div>
                                                            )}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}

            <Lightbox
                images={currentLightboxImages}
                initialIndex={currentIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </div>
    );
}
