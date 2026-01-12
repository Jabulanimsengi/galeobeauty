import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { TrustBadge } from "@/components/ui/trust-badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Sparkles, Zap, Heart, Eye, Scissors, Star } from "lucide-react";

export const metadata: Metadata = {
    title: "Services | Treatment Menu",
    description:
        "Explore our comprehensive range of medical spa and beauty treatments at Galeo Beauty. Advanced facials, body contouring, nail care, lash extensions, and more.",
};

const serviceCategories = [
    {
        id: "facials",
        title: "Advanced Facials",
        subtitle: "Medical-Grade Skincare",
        description: "Experience transformative results with our Babor professional facials. Each treatment uses CE-certified equipment and medical-grade products for maximum efficacy.",
        image: "/images/services/face-care-01.png",
        badge: "Medical Grade",
        badgeVariant: "medical" as const,
        icon: Sparkles,
        treatments: [
            "Babor Skinovage Facials",
            "HSR Anti-ageing Facials",
            "Dr. Babor Treatments",
            "Microneedling + Ampoules",
            "Chemical Peels",
        ],
    },
    {
        id: "body",
        title: "Body Contouring",
        subtitle: "Non-Invasive Slimming",
        description: "CE-approved cryolipolysis (fat freeze) and RF skin tightening treatments. Visible results from 3 weeks with no downtime required.",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=400&fit=crop",
        badge: "CE Approved",
        badgeVariant: "safe" as const,
        icon: Zap,
        treatments: [
            "Cryolipolysis Fat Freeze",
            "RF Skin Tightening",
            "IPL Hair Removal",
            "Full Body Spray Tan",
        ],
    },
    {
        id: "lashes",
        title: "Lash Extensions",
        subtitle: "Premium Silk & Volume",
        description: "Full, beautiful lashes applied by certified technicians. From classic elegance to dramatic Russian volume, we create your perfect look.",
        image: "/images/services/lashes.png",
        badge: "Certified",
        badgeVariant: "premium" as const,
        icon: Eye,
        treatments: [
            "Classic Silk Lashes",
            "Hybrid Lashes",
            "Russian Volume 4D/5D",
            "Lash Lifts & Tints",
            "Brow Lamination",
        ],
    },
    {
        id: "nails",
        title: "Nail Artistry",
        subtitle: "Hygienic Nail Care",
        description: "From medical pedicures to stunning nail art, our nail technicians work in a sterile environment with premium products.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop",
        badge: "Hygienic",
        badgeVariant: "medical" as const,
        icon: Scissors,
        treatments: [
            "Acrylic Nails",
            "Gel Overlay",
            "Medical Pedicure",
            "Standard Pedicure & Gel",
            "Nail Art Design",
        ],
    },
    {
        id: "massage",
        title: "Massage Therapy",
        subtitle: "Therapeutic Wellness",
        description: "Relax and rejuvenate with our Lilien Terry massage treatments. From Swedish relaxation to deep tissue therapy.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop",
        badge: "Therapeutic",
        badgeVariant: "premium" as const,
        icon: Heart,
        treatments: [
            "Swedish Massage",
            "Deep Tissue Therapy",
            "Aromatherapy Massage",
            "Indian Head Massage",
            "Hot Stone Therapy",
        ],
    },
    {
        id: "makeup",
        title: "Make-up & PMU",
        subtitle: "Professional Artistry",
        description: "Kryolan professional make-up and permanent make-up services including microblading, lip blush, and eyeliner.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
        badge: "Premium",
        badgeVariant: "premium" as const,
        icon: Star,
        treatments: [
            "Bridal Make-up",
            "Microbladed Phi-Brows",
            "Permanent Lip Liner",
            "Powder Brows",
            "Make-up Classes",
        ],
    },
];

export default function ServicesPage() {
    return (
        <>
            <Header />
            <main>
                {/* Page Hero */}
                <section className="bg-gradient-to-b from-muted/50 to-background py-20 md:py-28">
                    <div className="container mx-auto px-4 text-center">
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            <TrustBadge variant="medical" icon="shield">Medical Spa</TrustBadge>
                            <TrustBadge variant="premium" icon="star">Luxury Salon</TrustBadge>
                            <TrustBadge variant="safe" icon="check">CE Certified</TrustBadge>
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
                            Treatment <span className="text-gold">Menu</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                            From advanced skincare technology to luxury spa treatments —
                            our certified specialists deliver transformative results in a
                            sterile, premium environment.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {serviceCategories.map((category) => {
                                const IconComponent = category.icon;
                                return (
                                    <div
                                        key={category.id}
                                        id={category.id}
                                        className="group clinical-card"
                                    >
                                        <div className="relative h-52 overflow-hidden">
                                            <Image
                                                src={category.image}
                                                alt={category.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                                            {/* Badge */}
                                            <div className="absolute top-4 left-4">
                                                <TrustBadge variant={category.badgeVariant} icon="shield">
                                                    {category.badge}
                                                </TrustBadge>
                                            </div>

                                            {/* Title Overlay */}
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <span className="text-white/70 text-xs uppercase tracking-wider block mb-1">
                                                    {category.subtitle}
                                                </span>
                                                <h3 className="font-serif text-xl text-white font-semibold flex items-center gap-2">
                                                    <IconComponent className="w-5 h-5 text-gold" />
                                                    {category.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                                                {category.description}
                                            </p>
                                            <ul className="space-y-2 mb-5">
                                                {category.treatments.map((treatment) => (
                                                    <li
                                                        key={treatment}
                                                        className="text-sm flex items-center gap-2"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                                                        {treatment}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Link
                                                href="/prices"
                                                className="inline-flex items-center text-sm font-medium text-gold hover:text-gold-dark transition-colors"
                                            >
                                                View Prices
                                                <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-foreground text-background">
                    <div className="container mx-auto px-4 text-center">
                        <div className="flex justify-center gap-2 mb-4">
                            <Shield className="w-6 h-6 text-gold" />
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                            Ready to Transform?
                        </h2>
                        <p className="text-background/70 mb-8 max-w-xl mx-auto">
                            Book a consultation with our specialists to create your
                            personalized treatment plan.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="bg-gold hover:bg-gold-dark text-foreground font-medium px-8"
                        >
                            <Link href="/contact#booking">
                                Book Consultation
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
