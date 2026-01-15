"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
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
                    const increment = target / (duration * 60);
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
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// Floating decorative element
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

// Text animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const wordVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        filter: "blur(10px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    }
};

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
};

export function HeroSection() {
    const [imageHovered, setImageHovered] = useState(false);

    return (
        <section className="relative min-h-[90vh] lg:h-screen flex flex-col lg:flex-row overflow-hidden">

            {/* Floating Decorative Elements */}
            <FloatingShape
                className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 blur-2xl z-0 hidden lg:block"
                delay={0}
            />
            <FloatingShape
                className="absolute bottom-40 left-[30%] w-24 h-24 rounded-full bg-gradient-to-br from-gold/15 to-transparent blur-xl z-0 hidden lg:block"
                delay={1.5}
            />
            <FloatingShape
                className="absolute top-[40%] right-[45%] w-16 h-16 rounded-full bg-gradient-to-br from-gold/25 to-gold/10 blur-lg z-0 hidden lg:block"
                delay={3}
            />

            {/* Left Column: Content */}
            <div className="w-full lg:w-[45%] xl:w-[40%] bg-[#FAFAFA] text-foreground flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-0 relative z-10 order-2 lg:order-1">
                <div className="max-w-xl">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Trust Label */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="inline-flex items-center gap-2 mb-8 bg-white border border-black/5 rounded-full px-4 py-1.5 shadow-sm backdrop-blur-sm"
                        >
                            <motion.span
                                className="flex h-2 w-2 rounded-full bg-gold"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">
                                Premium Beauty & Wellness
                            </span>
                        </motion.div>

                        {/* Headline with Staggered Animation */}
                        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-foreground mb-8">
                            <motion.span variants={wordVariants} className="inline-block">Science </motion.span>
                            <motion.span
                                variants={wordVariants}
                                className="inline-block font-light italic text-foreground/60"
                            >
                                Meets
                            </motion.span>
                            <br />
                            <motion.span
                                variants={wordVariants}
                                className="inline-block text-gold relative"
                            >
                                Beauty.
                                <motion.span
                                    className="absolute -top-1 -right-6"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                >
                                    <Sparkles className="w-5 h-5 text-gold/60" />
                                </motion.span>
                            </motion.span>
                        </h1>

                        {/* Description */}
                        <motion.p
                            variants={fadeUpVariants}
                            className="text-lg text-foreground/70 leading-relaxed mb-10 font-light max-w-sm"
                        >
                            Experience the convergence of advanced medical technology and luxury aesthetics.
                            Results-driven treatments tailored to your unique biology.
                        </motion.p>

                        {/* CTA Group - Dual Buttons */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="flex flex-col sm:flex-row gap-4 mb-12"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="group bg-[#1A1A1A] hover:bg-black text-white transition-all duration-300 rounded-full px-10 h-14 font-medium text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
                            >
                                <Link href="/prices">
                                    <span className="relative z-10 group-hover:text-gold transition-colors duration-300">
                                        View Treatments
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="group border-2 border-foreground/20 hover:border-gold bg-transparent hover:bg-gold/5 text-foreground transition-all duration-300 rounded-full px-8 h-14 font-medium text-base hover:-translate-y-1"
                            >
                                <Link href="/specials">
                                    <span className="group-hover:text-gold transition-colors duration-300">
                                        View Specials
                                    </span>
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Enhanced Trust Badges with Animated Counters */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="flex flex-wrap items-center gap-6 lg:gap-8 pt-8 border-t border-black/5"
                        >
                            <div className="flex items-center gap-3 group">
                                <div className="p-2.5 bg-white rounded-full shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <Award className="w-4 h-4 text-gold" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-foreground">
                                        <AnimatedCounter target={500} suffix="+" />
                                    </span>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/50">
                                        Happy Clients
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 group">
                                <div className="p-2.5 bg-white rounded-full shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <Star className="w-4 h-4 text-gold fill-gold" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-foreground">5.0</span>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/50">
                                        Star Rating
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 group">
                                <div className="p-2.5 bg-white rounded-full shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <Shield className="w-4 h-4 text-gold" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-foreground">
                                        <AnimatedCounter target={10} suffix="+" />
                                    </span>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/50">
                                        Years Expertise
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Right Column: Image with Hover Effect */}
            <motion.div
                className="w-full lg:w-[55%] xl:w-[60%] relative min-h-[40vh] lg:min-h-screen order-1 lg:order-2 cursor-pointer overflow-hidden"
                onHoverStart={() => setImageHovered(true)}
                onHoverEnd={() => setImageHovered(false)}
            >
                {/* Warm golden overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-black/20 z-10"
                    animate={{ opacity: imageHovered ? 0.8 : 1 }}
                    transition={{ duration: 0.4 }}
                />

                <motion.img
                    src="/images/main_hero_section2.jpeg"
                    alt="Galeo Beauty Spa"
                    className="w-full h-full object-cover object-center lg:object-[center_20%]"
                    animate={{
                        scale: imageHovered ? 1.05 : 1,
                        filter: imageHovered ? "brightness(1.05)" : "brightness(1)"
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Floating CTA on hover */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imageHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Button
                        asChild
                        size="lg"
                        className="bg-white/95 hover:bg-white text-foreground hover:text-gold shadow-2xl rounded-full px-8 h-14 font-medium backdrop-blur-sm"
                    >
                        <Link href="/booking">Book Now</Link>
                    </Button>
                </motion.div>

                {/* Gradient fade on mobile */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FAFAFA] to-transparent lg:hidden z-20" />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden lg:flex flex-col items-center gap-2 cursor-pointer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                    Discover More
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-5 h-5 text-gold" />
                </motion.div>
            </motion.div>

        </section>
    );
}
