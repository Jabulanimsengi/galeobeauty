"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    Check,
    Clock,
    Plus,
} from "lucide-react";
import { BookingCart } from "@/components/booking/BookingCart";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { BookingSummary } from "@/components/booking/BookingSummary";
import type { SelectedTreatment } from "@/lib/booking-types";
import type { ServiceItem, ServiceSubcategory } from "@/lib/services-data";

interface CategoryContentProps {
    subcategories: ServiceSubcategory[];
    categoryId: string;
    categoryTitle: string;
    directoryTitle?: string;
    directoryDescription?: string;
}

interface ServiceOption {
    item: ServiceItem;
    subcategoryId: string;
    subcategoryTitle: string;
    note?: string;
}

const SUBCATEGORY_SUMMARIES: Partial<Record<string, Record<string, string>>> = {
    "lashes-brows": {
        "lash-extensions-infills": "Full sets, fills and lash options for fullness, texture or styling.",
        "lash-lift-tint-brows": "Lower-maintenance lash lifts, tints and brow finishing services.",
    },
    hair: {
        "hair-styling": "Cuts, trims, blow-dries and occasion styling.",
        "hair-color": "Regrowth, tinting, highlights and tonal work.",
        "hair-treatments": "Smoothing, repair and treatment-led appointments.",
        "gents-hair": "Clean maintenance and barber-style grooming.",
    },
    nails: {
        "hands-feet": "Overlays, extensions, pedicures and nail-maintenance treatments.",
    },
};

const POPULAR_SERVICE_IDS: Partial<Record<string, string[]>> = {
    "hart-aesthetics": [
        "tox-per-unit",
        "lip-filler-1ml",
        "dermal-filler-1ml",
        "russian-lip-1ml",
        "cheek-fillers-1ml",
        "undereye-1-treatment",
        "collagen-biostimulator",
        "nefertiti-lift",
        "liquid-facelift",
        "cheek-fillers-2ml",
    ],
    "fat-freezing": ["fat-freezing-session", "fat-freezing-2-cups", "fat-freezing-4-cups", "ems-single"],
    slimming: ["slimming-injection", "lemon-bottle-10ml"],
    massages: [
        "swedish-massage-60",
        "deep-tissue-60",
        "back-neck-30",
        "back-neck-45",
        "hot-stone-60",
        "aromatherapy-60",
        "sports-massage-60",
        "full-body-massage",
        "foot-massage",
        "full-body-exfoliation",
    ],
    dermalogica: [
        "pro-skin-30",
        "pro-skin-60",
        "pro-clear",
        "pro-bright",
        "pro-microneedling",
        "pro-dermaplaning-full",
        "hydraderm",
        "multivitamin-treatment",
        "pro-power-peel",
        "facial-60",
    ],
    ipl: [
        "ipl-underarm",
        "ipl-brazilian",
        "ipl-hollywood",
        "ipl-full-leg",
        "ipl-lip",
        "ipl-chin",
        "ipl-full-face",
        "ipl-half-leg",
        "ipl-bikini-sides",
        "tattoo-removal",
    ],
    makeup: ["bridal-makeup", "evening-makeup", "day-makeup"],
    medical: ["fractional-laser", "plasmage", "iv-drip", "vaginal-tightening"],
    "permanent-makeup": [
        "microblading",
        "powderpixel-brows",
        "hybrid-brows",
        "brow-henna",
        "full-lips-contour",
        "lip-liner",
        "eyeliner-top",
        "eyeliner-bottom",
    ],
    qms: [
        "collagen-facial",
        "chemical-peel",
        "rejuvenating-facial",
        "deep-pore-cleansing",
        "basic-facial",
        "activator-treatment",
        "sensitive-skin-facial",
    ],
    sunbed: ["spraytan", "sunbed-session", "sunbed-10", "sunbed-20"],
    waxing: [
        "wax-hollywood",
        "wax-brazilian",
        "wax-full-leg",
        "wax-underarm",
        "wax-eyebrow",
        "wax-lip",
        "wax-full-face",
        "wax-half-leg",
        "wax-full-arm",
        "wax-chin",
    ],
    hair: [
        "ladies-cut",
        "wash-blow-short",
        "wash-blow-medium",
        "balayage",
        "toner-long",
        "brazilian-medium",
        "botox",
        "botox-medium",
        "gents-cut",
        "short-blow-10x",
    ],
    nails: [
        "gel-overlay-hands",
        "rubber-base",
        "acrylic-tips",
        "gel-tips",
        "full-manicure",
        "mani-pedi-combo",
        "pedicure-gel",
        "gel-toes",
        "acrylic-fill",
        "nail-art",
    ],
    "lashes-brows": [
        "classic-lashes",
        "hybrid-lashes",
        "volume-lashes",
        "lash-fill",
        "lash-fill-2",
        "lash-lift-tint",
        "lash-lift",
        "brow-lamination",
        "brow-tint",
        "lash-removal",
    ],
    "hair-extensions": [
        "tape-45cm-dark",
        "tape-50cm-dark",
        "clip-45cm-dark",
        "clip-50cm-dark",
        "halo-45cm-dark",
        "ponytail-50cm-dark",
        "genius-50cm",
        "butterfly-50cm",
        "microloop-45cm-dark",
        "tape-in-remover",
    ],
};

function formatItemList(names: string[], limit = 3) {
    const items = names.slice(0, limit);

    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;

    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function getSubcategorySummary(categoryId: string, subcategory: ServiceSubcategory) {
    const customSummary = SUBCATEGORY_SUMMARIES[categoryId]?.[subcategory.id];

    if (customSummary) {
        return customSummary;
    }

    const featuredItems = formatItemList(subcategory.items.map((item) => item.name), 3);
    return `Compare ${subcategory.title.toLowerCase()} options such as ${featuredItems}.`;
}

function getServiceOptions(subcategories: ServiceSubcategory[]): ServiceOption[] {
    return subcategories.flatMap((subcategory) =>
        subcategory.items.map((item) => ({
            item,
            subcategoryId: subcategory.id,
            subcategoryTitle: subcategory.title,
            note: item.note ?? subcategory.note,
        }))
    );
}

function getPopularServices(categoryId: string, options: ServiceOption[]) {
    const optionById = new Map(options.map((option) => [option.item.id, option]));
    const selectedIds = new Set<string>();
    const curatedIds = POPULAR_SERVICE_IDS[categoryId] ?? [];
    const curatedOptions = curatedIds.flatMap((id) => {
        const option = optionById.get(id);

        if (!option || selectedIds.has(id)) {
            return [];
        }

        selectedIds.add(id);
        return [option];
    });

    const fallbackOptions = options.filter((option) => !selectedIds.has(option.item.id));
    return [...curatedOptions, ...fallbackOptions].slice(0, 6);
}

function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    const [activeSubcategoryId, setActiveSubcategoryId] = useState(subcategories[0]?.id ?? "");
    const [showAllServices, setShowAllServices] = useState(false);
    const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

    const serviceOptions = useMemo(() => getServiceOptions(subcategories), [subcategories]);
    const popularServices = useMemo(
        () => getPopularServices(categoryId, serviceOptions),
        [categoryId, serviceOptions]
    );
    const initiallyVisibleServices = serviceOptions.slice(0, 12);
    const visibleServiceIds = new Set(
        (showAllServices ? serviceOptions : initiallyVisibleServices).map((option) => option.item.id)
    );
    const visibleSubcategories = subcategories.filter((subcategory) =>
        subcategory.items.some((item) => visibleServiceIds.has(item.id))
    );
    const hiddenServiceCount = Math.max(serviceOptions.length - initiallyVisibleServices.length, 0);

    useEffect(() => {
        const elements = subcategories
            .map((subcategory) => document.getElementById(`service-group-${subcategory.id}`))
            .filter((element): element is HTMLElement => Boolean(element));

        if (elements.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visibleEntry?.target instanceof HTMLElement) {
                    setActiveSubcategoryId(visibleEntry.target.dataset.subcategoryId ?? activeSubcategoryId);
                }
            },
            { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [activeSubcategoryId, subcategories]);

    const isItemSelected = (itemId: string) => selectedTreatments.some((t) => t.item.id === itemId);

    const handleToggleTreatment = (treatment: SelectedTreatment) => {
        const isSelected = isItemSelected(treatment.item.id);

        if (isSelected) {
            setSelectedTreatments((prev) => prev.filter((t) => t.item.id !== treatment.item.id));
            return;
        }

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

    const handleMenuJump = (targetId: string) => {
        scrollToSection(targetId);
    };

    const handleToggleDescription = (itemId: string) => {
        setExpandedDescriptions((current) => {
            const next = new Set(current);

            if (next.has(itemId)) {
                next.delete(itemId);
            } else {
                next.add(itemId);
            }

            return next;
        });
    };

    const buildSelectedTreatment = (option: ServiceOption): SelectedTreatment => ({
        categoryId,
        categoryTitle,
        subcategoryId: option.subcategoryId,
        subcategoryTitle: option.subcategoryTitle,
        item: option.item,
        note: option.note,
    });

    const renderServiceOption = (option: ServiceOption, variant: "featured" | "compact" | "row") => {
        const isSelected = isItemSelected(option.item.id);
        const isFeatured = variant === "featured";
        const isCompact = variant === "compact";
        const hasExpandableDescription = (isFeatured || isCompact) && Boolean(option.item.description);
        const isDescriptionExpanded = expandedDescriptions.has(option.item.id);

        return (
            <article
                key={option.item.id}
                className={`group border bg-white transition-colors ${isSelected ? "border-gold" : "border-border/60 hover:border-gold/50"} ${isFeatured ? "p-7" : isCompact ? "p-4" : "p-5"}`}
            >
                <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                                {option.subcategoryTitle}
                            </span>
                            {option.note && (
                                <span className="border-l border-border/70 pl-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                                    {option.note}
                                </span>
                            )}
                        </div>
                        <h3 className={`mt-3 font-sans font-semibold leading-tight text-foreground ${isFeatured ? "text-3xl" : "text-lg"}`}>
                            {option.item.name}
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={() => handleToggleTreatment(buildSelectedTreatment(option))}
                        aria-pressed={isSelected}
                        aria-label={isSelected ? `Remove ${option.item.name} from your booking` : `Add ${option.item.name} to your booking`}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-colors ${isSelected
                            ? "border-foreground bg-foreground text-white"
                            : "border-border/70 text-muted-foreground hover:border-gold hover:text-gold"
                            }`}
                    >
                        {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </button>
                </div>

                {option.item.description && (
                    <div className="mt-3">
                        <p className={`text-sm leading-7 text-muted-foreground ${hasExpandableDescription && !isDescriptionExpanded
                            ? isFeatured
                                ? "line-clamp-3"
                                : "line-clamp-2"
                            : ""
                            }`}>
                            {option.item.description}
                        </p>
                        {hasExpandableDescription && (
                            <button
                                type="button"
                                onClick={() => handleToggleDescription(option.item.id)}
                                className="mt-2 text-sm font-semibold text-gold underline-offset-4 hover:underline"
                            >
                                {isDescriptionExpanded ? "View less" : "View more"}
                            </button>
                        )}
                    </div>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <span className="font-semibold text-foreground">{option.item.price}</span>
                    {option.item.duration && (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {option.item.duration}
                        </span>
                    )}
                    <Link
                        href={`/services/${categoryId}/${option.item.id}`}
                        className="font-medium text-muted-foreground underline-offset-4 hover:text-gold hover:underline"
                    >
                        Details
                    </Link>
                </div>
            </article>
        );
    };

    return (
        <>
            <section className="border-t border-border/40 bg-background py-10 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <div id="popular-services" className="mb-16 scroll-mt-28">
                        <div className="mx-auto mb-8 max-w-2xl text-center">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                Popular {categoryTitle.toLowerCase()} services
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                                A curated starting point for clients who know the category but still need the exact booking line.
                            </p>
                        </div>

                        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {popularServices.map((option) => renderServiceOption(option, "compact"))}
                        </div>
                    </div>

                    <div id="full-menu" className="scroll-mt-28">
                        <div className="mb-8 border border-border/60 bg-secondary/10 p-6 sm:p-8">
                            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                                <div className="max-w-3xl">
                                    <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                        {directoryTitle ?? `Full ${categoryTitle} Menu`}
                                    </h2>
                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                        {showAllServices
                                            ? (directoryDescription ?? "Browse the exact treatments, compare prices and choose the service line you want to book.")
                                            : "Start with the first 12 services in this category. Use view more when you want to compare the complete menu."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:hidden">
                            <div className="sticky top-[96px] z-20 -mx-4 mb-6 flex gap-2 overflow-x-auto border-y border-border/60 bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
                                {visibleSubcategories.map((subcategory) => (
                                    <button
                                        key={subcategory.id}
                                        type="button"
                                        onClick={() => handleMenuJump(`service-group-${subcategory.id}`)}
                                        className={`shrink-0 border px-4 py-2 text-sm font-semibold transition-colors ${activeSubcategoryId === subcategory.id
                                            ? "border-gold bg-gold text-white"
                                            : "border-border/60 bg-white text-foreground"
                                            }`}
                                    >
                                        {subcategory.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)_360px] lg:gap-8 xl:grid-cols-[260px_minmax(0,1fr)_380px]">
                            <aside className="hidden lg:block">
                                <div className="sticky top-[140px] border border-border/60 bg-white">
                                    <nav className="flex flex-col">
                                        {visibleSubcategories.map((subcategory) => (
                                            <button
                                                key={subcategory.id}
                                                type="button"
                                                onClick={() => handleMenuJump(`service-group-${subcategory.id}`)}
                                                className={`border-b border-border/60 px-5 py-4 text-left text-sm font-semibold transition-colors last:border-b-0 ${activeSubcategoryId === subcategory.id
                                                    ? "bg-foreground text-white"
                                                    : "text-foreground hover:bg-secondary/20 hover:text-gold"
                                                    }`}
                                            >
                                                <span className="block">{subcategory.title}</span>
                                                <span className={`mt-1 block text-xs font-medium ${activeSubcategoryId === subcategory.id ? "text-white/65" : "text-muted-foreground"}`}>
                                                    {subcategory.items.length} services
                                                </span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </aside>

                            <div className="flex flex-col gap-10">
                                {subcategories.map((subcategory) => {
                                    const options = subcategory.items.map((item) => ({
                                        item,
                                        subcategoryId: subcategory.id,
                                        subcategoryTitle: subcategory.title,
                                        note: item.note ?? subcategory.note,
                                    })).filter((option) => visibleServiceIds.has(option.item.id));

                                    if (options.length === 0) {
                                        return null;
                                    }

                                    return (
                                        <section
                                            key={subcategory.id}
                                            id={`service-group-${subcategory.id}`}
                                            data-subcategory-id={subcategory.id}
                                            className="scroll-mt-32"
                                        >
                                            <div className="mb-4 border-l-2 border-gold pl-5">
                                                <h3 className="font-sans text-[1.2rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[1.45rem]">
                                                    {subcategory.title}
                                                </h3>
                                                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                                                    {getSubcategorySummary(categoryId, subcategory)}
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                {options.map((option) => renderServiceOption(option, "row"))}
                                            </div>

                                            {subcategory.note && (
                                                <p className="mt-3 border border-border/60 bg-secondary/10 p-3 text-xs italic text-muted-foreground">
                                                    * {subcategory.note}
                                                </p>
                                            )}
                                        </section>
                                    );
                                })}

                                {hiddenServiceCount > 0 && (
                                    <div className="border border-border/60 bg-white p-5 text-center">
                                        <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground">
                                            {showAllServices
                                                ? "You are viewing the complete service list for this category."
                                                : `${hiddenServiceCount} more services are available in this category.`}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setShowAllServices((current) => !current)}
                                            className="mt-4 inline-flex min-h-11 items-center justify-center border border-foreground bg-foreground px-5 text-sm font-semibold text-white transition-colors hover:bg-black"
                                        >
                                            {showAllServices ? "Show fewer services" : "View more services"}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <aside className="hidden lg:block">
                                <div className="sticky top-[140px]">
                                    {selectedTreatments.length > 0 && (
                                        <BookingSummary
                                            items={selectedTreatments}
                                            onRemoveItem={handleRemoveTreatment}
                                            onBook={handleOpenBooking}
                                        />
                                    )}
                                </div>
                            </aside>
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
