"use client";

import { Header, Footer } from "@/components/layout";
import { TrustBadge } from "@/components/ui/trust-badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Scissors, Eye, Heart, Zap, Tag, Clock, Star } from "lucide-react";

interface SpecialItem {
    service: string;
    price: string;
    highlight?: boolean;
}

interface Special {
    id: string;
    title: string;
    image: string;
    icon: React.ElementType;
    items: SpecialItem[];
    note?: string;
}

// Special offers with images
const specials: Special[] = [
    {
        id: "hair",
        title: "Hair Treatments",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
        icon: Scissors,
        items: [
            { service: "Root Tint & Blow Wave", price: "R400" },
            { service: "Hi-Lights & OSMO Treatment", price: "R900" },
            { service: "Hollywood Curls", price: "FREE", highlight: true },
            { service: "Hair Extensions (Mayne)", price: "POR" },
            { service: "Gents Cut", price: "R180" },
            { service: "Boys Cut", price: "R80" },
        ],
    },
    {
        id: "lashes",
        title: "Lash Specials",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=400&fit=crop",
        icon: Eye,
        items: [
            { service: "Full Set Hybrid Lashes", price: "R500" },
            { service: "Classic Lashes", price: "R400" },
            { service: "Lash Fill", price: "R250" },
            { service: "Brow Lamination & Lash Lift", price: "R400" },
        ],
        note: "Permanent Makeup 50% OFF - January Only!",
    },
    {
        id: "skin",
        title: "Facial & Skin",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop",
        icon: Sparkles,
        items: [
            { service: "Dermalogica Facial", price: "R850" },
            { service: "Microneedling + Collagen", price: "R500" },
            { service: "Skin Tightening RF", price: "R1500" },
            { service: "IPL Hair Removal", price: "50% OFF", highlight: true },
        ],
    },
    {
        id: "body",
        title: "Nails & Body",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop",
        icon: Heart,
        items: [
            { service: "Gel Toes", price: "R150" },
            { service: "Pedicure and Gel", price: "R350" },
            { service: "Fat Freeze (per session)", price: "R800" },
            { service: "Sunbed Package (10 sessions)", price: "R350" },
            { service: "All Waxes with Maria", price: "25% OFF", highlight: true },
        ],
    },
];

// Featured special - the hero offer
const featuredSpecial = {
    title: "January Mega Deal",
    subtitle: "Permanent Makeup",
    description: "Get 50% off all permanent makeup treatments including microblading, powder brows, and lip contour. Limited time only!",
    price: "50% OFF",
    originalPrice: "From R2200",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=600&fit=crop",
    badge: "Limited Time",
};

export default function SpecialsPage() {
    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&h=1080&fit=crop"
                        alt="Galeo Beauty Special Offers"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

                    <div className="absolute inset-0 flex items-center justify-center text-center">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 bg-gold/90 text-foreground rounded-full px-4 py-2 mb-4">
                                    <Tag className="w-4 h-4" />
                                    <span className="text-sm font-semibold uppercase tracking-wider">
                                        Limited Time Offers
                                    </span>
                                </div>
                                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-4">
                                    Special <span className="text-gold">Deals</span>
                                </h1>
                                <p className="text-white/80 max-w-xl mx-auto text-lg">
                                    Don't miss our exclusive promotions on premium treatments
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Featured Special - Large Hero Card */}
                <section className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Image Side */}
                                <div className="relative h-[300px] lg:h-[400px]">
                                    <Image
                                        src={featuredSpecial.image}
                                        alt={featuredSpecial.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent lg:hidden" />
                                </div>

                                {/* Content Side */}
                                <div className="bg-foreground text-background p-8 lg:p-12 flex flex-col justify-center">
                                    <TrustBadge variant="premium" icon="star" className="mb-4 w-fit">
                                        {featuredSpecial.badge}
                                    </TrustBadge>
                                    <span className="text-gold text-sm uppercase tracking-wider mb-2">
                                        {featuredSpecial.subtitle}
                                    </span>
                                    <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                                        {featuredSpecial.title}
                                    </h2>
                                    <p className="text-background/70 mb-6">
                                        {featuredSpecial.description}
                                    </p>
                                    <div className="flex items-baseline gap-3 mb-6">
                                        <span className="text-4xl font-bold text-gold">
                                            {featuredSpecial.price}
                                        </span>
                                        <span className="text-background/50 line-through">
                                            {featuredSpecial.originalPrice}
                                        </span>
                                    </div>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-gold hover:bg-gold-dark text-foreground font-semibold w-fit"
                                    >
                                        <Link href="/contact#booking">
                                            Claim This Offer
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Special Offer Cards Grid */}
                <section className="py-16 md:py-20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <span className="text-gold text-xs uppercase tracking-[0.3em] mb-3 block font-sans font-semibold">
                                More Deals
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                                This Month's <span className="text-gold">Specials</span>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {specials.map((special, idx) => {
                                const Icon = special.icon;
                                return (
                                    <motion.div
                                        key={special.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        className="group clinical-card overflow-hidden"
                                    >
                                        {/* Card Image Header */}
                                        <div className="relative h-[200px]">
                                            <Image
                                                src={special.image}
                                                alt={special.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                            {/* Title on image */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                                                        <Icon className="w-6 h-6 text-gold" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-serif text-2xl text-white font-semibold">
                                                            {special.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-6">
                                            {/* Note/Badge */}
                                            {special.note && (
                                                <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 mb-4">
                                                    <p className="text-sm text-gold font-medium flex items-center gap-2">
                                                        <Star className="w-4 h-4" />
                                                        {special.note}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Items List */}
                                            <div className="space-y-3">
                                                {special.items.map((item) => (
                                                    <div
                                                        key={item.service}
                                                        className={`flex justify-between items-center pb-3 border-b border-border last:border-0 last:pb-0 ${item.highlight ? "bg-gold/5 -mx-2 px-2 py-2 rounded-lg border-0" : ""
                                                            }`}
                                                    >
                                                        <span className={`font-medium ${item.highlight ? "text-gold" : ""}`}>
                                                            {item.service}
                                                        </span>
                                                        <span className={`font-bold ${item.highlight ? "text-gold text-lg" : "text-gold"}`}>
                                                            {item.price}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Book Button */}
                                            <Link
                                                href="/contact#booking"
                                                className="flex items-center justify-center gap-2 w-full mt-6 py-3 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
                                            >
                                                Book These Specials
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Urgency CTA */}
                <section className="py-20 bg-gold text-foreground text-center">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex justify-center mb-4">
                                <Clock className="w-12 h-12" />
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                                Don't Miss Out!
                            </h2>
                            <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
                                These special offers are available for a limited time only.
                                Book your appointment today and save!
                            </p>
                            <Button
                                asChild
                                size="lg"
                                className="bg-foreground hover:bg-foreground/90 text-background font-semibold px-8"
                            >
                                <Link href="/contact#booking">
                                    Book Now & Save
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
