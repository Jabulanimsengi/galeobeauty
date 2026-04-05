"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";
import { serviceCategories } from "@/lib/services-data";

const categoryCardCopy: Record<
    string,
    {
        cta: string;
    }
> = {
    hair: {
        cta: "Explore Hair",
    },
    "hair-extensions": {
        cta: "Explore Extensions",
    },
    nails: {
        cta: "Explore Nails",
    },
    "lashes-brows": {
        cta: "Explore Lashes",
    },
    dermalogica: {
        cta: "Explore Facials",
    },
    massages: {
        cta: "Explore Massage",
    },
    waxing: {
        cta: "Explore Waxing",
    },
    ipl: {
        cta: "Explore IPL",
    },
    "fat-freezing": {
        cta: "Explore Fat Freezing",
    },
    slimming: {
        cta: "Explore Slimming",
    },
    "hart-aesthetics": {
        cta: "Explore Aesthetics",
    },
    "permanent-makeup": {
        cta: "Explore Permanent Makeup",
    },
    makeup: {
        cta: "Explore Make-up",
    },
    medical: {
        cta: "Explore Medical",
    },
    qms: {
        cta: "Explore QMS",
    },
    sunbed: {
        cta: "Explore Tanning",
    },
};

const categoryCardImages: Partial<Record<string, string>> = {
    dermalogica: "/images/dermalogica/dermalogica-proskin-treatment.jpg",
    makeup: "/images/make-up/professional-glamour-makeup-portfolio.jpg",
};

const HOMEPAGE_CATEGORY_IDS = [
    "dermalogica",
    "makeup",
    "ipl",
    "massages",
    "lashes-brows",
    "waxing",
    "fat-freezing",
    "slimming",
    "hair-extensions",
    "permanent-makeup",
    "nails",
] as const;

function splitHeadline(title: string): string[] {
    const words = title.toUpperCase().split(/\s+/).filter(Boolean);

    if (words.length <= 2) {
        return [words.join(" ")];
    }

    if (words.length === 3) {
        return [words.slice(0, 2).join(" "), words[2]];
    }

    const midpoint = Math.ceil(words.length / 2);
    return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
}

export function HomepageCategoriesSection() {
    const prefersReducedMotion = useReducedMotion();
    const homepageCategories = HOMEPAGE_CATEGORY_IDS
        .map((id) => serviceCategories.find((category) => category.id === id))
        .filter((category): category is (typeof serviceCategories)[number] => Boolean(category));

    return (
        <section className="bg-[#f5eee6] py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
                    className="mb-7 px-2 text-center sm:px-0 lg:mb-10"
                >
                    <h1 className="block font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-black sm:text-[2rem] lg:text-[2.25rem]">
                        Featured Categories
                    </h1>
                </motion.div>

                <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
                    {homepageCategories.map((category, index) => {
                        const copy = categoryCardCopy[category.id] ?? {
                            cta: "Explore Category",
                        };
                        const headlineLines = splitHeadline(category.title);
                        const imageSrc = categoryCardImages[category.id] ?? category.image;
                        const isLastOddCard =
                            homepageCategories.length % 2 === 1 && index === homepageCategories.length - 1;

                        return (
                            <motion.article
                                key={category.id}
                                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: prefersReducedMotion ? 0 : 0.55,
                                    ease: "easeOut",
                                    delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.2),
                                }}
                                className={`group ${isLastOddCard ? "lg:col-span-2 lg:mx-auto lg:w-full lg:max-w-[calc(50%-0.5rem)]" : ""}`}
                            >
                                <NavLink
                                    href={`/prices/${category.id}`}
                                    className="block overflow-hidden bg-[#1a1411] text-white"
                                >
                                    <div className="relative aspect-[5/4] min-h-[16rem] overflow-hidden sm:aspect-[16/11] sm:min-h-[24rem] lg:aspect-[5/4] lg:min-h-[30rem]">
                                        <CloudinaryImage
                                            src={imageSrc}
                                            alt={`${category.title} at Galeo Beauty`}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
                                            noSpinner
                                        />
                                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,5,0.16),rgba(8,6,5,0.36)_42%,rgba(8,6,5,0.62)_100%)]" />
                                        <div className="absolute inset-0 bg-black/18 transition-colors duration-300 group-hover:bg-black/24" />

                                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-10 lg:px-12">
                                            <h3 className="font-sans text-[1.72rem] font-light uppercase leading-[0.94] tracking-[0.03em] text-white sm:text-[3rem] lg:text-[4.2rem] xl:text-[4.8rem]">
                                                {headlineLines.map((line) => (
                                                    <span key={line} className="block">
                                                        {line}
                                                    </span>
                                                ))}
                                            </h3>
                                            <div className="mt-5 sm:mt-8">
                                                <span className="inline-flex items-center justify-center bg-white px-5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#17120f] transition-colors duration-300 group-hover:bg-gold group-hover:text-white sm:px-8 sm:py-3 sm:text-xs sm:tracking-[0.24em]">
                                                    {copy.cta}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
