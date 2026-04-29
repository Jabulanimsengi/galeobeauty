"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";

type HomepageFaqLink = {
    label: string;
    href: string;
};

type HomepageFaqItem = {
    question: string;
    answer: string;
    links?: HomepageFaqLink[];
};

interface HomepageFaqSectionProps {
    faqs: HomepageFaqItem[];
}

export function HomepageFaqSection({ faqs }: HomepageFaqSectionProps) {
    const [openIndex, setOpenIndex] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="bg-[#f6f7f7] py-10 md:py-12">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-6 text-center">
                        <h2 className="font-sans text-2xl font-semibold text-foreground sm:text-3xl">
                            FAQs
                        </h2>
                    </div>

                    <div className="grid gap-3 lg:grid-cols-2">
                        {faqs.map((faq, index) => {
                            const isOpen = index === openIndex;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden border border-border/60 bg-white"
                                >
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                        className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                                    >
                                        <span className="font-sans text-lg font-semibold text-foreground sm:text-[1.2rem]">
                                            {faq.question}
                                        </span>
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-foreground/20 bg-white text-xl font-bold leading-none text-foreground transition-colors group-hover:border-gold group-hover:text-gold">
                                            {isOpen ? "-" : "+"}
                                        </span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                                transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="border-t border-border/50 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                                                    <p className="text-sm leading-6 text-muted-foreground">
                                                        {faq.answer}
                                                    </p>
                                                    {faq.links && faq.links.length > 0 && (
                                                        <div className="mt-4 flex flex-wrap gap-2.5">
                                                            {faq.links.map((link) => (
                                                                <TrackedExternalLink
                                                                    key={link.href}
                                                                    href={link.href}
                                                                    trackingContext="homepage_faq_reviews"
                                                                    linkType="review_platform"
                                                                    linkLabel={link.label}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 border border-gold/25 bg-white px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:border-gold hover:text-gold"
                                                                >
                                                                    <span>{link.label}</span>
                                                                    <span className="text-base font-bold leading-none text-gold">+</span>
                                                                </TrackedExternalLink>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

