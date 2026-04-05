"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

const brandLogos = [
    { src: "/images/brands/dermalogica.png", alt: "Dermalogica" },
    { src: "/images/brands/qms.png", alt: "QMS" },
    { src: "/images/brands/moroccanoil.png", alt: "Moroccanoil" },
    { src: "/images/brands/milkshake.png", alt: "Milk Shake" },
    { src: "/images/brands/lola-lee.png", alt: "Lola Lee" },
];

function LogoTrack({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
    const logos = [...brandLogos, ...brandLogos];

    return (
        <motion.div
            className="flex w-max items-center gap-12 sm:gap-16 lg:gap-20"
            animate={prefersReducedMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
            transition={
                prefersReducedMotion
                    ? undefined
                    : { duration: 22, repeat: Infinity, ease: "linear", repeatType: "loop" }
            }
        >
            {logos.map((logo, index) => (
                <div
                    key={`${logo.src}-${index}`}
                    className="relative h-8 w-[7rem] shrink-0 sm:h-10 sm:w-[8.5rem] lg:h-12 lg:w-[10rem]"
                    aria-hidden={index >= brandLogos.length}
                >
                    <CloudinaryImage
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        sizes="160px"
                        className="object-contain brightness-0 invert opacity-90"
                        noSpinner
                    />
                </div>
            ))}
        </motion.div>
    );
}

export function HomepageBrandsMarqueeSection() {
    const prefersReducedMotion = !!useReducedMotion();

    return (
        <section className="overflow-hidden bg-black py-6 sm:py-7">
            <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black to-transparent sm:w-16" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black to-transparent sm:w-16" />
                    <LogoTrack prefersReducedMotion={prefersReducedMotion} />
                </div>
            </div>
        </section>
    );
}
