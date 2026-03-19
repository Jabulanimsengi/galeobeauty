"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, ChevronRight, ChevronLeft, Quote, ExternalLink } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Lynmari",
        date: "January 2026",
        rating: 5,
        text: "Absolutely amazing! I had my eyebrows done, eyeliner and had tattoo removal done, all at the same time. They were so kind, caring and professional. The lady that attended to me had more than 20 years of experience and it shows.",
        service: "Permanent Makeup",
    },
    {
        id: 2,
        name: "Lelani S.",
        date: "January 2026",
        rating: 5,
        text: "Dandi and Lindsey are my favorites. Thank you Galeo Beauty!",
        service: "Beauty Services",
    },
    {
        id: 3,
        name: "Morgan",
        date: "January 2026",
        rating: 5,
        text: "It was absolutely amazing! I love my eyelashes. Angel lashes again by Dandi.",
        service: "Lash Extensions",
    },
    {
        id: 4,
        name: "Corinne C.",
        date: "January 2026",
        rating: 5,
        text: "Lindzi is very professional. Always a great experience!",
        service: "Beauty Treatment",
    },
    {
        id: 5,
        name: "Tersia",
        date: "January 2026",
        rating: 5,
        text: "Elishia does great nails. Always happy with the results.",
        service: "Nail Services",
    },
    {
        id: 6,
        name: "Mariaan",
        date: "January 2026",
        rating: 5,
        text: "Excellent service! The team really knows what they're doing. Highly recommend Galeo Beauty to everyone.",
        service: "Salon Services",
    },
    {
        id: 7,
        name: "Morgan",
        date: "January 2026",
        rating: 5,
        text: "Awesome experience! The salon is beautiful and the staff are so welcoming. Will definitely be back!",
        service: "Beauty Services",
    },
    {
        id: 8,
        name: "Petunia",
        date: "January 2026",
        rating: 5,
        text: "Very professional, happy with the results. Great attention to detail!",
        service: "Beauty Treatment",
    },
];

const googleReviewUrl = "https://www.google.com/search?q=galeobeauty#lrd=0x1ebe2ad913eb2603:0x4436dd6ff1d06e0c,1";

export function ReviewsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const prefersReducedMotion = useReducedMotion();

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
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
            scrollContainerRef.current.scrollBy({ left: 350, behavior: prefersReducedMotion ? "auto" : "smooth" });
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -350, behavior: prefersReducedMotion ? "auto" : "smooth" });
        }
    };

    return (
        <section className="py-16 md:py-24 bg-rose-50/60">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
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
                        What Clients Say About Galeo Beauty <span className="text-gold">Hartbeespoort</span>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                        Real Galeo Beauty reviews from verified clients at our Harties salon. See why guests book us for hair, nails, beauty, Hart Aesthetics and spa treatments near Hartbeespoort Dam.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                        <div className="rounded-full border border-gold/30 bg-background/80 px-4 py-2 text-sm text-foreground">
                            <span className="font-semibold text-gold">4.9/5</span> average rating
                        </div>
                        <div className="rounded-full border border-gold/30 bg-background/80 px-4 py-2 text-sm text-foreground">
                            <span className="font-semibold text-gold">159+</span> verified reviews
                        </div>
                        <div className="rounded-full border border-gold/30 bg-background/80 px-4 py-2 text-sm text-foreground">
                            Google and Fresha feedback
                        </div>
                    </div>
                </motion.div>

                <div className="relative group">
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex overflow-x-auto pb-6 gap-3 px-4 md:gap-4 md:px-0 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={prefersReducedMotion ? false : { opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                                className="flex-shrink-0 w-[78vw] sm:w-[55vw] md:w-[320px] snap-center md:snap-start"
                            >
                                <div className="relative h-full bg-background rounded-2xl p-5 sm:p-6 shadow-sm border border-border/60 flex flex-col transition-colors duration-300 hover:border-gold/30">
                                    <div className="absolute top-4 right-4 opacity-10">
                                        <Quote className="w-8 h-8 text-gold" />
                                    </div>

                                    <div className="flex gap-0.5 mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                                        ))}
                                    </div>

                                    <p className="text-sm leading-relaxed text-foreground/90 flex-1 mb-5">
                                        &ldquo;{testimonial.text}&rdquo;
                                    </p>

                                    <div className="mb-4">
                                        <span className="inline-flex items-center rounded-full bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                                            {testimonial.service}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2.5 pt-3 border-t border-border/30">
                                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                                            <span className="text-gold font-semibold text-xs">
                                                {testimonial.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground text-xs">{testimonial.name}</p>
                                            <p className="text-muted-foreground text-[10px]">{testimonial.date}</p>
                                        </div>
                                        <div className="ml-auto">
                                            <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
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

                    <button
                        type="button"
                        onClick={scrollLeft}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gold text-background shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gold-light ${canScrollLeft ? "opacity-0 translate-x-[-1rem] group-hover:opacity-100 group-hover:translate-x-[-50%]" : "opacity-0 pointer-events-none scale-0"}`}
                        aria-label="Scroll left"
                        style={{ left: "-24px" }}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        type="button"
                        onClick={scrollRight}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gold text-background shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gold-light ${canScrollRight ? "opacity-0 translate-x-[1rem] group-hover:opacity-100 group-hover:translate-x-[50%]" : "opacity-0 pointer-events-none scale-0"}`}
                        aria-label="Scroll right"
                        style={{ right: "-24px" }}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {canScrollRight && (
                        <div className="md:hidden absolute right-0 top-0 bottom-8 w-16 pointer-events-none flex items-center justify-end">
                            <div className="absolute inset-0 bg-gradient-to-l from-secondary/80 via-secondary/40 to-transparent" />
                            <motion.div
                                initial={{ x: 0 }}
                                animate={prefersReducedMotion ? { x: 0 } : { x: [0, 6, 0] }}
                                transition={{ repeat: prefersReducedMotion ? 0 : Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="relative z-10 mr-2"
                            >
                                <div className="bg-gold/90 rounded-full p-2 shadow-lg">
                                    <ChevronRight className="w-4 h-4 text-white" />
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {canScrollLeft && (
                        <div className="md:hidden absolute left-0 top-0 bottom-8 w-16 pointer-events-none flex items-center justify-start">
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent" />
                            <motion.div
                                initial={{ x: 0 }}
                                animate={prefersReducedMotion ? { x: 0 } : { x: [0, -6, 0] }}
                                transition={{ repeat: prefersReducedMotion ? 0 : Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="relative z-10 ml-2"
                            >
                                <div className="bg-gold/90 rounded-full p-2 shadow-lg">
                                    <ChevronLeft className="w-4 h-4 text-white" />
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>

                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
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
                        <span>See Galeo Beauty reviews on Google</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
