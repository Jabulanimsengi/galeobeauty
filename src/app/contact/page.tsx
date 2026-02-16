"use client";

import { Header, Footer } from "@/components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Galeo Beauty | Book Your Appointment",
    description: "Get in touch with Galeo Beauty Salon in Hartbeespoort. Call 012 111 1730 or visit us at Shop 6, Landsmeer, Jan Smuts Rd. Book your luxury treatment today.",
    alternates: {
        canonical: "https://www.galeobeauty.com/contact",
    },
};

import { Button } from "@/components/ui/button";
import { Map } from "@/components/ui/map";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, Instagram, Facebook, Smartphone } from "lucide-react";
import { businessInfo } from "@/lib/constants";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="bg-background">
                {/* Hero Section - Simple, No Image */}
                <section className="relative pt-32 pb-8 lg:pt-40 lg:pb-10 px-6 bg-secondary/20">
                    <div className="container mx-auto text-center max-w-4xl">
                        <span className="text-gold font-medium uppercase tracking-widest text-xs sm:text-sm block mb-4">
                            Contact Us
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            <span className="sr-only">Contact Galeo Beauty Hartbeespoort – </span>
                            Get in <span className="text-gold">Touch</span>
                        </h1>
                        <p className="text-muted-foreground text-base leading-relaxed font-light max-w-2xl mx-auto">
                            We'd love to hear from you. Reach out via phone, email, or visit our sanctuary at Hartbeespoort Dam.
                        </p>
                    </div>
                </section>

                {/* Quick Contact Cards */}
                <section className="py-12 lg:py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {/* Landline Card */}
                            <motion.a
                                href={`tel:${businessInfo.phone}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 border border-transparent hover:border-gold/20 cursor-pointer"
                            >
                                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold transition-colors duration-300">
                                    <Phone className="w-6 h-6 text-gold group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-serif text-xl text-foreground mb-1">Landline</h3>
                                <p className="text-muted-foreground text-sm mb-3">Office hours</p>
                                <p className="text-gold font-semibold group-hover:underline">012 111 1730</p>
                            </motion.a>

                            {/* Cell/WhatsApp Card */}
                            <motion.a
                                href={`https://wa.me/${businessInfo.socials.whatsapp}?text=${encodeURIComponent("Hi, I found you on www.galeobeauty.com and would like to enquire about your services.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 border border-transparent hover:border-gold/20 cursor-pointer"
                            >
                                <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-4 group-hover:bg-[#25D366] transition-colors duration-300">
                                    <svg className="w-6 h-6 text-[#25D366] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-xl text-foreground mb-1">WhatsApp</h3>
                                <p className="text-muted-foreground text-sm mb-3">Quick response</p>
                                <p className="text-[#25D366] font-semibold group-hover:underline">{businessInfo.cell}</p>
                            </motion.a>

                            {/* Email Card */}
                            <motion.a
                                href={`mailto:${businessInfo.email}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 border border-transparent hover:border-gold/20 cursor-pointer"
                            >
                                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold transition-colors duration-300">
                                    <Mail className="w-6 h-6 text-gold group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-serif text-xl text-foreground mb-1">Email Us</h3>
                                <p className="text-muted-foreground text-sm mb-3">We respond within 24 hours</p>
                                <p className="text-gold font-semibold group-hover:underline text-sm">{businessInfo.email}</p>
                            </motion.a>

                            {/* Hours Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 border border-transparent hover:border-gold/20"
                            >
                                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold transition-colors duration-300">
                                    <Clock className="w-6 h-6 text-gold group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-serif text-xl text-foreground mb-1">Opening Hours</h3>
                                <div className="text-muted-foreground text-sm space-y-0.5">
                                    <p>{businessInfo.hours.weekday}</p>
                                    <p>{businessInfo.hours.saturday}</p>
                                    <p className="text-gold text-xs">{businessInfo.hours.publicHoliday}</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Location Section with Enhanced 3D Map */}
                <section className="py-12 lg:py-20 bg-secondary/20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                            {/* Location Info Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gold/10 flex flex-col"
                            >
                                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                                    <MapPin className="w-7 h-7 text-gold" />
                                </div>
                                <h3 className="font-serif text-2xl text-foreground mb-2">Visit Our Salon</h3>
                                <p className="text-muted-foreground mb-1">{businessInfo.address.street}</p>
                                <p className="text-muted-foreground mb-1">{businessInfo.address.area}</p>
                                <p className="text-muted-foreground mb-6">{businessInfo.address.city}</p>

                                <div className="mt-auto space-y-3">
                                    <Button asChild className="w-full bg-gold text-white hover:bg-gold-dark">
                                        <a href="https://maps.app.goo.gl/rheE1Ud1GurDRFzQ8" target="_blank" rel="noopener noreferrer">
                                            Get Directions
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </a>
                                    </Button>
                                </div>
                            </motion.div>

                            {/* 3D Map Container */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="lg:col-span-2 h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-border/40"
                            >
                                <Map
                                    latitude={-25.753414}
                                    longitude={27.909252}
                                    zoom={18}
                                    className="w-full h-full"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Reviews Section */}


                {/* Social Footer */}
                <section className="py-16 text-center">
                    <div className="container mx-auto px-6">
                        <p className="text-muted-foreground uppercase tracking-widest text-xs mb-4">Stay Connected</p>
                        <div className="flex justify-center gap-4 mb-8">
                            <a href={businessInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-gold hover:border-gold hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href={businessInfo.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-gold hover:border-gold hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href={businessInfo.socials.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-gold hover:border-gold hover:text-white transition-all">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                            <a href={`https://wa.me/${businessInfo.socials.whatsapp}?text=${encodeURIComponent("Hi, I found you on www.galeobeauty.com and would like to enquire about your services.")}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                            <a href={businessInfo.socials.fresha} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-gold hover:border-gold hover:text-white transition-all">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
