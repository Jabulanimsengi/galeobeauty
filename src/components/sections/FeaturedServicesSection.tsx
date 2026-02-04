"use client";

import { NavLink } from "@/components/ui/nav-link";
import { Sparkles, Heart, Zap, Scissors, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const featuredServices = [
    {
        title: "Body Contouring",
        location: "Hartbeespoort",
        description: "Non-surgical fat reduction & EMS body sculpting",
        href: "/body-contouring",
        Icon: Zap,
        color: "from-gold/5 to-gold/10",
        borderColor: "border-gold/20",
    },
    {
        title: "Anti-Aging",
        location: "Near Pretoria",
        description: "Injectable aesthetics & facial rejuvenation",
        href: "/anti-aging",
        Icon: Sparkles,
        color: "from-gold/10 to-gold/5",
        borderColor: "border-gold/20",
    },
    {
        title: "Permanent Makeup",
        location: "Hartbeespoort",
        description: "Microblading, powder brows & lip blush",
        href: "/permanent-makeup",
        Icon: Scissors,
        color: "from-foreground/5 to-gold/10",
        borderColor: "border-gold/20",
    },
    {
        title: "Medical Spa",
        location: "Hartbeespoort Dam",
        description: "Advanced aesthetic treatments & skincare",
        href: "/medical-spa",
        Icon: Shield,
        color: "from-gold/10 to-foreground/5",
        borderColor: "border-gold/20",
    },
    {
        title: "Bridal Beauty",
        location: "Hartbeespoort",
        description: "Complete wedding day makeup & styling",
        href: "/bridal-beauty",
        Icon: Heart,
        color: "from-foreground/5 to-gold/5",
        borderColor: "border-gold/20",
    },
    {
        title: "Laser Hair Removal",
        location: "Hartbeespoort",
        description: "Permanent IPL hair removal for all areas",
        href: "/laser-hair-removal",
        Icon: Award,
        color: "from-gold/5 to-foreground/5",
        borderColor: "border-gold/20",
    },
];

export function FeaturedServicesSection() {
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate services for seamless infinite scroll
    const duplicatedServices = [...featuredServices, ...featuredServices];

    return (
        <section className="py-20 md:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 block"
                    >
                        Premium Services
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6"
                    >
                        Hartbeespoort's Leading Beauty & Wellness Destination
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed"
                    >
                        Discover our signature treatments combining medical-grade technology with luxury spa experiences.
                        Serving Hartbeespoort, Pretoria, Centurion, and surrounding areas.
                    </motion.p>
                </div>

                {/* Auto-Sliding Carousel */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: isPaused ? undefined : [0, -100 * featuredServices.length / 2 + "%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                    >
                        {duplicatedServices.map((service, index) => (
                            <motion.div
                                key={`${service.href}-${index}`}
                                className="flex-shrink-0 w-[350px]"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink href={service.href} className="group block h-full">
                                    <div className={`h-full bg-gradient-to-br ${service.color} bg-white border-2 ${service.borderColor} rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:border-gold/60`}>
                                        {/* Icon */}
                                        <div className="mb-6">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground shadow-md group-hover:shadow-lg group-hover:bg-gold transition-all">
                                                <service.Icon className="w-8 h-8 text-gold group-hover:text-foreground transition-colors" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-gold transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-gold font-medium mb-3">
                                            {service.location}
                                        </p>
                                        <p className="text-foreground/70 leading-relaxed mb-4">
                                            {service.description}
                                        </p>

                                        {/* Arrow */}
                                        <div className="flex items-center gap-2 text-gold font-medium group-hover:gap-3 transition-all">
                                            <span>Learn More</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </NavLink>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-6">
                        Not sure which treatment is right for you?
                    </p>
                    <a
                        href="https://wa.me/27824447389?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20consultation.%20I%20found%20you%20on%20www.galeobeauty.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-foreground font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-gold/50"
                    >
                        Book Free Consultation
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </NavLink>
                </motion.div>
            </div>
        </section>
    );
}
