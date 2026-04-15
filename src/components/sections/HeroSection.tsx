"use client";

import { motion, useReducedMotion } from "framer-motion";

import { TrackedWhatsAppLink } from "@/components/tracking/TrackedWhatsAppLink";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";

const spotlightLinks = [
    { href: "/prices/hair", label: "Hair & Colour" },
    { href: "/prices/lashes-brows", label: "Lashes & Brows" },
    { href: "/prices/dermalogica", label: "Facials & Skin" },
];

export function HeroSection() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#15110f] text-white">
            <div className="absolute inset-0">
                <motion.div
                    initial={prefersReducedMotion ? false : { scale: 1.06, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: "easeOut" }}
                    className="absolute inset-0 origin-center"
                >
                    <CloudinaryImage
                        src="/images/interior/galeo-beauty-interior-p1.jpg"
                        alt="Galeo Beauty salon interior in Hartbeespoort"
                        fill
                        priority
                        fetchPriority="high"
                        sizes="100vw"
                        className="object-cover"
                        style={{ objectPosition: "50% 50%" }}
                        noSpinner
                    />
                </motion.div>
                <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(9,7,6,0.84)_12%,rgba(9,7,6,0.48)_46%,rgba(9,7,6,0.24)_72%,rgba(9,7,6,0.62)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(217,180,120,0.16),transparent_26%),radial-gradient(circle_at_18%_82%,rgba(255,255,255,0.08),transparent_22%)]" />
            </div>

            <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-5 pb-5 pt-20 sm:px-8 sm:pb-10 sm:pt-32 lg:px-12 lg:pb-12 lg:pt-36">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)] lg:items-end">
                    <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut" }}
                        className="mx-auto max-w-3xl text-center sm:mx-0 sm:text-left"
                    >
                        <p className="font-serif text-[2.35rem] leading-none tracking-[-0.06em] text-white sm:text-[4.4rem] lg:text-[6.1rem] xl:text-[7rem]">
                            Galeo Beauty
                        </p>
                        <h1 className="mx-auto mt-3 max-w-[10ch] font-sans text-[1.8rem] font-light uppercase leading-[0.94] tracking-[0.03em] text-white sm:mx-0 sm:text-[3.4rem] sm:tracking-[0.04em] lg:text-[4.6rem]">
                            Hair, Skin, Lashes, Nails.
                        </h1>
                        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="w-full rounded-none bg-white px-8 text-xs font-semibold uppercase tracking-[0.24em] text-[#17120f] transition-colors hover:bg-gold hover:text-white sm:w-auto sm:text-sm"
                            >
                                <TrackedWhatsAppLink
                                    message="Hi, I found you on www.galeobeauty.com and would like to book or enquire about your services."
                                    trackingContext="homepage_hero_whatsapp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Book Appointment
                                </TrackedWhatsAppLink>
                            </Button>

                            <NavLink
                                href="/prices"
                                className="inline-flex w-full items-center justify-center border border-white/25 px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto sm:text-sm"
                            >
                                Explore Services
                            </NavLink>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.2 }}
                    className="mt-8 border-t border-white/12 pt-4 sm:mt-12 sm:pt-5"
                >
                    <div className="flex flex-wrap gap-x-3 gap-y-2 sm:justify-end sm:gap-x-6 sm:gap-y-3">
                        {spotlightLinks.map((link) => (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                className="text-[0.68rem] uppercase tracking-[0.15em] text-white/76 transition-colors hover:text-white sm:text-sm sm:tracking-[0.22em]"
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
