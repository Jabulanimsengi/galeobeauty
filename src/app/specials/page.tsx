"use client";

import { Header, Footer } from "@/components/layout";
import { TrustBadge } from "@/components/ui/trust-badge";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/ui/countdown";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Scissors, Eye, Heart, Star, Tag } from "lucide-react";

interface SpecialItem {
    service: string;
    price: string;
    highlight?: boolean;
}

interface Special {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    icon: React.ElementType;
    description: string;
    items: SpecialItem[];
    note?: string;
}

// Special offers data
const specials: Special[] = [
    {
        id: "hair",
        title: "The Hair Edit",
        subtitle: "Luxe Locks",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=1200&fit=crop", // Portrait
        icon: Scissors,
        description: "Transform your look with our seasonal hair collection. Featuring premium styling and treatments for vitality and shine.",
        items: [
            { service: "Root Tint & Blow Wave", price: "R400" },
            { service: "Hi-Lights & OSMO Treatment", price: "R900" },
            { service: "Hollywood Curls", price: "FREE", highlight: true },
        ],
    },
    {
        id: "lash-focus",
        title: "Lash & Brow Artistry",
        subtitle: "Frame Your Face",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=1200&fit=crop",
        icon: Eye,
        description: "Wake up effortlessly beautiful. Our lash and brow technicians sculpt and define to enhance your natural features.",
        note: "Permanent Makeup 50% OFF - Limited Time",
        items: [
            { service: "Full Set Hybrid Lashes", price: "R500" },
            { service: "Brow Lamination & Lash Lift", price: "R400" },
            { service: "Classic Lashes", price: "R400" },
        ],
    },
    {
        id: "glow",
        title: "The Skin Glow",
        subtitle: "Radiance Revealed",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=1200&fit=crop",
        icon: Sparkles,
        description: "Scientific skincare meets luxurious relaxation. Reveal your most radiant complexion with our curated facial menu.",
        items: [
            { service: "Dermalogica Facial", price: "R850" },
            { service: "Sky Tightening RF", price: "R1,500" },
            { service: "IPL Hair Removal", price: "50% OFF", highlight: true },
        ],
    },
    {
        id: "body-sculpt",
        title: "Body Sculpting",
        subtitle: "Silhouette Refined",
        image: "https://images.unsplash.com/photo-1519823551278-64ac927ac280?w=800&h=1200&fit=crop",
        icon: Heart,
        description: "Advanced non-invasive treatments to contour, tighten, and smooth. Achieve your body goals with our medical-grade technologies.",
        items: [
            { service: "Fat Freeze (Per Session)", price: "R800" },
            { service: "Sunbed Package (10)", price: "R350" },
            { service: "All Waxing (Maria)", price: "25% OFF", highlight: true },
        ],
    },
];

export default function SpecialsPage() {
    // Target date for countdown (end of current month)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // 7 days from now for urgency

    return (
        <>
            <Header />
            <main className="bg-background">
                {/* Editorial Hero */}
                <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/20 -z-10" />

                    <div className="container mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="lg:w-1/2"
                            >
                                <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
                                    Curated Offers
                                </span>
                                <h1 className="font-serif text-6xl sm:text-7xl lg:text-9xl text-foreground leading-[0.9] mb-8">
                                    THE <br /><span className="italic text-gold">EDIT</span>
                                </h1>
                                <p className="text-xl text-muted-foreground font-light max-w-md border-l-2 border-gold pl-6 ml-2">
                                    A monthly collection of exclusive beauty experiences, hand-picked by our specialists for you.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="lg:w-1/2 relative"
                            >
                                <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
                                    <Image
                                        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop"
                                        alt="Feature Special"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                                    />
                                    <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl max-w-xs z-10 hidden sm:block">
                                        <p className="font-serif text-2xl italic mb-1">"Must Have"</p>
                                        <p className="text-sm text-muted-foreground">The January Permanent Makeup Collection.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Countdown Section */}
                <section className="py-12 bg-foreground text-background">
                    <div className="container mx-auto px-4 text-center">
                        <p className="uppercase tracking-widest text-xs font-semibold mb-2 text-gold">Offers Expire In</p>
                        <Countdown targetDate={targetDate} />
                        <Button variant="outline" className="text-gold border-gold hover:bg-gold hover:text-white mt-4 border-2">
                            <Link href="/booking">Book Before It's Too Late</Link>
                        </Button>
                    </div>
                </section>

                {/* Editorial Magazine Layout */}
                <div className="py-20 lg:py-32 space-y-20 lg:space-y-32">
                    {specials.map((special, idx) => (
                        <section key={special.id} className="container mx-auto px-4 sm:px-6">
                            <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>

                                {/* Image Half */}
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7 }}
                                    className="lg:w-1/2 w-full"
                                >
                                    <div className="relative aspect-[4/5] sm:aspect-[3.5/4] md:aspect-[3/4] w-full">
                                        <Image
                                            src={special.image}
                                            alt={special.title}
                                            fill
                                            className="object-cover shadow-2xl"
                                        />
                                        <div className="absolute inset-0 border border-white/20 m-4" />
                                    </div>
                                </motion.div>

                                {/* Content Half */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="lg:w-1/2 w-full"
                                >
                                    <div className="flex flex-col h-full justify-center">
                                        <span className="text-gold font-serif italic text-2xl mb-2">0{idx + 1}.</span>
                                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                                            {special.title}
                                            <span className="block text-xl md:text-2xl font-sans font-light text-muted-foreground mt-2 tracking-wide">
                                                {special.subtitle}
                                            </span>
                                        </h2>

                                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                            {special.description}
                                        </p>

                                        {special.note && (
                                            <div className="bg-gold/10 p-4 border-l-4 border-gold mb-8">
                                                <p className="text-gold-dark font-semibold font-serif italic">{special.note}</p>
                                            </div>
                                        )}

                                        <div className="space-y-6 mb-10">
                                            {special.items.map((item, i) => (
                                                <div key={i} className="flex items-center justify-between border-b border-border/40 pb-4 group cursor-default">
                                                    <span className={`text-lg transition-colors ${item.highlight ? 'font-medium text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                                        {item.service}
                                                    </span>
                                                    <span className={`font-serif text-xl ${item.highlight ? 'text-gold font-bold' : 'text-foreground'}`}>
                                                        {item.price}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <Button asChild className="bg-foreground text-background hover:bg-gold hover:text-white w-fit px-8 py-6 text-lg rounded-none transition-all duration-300">
                                            <Link href="/booking">
                                                Book Appointment
                                                <ArrowRight className="ml-2 w-5 h-5" />
                                            </Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            </div>
                        </section>
                    ))}
                </div>

                {/* Final CTA */}
                <section className="py-24 bg-secondary/30 text-center">
                    <div className="container mx-auto">
                        <h2 className="font-serif text-4xl mb-6">Need Advice?</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Unsure which offer is best for you? Our concierge is available to guide your selection.
                        </p>
                        <Button variant="ghost" className="text-foreground hover:text-gold hover:bg-transparent underline underline-offset-4 text-lg">
                            <Link href="/contact">Contact Concierge</Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

