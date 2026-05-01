"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { serviceCategories } from "@/lib/services-data";
import { TreatmentListItem } from "@/components/booking/TreatmentListItem";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingCart } from "@/components/booking/BookingCart";
import { SelectedTreatment } from "@/lib/booking-types";
import {
    getStoredAttribution,
    trackBookingTreatmentAdded,
    trackBookingTreatmentRemoved,
    trackServiceCtaClick,
} from "@/lib/attribution";
import { CANONICAL_LOCAL_SERVICE_LOCATION_SLUG, getCanonicalLocationSlug, isIndexableLocationService, type SEOLocation } from "@/lib/seo-data";

interface LocationServicesClientProps {
    locationSlug: string;
    location: SEOLocation;
}

export function LocationServicesClient({ locationSlug }: LocationServicesClientProps) {
    const detailsLocationSlug = getCanonicalLocationSlug(locationSlug);
    const canUseLocalServiceLinks =
        detailsLocationSlug === CANONICAL_LOCAL_SERVICE_LOCATION_SLUG;

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

    const getCurrentPage = () => (typeof window !== "undefined" ? window.location.pathname : "/");

    // Handle toggling treatment selection
    const handleToggleTreatment = (treatment: SelectedTreatment) => {
        const isSelected = isItemSelected(treatment.item.id);
        if (isSelected) {
            setSelectedTreatments((prev) => {
                const nextTreatments = prev.filter((t) => t.item.id !== treatment.item.id);

                trackBookingTreatmentRemoved({
                    attribution: getStoredAttribution(),
                    bookingType: "treatment",
                    currentPage: getCurrentPage(),
                    treatmentCount: nextTreatments.length,
                    treatmentNames: nextTreatments.map((selected) => selected.item.name),
                    treatmentName: treatment.item.name,
                    actionContext: `location_services_${locationSlug}`,
                });

                return nextTreatments;
            });
        } else {
            setSelectedTreatments((prev) => {
                const nextTreatments = [...prev, treatment];

                trackBookingTreatmentAdded({
                    attribution: getStoredAttribution(),
                    bookingType: "treatment",
                    currentPage: getCurrentPage(),
                    treatmentCount: nextTreatments.length,
                    treatmentNames: nextTreatments.map((selected) => selected.item.name),
                    treatmentName: treatment.item.name,
                    actionContext: `location_services_${locationSlug}`,
                });

                return nextTreatments;
            });
        }
    };

    // Handle removing treatment by index
    const handleRemoveTreatment = (index: number) => {
        setSelectedTreatments((prev) => {
            const removedTreatment = prev[index];
            const nextTreatments = prev.filter((_, i) => i !== index);

            if (removedTreatment) {
                trackBookingTreatmentRemoved({
                    attribution: getStoredAttribution(),
                    bookingType: "treatment",
                    currentPage: getCurrentPage(),
                    treatmentCount: nextTreatments.length,
                    treatmentNames: nextTreatments.map((selected) => selected.item.name),
                    treatmentName: removedTreatment.item.name,
                    actionContext: `location_summary_${locationSlug}`,
                });
            }

            return nextTreatments;
        });
    };

    // Handle clearing all treatments
    const handleClearAll = () => {
        for (const treatment of selectedTreatments) {
            trackBookingTreatmentRemoved({
                attribution: getStoredAttribution(),
                bookingType: "treatment",
                currentPage: getCurrentPage(),
                treatmentCount: 0,
                treatmentNames: [],
                treatmentName: treatment.item.name,
                actionContext: `location_clear_all_${locationSlug}`,
            });
        }
        setSelectedTreatments([]);
    };

    // Handle opening booking sheet
    const handleOpenBooking = () => {
        if (selectedTreatments.length > 0) {
            trackServiceCtaClick({
                attribution: getStoredAttribution(),
                bookingType: "treatment",
                currentPage: getCurrentPage(),
                treatmentCount: selectedTreatments.length,
                treatmentNames: selectedTreatments.map((selected) => selected.item.name),
                ctaContext: `location_selected_treatments_${locationSlug}`,
                ctaLabel: "continue",
            });
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
                                            {/* Category Header */}
                                            <button
                                                onClick={() => toggleCategoryExpansion(category.id)}
                                                className={`w-full flex items-center justify-between px-5 py-3 rounded-[0.4rem] transition-all duration-200 ${isExpanded
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
                                                    className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
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
                                                            {subcategory.items.map((item) => {
                                                                const detailsLink = canUseLocalServiceLinks || isIndexableLocationService(detailsLocationSlug, item.id)
                                                                    ? `/locations/${detailsLocationSlug}/${item.id}`
                                                                    : `/services/${category.id}/${item.id}`;

                                                                return (
                                                                    <TreatmentListItem
                                                                        key={item.id}
                                                                        item={item}
                                                                        categoryId={category.id}
                                                                        categoryTitle={category.title}
                                                                        subcategoryId={subcategory.id}
                                                                        subcategoryTitle={subcategory.title}
                                                                        isSelected={isItemSelected(item.id)}
                                                                        onToggle={handleToggleTreatment}
                                                                        detailsLink={detailsLink}
                                                                    />
                                                                );
                                                            })}
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
                        <div className="hidden lg:block w-[380px] flex-shrink-0">
                            <div className="sticky top-24">
                                <BookingSummary
                                    items={selectedTreatments}
                                    onRemoveItem={handleRemoveTreatment}
                                    onBook={handleOpenBooking}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Floating Booking Bar */}
                    <div className="lg:hidden">
                        <BookingCart
                            items={selectedTreatments}
                            onRemoveItem={handleRemoveTreatment}
                            onClearAll={handleClearAll}
                            onBook={handleOpenBooking}
                        />
                    </div>
                </div>
            </section>

            {/* Booking Sheet */}
            <BookingSheet
                isOpen={isBookingOpen}
                onClose={handleCloseBooking}
                bookingType="treatment"
                treatments={selectedTreatments}
            />
        </>
    );
}
