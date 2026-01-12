"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Shield, Star, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
    return (
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-start overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full bg-black/20">
                    <img
                        src="/images/main_hero_section2.jpeg"
                        alt="Galeo Beauty Spa"
                        className="w-full h-full object-cover object-center md:object-[center_20%]"
                    />
                </div>
                {/* Cinematic Overlay - Darker on left for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/20" /> {/* General dim */}
            </div>

            {/* Main Content - Minimalist Luxury (No Box) */}
            <div className="container relative z-10 px-4 md:px-8">
                <div className="max-w-lg">
                    <motion.div
                        className="relative pt-10 pb-6"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Trust Label */}
                        <motion.div
                            className="inline-flex items-center gap-2 mb-6 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm bg-white/5" // Added minimal backing for label clarity
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="flex h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/90">
                                Premium Medical Landscape
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Science <span className="font-light italic text-white/80">Meets</span> <br />
                            <span className="text-gold shimmer">Beauty</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-base md:text-lg text-white/90 max-w-sm mb-8 leading-relaxed font-light drop-shadow-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Experience the convergence of advanced medical technology and luxury aesthetics.
                            Results-driven treatments tailored to your unique biology.
                        </motion.p>

                        {/* CTA Group */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Button
                                asChild
                                size="default"
                                className="bg-gold hover:bg-gold-dark text-foreground font-semibold text-base h-12 px-8 min-w-[160px] shadow-lg shadow-gold/20"
                            >
                                <Link href="/services">View Treatments</Link>
                            </Button>
                            <Button
                                asChild
                                size="default"
                                variant="outline"
                                className="border-white/30 bg-white/5 text-white hover:bg-white/10 text-base h-12 px-8 backdrop-blur-md"
                            >
                                <Link href="/about">Our Philosophy</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Trust Badges - Absolute Left */}
            <div className="absolute bottom-8 left-8 md:left-12 z-20 hidden lg:flex gap-8">
                {[
                    { icon: Shield, label: "Medical Grade" },
                    { icon: Star, label: "5-Star Rated" }
                ].map((Badge, i) => (
                    <motion.div
                        key={i}
                        className="flex items-center gap-3 text-white/70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + (i * 0.1) }}
                    >
                        <Badge.icon className="w-5 h-5 text-gold" />
                        <span className="text-sm uppercase tracking-wider font-medium">{Badge.label}</span>
                    </motion.div>
                ))}
            </div>


        </section>
    );
}
