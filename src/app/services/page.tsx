"use client";

import { useRef, useState, useEffect } from "react";
import { Header, Footer } from "@/components/layout";
import { TrustBadge } from "@/components/ui/trust-badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Heart, Eye, Scissors, Star, ChevronRight, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Treatment {
    name: string;
    price: string;
    duration?: string;
    popular?: boolean;
}

interface ServiceCategory {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    image: string;
    icon: React.ElementType;
    badge: string;
    badgeVariant: "medical" | "safe" | "premium";
    color: string;
    treatments: Treatment[];
}

const serviceCategories: ServiceCategory[] = [
    {
        id: "facials",
        title: "Advanced Facials",
        subtitle: "Medical-Grade Skincare",
        description: "Experience transformative results with our Babor professional facials.",
        longDescription: "Our advanced facial treatments combine cutting-edge technology with premium Babor products. Each session is tailored to your unique skin concerns, whether you're addressing aging, acne, pigmentation, or dehydration. Our certified aestheticians analyze your skin and create a customized treatment plan.",
        image: "/images/services/face-care-01.png",
        icon: Sparkles,
        badge: "Medical Grade",
        badgeVariant: "medical",
        color: "from-amber-500/20 to-orange-500/10",
        treatments: [
            { name: "Babor Skinovage Facial", price: "R850", duration: "60 min" },
            { name: "HSR Anti-ageing Facial", price: "R1,200", duration: "75 min", popular: true },
            { name: "Dr. Babor Custom Treatment", price: "R1,500", duration: "90 min" },
            { name: "Microneedling + Ampoules", price: "R1,800", duration: "60 min" },
            { name: "Chemical Peel (Level 1)", price: "R950", duration: "45 min" },
            { name: "Chemical Peel (Level 2)", price: "R1,250", duration: "60 min" },
        ],
    },
    {
        id: "body",
        title: "Body Contouring",
        subtitle: "Non-Invasive Sculpting",
        description: "CE-approved cryolipolysis and RF skin tightening treatments.",
        longDescription: "Achieve your body goals without surgery. Our body contouring suite features CE-approved technologies that target stubborn fat, tighten skin, and smooth cellulite. Each treatment is performed by trained specialists who understand body anatomy and aesthetic goals.",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=1000&fit=crop",
        icon: Zap,
        badge: "CE Approved",
        badgeVariant: "safe",
        color: "from-emerald-500/20 to-teal-500/10",
        treatments: [
            { name: "Cryolipolysis (1 Cup)", price: "R2,500", duration: "60 min", popular: true },
            { name: "Cryolipolysis (2 Cups)", price: "R4,000", duration: "90 min" },
            { name: "RF Skin Tightening (Abdomen)", price: "R850", duration: "45 min" },
            { name: "RF Skin Tightening (Thighs)", price: "R950", duration: "45 min" },
            { name: "IPL Hair Removal (Full Leg)", price: "R1,800", duration: "60 min" },
            { name: "Full Body Spray Tan", price: "R450", duration: "30 min" },
        ],
    },
    {
        id: "lashes",
        title: "Lash Extensions",
        subtitle: "Premium Silk & Volume",
        description: "Full, beautiful lashes applied by certified technicians.",
        longDescription: "Wake up every day with perfect lashes. Our certified lash technicians use premium silk and synthetic materials to create looks ranging from natural enhancement to full glamour. Every application follows strict hygiene protocols for your safety and comfort.",
        image: "/images/services/lashes.png",
        icon: Eye,
        badge: "Premium",
        badgeVariant: "premium",
        color: "from-rose-500/20 to-pink-500/10",
        treatments: [
            { name: "Classic Silk Full Set", price: "R650", duration: "90 min" },
            { name: "Hybrid Lashes", price: "R750", duration: "120 min", popular: true },
            { name: "Russian Volume 4D/5D", price: "R950", duration: "150 min" },
            { name: "Lash Lift & Tint", price: "R450", duration: "60 min" },
            { name: "Brow Lamination", price: "R400", duration: "45 min" },
        ],
    },
    {
        id: "nails",
        title: "Nail Artistry",
        subtitle: "Hygienic Nail Care",
        description: "Medical pedicures and stunning nail art in a sterile environment.",
        longDescription: "Our nail studio combines artistry with medical-grade hygiene. From classic manicures to intricate nail art, every service uses sterilized tools and premium products. Our medical pedicures address nail health concerns with professional care.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=1000&fit=crop",
        icon: Scissors,
        badge: "Hygienic",
        badgeVariant: "medical",
        color: "from-violet-500/20 to-purple-500/10",
        treatments: [
            { name: "Acrylic Full Set", price: "R450", duration: "90 min", popular: true },
            { name: "Gel Overlay (Hands)", price: "R350", duration: "60 min" },
            { name: "Medical Pedicure", price: "R550", duration: "75 min" },
            { name: "Spa Pedicure & Gel", price: "R450", duration: "60 min" },
            { name: "Nail Art (Per Nail)", price: "R20+", duration: "varies" },
        ],
    },
    {
        id: "massage",
        title: "Massage Therapy",
        subtitle: "Therapeutic Wellness",
        description: "Relax with our Lilien Terry massage treatments.",
        longDescription: "Escape into tranquility with our therapeutic massage menu. Our trained therapists customize each session to address your specific needs, whether you seek relaxation, pain relief, or muscle recovery. Using premium oils and techniques, we restore balance to body and mind.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=1000&fit=crop",
        icon: Heart,
        badge: "Therapeutic",
        badgeVariant: "premium",
        color: "from-sky-500/20 to-blue-500/10",
        treatments: [
            { name: "Swedish Massage", price: "R650", duration: "60 min", popular: true },
            { name: "Deep Tissue Therapy", price: "R750", duration: "60 min" },
            { name: "Aromatherapy Massage", price: "R700", duration: "60 min" },
            { name: "Indian Head Massage", price: "R450", duration: "30 min" },
            { name: "Hot Stone Therapy", price: "R800", duration: "75 min" },
        ],
    },
    {
        id: "makeup",
        title: "Make-up & PMU",
        subtitle: "Professional Artistry",
        description: "Kryolan professional make-up and permanent make-up services.",
        longDescription: "From bridal elegance to everyday enhancement, our make-up artists create looks that celebrate your unique beauty. Our permanent make-up services use advanced techniques and pigments for natural, long-lasting results. Every service includes a thorough consultation.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop",
        icon: Star,
        badge: "Expert",
        badgeVariant: "premium",
        color: "from-fuchsia-500/20 to-pink-500/10",
        treatments: [
            { name: "Bridal Make-up", price: "R1,500", duration: "90 min", popular: true },
            { name: "Microbladed Phi-Brows", price: "R2,200", duration: "120 min" },
            { name: "Permanent Lip Liner", price: "R2,500", duration: "90 min" },
            { name: "Powder Brows", price: "R2,000", duration: "120 min" },
            { name: "Make-up Class (Group)", price: "R850", duration: "180 min" },
        ],
    },
];

interface ServiceCardProps {
    category: ServiceCategory;
    index: number;
    isReversed: boolean;
}

function ServiceCard({ category, index, isReversed }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredTreatment, setHoveredTreatment] = useState<number | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse parallax effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["3deg", "-3deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

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

    const IconComponent = category.icon;

    return (
        <motion.section
            id={category.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="scroll-mt-32"
        >
            <div
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 xl:gap-24 items-start`}
            >
                {/* Image Side */}
                <motion.div
                    ref={cardRef}
                    className="lg:w-[45%] w-full perspective-1000 lg:sticky lg:top-32"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX: isHovered ? rotateX : 0,
                        rotateY: isHovered ? rotateY : 0,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <div className="relative aspect-[3/4] max-h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl group">
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} z-0`} />

                        {/* Main Image */}
                        <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 45vw"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0 transition-opacity duration-500" />

                        {/* Badge */}
                        <div className="absolute top-6 right-6 z-20">
                            <TrustBadge variant={category.badgeVariant} icon="shield">
                                {category.badge}
                            </TrustBadge>
                        </div>

                        {/* Floating number */}
                        <motion.div
                            className="absolute top-6 left-6 z-20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <span className="font-serif text-8xl font-bold text-white/15 select-none">
                                0{index + 1}
                            </span>
                        </motion.div>

                        {/* Bottom content */}
                        <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                            <span className="text-white/90 text-sm font-medium uppercase tracking-wider mb-3 block">
                                {category.subtitle}
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">
                                {category.title}
                            </h2>
                            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
                                {category.description}
                            </p>
                        </div>

                        {/* Decorative frame on hover */}
                        <motion.div
                            className="absolute inset-4 border-2 border-white/20 rounded-2xl pointer-events-none"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.95 }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>
                </motion.div>

                {/* Pricing Side */}
                <div className="lg:w-[55%] w-full space-y-8">
                    {/* Section intro - visible on mobile, hidden on lg */}
                    <div className="lg:hidden">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-gold/10">
                                <IconComponent className="w-5 h-5 text-gold" />
                            </div>
                            <span className="text-gold text-sm font-medium uppercase tracking-wider">
                                {category.subtitle}
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl text-foreground mb-4">
                            {category.title}
                        </h2>
                    </div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {category.longDescription}
                        </p>
                    </motion.div>

                    {/* Treatment Menu */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-1"
                    >
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                            <h3 className="font-serif text-xl text-foreground">Treatment Menu</h3>
                            <span className="text-sm text-muted-foreground">{category.treatments.length} services</span>
                        </div>

                        {category.treatments.map((treatment, idx) => (
                            <motion.div
                                key={idx}
                                className={cn(
                                    "group relative flex items-center justify-between gap-2 sm:gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer",
                                    hoveredTreatment === idx
                                        ? "bg-gold/10 shadow-sm"
                                        : "hover:bg-secondary/50"
                                )}
                                onMouseEnter={() => setHoveredTreatment(idx)}
                                onMouseLeave={() => setHoveredTreatment(null)}
                                initial={{ opacity: 0, x: isReversed ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                            >
                                {/* Left side - Name and duration */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "font-medium text-foreground transition-colors",
                                            hoveredTreatment === idx && "text-gold"
                                        )}>
                                            {treatment.name}
                                        </span>
                                        {treatment.popular && (
                                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gold text-white rounded-full">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    {treatment.duration && (
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Clock className="w-3 h-3 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">{treatment.duration}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Right side - Price and action */}
                                <div className="flex items-center gap-4">
                                    <span className={cn(
                                        "font-serif text-xl font-semibold transition-colors",
                                        hoveredTreatment === idx ? "text-gold" : "text-foreground"
                                    )}>
                                        {treatment.price}
                                    </span>
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{
                                            opacity: hoveredTreatment === idx ? 1 : 0,
                                            x: hoveredTreatment === idx ? 0 : -10
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronRight className="w-5 h-5 text-gold" />
                                    </motion.div>
                                </div>

                                {/* Animated underline */}
                                <motion.div
                                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-gold/30 origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: hoveredTreatment === idx ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Book Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="pt-6"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto bg-foreground hover:bg-gold text-background hover:text-white font-medium px-10 py-6 text-base transition-all duration-300 group rounded-xl"
                        >
                            <Link href="/booking">
                                <Calendar className="w-5 h-5 mr-2" />
                                Book {category.title}
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}

// Sticky Navigation Component
function StickyNavigation({
    activeSection,
    isVisible
}: {
    activeSection: string;
    isVisible: boolean;
}) {
    const navRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    useEffect(() => {
        // Update indicator position when active section changes
        if (navRef.current) {
            const activeButton = navRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
            if (activeButton) {
                setIndicatorStyle({
                    left: activeButton.offsetLeft,
                    width: activeButton.offsetWidth,
                });
            }
        }
    }, [activeSection]);

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
        >
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Back */}
                    <Link href="/" className="font-serif text-xl text-foreground">
                        Galeo
                    </Link>

                    {/* Navigation Pills */}
                    <nav
                        ref={navRef}
                        className="relative flex items-center gap-0.5 sm:gap-1 overflow-x-auto hide-scrollbar px-2 sm:px-0"
                    >
                        {/* Animated background indicator */}
                        <motion.div
                            className="absolute h-9 bg-foreground rounded-full -z-10"
                            initial={false}
                            animate={{
                                left: indicatorStyle.left,
                                width: indicatorStyle.width,
                            }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />

                        {serviceCategories.map((category) => (
                            <Link
                                key={category.id}
                                href={`#${category.id}`}
                                data-section={category.id}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 rounded-full",
                                    activeSection === category.id
                                        ? "text-background"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {category.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Book CTA */}
                    <Button
                        asChild
                        size="sm"
                        className="bg-gold hover:bg-gold-dark text-white font-medium hidden sm:flex"
                    >
                        <Link href="/booking">Book Now</Link>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

export default function ServicesPage() {
    const [activeSection, setActiveSection] = useState("facials");
    const [showStickyNav, setShowStickyNav] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Track scroll position to show/hide sticky nav
    useMotionValueEvent(scrollY, "change", (latest) => {
        // Show sticky nav after scrolling past hero section
        const heroHeight = heroRef.current?.offsetHeight || 400;
        setShowStickyNav(latest > heroHeight - 100);
    });

    // Intersection Observer for active section tracking
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        serviceCategories.forEach((category) => {
            const element = document.getElementById(category.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Header />

            {/* Sticky Navigation */}
            <StickyNavigation activeSection={activeSection} isVisible={showStickyNav} />

            <main className="bg-background min-h-screen">
                {/* Editorial Hero */}
                <section ref={heroRef} className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/50 to-transparent -z-10" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -z-10" />

                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm mb-6 block">
                                    Treatment Menu
                                </span>
                                <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl text-foreground leading-[0.95] mb-8">
                                    THE <span className="italic text-gold">MENU</span>
                                </h1>
                                <p className="text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
                                    Discover our curated collection of medical-grade treatments and luxury wellness services.
                                    Each treatment is customizable to meet your unique beauty goals.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Initial Navigation Bar - transforms into sticky */}
                <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-y border-border/30">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="relative py-4 overflow-x-auto hide-scrollbar">
                            <nav className="flex items-center justify-center gap-2 min-w-max mx-auto">
                                {serviceCategories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`#${category.id}`}
                                        className={cn(
                                            "relative px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 rounded-full border",
                                            activeSection === category.id
                                                ? "bg-foreground text-background border-foreground"
                                                : "bg-transparent text-foreground border-border hover:border-gold hover:text-gold"
                                        )}
                                    >
                                        {category.title}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Service Categories */}
                <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-24">
                    <div className="space-y-32 lg:space-y-48">
                        {serviceCategories.map((category, index) => (
                            <ServiceCard
                                key={category.id}
                                category={category}
                                index={index}
                                isReversed={index % 2 !== 0}
                            />
                        ))}
                    </div>
                </div>

                {/* Final CTA Section */}
                <section className="relative py-24 lg:py-32 overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0 bg-foreground" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-10" />

                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                                    Personalized Care
                                </span>
                                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background mb-6">
                                    Not Sure Where <span className="italic">to Start?</span>
                                </h2>
                                <p className="text-background/70 text-lg mb-10 max-w-xl mx-auto">
                                    Book a complimentary consultation with our specialists. We'll help you create
                                    a personalized treatment plan tailored to your unique goals.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-gold hover:bg-gold-light text-foreground font-medium px-10 py-6 text-base rounded-xl"
                                    >
                                        <Link href="/booking">
                                            Book Consultation
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-background/30 text-background hover:bg-background hover:text-foreground font-medium px-10 py-6 text-base rounded-xl"
                                    >
                                        <Link href="/contact">
                                            Contact Us
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
