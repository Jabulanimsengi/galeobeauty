"use client";

import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/ui/countdown";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Percent, Gift, Star, Zap, Heart, Tag, Check } from "lucide-react";

interface SpecialItem {
    service: string;
    originalPrice?: string;
    price: string;
    highlight?: boolean;
}

interface Special {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    discount?: string;
    description: string;
    items: SpecialItem[];
    note?: string;
    featured?: boolean;
}

// Special offers data with local images
const specials: Special[] = [
    {
        id: "facials",
        title: "Facial Glow Package",
        subtitle: "Premium Babor Treatments",
        image: "/images/services/facials/Image_facial_03.jpeg",
        discount: "30% OFF",
        description: "Experience our signature Babor facials at special prices. Perfect for achieving that radiant, healthy glow you deserve.",
        featured: true,
        items: [
            { service: "Skinovage Moisturising Facial", originalPrice: "R575", price: "R400" },
            { service: "HSR Anti-Ageing Facial", originalPrice: "R1,430", price: "R1,000" },
            { service: "Skin Renewal Peel", originalPrice: "R930", price: "R650", highlight: true },
        ],
    },
    {
        id: "lashes",
        title: "Lash & Brow Special",
        subtitle: "Frame Your Beauty",
        image: "/images/services/lashes.png",
        discount: "25% OFF",
        description: "Wake up beautiful with our lash extensions and brow enhancement services. Perfect for busy professionals.",
        items: [
            { service: "Full Set Hybrid Lashes", originalPrice: "R667", price: "R500" },
            { service: "Russian Volume Lashes", originalPrice: "R1,200", price: "R899" },
            { service: "Brow Lamination + Tint", originalPrice: "R533", price: "R400", highlight: true },
        ],
    },
    {
        id: "massage",
        title: "Relaxation Escape",
        subtitle: "Therapeutic Wellness",
        image: "/images/services/massages/Massage_07.jpeg",
        discount: "20% OFF",
        description: "Melt away stress with our therapeutic massage treatments using premium Lillian Terry aromatherapy oils.",
        items: [
            { service: "Swedish Full Body Massage", originalPrice: "R650", price: "R520" },
            { service: "Deep Tissue Therapy", originalPrice: "R738", price: "R590" },
            { service: "Couples Massage Package", originalPrice: "R1,200", price: "R960", highlight: true },
        ],
    },
    {
        id: "makeup",
        title: "Bridal Season Special",
        subtitle: "Your Perfect Day",
        image: "/images/services/makeup/makeup_01.jpeg",
        discount: "FREE Trial",
        description: "Book your bridal makeup with us and receive a complimentary trial session. Kryolan professional products included.",
        featured: true,
        items: [
            { service: "Bridal Makeup + Trial", originalPrice: "R1,900", price: "R1,500" },
            { service: "Bridal Party (per person)", originalPrice: "R500", price: "R400" },
            { service: "Permanent Brows Touch-up", price: "50% OFF", highlight: true },
        ],
    },
];

export default function SpecialsPage() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent -z-10" />
                    <div className="absolute top-20 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10" />

                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full mb-6">
                                    <Sparkles className="w-4 h-4 text-gold" />
                                    <span className="text-gold text-sm font-semibold uppercase tracking-wider">Limited Time Offers</span>
                                </div>

                                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
                                    Specials & <span className="text-gold italic">Promotions</span>
                                </h1>

                                <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                                    Exclusive beauty deals curated just for you. Book now and save on our most popular treatments.
                                </p>

                                {/* Quick stats */}
                                <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                                    {[
                                        { icon: Percent, label: "Up to 50% Off" },
                                        { icon: Gift, label: "Free Trials" },
                                        { icon: Clock, label: "Limited Time" },
                                    ].map((stat) => (
                                        <div key={stat.label} className="flex items-center gap-2 text-foreground/70">
                                            <stat.icon className="w-5 h-5 text-gold" />
                                            <span className="text-sm font-medium">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Countdown Banner - Minimal Design */}
                <section className="py-6 bg-foreground text-background">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                            <p className="text-gold text-sm font-medium tracking-wide">
                                Offers end in
                            </p>
                            <Countdown targetDate={targetDate} variant="dark" />
                            <Button
                                asChild
                                size="sm"
                                className="bg-gold hover:bg-gold-dark text-foreground font-medium px-6"
                            >
                                <Link href="/booking">
                                    Book Now
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Featured Special - Large Card */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4 sm:px-6">
                        {specials.filter(s => s.featured).slice(0, 1).map((special) => (
                            <motion.div
                                key={special.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl overflow-hidden"
                            >
                                <div className="flex flex-col lg:flex-row">
                                    {/* Image */}
                                    <div className="lg:w-1/2 relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px]">
                                        <Image
                                            src={special.image}
                                            alt={special.title}
                                            fill
                                            className="object-cover"
                                        />
                                        {/* Discount Badge */}
                                        <div className="absolute top-6 left-6 bg-gold text-foreground px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                                            {special.discount}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                                        <span className="text-gold text-sm font-bold uppercase tracking-wider mb-2">Featured Deal</span>
                                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-background mb-4">
                                            {special.title}
                                        </h2>
                                        <p className="text-background/70 text-lg mb-8 leading-relaxed">
                                            {special.description}
                                        </p>

                                        {/* Items */}
                                        <div className="space-y-4 mb-8">
                                            {special.items.map((item, i) => (
                                                <div key={i} className="flex items-center justify-between pb-3 border-b border-background/20">
                                                    <div className="flex items-center gap-3">
                                                        <Check className="w-5 h-5 text-gold" />
                                                        <span className="text-background">{item.service}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        {item.originalPrice && (
                                                            <span className="text-background/50 line-through text-sm">{item.originalPrice}</span>
                                                        )}
                                                        <span className={`font-bold ${item.highlight ? 'text-gold' : 'text-background'}`}>
                                                            {item.price}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <Button
                                            asChild
                                            size="lg"
                                            className="bg-gold hover:bg-gold-light text-foreground font-semibold w-fit px-10"
                                        >
                                            <Link href="/booking">
                                                Claim This Offer
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Other Specials Grid */}
                <section className="py-16 lg:py-24 bg-secondary/20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
                                More <span className="text-gold italic">Offers</span>
                            </h2>
                            <p className="text-muted-foreground max-w-lg mx-auto">
                                Explore all our current promotions and find the perfect treatment for you.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {specials.filter(s => !s.featured || specials.indexOf(s) > 0).map((special, idx) => (
                                <motion.div
                                    key={special.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={special.image}
                                            alt={special.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Discount Badge */}
                                        {special.discount && (
                                            <div className="absolute top-4 left-4 bg-gold text-foreground px-3 py-1.5 rounded-full font-bold text-sm shadow-md">
                                                {special.discount}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <span className="text-gold text-xs font-bold uppercase tracking-wider">{special.subtitle}</span>
                                        <h3 className="font-serif text-2xl text-foreground mt-1 mb-3">{special.title}</h3>
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{special.description}</p>

                                        {/* Top item preview */}
                                        <div className="flex items-center justify-between py-3 border-t border-border/50 mb-4">
                                            <span className="text-sm text-foreground">{special.items[0].service}</span>
                                            <div className="flex items-center gap-2">
                                                {special.items[0].originalPrice && (
                                                    <span className="text-muted-foreground line-through text-xs">{special.items[0].originalPrice}</span>
                                                )}
                                                <span className="font-bold text-gold">{special.items[0].price}</span>
                                            </div>
                                        </div>

                                        <Button
                                            asChild
                                            className="w-full bg-foreground hover:bg-gold text-background hover:text-white transition-colors"
                                        >
                                            <Link href="/booking">
                                                Book Now
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-20 lg:py-28 bg-gradient-to-br from-foreground to-foreground/95 text-background">
                    <div className="container mx-auto px-4 sm:px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 px-4 py-2 rounded-full mb-6">
                                <Heart className="w-4 h-4 text-gold" />
                                <span className="text-gold text-sm font-semibold">Personalized Recommendations</span>
                            </div>

                            <h2 className="font-serif text-4xl sm:text-5xl text-background mb-6">
                                Not Sure Which <span className="text-gold italic">Offer</span> Is Right?
                            </h2>
                            <p className="text-background/70 text-lg max-w-2xl mx-auto mb-10">
                                Our beauty specialists are here to help you choose the perfect treatment package tailored to your needs.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-gold hover:bg-gold-light text-foreground font-semibold px-10"
                                >
                                    <Link href="/booking">
                                        Book Consultation
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-background/30 text-background hover:bg-background hover:text-foreground px-10"
                                >
                                    <Link href="/contact">
                                        Contact Us
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
