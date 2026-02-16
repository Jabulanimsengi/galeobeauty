"use client";

import { Header, Footer } from "@/components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Price List | Beauty Treatment Costs in Hartbeespoort",
    description: "View our comprehensive price list for facials, massages, nails, lashes, and aesthetic treatments. Transparent pricing for premium beauty services at Galeo Beauty.",
    alternates: {
        canonical: "https://www.galeobeauty.com/prices",
    },
};

import { motion, AnimatePresence } from "framer-motion";
import { serviceCategories } from "@/lib/services-data";
import { useState, useEffect, Suspense } from "react";
import { TreatmentListItem } from "@/components/booking/TreatmentListItem";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingCart } from "@/components/booking/BookingCart";
import { SelectedTreatment } from "@/lib/booking-types";
import { ChevronDown } from "lucide-react";

import { useSearchParams } from "next/navigation";


// Helper function to format titles with proper capitalization
const formatTitle = (title: string): string => {
    const acronyms = ['ipl', 'qms', 'ce'];
    return title
        .split(' ')
        .map(word => {
            const lowerWord = word.toLowerCase();
            if (acronyms.includes(lowerWord)) {
                return word.toUpperCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
};

function PricesContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");
    const queryParam = searchParams.get("q")?.toLowerCase(); // Support Sitelinks Searchbox

    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedTreatments, setSelectedTreatments] = useState<SelectedTreatment[]>([]);

    // Track which categories are expanded
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    // Derived state for filtering
    const [searchQuery, setSearchQuery] = useState(queryParam || "");

    // Update state when URL params change
    useEffect(() => {
        if (categoryParam) {
            setExpandedCategories([categoryParam]);
            setTimeout(() => {
                const element = document.getElementById(`category-${categoryParam}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }

        if (queryParam) {
            setSearchQuery(queryParam);
            // If searching, we'll want to expand categories with matches (logic below)
            const categoriesWithMatches = serviceCategories
                .filter(cat =>
                    cat.subcategories.some(sub =>
                        sub.items.some(item =>
                            item.name.toLowerCase().includes(queryParam) ||
                            item.description?.toLowerCase().includes(queryParam)
                        )
                    )
                )
                .map(c => c.id);
            setExpandedCategories(prev => Array.from(new Set([...prev, ...categoriesWithMatches])));
        }
    }, [categoryParam, queryParam]);

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
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero */}
                <section className="relative pt-32 pb-8 lg:pt-40 lg:pb-10 px-6 bg-secondary/20">
                    <div className="container mx-auto text-center max-w-4xl">
                        <span className="text-gold font-medium uppercase tracking-widest text-xs sm:text-sm block mb-4">
                            Transparent Pricing
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            <span className="sr-only">Beauty Treatment Prices Hartbeespoort – </span>
                            Our <span className="text-gold">Prices</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-2xl mx-auto">
                            Browse our treatments and select the ones you'd like to book.
                        </p>
                    </div>
                </section>

                {/* Main Content - Accordion Layout with Sticky Sidebar on Desktop */}
                <section className="py-6 lg:py-12">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="flex gap-8 lg:gap-12">
                            {/* Left Column - Accordion Categories */}
                            <div className="flex-1 lg:max-w-2xl">
                                <div className="space-y-2">
                                    {serviceCategories.map((category) => {
                                        // Filter items if search query exists
                                        const filteredSubcategories = category.subcategories.map(sub => ({
                                            ...sub,
                                            items: sub.items.filter(item =>
                                                !searchQuery ||
                                                item.name.toLowerCase().includes(searchQuery) ||
                                                (item.description && item.description.toLowerCase().includes(searchQuery))
                                            )
                                        })).filter(sub => sub.items.length > 0);

                                        // Hide category if no matches found
                                        if (filteredSubcategories.length === 0) return null;

                                        const isExpanded = isCategoryExpanded(category.id);
                                        return (
                                            <div key={category.id} id={`category-${category.id}`} className="overflow-hidden">
                                                {/* Category Header - Compact Pill Button with Gold Hover */}
                                                <button
                                                    onClick={() => toggleCategoryExpansion(category.id)}
                                                    className={`w-full flex items-center justify-between px-5 py-3 rounded-full transition-all duration-200 ${isExpanded
                                                        ? "bg-gold text-white"
                                                        : "bg-neutral-900 text-white hover:bg-gold"
                                                        }`}
                                                >
                                                    <span className="font-medium text-sm lg:text-base">
                                                        {formatTitle(category.title)}
                                                    </span>
                                                    <motion.div
                                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ChevronDown className="w-6 h-6" strokeWidth={3} />
                                                    </motion.div>
                                                </button>

                                                {/* Category Items - Expandable */}
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
                                                                {filteredSubcategories.map((subcategory) => (
                                                                    <div key={subcategory.id} className="space-y-2">
                                                                        {subcategory.items.map((item) => (
                                                                            <TreatmentListItem
                                                                                key={item.id}
                                                                                item={item}
                                                                                categoryId={category.id}
                                                                                categoryTitle={category.title}
                                                                                subcategoryId={subcategory.id}
                                                                                subcategoryTitle={subcategory.title}
                                                                                note={subcategory.note}
                                                                                isSelected={isItemSelected(item.id)}
                                                                                onToggle={handleToggleTreatment}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </div>
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

                {/* Reviews Section */}


                {/* CTA */}
                <section className="py-20 bg-foreground text-background text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                            Questions about our treatments?
                        </h2>
                        <p className="text-background/70 mb-8 max-w-lg mx-auto">
                            Our specialists are here to help you choose the perfect treatment for your needs.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />

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

export default function PricesPage() {
    return (
        <Suspense fallback={
            <>
                <Header />
                <main className="min-h-screen pt-40 px-6 bg-background flex items-center justify-center">
                    <div className="text-gold font-medium">Loading treatments...</div>
                </main>
                <Footer />
            </>
        }>
            <PricesContent />
        </Suspense>
    );
}
