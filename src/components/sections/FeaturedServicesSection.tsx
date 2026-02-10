"use client";

import { NavLink } from "@/components/ui/nav-link";
import { motion } from "framer-motion";
import { useState } from "react";
import { BookingSheet } from "@/components/booking/BookingSheet";
import Image from "next/image";

const featuredServices = [
    {
        title: "Body Contouring",
        location: "Hartbeespoort",
        description: "Non-surgical fat reduction & EMS body sculpting",
        href: "/body-contouring",
        image: "/images/services/fat_freezing/Gallery_image_01(32).png.jpeg",
        color: "from-gold/5 to-gold/10",
        borderColor: "border-gold/20",
    },
    {
        title: "Anti-Aging",
        location: "Near Pretoria",
        description: "Injectable aesthetics & facial rejuvenation",
        href: "/anti-aging",
        image: "/images/services/anti_ageing/anti_ageing_01.jpeg",
        color: "from-gold/10 to-gold/5",
        borderColor: "border-gold/20",
    },
    {
        title: "Permanent Makeup",
        location: "Hartbeespoort",
        description: "Microblading, powder brows & lip blush",
        href: "/permanent-makeup",
        image: "/images/services/makeup/makeup_01.jpeg",
        color: "from-foreground/5 to-gold/10",
        borderColor: "border-gold/20",
    },
    {
        title: "Medical Spa",
        location: "Hartbeespoort Dam",
        description: "Advanced aesthetic treatments & skincare",
        href: "/medical-spa",
        image: "/images/services/facials/Image_facial_02.jpeg",
        color: "from-gold/10 to-foreground/5",
        borderColor: "border-gold/20",
    },
    {
        title: "Bridal Beauty",
        location: "Hartbeespoort",
        description: "Complete wedding day makeup & styling",
        href: "/bridal-beauty",
        image: "/images/services/bridal/bridal_01.jpeg",
        color: "from-foreground/5 to-gold/5",
        borderColor: "border-gold/20",
    },
    {
        title: "Laser Hair Removal",
        location: "Hartbeespoort",
        description: "Permanent IPL hair removal for all areas",
        href: "/laser-hair-removal",
        image: "/images/services/IPL_Hair_removal/IPL_image_01.jpeg",
        color: "from-gold/5 to-foreground/5",
        borderColor: "border-gold/20",
    },
];

export function FeaturedServicesSection() {
    const [isConsultationBookingOpen, setIsConsultationBookingOpen] = useState(false);

    return (
        <>
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
                            Hartbeespoort&apos;s Leading Beauty &amp; Wellness Destination
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

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {featuredServices.map((service, index) => (
                            <motion.div
                                key={service.href}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <NavLink href={service.href} className="group block h-full">
                                    <div className={`h-full bg-gradient-to-br ${service.color} bg-white border-2 ${service.borderColor} rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300 hover:border-gold/60 hover:-translate-y-1`}>
                                        {/* Image */}
                                        <div className="relative w-full aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 sm:p-7">
                                            <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-1.5 group-hover:text-gold transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm text-gold font-medium mb-2.5">
                                                {service.location}
                                            </p>
                                            <p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-4">
                                                {service.description}
                                            </p>

                                            {/* Arrow */}
                                            <div className="flex items-center gap-2 text-gold font-medium text-sm group-hover:gap-3 transition-all">
                                                <span>Learn More</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            </motion.div>
                        ))}
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
                        <button
                            onClick={() => setIsConsultationBookingOpen(true)}
                            className="inline-flex items-center gap-2 bg-black hover:bg-gold text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg"
                        >
                            Book Free Consultation
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Consultation Booking Sheet */}
            <BookingSheet
                isOpen={isConsultationBookingOpen}
                onClose={() => setIsConsultationBookingOpen(false)}
                bookingType="consultation"
                consultationContext="General Consultation"
            />
        </>
    );
}
