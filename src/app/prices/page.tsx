"use client";

import { useState, useEffect } from "react";
import { Header, Footer } from "@/components/layout";
import { TrustBadge } from "@/components/ui/trust-badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles, Heart, Eye, Scissors, Zap, Star, ChevronRight, Download } from "lucide-react";

// Category definitions (Restored)
const categories = [
    {
        id: "facials",
        title: "Facials",
        subtitle: "Medical-Grade Skincare",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200",
        icon: Sparkles,
        badge: "Medical Grade",
        badgeVariant: "medical" as const,
    },
    {
        id: "nails",
        title: "Nails & Pedicures",
        subtitle: "Nail Artistry",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200",
        icon: Scissors,
        badge: "Hygienic",
        badgeVariant: "medical" as const,
    },
    {
        id: "lashes",
        title: "Lashes & Waxing",
        subtitle: "Eye Enhancement",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200",
        icon: Eye,
        badge: "Certified & Safe",
        badgeVariant: "premium" as const,
    },
    {
        id: "makeup",
        title: "Make-up & Massages",
        subtitle: "Beauty & Wellness",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200",
        icon: Star,
        badge: "Premium",
        badgeVariant: "premium" as const,
    },
    {
        id: "ipl",
        title: "IPL Hair Removal",
        subtitle: "Permanent Results",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200",
        icon: Zap,
        badge: "CE Approved",
        badgeVariant: "safe" as const,
    },
    {
        id: "slimming",
        title: "Slimming & Body",
        subtitle: "Body Contouring",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200",
        icon: Heart,
        badge: "CE Approved",
        badgeVariant: "safe" as const,
    },
];

// Full Detailed Pricing Data (Restored and Corrected)
const pricingData: Record<string, { title: string; image?: string; items: { service: string; duration?: string; price: string }[]; note?: string }[]> = {
    facials: [
        {
            title: "Babor Skinovage Facials",
            items: [
                { service: "Moisturising Facial", duration: "60min", price: "R400" },
                { service: "Vitalising Facial", duration: "60min", price: "R450" },
                { service: "Purifying Facial", duration: "60min", price: "R430" },
                { service: "Balancing Facial", duration: "60min", price: "R420" },
            ],
        },
        {
            title: "Babor Anti-ageing Facials",
            items: [
                { service: "Grand CRU Facial", duration: "90min", price: "R1,200" },
                { service: "HSR Lifting Extra-Firming", duration: "90min", price: "R1,000" },
                { service: "Reversive Anti-ageing", duration: "90min", price: "R1,900" },
                { service: "Sea Creation", duration: "120min", price: "R4,900" },
            ],
        },
        {
            title: "Dr. Babor Facials",
            items: [
                { service: "Skin Renewal Peels", duration: "60min", price: "R650" },
                { service: "Microneedling + Babor Ampoule", duration: "90min", price: "R1,400" },
                { service: "Ultimate Face Lifting", duration: "90min", price: "R1,800" },
                { service: "Ultimate A16 Detox", duration: "75min", price: "R550" },
                { service: "Neuro Sensitive Treatment", duration: "60min", price: "R850" },
            ],
        },
        {
            title: "Facial Add-ons",
            items: [
                { service: "Collagen Fleece Mask", price: "R500" },
                { service: "HSR Faceline Mask", price: "R450" },
                { service: "Firming Algae Peel-off", price: "R1,800" },
                { service: "1 Ampoule", price: "R80" },
                { service: "5 Ampoules", price: "R400" },
            ],
        },
    ],
    nails: [
        {
            title: "Acrylic Nails",
            items: [
                { service: "Full Set Designer Acrylic", price: "R450" },
                { service: "Acrylic Fill", price: "R300" },
                { service: "Acrylic Gel and Tips", price: "R480" },
                { service: "Acrylic Gel Overlay", price: "R350" },
                { service: "Soak Off Acrylic", price: "R70" },
            ],
        },
        {
            title: "Gel Nails",
            items: [
                { service: "Gel Toes", price: "R180" },
                { service: "Gel Overlay Hands", price: "R250" },
                { service: "Soak Off Gel", price: "R50" },
            ],
        },
        {
            title: "Pedicures",
            items: [
                { service: "Medical Pedicure + Gel", price: "R399" },
                { service: "Standard Pedicure + Gel", price: "R299" },
            ],
        },
    ],
    lashes: [
        {
            title: "Lash Extensions",
            items: [
                { service: "Full Set Silk Individual", price: "R699" },
                { service: "Full Set 2D/3D Volume", price: "R599" },
                { service: "Full Set 4D/5D Lashes", price: "R799" },
                { service: "Russian Volume", price: "R899" },
                { service: "½ Fill", price: "R350" },
                { service: "¾ Fill", price: "R280" },
                { service: "Lash & Brow Tint", price: "R100" },
            ],
        },
        {
            title: "Waxing",
            items: [
                { service: "Full Face", price: "R150" },
                { service: "Lip, Chin, Brows", price: "R140" },
                { service: "Brazilian", price: "R200" },
                { service: "Hollywood", price: "R240" },
                { service: "Full Legs", price: "R200" },
                { service: "Underarm", price: "R90" },
            ],
        },
    ],
    makeup: [
        {
            title: "Kryolan Make-up",
            items: [
                { service: "Day Make-up", price: "R300" },
                { service: "Evening Make-up", price: "R400" },
                { service: "Bridal Make-up", price: "R1,500" },
                { service: "Bridal Trial", price: "R400" },
                { service: "Make-up Classes", price: "R700" },
            ],
        },
        {
            title: "Permanent Make-up (PMU)",
            items: [
                { service: "Powder Brows", price: "R2,800" },
                { service: "Microbladed Phi-Brows", price: "R2,200" },
                { service: "Full Lips Phi-Contour", price: "R3,588" },
                { service: "Hybrid Brows", price: "R2,400" },
            ],
            note: "Touch ups are 50% less",
        },
        {
            title: "Massages",
            items: [
                { service: "Back, Neck, Shoulders", duration: "30min", price: "R330" },
                { service: "Swedish Massage", duration: "60min", price: "R520" },
                { service: "Deep Tissue", price: "R590" },
                { service: "Full Body", duration: "60min", price: "R500" },
            ],
        },
    ],
    ipl: [
        {
            title: "IPL Ladies",
            items: [
                { service: "Full Face", price: "R650" },
                { service: "Underarms", price: "R400" },
                { service: "Full Bikini", price: "R650" },
                { service: "Full Leg", price: "R1,000" },
                { service: "Full Bikini & Underarms", price: "R590" },
            ],
        },
        {
            title: "IPL Gents",
            items: [
                { service: "Full Back", price: "R700" },
                { service: "Chest", price: "R1,200" },
                { service: "Shoulders", price: "R450" },
                { service: "Full Arm", price: "R600" },
            ],
        },
    ],
    slimming: [
        {
            title: "Cryolipolysis (Fat Freeze)",
            items: [
                { service: "Chin", price: "R1,200" },
                { service: "Arms", price: "R1,700" },
                { service: "Stomach", price: "R3,400" },
                { service: "Buttocks", price: "R3,900" },
                { service: "Love Handles", price: "R2,300" },
            ],
            note: "Visible results from 3 weeks",
        },
    ],
};

// Re-using the sticky nav component because it was good
function CategoryNav({ activeCategory, onCategoryClick }: { activeCategory: string; onCategoryClick: (id: string) => void }) {
    return (
        <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-3 px-1">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryClick(cat.id)}
                                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${isActive
                                    ? "bg-foreground text-background shadow-md"
                                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                                    }`}
                            >
                                {cat.title}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function PricesPage() {
    const [activeCategory, setActiveCategory] = useState("facials");

    const handleCategoryClick = (id: string) => {
        setActiveCategory(id);
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky header
            const y = element.getBoundingClientRect().top + window.scrollY - 180;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = categories.map(cat => ({
                id: cat.id,
                element: document.getElementById(cat.id),
            }));

            // Find which section is currently in view
            for (const section of sections.reverse()) {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect();
                    if (rect.top <= 200) {
                        setActiveCategory(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 bg-secondary/20">
                    <div className="container mx-auto text-center max-w-4xl">
                        <span className="text-gold font-medium uppercase tracking-widest text-xs sm:text-sm block mb-4">
                            Transparent Pricing
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            Official Price <span className="text-gold">List</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-2xl mx-auto">
                            Browse our comprehensive list of treatments. All prices are in ZAR and subject to consultation.
                        </p>
                    </div>
                </section>

                <CategoryNav activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />

                <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-20 max-w-5xl space-y-24">
                    {categories.map((category) => {
                        const priceGroups = pricingData[category.id] || [];

                        return (
                            <section key={category.id} id={category.id} className="scroll-mt-40">
                                {/* Category Header */}
                                <div className="mb-8 border-b border-foreground/10 pb-4">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="font-serif text-3xl sm:text-4xl text-foreground">{category.title}</h2>
                                        <TrustBadge variant={category.badgeVariant} className="hidden sm:inline-flex">{category.badge}</TrustBadge>
                                    </div>
                                    <p className="text-muted-foreground">{category.subtitle}</p>
                                </div>

                                {/* Price Groups Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                    {priceGroups.map((group, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                                            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-border/40 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <h3 className="font-serif text-xl text-foreground mb-6 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                                {group.title}
                                            </h3>

                                            <div className="space-y-4">
                                                {group.items.map((item, i) => (
                                                    <div key={i} className="flex items-end justify-between border-b border-dashed border-muted/30 pb-2 last:border-0 last:pb-0">
                                                        <div className="flex flex-col">
                                                            <span className="text-foreground/90 font-medium">{item.service}</span>
                                                            {item.duration && (
                                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    {item.duration}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="font-semibold text-gold whitespace-nowrap ml-4">{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {group.note && (
                                                <p className="mt-4 text-xs text-muted-foreground italic bg-secondary/50 p-2 rounded-lg text-center">
                                                    * {group.note}
                                                </p>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Floating Download Button */}
                <div className="fixed bottom-6 right-6 z-50">
                    <Button className="rounded-full shadow-2xl bg-foreground text-background hover:bg-gold hover:text-white px-6 py-6 h-auto flex gap-3 transition-all duration-300 group">
                        <Download className="w-5 h-5 group-hover:animate-bounce" />
                        <span className="font-medium pr-1">Download PDF</span>
                    </Button>
                </div>

                {/* CTA */}
                <section className="py-20 bg-foreground text-background text-center mt-20">
                    <div className="container mx-auto px-4">
                        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                            Ready to book?
                        </h2>
                        <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground font-semibold px-10">
                            <Link href="/booking">
                                Make a Booking
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
