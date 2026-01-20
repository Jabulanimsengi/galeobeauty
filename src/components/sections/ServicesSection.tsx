"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { NavLink } from "@/components/ui/nav-link";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/ui/trust-badge";
import { UrgencyBadge } from "@/components/ui/urgency-badge";
import { ArrowRight, Sparkles, Heart, Eye, Scissors, Zap, ChevronRight } from "lucide-react";

const services = [
    {
        id: "facials",
        slug: "dermalogica", // Links to /prices/dermalogica
        title: "Facials",
        subtitle: "Premium Skincare",
        description: "Indulge in our premium facial treatments. From moisturising and anti-ageing facials to advanced skin renewal peels, our certified specialists deliver visible results using medical-grade products.",
        images: ["/images/services/facials/Image_facial_03.jpeg", "/images/services/facials/Image_facial_07.jpeg"],
        badge: "Premium",
        badgeVariant: "premium" as const,
        icon: Sparkles,
        features: ["Skinovage Facials", "Anti-Ageing", "Skin Renewal Peels", "Ampoule Crash"],
        color: "from-amber-500/20 to-orange-500/20",
        bookingFast: true,
    },
    {
        id: "makeup",
        slug: "makeup", // Links to /prices/makeup
        title: "Make-up",
        subtitle: "Kryolan Professional",
        description: "Look stunning for any occasion with our professional make-up services. From bridal looks to permanent make-up, Phi-Brows, and Phi-Contour, we create flawless beauty that lasts.",
        images: ["/images/services/makeup/makeup_01.jpeg", "/images/services/makeup/makeup_03.jpeg"],
        badge: "Professional",
        badgeVariant: "premium" as const,
        icon: Heart,
        features: ["Bridal Make-up", "Permanent Make-up", "Phi-Brows", "Phi-Contour"],
        color: "from-rose-500/20 to-pink-500/20",
    },
    {
        id: "ipl-hair-removal",
        slug: "ipl", // Links to /prices/ipl
        title: "IPL Hair Removal",
        subtitle: "Ladies & Gents",
        description: "Achieve silky smooth skin with our advanced IPL laser hair removal. Safe, effective treatments for all body areas including face, arms, legs, and intimate areas for both ladies and gents.",
        images: ["/images/services/IPL_Hair_removal/IPL_image_06.jpeg", "/images/services/IPL_Hair_removal/IPL_image_08.jpeg"],
        badge: "CE Approved",
        badgeVariant: "safe" as const,
        icon: Zap,
        features: ["Full Face", "Full Body", "Bikini & Brazilian", "Gents Treatments"],
        color: "from-teal-500/20 to-cyan-500/20",
        bookingFast: true,
    },
    {
        id: "massages",
        slug: "prices", // Links to /prices (no dedicated massage category yet)
        title: "Massages",
        subtitle: "Therapeutic & Relaxing",
        description: "Unwind with our therapeutic massage treatments using Lillian Terry aromatherapy oils. From Swedish relaxation to deep tissue therapy, our expert therapists melt away tension and stress.",
        images: ["/images/services/massages/Massage_07.jpeg", "/images/services/massages/Massage_01.jpeg"],
        badge: "Wellness",
        badgeVariant: "premium" as const,
        icon: Heart,
        features: ["Swedish Massage", "Deep Tissue", "Aromatherapy", "Indian Head Massage"],
        color: "from-emerald-500/20 to-green-500/20",
    },
    {
        id: "lashes",
        slug: "lashes", // Links to /prices/lashes
        title: "Lashes & Brows",
        subtitle: "Eye Enhancement",
        description: "Enhance your natural beauty with our lash extensions and brow tinting services. From Russian volume lashes to precision brow shaping, we perfect every detail.",
        images: ["/images/services/face/lashes_01.jpeg", "/images/services/face/lashes_04.jpeg"],
        badge: "Premium",
        badgeVariant: "premium" as const,
        icon: Eye,
        features: ["Lash Extensions", "Brow Tinting", "Volume Lashes", "Lash Lift"],
        color: "from-purple-500/20 to-violet-500/20",
    },
    {
        id: "waxing",
        slug: "waxing", // Links to /prices/waxing
        title: "Waxing",
        subtitle: "Smooth Skin",
        description: "Achieve silky smooth skin with our professional waxing services. We offer full body waxing, including Hollywood and Brazilian, using gentle techniques for minimal discomfort.",
        images: ["/images/services/waxing/waxing_04.jpeg", "/images/services/waxing/waxing_03.jpeg"],
        badge: "Hygienic",
        badgeVariant: "medical" as const,
        icon: Sparkles,
        features: ["Full Face", "brazilian", "Hollywood", "Full Body"],
        color: "from-pink-500/20 to-rose-500/20",
    },
    {
        id: "fat-freezing",
        slug: "fat-freezing", // Links to /prices/fat-freezing
        title: "Fat Freezing",
        subtitle: "Cryolipolysis",
        description: "Fat freeze, or cryolipolysis, is a non-invasive cosmetic treatment that uses cold temperatures to reduce stubborn fat in targeted areas like the belly, love handles, arms, back, or thighs. Ideally for body contouring.",
        images: ["/images/services/fat_freezing/Gallery_image_01(32).png.jpeg", "/images/services/fat_freezing/Gallery_image_01(33).png.jpeg"],
        badge: "CE Approved",
        badgeVariant: "safe" as const,
        icon: Zap,
        features: ["Non-Invasive", "No Downtime", "Permanent Results", "Safe & Effective"],
        color: "from-blue-500/20 to-indigo-500/20",
    },
    {
        id: "slimming",
        slug: "slimming", // Links to /prices/slimming
        title: "Tesla EMS Slimming",
        subtitle: "Max Muscle, Min Fat",
        description: "Experience the revolutionary Tesla EMS Slimming Machine. Using High-Intensity Focused Electromagnetic technology, it induces powerful muscle contractions to build muscle and burn fat simultaneously. No gym required.",
        images: ["/images/services/slimming_weightloss/EMS01.png", "/images/services/slimming_weightloss/EMS02.png"],
        badge: "New Tech",
        badgeVariant: "premium" as const,
        icon: Zap,
        features: ["Builds Muscle", "Burns Fat", "Non-Invasive", "30min Treatment"],
        color: "from-cyan-500/20 to-teal-500/20",
    },
    {
        id: "hair-extensions",
        slug: "hair-extensions", // Links to /prices/hair-extensions
        title: "Hair Extensions",
        subtitle: "European Remy Human Hair",
        description: "Add length, volume, and dimension with our premium European Remy human hair extensions. We offer tape-in, clip-in, keratin U-tip, micro loop, and halo hair extensions. Double drawn, premium quality for lasting beauty.",
        images: ["/images/services/hair_extension/hair_extension04.jpeg", "/images/services/hair_extension/hair_extension01.jpeg"],
        badge: "Premium Quality",
        badgeVariant: "premium" as const,
        icon: Scissors,
        features: ["100% Remy Hair", "Tape-in & Clip-in", "Keratin Bonds", "Multiple Lengths"],
        color: "from-amber-500/20 to-yellow-500/20",
    },

];


interface ServiceCardProps {
    service: typeof services[0];
    index: number;
    isReversed: boolean;
}

function ServiceCard({ service, index, isReversed }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Detect mobile on mount
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-rotate images on mobile every 3 seconds
    useEffect(() => {
        if (!isMobile) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isMobile, service.images.length]);

    // Swap image on hover (desktop only)
    useEffect(() => {
        if (isMobile) return;
        setCurrentImageIndex(isHovered ? 1 : 0);
    }, [isHovered, isMobile]);

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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
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
                    <NavLink href={service.slug === "prices" ? "/prices" : `/prices/${service.slug}`} className="block group">
                        <div className="relative aspect-[3/4] max-h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
                            {/* Background gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} z-0`} />

                            {/* Main Image - Crossfade between two images */}
                            {service.images.map((imgSrc, imgIndex) => (
                                <Image
                                    key={imgSrc}
                                    src={imgSrc}
                                    alt={`${service.title} - ${imgIndex + 1}`}
                                    fill
                                    className={`object-cover transition-all duration-700 ease-out ${currentImageIndex === imgIndex
                                        ? 'opacity-100 scale-100'
                                        : 'opacity-0 scale-105'
                                        }`}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority={imgIndex === 0}
                                />
                            ))}

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-500 group-hover:opacity-70" />

                            {/* Badge */}
                            <div className="absolute top-6 right-6 z-20 hidden lg:block">
                                <TrustBadge variant={service.badgeVariant} icon="shield">
                                    {service.badge}
                                </TrustBadge>
                            </div>

                            {/* Mobile Category Badge - Right side horizontal */}
                            <div className="lg:hidden absolute top-6 right-4 z-20">
                                <div className="bg-gold text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-full shadow-lg flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    {service.title}
                                </div>
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
                    </NavLink>
                </motion.div>

                {/* Content Side */}
                <div className="lg:w-1/2 w-full space-y-6">
                    {/* Subtitle */}
                    <span className="text-gold font-medium uppercase tracking-widest text-sm block">
                        {service.subtitle}
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {service.description}
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-2 gap-3 pt-4">
                        {service.features.map((feature, i) => (
                            <div
                                key={feature}
                                className="flex items-center gap-2 text-sm text-foreground/80"
                            >
                                <ChevronRight className="w-4 h-4 text-gold flex-shrink-0" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                        <Button
                            asChild
                            size="lg"
                            className="bg-foreground hover:bg-gold text-background hover:text-white font-medium px-8 transition-all duration-300 group"
                        >
                            <NavLink href={service.slug === "prices" ? "/prices" : `/prices/${service.slug}`}>
                                View Treatments
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </NavLink>
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function ServicesSection() {
    return (
        <section className="py-20 md:py-28 lg:py-36 bg-background overflow-hidden relative" id="services">
            {/* Subtle decorative background elements */}
            <div className="absolute top-20 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-40 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20 md:mb-28 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] font-sans">
                            Treatment Menu
                        </span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
                    </div>

                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 text-foreground">
                        Science-Backed <span className="text-gold italic">Beauty</span>
                    </h2>

                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed mb-12">
                        Where advanced skincare technology meets luxury spa treatments.
                        Our certified specialists use medical-grade equipment and premium products.
                    </p>

                    {/* Trust Indicators - Unified Gold Theme */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        {[
                            { icon: "shield", label: "CE Certified" },
                            { icon: "check", label: "Sterile Environment" },
                            { icon: "star", label: "15+ Years" },
                        ].map((badge, index) => (
                            <motion.div
                                key={badge.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex items-center gap-2.5 bg-white border border-gold/20 px-5 py-3 rounded-full shadow-sm hover:shadow-md hover:border-gold/40 transition-all duration-300 group"
                            >
                                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                                    {badge.icon === "shield" && (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gold">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    )}
                                    {badge.icon === "check" && (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gold">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    )}
                                    {badge.icon === "star" && (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gold">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                                    {badge.label}
                                </span>
                            </motion.div>
                        ))}
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
                        <NavLink href="/prices">
                            View All Services
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </NavLink>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
