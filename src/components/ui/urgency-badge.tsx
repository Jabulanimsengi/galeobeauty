"use client";

import { cn } from "@/lib/utils";

interface UrgencyBadgeProps {
    variant?: "limited-spots" | "booking-fast" | "selling-fast";
    spotsLeft?: number;
    className?: string;
}

export function UrgencyBadge({
    variant = "booking-fast",
    spotsLeft = 3,
    className
}: UrgencyBadgeProps) {
    if (variant === "limited-spots") {
        return (
            <span className={cn("badge-urgency", className)}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Only {spotsLeft} spots left
            </span>
        );
    }

    if (variant === "selling-fast") {
        return (
            <span className={cn("badge-urgency", className)}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                Selling Fast
            </span>
        );
    }

    // Default: booking-fast
    return (
        <span className={cn("badge-booking-fast", className)}>
            Booking Fast
        </span>
    );
}

interface LimitedSpotsIndicatorProps {
    spotsLeft?: number;
    className?: string;
}

export function LimitedSpotsIndicator({
    spotsLeft = 4,
    className
}: LimitedSpotsIndicatorProps) {
    return (
        <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200",
            className
        )}>
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-sm font-medium text-red-700">
                Limited availability – {spotsLeft} spots left this week
            </span>
        </div>
    );
}
