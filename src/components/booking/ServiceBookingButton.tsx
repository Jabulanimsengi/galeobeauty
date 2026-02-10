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
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-gold bg-gold/10 text-gold hover:bg-gold hover:text-white transition-all duration-200"
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
