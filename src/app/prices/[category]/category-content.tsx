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
}

interface CategoryGuideCard {
    title: string;
    description: string;
}

interface CategoryGuide {
    eyebrow: string;
    title: string;
    description: string;
    cards: CategoryGuideCard[];
}

const CATEGORY_GUIDES: Partial<Record<string, CategoryGuide>> = {
    "lashes-brows": {
        eyebrow: "Choosing Your Look",
        title: "How To Decide Between Extensions, Lifts, and Brow Styling",
        description: "Some clients want fuller, more noticeable lashes, while others want a softer low-maintenance result. This collection gives you both options, plus simple brow finishing that helps the whole face feel more polished.",
        cards: [
            {
                title: "Choose Lash Extensions",
                description: "Ideal when you want extra length, density, or a more styled finish for everyday glam, events, bridal beauty, or a fuller eye look without mascara.",
            },
            {
                title: "Choose A Lash Lift Or Tint",
                description: "A beautiful lower-maintenance option when you love your natural lashes and simply want them darker, curlier, and more visible from the moment you wake up.",
            },
            {
                title: "Add Brow Styling",
                description: "Tinting helps frame the face, gives more definition to sparse or lighter brows, and finishes the overall result so your eyes look naturally more put together.",
            },
        ],
    },
    hair: {
        eyebrow: "Planning Your Hair Visit",
        title: "Cuts, Colour, Styling, and Smoothing In One Place",
        description: "This collection covers maintenance appointments as well as bigger hair changes, so you can compare quick refresh services with colour work, smoothing treatments, and occasion styling before you book.",
        cards: [
            {
                title: "For Maintenance",
                description: "Choose trims, blow-dries, toners, or regrowth appointments when you want your hair to feel tidy, polished, and easier to manage.",
            },
            {
                title: "For Colour Or Dimension",
                description: "Foils, balayage, and full colour services are best when you want to brighten, soften, cover grey, or reshape the overall tone of your hair.",
            },
            {
                title: "For Repair And Smoothness",
                description: "Brazilian, keratin, and treatment appointments are ideal when frizz, dryness, breakage, or dullness are getting in the way of a polished finish.",
            },
        ],
    },
    nails: {
        eyebrow: "Planning Your Nail Appointment",
        title: "Choose Between Strength, Length, Finish, and Foot Care",
        description: "Whether you want durable everyday nails, a more elevated shape, or softer, better-kept feet, this collection makes it easier to compare the finish and maintenance level that suits you.",
        cards: [
            {
                title: "For Natural Nail Strength",
                description: "Gel overlays, rubber base, and builder-style options are ideal if you want cleaner, stronger nails without committing to more dramatic length.",
            },
            {
                title: "For Length Or Design",
                description: "Tips, acrylics, sculpted forms, and designer sets are better when you want added shape, more structure, or something more statement-making.",
            },
            {
                title: "For Hands And Feet Together",
                description: "Pedicures, combos, and finishing treatments suit clients who want the full polished feeling rather than just a single nail service.",
            },
        ],
    },
    "hart-aesthetics": {
        eyebrow: "Refining Your Features",
        title: "Medical Aesthetics & Injectables",
        description: "From subtle volume restoration to non-surgical lifting, these treatments are performed by medical professionals to enhance your natural balance and smooth fine lines.",
        cards: [
            {
                title: "For Restoring Volume",
                description: "Dermal fillers and skin boosters are ideal for replacing lost volume in cheeks and lips, or providing deep hydration to delicate areas like the under-eyes.",
            },
            {
                title: "For Smoothing Lines",
                description: "Tox treatments gently relax specific facial muscles to soften expression lines, crow's feet, and forehead wrinkles for a refreshed look.",
            },
            {
                title: "For Lifting & Tightening",
                description: "Advanced options like the Nefertiti Lift or Collagen Biostimulators work to firm the jawline and stimulate long-term structural collagen support.",
            },
        ],
    },
    "fat-freezing": {
         eyebrow: "Targeting Stubborn Areas",
         title: "Cryolipolysis & Body Contouring",
         description: "A non-invasive approach to permanently reducing localized fat deposits that don't respond easily to diet and exercise.",
         cards: [
            {
                title: "How It Works",
                description: "Cryolipolysis safely freezes fat cells without damaging surrounding tissue. Your body then naturally processes and eliminates them over several weeks.",
            },
            {
                title: "Targeting Specific Zones",
                description: "Whether it's the abdomen, love handles, or smaller areas, our multi-cup options allow us to treat different zones efficiently in a single session.",
            },
            {
                title: "What to Expect",
                description: "The treatment involves minimal discomfort and zero downtime, making it a convenient walk-in, walk-out option for active clients.",
            },
         ],
    },
    slimming: {
        eyebrow: "Supporting Your Goals",
        title: "Slimming Injections & Supplements",
        description: "Targeted, minimally invasive treatments designed to boost your metabolism, break down localized fat, and accelerate your contouring journey.",
        cards: [
            {
                title: "For Fast Spot Reduction",
                description: "Fat-dissolving formulas like Lemon Bottle work quickly on stubborn pockets—such as a double chin or lower abdomen—where exercise alone isn't enough.",
            },
            {
                title: "For Overall Metabolism",
                description: "Slimming injections are formulated to enhance your body's natural fat-burning processes, acting as a supportive push alongside your healthy lifestyle.",
            },
            {
                title: "Quick & Convenient",
                description: "These treatments are fast to administer with little to no downtime, easily fitting into a busy schedule.",
            },
        ],
    },
    massages: {
        eyebrow: "Releasing Tension",
        title: "Therapeutic & Relaxation Massages",
        description: "Whether you need to unwind from a stressful week, recover from an intense workout, or address chronic pain, our massage menu has a technique tailored for your body.",
        cards: [
            {
                title: "For Pure Relaxation",
                description: "Swedish and Aromatherapy massages use gentle, flowing strokes and soothing oils to calm the nervous system and melt away everyday stress.",
            },
            {
                title: "For Deep Muscle Relief",
                description: "Deep Tissue and Sports massages apply focused pressure to release stubborn knots, improve mobility, and speed up recovery after physical exertion.",
            },
            {
                title: "For Added Comfort",
                description: "Hot Stone therapy uses smooth, heated basalts to penetrate deeper into tense muscles, offering a profoundly comforting and restorative experience.",
            },
        ],
    },
    dermalogica: {
        eyebrow: "Choosing Your Facial",
        title: "Dermalogica Skincare & Pro Peels",
        description: "Professional-grade treatments customized to your exact skin concerns, from deep hydration and clearing breakouts to advanced clinical resurfacing.",
        cards: [
            {
                title: "For Maintenance & Glow",
                description: "Pro Skin and express facials are perfect for regular upkeep, deep cleansing, and restoring a healthy, hydrated radiance.",
            },
            {
                title: "For Targeted Concerns",
                description: "Specific treatments like Pro Clear and Ultra Calming are designed to directly address persistent issues like adult acne, redness, or sensitivity.",
            },
            {
                title: "For Resurfacing & Ageing",
                description: "Pro Power Peels and advanced treatments focus on lifting, firming, and causing dramatic texture improvements using stronger active ingredients.",
            },
        ],
    },
    ipl: {
        eyebrow: "Permanent Reduction",
        title: "IPL Hair Removal & Skin Renewal",
        description: "Intense Pulsed Light technology offers a long-term solution to unwanted hair and skin irregularities, saving you from the endless cycle of shaving and waxing.",
        cards: [
            {
                title: "For Facial Hair",
                description: "Safely target upper lip, chin, or full face hair. IPL is precise enough for delicate areas and helps prevent the shadows or razor bumps of traditional methods.",
            },
            {
                title: "For Body Hair",
                description: "From underarms to full legs, IPL treatments significantly thin out and reduce hair over a series of sessions, leaving skin smoother for longer.",
            },
            {
                title: "The Process",
                description: "The light energy targets the pigment in the hair follicle, disabling its growth. It's increasingly comfortable and highly effective for most skin types.",
            },
        ],
    },
    makeup: {
        eyebrow: "Getting Ready",
        title: "Professional Makeup Application",
        description: "Flawless, long-lasting makeup artistry tailored to your features and your specific event, ensuring you feel confident both in person and in photos.",
        cards: [
            {
                title: "For Bridal & Weddings",
                description: "Specialized, tear-proof application that guarantees you look breathtaking walking down the aisle and flawless in every wedding photograph.",
            },
            {
                title: "For Evening & Events",
                description: "Glamorous, polished looks perfect for matric dances, galas, or date nights, customized to match your outfit and personal style.",
            },
            {
                title: "For Natural Daytime",
                description: "A softer, fresher approach that enhances your best features without feeling heavy, ideal for corporate headshots or daytime functions.",
            },
        ],
    },
    medical: {
        eyebrow: "Clinical Results",
        title: "Advanced Medical Aesthetics",
        description: "Technology-driven interventions that bridge the gap between traditional beauty treatments and surgical procedures for significant, lasting improvements.",
        cards: [
            {
                title: "For Skin Resurfacing",
                description: "Fractional lasers create micro-injuries to stimulate massive collagen production, radically improving acne scars, large pores, and uneven texture.",
            },
            {
                title: "For Non-Surgical Lifting",
                description: "Plasmage uses precise plasma energy to tighten sagging skin around the eyes and neck—offering a lift without the downtime of a scalpel.",
            },
            {
                title: "For Internal Wellness",
                description: "IV Drips deliver essential vitamins and hydration straight into your bloodstream, while targeted treatments like vaginal rejuvenation support intimate health.",
            },
        ],
    },
    "permanent-makeup": {
        eyebrow: "Wake Up Ready",
        title: "Microblading & Permanent Makeup",
        description: "Semi-permanent pigment placement carefully designed to define your brows, lips, and eyes, saving you time every morning while looking effortlessly polished.",
        cards: [
            {
                title: "For Brows",
                description: "Whether you prefer the crisp, natural hair strokes of microblading or the soft, shaded look of powder brows, we customize the shape to frame your face perfectly.",
            },
            {
                title: "For Lips",
                description: "Lip blush and contouring correct asymmetry, restore faded colour, and create the illusion of fuller, consistently tinted lips without the need for lipstick.",
            },
            {
                title: "For Eyes",
                description: "Permanent top or bottom eyeliner adds depth to your lash line, making your eyes pop while remaining completely smudge-proof throughout the day.",
            },
        ],
    },
    qms: {
        eyebrow: "Clinical Skincare",
        title: "QMS Medicosmetics Facials",
        description: "Developed by medical professionals, QMS treatments focus intensely on collagen restoration and addressing the root causes of skin ageing.",
        cards: [
            {
                title: "For Collagen Boosting",
                description: "Signature QMS facials deliver highly active collagen directly into the epidermis, immediately plumping fine lines and improving skin elasticity.",
            },
            {
                title: "For Deep Renewal",
                description: "Chemical peels and activator treatments gently but effectively resurface the dull top layer of skin, allowing anti-ageing ingredients to penetrate deeper.",
            },
            {
                title: "For Maintenance",
                description: "Basic and sensitive skin options provide all the clinical benefits of the QMS line in a gentler, deeply hydrating format perfect for reactive skin.",
            },
        ],
    },
    sunbed: {
        eyebrow: "Building A Glow",
        title: "UV Tanning & Spray Tans",
        description: "Achieve a flawless, bronzed look year-round with our high-quality tanning options, whether you prefer a quick spray or building a natural base.",
        cards: [
            {
                title: "For An Instant Result",
                description: "Our streak-free spray tans provide immediate, customized colour perfect for an upcoming event, holiday, or wedding without UV exposure.",
            },
            {
                title: "For A Lasting Base",
                description: "Sunbed sessions help you safely build and maintain a natural, glowing tan over time, utilizing modern equipment for an even and controlled finish.",
            },
            {
                title: "Packages Available",
                description: "We offer discounted bundles of 10 or 20 sunbed sessions for regular tanners wanting consistent maintenance at a better value.",
            },
        ],
    },
    waxing: {
        eyebrow: "Smooth & Clean",
        title: "Professional Face & Body Waxing",
        description: "Fast, hygienic, and effective hair removal from head to toe, leaving your skin beautifully smooth and completely hair-free for weeks.",
        cards: [
            {
                title: "For The Face",
                description: "Precision waxing for eyebrows, lip, chin, and cheeks. We use gentle waxes meant for delicate facial skin to reduce redness and irritation.",
            },
            {
                title: "For The Body",
                description: "From legs and underarms to backs and chests, our efficient body waxing removes maximum hair with minimal discomfort.",
            },
            {
                title: "For Intimate Areas",
                description: "Expert Hollywood and Brazilian waxing done quickly and professionally in a highly hygienic, thoroughly comfortable environment.",
            },
        ],
    },
};

const SUBCATEGORY_SUMMARIES: Partial<Record<string, Record<string, string>>> = {
    "lashes-brows": {
        "lash-extensions-infills": "These services are best when you want extra length, fluff, texture, or a more styled lash look that can be maintained with regular infills.",
        "lash-lift-tint-brows": "These are the softer, lower-maintenance options in the collection, ideal for clients who want definition without the commitment of a full extension set.",
    },
    hair: {
        "hair-styling": "Choose from cuts, trims, blow-dries, and occasion styling when your goal is shape, movement, and a refined salon finish.",
        "hair-color": "Best for colour refreshes, grey coverage, highlights, balayage, and tonal adjustments that shift the overall look of your hair.",
        "hair-treatments": "Designed for smoothing, strengthening, and restoring manageability when frizz, dryness, or damage are your main concern.",
        "gents-hair": "A smaller focused edit of grooming services for clean, well-kept haircuts and quick maintenance.",
    },
    nails: {
        "hands-feet": "A full menu of overlays, extensions, pedicures, and finishing treatments for clients who want strength, shape, colour, or better overall nail maintenance.",
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

    return `A focused section within ${categoryId.replace(/-/g, " ")}, including treatments such as ${featuredItems}.`;
}

export function CategoryContent({ subcategories, categoryId, categoryTitle }: CategoryContentProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedTreatments, setSelectedTreatments] = useState<SelectedTreatment[]>([]);
    const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>(
        subcategories.length > 0 ? [subcategories[0].id] : []
    );
    const [expandedGuideCard, setExpandedGuideCard] = useState<string | null>(null);

    const categoryGuide = CATEGORY_GUIDES[categoryId];

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
                    <div className="mb-8 rounded-[2rem] border border-border/50 bg-secondary/10 p-6 sm:p-8">
                        <div className="max-w-3xl">
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
                                {categoryGuide?.eyebrow ?? "Inside This Collection"}
                            </span>
                            <h2 className="mt-3 font-serif text-3xl text-foreground">
                                {categoryGuide?.title ?? `Browse ${categoryTitle} With More Confidence`}
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                {categoryGuide?.description ?? `Use the sections below to compare treatment styles, pricing, and maintenance level before you decide what feels right for you.`}
                            </p>
                        </div>

                        {categoryGuide?.cards && categoryGuide.cards.length > 0 && (
                            <div className="mt-8 flex flex-col gap-3">
                                {categoryGuide.cards.map((card) => {
                                    const isExpanded = expandedGuideCard === card.title;
                                    return (
                                        <div
                                            key={card.title}
                                            className="rounded-2xl border border-border/60 bg-background/90 overflow-hidden transition-all duration-300"
                                        >
                                            <button
                                                onClick={() => setExpandedGuideCard(isExpanded ? null : card.title)}
                                                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gold/5 focus:outline-none"
                                            >
                                                <h3 className="font-medium text-foreground">{card.title}</h3>
                                                <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-lg font-bold leading-none text-muted-foreground transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                                                    {isExpanded ? "−" : "+"}
                                                </span>
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    >
                                                        <div className="px-5 pb-5 pt-0">
                                                            <div className="h-px w-full bg-border/40 mb-4" />
                                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                                {card.description}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Removed redundant grid */}
                    </div>

                    <div className="flex gap-8 lg:gap-12">
                        <div className="flex-1 lg:max-w-2xl">
                            <div className="mb-6 rounded-[1.5rem] border border-border/50 bg-background p-5">
                                <h2 className="font-serif text-2xl text-foreground">Browse Treatments In Detail</h2>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Open each section to compare services, add treatments to your booking, or use{" "}
                                    <span className="font-medium text-foreground">View treatment details</span>{" "}
                                    whenever you want a fuller page with more explanation before deciding.
                                </p>
                            </div>

                            <div className="space-y-2">
                                {subcategories.map((subcategory) => {
                                    const isExpanded = isSubcategoryExpanded(subcategory.id);

                                    return (
                                        <div key={subcategory.id} className="overflow-hidden rounded-3xl border border-border/50 bg-background transition-shadow hover:shadow-sm">
                                            <button
                                                onClick={() => toggleSubcategoryExpansion(subcategory.id)}
                                                className={`group flex w-full flex-col p-6 text-left transition-colors duration-300 hover:bg-gold/5 focus:outline-none ${isExpanded ? "bg-gold/5" : ""
                                                    }`}
                                            >
                                                <div className="flex w-full items-start justify-between gap-4">
                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                                            <h3 className="font-serif text-xl sm:text-2xl text-foreground">
                                                                {subcategory.title}
                                                            </h3>
                                                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                                                                {subcategory.items.length} treatments
                                                            </span>
                                                        </div>
                                                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                                            {getSubcategorySummary(categoryId, subcategory)}
                                                        </p>
                                                    </div>
                                                    <motion.div
                                                        className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-xl font-bold leading-none text-muted-foreground transition-colors group-hover:bg-gold/10 group-hover:text-gold"
                                                    >
                                                        {isExpanded ? "−" : "+"}
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
                                                        <div className="space-y-2 px-4 py-4 sm:px-6 bg-secondary/5">
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
                                                            <div className="px-6 pb-4 bg-secondary/5">
                                                                <p className="rounded-xl bg-background p-3 text-center text-xs italic text-muted-foreground shadow-sm">
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
