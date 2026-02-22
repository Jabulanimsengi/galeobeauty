"use client";

import { motion } from "framer-motion";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import {
    CheckCircle, ArrowRight, Plus,
    Zap, Clock, Shield, TrendingUp, Sparkles,
    Award, Heart, Palette, Eye, TrendingDown
} from "lucide-react";
import { useState } from "react";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { SelectedTreatment } from "@/lib/booking-types";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { serviceLandingPages } from "@/lib/service-links";

// Icon mapping for string-based icon names
const iconMap = {
    'Zap': Zap,
    'Clock': Clock,
    'Shield': Shield,
    'TrendingUp': TrendingUp,
    'CheckCircle': CheckCircle,
    'Sparkles': Sparkles,
    'Award': Award,
    'Heart': Heart,
    'Palette': Palette,
    'Eye': Eye,
    'TrendingDown': TrendingDown,
};

export type IconName = keyof typeof iconMap;

export interface SEOLandingPageProps {
    // Hero Section
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroImage: string;
    heroImageAlt: string;

    // Benefits
    benefits: string[];

    // Pricing (optional)
    pricing?: {
        title: string;
        items: {
            name: string;
            price: string;
            duration?: string;
            description?: string;
        }[];
    };

    // Services/Treatments
    services?: {
        title: string;
        items: {
            icon: IconName;
            title: string;
            description: string;
        }[];
    };

    // Secondary content (image right, text left)
    secondaryContent?: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
        features: string[];
    };

    // CTA
    ctaTitle: string;
    ctaDescription: string;

    // Internal linking
    breadcrumbs?: BreadcrumbItem[];
    currentPageHref?: string;
}

export function SEOLandingPage({
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroImage,
    heroImageAlt,
    benefits,
    pricing,
    services,
    secondaryContent,
    ctaTitle,
    ctaDescription,
    breadcrumbs,
    currentPageHref,
}: SEOLandingPageProps) {
    const whatsappLink = "https://wa.me/27824447389?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation.%20I%20found%20you%20on%20www.galeobeauty.com";

    // Treatment booking state
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState<SelectedTreatment | null>(null);

    // Consultation booking state
    const [isConsultationBookingOpen, setIsConsultationBookingOpen] = useState(false);

    // Handle booking a treatment
    const handleBookTreatment = (pricingItem: { name: string; price: string; duration?: string; description?: string }) => {
        // Convert pricing item to SelectedTreatment format
        const treatment: SelectedTreatment = {
            categoryId: "seo-landing",
            categoryTitle: heroSubtitle,
            subcategoryId: "main",
            subcategoryTitle: heroTitle,
            item: {
                id: `seo-${pricingItem.name.toLowerCase().replace(/\s+/g, "-")}`,
                name: pricingItem.name,
                price: pricingItem.price,
                duration: pricingItem.duration,
                description: pricingItem.description,
            },
        };
        setSelectedTreatment(treatment);
        setIsBookingOpen(true);
    };

    // Handle closing booking sheet
    const handleCloseBooking = () => {
        setIsBookingOpen(false);
        setSelectedTreatment(null);
    };

    return (
        <>
            <Header />
            <main className="bg-background">
                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <div className="bg-secondary/20">
                        <Breadcrumbs items={breadcrumbs} />
                    </div>
                )}

                {/* Hero Section - Image Left, Text Right */}
                <section className={`${breadcrumbs ? 'pt-6 pb-24 lg:pt-8 lg:pb-32' : 'py-24 lg:py-32'} bg-secondary/20`}>
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Image - Sticky */}
                            <div className="relative lg:sticky lg:top-32 self-start">
                                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                                    <div className="relative h-[280px] md:h-[380px] lg:aspect-[3/4] lg:h-auto lg:max-h-[450px] w-full">
                                        <CloudinaryImage
                                            src={heroImage}
                                            alt={heroImageAlt}
                                            fill
                                            className="object-cover transition-transform duration-700 hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    </div>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="h-[1px] w-12 bg-gold" />
                                        <span className="text-gold font-medium uppercase tracking-widest text-sm">
                                            {heroSubtitle}
                                        </span>
                                    </div>

                                    <h1 className="font-serif text-4xl lg:text-5xl lg:leading-tight text-foreground mb-6">
                                        {heroTitle}
                                    </h1>

                                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                        {heroDescription}
                                    </p>

                                    {/* CTAs */}
                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={() => setIsConsultationBookingOpen(true)}
                                            className="inline-flex items-center gap-2 bg-black hover:bg-gold text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg"
                                        >
                                            Book Consultation
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Benefits List */}
                                <div className="space-y-4 pt-8 border-t border-border">
                                    {benefits.map((benefit, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-foreground">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                {pricing && (
                    <section className="py-24 bg-white">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="text-center mb-16">
                                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                    {pricing.title}
                                </h2>
                            </div>

                            <div className="max-w-4xl mx-auto space-y-6">
                                {pricing.items.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white border-b border-border pb-6"
                                    >
                                        <h3 className="font-serif text-xl text-foreground mb-3">
                                            {item.name}
                                        </h3>
                                        {item.description && (
                                            <p className="text-muted-foreground leading-relaxed mb-4">
                                                {item.description}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {item.duration && (
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{item.duration}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-lg font-bold text-foreground">from {item.price}</span>
                                                <button
                                                    onClick={() => handleBookTreatment(item)}
                                                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-gray-300 bg-gray-200 text-black hover:bg-gold hover:text-white hover:border-gold transition-all"
                                                    aria-label={`Book ${item.name}`}
                                                >
                                                    <Plus className="w-5 h-5" strokeWidth={3} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Services/Treatments Section */}
                {services && (
                    <section className="py-24 bg-secondary/10">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="text-center mb-16">
                                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                    {services.title}
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {services.items.map((item, idx) => {
                                    const Icon = iconMap[item.icon];
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="text-center"
                                        >
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
                                                <Icon className="w-8 h-8 text-gold" />
                                            </div>
                                            <h3 className="font-serif text-xl text-foreground mb-3">
                                                {item.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Secondary Content - Image Right, Text Left */}
                {secondaryContent && (
                    <section className="py-24 bg-white">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                                {/* Text Content */}
                                <div className="space-y-8">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                                            {secondaryContent.title}
                                        </h2>
                                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                            {secondaryContent.description}
                                        </p>

                                        {/* Features */}
                                        <div className="space-y-4">
                                            {secondaryContent.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                                                    <span className="text-foreground">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Image */}
                                <div className="relative">
                                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                                        <div className="relative h-[280px] md:h-[380px] lg:aspect-[3/4] lg:h-auto lg:max-h-[450px] w-full">
                                            <CloudinaryImage
                                                src={secondaryContent.image}
                                                alt={secondaryContent.imageAlt}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Explore Other Treatments - Cross-linking Section */}
                {currentPageHref && (() => {
                    const otherServices = serviceLandingPages.filter(s => s.href !== currentPageHref).slice(0, 3);
                    if (otherServices.length === 0) return null;
                    return (
                        <section className="py-24 bg-secondary/10">
                            <div className="container mx-auto px-4 sm:px-6">
                                <div className="text-center mb-12">
                                    <span className="text-gold font-medium uppercase tracking-widest text-sm block mb-3">
                                        More Treatments
                                    </span>
                                    <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                                        Explore Other Treatments
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                    {otherServices.map((service, idx) => (
                                        <motion.div
                                            key={service.href}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <Link href={service.href} className="group block">
                                                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/30 bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                                                    <div className="relative aspect-[16/10] w-full">
                                                        <CloudinaryImage
                                                            src={service.image}
                                                            alt={service.title}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                            sizes="(max-width: 768px) 100vw, 33vw"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                    </div>
                                                    <div className="p-5">
                                                        <h3 className="font-serif text-lg text-foreground group-hover:text-gold transition-colors mb-1">
                                                            {service.title}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {service.description}
                                                        </p>
                                                        <span className="inline-flex items-center gap-1 text-sm font-medium text-gold mt-3 group-hover:gap-2 transition-all">
                                                            Learn more <ArrowRight className="w-4 h-4" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="text-center mt-10">
                                    <Link
                                        href="/prices"
                                        className="inline-flex items-center gap-2 text-foreground hover:text-gold transition-colors font-medium"
                                    >
                                        View All Treatments & Prices
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    );
                })()}

                {/* Final CTA Section */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                                {ctaTitle}
                            </h2>
                            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                                {ctaDescription}
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <button
                                    onClick={() => setIsConsultationBookingOpen(true)}
                                    className="inline-flex items-center gap-2 bg-black hover:bg-gold text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg"
                                >
                                    Book Free Consultation
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Treatment Booking Sheet */}
            {selectedTreatment && (
                <BookingSheet
                    isOpen={isBookingOpen}
                    onClose={handleCloseBooking}
                    treatments={[selectedTreatment]}
                />
            )}

            {/* Consultation Booking Sheet */}
            <BookingSheet
                isOpen={isConsultationBookingOpen}
                onClose={() => setIsConsultationBookingOpen(false)}
                bookingType="consultation"
                consultationContext={heroSubtitle}
            />
        </>
    );
}
