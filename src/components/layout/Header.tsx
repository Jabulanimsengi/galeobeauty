"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
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
            {/* Top Bar */}
            <div className="hidden md:block bg-foreground/95 text-background py-2 text-sm">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center gap-4">
                        <a
                            href={`https://www.facebook.com`}
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
                            href={`https://www.instagram.com`}
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
                            className="bg-gold hover:bg-gold hover:text-white text-foreground font-medium"
                        >
                            <Link href="/booking">Book Now</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={cn(
                    "sticky top-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-background/95 backdrop-blur-md shadow-lg py-2"
                        : "bg-transparent py-4"
                )}
            >
                <div className="container mx-auto flex justify-between items-center px-4">
                    {/* Logo - Responsive sizing */}
                    <Link href="/" className="relative z-10">
                        <Image
                            src="/images/logo.png"
                            alt="Galeo Beauty"
                            width={200}
                            height={80}
                            className="h-16 sm:h-20 md:h-24 w-auto transition-all duration-300"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation - Nudo-style sliding block */}
                    <nav className="hidden lg:flex items-center gap-0 relative">
                        {navItems.map((item) => (
                            <Link
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
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:block">
                        <Button
                            asChild
                            className="bg-gold hover:bg-gold hover:text-white text-foreground font-medium"
                        >
                            <Link href="/booking">Make a Booking</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Trigger - Modern Animated Hamburger */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <button
                                aria-label="Toggle menu"
                                className="relative z-50 p-2 focus:outline-none"
                            >
                                <div className="flex flex-col justify-center items-center w-8 h-8">
                                    <span className={cn(
                                        "block h-0.5 w-7 bg-foreground transition-all duration-300 ease-out",
                                        isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                                    )} />
                                    <span className={cn(
                                        "block h-0.5 w-7 bg-foreground my-1.5 transition-all duration-300",
                                        isMobileMenuOpen ? "opacity-0" : ""
                                    )} />
                                    <span className={cn(
                                        "block h-0.5 w-7 bg-foreground transition-all duration-300 ease-out",
                                        isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
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
                            <div className="flex-1 overflow-y-auto">
                                {/* Modern Nav Links */}
                                <nav className="flex flex-col mt-8 px-6">
                                    {navItems.map((item, index) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="group relative overflow-hidden py-4 border-b border-background/10"
                                        >
                                            <motion.span
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                                className="relative z-10 block text-xl font-light uppercase tracking-widest text-background/80 transition-colors duration-300 group-hover:text-white"
                                            >
                                                {item.label}
                                            </motion.span>

                                            {/* Hover slide effect */}
                                            <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                        </Link>
                                    ))}
                                </nav>

                                {/* CTA Button */}
                                <div className="px-6 mt-6">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full bg-gold hover:bg-gold hover:text-white text-foreground font-semibold text-lg py-6"
                                    >
                                        <Link
                                            href="/booking"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Book Now
                                        </Link>
                                    </Button>
                                </div>
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
