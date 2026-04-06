"use client";

import { motion, useReducedMotion } from "framer-motion";
import { businessInfo } from "@/lib/constants";

type Testimonial = {
    id: number;
    name: string;
    date: string;
    text: string;
    service: string;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Belinda",
        date: "January 2026",
        text: "I had the most amazing experience. Everyone was friendly, gentle, and gave the right recommendations to keep my hair healthy and beautiful.",
        service: "Hair Styling",
    },
    {
        id: 2,
        name: "Chantelle B",
        date: "March 2026",
        text: "Best service, quality and price in Harties.",
        service: "Beauty Services",
    },
    {
        id: 3,
        name: "Yvonne",
        date: "February 2026",
        text: "Top notch. Definitely recommend Dandi a 100%.",
        service: "Lash Extensions",
    },
    {
        id: 4,
        name: "Lesego M",
        date: "March 2026",
        text: "Always a pleasure, always getting out more than expected.",
        service: "Salon Services",
    },
    {
        id: 5,
        name: "Charlene",
        date: "February 2026",
        text: "Lovely and excellent work.",
        service: "Nail Services",
    },
    {
        id: 6,
        name: "Emelia F",
        date: "March 2026",
        text: "My experience at Galeo was perfect. Staff were friendly and helpful, my nails looked amazing, and the massage was relaxing and comfortable.",
        service: "Nails & Massage",
    },
    {
        id: 7,
        name: "Hailey",
        date: "March 2026",
        text: "They were organized and attentive the whole time. My hair and nails look absolutely amazing and I am officially hooked.",
        service: "Hair & Nails",
    },
    {
        id: 8,
        name: "Mandie",
        date: "February 2026",
        text: "Maria was quick, professional and experienced. The salon was clean, welcoming, and very high standard.",
        service: "Nail Services",
    },
    {
        id: 9,
        name: "Meredith K",
        date: "March 2026",
        text: "Dandi is the best honestly.",
        service: "Lash Extensions",
    },
    {
        id: 10,
        name: "Rona",
        date: "March 2026",
        text: "Maria is always very professional. Her work is very precise.",
        service: "Nail Services",
    },
    {
        id: 11,
        name: "Tanya N",
        date: "March 2026",
        text: "Thanks for my nails Maria, always the best.",
        service: "Nail Services",
    },
    {
        id: 12,
        name: "Lounita V",
        date: "March 2026",
        text: "Thank you for the best experience. I love my new lashes. Dandi works very gently and really cares about what you want.",
        service: "Lash Extensions",
    },
    {
        id: 13,
        name: "Corinne C",
        date: "January 2026",
        text: "Lindzi is very professional.",
        service: "Hair Styling",
    },
    {
        id: 14,
        name: "Telize S",
        date: "January 2026",
        text: "Ek is baie happy dankie Dandi.",
        service: "Lash Extensions",
    },
    {
        id: 15,
        name: "Marinda B",
        date: "January 2026",
        text: "Absolutely love the new hair.",
        service: "Hair Styling",
    },
    {
        id: 16,
        name: "Jessica M",
        date: "December 2025",
        text: "Lindsey helped so much. She cut my daughter's hair perfectly and colored my hair perfectly.",
        service: "Hair Colour",
    },
];

function ReviewAvatar({ name }: { name: string }) {
    const initials = name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 text-sm font-semibold text-white/90 sm:h-12 sm:w-12"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))" }}
        >
            {initials}
        </div>
    );
}

function ReviewCard({
    testimonial,
    ariaHidden = false,
    className = "",
}: {
    testimonial: Testimonial;
    ariaHidden?: boolean;
    className?: string;
}) {
    return (
        <article
            aria-hidden={ariaHidden}
            className={`w-[16.5rem] shrink-0 rounded-none border border-stone-200/90 bg-white p-4 shadow-[0_24px_50px_-38px_rgba(28,20,16,0.2)] sm:w-[18.5rem] sm:p-5 lg:w-[19.5rem] xl:w-[20rem] ${className}`}
        >
            <div className="flex items-start gap-3">
                <ReviewAvatar name={testimonial.name} />
                <div className="min-w-0 flex-1">
                    <p className="text-[0.92rem] leading-6 text-foreground/72 sm:text-[0.96rem] sm:leading-7">
                        &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground sm:text-sm">
                            {testimonial.name}
                        </span>
                        <span className="text-[0.68rem] uppercase tracking-[0.12em] text-foreground/40 sm:text-xs">
                            {testimonial.date}
                        </span>
                        <span className="text-[0.68rem] uppercase tracking-[0.12em] text-foreground/50 sm:text-xs">
                            {testimonial.service}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}

function ReviewMarqueeRow({
    items,
    direction,
    duration,
    prefersReducedMotion,
}: {
    items: Testimonial[];
    direction: "left" | "right";
    duration: number;
    prefersReducedMotion: boolean | null;
}) {
    const animatedItems = [...items, ...items];

    return (
        <div className="relative overflow-hidden">
            <motion.div
                className="flex w-max gap-3 sm:gap-4"
                animate={
                    prefersReducedMotion
                        ? { x: 0 }
                        : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
                }
                transition={
                    prefersReducedMotion
                        ? undefined
                        : { duration, repeat: Infinity, ease: "linear", repeatType: "loop" }
                }
            >
                {animatedItems.map((testimonial, index) => (
                    <ReviewCard
                        key={`${direction}-${testimonial.id}-${index}`}
                        testimonial={testimonial}
                        ariaHidden={index >= items.length}
                    />
                ))}
            </motion.div>
        </div>
    );
}

export function ReviewsSection() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden bg-[#f7f1e9] py-14 text-foreground sm:py-16 md:py-24">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at top left, rgba(196,165,119,0.16), transparent 28%), radial-gradient(circle at top right, rgba(214,198,170,0.18), transparent 30%)",
                }}
            />
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(28,20,16,0.16) 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                }}
            />

            <div className="container relative mx-auto px-4 sm:px-6">
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 text-center sm:mb-10"
                >
                    <div>
                        <h2 className="font-serif text-[2.4rem] leading-[0.95] tracking-[-0.04em] text-foreground sm:text-[3rem]">
                            Reviews
                        </h2>
                    </div>
                </motion.div>

                <div className="space-y-4 sm:hidden">
                    {testimonials.slice(0, 4).map((testimonial, index) => (
                        <motion.div
                            key={`mobile-${testimonial.id}`}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: prefersReducedMotion ? 0 : index * 0.06 }}
                        >
                            <ReviewCard testimonial={testimonial} className="w-full" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="relative mt-2 hidden overflow-hidden sm:block">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white via-[#fbf8f4] to-transparent lg:w-44" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white via-[#fbf8f4] to-transparent lg:w-44" />

                <div className="relative left-1/2 w-[calc(100vw+4rem)] -translate-x-1/2 lg:w-[calc(100vw+8rem)]">
                    <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <ReviewMarqueeRow
                            items={testimonials}
                            direction="left"
                            duration={88}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                    </motion.div>
                </div>
            </div>

            <div className="container relative mx-auto px-4 pt-8 text-center sm:px-6">
                <a
                    href={businessInfo.socials.fresha}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:text-gold"
                >
                    View more reviews
                </a>
            </div>
        </section>
    );
}
