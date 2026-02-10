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
            {/* Top Bar removed */}

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
