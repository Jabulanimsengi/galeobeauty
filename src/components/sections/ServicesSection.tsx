"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/ui/trust-badge";
import { ArrowRight, Sparkles, Heart, Eye, Scissors, Zap } from "lucide-react";

const services = [
    {
        id: "face-care",
        title: "Advanced Facials",
        description: "Medical-grade facials, chemical peels & skin rejuvenation using Babor products",
        image: "/images/services/face-care-01.png",
        badge: "Medical Grade",
        badgeVariant: "medical" as const,
        icon: Sparkles,
    },
    {
        id: "skin-treatments",
        title: "Skin Treatments",
        description: "RF skin tightening, microneedling & IPL therapy for lasting results",
        image: "/images/services/face-care-02.png",
        badge: "CE Approved",
        badgeVariant: "safe" as const,
        icon: Zap,
    },
    {
        id: "lashes",
        title: "Lash Extensions",
        description: "Premium silk & volume lashes with certified technicians",
        image: "/images/services/lashes.png",
        badge: "Premium",
        badgeVariant: "premium" as const,
        icon: Eye,
    },
    {
        id: "body-contouring",
        title: "Body Contouring",
        description: "Cryolipolysis fat freeze & slimming treatments with proven results",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=500&fit=crop",
        badge: "CE Approved",
        badgeVariant: "safe" as const,
        icon: Heart,
    },
    {
        id: "nails",
        title: "Nail Artistry",
        description: "Acrylic, gel overlays & medical pedicures in a hygienic environment",
        image: "/images/services/eye-care-01.png",
        badge: "Hygienic",
        badgeVariant: "medical" as const,
        icon: Scissors,
    },
    {
        id: "wellness",
        title: "Massage & Wellness",
        description: "Swedish, deep tissue & aromatherapy massages for total relaxation",
        image: "/images/services/eye-care-02.png",
        badge: "Therapeutic",
        badgeVariant: "premium" as const,
        icon: Sparkles,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesSection() {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30" id="services">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-gold text-xs uppercase tracking-[0.3em] mb-3 block font-sans font-semibold">
                        Treatment Menu
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                        Science-Backed <span className="text-gold">Beauty</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base md:text-lg">
                        Where advanced skincare technology meets luxury spa treatments.
                        Our certified specialists use medical-grade equipment and premium products.
                    </p>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        <TrustBadge variant="medical" icon="shield">CE Certified Equipment</TrustBadge>
                        <TrustBadge variant="safe" icon="check">Sterile Environment</TrustBadge>
                        <TrustBadge variant="premium" icon="star">15+ Years Experience</TrustBadge>
                    </div>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {services.map((service) => {
                        const IconComponent = service.icon;
                        return (
                            <motion.div key={service.id} variants={itemVariants}>
                                <Link
                                    href={`/services#${service.id}`}
                                    className="group block clinical-card h-full"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-[220px] overflow-hidden">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                        {/* Badge */}
                                        <div className="absolute top-4 left-4">
                                            <TrustBadge variant={service.badgeVariant} icon="shield">
                                                {service.badge}
                                            </TrustBadge>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                                <IconComponent className="w-5 h-5 text-gold" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif text-xl font-semibold group-hover:text-gold transition-colors">
                                                    {service.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                            {service.description}
                                        </p>
                                        <div className="flex items-center text-gold text-sm font-medium group-hover:gap-2 transition-all">
                                            <span>View Treatments</span>
                                            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Button
                        asChild
                        size="lg"
                        className="bg-foreground hover:bg-foreground/90 text-background font-medium px-8"
                    >
                        <Link href="/services">
                            View Full Treatment Menu
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
