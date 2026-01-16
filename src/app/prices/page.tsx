"use client";

import { Header, Footer } from "@/components/layout";
import { TrustBadge } from "@/components/ui/trust-badge";
import { motion } from "framer-motion";
import { serviceCategories } from "@/lib/services-data";
import { useState, useEffect, useRef } from "react";
import { TreatmentListItem } from "@/components/booking/TreatmentListItem";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingCart } from "@/components/booking/BookingCart";
import { SelectedTreatment } from "@/lib/booking-types";
import { ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

// Helper function to format titles with proper capitalization
// Converts to Title Case and keeps acronyms uppercase
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

export default function PricesPage() {
    const [activeCategory, setActiveCategory] = useState(serviceCategories[0]?.id || "");
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedTreatments, setSelectedTreatments] = useState<SelectedTreatment[]>([]);

    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const navRef = useRef<HTMLDivElement>(null);
    const navScrollRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
    const isScrollingRef = useRef(false);

    // Track active category in ref to avoid stale closure issues
    const activeCategoryRef = useRef(activeCategory);
    useEffect(() => {
        activeCategoryRef.current = activeCategory;
    }, [activeCategory]);

    // Auto-scroll nav to show active button at the start (left edge)
    useEffect(() => {
        // Skip if programmatically scrolling (user clicked directly)
        if (!activeCategory || isScrollingRef.current) return;

        const scrollContainer = navScrollRef.current;
        const activeButton = buttonRefs.current[activeCategory];

        if (scrollContainer && activeButton) {
            const categoryIndex = serviceCategories.findIndex(c => c.id === activeCategory);

            if (categoryIndex === 0) {
                scrollContainer.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        const containerRect = scrollContainer.getBoundingClientRect();
                        const buttonRect = activeButton.getBoundingClientRect();
                        const relativeLeft = buttonRect.left - containerRect.left;
                        const targetScroll = scrollContainer.scrollLeft + relativeLeft - 16;

                        scrollContainer.scrollTo({
                            left: Math.max(0, targetScroll),
                            behavior: 'smooth'
                        });
                    });
                });
            }
        }
    }, [activeCategory]);

    // Scroll spy - detect which section is in view
    useEffect(() => {
        const handleScroll = () => {
            // Skip scroll spy if we're programmatically scrolling
            if (isScrollingRef.current) return;

            const navHeight = navRef.current?.getBoundingClientRect().bottom || 180;
            const triggerPoint = navHeight + 50;

            let currentSection = serviceCategories[0]?.id;

            for (const category of serviceCategories) {
                const section = sectionRefs.current[category.id];
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
                        currentSection = category.id;
                        break;
                    }
                }
            }

            if (activeCategoryRef.current !== currentSection) {
                setActiveCategory(currentSection);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll to section when clicking nav item
    const scrollToSection = (categoryId: string) => {
        const section = sectionRefs.current[categoryId];
        if (section) {
            // Immediately set active category and disable scroll spy
            setActiveCategory(categoryId);
            isScrollingRef.current = true;

            const navBottom = navRef.current?.getBoundingClientRect().bottom || 160;
            const headerOffset = navBottom + 20;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Re-enable scroll spy after scroll completes
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 800);
        }
    };

    // Handle manual scroll
    const handleScrollNav = (direction: 'left' | 'right') => {
        if (navScrollRef.current) {
            const scrollAmount = 200;
            navScrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
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
                            Our <span className="text-gold">Prices</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-2xl mx-auto">
                            Browse our treatments and select the ones you'd like to book.
                        </p>
                    </div>
                </section>

                {/* Sticky Category Navigation */}
                <div
                    ref={navRef}
                    className="sticky z-40 bg-background border-b border-border/30 mt-4"
                    style={{ top: 'calc(var(--header-height, 96px) + 24px)' }}
                >
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="flex items-center justify-between gap-4">
                            <div
                                ref={navScrollRef}
                                className="flex items-center gap-6 py-4 overflow-x-auto hide-scrollbar flex-1"
                            >
                                {serviceCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        ref={(el) => { buttonRefs.current[category.id] = el; }}
                                        onClick={() => scrollToSection(category.id)}
                                        className={`whitespace-nowrap text-base font-medium transition-all duration-200 ${activeCategory === category.id
                                            ? "bg-foreground text-background px-5 py-2.5 rounded-full"
                                            : "text-foreground/70 hover:text-foreground"
                                            }`}
                                    >
                                        {formatTitle(category.title)}
                                    </button>
                                ))}
                            </div>

                            {/* Desktop Scroll Arrows */}
                            <div className="hidden lg:flex items-center gap-1 pl-2 border-l border-border/30">
                                <button
                                    onClick={() => handleScrollNav('left')}
                                    className="p-1.5 rounded-full hover:bg-muted/50 transition-colors text-foreground/70 hover:text-foreground"
                                    aria-label="Scroll left"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleScrollNav('right')}
                                    className="p-1.5 rounded-full hover:bg-muted/50 transition-colors text-foreground/70 hover:text-foreground"
                                    aria-label="Scroll right"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Selected count badge - visible on mobile */}
                            {selectedTreatments.length > 0 && (
                                <div className="lg:hidden flex items-center gap-2 bg-foreground text-white px-3 py-1.5 rounded-full text-sm font-medium">
                                    <span>{selectedTreatments.length} selected</span>
                                    <ChevronUp className="w-4 h-4" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content - Two Column Layout */}
                <section className="py-12 lg:py-16">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="flex gap-8 lg:gap-12">
                            {/* Left Column - Treatment List */}
                            <div className="flex-1 max-w-2xl">
                                {serviceCategories.map((category, catIdx) => (
                                    <motion.div
                                        key={category.id}
                                        ref={(el) => { sectionRefs.current[category.id] = el; }}
                                        id={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: catIdx * 0.03 }}
                                        className="mb-16 last:mb-0 scroll-mt-[200px]"
                                    >
                                        {/* Category Header */}
                                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                                    <category.Icon className="w-5 h-5 text-gold" />
                                                </div>
                                                <div>
                                                    <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                                                        {formatTitle(category.title)}
                                                    </h2>
                                                    <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                                                </div>
                                            </div>
                                            <TrustBadge variant={category.badgeVariant} className="ml-auto hidden sm:flex">
                                                {category.badge}
                                            </TrustBadge>
                                        </div>

                                        {/* Subcategories with Vertical Treatment List */}
                                        <div className="space-y-3">
                                            {category.subcategories.map((subcategory) => (
                                                <div key={subcategory.id} className="space-y-3">
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
                                ))}
                            </div>

                            {/* Right Column - Sticky Booking Summary (Desktop Only) */}
                            <div className="hidden lg:block w-[380px] shrink-0">
                                <div className="sticky top-[180px]">
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
