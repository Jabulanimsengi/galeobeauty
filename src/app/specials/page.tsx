"use client";

import { Header, Footer } from "@/components/layout";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import Link from "next/link";
import { NavLink } from "@/components/ui/nav-link";
import { motion } from "framer-motion";
import { Tag, ArrowRight, Plus, Check } from "lucide-react";
import { useState } from "react";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingCart } from "@/components/booking/BookingCart";
import { SelectedTreatment } from "@/lib/booking-types";

interface SpecialItem {
    id: string;
    service: string;
    originalPrice?: string;
    price: string;
    duration?: string;
}

interface Special {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    discount: string;
    items: SpecialItem[];
}

// Special offers data
const specials: Special[] = [
    {
        id: "facials",
        title: "Facial Glow Package",
        subtitle: "Premium Treatments",
        image: "/images/dermalogica/dermalogica-proskin-treatment.jpeg",
        discount: "30% off",
        items: [
            { id: "special-facial-1", service: "Skinovage Moisturising Facial", originalPrice: "R575", price: "R400", duration: "60 mins" },
            { id: "special-facial-2", service: "HSR Anti-Ageing Facial", originalPrice: "R1,430", price: "R1,000", duration: "75 mins" },
            { id: "special-facial-3", service: "Skin Renewal Peel", originalPrice: "R930", price: "R650", duration: "45 mins" },
        ],
    },
    {
        id: "lashes",
        title: "Lash & Brow Special",
        subtitle: "Frame Your Beauty",
        image: "/images/lashes-brows/fluffy-eyelash-extensions-brown-eyes.png",
        discount: "25% off",
        items: [
            { id: "special-lash-1", service: "Full Set Hybrid Lashes", originalPrice: "R667", price: "R500", duration: "90 mins" },
            { id: "special-lash-2", service: "Russian Volume Lashes", originalPrice: "R1,200", price: "R899", duration: "120 mins" },
            { id: "special-lash-3", service: "Brow Lamination + Tint", originalPrice: "R533", price: "R400", duration: "45 mins" },
        ],
    },
    {
        id: "massage",
        title: "Relaxation Escape",
        subtitle: "Therapeutic Wellness",
        image: "/images/massages/deep-relaxation-neck-massage.jpeg",
        discount: "20% off",
        items: [
            { id: "special-massage-1", service: "Swedish Full Body Massage", originalPrice: "R650", price: "R520", duration: "60 mins" },
            { id: "special-massage-2", service: "Deep Tissue Therapy", originalPrice: "R738", price: "R590", duration: "60 mins" },
            { id: "special-massage-3", service: "Couples Massage Package", originalPrice: "R1,200", price: "R960", duration: "90 mins" },
        ],
    },
    {
        id: "makeup",
        title: "Bridal Season Special",
        subtitle: "Your Perfect Day",
        image: "/images/services/makeup/makeup_01.jpeg",
        discount: "free trial",
        items: [
            { id: "special-makeup-1", service: "Bridal Makeup + Trial", originalPrice: "R1,900", price: "R1,500", duration: "120 mins" },
            { id: "special-makeup-2", service: "Bridal Party (per person)", originalPrice: "R500", price: "R400", duration: "60 mins" },
            { id: "special-makeup-3", service: "Permanent Brows Touch-up", price: "50% OFF", duration: "90 mins" },
        ],
    },
];

export default function SpecialsPage() {
    const [selectedTreatments, setSelectedTreatments] = useState<SelectedTreatment[]>([]);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Check if item is selected
    const isItemSelected = (itemId: string) => {
        return selectedTreatments.some((t) => t.item.id === itemId);
    };

    // Handle toggling treatment selection
    const handleToggleTreatment = (special: Special, item: SpecialItem) => {
        const isSelected = isItemSelected(item.id);
        if (isSelected) {
            setSelectedTreatments((prev) =>
                prev.filter((t) => t.item.id !== item.id)
            );
        } else {
            const treatment: SelectedTreatment = {
                categoryId: special.id,
                categoryTitle: special.title,
                subcategoryId: special.id,
                subcategoryTitle: special.subtitle,
                item: {
                    id: item.id,
                    name: item.service,
                    price: item.price,
                    duration: item.duration || "60 mins",
                },
            };
            setSelectedTreatments((prev) => [...prev, treatment]);
        }
    };

    // Handle removing treatment
    const handleRemoveTreatment = (index: number) => {
        setSelectedTreatments((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle clearing all
    const handleClearAll = () => {
        setSelectedTreatments([]);
    };

    // Handle opening booking
    const handleOpenBooking = () => {
        if (selectedTreatments.length > 0) {
            setIsBookingOpen(true);
        }
    };

    // Handle closing booking
    const handleCloseBooking = () => {
        setIsBookingOpen(false);
        setSelectedTreatments([]);
    };

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero */}
                <section className="relative pt-32 pb-8 lg:pt-40 lg:pb-10 px-6 bg-rose-50/30">
                    <div className="container mx-auto text-center max-w-4xl">
                        <span className="text-gold font-medium uppercase tracking-widest text-xs sm:text-sm block mb-4">
                            Galeo Beauty Hartbeespoort Specials
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            Beauty <span className="text-gold">Specials</span> in Hartbeespoort
                        </h1>
                        <p className="text-muted-foreground text-base leading-relaxed font-light max-w-2xl mx-auto">
                            Exclusive beauty deals at Galeo Beauty Harties. Save on our most popular salon treatments near Hartbeespoort Dam.
                        </p>
                    </div>
                </section>

                {/* Main Content - Flex Layout with Conditional Sidebar */}
                <section className="py-12 lg:py-16 bg-amber-50/20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="flex gap-8 lg:gap-12">
                            {/* Left Column - Specials List */}
                            <div className="flex-1 min-w-0 transition-all duration-300">
                                <div className="space-y-16 lg:space-y-24">
                                    {specials.map((special, idx) => {
                                        const isEven = idx % 2 === 0;
                                        return (
                                            <motion.div
                                                key={special.id}
                                                initial={{ opacity: 0, y: 40 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6 }}
                                                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
                                            >
                                                {/* Image */}
                                                <div className="w-full lg:w-1/2">
                                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                                                        <CloudinaryImage
                                                            src={special.image}
                                                            alt={`${special.title} - Galeo Beauty Salon Hartbeespoort`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        {/* Discount Badge */}
                                                        <div className="absolute top-4 left-4">
                                                            <div className="inline-flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                                                <Tag className="w-3.5 h-3.5" />
                                                                {special.discount}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="w-full lg:w-1/2">
                                                    <span className="text-gold text-sm font-medium uppercase tracking-wider block mb-2">
                                                        {special.subtitle}
                                                    </span>
                                                    <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6">
                                                        {special.title}
                                                    </h2>

                                                    {/* Items List */}
                                                    <div className="space-y-2 mb-8">
                                                        {special.items.map((item) => {
                                                            const isSelected = isItemSelected(item.id);
                                                            return (
                                                                <div
                                                                    key={item.id}
                                                                    onClick={() => handleToggleTreatment(special, item)}
                                                                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer ${isSelected
                                                                        ? 'border-gold bg-gold/5'
                                                                        : 'border-border/50 hover:border-gold/30 hover:bg-secondary/30'
                                                                        }`}
                                                                >
                                                                    <div className="flex-1 pr-4">
                                                                        <span className="text-foreground font-medium block">
                                                                            {item.service}
                                                                        </span>
                                                                        {item.duration && (
                                                                            <span className="text-muted-foreground text-sm block mt-0.5">
                                                                                {item.duration}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex items-center gap-4 shrink-0">
                                                                        <div className="text-right">
                                                                            {item.originalPrice && (
                                                                                <span className="text-muted-foreground line-through text-xs block">
                                                                                    {item.originalPrice}
                                                                                </span>
                                                                            )}
                                                                            <span className="font-semibold text-gold">
                                                                                {item.price}
                                                                            </span>
                                                                        </div>
                                                                        {/* Plus/Check Button */}
                                                                        <div
                                                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isSelected
                                                                                ? 'bg-gold text-white'
                                                                                : 'bg-foreground/10 text-foreground group-hover:bg-gold group-hover:text-white'
                                                                                }`}
                                                                        >
                                                                            {isSelected ? (
                                                                                <Check className="w-5 h-5" />
                                                                            ) : (
                                                                                <Plus className="w-5 h-5" />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right Column - Sticky Booking Summary (Desktop Only) */}
                            {selectedTreatments.length > 0 && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0, x: 50 }}
                                    animate={{ width: 380, opacity: 1, x: 0 }}
                                    exit={{ width: 0, opacity: 0, x: 50 }}
                                    className="hidden lg:block shrink-0"
                                >
                                    <div className="sticky top-[140px]">
                                        <BookingSummary
                                            items={selectedTreatments}
                                            onRemoveItem={handleRemoveTreatment}
                                            onBook={handleOpenBooking}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Reviews Section */}


                {/* Simple CTA */}
                <section className="py-16 bg-foreground text-background">
                    <div className="container mx-auto px-4 sm:px-6 text-center">
                        <h2 className="font-serif text-2xl sm:text-3xl text-background mb-4">
                            Need Help Choosing? Contact Galeo Beauty Hartbeespoort
                        </h2>
                        <p className="text-background/70 max-w-lg mx-auto mb-6">
                            Our Harties beauty specialists are here to help you choose the perfect treatment at our salon.
                        </p>
                        <NavLink
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-foreground px-8 py-3 rounded-full font-medium transition-colors"
                        >
                            Contact Us
                            <ArrowRight className="w-4 h-4" />
                        </NavLink>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Mobile Booking Cart (Hide on Large Screens) */}
            <div className="lg:hidden">
                <BookingCart
                    items={selectedTreatments}
                    onRemoveItem={handleRemoveTreatment}
                    onClearAll={handleClearAll}
                    onBook={handleOpenBooking}
                />
            </div>

            {/* Booking Sheet */}
            <BookingSheet
                isOpen={isBookingOpen}
                onClose={handleCloseBooking}
                treatments={selectedTreatments}
            />
        </>
    );
}
