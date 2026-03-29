"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";

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

const reviewRows: Testimonial[][] = [
    testimonials.slice(0, 8),
    testimonials.slice(8),
];

const freshaReviewUrl = "https://www.fresha.com/a/galeo-beauty-hartbeespoort-galeo-beauty-landsmeer-equestrian-estate-sb28s52l";

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
            className={`w-[18rem] shrink-0 rounded-[1.5rem] border border-stone-200/90 bg-white p-5 shadow-[0_24px_50px_-38px_rgba(28,20,16,0.2)] sm:w-[21rem] sm:p-6 lg:w-[22.5rem] xl:w-[23rem] ${className}`}
        >
            <div className="flex items-start gap-4">
                <ReviewAvatar name={testimonial.name} />
                <div className="min-w-0 flex-1">
                    <p className="text-[0.98rem] leading-7 text-foreground/72 sm:text-[1.02rem] sm:leading-8">
                        &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground sm:text-base">
                            {testimonial.name}
                        </span>
                        <span className="text-xs uppercase tracking-[0.12em] text-foreground/40 sm:text-sm">
                            {testimonial.date}
                        </span>
                        <span className="text-xs uppercase tracking-[0.12em] text-foreground/50 sm:text-sm">
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
                className="flex w-max gap-4 sm:gap-5"
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
                    className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div className="max-w-2xl">
                        <div className="mb-3 flex items-center gap-3">
                            <span className="text-2xl font-light text-gold">&rsaquo;</span>
                            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">
                                Fresha Reviews
                            </span>
                        </div>
                        <h2 className="font-sans text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl md:text-[3rem]">
                            What People Say
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/62 sm:text-base sm:leading-7">
                            Verified client feedback from Fresha, highlighting the service, consistency, and care people mention most often at Galeo Beauty.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2.5">
                            <span className="inline-flex items-center rounded-full border border-gold/20 bg-white/80 px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-foreground/70 sm:px-4">
                                5.0 rating on Fresha
                            </span>
                            <span className="inline-flex items-center rounded-full border border-gold/20 bg-white/80 px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-foreground/70 sm:px-4">
                                190+ client votes
                            </span>
                        </div>
                    </div>

                    <TrackedExternalLink
                        href={freshaReviewUrl}
                        trackingContext="reviews_fresha"
                        linkType="review_platform"
                        linkLabel="Fresha reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-gold-dark transition-colors hover:text-gold sm:text-base"
                    >
                        <span>View on Fresha</span>
                        <ArrowRight className="h-4 w-4" />
                    </TrackedExternalLink>
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

                    <TrackedExternalLink
                        href={freshaReviewUrl}
                        trackingContext="reviews_fresha_mobile"
                        linkType="review_platform"
                        linkLabel="Fresha reviews mobile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/25 bg-white px-5 py-3 text-sm font-medium text-gold-dark transition-colors hover:border-gold hover:text-gold"
                    >
                        <span>View More Reviews on Fresha</span>
                        <ArrowRight className="h-4 w-4" />
                    </TrackedExternalLink>
                </div>
            </div>

            <div className="relative mt-2 hidden overflow-hidden sm:block">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white via-[#fbf8f4] to-transparent lg:w-44" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white via-[#fbf8f4] to-transparent lg:w-44" />

                <div className="relative left-1/2 w-[calc(100vw+6rem)] -translate-x-1/2 space-y-4 lg:w-[calc(100vw+10rem)] sm:space-y-5">
                    {reviewRows.map((row, index) => (
                        <motion.div
                            key={`row-${index}`}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: prefersReducedMotion ? 0 : index * 0.08 }}
                        >
                            <ReviewMarqueeRow
                                items={row}
                                direction={index % 2 === 0 ? "left" : "right"}
                                duration={index % 2 === 0 ? 72 : 78}
                                prefersReducedMotion={prefersReducedMotion}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
