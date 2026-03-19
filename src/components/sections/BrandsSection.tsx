"use client";

import { motion } from "framer-motion";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

// Real brand logos from public/images/brands
const brands = [
    { name: "Dermalogica", src: "/images/brands/dermalogica.png", id: 1, alt: "Dermalogica professional skincare products used at Galeo Beauty Hartbeespoort" },
    { name: "QMS Medicosmetics", src: "/images/brands/qms.png", id: 2, alt: "QMS Medicosmetics medical-grade skincare at Galeo Beauty salon Harties" },
    { name: "Moroccanoil", src: "/images/brands/moroccanoil.png", id: 3, alt: "Moroccanoil hair care products at Galeo Beauty Hartbeespoort" },
    { name: "Milkshake", src: "/images/brands/milkshake.png", id: 4, alt: "Milkshake hair products at Galeo Beauty salon near Hartbeespoort Dam" },
    { name: "Lola Lee", src: "/images/brands/lola-lee.png", id: 5, alt: "Lola Lee nail products at Galeo Beauty Hartbeespoort" },
];

export const BrandsSection = () => {
    return (
        <section className="overflow-hidden bg-gradient-to-b from-stone-100/60 to-stone-50/50 py-10 md:py-16">
            {/* Header */}
            <div className="container mx-auto mb-8 px-4 text-center sm:px-6 md:mb-12">
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
                        Premium Brands at Our <span className="text-gold italic">Hartbeespoort Salon</span>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
                        We use only the finest professional-grade products from world-renowned beauty brands at Galeo Beauty in Harties.
                    </p>
                </motion.div>
            </div>

            {/* Scrolling Logos */}
            <div className="group relative flex overflow-x-hidden">
                {/* Gradient Masks for smooth fade edges */}
                <div className="absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
                <div className="absolute top-0 bottom-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

                {/* Infinite Scroll Wrapper */}
                <motion.div
                    className="flex items-center gap-12 whitespace-nowrap py-4 sm:gap-20"
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
                            className="relative flex h-14 w-28 items-center justify-center md:h-24 md:w-48"
                        >
                            <CloudinaryImage
                                src={brand.src}
                                alt={brand.alt}
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

