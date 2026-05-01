"use client";

import { useState } from "react";

import { BookingSheet } from "@/components/booking/BookingSheet";
import { Button } from "@/components/ui/button";
import { getStoredAttribution, trackServiceCtaClick } from "@/lib/attribution";
import type { SelectedTreatment } from "@/lib/booking-types";
import type { ServiceItem } from "@/lib/services-data";

interface LocationServiceBookingButtonProps {
    service: ServiceItem;
    categoryId: string;
    categoryTitle: string;
    label: string;
    className?: string;
}

export function LocationServiceBookingButton({
    service,
    categoryId,
    categoryTitle,
    label,
    className,
}: LocationServiceBookingButtonProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const treatment: SelectedTreatment = {
        categoryId,
        categoryTitle,
        subcategoryId: service.id,
        subcategoryTitle: categoryTitle,
        item: service,
    };

    const handleOpenBooking = () => {
        const currentPage = typeof window !== "undefined" ? window.location.pathname : "/";

        trackServiceCtaClick({
            attribution: getStoredAttribution(),
            bookingType: "treatment",
            currentPage,
            treatmentCount: 1,
            treatmentNames: [service.name],
            ctaContext: "location_service_booking_button",
            ctaLabel: label,
        });
        setIsBookingOpen(true);
    };

    return (
        <>
            <Button className={className} onClick={handleOpenBooking}>
                {label}
            </Button>

            <BookingSheet
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                bookingType="treatment"
                treatments={[treatment]}
            />
        </>
    );
}
