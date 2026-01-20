"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, ChevronLeft, Quote, ExternalLink } from "lucide-react";

// Text-based testimonials data
const testimonials = [
    {
        id: 1,
        name: "Mariska V.",
        date: "2 months ago",
        rating: 5,
        text: "Absolutely love Galeo Beauty! The staff is incredibly friendly and professional. My skin has never looked better after their facials. Highly recommend!",
    },
    {
        id: 2,
        name: "Anelisa M.",
        date: "1 month ago",
        rating: 5,
        text: "Best beauty salon in Hartbeespoort! I've been coming here for years and the quality is always consistent. The IPL treatments are amazing!",
    },
    {
        id: 3,
        name: "Chantel P.",
        date: "3 weeks ago",
        rating: 5,
        text: "Had the most relaxing experience! The attention to detail and care they put into every treatment is unmatched. Will definitely be back!",
    },
    {
        id: 4,
        name: "Sarah L.",
        date: "2 weeks ago",
        rating: 5,
        text: "Finally found my go-to salon! The team really knows what they're doing. My lashes have never looked this good. Thank you Galeo Beauty!",
    },
    {
        id: 5,
        name: "Tanya B.",
        date: "1 week ago",
        rating: 5,
        text: "Professional service from start to finish. The salon is beautiful and clean. I always leave feeling pampered and refreshed. 10/10!",
    },
];

const googleReviewUrl = "https://www.google.com/search?q=galeobeauty#lrd=0x1ebe2ad913eb2603:0x4436dd6ff1d06e0c,1";

export function ReviewsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            // Only show left arrow after scrolling past ~half a card width (50px threshold)
            setCanScrollLeft(scrollLeft > 50);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
        }
    };

    return (
        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold fill-gold" />
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold fill-gold" />
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold fill-gold" />
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold fill-gold" />
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold fill-gold" />
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                        Client <span className="text-gold">Love</span>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. See what our clients are saying about their Galeo Beauty experience.
                    </p>
                </motion.div>

                <div className="relative group">
                    {/* Horizontal Scroll Container */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex overflow-x-auto pb-8 gap-4 px-4 md:gap-6 md:px-0 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[380px] snap-center md:snap-start"
                            >
                                <div className="relative h-full bg-background rounded-2xl p-6 sm:p-8 shadow-lg border border-border/50 flex flex-col">
                                    {/* Quote Icon */}
                                    <div className="absolute top-4 right-4 opacity-10">
                                        <Quote className="w-12 h-12 text-gold" />
                                    </div>

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                                        ))}
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-foreground/90 text-sm sm:text-base leading-relaxed flex-1 mb-6">
                                        &ldquo;{testimonial.text}&rdquo;
                                    </p>

                                    {/* Reviewer Info */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                                            <span className="text-gold font-semibold text-sm">
                                                {testimonial.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                                            <p className="text-muted-foreground text-xs">{testimonial.date}</p>
                                        </div>
                                        {/* Google Icon */}
                                        <div className="ml-auto">
                                            <svg className="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Golden Scroll Arrows - Desktop */}
                    <button
                        onClick={scrollLeft}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gold text-background shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gold-light ${canScrollLeft ? "opacity-0 translate-x-[-1rem] group-hover:opacity-100 group-hover:translate-x-[-50%]" : "opacity-0 pointer-events-none scale-0"}`}
                        aria-label="Scroll left"
                        style={{ left: '-24px' }}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={scrollRight}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gold text-background shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gold-light ${canScrollRight ? "opacity-0 translate-x-[1rem] group-hover:opacity-100 group-hover:translate-x-[50%]" : "opacity-0 pointer-events-none scale-0"}`}
                        aria-label="Scroll right"
                        style={{ right: '-24px' }}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Mobile Scroll Indicator - Right (visible when can scroll right) */}
                    {canScrollRight && (
                        <div className="md:hidden absolute right-0 top-0 bottom-8 w-16 pointer-events-none flex items-center justify-end">
                            {/* Gradient fade */}
                            <div className="absolute inset-0 bg-gradient-to-l from-secondary/80 via-secondary/40 to-transparent" />
                            {/* Animated arrow */}
                            <motion.div
                                initial={{ x: 0 }}
                                animate={{ x: [0, 6, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="relative z-10 mr-2"
                            >
                                <div className="bg-gold/90 rounded-full p-2 shadow-lg">
                                    <ChevronRight className="w-4 h-4 text-white" />
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Mobile Scroll Indicator - Left (visible when can scroll left) */}
                    {canScrollLeft && (
                        <div className="md:hidden absolute left-0 top-0 bottom-8 w-16 pointer-events-none flex items-center justify-start">
                            {/* Gradient fade */}
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent" />
                            {/* Animated arrow */}
                            <motion.div
                                initial={{ x: 0 }}
                                animate={{ x: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="relative z-10 ml-2"
                            >
                                <div className="bg-gold/90 rounded-full p-2 shadow-lg">
                                    <ChevronLeft className="w-4 h-4 text-white" />
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Google Reviews CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <a
                        href={googleReviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors font-medium"
                    >
                        <span>See all reviews on Google</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

