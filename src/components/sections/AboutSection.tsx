"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/ui/trust-badge";
import { CheckCircle2, ArrowRight } from "lucide-react";

const features = [
    "CE Certified medical equipment",
    "Medical-grade Babor skincare products",
    "Sterile, hygienic treatment rooms",
    "Certified beauty & wellness specialists",
];

export function AboutSection() {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-muted/20 to-background" id="about">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex gap-2 mb-4">
                            <TrustBadge variant="medical" icon="shield">Medical Spa</TrustBadge>
                            <TrustBadge variant="premium" icon="star">Premium Salon</TrustBadge>
                        </div>

                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
                            A Fusion of
                            <br />
                            <span className="text-gold">Clinical Excellence</span>
                            <br />
                            & Luxury
                        </h2>

                        <p className="text-muted-foreground leading-relaxed mb-4 text-base md:text-lg">
                            Galeo Beauty is more than a salon—we're a premium medical spa
                            combining advanced skincare technology with traditional beauty
                            treatments. From therapeutic facials to body contouring, our
                            certified specialists deliver transformative results.
                        </p>

                        <p className="text-muted-foreground leading-relaxed mb-8">
                            Every treatment is performed in a sterile environment using
                            CE-certified equipment and medical-grade products, ensuring
                            both safety and efficacy.
                        </p>

                        {/* Feature List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            asChild
                            className="bg-foreground hover:bg-foreground/90 text-background font-medium"
                        >
                            <Link href="/about">
                                Discover Our Story
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=700&fit=crop"
                                alt="Professional skincare treatment at Galeo Beauty"
                                width={600}
                                height={700}
                                className="object-cover w-full h-[550px]"
                            />
                            {/* Subtle overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Experience Badge */}
                        <motion.div
                            className="absolute -bottom-8 -left-8 bg-white shadow-2xl rounded-xl p-6 border border-border/50"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <span className="font-serif text-5xl font-bold text-gold block">
                                15+
                            </span>
                            <span className="text-sm text-muted-foreground">
                                Years of Excellence
                            </span>
                        </motion.div>

                        {/* Treatments Badge */}
                        <motion.div
                            className="absolute -top-4 -right-4 bg-gold text-foreground shadow-xl rounded-xl p-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <span className="font-serif text-3xl font-bold block">100+</span>
                            <span className="text-xs uppercase tracking-wider">Treatments</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
