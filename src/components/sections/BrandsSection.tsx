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
        <section className="py-16 md:py-20 bg-gradient-to-b from-background to-secondary/30 overflow-hidden">
            {/* Header */}
            <div className="container mx-auto px-6 mb-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase block mb-3">
                        Premium Brands We Trust
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                        Our <span className="text-gold italic">Products</span>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
                        We use only the finest professional-grade products from world-renowned beauty brands.
                    </p>
                </motion.div>
            </div>

            {/* Scrolling Logos */}
            <div className="relative flex overflow-x-hidden group">
                {/* Gradient Masks for smooth fade edges */}
                <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
                <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />

                {/* Infinite Scroll Wrapper */}
                <motion.div
                    className="flex gap-20 items-center whitespace-nowrap py-4"
                    animate={{ x: [0, -1200] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 35,
                    }}
                >
                    {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
                        <div
                            key={`${brand.id}-${index}`}
                            className="relative w-48 h-24 flex items-center justify-center"
                        >
                            <Image
                                src={brand.src}
                                alt={brand.name}
                                width={180}
                                height={90}
                                className={`object-contain w-full h-full ${brand.name === "QMS Medicosmetics" ? "invert" : "grayscale"}`}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

