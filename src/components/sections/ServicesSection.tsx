"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import Link from "next/link";
import { NavLink } from "@/components/ui/nav-link";
import { Button } from "@/components/ui/button";
import { UrgencyBadge } from "@/components/ui/urgency-badge";
import { ArrowRight, Sparkles, Heart, Eye, Scissors, Zap, ChevronRight, Shield } from "lucide-react";

const services = [
    {
        id: "facials",
        slug: "dermalogica", // Links to /prices/dermalogica
        title: "Facials",
        subtitle: "Premium Skincare",
        description: "Indulge in our premium facial treatments. From moisturising and anti-ageing facials to advanced skin renewal peels, our certified specialists deliver visible results using medical-grade products.",
        images: [
            "/images/dermalogica/dermalogica-microneedling-treatment.png",
            "/images/dermalogica/dermalogica-microneedling-with-led-therapy.png",
            "/images/dermalogica/dermalogica-proskin-treatment.jpg"
        ],
        imageAlts: ["Professional Dermalogica facial treatment at Galeo Beauty Hartbeespoort", "Anti-aging facial skincare treatment near Pretoria", "Proskin Dermalogica treatment"],
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
        images: [
            "/images/make-up/blending-sponge-makeup-application.jpg",
            "/images/make-up/expert-bridal-makeup-application.jpg",
            "/images/make-up/precision-makeup-base-application.jpg",
            "/images/make-up/professional-glamour-makeup-portfolio.jpg"
        ],
        imageAlts: ["Professional bridal makeup application at Galeo Beauty salon", "Kryolan makeup artist creating flawless look for special occasions", "Precision makeup base application", "Professional glamour makeup portfolio"],
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
        images: [
            "/images/ipl/ipl-cooling-gel-application-legs.jpg",
            "/images/ipl/ipl-full-leg-hair-removal.jpg",
            "/images/ipl/ipl-hair-removal-arms-treatment.jpg",
            "/images/ipl/ipl-hair-removal-face-treatment.jpg"
        ],
        imageAlts: ["CE-approved IPL laser hair removal treatment in Hartbeespoort", "Permanent hair removal for ladies and gents near Pretoria", "IPL Hair removal arms", "IPL Hair removal face"],
        badge: "CE Approved",
        badgeVariant: "safe" as const,
        icon: Zap,
        features: ["Full Face", "Full Body", "Bikini & Brazilian", "Gents Treatments"],
        color: "from-teal-500/20 to-cyan-500/20",
        bookingFast: true,
    },
    {
        id: "massages",
        slug: "massages", // Links to /prices/massages
        title: "Massages",
        subtitle: "Therapeutic & Relaxing",
        description: "Unwind with our therapeutic massage treatments using Lillian Terry aromatherapy oils. From Swedish relaxation to deep tissue therapy, our expert therapists melt away tension and stress.",
        images: [
            "/images/massages/deep-relaxation-neck-massage.jpg",
            "/images/massages/deep-tissue-back-massage-therapy.jpg",
            "/images/massages/deep-tissue-trigger-point-massage.jpg",
            "/images/massages/luxury-spa-massage-room-ambience.jpg",
            "/images/massages/professional-full-body-massage-therapy.jpg",
            "/images/massages/reflexology-foot-massage-treatment.jpg",
            "/images/massages/serene-wellness-retreat-massage.jpg",
            "/images/massages/therapeutic-oil-massage-technique.jpg"
        ],
        imageAlts: ["Relaxing Swedish massage at Galeo Beauty spa Hartbeespoort", "Deep tissue aromatherapy massage treatment near Pretoria", "Trigger point massage", "Spa massage room", "Full body massage", "Foot reflexology", "Wellness retreat", "Oil massage"],
        badge: "Wellness",
        badgeVariant: "premium" as const,
        icon: Heart,
        features: ["Swedish Massage", "Deep Tissue", "Aromatherapy", "Indian Head Massage"],
        color: "from-emerald-500/20 to-green-500/20",
    },
    {
        id: "lashes",
        slug: "lashes-brows", // Links to /prices/lashes-brows
        title: "Lashes & Brows",
        subtitle: "Eye Enhancement",
        description: "Enhance your natural beauty with our lash extensions and brow tinting services. From Russian volume lashes to precision brow shaping, we perfect every detail.",
        images: [
            "/images/lashes-brows/Hybrid-Brows-Permanent-makeup.png",
            "/images/lashes-brows/dramatic-volume-eyelash-extensions.png",
            "/images/lashes-brows/eyebrow-microblading-hair-strokes-transformation.png",
            "/images/lashes-brows/fluffy-eyelash-extensions-brown-eyes.png",
            "/images/lashes-brows/full-volume-lash-extensions-and-sculpted-brow..jpg",
            "/images/lashes-brows/hybrid-lashes-with-defined-eyebrows.png"
        ],
        imageAlts: ["Russian volume lash extensions at Galeo Beauty Hartbeespoort", "Professional brow lamination and lash lift treatment near Pretoria", "Microblading", "Fluffy eyelash extensions", "Volume lash and brow", "Hybrid lashes"],
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
        images: [
            "/images/waxing/full-leg-wax-salon-service.jpg",
            "/images/waxing/professional-leg-waxing-service.jpg"
        ],
        imageAlts: ["Professional Brazilian and Hollywood waxing at Galeo Beauty", "Full body waxing services for smooth skin in Hartbeespoort"],
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
        images: [
            "/images/fat-freezing/fat-freezing-stomach-treatment.jpg",
            "/images/fat-freezing/stomach-fat-freezing-procedure.jpg"
        ],
        imageAlts: ["Fat freezing cryolipolysis body contouring treatment in Hartbeespoort", "Non-invasive fat reduction treatment near Pretoria South Africa"],
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
        images: [
            "/images/slimming/emsculpt-body-contouring-session.png",
            "/images/slimming/non-invasive-butt-lift-technology.png"
        ],
        imageAlts: ["Tesla EMS body sculpting machine at Galeo Beauty Hartbeespoort", "EMS slimming treatment for muscle toning and fat burning near Pretoria"],
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
        images: [
            "/images/hair-extensions/beachy-blonde-waves-extensions.png",
            "/images/hair-extensions/luxury-balayage-hair-extension-makeover.png",
            "/images/hair-extensions/luxury-blonde-balayage-extensions-finish.png",
            "/images/hair-extensions/luxury-blonde-balayage-hair-extensions.png"
        ],
        imageAlts: ["Premium Remy human hair extensions at Galeo Beauty salon", "Tape-in and clip-in hair extensions near Pretoria Hartbeespoort", "Blonde Balayage Extensions", "Luxury Extensions"],
        badge: "Premium Quality",
        badgeVariant: "premium" as const,
        icon: Scissors,
        features: ["100% Remy Hair", "Tape-in & Clip-in", "Keratin Bonds", "Multiple Lengths"],
        color: "from-amber-500/20 to-yellow-500/20",
    },


    {
        id: "permanent-makeup",
        slug: "permanent-makeup",
        title: "Permanent Makeup",
        subtitle: "Semi-Permanent Beauty",
        description: "Wake up beautiful every day with professional semi-permanent makeup. Expert microblading, powder pixel brows, hybrid brows, permanent eyeliner, lip blush, and full lip contour by certified cosmetic tattoo artists.",
        images: [
            "/images/permanent-makeup/Hybrid-Brows-Permanent-makeup.png",
            "/images/permanent-makeup/Shaded-eye-liner-Permanent-Makeup.png",
            "/images/permanent-makeup/ombre-powder-brows-close-up.png"
        ],
        imageAlts: [
            "Professional lip blush before and after customized look at Galeo Beauty Hartbeespoort",
            "Permanent eyeliner healed results on blue eyes",
            "Nano lip colour before and after"
        ],
        badge: "Certified",
        badgeVariant: "premium" as const,
        icon: Eye,
        features: ["Microblading", "Powder Brows", "Lip Blush", "Permanent Eyeliner"],
        color: "from-fuchsia-500/20 to-pink-500/20",
    },



    {
        id: "nails",
        slug: "nails",
        title: "Nail Artistry",
        subtitle: "Hands & Feet",
        description: "Pamper your hands and feet with our professional nail services. Gel overlays, acrylic nails, gel polish (Bio Sculpture & Gelish), nail art, manicures, pedicures, and luxurious hand and foot treatments.",
        images: [
            "/images/nails/french-tip-square-gel-nails-galeo.jpg",
            "/images/nails/nude-almond-gel-nails-galeo-beauty-salon.jpg",
            "/images/nails/french-tip-gel-nails-salon-treatment.jpg"
        ],
        imageAlts: [
            "French tip square gel nails at Galeo Beauty Hartbeespoort",
            "Nude almond gel nails professional manicure near Pretoria",
            "French tip gel nails salon treatment"
        ],
        badge: "Premium",
        badgeVariant: "premium" as const,
        icon: Sparkles,
        features: ["Gel Overlay", "Acrylic Nails", "Nail Art", "Pedicure"],
        color: "from-pink-500/20 to-fuchsia-500/20",
    },

];


interface Service {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    images: string[];
    imageAlts?: string[];
    badge: string;
    badgeVariant: "premium" | "safe" | "medical";
    icon: typeof Sparkles;
    features: string[];
    color: string;
    bookingFast?: boolean;
}

interface ServiceCardProps {
    service: Service;
    index: number;
    isReversed: boolean;
}

function ServiceCard({ service, index, isReversed }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    const displayImages = service.images.slice(0, 6);

    // Auto-rotate images every 3.5 seconds
    useEffect(() => {
        if (displayImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [displayImages.length]);

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
                        <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
                            {/* Background gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} z-0`} />

                            {/* Main Image - Crossfade between images */}
                            {displayImages.map((imgSrc, imgIndex) => (
                                <CloudinaryImage
                                    key={imgSrc}
                                    src={imgSrc}
                                    alt={service.imageAlts?.[imgIndex] || `${service.title} treatment at Galeo Beauty salon Hartbeespoort`}
                                    fill
                                    className={`object-cover object-center transition-opacity duration-700 ease-out ${currentImageIndex === imgIndex
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                        }`}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    // Eagerly load all images in the carousel so they don't flash when transitioning
                                    loading="eager"
                                    priority={index === 0 || imgIndex === 0} // Highest priority to the first service card's images
                                    noSpinner={true} // spinner would look broken here
                                />
                            ))}

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                            {/* Category Badge - Visible on all screens */}
                            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                                <div className="bg-gold text-white text-xs md:text-sm font-bold uppercase tracking-wider py-2 px-4 rounded-full shadow-lg flex items-center gap-1.5 pt-[0.625rem] pb-[0.625rem]">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    {service.title}
                                </div>
                            </div>

                            {/* Carousel Navigation Dots */}
                            {displayImages.length > 1 && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
                                    {displayImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentImageIndex(idx);
                                            }}
                                            className={`transition-all duration-300 rounded-full shadow-sm ${currentImageIndex === idx
                                                ? "w-6 h-1.5 bg-gold"
                                                : "w-1.5 h-1.5 bg-white/50 hover:bg-white/90"
                                                }`}
                                            aria-label={`Go to image ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Bottom content overlay */}
                            <div className="absolute inset-x-0 bottom-12 p-6 z-20 pointer-events-none">
                                <motion.div
                                    className="flex items-center justify-center gap-3 text-white"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="text-sm font-bold uppercase tracking-wider drop-shadow-md">Explore Treatment</span>
                                    <ArrowRight className="w-4 h-4 drop-shadow-md" />
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
                        {
                            service.features.map((feature, i) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2 text-sm text-foreground/80"
                                >
                                    <ChevronRight className="w-4 h-4 text-gold flex-shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))
                        }
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                        <Button
                            asChild
                            size="lg"
                            className="bg-foreground hover:bg-gold text-background hover:text-white font-medium px-8 transition-all duration-300 group"
                        >
                            <NavLink href={service.slug === "prices" ? "/prices" : `/prices/${service.slug}`}>
                                View Prices
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
        <section className="py-20 md:py-28 lg:py-36 bg-amber-50/50 overflow-hidden relative" id="services">
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
                        Our Beauty & Wellness <span className="text-gold italic">Treatments</span> in Hartbeespoort
                    </h2>

                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed mb-12">
                        Explore our full treatment menu at Galeo Beauty in Harties.
                        From medical aesthetics to relaxing spa treatments — all delivered by certified specialists using medical-grade equipment near Hartbeespoort Dam.
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
