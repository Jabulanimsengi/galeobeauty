"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
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
        <section className="bg-stone-50 py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
                    <div className="max-w-xl">
                        <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold/85">
                            Before You Book
                        </span>
                        <h2 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
                            Questions Clients Often Ask
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                            A few simple answers to help you choose the right service, feel confident about booking, and know what to expect from your visit.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = index === openIndex;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-white"
                                >
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                                    >
                                        <span className="font-serif text-xl text-foreground sm:text-2xl">
                                            {faq.question}
                                        </span>
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-secondary/10">
                                            <motion.span
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                                                className="text-gold"
                                            >
                                                <ChevronDown className="h-5 w-5" />
                                            </motion.span>
                                        </span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                                transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: "easeOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="border-t border-border/50 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                                                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                                        {faq.answer}
                                                    </p>
                                                    {faq.links && faq.links.length > 0 && (
                                                        <div className="mt-5 flex flex-wrap gap-3">
                                                            {faq.links.map((link) => (
                                                                <TrackedExternalLink
                                                                    key={link.href}
                                                                    href={link.href}
                                                                    trackingContext="homepage_faq_reviews"
                                                                    linkType="review_platform"
                                                                    linkLabel={link.label}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
                                                                >
                                                                    <span>{link.label}</span>
                                                                    <ArrowRight className="h-4 w-4" />
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
