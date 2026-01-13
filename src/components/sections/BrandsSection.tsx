"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Real brand logos from public/images/brands
const brands = [
    { name: "Dermalogica", src: "/images/brands/dermalogica.png", id: 1 },
    { name: "QMS Medicosmetics", src: "/images/brands/qms.png", id: 2 },
    { name: "Moroccanoil", src: "/images/brands/moroccanoil.png", id: 3 },
    { name: "Milkshake", src: "/images/brands/milkshake.png", id: 4 },
    { name: "Lola Lee", src: "/images/brands/lola-lee.png", id: 5 },
];

export const BrandsSection = () => {
    return (
        <section className="py-12 bg-secondary/20 border-y border-border/40 overflow-hidden">
            <div className="container mx-auto px-6 mb-8 text-center">
                <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase">
                    Trusted Partners
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Gradient Masks for smooth fade edges */}
                <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-background/50 to-transparent" />
                <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-background/50 to-transparent" />

                {/* Infinite Scroll Wrapper - Duplicated content for seamless loop */}
                <motion.div
                    className="flex gap-16 items-center whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // Slow, elegant speed
                    }}
                >
                    {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
                        <div
                            key={`${brand.id}-${index}`}
                            className="relative w-56 h-28 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default"
                        >
                            <Image
                                src={brand.src}
                                alt={brand.name}
                                width={200}
                                height={100}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
