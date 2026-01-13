"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/ui/trust-badge";
import { ArrowRight, Sparkles, Heart, Eye, Scissors, Zap, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const services = [
    {
        id: "face-care",
        title: "Advanced Facials",
        subtitle: "Medical-Grade Skincare",
        description: "Experience transformative results with our medical-grade facials. Using premium Babor products and advanced techniques, our certified specialists address aging, acne, pigmentation, and dehydration for visibly radiant skin.",
        image: "/images/services/face-care-01.png",
        badge: "Medical Grade",
        badgeVariant: "medical" as const,
        icon: Sparkles,
        features: ["Chemical Peels", "Hydrafacials", "LED Therapy", "Microdermabrasion"],
        color: "from-amber-500/20 to-orange-500/20",
    },
    {
        id: "skin-treatments",
        title: "Skin Treatments",
        subtitle: "Advanced Technology",
        description: "Harness the power of CE-approved technology for lasting skin transformation. Our RF skin tightening, microneedling, and IPL therapy treatments deliver professional results with minimal downtime.",
        image: "/images/services/face-care-02.png",
        badge: "CE Approved",
        badgeVariant: "safe" as const,
        icon: Zap,
        features: ["RF Tightening", "Microneedling", "IPL Therapy", "Collagen Induction"],
        color: "from-emerald-500/20 to-teal-500/20",
    },
    {
        id: "lashes",
        title: "Lash Extensions",
        subtitle: "Premium Silk & Volume",
        description: "Wake up beautiful every day with our luxurious lash extensions. Our certified technicians craft custom looks from natural enhancement to dramatic volume using premium silk and mink lashes.",
        image: "/images/services/lashes.png",
        badge: "Premium",
        badgeVariant: "premium" as const,
        icon: Eye,
        features: ["Classic Lashes", "Volume Sets", "Hybrid Styles", "Lash Lifts"],
        color: "from-rose-500/20 to-pink-500/20",
    },
    {
        id: "body-contouring",
        title: "Body Contouring",
        subtitle: "Non-Invasive Sculpting",
        description: "Achieve your body goals with our advanced non-invasive treatments. Cryolipolysis fat freeze technology targets stubborn fat areas while our slimming treatments help you look and feel your best.",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=1000&fit=crop",
        badge: "CE Approved",
        badgeVariant: "safe" as const,
        icon: Heart,
        features: ["Fat Freeze", "Cavitation", "Body Wraps", "Lymphatic Drainage"],
        color: "from-violet-500/20 to-purple-500/20",
    },
];

interface ServiceCardProps {
    service: typeof services[0];
    index: number;
    isReversed: boolean;
}

function ServiceCard({ service, index, isReversed }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse parallax effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const IconComponent = service.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="relative"
        >
            <div
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
            >
                {/* Image Side */}
                <motion.div
                    ref={cardRef}
                    className="lg:w-1/2 w-full perspective-1000"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX: isHovered ? rotateX : 0,
                        rotateY: isHovered ? rotateY : 0,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <Link href={`/services#${service.id}`} className="block group">
                        <div className="relative aspect-[3/4] max-h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
                            {/* Background gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} z-0`} />

                            {/* Main Image */}
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-500 group-hover:opacity-70" />

                            {/* Badge */}
                            <div className="absolute top-6 right-6 z-20">
                                <TrustBadge variant={service.badgeVariant} icon="shield">
                                    {service.badge}
                                </TrustBadge>
                            </div>

                            {/* Floating number */}
                            <div className="absolute top-6 left-6 z-20">
                                <span className="font-serif text-7xl font-bold text-white/20 select-none">
                                    0{index + 1}
                                </span>
                            </div>

                            {/* Bottom content overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                                <motion.div
                                    className="flex items-center gap-3 text-white"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="text-sm font-medium uppercase tracking-wider">Explore Treatment</span>
                                    <ArrowRight className="w-4 h-4" />
                                </motion.div>
                            </div>

                            {/* Decorative frame on hover */}
                            <motion.div
                                className="absolute inset-4 border-2 border-white/30 rounded-xl pointer-events-none"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.95 }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </Link>
                </motion.div>

                {/* Content Side */}
                <div className="lg:w-1/2 w-full space-y-6">
                    {/* Subtitle */}
                    <motion.span
                        className="text-gold font-medium uppercase tracking-widest text-sm block"
                        initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {service.subtitle}
                    </motion.span>

                    {/* Title */}
                    <motion.h3
                        className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {service.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                        className="text-muted-foreground text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {service.description}
                    </motion.p>

                    {/* Features list */}
                    <motion.div
                        className="grid grid-cols-2 gap-3 pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        {service.features.map((feature, i) => (
                            <div
                                key={feature}
                                className="flex items-center gap-2 text-sm text-foreground/80"
                            >
                                <ChevronRight className="w-4 h-4 text-gold flex-shrink-0" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="pt-4"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="bg-foreground hover:bg-gold text-background hover:text-white font-medium px-8 transition-all duration-300 group"
                        >
                            <Link href={`/services#${service.id}`}>
                                View Treatments
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export function ServicesSection() {
    return (
        <section className="py-20 md:py-28 lg:py-36 bg-background overflow-hidden" id="services">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20 md:mb-28"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4 block font-sans">
                        Treatment Menu
                    </span>

                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 text-foreground">
                        Science-Backed <span className="text-gold italic">Beauty</span>
                    </h2>

                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed mb-10">
                        Where advanced skincare technology meets luxury spa treatments.
                        Our certified specialists use medical-grade equipment and premium products.
                    </p>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8">
                        <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.352-.272-2.636-.775-3.801a.75.75 0 00-.616-.443 11.209 11.209 0 01-7.843-3.336zM12 3.96c2.316.4 4.502 1.323 6.425 2.668.21.147.416.3.62.456C19.682 11.762 16.516 16.29 12 16.29c-4.516 0-7.682-4.528-7.045-9.206.204-.156.41-.309.62-.456A10.709 10.709 0 0012 3.96z" clipRule="evenodd" />
                            </svg>
                            CE Certified
                        </div>
                        <div className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                            Sterile Environment
                        </div>
                        <div className="flex items-center gap-2 border border-gold text-gold bg-transparent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            15+ Years
                        </div>
                    </div>
                </motion.div>

                {/* Alternating Services Layout */}
                <div className="space-y-24 md:space-y-32 lg:space-y-40">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                            isReversed={index % 2 !== 0}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-24 md:mt-32 pt-16 border-t border-border/30"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                        Explore Our Full Menu
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Discover all our treatments including nail artistry, massage therapy, and wellness services.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-medium px-10"
                    >
                        <Link href="/services">
                            View All Services
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
