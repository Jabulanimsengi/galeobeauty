"use client";

import { useState, useEffect } from "react";
import { Header, Footer } from "@/components/layout";
import { TrustBadge } from "@/components/ui/trust-badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles, Heart, Eye, Scissors, Zap, Star, ChevronRight } from "lucide-react";

// Category definitions with images
const categories = [
    {
        id: "facials",
        title: "Facials",
        subtitle: "Medical-Grade Skincare",
        description: "Experience transformative results with Babor professional facials",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&h=600&fit=crop",
        icon: Sparkles,
        badge: "Medical Grade",
        badgeVariant: "medical" as const,
    },
    {
        id: "nails",
        title: "Nails & Pedicures",
        subtitle: "Nail Artistry",
        description: "From medical pedicures to stunning nail art in a sterile environment",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&h=600&fit=crop",
        icon: Scissors,
        badge: "Hygienic",
        badgeVariant: "medical" as const,
    },
    {
        id: "lashes",
        title: "Lashes & Waxing",
        subtitle: "Eye Enhancement",
        description: "Premium lash extensions and professional waxing services",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=600&fit=crop",
        icon: Eye,
        badge: "Certified",
        badgeVariant: "premium" as const,
    },
    {
        id: "makeup",
        title: "Make-up & Massages",
        subtitle: "Beauty & Wellness",
        description: "Kryolan professional makeup and therapeutic massage treatments",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=600&fit=crop",
        icon: Star,
        badge: "Premium",
        badgeVariant: "premium" as const,
    },
    {
        id: "ipl",
        title: "IPL Hair Removal",
        subtitle: "Permanent Results",
        description: "CE-certified laser hair removal for lasting smoothness",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&h=600&fit=crop",
        icon: Zap,
        badge: "CE Approved",
        badgeVariant: "safe" as const,
    },
    {
        id: "slimming",
        title: "Slimming & Body",
        subtitle: "Body Contouring",
        description: "Cryolipolysis fat freeze with visible results from 3 weeks",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=600&fit=crop",
        icon: Heart,
        badge: "CE Approved",
        badgeVariant: "safe" as const,
    },
];

// Pricing data organized by category
const pricingData: Record<string, { title: string; image: string; items: { service: string; duration?: string; price: string }[]; note?: string }[]> = {
    facials: [
        {
            title: "Babor Skinovage Facials",
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=400&fit=crop",
            items: [
                { service: "Moisturising Facial", duration: "60min", price: "R400" },
                { service: "Vitalising Facial", duration: "60min", price: "R450" },
                { service: "Purifying Facial", duration: "60min", price: "R430" },
                { service: "Balancing Facial", duration: "60min", price: "R420" },
            ],
        },
        {
            title: "Babor Anti-ageing Facials",
            image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=400&fit=crop",
            items: [
                { service: "Grand CRU Facial", duration: "90min", price: "R1200" },
                { service: "HSR Lifting Extra-Firming", duration: "90min", price: "R1000" },
                { service: "Reversive Anti-ageing", duration: "90min", price: "R1900" },
                { service: "Sea Creation", duration: "120min", price: "R4900" },
            ],
        },
        {
            title: "Dr. Babor Facials",
            image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=800&h=400&fit=crop",
            items: [
                { service: "Skin Renewal Peels", duration: "60min", price: "R650" },
                { service: "Microneedling + Babor Ampoule", duration: "90min", price: "R1400" },
                { service: "Ultimate Face Lifting", duration: "90min", price: "R1800" },
                { service: "Ultimate A16 Detox", duration: "75min", price: "R550" },
                { service: "Neuro Sensitive Treatment", duration: "60min", price: "R850" },
            ],
        },
        {
            title: "Facial Add-ons",
            image: "https://images.unsplash.com/photo-1556228720-1987ba83dd3c?w=800&h=400&fit=crop",
            items: [
                { service: "Collagen Fleece Mask", price: "R500" },
                { service: "HSR Faceline Mask", price: "R450" },
                { service: "Firming Algae Peel-off", price: "R1800" },
                { service: "1 Ampoule", price: "R80" },
                { service: "5 Ampoules", price: "R400" },
            ],
        },
    ],
    nails: [
        {
            title: "Acrylic Nails",
            image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&h=400&fit=crop",
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
            image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&h=400&fit=crop",
            items: [
                { service: "Gel Toes", price: "R180" },
                { service: "Gel Overlay Hands", price: "R250" },
                { service: "Soak Off Gel", price: "R50" },
            ],
        },
        {
            title: "Pedicures",
            image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=800&h=400&fit=crop",
            items: [
                { service: "Medical Pedicure + Gel", price: "R399" },
                { service: "Standard Pedicure + Gel", price: "R299" },
            ],
        },
    ],
    lashes: [
        {
            title: "Lash Extensions",
            image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&h=400&fit=crop",
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
            image: "https://images.unsplash.com/photo-1515377905703-c4788e51af93?w=800&h=400&fit=crop",
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
            title: "Make-up (Kryolan)",
            image: "https://images.unsplash.com/photo-1487412947132-26c2449ffdd1?w=800&h=400&fit=crop",
            items: [
                { service: "Day Make-up", price: "R300" },
                { service: "Evening Make-up", price: "R400" },
                { service: "Bridal Make-up", price: "R1500" },
                { service: "Bridal Trial", price: "R400" },
                { service: "Make-up Classes", price: "R700" },
            ],
        },
        {
            title: "Permanent Make-up",
            image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=400&fit=crop",
            items: [
                { service: "Powder Brows", price: "R2800" },
                { service: "Microbladed Phi-Brows", price: "R2200" },
                { service: "Full Lips Phi-Contour", price: "R3588" },
                { service: "Hybrid Brows", price: "R2400" },
            ],
            note: "Touch up is 50% less",
        },
        {
            title: "Massages",
            image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&h=400&fit=crop",
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
            image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=400&fit=crop",
            items: [
                { service: "Full Face", price: "R650" },
                { service: "Underarms", price: "R400" },
                { service: "Full Bikini", price: "R650" },
                { service: "Full Leg", price: "R1000" },
                { service: "Full Bikini & Underarms", price: "R590" },
            ],
        },
        {
            title: "IPL Gents",
            image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=400&fit=crop",
            items: [
                { service: "Full Back", price: "R700" },
                { service: "Chest", price: "R1200" },
                { service: "Shoulders", price: "R450" },
                { service: "Full Arm", price: "R600" },
            ],
        },
    ],
    slimming: [
        {
            title: "Cryolipolysis (Fat Freeze)",
            image: "https://images.unsplash.com/photo-1519823551278-64ac927ac280?w=800&h=400&fit=crop",
            items: [
                { service: "Chin", price: "R1200" },
                { service: "Arms", price: "R1700" },
                { service: "Stomach", price: "R3400" },
                { service: "Buttocks", price: "R3900" },
                { service: "Love Handles", price: "R2300" },
            ],
            note: "CE approved - Results from 3 weeks",
        },
    ],
};

// Sticky navigation component - Premium Tab Design
function CategoryNav({ activeCategory, onCategoryClick }: { activeCategory: string; onCategoryClick: (id: string) => void }) {
    return (
        <div className="sticky top-[72px] z-40 bg-background/98 backdrop-blur-lg border-b border-border/50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex gap-0 overflow-x-auto scrollbar-hide">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryClick(cat.id)}
                                className={`group relative flex items-center gap-2.5 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-300 ${isActive
                                    ? "text-gold"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {/* Icon with background on active */}
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isActive
                                    ? "bg-gold/15"
                                    : "bg-transparent group-hover:bg-muted"
                                    }`}>
                                    <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-105"}`} />
                                </span>

                                {/* Label */}
                                <span className="hidden sm:inline">{cat.title}</span>

                                {/* Active indicator - animated underline */}
                                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full transition-all duration-300 ${isActive ? "w-3/4 opacity-100" : "w-0 opacity-0"
                                    }`} />

                                {/* Hover indicator */}
                                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-muted-foreground/30 rounded-full transition-all duration-300 ${!isActive ? "group-hover:w-1/2 group-hover:opacity-100" : ""
                                    } w-0 opacity-0`} />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Category section with hero image and pricing cards
function CategorySection({ category }: { category: typeof categories[0] }) {
    const Icon = category.icon;
    const pricing = pricingData[category.id] || [];

    return (
        <section id={category.id} className="scroll-mt-32">
            {/* Category Hero */}
            <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="max-w-xl"
                        >
                            <TrustBadge variant={category.badgeVariant} icon="shield" className="mb-4">
                                {category.badge}
                            </TrustBadge>
                            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-white mb-2">
                                {category.title}
                            </h2>
                            <p className="text-white/80 text-lg mb-4">
                                {category.description}
                            </p>
                            <div className="flex items-center gap-2 text-gold">
                                <Icon className="w-5 h-5" />
                                <span className="text-sm uppercase tracking-wider">{category.subtitle}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {pricing.map((priceGroup, idx) => (
                        <motion.div
                            key={priceGroup.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="group clinical-card overflow-hidden"
                        >
                            {/* Card Header Image */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={priceGroup.image}
                                    alt={priceGroup.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                {/* Title Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gold/90 text-background flex items-center justify-center shadow-lg">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <h3 className="font-serif text-lg font-semibold text-white text-shadow-sm">
                                            {priceGroup.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-4 space-y-3">
                                {priceGroup.items.map((item) => (
                                    <div
                                        key={item.service}
                                        className="flex justify-between items-start gap-2 pb-3 border-b border-border last:border-0 last:pb-0"
                                    >
                                        <div className="flex-1">
                                            <span className="font-medium text-sm">{item.service}</span>
                                            {item.duration && (
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                                    <Clock className="w-3 h-3" />
                                                    {item.duration}
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-semibold text-gold text-sm">
                                            {item.price}
                                        </span>
                                    </div>
                                ))}
                                {priceGroup.note && (
                                    <p className="text-xs text-muted-foreground italic pt-2 border-t border-border">
                                        {priceGroup.note}
                                    </p>
                                )}
                            </div>

                            {/* Card Footer */}
                            <div className="px-4 pb-4">
                                <Link
                                    href="/contact#booking"
                                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gold/10 text-gold text-sm font-medium hover:bg-gold hover:text-foreground transition-all group-hover:bg-gold group-hover:text-foreground"
                                >
                                    Book Now
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function PricesPage() {
    const [activeCategory, setActiveCategory] = useState("facials");

    const handleCategoryClick = (id: string) => {
        setActiveCategory(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Update active category on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = categories.map(cat => ({
                id: cat.id,
                element: document.getElementById(cat.id),
            }));

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
            <main>
                {/* Page Hero */}
                <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&h=1080&fit=crop"
                        alt="Galeo Beauty Treatments"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

                    <div className="absolute inset-0 flex items-center justify-center text-center">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex justify-center gap-2 mb-4">
                                    <TrustBadge variant="medical" icon="shield">100+ Treatments</TrustBadge>
                                    <TrustBadge variant="premium" icon="star">Premium Products</TrustBadge>
                                </div>
                                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-4">
                                    Treatment <span className="text-gold">Menu</span>
                                </h1>
                                <p className="text-white/80 max-w-xl mx-auto text-lg">
                                    Explore our complete range of medical spa and beauty treatments
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Sticky Category Navigation */}
                <CategoryNav activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />

                {/* Category Sections */}
                {categories.map((category) => (
                    <CategorySection key={category.id} category={category} />
                ))}

                {/* CTA */}
                <section className="py-20 bg-foreground text-background text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                            Ready to <span className="text-gold">Transform</span>?
                        </h2>
                        <p className="text-background/70 mb-8 max-w-xl mx-auto">
                            Book a consultation with our specialists to create your personalized treatment plan
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="bg-gold hover:bg-gold-dark text-foreground font-semibold px-8"
                        >
                            <Link href="/contact#booking">
                                Book Your Appointment
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
