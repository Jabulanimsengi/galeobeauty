"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Lightbox } from "@/components/ui/lightbox";
import type { GalleryItem } from "@/lib/gallery-utils";

interface GalleryGridProps {
    items: GalleryItem[];
}

const CATEGORY_ORDER = [
    "Lash Extensions & Brow Styling",
    "Nails",
    "Permanent Makeup & Microblading",
];

const CATEGORY_COPY: Record<string, string> = {
    "Lash Extensions & Brow Styling":
        "Close-up detail, clean symmetry, and soft definition from lash and brow work that reads beautifully on mobile.",
    Nails:
        "High-shine finishes, shape work, and texture-led nail looks presented with tighter, cleaner crops.",
    "Permanent Makeup & Microblading":
        "Before-and-after moments, healed results, and precise pigment work arranged like a studio portfolio.",
};

function slugifyCategory(category: string) {
    return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getSortedCategories(items: GalleryItem[]) {
    return Array.from(new Set(items.map((item) => item.category))).sort((left, right) => {
        const leftIndex = CATEGORY_ORDER.indexOf(left);
        const rightIndex = CATEGORY_ORDER.indexOf(right);

        if (leftIndex !== -1 && rightIndex !== -1) return leftIndex - rightIndex;
        if (leftIndex !== -1) return -1;
        if (rightIndex !== -1) return 1;
        return left.localeCompare(right);
    });
}

function getCategoryPreviewClass(index: number) {
    if (index === 0) {
        return "col-span-2 row-span-2 min-h-[16rem] sm:col-span-2 sm:min-h-[22rem] lg:col-span-3 lg:min-h-[25rem]";
    }

    return "col-span-1 row-span-1 min-h-[8.75rem] sm:min-h-[10.5rem] lg:min-h-[12rem]";
}

export function GalleryGrid({ items }: GalleryGridProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentLightboxImages, setCurrentLightboxImages] = useState<
        { src: string; alt: string; title?: string; subtitle?: string }[]
    >([]);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const categories = getSortedCategories(items);

    const openLightbox = (index: number, galleryItems: GalleryItem[]) => {
        setCurrentLightboxImages(
            galleryItems.map((item) => ({
                src: item.src,
                alt: item.alt,
                title: item.title,
                subtitle: item.category,
            }))
        );
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const toggleCategory = (category: string) => {
        setExpandedCategories((previous) =>
            previous.includes(category)
                ? previous.filter((entry) => entry !== category)
                : [...previous, category]
        );
    };

    return (
        <div className="space-y-14 md:space-y-20">
            {categories.map((category, categoryIndex) => {
                const categoryItems = items.filter((item) => item.category === category);
                const isExpanded = expandedCategories.includes(category);
                const visibleItems = isExpanded ? categoryItems : categoryItems.slice(0, 6);
                const categoryId = slugifyCategory(category);

                return (
                    <motion.section
                        key={category}
                        id={`gallery-${categoryId}`}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.45, delay: categoryIndex * 0.04 }}
                        className="scroll-mt-28 border-t border-border/50 pt-8 sm:pt-10"
                    >
                        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="h-px w-10 bg-gold/50" />
                                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold/90">
                                        {categoryItems.length} images
                                    </p>
                                </div>
                                <h3 className="font-sans text-2xl leading-tight text-foreground sm:text-3xl lg:text-4xl">
                                    {category}
                                </h3>
                                <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                                    {CATEGORY_COPY[category] ??
                                        "A tighter edit of Galeo Beauty portfolio images arranged to stay elegant on desktop and easy to scan on mobile."}
                                </p>
                                {categoryItems.length > 6 ? (
                                    <button
                                        type="button"
                                        onClick={() => toggleCategory(category)}
                                        className="inline-flex items-center gap-2 border-b border-foreground/20 pb-1 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-gold/40 hover:text-gold"
                                    >
                                        <span>
                                            {isExpanded
                                                ? "Show less"
                                                : `View all ${categoryItems.length} images`}
                                        </span>
                                        <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                ) : null}
                            </div>

                            <div className="grid auto-rows-[8.75rem] grid-cols-2 gap-3 sm:auto-rows-[10.5rem] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[12rem] lg:grid-cols-6">
                                {visibleItems.map((item, index) => {
                                    const actualIndex = categoryItems.findIndex((entry) => entry.id === item.id);
                                    const hideOnMobile = !isExpanded && index >= 4;
                                    const mobileRemaining = Math.max(categoryItems.length - 4, 0);
                                    const desktopRemaining = Math.max(categoryItems.length - visibleItems.length, 0);
                                    const showMobileMoreOverlay = !isExpanded && mobileRemaining > 0 && index === 3;
                                    const showDesktopMoreOverlay =
                                        !isExpanded && desktopRemaining > 0 && index === visibleItems.length - 1;

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => openLightbox(actualIndex, categoryItems)}
                                            className={`group relative overflow-hidden rounded-[1.35rem] text-left ${getCategoryPreviewClass(index)} ${hideOnMobile ? "hidden sm:block" : ""}`}
                                        >
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/18 to-transparent" />
                                            <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-3.5 sm:p-4">
                                                <div>
                                                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/65">
                                                        {category}
                                                    </p>
                                                </div>
                                            </div>

                                            {showMobileMoreOverlay ? (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-black/55 sm:hidden">
                                                    <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                                                        +{mobileRemaining} more
                                                    </span>
                                                </div>
                                            ) : null}

                                            {showDesktopMoreOverlay ? (
                                                <div className="absolute inset-0 hidden items-center justify-center bg-black/45 backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-black/55 sm:flex">
                                                    <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                                                        +{desktopRemaining} more
                                                    </span>
                                                </div>
                                            ) : null}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.section>
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
