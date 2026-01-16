"use client";

import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Map } from "@/components/ui/map";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, Instagram, Facebook } from "lucide-react";
import { businessInfo } from "@/lib/constants";
import { motion } from "framer-motion";
import Link from "next/link";

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
                            Get in <span className="text-gold">Touch</span>
                        </h1>
                        <p className="text-muted-foreground text-base leading-relaxed font-light max-w-2xl mx-auto">
                            We'd love to hear from you. Reach out via phone, email, or visit our sanctuary at Hartbeespoort Dam.
                        </p>
                    </div>
                </section>

                {/* Quick Contact Cards */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {/* Call Card */}
                            <motion.a
                                href={`tel:${businessInfo.phone}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 border border-transparent hover:border-gold/20 cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                                    <Phone className="w-7 h-7 text-gold group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-serif text-2xl text-foreground mb-2">Call Us</h3>
                                <p className="text-muted-foreground mb-4">Speak directly with our concierge</p>
                                <p className="text-gold font-semibold text-lg group-hover:underline">{businessInfo.phone}</p>
                            </motion.a>

                            {/* Email Card */}
                            <motion.a
                                href={`mailto:${businessInfo.email}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 border border-transparent hover:border-gold/20 cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                                    <Mail className="w-7 h-7 text-gold group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-serif text-2xl text-foreground mb-2">Email Us</h3>
                                <p className="text-muted-foreground mb-4">We respond within 24 hours</p>
                                <p className="text-gold font-semibold text-lg group-hover:underline">{businessInfo.email}</p>
                            </motion.a>

                            {/* Hours Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 border border-transparent hover:border-gold/20"
                            >
                                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                                    <Clock className="w-7 h-7 text-gold group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-serif text-2xl text-foreground mb-2">Opening Hours</h3>
                                <div className="text-muted-foreground space-y-1">
                                    <p>{businessInfo.hours.weekday}</p>
                                    <p>{businessInfo.hours.saturday}</p>
                                    <p className="text-gold text-sm">{businessInfo.hours.publicHoliday}</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Location Section - Interactive Mapbox Map */}
                <section className="py-16 lg:py-20 bg-secondary/20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                            {/* Location Info Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gold/10"
                            >
                                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                                    <MapPin className="w-7 h-7 text-gold" />
                                </div>
                                <h3 className="font-serif text-2xl text-foreground mb-2">Visit Our Salon</h3>
                                <p className="text-muted-foreground mb-1">{businessInfo.address.street}</p>
                                <p className="text-muted-foreground mb-6">{businessInfo.address.area}</p>
                                <Button asChild className="w-full bg-gold text-white hover:bg-gold-dark">
                                    <a href="https://www.google.com/maps/search/?api=1&query=Galeo+Beauty+Hartbeespoort" target="_blank" rel="noopener noreferrer">
                                        Get Directions
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </a>
                                </Button>
                            </motion.div>

                            {/* Map Container */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="lg:col-span-2 h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-border/40"
                            >
                                <Map
                                    latitude={-25.754209}
                                    longitude={27.909613}
                                    zoom={14}
                                    className="w-full h-full"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

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
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Floating WhatsApp Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <a
                    href={`https://wa.me/${businessInfo.socials.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 hover:shadow-[#25D366]/40 transition-all duration-300"
                    aria-label="Chat on WhatsApp"
                >
                    <MessageCircle className="h-7 w-7" />
                </a>
            </div>
        </>
    );
}
