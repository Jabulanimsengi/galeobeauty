"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronDown, Check } from "lucide-react";
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
}

export function CategoryContent({ subcategories, categoryId, categoryTitle }: CategoryContentProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedTreatments, setSelectedTreatments] = useState<SelectedTreatment[]>([]);
    const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>(
        subcategories.length > 0 ? [subcategories[0].id] : []
    );

    // Toggle subcategory expansion
    const toggleSubcategoryExpansion = (subcategoryId: string) => {
        setExpandedSubcategories(prev => {
            if (prev.includes(subcategoryId)) {
                return prev.filter(id => id !== subcategoryId);
            } else {
                return [...prev, subcategoryId];
            }
        });
    };

    // Check if a subcategory is expanded
    const isSubcategoryExpanded = (subcategoryId: string) => {
        return expandedSubcategories.includes(subcategoryId);
    };

    // Check if a treatment is selected
    const isItemSelected = (itemId: string) => {
        return selectedTreatments.some((t) => t.item.id === itemId);
    };

    // Handle toggling treatment selection
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

    // Handle removing treatment by index
    const handleRemoveTreatment = (index: number) => {
        setSelectedTreatments((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle clearing all treatments
    const handleClearAll = () => {
        setSelectedTreatments([]);
    };

    // Handle opening booking sheet
    const handleOpenBooking = () => {
        if (selectedTreatments.length > 0) {
            setIsBookingOpen(true);
        }
    };

    // Handle closing booking sheet
    const handleCloseBooking = () => {
        setIsBookingOpen(false);
        setSelectedTreatments([]);
    };

    return (
        <>
            <section className="py-6 lg:py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex gap-8 lg:gap-12">
                        {/* Left Column - Treatment List */}
                        <div className="flex-1 lg:max-w-2xl">
                            <div className="space-y-2">
                                {subcategories.map((subcategory) => {
                                    const isExpanded = isSubcategoryExpanded(subcategory.id);
                                    return (
                                        <div key={subcategory.id} className="overflow-hidden">
                                            {/* Subcategory Header */}
                                            <button
                                                onClick={() => toggleSubcategoryExpansion(subcategory.id)}
                                                className={`w-full flex items-center justify-between px-5 py-3 rounded-full transition-all duration-200 ${isExpanded
                                                    ? "bg-gold text-white"
                                                    : "bg-neutral-900 text-white hover:bg-gold"
                                                    }`}
                                            >
                                                <span className="font-medium text-sm lg:text-base">
                                                    {subcategory.title}
                                                </span>
                                                <motion.div
                                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <ChevronDown className="w-4 h-4" />
                                                </motion.div>
                                            </button>

                                            {/* Subcategory Items - Expandable */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-4 pb-2 space-y-2">
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
                                                                />
                                                            ))}
                                                        </div>
                                                        {subcategory.note && (
                                                            <p className="mt-2 mb-4 text-xs text-muted-foreground italic bg-secondary/50 p-2 rounded-lg text-center mx-2">
                                                                * {subcategory.note}
                                                            </p>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Column - Sticky Booking Summary (Desktop Only) */}
                        <div className="hidden lg:block w-[380px] shrink-0">
                            <div className="sticky top-[140px]">
                                <BookingSummary
                                    items={selectedTreatments}
                                    onRemoveItem={handleRemoveTreatment}
                                    onBook={handleOpenBooking}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Sticky Cart (only visible on mobile/tablet) */}
            <div className="lg:hidden">
                <BookingCart
                    items={selectedTreatments}
                    onRemoveItem={handleRemoveTreatment}
                    onClearAll={handleClearAll}
                    onBook={handleOpenBooking}
                />
            </div>

            {/* Booking Sheet */}
            <BookingSheet
                isOpen={isBookingOpen}
                onClose={handleCloseBooking}
                treatments={selectedTreatments}
            />
        </>
    );
}
