"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { useNavigationLoading } from "@/components/providers/NavigationLoadingProvider";
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
    const navigationTimerRef = useRef<number | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { startNavigation } = useNavigationLoading();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        return () => {
            if (navigationTimerRef.current) {
                window.clearTimeout(navigationTimerRef.current);
            }
        };
    }, []);

    const handleMobileNavigation = useCallback((href: string) => {
        if (navigationTimerRef.current) {
            window.clearTimeout(navigationTimerRef.current);
            navigationTimerRef.current = null;
        }

        setIsMobileMenuOpen(false);

        if (href === pathname) {
            return;
        }

        startNavigation();
        navigationTimerRef.current = window.setTimeout(() => {
            startTransition(() => {
                router.push(href);
            });
        }, 120);
    }, [pathname, router, startNavigation]);

    return (
        <>
            {/* Top Bar removed */}

            {/* Main Header */}
            <header
                className={cn(
                    "sticky top-0 z-50 transition-all duration-500 ease-out isolate",
                    isScrolled
                        ? "py-2 shadow-lg"
                        : "py-4"
                )}
                style={{ transform: 'translateZ(0)', willChange: 'padding, box-shadow' }}
            >
                {/* Background layer — always rendered, opacity transitions smoothly */}
                <div
                    className={cn(
                        "absolute inset-0 -z-10 bg-background backdrop-blur-md transition-opacity duration-500 ease-out",
                        isScrolled ? "opacity-95" : "opacity-95 lg:opacity-0"
                    )}
                    style={{ willChange: 'opacity' }}
                />
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="relative flex items-center justify-between lg:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <button
                                    aria-label="Toggle menu"
                                    className="relative z-50 flex h-12 w-12 items-center justify-center bg-transparent transition-transform duration-300 active:scale-[0.98] focus:outline-none"
                                >
                                    <span className="relative flex w-7 flex-col items-start gap-[0.38rem]">
                                        <span
                                            className={cn(
                                                "block h-0.5 w-7 origin-left rounded-full transition-all duration-300",
                                                "bg-foreground",
                                                isMobileMenuOpen && "translate-y-[7px] rotate-45"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "block h-0.5 w-5 origin-left rounded-full transition-all duration-300",
                                                "bg-foreground",
                                                isMobileMenuOpen && "opacity-0"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "block h-0.5 w-3 origin-left rounded-full transition-all duration-300",
                                                "bg-foreground",
                                                isMobileMenuOpen && "-translate-y-[7px] w-7 -rotate-45"
                                            )}
                                        />
                                    </span>
                                </button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="safe-bottom left-0 w-[min(88vw,22rem)] max-w-[22rem] border-r border-white/10 bg-[#171719] p-0 text-white !gap-0"
                            >
                                <SheetHeader className="relative border-b border-white/10 px-7 pt-7 pb-6">
                                    <div className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/45">
                                        Galeo Beauty
                                    </div>
                                    <SheetTitle className="text-left">
                                        <CloudinaryImage
                                            src="/images/logo.png"
                                            alt="Galeo Beauty"
                                            width={200}
                                            height={80}
                                            className="h-16 w-auto brightness-0 invert"
                                            noSpinner
                                        />
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <div className="hide-scrollbar flex-1 overflow-y-auto px-7 py-6">
                                        <nav className="flex flex-col gap-5 overflow-hidden">
                                            {navItems.map((item, index) => (
                                                <motion.div
                                                    key={item.href}
                                                    initial={{ opacity: 0, x: -28 }}
                                                    animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
                                                    transition={{
                                                        duration: 0.32,
                                                        delay: isMobileMenuOpen ? 0.08 + index * 0.06 : 0,
                                                        ease: [0.25, 0.1, 0.25, 1]
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMobileNavigation(item.href)}
                                                        className="group inline-flex w-fit items-center py-1 text-[1.05rem] font-medium uppercase tracking-[0.22em] text-white/72 transition-all duration-300 hover:text-white"
                                                    >
                                                        <span>{item.label}</span>
                                                        <span className="ml-3 h-px w-0 bg-gold/80 transition-all duration-300 group-hover:w-8" />
                                                        <span className="overflow-hidden text-gold/80 transition-all duration-300 group-hover:translate-x-1">
                                                            <span className="block opacity-0 group-hover:opacity-100">
                                                                /
                                                            </span>
                                                        </span>
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </nav>

                                        <motion.div
                                            className="mt-6"
                                            initial={{ opacity: 0, x: -28 }}
                                            animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
                                            transition={{
                                                duration: 0.32,
                                                delay: isMobileMenuOpen ? 0.08 + navItems.length * 0.06 : 0,
                                                ease: [0.25, 0.1, 0.25, 1]
                                            }}
                                        >
                                            <Button
                                                size="lg"
                                                className="w-full rounded-[1.35rem] bg-gold py-6 text-base font-semibold text-white hover:bg-gold-dark"
                                                onClick={() => handleMobileNavigation("/prices")}
                                            >
                                                    Book Now
                                            </Button>
                                        </motion.div>
                                    </div>

                                    <div className="border-t border-white/10 px-7 py-5">
                                        <a
                                            href={`tel:${businessInfo.phone}`}
                                            className="flex items-center gap-3 text-white/65 transition-colors hover:text-gold"
                                        >
                                            <Phone className="w-5 h-5" />
                                            <span className="text-base">012 111 1730</span>
                                        </a>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        <NavLink href="/" className="absolute left-1/2 z-10 -translate-x-1/2">
                            <CloudinaryImage
                                src="/images/logo.png"
                                alt="Galeo Beauty"
                                width={170}
                                height={70}
                                className="h-14 w-auto"
                                priority
                                noSpinner
                            />
                        </NavLink>

                        <div className="h-[58px] w-[58px] shrink-0" aria-hidden="true" />
                    </div>

                    <div className="hidden items-center justify-between lg:flex">
                        <NavLink href="/" className="relative z-10">
                            <CloudinaryImage
                                src="/images/logo.png"
                                alt="Galeo Beauty"
                                width={200}
                                height={80}
                                className="h-16 sm:h-20 md:h-24 w-auto transition-all duration-300"
                                priority
                                noSpinner
                            />
                        </NavLink>

                        <nav className="relative flex items-center gap-0">
                            {navItems.map((item) => {
                                const isSpecial = item.href === "/specials";

                                return (
                                    <NavLink
                                        key={item.href}
                                        href={item.href}
                                        className="group relative overflow-hidden"
                                    >
                                        <span className={cn(
                                            "relative z-10 flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-colors duration-300 group-hover:text-white",
                                            isSpecial ? "text-gold" : "text-foreground/70"
                                        )}>
                                            {item.label}
                                            {isSpecial && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                                </span>
                                            )}
                                        </span>

                                        <span className={cn(
                                            "absolute inset-0 transition-transform duration-300 ease-out -translate-x-full group-hover:translate-x-0",
                                            isSpecial ? "bg-gold/90" : "bg-gold"
                                        )} />
                                    </NavLink>
                                );
                            })}
                        </nav>

                        <Button
                            asChild
                            className="bg-gold hover:bg-gold-dark text-white font-medium"
                        >
                            <NavLink href="/prices">Make a Booking</NavLink>
                        </Button>
                    </div>
                </div>
            </header>
        </>
    );
}
