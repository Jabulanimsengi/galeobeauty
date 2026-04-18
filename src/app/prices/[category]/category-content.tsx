"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TreatmentListItem } from "@/components/booking/TreatmentListItem";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingCart } from "@/components/booking/BookingCart";
import { SelectedTreatment } from "@/lib/booking-types";
import type { ServiceSubcategory } from "@/lib/services-data";

interface CategoryContentProps {
    subcategories: ServiceSubcategory[];
    categoryId: string;
    categoryTitle: string;
    directoryTitle?: string;
    directoryDescription?: string;
}

const SUBCATEGORY_SUMMARIES: Partial<Record<string, Record<string, string>>> = {
    "lashes-brows": {
        "lash-extensions-infills": "Open this section for full sets, fills and lash options when the goal is more fullness, texture or styling.",
        "lash-lift-tint-brows": "Use this section for lower-maintenance lash lifts, tints and brow finishing services.",
    },
    hair: {
        "hair-styling": "Use this section for cuts, trims, blow-dries and occasion styling.",
        "hair-color": "Open this section for colour services such as regrowth, tinting, highlights and tonal work.",
        "hair-treatments": "This section groups smoothing, repair and treatment-led appointments.",
        "gents-hair": "A smaller grooming section for clean maintenance and barber-style appointments.",
    },
    nails: {
        "hands-feet": "Open this section for overlays, extensions, pedicures and other nail-maintenance treatments.",
    },
};

function formatItemList(names: string[], limit = 3) {
    const items = names.slice(0, limit);

    if (items.length === 0) {
        return "";
    }

    if (items.length === 1) {
        return items[0];
    }

    if (items.length === 2) {
        return `${items[0]} and ${items[1]}`;
    }

    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function getSubcategorySummary(categoryId: string, subcategory: ServiceSubcategory) {
    const customSummary = SUBCATEGORY_SUMMARIES[categoryId]?.[subcategory.id];

    if (customSummary) {
        return customSummary;
    }

    const featuredItems = formatItemList(subcategory.items.map((item) => item.name), 3);
    return `Open this section to compare ${subcategory.title.toLowerCase()} options such as ${featuredItems}.`;
}

export function CategoryContent({
    subcategories,
    categoryId,
    categoryTitle,
    directoryTitle,
    directoryDescription,
}: CategoryContentProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedTreatments, setSelectedTreatments] = useState<SelectedTreatment[]>([]);
    const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>(
        subcategories.length > 0 ? [subcategories[0].id] : []
    );

    const toggleSubcategoryExpansion = (subcategoryId: string) => {
        setExpandedSubcategories((prev) => {
            if (prev.includes(subcategoryId)) {
                return prev.filter((id) => id !== subcategoryId);
            }

            return [...prev, subcategoryId];
        });
    };

    const isSubcategoryExpanded = (subcategoryId: string) => {
        return expandedSubcategories.includes(subcategoryId);
    };

    const isItemSelected = (itemId: string) => {
        return selectedTreatments.some((t) => t.item.id === itemId);
    };

    const handleToggleTreatment = (treatment: SelectedTreatment) => {
        const isSelected = isItemSelected(treatment.item.id);

        if (isSelected) {
            setSelectedTreatments((prev) =>
                prev.filter((t) => t.item.id !== treatment.item.id)
            );
        } else {
            setSelectedTreatments((prev) => [...prev, treatment]);
        }
    };

    const handleRemoveTreatment = (index: number) => {
        setSelectedTreatments((prev) => prev.filter((_, i) => i !== index));
    };

    const handleClearAll = () => {
        setSelectedTreatments([]);
    };

    const handleOpenBooking = () => {
        if (selectedTreatments.length > 0) {
            setIsBookingOpen(true);
        }
    };

    const handleCloseBooking = () => {
        setIsBookingOpen(false);
        setSelectedTreatments([]);
    };

    return (
        <>
            <section className="py-6 lg:py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mb-8 rounded-[0.4rem] border border-border/50 bg-secondary/10 p-6 sm:p-8">
                        <div className="max-w-3xl">
                            <h2 className="font-sans text-2xl font-semibold text-foreground sm:text-3xl">
                                {directoryTitle ?? `Full ${categoryTitle} Menu`}
                            </h2>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                {directoryDescription ?? "Use the sections below to browse the exact treatments, compare prices and choose the service line you want to book."}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-8 lg:gap-12">
                        <div className="flex-1 lg:max-w-2xl">
                            <div className="mb-6 rounded-[0.4rem] border border-border/50 bg-background p-5">
                                <h2 className="font-sans text-xl font-semibold text-foreground sm:text-2xl">Services</h2>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                    Open a section to compare treatments, pricing, and details before you book.
                                </p>
                            </div>

                            <div className="space-y-2">
                                {subcategories.map((subcategory) => {
                                    const isExpanded = isSubcategoryExpanded(subcategory.id);

                                    return (
                                        <div key={subcategory.id} className="overflow-hidden rounded-[0.4rem] border border-border/50 bg-background transition-shadow hover:shadow-sm">
                                            <button
                                                onClick={() => toggleSubcategoryExpansion(subcategory.id)}
                                                className={`group flex w-full flex-col p-4 text-left transition-colors duration-300 hover:bg-gold/5 focus:outline-none sm:p-6 ${isExpanded ? "bg-gold/5" : ""}`}
                                            >
                                                <div className="flex w-full items-start justify-between gap-4">
                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                                            <h3 className="font-sans text-xl font-semibold text-foreground sm:text-2xl">
                                                                {subcategory.title}
                                                            </h3>
                                                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                                                                {subcategory.items.length} treatments
                                                            </span>
                                                        </div>
                                                        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                                            {getSubcategorySummary(categoryId, subcategory)}
                                                        </p>
                                                    </div>
                                                    <motion.div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.3rem] bg-secondary/20 text-xl font-bold leading-none text-muted-foreground transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                                                        {isExpanded ? "-" : "+"}
                                                    </motion.div>
                                                </div>

                                                {!isExpanded && (
                                                    <p className="mt-4 text-sm text-foreground/70">
                                                        Popular picks: <span className="font-medium text-foreground">{formatItemList(subcategory.items.map((item) => item.name), 3)}</span>
                                                    </p>
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    >
                                                        <div className="h-px w-full bg-border/40" />
                                                        <div className="space-y-2 bg-secondary/5 px-4 py-4 sm:px-6">
                                                            {subcategory.items.map((item) => (
                                                                <TreatmentListItem
                                                                    key={item.id}
                                                                    item={item}
                                                                    categoryId={categoryId}
                                                                    categoryTitle={categoryTitle}
                                                                    subcategoryId={subcategory.id}
                                                                    subcategoryTitle={subcategory.title}
                                                                    note={subcategory.note}
                                                                    isSelected={isItemSelected(item.id)}
                                                                    onToggle={handleToggleTreatment}
                                                                    detailsLink={`/prices/${categoryId}/${item.id}`}
                                                                />
                                                            ))}
                                                        </div>
                                                        {subcategory.note && (
                                                            <div className="bg-secondary/5 px-6 pb-4">
                                                                <p className="rounded-[0.35rem] bg-background p-3 text-center text-xs italic text-muted-foreground shadow-sm">
                                                                    * {subcategory.note}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden w-[380px] shrink-0 lg:block">
                            <div className="sticky top-[140px]">
                                <AnimatePresence initial={false}>
                                    {selectedTreatments.length > 0 && (
                                        <motion.div
                                            key="desktop-booking-summary"
                                            initial={{ opacity: 0, y: 18 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 18 }}
                                            transition={{ duration: 0.22, ease: "easeOut" }}
                                        >
                                            <BookingSummary
                                                items={selectedTreatments}
                                                onRemoveItem={handleRemoveTreatment}
                                                onBook={handleOpenBooking}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="lg:hidden">
                <BookingCart
                    items={selectedTreatments}
                    onRemoveItem={handleRemoveTreatment}
                    onClearAll={handleClearAll}
                    onBook={handleOpenBooking}
                />
            </div>

            <BookingSheet
                isOpen={isBookingOpen}
                onClose={handleCloseBooking}
                treatments={selectedTreatments}
            />
        </>
    );
}
