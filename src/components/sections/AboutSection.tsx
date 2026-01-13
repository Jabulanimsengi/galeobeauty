"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/ui/trust-badge";
import { CheckCircle2, ArrowRight, Trophy } from "lucide-react";

const features = [
    "CE Certified medical equipment",
    "Medical-grade Babor skincare products",
    "Sterile, hygienic treatment rooms",
    "Certified beauty & wellness specialists",
];

export function AboutSection() {
    return (
        <section className="py-24 lg:py-32 bg-secondary/30" id="about">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Sticky Image Column */}
                    <div className="order-2 lg:order-1 relative lg:sticky lg:top-32 self-start">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                            {/* Main Image */}
                            <div className="relative aspect-[4/5] w-full">
                                <Image
                                    src="/images/founder.jpg"
                                    alt="Dandi Meyer - Founder of Galeo Beauty"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/40">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="p-3 bg-gold/10 rounded-full">
                                            <Trophy className="w-6 h-6 text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Excellence</p>
                                            <p className="font-serif text-xl text-foreground">Award Winning Care</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-foreground/70 leading-relaxed">
                                        Recognized for setting new standards in aesthetic medicine and patient comfort.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Content Column - Scrolls naturally */}
                    <div className="order-1 lg:order-2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-[1px] w-12 bg-gold" />
                                <span className="text-gold font-medium uppercase tracking-widest text-sm">About Galeo</span>
                            </div>

                            <h2 className="font-serif text-4xl lg:text-5xl lg:leading-tight text-foreground mb-6">
                                Where Medical Science <br />
                                <span className="text-gold italic">Elevates Artistry</span>
                            </h2>

                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Founded by Dandi Meyer, Galeo Beauty was born from a desire to bridge the gap between clinical dermatology and luxury wellness. We believe that true beauty health requires a holistic approach—treating the skin with medical precision while nurturing the spirit with an indulgent experience.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <h3 className="font-serif text-xl text-foreground">Clinical Precision</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Every treatment is overseen by medical professionals using FDA-approved technology and pharmaceutical-grade products.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-serif text-xl text-foreground">Holistic Wellness</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        We create a sanctuary where stress dissolves, allowing your body's natural healing processes to flourish.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border/50">
                                <TrustBadge variant="premium" className="mb-6">
                                    Certified Expert Practitioners
                                </TrustBadge>

                                <blockquote className="italic text-lg text-foreground/80 border-l-2 border-gold pl-6 py-2">
                                    &quot;Our mission is simple: to help you achieve the most radiant, healthy version of yourself, safely and sustainably.&quot;
                                    <footer className="text-sm font-semibold text-gold mt-2 not-italic">— Dandi Meyer, Founder</footer>
                                </blockquote>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
