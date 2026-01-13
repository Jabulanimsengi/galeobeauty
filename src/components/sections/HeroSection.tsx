"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Shield, Star, Calendar, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] lg:h-screen flex flex-col lg:flex-row overflow-hidden">

            {/* Left Column: Content */}
            <div className="w-full lg:w-[45%] xl:w-[40%] bg-[#FAFAFA] text-foreground flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-0 relative z-10 order-2 lg:order-1">
                <div className="max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Trust Label */}
                        <div className="inline-flex items-center gap-2 mb-8 bg-white border border-black/5 rounded-full px-4 py-1.5 shadow-sm">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">
                                Premium Medical Landscape
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-foreground mb-8">
                            Science <span className="font-light italic text-foreground/60">Meets</span> <br />
                            <span className="text-gold">Beauty.</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-foreground/70 leading-relaxed mb-10 font-light max-w-sm">
                            Experience the convergence of advanced medical technology and luxury aesthetics.
                            Results-driven treatments tailored to your unique biology.
                        </p>

                        {/* CTA Group */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Button
                                asChild
                                size="lg"
                                className="bg-[#1A1A1A] hover:bg-black text-white hover:text-gold transition-colors duration-300 rounded-full px-10 h-14 font-medium text-base shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                <Link href="/services">View Treatments</Link>
                            </Button>
                        </div>

                        {/* Trust Badges - Integrated cleanly */}
                        <div className="flex items-center gap-8 pt-8 border-t border-black/5">
                            {[
                                { icon: Shield, label: "Medical Grade" },
                                { icon: Star, label: "5-Star Rated" }
                            ].map((Badge, i) => (
                                <div key={i} className="flex items-center gap-3 text-foreground/60">
                                    <div className="p-2 bg-white rounded-full shadow-sm">
                                        <Badge.icon className="w-4 h-4 text-gold" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider">{Badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Column: Image */}
            <div className="w-full lg:w-[55%] xl:w-[60%] relative min-h-[40vh] lg:min-h-screen order-1 lg:order-2">
                <div className="absolute inset-0 bg-black/5 z-10" /> {/* Slight dim for image depth */}
                <img
                    src="/images/main_hero_section2.jpeg"
                    alt="Galeo Beauty Spa"
                    className="w-full h-full object-cover object-center lg:object-[center_20%]"
                />

                {/* Optional: Subtle gradient fade on mobile only to blend with white content */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FAFAFA] to-transparent lg:hidden z-20" />
            </div>

        </section>
    );
}
