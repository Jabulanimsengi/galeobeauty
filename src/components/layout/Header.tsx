"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { Phone, X } from "lucide-react";
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

    const mobileToggleIconClass = isMobileMenuOpen ? "text-white" : "text-foreground";

    return (
        <>
            {/* Top Bar removed */}

            {/* Main Header */}
            <header
                className={cn(
                    "inset-x-0 top-0 z-50 isolate transition-[box-shadow] duration-300 ease-out",
                    "sticky",
                    isScrolled && "shadow-lg"
                )}
            >
                {/* Background layer — always rendered, opacity transitions smoothly */}
                <div
                    className={cn(
                        "absolute inset-0 -z-10 transition-all duration-300 ease-out",
                        "border-b border-black/6 bg-background/92 backdrop-blur-xl"
                    )}
                />
                <div
                    className="absolute inset-x-0 bottom-0 -z-10 h-px opacity-95 transition-opacity duration-300 ease-out"
                    style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(194,161,106,0.45) 50%, transparent 100%)",
                    }}
                />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative flex h-[4.5rem] items-center justify-between lg:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <button
                                    aria-label="Toggle menu"
                                    aria-controls={mobileMenuContentId}
                                    className={cn(
                                        "relative z-[60] flex h-11 w-11 touch-manipulation select-none items-center justify-center border transition-all duration-200 active:scale-[0.98] focus:outline-none",
                                        "border-black/8 bg-white/72 backdrop-blur-md",
                                        mobileToggleIconClass,
                                    )}
                                    onPointerDown={(event) => {
                                        if (event.pointerType !== "mouse") {
                                            setIsMobileMenuOpen(true);
                                        }
                                    }}
                                >
                                    <span className="relative block h-5 w-7" aria-hidden="true">
                                        <span
                                            className="absolute left-0 top-0.5 h-0.5 w-7 rounded-full bg-current transition-all duration-200 ease-out"
                                        />
                                        <span
                                            className="absolute left-0 top-2 h-0.5 w-7 rounded-full bg-current transition-all duration-150 ease-out"
                                        />
                                        <span
                                            className="absolute left-0 top-[0.875rem] h-0.5 w-7 rounded-full bg-current transition-all duration-200 ease-out"
                                        />
                                    </span>
                                </button>
                            </SheetTrigger>
                            <SheetContent
                                id={mobileMenuContentId}
                                side="left"
                                hideCloseButton
                                className="safe-bottom left-0 w-[min(88vw,22rem)] max-w-[22rem] border-r border-black/8 bg-white p-0 text-foreground !gap-0 data-[state=closed]:duration-100 data-[state=open]:duration-100"
                            >
                                <SheetHeader className="relative border-b border-black/8 bg-[#17120f] px-7 pt-7 pb-6">
                                    <SheetClose asChild>
                                        <button
                                            type="button"
                                            aria-label="Close menu"
                                            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-none border border-white/14 bg-white/8 text-white/85 transition-all duration-200 hover:border-white/24 hover:bg-white/12 hover:text-white"
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
                                            {navItems.map((item) => (
                                                <div key={item.href}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMobileNavigation(item.href)}
                                                        className="group inline-flex w-fit items-center py-1 text-[1.02rem] font-medium uppercase tracking-[0.22em] text-foreground/82 transition-all duration-200 hover:text-gold"
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
                                                className="w-full rounded-none bg-[#17120f] py-6 text-base font-semibold text-white hover:bg-black"
                                                onClick={() => handleMobileNavigation("/prices")}
                                            >
                                                Book Now
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="border-t border-black/8 px-7 py-5">
                                        <TrackedExternalLink
                                            href={`tel:${businessInfo.phone}`}
                                            trackingContext="header_mobile_phone"
                                            linkType="phone"
                                            linkLabel="Header phone"
                                            className="flex items-center gap-3 text-foreground/65 transition-colors hover:text-gold"
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
                                className="h-[4.1rem] w-auto transition-all duration-300 sm:h-[4.6rem]"
                                priority
                                noSpinner
                            />
                        </NavLink>

                        <div className="h-12 w-12 shrink-0" aria-hidden="true" />
                    </div>

                    <div className="hidden h-[5.8rem] items-center lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-8">
                        <NavLink href="/" className="relative z-10 justify-self-start">
                            <CloudinaryImage
                                src="/images/logo.png"
                                alt="Galeo Beauty"
                                width={200}
                                height={80}
                                className="h-[5.1rem] w-auto transition-all duration-300"
                                priority
                                noSpinner
                            />
                        </NavLink>

                        <nav className="relative flex items-center justify-center gap-1">
                            {navItems.map((item) => {
                                return (
                                    <NavLink
                                        key={item.href}
                                        href={item.href}
                                        className="group relative"
                                    >
                                        <span className={cn(
                                            "relative z-10 flex items-center gap-1.5 px-4 py-2 text-[0.8rem] font-medium uppercase tracking-[0.24em] transition-colors duration-300",
                                            "group-hover:text-gold",
                                            "text-foreground/78"
                                        )}>
                                            {item.label}
                                        </span>

                                        <span className="absolute inset-x-4 bottom-0 h-px origin-center scale-x-0 bg-gold/90 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                    </NavLink>
                                );
                            })}
                        </nav>

                        <Button
                            asChild
                            className={cn(
                                "justify-self-end rounded-none px-6 text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition-colors",
                                "bg-[#17120f] text-white hover:bg-gold hover:text-white"
                            )}
                        >
                            <NavLink href="/prices">Book</NavLink>
                        </Button>
                    </div>
                </div>
            </header>
        </>
    );
}
