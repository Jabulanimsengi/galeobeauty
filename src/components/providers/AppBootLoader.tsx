"use client";

import { useEffect, useState } from "react";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { cn } from "@/lib/utils";

export function AppBootLoader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsVisible(false);
        }, 650);

        return () => window.clearTimeout(timer);
    }, []);

    return (
        <div
            className={cn(
                "pointer-events-none fixed inset-0 z-[120] flex flex-col items-center justify-center bg-background transition-opacity duration-500",
                isVisible ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={!isVisible}
        >
            <div className="relative mb-8">
                <CloudinaryImage
                    src="/images/logo.png"
                    alt="Galeo Beauty"
                    width={220}
                    height={88}
                    className="h-20 w-auto"
                    priority
                    noSpinner
                />
            </div>

            <div className="h-1.5 w-44 overflow-hidden rounded-full bg-secondary/40">
                <div className="animate-loading-shimmer h-full w-1/3 rounded-full bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark" />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Loading Galeo Beauty
            </p>
        </div>
    );
}
