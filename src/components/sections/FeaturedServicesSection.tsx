"use client";

import { NavLink } from "@/components/ui/nav-link";
import { motion } from "framer-motion";
import { useState } from "react";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

const featuredServices = [
    {
        title: "Body Contouring",
        location: "Hartbeespoort",
        description: "Non-surgical fat reduction & EMS body sculpting",
        href: "/body-contouring",
        image: "/images/fat-freezing/fat-freezing-stomach-treatment.jpg",
        color: "from-gold/5 to-gold/10",
        borderColor: "border-gold/20",
        prices: [
            { name: "Fat Freezing Session", price: "R799" },
            { name: "EMS Single Session", price: "R1,850" },
            { name: "EMS Package (4x)", price: "R6,290" },
            { name: "EMS Package (6x)", price: "R13,500+" },
        ],
        priceLink: "/prices/fat-freezing",
    },
    {
        title: "Anti-Aging",
        location: "Near Pretoria",
        description: "Injectable aesthetics & facial rejuvenation",
        href: "/anti-aging",
        image: "/images/dermalogica/dermalogica-proskin-treatment.jpg",
        color: "from-gold/10 to-gold/5",
        borderColor: "border-gold/20",
        prices: [
            { name: "Nefertiti Lift", price: "R7,950" },
            { name: "Liquid Face Lift", price: "R10,000" },
            { name: "Dermal Filler 1ml", price: "R2,800" },
            { name: "Tox Per Unit", price: "R59.60" },
        ],
        priceLink: "/prices/hart-aesthetics",
    },
    {
        title: "Permanent Makeup",
        location: "Hartbeespoort",
        description: "Microblading, powder brows & lip blush",
        href: "/permanent-makeup",
        image: "/images/make-up/expert-bridal-makeup-application.jpg",
        color: "from-foreground/5 to-gold/10",
        borderColor: "border-gold/20",
        prices: [
            { name: "Powder Pixel Brows", price: "R1,710" },
            { name: "Microblading", price: "R1,350" },
            { name: "Full Lips Contour", price: "R2,430" },
            { name: "Eyeliner Top", price: "R720" },
        ],
        priceLink: "/prices/permanent-makeup",
    },
    {
        title: "Medical Spa",
        location: "Hartbeespoort Dam",
        description: "Advanced aesthetic treatments & skincare",
        href: "/medical-spa",
        image: "/images/ipl/ipl-hair-removal-arms-treatment.jpg",
        color: "from-gold/10 to-foreground/5",
        borderColor: "border-gold/20",
        prices: [
            { name: "Pro Microneedling", price: "R1,950" },
            { name: "Fractional Laser", price: "R2,430" },
            { name: "Vaginal Tightening", price: "R4,950" },
            { name: "Plasmage", price: "R899" },
        ],
        priceLink: "/prices/medical",
    },
    {
        title: "Bridal Beauty",
        location: "Hartbeespoort",
        description: "Complete wedding day makeup & styling",
        href: "/bridal-beauty",
        image: "/images/make-up/precision-makeup-base-application.jpg",
        color: "from-foreground/5 to-gold/5",
        borderColor: "border-gold/20",
        prices: [
            { name: "Bridal Makeup", price: "R1,620" },
            { name: "Evening Makeup", price: "R594" },
            { name: "Day Makeup", price: "R486" },
            { name: "Long Hair Upstyle", price: "R900" },
        ],
        priceLink: "/prices/makeup",
    },
    {
        title: "Laser Hair Removal",
        location: "Hartbeespoort",
        description: "Permanent IPL hair removal for all areas",
        href: "/laser-hair-removal",
        image: "/images/ipl/ipl-full-leg-hair-removal.jpg",
        color: "from-gold/5 to-foreground/5",
        borderColor: "border-gold/20",
        prices: [
            { name: "Full Face & Neck", price: "R945" },
            { name: "Hollywood IPL", price: "R990" },
            { name: "Full Leg IPL", price: "R2,070" },
            { name: "Under Arm IPL", price: "R495" },
        ],
        priceLink: "/prices/ipl",
    },
];

/* ─── Card Front (reused in both mobile & desktop) ─── */
function CardFront({ service }: { service: typeof featuredServices[0] }) {
    return (
        <div className={`h-full bg-gradient-to-br ${service.color} bg-white border-2 ${service.borderColor} rounded-2xl overflow-hidden shadow-md transition-shadow duration-300`}>
            <div className="relative w-full aspect-[16/10] overflow-hidden">
                <CloudinaryImage
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>
            <div className="p-6 sm:p-7">
                <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-1.5">
                    {service.title}
                </h3>
                <p className="text-sm text-gold font-medium mb-2.5">
                    {service.location}
                </p>
                <p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-4">
                    {service.description}
                </p>
                <div className="flex items-center gap-2 text-gold font-medium text-sm">
                    <span>Learn More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

/* ─── Card Back (desktop flip only) ─── */
function CardBack({ service }: { service: typeof featuredServices[0] }) {
    return (
        <div className="h-full bg-gradient-to-br from-[#1a1a1a] to-[#111] border-2 border-gold/40 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            <div className="px-6 pt-6 pb-4 border-b border-white/10">
                <p className="text-gold text-xs font-bold uppercase tracking-[0.15em] mb-1">Popular Treatments</p>
                <h3 className="font-serif text-xl sm:text-2xl text-white">
                    {service.title}
                </h3>
            </div>
            <div className="flex-1 px-6 py-5 space-y-4">
                {service.prices.map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-3">
                        <span className="text-white/75 text-sm">{item.name}</span>
                        <div className="flex-1 border-b border-dotted border-white/15 min-w-[20px] mx-1" />
                        <span className="text-gold font-semibold text-sm whitespace-nowrap">{item.price}</span>
                    </div>
                ))}
            </div>
            <div className="px-6 pb-6 pt-2 space-y-3">
                <NavLink
                    href={service.priceLink}
                    className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold/90 text-white font-semibold py-3 rounded-full text-sm transition-colors"
                >
                    <span>View All Prices</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </NavLink>
                <NavLink
                    href={service.href}
                    className="flex items-center justify-center gap-2 w-full text-white/70 hover:text-gold font-medium py-2 text-sm transition-colors"
                >
                    <span>Learn More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </NavLink>
            </div>
        </div>
    );
}

export function FeaturedServicesSection() {
    const [isConsultationBookingOpen, setIsConsultationBookingOpen] = useState(false);

    return (
        <>
            <section className="py-20 md:py-28 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-gold font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 block"
                        >
                            Premium Services
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6"
                        >
                            Hartbeespoort&apos;s Leading Beauty &amp; Wellness Destination
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed"
                        >
                            Discover our signature treatments combining medical-grade technology with luxury spa experiences.
                            Serving Hartbeespoort, Pretoria, Centurion, and surrounding areas.
                        </motion.p>
                    </div>

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {featuredServices.map((service, index) => (
                            <motion.div
                                key={service.href}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                {/* ── MOBILE: Simple clickable card (no flip) ── */}
                                <NavLink href={service.href} className="block md:hidden h-full">
                                    <CardFront service={service} />
                                </NavLink>

                                {/* ── DESKTOP: 3D Flip card on hover ── */}
                                <div className="hidden md:block group [perspective:1200px]">
                                    <div
                                        className="relative w-full transition-transform [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                                        style={{ transitionDuration: "600ms" }}
                                    >
                                        {/* Front */}
                                        <div className="relative [backface-visibility:hidden] w-full">
                                            <NavLink href={service.href} className="block">
                                                <CardFront service={service} />
                                            </NavLink>
                                        </div>

                                        {/* Back */}
                                        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full">
                                            <CardBack service={service} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <p className="text-muted-foreground mb-6">
                            Not sure which treatment is right for you?
                        </p>
                        <button
                            onClick={() => setIsConsultationBookingOpen(true)}
                            className="inline-flex items-center gap-2 bg-black hover:bg-gold text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg"
                        >
                            Book Free Consultation
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Consultation Booking Sheet */}
            <BookingSheet
                isOpen={isConsultationBookingOpen}
                onClose={() => setIsConsultationBookingOpen(false)}
                bookingType="consultation"
                consultationContext="General Consultation"
            />
        </>
    );
}
