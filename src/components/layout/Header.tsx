"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { Menu, Phone, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import { useNavigationLoading } from "@/components/providers/NavigationLoadingProvider";
import {
    SheetClose,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { navItems, businessInfo } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
    const mobileMenuContentId = "mobile-navigation-sheet";
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { startNavigation } = useNavigationLoading();

    useEffect(() => {
        let animationFrame = 0;

        const updateScrollState = () => {
            const nextScrolled = window.scrollY > 24;
            setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
            animationFrame = 0;
        };

        const handleScroll = () => {
            if (animationFrame !== 0) {
                return;
            }

            animationFrame = window.requestAnimationFrame(updateScrollState);
        };

        updateScrollState();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (animationFrame !== 0) {
                window.cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    const handleMobileNavigation = useCallback((href: string) => {
        setIsMobileMenuOpen(false);

        if (href === pathname) {
            return;
        }

        startNavigation();
        startTransition(() => {
            router.push(href);
        });
    }, [pathname, router, startNavigation]);

    const isHomepage = pathname === "/";
    const useTransparentHeader = isHomepage && !isScrolled && !isMobileMenuOpen;
    const mobileToggleIconClass = isMobileMenuOpen || useTransparentHeader ? "text-white" : "text-foreground";

    return (
        <>
            {/* Top Bar removed */}

            {/* Main Header */}
            <header
                className={cn(
                    "inset-x-0 top-0 z-50 isolate transition-shadow duration-300 ease-out",
                    isHomepage ? "fixed" : "sticky",
                    isScrolled && "shadow-lg"
                )}
            >
                {/* Background layer — always rendered, opacity transitions smoothly */}
                <div
                    className={cn(
                        "absolute inset-0 -z-10 bg-background/95 backdrop-blur-md transition-opacity duration-300 ease-out",
                        useTransparentHeader ? "opacity-0" : "opacity-95"
                    )}
                />
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="relative flex h-[4.5rem] items-center justify-between lg:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <button
                                    aria-label="Toggle menu"
                                    aria-controls={mobileMenuContentId}
                                    className="relative z-[60] flex h-12 w-12 items-center justify-center bg-transparent transition-transform duration-200 active:scale-[0.98] focus:outline-none"
                                >
                                    <span className="relative flex h-7 w-7 items-center justify-center">
                                        <Menu
                                            className={cn(
                                                "absolute size-7 transition-all duration-200 ease-out",
                                                mobileToggleIconClass,
                                                isMobileMenuOpen ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                                            )}
                                            strokeWidth={2}
                                        />
                                        <X
                                            className={cn(
                                                "absolute size-7 transition-all duration-200 ease-out",
                                                mobileToggleIconClass,
                                                isMobileMenuOpen ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"
                                            )}
                                            strokeWidth={2}
                                        />
                                    </span>
                                </button>
                            </SheetTrigger>
                            <SheetContent
                                id={mobileMenuContentId}
                                side="left"
                                hideCloseButton
                                className="safe-bottom left-0 w-[min(88vw,22rem)] max-w-[22rem] border-r border-white/10 bg-[#171719] p-0 text-white !gap-0 data-[state=closed]:duration-100 data-[state=open]:duration-100"
                            >
                                <SheetHeader className="relative border-b border-white/10 px-7 pt-7 pb-6">
                                    <SheetClose asChild>
                                        <button
                                            type="button"
                                            aria-label="Close menu"
                                            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/85 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
                                        >
                                            <X className="size-5" strokeWidth={2.1} />
                                        </button>
                                    </SheetClose>
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
                                                <div key={item.href}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMobileNavigation(item.href)}
                                                        className="group inline-flex w-fit items-center py-1 text-[1.05rem] font-medium uppercase tracking-[0.22em] text-white/72 transition-all duration-200 hover:text-white"
                                                    >
                                                        <span>{item.label}</span>
                                                        <span className="ml-3 h-px w-0 bg-gold/80 transition-all duration-200 group-hover:w-8" />
                                                        <span className="overflow-hidden text-gold/80 transition-all duration-200 group-hover:translate-x-1">
                                                            <span className="block opacity-0 group-hover:opacity-100">
                                                                /
                                                            </span>
                                                        </span>
                                                    </button>
                                                </div>
                                            ))}
                                        </nav>

                                        <div className="mt-6">
                                            <Button
                                                size="lg"
                                                className="w-full rounded-[1.35rem] bg-gold py-6 text-base font-semibold text-white hover:bg-gold-dark"
                                                onClick={() => handleMobileNavigation("/prices")}
                                            >
                                                    Book Now
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 px-7 py-5">
                                        <TrackedExternalLink
                                            href={`tel:${businessInfo.phone}`}
                                            trackingContext="header_mobile_phone"
                                            linkType="phone"
                                            linkLabel="Header phone"
                                            className="flex items-center gap-3 text-white/65 transition-colors hover:text-gold"
                                        >
                                            <Phone className="w-5 h-5" />
                                            <span className="text-base">012 111 1730</span>
                                        </TrackedExternalLink>
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
                                className={cn(
                                    "h-14 w-auto transition-all duration-300",
                                    useTransparentHeader && "brightness-0 invert drop-shadow-[0_12px_28px_rgba(0,0,0,0.38)]"
                                )}
                                priority
                                noSpinner
                            />
                        </NavLink>

                        <div className="h-12 w-12 shrink-0" aria-hidden="true" />
                    </div>

                    <div className="hidden h-[6.5rem] items-center justify-between lg:flex">
                        <NavLink href="/" className="relative z-10">
                            <CloudinaryImage
                                src="/images/logo.png"
                                alt="Galeo Beauty"
                                width={200}
                                height={80}
                                className={cn(
                                    "h-16 w-auto transition-all duration-300 sm:h-20 md:h-24",
                                    useTransparentHeader && "brightness-0 invert drop-shadow-[0_18px_40px_rgba(0,0,0,0.42)]"
                                )}
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
                                            "relative z-10 flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-colors duration-300",
                                            "group-hover:text-white",
                                            useTransparentHeader
                                                ? isSpecial
                                                    ? "text-gold"
                                                    : "text-white/85"
                                                : "text-foreground"
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
                                            useTransparentHeader
                                                ? "bg-white/14"
                                                : "bg-gold"
                                        )} />
                                    </NavLink>
                                );
                            })}
                        </nav>

                        <Button
                            asChild
                            className={cn(
                                "font-medium text-white",
                                useTransparentHeader
                                    ? "border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/18"
                                    : "bg-gold hover:bg-gold-dark"
                            )}
                        >
                            <NavLink href="/prices">Book Now</NavLink>
                        </Button>
                    </div>
                </div>
            </header>
        </>
    );
}
