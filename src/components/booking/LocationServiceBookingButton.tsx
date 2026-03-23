"use client";

import { useState } from "react";

import { BookingSheet } from "@/components/booking/BookingSheet";
import { Button } from "@/components/ui/button";
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

    return (
        <>
            <Button className={className} onClick={() => setIsBookingOpen(true)}>
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
