"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";

const reviews = [
    "/images/reviews/google_review01.png",
    "/images/reviews/google_reviews02.png",
    "/images/reviews/google_reviews03.png",
    "/images/reviews/google_reviews04.png",
    "/images/reviews/google_reviews05.png",
    "/images/reviews/google_reviews06.png",
];

export function ReviewsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
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
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    return (
        <section className="py-16 md:py-24 bg-background">
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
                        {reviews.map((src, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-shrink-0 w-[70vw] sm:w-[55vw] md:w-[400px] snap-center md:snap-start"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-white">
                                    <Image
                                        src={src}
                                        alt={`Galeo Beauty Review ${index + 1}`}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto object-contain"
                                        sizes="(max-width: 640px) 70vw, (max-width: 768px) 55vw, 400px"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>



                    {/* Golden Scroll Arrows */}
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
                </div>
            </div>
        </section>
    );
}
