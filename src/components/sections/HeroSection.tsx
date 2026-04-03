"use client";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Floating decorative element - Hidden on mobile for performance
function FloatingShape({ className, delay = 0, reducedMotion = false }: { className?: string; delay?: number; reducedMotion?: boolean }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={reducedMotion ? { opacity: 0.35, scale: 1 } : {
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
                y: [0, -20, 0],
                rotate: [0, 5, 0]
            }}
            transition={{
                duration: reducedMotion ? 0.2 : 6,
                delay,
                repeat: reducedMotion ? 0 : Infinity,
                ease: "easeInOut"
            }}
        />
    );
}

// Ken Burns animation presets - each slide gets a different zoom/pan direction
const kenBurnsVariants = [
    { // Slow zoom in from center
        initial: { scale: 1, x: "0%", y: "0%" },
        animate: { scale: 1.15, x: "0%", y: "0%" },
    },
    { // Zoom in + pan right
        initial: { scale: 1.05, x: "-2%", y: "0%" },
        animate: { scale: 1.2, x: "2%", y: "-1%" },
    },
    { // Zoom in + pan left
        initial: { scale: 1.05, x: "2%", y: "1%" },
        animate: { scale: 1.18, x: "-2%", y: "0%" },
    },
    { // Slow zoom out from slight zoom
        initial: { scale: 1.2, x: "0%", y: "-1%" },
        animate: { scale: 1.05, x: "0%", y: "1%" },
    },
];

const heroImages = [
    { src: "/images/interior/galeo-beauty-interior-p1.jpg", alt: "Galeo Beauty Salon Hartbeespoort luxury interior - Reception and Waiting Area" },
    { src: "/images/interior/galeo-beauty-interior-p2.jpg", alt: "Galeo Beauty Salon Hartbeespoort luxury interior - Treatment Rooms" },
    { src: "/images/interior/galeo-beauty-interior-p3.jpg", alt: "Galeo Beauty Salon Hartbeespoort luxury interior - Nail station near Hartbeespoort Dam" },
    { src: "/images/interior/galeo-beauty-interior-p4.jpg", alt: "Galeo Beauty Salon Hartbeespoort luxury interior - Spa Lounge" },
];

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const prefersReducedMotion = !!useReducedMotion();

    useEffect(() => {
        if (typeof window === "undefined") return;

        heroImages.slice(1).forEach(({ src }) => {
            const image = new window.Image();
            image.decoding = "async";
            image.src = src;
        });
    }, []);

    // Auto-slide effect - changes image every 5 seconds
    useEffect(() => {
        if (prefersReducedMotion) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [prefersReducedMotion]);

    return (
        <section className="sticky top-0 z-0 min-h-[100svh] overflow-hidden sm:h-[90dvh] lg:h-[100vh]">

            {/* Ken Burns Image Carousel */}
            <div className="absolute inset-0 w-full h-full" style={{ transform: 'translateZ(0)' }}>
                <div className="absolute inset-0 bg-stone-950" />
                {heroImages.map((image, index) => {
                    const isActive = index === currentSlide;
                    const kenBurnsVariant = kenBurnsVariants[index % kenBurnsVariants.length];

                    return (
                        <motion.div
                            key={image.src}
                            className="absolute inset-0 w-full h-full z-10"
                            initial={false}
                            animate={{ opacity: isActive ? 1 : 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: "easeInOut" }}
                            aria-hidden={!isActive}
                        >
                            <motion.div
                                className="absolute inset-0 w-full h-full"
                                initial={false}
                                animate={
                                    prefersReducedMotion
                                        ? { scale: 1.05, x: "0%", y: "0%" }
                                        : isActive
                                            ? kenBurnsVariant.animate
                                            : kenBurnsVariant.initial
                                }
                                transition={{
                                    duration: prefersReducedMotion ? 0 : isActive ? 6 : 0.6,
                                    ease: prefersReducedMotion ? "linear" : isActive ? "linear" : "easeOut"
                                }}
                                style={{ willChange: "transform" }}
                            >
                                <CloudinaryImage
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 100vw"
                                    className="object-cover object-center filter-none grayscale-0 saturate-100"
                                    style={{ filter: "none" }}
                                    priority={index === 0}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    fetchPriority={index === 0 ? "high" : "auto"}
                                    noSpinner
                                />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Dark overlay for text contrast - All devices */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/50 sm:to-black/30 z-20" />

            {/* Floating Decorative Elements - Desktop only */}
            <FloatingShape
                className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 blur-2xl z-20 hidden xl:block"
                delay={0}
                reducedMotion={prefersReducedMotion}
            />
            <FloatingShape
                className="absolute bottom-40 left-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-gold/15 to-transparent blur-xl z-20 hidden xl:block"
                delay={1.5}
                reducedMotion={prefersReducedMotion}
            />

            <motion.div
                className="absolute bottom-20 left-6 z-40 hidden sm:block sm:bottom-24 sm:left-10 lg:bottom-28 lg:left-16 xl:left-24"
                initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.3 }}
            >
                <NavLink
                    href="/prices"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors duration-300 hover:bg-gold hover:text-white"
                >
                    Book Now
                </NavLink>
            </motion.div>

            <motion.button
                type="button"
                aria-label="Scroll to next section"
                className="absolute bottom-24 left-1/2 z-40 flex h-14 w-8 -translate-x-1/2 rounded-full border-2 border-white/80 bg-white/5 backdrop-blur-[1px] sm:bottom-12"
                initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.3 }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: prefersReducedMotion ? "auto" : "smooth" })}
            >
                <motion.span
                    className="absolute left-1/2 top-1.5 block h-3 w-3 -translate-x-1/2 rounded-full bg-white/90"
                    animate={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: [0, 28, 0], opacity: [1, 0.65, 1] }}
                    transition={{ duration: 1.6, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
                />
            </motion.button>
        </section>
    );
}

