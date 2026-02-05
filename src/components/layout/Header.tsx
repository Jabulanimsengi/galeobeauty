"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { navItems, businessInfo } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Top Bar - Hidden when scrolled */}
            <div className={cn(
                "hidden md:block bg-foreground/95 text-background py-2 text-sm transition-all duration-300",
                isScrolled ? "h-0 py-0 overflow-hidden opacity-0" : "opacity-100"
            )}>
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center gap-4">
                        <a
                            href={businessInfo.socials.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="hover:text-gold transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a
                            href={businessInfo.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="hover:text-gold transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                        <a
                            href={businessInfo.socials.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                            className="hover:text-gold transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                        </a>
                        <a
                            href={`https://wa.me/${businessInfo.socials.whatsapp}?text=${encodeURIComponent("Hi, I found you on www.galeobeauty.com and would like to enquire about your services.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className="hover:text-[#25D366] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href={`tel:${businessInfo.phone}`}
                            className="flex items-center gap-2 hover:text-gold transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            <span>012 111 1730</span>
                        </a>
                        <Button
                            asChild
                            size="sm"
                            className="bg-gold hover:bg-gold-dark text-white font-medium"
                        >
                            <Link href="/prices">Book Now</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={cn(
                    "sticky top-0 z-50 transition-all duration-300 isolate",
                    isScrolled
                        ? "bg-background/95 backdrop-blur-md shadow-lg py-2"
                        : "bg-transparent py-4"
                )}
                style={{ transform: 'translateZ(0)' }}
            >
                <div className="container mx-auto flex justify-between items-center px-4">
                    {/* Logo - Responsive sizing */}
                    <NavLink href="/" className="relative z-10">
                        <Image
                            src="/images/logo.png"
                            alt="Galeo Beauty"
                            width={200}
                            height={80}
                            className="h-16 sm:h-20 md:h-24 w-auto transition-all duration-300"
                            priority
                        />
                    </NavLink>

                    {/* Desktop Navigation - Nudo-style sliding block */}
                    <nav className="hidden lg:flex items-center gap-0 relative">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.href}
                                href={item.href}
                                className="group relative overflow-hidden"
                            >
                                {/* Text layer */}
                                <span className="relative z-10 block px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-colors duration-300 text-foreground/70 group-hover:text-white">
                                    {item.label}
                                </span>

                                {/* Sliding background block - only on hover */}
                                <span className="absolute inset-0 bg-gold transition-transform duration-300 ease-out -translate-x-full group-hover:translate-x-0" />
                            </NavLink>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:block">
                        <Button
                            asChild
                            className="bg-gold hover:bg-gold-dark text-white font-medium"
                        >
                            <NavLink href="/prices">Make a Booking</NavLink>
                        </Button>
                    </div>

                    {/* Mobile Menu Trigger - Simple Hamburger */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <button
                                aria-label="Toggle menu"
                                className="relative z-50 p-2 focus:outline-none"
                            >
                                <div className="flex flex-col justify-center items-center w-8 h-8 gap-1.5">
                                    <span className={cn(
                                        "block h-0.5 w-6 bg-foreground transition-transform duration-200",
                                        isMobileMenuOpen && "rotate-45 translate-y-2"
                                    )} />
                                    <span className={cn(
                                        "block h-0.5 w-6 bg-foreground transition-opacity duration-200",
                                        isMobileMenuOpen && "opacity-0"
                                    )} />
                                    <span className={cn(
                                        "block h-0.5 w-6 bg-foreground transition-transform duration-200",
                                        isMobileMenuOpen && "-rotate-45 -translate-y-2"
                                    )} />
                                </div>
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[300px] sm:w-[400px] bg-foreground text-background border-none p-0 flex flex-col"
                        >
                            <SheetHeader className="p-6 pb-0">
                                <SheetTitle className="text-left">
                                    <Image
                                        src="/images/logo.png"
                                        alt="Galeo Beauty"
                                        width={200}
                                        height={80}
                                        className="h-20 w-auto brightness-0 invert"
                                    />
                                </SheetTitle>
                            </SheetHeader>

                            {/* Scrollable content area */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                                {/* Nav Links - Staggered Slide-in Animation (Right to Left) */}
                                <nav className="flex flex-col mt-8 px-6 overflow-hidden">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: 40 }}
                                            animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                                            transition={{
                                                duration: 0.35,
                                                delay: isMobileMenuOpen ? 0.1 + index * 0.1 : 0,
                                                ease: [0.25, 0.1, 0.25, 1]
                                            }}
                                        >
                                            <NavLink
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="group relative overflow-hidden py-4 border-b border-background/10 block"
                                            >
                                                <span className="relative z-10 block text-xl font-light uppercase tracking-widest text-background/80 transition-colors duration-200 group-hover:text-white">
                                                    {item.label}
                                                </span>

                                                {/* Hover slide effect */}
                                                <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-200" />
                                            </NavLink>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* CTA Button - Slides in after nav items */}
                                <motion.div
                                    className="px-6 mt-6"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                                    transition={{
                                        duration: 0.35,
                                        delay: isMobileMenuOpen ? 0.1 + navItems.length * 0.1 : 0,
                                        ease: [0.25, 0.1, 0.25, 1]
                                    }}
                                >
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full bg-gold hover:bg-gold-dark text-white font-semibold text-lg py-6"
                                    >
                                        <NavLink
                                            href="/prices"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Book Now
                                        </NavLink>
                                    </Button>
                                </motion.div>
                            </div>

                            {/* Contact Info - Fixed at bottom */}
                            <div className="p-6 border-t border-background/10 mt-auto">
                                <a
                                    href={`tel:${businessInfo.phone}`}
                                    className="flex items-center gap-3 text-background/60 hover:text-gold transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span className="text-lg">012 111 1730</span>
                                </a>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
        </>
    );
}
