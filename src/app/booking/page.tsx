"use client";

import { useState } from "react";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, ArrowRight, CheckCircle, Clock, Sparkles, ChevronDown, Send } from "lucide-react";
import { businessInfo } from "@/lib/constants";
import { serviceCategories, getSubcategoriesForCategory, getItemsForSubcategory } from "@/lib/services-data";
import type { ServiceItem, ServiceSubcategory } from "@/lib/services-data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BookingPage() {
    // Form state
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");
    const [selectedItemId, setSelectedItemId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");

    // Derived data for cascading dropdowns
    const subcategories: ServiceSubcategory[] = selectedCategoryId
        ? getSubcategoriesForCategory(selectedCategoryId)
        : [];

    const items: ServiceItem[] = selectedCategoryId && selectedSubcategoryId
        ? getItemsForSubcategory(selectedCategoryId, selectedSubcategoryId)
        : [];

    // Get selected names for display
    const selectedCategory = serviceCategories.find(c => c.id === selectedCategoryId);
    const selectedSubcategory = subcategories.find(s => s.id === selectedSubcategoryId);
    const selectedItem = items.find(i => i.id === selectedItemId);

    // Reset dependent selections when parent changes
    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setSelectedSubcategoryId("");
        setSelectedItemId("");
    };

    const handleSubcategoryChange = (subcategoryId: string) => {
        setSelectedSubcategoryId(subcategoryId);
        setSelectedItemId("");
    };

    // Format date for display
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Generate WhatsApp message and open link
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Build the message
        const serviceLine = selectedCategory
            ? `*Category:* ${selectedCategory.title}`
            : "";
        const subcategoryLine = selectedSubcategory
            ? `*Treatment Type:* ${selectedSubcategory.title}`
            : "";
        const itemLine = selectedItem
            ? `*Service:* ${selectedItem.name}${selectedItem.duration ? ` (${selectedItem.duration})` : ""}\n*Price:* ${selectedItem.price}`
            : "";

        const message = `🌟 *New Booking Request - Galeo Beauty*
━━━━━━━━━━━━━━━━━

📋 *Service Details*
${serviceLine}
${subcategoryLine}
${itemLine}

👤 *Client Information*
*Name:* ${name}
*Phone:* ${phone}${email ? `\n*Email:* ${email}` : ""}

📅 *Preferred Appointment*
*Date:* ${formatDate(date) || "Not specified"}
*Time:* ${time || "Not specified"}

📝 *Additional Notes:*
${notes || "None"}

━━━━━━━━━━━━━━━━━
Sent via Galeo Beauty Website`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${businessInfo.socials.whatsapp}?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappUrl, "_blank");
    };

    // Check if form is valid
    const isFormValid = name && phone && selectedCategoryId;

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-secondary/30 -z-10" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -z-10" />

                    <div className="container mx-auto px-6 text-center max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full mb-6">
                                <Calendar className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Reservations</span>
                            </div>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                                Book Your <span className="text-gold italic">Treatment</span>
                            </h1>
                            <p className="text-muted-foreground text-lg sm:text-xl font-light max-w-xl mx-auto">
                                Reserve your spot for a transformative beauty experience. We'll confirm within 2 hours.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Booking Form Section */}
                <section className="pb-20 lg:pb-32">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                            {/* Left Sidebar - Trust & Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-2 space-y-8"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden hidden lg:block">
                                    <Image
                                        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop"
                                        alt="Galeo Beauty Experience"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <p className="text-white font-serif text-xl">"An experience like no other"</p>
                                        <p className="text-white/70 text-sm mt-1">— Happy Client</p>
                                    </div>
                                </div>

                                {/* Trust Points */}
                                <div className="bg-secondary/30 rounded-2xl p-6 space-y-4">
                                    <h3 className="font-serif text-xl text-foreground mb-4">Why Book With Us</h3>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">Free consultation included with every first booking</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">Flexible rescheduling up to 24 hours before</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">Confirmation via WhatsApp within 2 hours</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">Complimentary refreshments on arrival</p>
                                    </div>
                                </div>

                                {/* Quick Contact */}
                                <div className="bg-foreground text-background rounded-2xl p-6">
                                    <h3 className="font-serif text-lg mb-3">Prefer to Call?</h3>
                                    <p className="text-white/70 text-sm mb-4">Speak directly with our concierge team</p>
                                    <a href={`tel:${businessInfo.phone}`} className="flex items-center gap-3 text-gold hover:text-gold-light transition-colors">
                                        <Phone className="w-5 h-5" />
                                        <span className="font-semibold">{businessInfo.phone}</span>
                                    </a>
                                </div>
                            </motion.div>

                            {/* Right - Booking Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="lg:col-span-3"
                            >
                                <div className="bg-white rounded-3xl shadow-xl shadow-gold/5 border border-border/40 p-8 lg:p-10">
                                    <form className="space-y-8" onSubmit={handleSubmit}>
                                        {/* Step 1: Cascading Service Selection */}
                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-4">
                                                1. Select Your Treatment
                                            </label>

                                            {/* Category Selection */}
                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <select
                                                        value={selectedCategoryId}
                                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                                        className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all text-foreground appearance-none cursor-pointer"
                                                    >
                                                        <option value="">Select Treatment Category...</option>
                                                        {serviceCategories.map((category) => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                                                </div>

                                                {/* Subcategory Selection - Shows when category selected */}
                                                {selectedCategoryId && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        className="relative"
                                                    >
                                                        <select
                                                            value={selectedSubcategoryId}
                                                            onChange={(e) => handleSubcategoryChange(e.target.value)}
                                                            className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all text-foreground appearance-none cursor-pointer"
                                                        >
                                                            <option value="">Select Treatment Type...</option>
                                                            {subcategories.map((sub) => (
                                                                <option key={sub.id} value={sub.id}>
                                                                    {sub.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                                                    </motion.div>
                                                )}

                                                {/* Item Selection - Shows when subcategory selected */}
                                                {selectedSubcategoryId && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        className="relative"
                                                    >
                                                        <select
                                                            value={selectedItemId}
                                                            onChange={(e) => setSelectedItemId(e.target.value)}
                                                            className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all text-foreground appearance-none cursor-pointer"
                                                        >
                                                            <option value="">Select Specific Service...</option>
                                                            {items.map((item) => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.name} - {item.price}{item.duration ? ` (${item.duration})` : ""}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                                                    </motion.div>
                                                )}

                                                {/* Selected Service Summary */}
                                                {selectedItem && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="bg-gold/10 border border-gold/30 rounded-xl p-4 flex items-center justify-between"
                                                    >
                                                        <div>
                                                            <p className="text-sm text-muted-foreground">Selected Treatment</p>
                                                            <p className="font-semibold text-foreground">{selectedItem.name}</p>
                                                            {selectedItem.duration && (
                                                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    {selectedItem.duration}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-gold">{selectedItem.price}</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Step 2: Contact Info */}
                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-4">
                                                2. Your Details
                                            </label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Full Name *"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all placeholder:text-muted-foreground/50"
                                                    required
                                                />
                                                <input
                                                    type="tel"
                                                    placeholder="Phone Number *"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all placeholder:text-muted-foreground/50"
                                                    required
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all placeholder:text-muted-foreground/50 sm:col-span-2"
                                                />
                                            </div>
                                        </div>

                                        {/* Step 3: Date & Time */}
                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-4">
                                                3. Preferred Date & Time
                                            </label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all text-foreground"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        value={time}
                                                        onChange={(e) => setTime(e.target.value)}
                                                        className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all text-foreground appearance-none cursor-pointer"
                                                    >
                                                        <option value="">Preferred Time...</option>
                                                        <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
                                                        <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
                                                        <option value="Late Afternoon (4pm - 6pm)">Late Afternoon (4pm - 6pm)</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 4: Additional Notes */}
                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-4">
                                                4. Additional Notes <span className="font-normal text-muted-foreground">(Optional)</span>
                                            </label>
                                            <textarea
                                                rows={3}
                                                placeholder="Any specific requests or information we should know..."
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all placeholder:text-muted-foreground/50 resize-none"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <Button
                                            type="submit"
                                            disabled={!isFormValid}
                                            className="w-full py-6 text-lg bg-gold text-white hover:bg-gold-dark transition-all duration-300 shadow-lg hover:shadow-gold/30 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            <Send className="w-5 h-5" />
                                            Book via WhatsApp
                                        </Button>

                                        <p className="text-center text-xs text-muted-foreground">
                                            By submitting, you agree to our 24-hour cancellation policy.
                                            <br />You'll be redirected to WhatsApp to confirm your booking.
                                        </p>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Opening Hours Banner */}
                <section className="py-12 bg-foreground text-background">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <Clock className="w-8 h-8 text-gold" />
                                <div>
                                    <p className="font-serif text-xl">Opening Hours</p>
                                    <p className="text-white/60 text-sm">{businessInfo.hours.weekday} • {businessInfo.hours.saturday}</p>
                                </div>
                            </div>
                            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
                                <Link href="/contact">
                                    View All Contact Info
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
