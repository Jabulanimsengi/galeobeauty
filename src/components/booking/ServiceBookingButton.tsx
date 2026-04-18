"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { BookingSheet } from "@/components/booking/BookingSheet";
import type { SelectedTreatment } from "@/lib/booking-types";
import type { ServiceItem } from "@/lib/services-data";

interface ServiceBookingButtonProps {
    item: ServiceItem;
    categoryId: string;
    categoryTitle: string;
    subcategoryId: string;
    subcategoryTitle: string;
}

export function ServiceBookingButton({
    item,
    categoryId,
    categoryTitle,
    subcategoryId,
    subcategoryTitle,
}: ServiceBookingButtonProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const treatment: SelectedTreatment = {
        categoryId,
        categoryTitle,
        subcategoryId,
        subcategoryTitle,
        item,
    };

    return (
        <>
            <button
                onClick={() => setIsBookingOpen(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.35rem] border-2 border-gold bg-gold/10 text-gold transition-all duration-200 hover:bg-gold hover:text-white"
                aria-label={`Book ${item.name}`}
            >
                <Plus className="w-5 h-5" strokeWidth={2.5} />
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
