"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { getStoredAttribution, trackServiceCtaClick } from "@/lib/attribution";
import type { SelectedTreatment } from "@/lib/booking-types";
import type { ServiceItem } from "@/lib/services-data";

interface ServiceBookingButtonProps {
    item: ServiceItem;
    categoryId: string;
    categoryTitle: string;
    subcategoryId: string;
    subcategoryTitle: string;
    label?: string;
    className?: string;
}

export function ServiceBookingButton({
    item,
    categoryId,
    categoryTitle,
    subcategoryId,
    subcategoryTitle,
    label,
    className = "",
}: ServiceBookingButtonProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const treatment: SelectedTreatment = {
        categoryId,
        categoryTitle,
        subcategoryId,
        subcategoryTitle,
        item,
    };

    const handleOpenBooking = () => {
        const currentPage = typeof window !== "undefined" ? window.location.pathname : "/";

        trackServiceCtaClick({
            attribution: getStoredAttribution(),
            bookingType: "treatment",
            currentPage,
            treatmentCount: 1,
            treatmentNames: [item.name],
            ctaContext: "service_booking_button",
            ctaLabel: label ?? "icon_book_button",
        });
        setIsBookingOpen(true);
    };

    return (
        <>
            <button
                onClick={handleOpenBooking}
                className={label
                    ? `inline-flex min-h-11 items-center justify-center gap-2 rounded-none border border-foreground bg-foreground px-8 text-sm font-semibold text-white transition-colors hover:border-gold hover:bg-gold hover:text-white ${className}`
                    : `flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.35rem] border-2 border-gold bg-gold/10 text-gold transition-all duration-200 hover:bg-gold hover:text-white ${className}`}
                aria-label={`Book ${item.name}`}
            >
                {label}
                <Plus className="h-5 w-5" strokeWidth={2.5} />
            </button>

            <BookingSheet
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                bookingType="treatment"
                treatments={[treatment]}
            />
        </>
    );
}
