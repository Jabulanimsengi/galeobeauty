"use client";

import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, ArrowRight, CheckCircle, Clock, Sparkles, Eye, Hand, Flame, Brush, Zap, HelpCircle } from "lucide-react";
import { businessInfo } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface Service {
    id: string;
    name: string;
    Icon: LucideIcon;
}

const services: Service[] = [
    { id: "facials", name: "Facial Skincare", Icon: Sparkles },
    { id: "nails", name: "Nails & Pedicures", Icon: Hand },
    { id: "lashes", name: "Lashes & Brows", Icon: Eye },
    { id: "massage", name: "Massage Therapy", Icon: Hand },
    { id: "body", name: "Body Contouring", Icon: Flame },
    { id: "makeup", name: "Make-up & PMU", Icon: Brush },
    { id: "ipl", name: "IPL Hair Removal", Icon: Zap },
    { id: "other", name: "Other / Not Sure", Icon: HelpCircle },
];

export default function BookingPage() {
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
                                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                        {/* Step 1: Service Selection */}
                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-4">
                                                1. Select Your Treatment
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                {services.map((service) => (
                                                    <label
                                                        key={service.id}
                                                        className="flex flex-col items-center p-4 rounded-xl border border-border/60 cursor-pointer hover:border-gold/50 hover:bg-gold/5 transition-all peer-checked:border-gold peer-checked:bg-gold/10 text-center"
                                                    >
                                                        <input type="radio" name="service" value={service.id} className="sr-only peer" />
                                                        <service.Icon className="w-6 h-6 text-gold mb-2" />
                                                        <span className="text-xs text-foreground font-medium">{service.name}</span>
                                                    </label>
                                                ))}
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
                                                    className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all placeholder:text-muted-foreground/50"
                                                    required
                                                />
                                                <input
                                                    type="tel"
                                                    placeholder="Phone Number *"
                                                    className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all placeholder:text-muted-foreground/50"
                                                    required
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
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
                                                        className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all text-muted-foreground"
                                                    />
                                                </div>
                                                <select
                                                    className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all text-muted-foreground"
                                                >
                                                    <option>Preferred Time...</option>
                                                    <option>Morning (8am - 12pm)</option>
                                                    <option>Afternoon (12pm - 4pm)</option>
                                                    <option>Late Afternoon (4pm - 6pm)</option>
                                                </select>
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
                                                className="w-full px-4 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-background focus:border-gold outline-none transition-all placeholder:text-muted-foreground/50 resize-none"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <Button className="w-full py-6 text-lg bg-gold text-white hover:bg-gold-dark transition-all duration-300 shadow-lg hover:shadow-gold/30 rounded-xl">
                                            <Sparkles className="w-5 h-5 mr-2" />
                                            Request Booking
                                        </Button>

                                        <p className="text-center text-xs text-muted-foreground">
                                            By submitting, you agree to our 24-hour cancellation policy.
                                            <br />We'll confirm your appointment via WhatsApp or phone call.
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
