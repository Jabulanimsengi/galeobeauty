"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";

const featurePanels = [
    {
        title: ["HAIR", "COLOUR", "STYLE"],
        eyebrow: "Signature Finishing",
        description:
            "Cuts, colour, extensions, and polished styling for everyday confidence, events, and full transformation appointments.",
        href: "/hair-salon-in-hartbeespoort",
        cta: "View Hair Services",
        image: "/images/gallery/hair/brunette-curls-hair-styling-blowout-results.jpg",
        alt: "Styled brunette curls after a Galeo Beauty hair appointment",
        alignment: "left" as const,
    },
    {
        title: ["LASH", "BROW", "GLOW"],
        eyebrow: "Beauty Rituals",
        description:
            "Lash artistry, brow shaping, facials, and beauty maintenance treatments that keep the whole look refined.",
        href: "/lash-extensions-in-hartbeespoort",
        cta: "Explore Lash & Brow",
        image: "/images/gallery/lashes-brows/hybrid-lashes-with-defined-eyebrows.png",
        alt: "Defined hybrid lashes and groomed brows at Galeo Beauty",
        alignment: "center" as const,
    },
];

const secondaryLinks = [
    { href: "/facials-in-hartbeespoort", label: "Facials" },
    { href: "/nail-salon-in-hartbeespoort", label: "Nails" },
    { href: "/permanent-makeup-in-hartbeespoort", label: "Permanent Makeup" },
    { href: "/fat-freezing-in-hartbeespoort", label: "Body Treatments" },
];

export function HomepageShowcaseSection() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="bg-[#f4ede4] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-[1500px]">
                <div className="grid gap-4 lg:grid-cols-2">
                    {featurePanels.map((panel, index) => (
                        <motion.article
                            key={panel.href}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut", delay: prefersReducedMotion ? 0 : index * 0.08 }}
                            className="group relative isolate min-h-[28rem] overflow-hidden bg-[#16110e] sm:min-h-[34rem] lg:min-h-[44rem]"
                        >
                            <CloudinaryImage
                                src={panel.image}
                                alt={panel.alt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className={`object-cover transition-transform duration-700 ${panel.alignment === "left" ? "object-left" : "object-center"} group-hover:scale-[1.03]`}
                                noSpinner
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,4,0.12),rgba(7,5,4,0.35)_40%,rgba(7,5,4,0.72)_100%)]" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.14),transparent_24%)] opacity-80" />

                            <div className="relative flex min-h-[28rem] flex-col justify-end px-7 py-8 text-white sm:min-h-[34rem] sm:px-10 sm:py-10 lg:min-h-[44rem] lg:px-14 lg:py-12">
                                <span className="mb-4 block text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/68">
                                    {panel.eyebrow}
                                </span>
                                <h2 className="font-sans text-[2.8rem] font-light uppercase leading-[0.9] tracking-[0.03em] sm:text-[4.15rem] lg:text-[5.6rem]">
                                    {panel.title.map((line) => (
                                        <span key={line} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </h2>
                                <p className="mt-5 max-w-[24rem] text-base leading-7 text-white/74 sm:text-lg sm:leading-8">
                                    {panel.description}
                                </p>
                                <div className="mt-8">
                                    <NavLink
                                        href={panel.href}
                                        className="inline-flex items-center justify-center bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#18120f] transition-colors duration-300 hover:bg-gold hover:text-white sm:text-sm"
                                    >
                                        {panel.cta}
                                    </NavLink>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
                    className="border-x border-b border-[#d9c9b6] bg-[#fbf7f1] px-6 py-5 sm:px-8 lg:px-12"
                >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <p className="max-w-2xl text-sm leading-7 text-foreground/68 sm:text-base">
                            Beyond the headline categories, Galeo Beauty also offers nails, body treatments,
                            facials, waxing, makeup, and advanced aesthetic appointments in Hartbeespoort.
                        </p>
                        <div className="flex flex-wrap gap-x-5 gap-y-3">
                            {secondaryLinks.map((link) => (
                                <NavLink
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/65 transition-colors hover:text-gold sm:text-sm"
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
