"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Heart, Eye, Scissors, Zap, ChevronRight } from "lucide-react";

const services = [
    {
        id: "facials",
        slug: "dermalogica", // Links to /prices/dermalogica
                        title: "Facials",
        subtitle: "Premium Skincare",
        description: "From deep hydration to advanced skin renewal, our facial treatments are designed to leave skin visibly fresher, calmer, and more refined.",
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
        description: "From occasion makeup to permanent artistry, our team creates polished, lasting looks with precision and care.",
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
        description: "Advanced Intense Pulsed Light (IPL) hair removal treatments for smoother skin, with targeted sessions for face and body in a professional, comfortable setting.",
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
        description: "Relaxing and restorative massage treatments designed to ease tension, support recovery, and create a deeper sense of calm.",
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
        title: "Lash Extensions & Brow Styling",
        subtitle: "Eye Enhancement",
        description: "Soft enhancement or bold definition, with lash and brow treatments that frame the face beautifully and feel expertly finished.",
        images: [
            "/images/gallery/lashes-brows/Hybrid-Brows-Permanent-makeup.png",
            "/images/gallery/lashes-brows/dramatic-volume-eyelash-extensions.png",
            "/images/gallery/lashes-brows/eyebrow-microblading-hair-strokes-transformation.png",
            "/images/gallery/lashes-brows/fluffy-eyelash-extensions-brown-eyes.png",
            "/images/gallery/lashes-brows/full-volume-lash-extensions-and-sculpted-brow..jpg",
            "/images/gallery/lashes-brows/hybrid-lashes-with-defined-eyebrows.png"
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
        description: "Professional face and body waxing with careful technique, clean prep, and beautifully smooth results.",
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
        description: "Non-invasive cryolipolysis designed to target stubborn areas and support a more sculpted body contour over time.",
        images: [
            "/images/gallery/body-contouring/fat-freezing-red-light-body-contouring-treatment.jpg",
            "/images/gallery/body-contouring/fat-freezing-cryolipolysis-abdomen-treatment.jpg"
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
        description: "High-intensity muscle stimulation technology that supports toning, contouring, and a stronger-feeling silhouette without downtime.",
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
        description: "Premium extension services for fuller, longer, more dimensional hair with a polished salon finish.",
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
        description: "Semi-permanent beauty treatments designed to add definition, symmetry, and everyday confidence with an expert touch.",
        images: [
            "/images/gallery/lashes-brows/Hybrid-Brows-Permanent-makeup.png",
            "/images/gallery/lashes-brows/Shaded-eye-liner-Permanent-Makeup.png",
            "/images/gallery/lashes-brows/ombre-powder-brows-close-up.png"
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
        description: "Refined manicures, pedicures, and nail enhancements that feel polished, premium, and beautifully maintained.",
        images: [
            "/images/gallery/nails/french-tip-square-gel-nails-galeo.jpg",
            "/images/gallery/nails/nude-almond-gel-nails-galeo-beauty-salon.jpg",
            "/images/gallery/nails/french-tip-gel-nails-salon-treatment.jpg"
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
    const [displayedImageIndex, setDisplayedImageIndex] = useState(0);
    const [incomingImageIndex, setIncomingImageIndex] = useState<number | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const transitionTimerRef = useRef<number | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const displayImages = service.images.slice(0, 6);

    const activeImageIndex = incomingImageIndex ?? displayedImageIndex;

    const transitionToImage = useCallback((nextIndex: number) => {
        if (nextIndex === displayedImageIndex || nextIndex === incomingImageIndex) {
            return;
        }

        if (typeof window === "undefined" || prefersReducedMotion) {
            setDisplayedImageIndex(nextIndex);
            setIncomingImageIndex(null);
            return;
        }

        const revealIncomingImage = () => {
            setIncomingImageIndex(nextIndex);

            if (transitionTimerRef.current) {
                window.clearTimeout(transitionTimerRef.current);
            }

            transitionTimerRef.current = window.setTimeout(() => {
                setDisplayedImageIndex(nextIndex);
                setIncomingImageIndex(null);
                transitionTimerRef.current = null;
            }, 420);
        };

        const nextImage = new window.Image();
        nextImage.decoding = "async";
        nextImage.src = displayImages[nextIndex];

        if (nextImage.complete) {
            revealIncomingImage();
            return;
        }

        nextImage.onload = revealIncomingImage;
        nextImage.onerror = revealIncomingImage;
    }, [displayImages, displayedImageIndex, incomingImageIndex, prefersReducedMotion]);

    // Auto-rotate images every 3.5 seconds
    useEffect(() => {
        if (displayImages.length <= 1 || prefersReducedMotion) return;

        const interval = setInterval(() => {
            transitionToImage((displayedImageIndex + 1) % displayImages.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [displayImages.length, displayedImageIndex, prefersReducedMotion, transitionToImage]);

    useEffect(() => {
        return () => {
            if (transitionTimerRef.current) {
                window.clearTimeout(transitionTimerRef.current);
            }
        };
    }, []);

    // Mouse parallax effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion) return;
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="relative overflow-visible"
        >
            <div
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:justify-center lg:gap-0`}
            >
                {/* Image Side */}
                <motion.div
                    ref={cardRef}
                    className="w-full perspective-1000 lg:w-[58%] lg:max-w-[42rem] lg:shrink-0 xl:w-[54%] xl:max-w-[44rem] 2xl:w-[50%]"
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
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl sm:aspect-[4/3] lg:aspect-[6/5] xl:aspect-[5/4]">
                            <div className="absolute inset-0 bg-stone-950/10" />

                            <div className="absolute inset-0">
                                <CloudinaryImage
                                    src={displayImages[displayedImageIndex]}
                                    alt={service.imageAlts?.[displayedImageIndex] || `${service.title} treatment at Galeo Beauty salon Hartbeespoort`}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 42rem, 44rem"
                                    priority={index === 0 && displayedImageIndex === 0}
                                    loading={index === 0 && displayedImageIndex === 0 ? "eager" : "lazy"}
                                    noSpinner
                                />
                            </div>

                            {incomingImageIndex !== null && (
                                <motion.div
                                    key={`${service.id}-${incomingImageIndex}`}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.42, ease: "easeInOut" }}
                                >
                                    <CloudinaryImage
                                        src={displayImages[incomingImageIndex]}
                                        alt={service.imageAlts?.[incomingImageIndex] || `${service.title} treatment at Galeo Beauty salon Hartbeespoort`}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 42rem, 44rem"
                                        loading="eager"
                                        noSpinner
                                    />
                                </motion.div>
                            )}

                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 transition-opacity duration-500 group-hover:opacity-10`} />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                            {/* Carousel Navigation Dots */}
                            {displayImages.length > 1 && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
                                    {displayImages.map((_, idx) => (
                                        <button
                                            type="button"
                                            key={idx}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                transitionToImage(idx);
                                            }}
                                            className={`transition-all duration-300 rounded-full shadow-sm ${activeImageIndex === idx
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
                <div
                    className={`relative z-20 flex w-full lg:w-[36%] ${isReversed ? "lg:justify-end lg:-mr-18 lg:pl-0 lg:pr-4" : "lg:justify-start lg:-ml-18 lg:pl-4 lg:pr-0"}`}
                >
                    <div className="w-full max-w-[28rem] space-y-5 rounded-[1.75rem] border border-stone-300/85 bg-[#e4e0da] p-6 shadow-[0_28px_60px_-42px_rgba(31,24,20,0.42)] sm:p-7 lg:p-7 xl:p-8">
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/75 to-transparent" />

                        {/* Subtitle */}
                        <span className="block text-sm font-medium uppercase tracking-widest text-gold">
                            {service.subtitle}
                        </span>

                        {/* Title */}
                        <h3 className="font-serif text-4xl leading-[0.98] text-foreground md:text-5xl lg:text-[3.35rem] xl:text-[3.6rem]">
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-base leading-relaxed text-foreground/78 lg:text-[1.02rem]">
                            {service.description}
                        </p>

                        {/* Features list */}
                        <div className="grid grid-cols-1 gap-x-6 gap-y-2 pt-1 sm:grid-cols-2">
                            {service.features.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2 text-sm text-foreground/85"
                                >
                                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-gold" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-2">
                            <Button
                                asChild
                                size="lg"
                                className="group bg-foreground px-7 font-medium text-background transition-all duration-300 hover:bg-gold hover:text-white"
                            >
                                <NavLink href={service.slug === "prices" ? "/prices" : `/prices/${service.slug}`}>
                                    Explore Treatment
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </NavLink>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function ServicesSection() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="py-20 md:py-28 lg:py-36 bg-amber-50/50 overflow-hidden relative" id="services">
            {/* Subtle decorative background elements */}
            <div className="absolute top-20 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-40 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20 md:mb-28 relative"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                >
                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] font-sans">
                            Signature Services
                        </span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
                    </div>

                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 text-foreground">
                        Explore Galeo Beauty&apos;s <span className="text-gold italic">Signature Treatments</span>
                    </h2>

                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed mb-12">
                        From everyday beauty appointments to advanced aesthetics, explore the treatments clients return for most often at Galeo Beauty.
                        
                    </p>

                    {/* Trust Indicators - Unified Gold Theme */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        {[
                            { icon: "shield", label: "Medical-grade care" },
                            { icon: "check", label: "Clean, professional setup" },
                            { icon: "star", label: "15+ years experience" },
                        ].map((badge, index) => (
                            <motion.div
                                key={badge.label}
                                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : index * 0.1 }}
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
                    className="mt-24 border-t border-border/30 pt-16 md:mt-32"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
                >
                    <div className="overflow-hidden rounded-[2rem] border border-border/40 bg-secondary/10">
                        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                            <div className="relative min-h-[18rem] sm:min-h-[22rem] lg:min-h-[28rem]">
                                <CloudinaryImage
                                    src="/images/interior/galeo-beauty-interior-p1.jpg"
                                    alt="Interior of Galeo Beauty salon in Hartbeespoort"
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 52vw, 100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/5 to-transparent" />
                            </div>

                            <div className="flex items-center px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
                                <div className="max-w-xl">
                                    <span className="mb-4 inline-flex rounded-full border border-gold/30 bg-background/80 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold/90">
                                        Inside Galeo Beauty
                                    </span>
                                    <h3 className="font-serif text-3xl text-foreground sm:text-4xl lg:max-w-[11ch]">
                                        Explore the full treatment menu
                                    </h3>
                                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        Browse every treatment category, current pricing page, and bookable service available at Galeo Beauty,
                                        from advanced aesthetics and facials to nails, lashes, body treatments, and more.
                                    </p>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="mt-8 border-2 border-foreground px-10 font-medium text-foreground hover:bg-foreground hover:text-background"
                                    >
                                        <NavLink href="/prices">
                                            Explore Full Menu
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </NavLink>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
