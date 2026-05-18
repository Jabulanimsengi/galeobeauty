"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Check,
    Plus,
} from "lucide-react";

import { BookingCart } from "@/components/booking/BookingCart";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { Footer, Header } from "@/components/layout";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";
import type { SelectedTreatment } from "@/lib/booking-types";
import {
    getSpecialBookingItem,
    resolveSpecialOffer,
    specialGroups,
    type ResolvedSpecialOffer,
} from "@/lib/specials-data";

const specials = specialGroups
    .map((group) => ({
        ...group,
        offers: group.offers.flatMap((offer) => {
            const resolvedOffer = resolveSpecialOffer(offer);
            return resolvedOffer ? [resolvedOffer] : [];
        }),
    }))
    .filter((group) => group.offers.length > 0);

type SpecialGroupView = (typeof specials)[number];

const heroSlides = [
    {
        src: "/images/specials/eyeliner-special.png",
        alt: "Galeo Beauty eyeliner special",
    },
    {
        src: "/images/specials/facial-special.png",
        alt: "Galeo Beauty facial special",
    },
    {
        src: "/images/specials/pedicure-special.png",
        alt: "Galeo Beauty pedicure special",
    },
];

interface SpecialOfferCardProps {
    offer: ResolvedSpecialOffer;
    isSelected: boolean;
    onToggle: (offer: ResolvedSpecialOffer) => void;
}

function SpecialOfferCard({ offer, isSelected, onToggle }: SpecialOfferCardProps) {
    return (
        <article
            id={offer.id}
            className={`scroll-mt-32 border bg-white px-3 py-3 transition-colors sm:px-4 ${
                isSelected ? "border-gold bg-gold/5" : "border-border/60 hover:border-gold/50"
            }`}
        >
            <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1 text-left">
                    <h3 className="font-sans text-sm font-semibold leading-tight text-foreground sm:text-base">
                        {offer.title}
                    </h3>

                    {offer.services.length > 1 && (
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Includes {offer.services.map((service) => service.item.name).join(" + ")}
                        </p>
                    )}
                    {offer.savingsAmount && (
                        <span className="mt-2 inline-flex bg-green-600 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                            Save {offer.savingsAmount}
                        </span>
                    )}
                </div>

                <div className="shrink-0 text-right">
                    {offer.originalPrice && (
                        <p className="text-[11px] leading-none text-muted-foreground line-through">
                            {offer.originalPrice}
                        </p>
                    )}
                    <p className="font-sans text-lg font-semibold leading-none text-gold sm:text-xl">
                        {offer.specialPrice}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => onToggle(offer)}
                    aria-pressed={isSelected}
                    aria-label={isSelected ? `Remove ${offer.title} from booking` : `Add ${offer.title} to booking`}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-colors ${
                        isSelected
                            ? "border-foreground bg-foreground text-white"
                            : "border-border/70 text-muted-foreground hover:border-gold hover:text-gold"
                    }`}
                >
                    {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </button>
            </div>
        </article>
    );
}

interface SpecialGroupSectionProps {
    group: SpecialGroupView;
    isItemSelected: (itemId: string) => boolean;
    onToggle: (offer: ResolvedSpecialOffer) => void;
}

function SpecialGroupSection({
    group,
    isItemSelected,
    onToggle,
}: SpecialGroupSectionProps) {
    return (
        <motion.section
            id={group.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-28 border-t border-border/60 py-8 sm:py-10"
        >
            <div className="mx-auto max-w-4xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                        {group.subtitle}
                    </p>
                    <h2 className="mt-2 font-sans text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                        {group.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        Active {group.dateLabel}. Linked to the service menu for details before booking.
                    </p>
                </div>

                <div className="mx-auto mt-6 grid max-w-2xl gap-3">
                    {group.offers.map((offer) => (
                        <SpecialOfferCard
                            key={offer.id}
                            offer={offer}
                            isSelected={isItemSelected(offer.id)}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

export default function SpecialsPage() {
    const [selectedTreatments, setSelectedTreatments] = useState<SelectedTreatment[]>([]);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [activeHeroSlide, setActiveHeroSlide] = useState(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
        }, 5500);

        return () => window.clearInterval(interval);
    }, []);

    const isItemSelected = (itemId: string) => {
        return selectedTreatments.some((treatment) => treatment.item.id === itemId);
    };

    const handleToggleTreatment = (offer: ResolvedSpecialOffer) => {
        const isSelected = isItemSelected(offer.id);

        if (isSelected) {
            setSelectedTreatments((prev) =>
                prev.filter((treatment) => treatment.item.id !== offer.id)
            );
            return;
        }

        const bookingItem = getSpecialBookingItem(offer);
        const treatment: SelectedTreatment = {
            categoryId: offer.primaryService.categoryId,
            categoryTitle: offer.primaryService.category.title,
            subcategoryId: offer.primaryService.subcategoryId,
            subcategoryTitle: offer.primaryService.subcategoryTitle,
            item: bookingItem,
            note: bookingItem.note,
        };

        setSelectedTreatments((prev) => [...prev, treatment]);
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
            <Header />
            <main className="min-h-screen bg-white">
                <section className="border-b border-border/50 bg-white pt-24 lg:pt-32">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="overflow-hidden [border-radius:0]">
                            <div className="sr-only">
                                <p>May - July 2026</p>
                                <h1>Winter Specials</h1>
                            </div>

                            <div className="relative mx-auto aspect-square w-full max-w-[34rem] bg-secondary/20 [border-radius:0] sm:max-w-[38rem] lg:max-w-[42rem]">
                                <div className="absolute inset-0">
                                    {heroSlides.map((slide, index) => (
                                        <CloudinaryImage
                                            key={slide.src}
                                            src={slide.src}
                                            alt={slide.alt}
                                            fill
                                            priority={index === 0}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 38rem, 42rem"
                                            className={`object-contain object-center [border-radius:0] transition-opacity duration-700 ${
                                                activeHeroSlide === index ? "opacity-100" : "opacity-0"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center justify-center">
                                    <div
                                        className="flex items-center gap-2"
                                        aria-label={`${heroSlides.length} specials in hero carousel`}
                                    >
                                        {heroSlides.map((slide, index) => (
                                            <motion.button
                                                key={slide.src}
                                                type="button"
                                                onClick={() => setActiveHeroSlide(index)}
                                                aria-label={`Show special ${index + 1}`}
                                                aria-current={activeHeroSlide === index}
                                                animate={{
                                                    width: activeHeroSlide === index ? 36 : 10,
                                                    backgroundColor: activeHeroSlide === index
                                                        ? "var(--gold)"
                                                        : "color-mix(in oklch, var(--gold) 36%, transparent)",
                                                }}
                                                style={{ height: 10 }}
                                                transition={{ duration: 0.32, ease: "easeOut" }}
                                                className={`block rounded-full transition-colors ${
                                                    activeHeroSlide === index
                                                        ? "shadow-sm shadow-gold/30"
                                                        : "hover:bg-gold/60"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white px-4 sm:px-6">
                    <div className="container mx-auto">
                        <div className="flex gap-8 lg:gap-12">
                            <div className="min-w-0 flex-1">
                                {specials.map((group) => (
                                    <SpecialGroupSection
                                        key={group.id}
                                        group={group}
                                        isItemSelected={isItemSelected}
                                        onToggle={handleToggleTreatment}
                                    />
                                ))}
                            </div>

                            {selectedTreatments.length > 0 && (
                                <motion.aside
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 24 }}
                                    className="hidden w-[380px] shrink-0 lg:block"
                                >
                                    <div className="sticky top-[140px] py-12">
                                        <BookingSummary
                                            items={selectedTreatments}
                                            onRemoveItem={handleRemoveTreatment}
                                            onBook={handleOpenBooking}
                                        />
                                    </div>
                                </motion.aside>
                            )}
                        </div>
                    </div>
                </section>

                <section className="bg-stone-50/70 px-4 py-16 sm:px-6 lg:py-20">
                    <div className="mx-auto max-w-4xl border border-[#2b2b2f] bg-[#171719] p-8 text-center text-white shadow-[0_24px_70px_-45px_rgba(0,0,0,0.45)] sm:p-10 lg:p-14">
                        <h2 className="font-sans text-xl font-semibold text-white sm:text-2xl">
                            Need help choosing?
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70">
                            Our team can help you match the right service or special to your visit.
                        </p>
                        <NavLink
                            href="/contact"
                            className="mt-6 inline-flex min-h-11 items-center gap-2 border border-gold bg-gold px-6 text-sm font-semibold text-white transition-colors hover:border-gold-dark hover:bg-gold-dark"
                        >
                            Contact Us
                            <ArrowRight className="h-4 w-4" />
                        </NavLink>
                    </div>
                </section>
            </main>
            <Footer />

            {selectedTreatments.length > 0 && (
                <div className="lg:hidden">
                    <BookingCart
                        items={selectedTreatments}
                        onRemoveItem={handleRemoveTreatment}
                        onClearAll={handleClearAll}
                        onBook={handleOpenBooking}
                    />
                </div>
            )}

            <BookingSheet
                isOpen={isBookingOpen}
                onClose={handleCloseBooking}
                treatments={selectedTreatments}
            />
        </>
    );
}
