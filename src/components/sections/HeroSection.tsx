"use client";

import { motion } from "framer-motion";
import { NavLink } from "@/components/ui/nav-link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Shield, Star, Sparkles, Award } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Animated counter component
function AnimatedCounter({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const increment = target / (duration * 60); // 60fps animation
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 1000 / 60);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// Floating decorative element - Hidden on mobile for performance
function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
                y: [0, -20, 0],
                rotate: [0, 5, 0]
            }}
            transition={{
                duration: 6,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
}

// Text animation variants - Simplified for mobile performance
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const wordVariants = {
    hidden: {
        opacity: 0,
        y: 15
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    }
};

const fadeUpVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
};

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Array of hero images
    const heroImages = [
        "/images/main_hero_section2.jpeg",
        "/images/main_hero_section03.png",
        "/images/main_hero_section04.png",
        "/images/main_hero_section05.png",
        "/images/main_hero_section06.png",
        "/images/main_hero_section07.png",
    ];

    // Auto-slide effect - changes image every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [heroImages.length]);

    return (
        <section className="relative h-[80vh] sm:h-[90vh] lg:h-screen overflow-hidden">

            {/* Image carousel - Full Width Background */}
            <div className="absolute inset-0 w-full h-full" style={{ transform: 'translateZ(0)' }}>
                {heroImages.map((image, index) => (
                    <img
                        key={image}
                        src={image}
                        alt={`Galeo Beauty Spa ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
                        style={{
                            opacity: currentSlide === index ? 1 : 0,
                            willChange: 'opacity',
                            transform: 'translateZ(0)',
                        }}
                    />
                ))}
            </div>

            {/* Dark overlay for text contrast - All devices */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/50 sm:to-black/30 z-10" />

            {/* Floating Decorative Elements - Desktop only */}
            <FloatingShape
                className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 blur-2xl z-20 hidden xl:block"
                delay={0}
            />
            <FloatingShape
                className="absolute bottom-40 left-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-gold/15 to-transparent blur-xl z-20 hidden xl:block"
                delay={1.5}
            />

            {/* Content Overlay - All Devices */}
            <div className="relative z-30 w-full h-full flex flex-col justify-center px-5 sm:px-12 lg:px-16 xl:px-24 py-16 sm:py-12 lg:py-12">
                <div className="max-w-3xl">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Trust Label */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-6 lg:mb-8 bg-white/10 border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-1.5 shadow-lg backdrop-blur-md"
                        >
                            <motion.span
                                className="flex h-2 w-2 rounded-full bg-gold"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white/90">
                                Premium Beauty & Wellness
                            </span>
                        </motion.div>

                        {/* Headline with Staggered Animation */}
                        <h1 className="font-serif text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.1] text-white mb-4 sm:mb-6 lg:mb-8">
                            <motion.span variants={wordVariants} className="inline-block drop-shadow-lg">Science </motion.span>
                            <motion.span
                                variants={wordVariants}
                                className="inline-block font-light italic text-white/80 drop-shadow-lg"
                            >
                                Meets
                            </motion.span>
                            <br />
                            <motion.span
                                variants={wordVariants}
                                className="inline-block text-gold relative drop-shadow-lg"
                            >
                                Beauty.
                                <motion.span
                                    className="absolute -top-1 -right-5 sm:-top-1 sm:-right-6"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                >
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                                </motion.span>
                            </motion.span>
                        </h1>

                        {/* Description - shorter on mobile, full on larger screens */}
                        <motion.p
                            variants={fadeUpVariants}
                            className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/85 leading-relaxed mb-5 sm:mb-8 lg:mb-10 font-light max-w-2xl drop-shadow-md"
                        >
                            <span className="sm:hidden">Advanced medical technology meets luxury aesthetics.</span>
                            <span className="hidden sm:inline">Experience the convergence of advanced medical technology and luxury aesthetics. Results-driven treatments tailored to your unique biology.</span>
                        </motion.p>

                        {/* CTA Group - Hidden on mobile */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="hidden sm:flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-5 sm:mb-8 lg:mb-12"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="group bg-black hover:bg-black/80 text-white transition-all duration-300 rounded-full px-6 sm:px-10 h-11 sm:h-14 font-medium text-sm sm:text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden border border-white/20"
                            >
                                <NavLink href="/prices">
                                    <span className="relative z-10 font-semibold">
                                        View Treatments
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                </NavLink>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                className="group bg-white hover:bg-white/90 text-black transition-all duration-300 rounded-full px-6 sm:px-8 h-11 sm:h-14 font-medium text-sm sm:text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 border-2 border-black/10"
                            >
                                <NavLink href="/specials">
                                    <span className="group-hover:text-gold transition-colors duration-300 font-semibold">
                                        View Specials
                                    </span>
                                </NavLink>
                            </Button>
                        </motion.div>

                        {/* Enhanced Trust Badges with Animated Counters */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="flex flex-wrap items-center gap-5 sm:gap-6 lg:gap-8 pt-4 sm:pt-6 border-t border-white/20"
                        >
                            <div className="flex items-center gap-2.5 sm:gap-3 group">
                                <div className="p-2.5 sm:p-2.5 bg-black/80 rounded-full shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border border-white/10">
                                    <Award className="w-4 h-4 sm:w-4 sm:h-4 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl sm:text-xl font-bold text-white drop-shadow-md">
                                        <AnimatedCounter target={500} suffix="+" />
                                    </span>
                                    <span className="text-[10px] sm:text-[10px] font-medium uppercase tracking-wider text-white/70">
                                        Happy Clients
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 sm:gap-3 group">
                                <div className="p-2.5 sm:p-2.5 bg-black/80 rounded-full shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border border-white/10">
                                    <Star className="w-4 h-4 sm:w-4 sm:h-4 text-white fill-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl sm:text-xl font-bold text-white drop-shadow-md">5.0</span>
                                    <span className="text-[10px] sm:text-[10px] font-medium uppercase tracking-wider text-white/70">
                                        Star Rating
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Carousel Navigation Dots - Centered */}
            <div className="absolute bottom-32 sm:bottom-36 lg:bottom-40 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full shadow-lg ${currentSlide === index
                            ? "w-6 sm:w-8 h-2 bg-gold"
                            : "w-2 h-2 bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            {/* Scroll Indicator - Desktop & Tablet Only */}
            <motion.div
                className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex-col items-center gap-2 cursor-pointer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 drop-shadow-md">
                    Discover More
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-5 h-5 text-gold drop-shadow-lg" />
                </motion.div>
            </motion.div>

        </section>
    );
}
