"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { serviceCategories } from "@/lib/services-data";
import { TreatmentListItem } from "@/components/booking/TreatmentListItem";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { BookingCart } from "@/components/booking/BookingCart";
import { Button } from "@/components/ui/button";
import { SelectedTreatment } from "@/lib/booking-types";
import type { SEOLocation } from "@/lib/seo-data";

interface LocationServicesClientProps {
    locationSlug: string;
    location: SEOLocation;
}

export function LocationServicesClient({ locationSlug, location }: LocationServicesClientProps) {
    // Booking state
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedTreatments, setSelectedTreatments] = useState<SelectedTreatment[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    // Toggle category expansion
    const toggleCategoryExpansion = (categoryId: string) => {
        setExpandedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    // Check if a category is expanded
    const isCategoryExpanded = (categoryId: string) => {
        return expandedCategories.includes(categoryId);
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
                        {/* Left Column - Accordion Categories */}
                        <div className="flex-1 lg:max-w-2xl">
                            <div className="space-y-2">
                                {serviceCategories.map((category) => {
                                    const isExpanded = isCategoryExpanded(category.id);
                                    return (
                                        <div key={category.id} className="overflow-hidden">
                                            {/* Category Header - Compact Pill Button */}
                                            <button
                                                onClick={() => toggleCategoryExpansion(category.id)}
                                                className={`w-full flex items-center justify-between px-5 py-3 rounded-full transition-all duration-200 ${
                                                    isExpanded
                                                        ? "bg-gold text-white"
                                                        : "bg-neutral-900 text-white hover:bg-gold"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <category.Icon className="w-5 h-5" />
                                                    <span className="font-semibold text-sm sm:text-base">
                                                        {category.title}
                                                    </span>
                                                </div>
                                                <ChevronDown
                                                    className={`w-5 h-5 transition-transform duration-200 ${
                                                        isExpanded ? "rotate-180" : ""
                                                    }`}
                                                />
                                            </button>

                                            {/* Category Content - Smooth Expand/Collapse */}
                                            {isExpanded && (
                                                <div className="mt-2 space-y-3 px-2">
                                                    {category.subcategories.map((subcategory) => (
                                                        <div key={subcategory.id} className="space-y-2">
                                                            {/* Subcategory Title */}
                                                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-3 mt-4 first:mt-2">
                                                                {subcategory.title}
                                                            </h3>

                                                            {/* Treatment Items */}
                                                            {subcategory.items.map((item) => (
                                                                <TreatmentListItem
                                                                    key={item.id}
                                                                    item={item}
                                                                    categoryId={category.id}
                                                                    categoryTitle={category.title}
                                                                    subcategoryId={subcategory.id}
                                                                    subcategoryTitle={subcategory.title}
                                                                    isSelected={isItemSelected(item.id)}
                                                                    onToggle={handleToggleTreatment}
                                                                    detailsLink={`/locations/${locationSlug}/${item.id}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Column - Sticky Booking Summary (Desktop Only) */}
                        <div className="hidden lg:block lg:w-80 flex-shrink-0">
                            <div className="sticky top-24">
                                <BookingCart
                                    selectedTreatments={selectedTreatments}
                                    onRemoveTreatment={handleRemoveTreatment}
                                    onClearAll={handleClearAll}
                                    onOpenBooking={handleOpenBooking}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Floating Booking Summary */}
                    {selectedTreatments.length > 0 && (
                        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-lg">
                            <div className="px-4 py-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-muted-foreground">
                                        {selectedTreatments.length} treatment{selectedTreatments.length > 1 ? "s" : ""} selected
                                    </span>
                                    <button
                                        onClick={handleClearAll}
                                        className="text-xs text-red-500 hover:text-red-600"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <Button
                                    onClick={handleOpenBooking}
                                    className="w-full bg-gold hover:bg-gold-dark text-white"
                                >
                                    Book Now
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Booking Sheet */}
            <BookingSheet
                isOpen={isBookingOpen}
                onClose={handleCloseBooking}
                bookingType="treatment"
                selectedTreatments={selectedTreatments}
            />
        </>
    );
}
