"use client";

import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { Map } from "@/components/ui/map";
import { motion } from "framer-motion";
import { Sparkles, Heart, Shield, Award, CheckCircle, MapPin, Clock, Star, Phone, Navigation } from "lucide-react";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

const values = [
    {
        icon: Shield,
        title: "Clinical Excellence",
        description: "We bridge the gap between medical science and luxury, using only clinically proven technologies."
    },
    {
        icon: Sparkles,
        title: "Curated Luxury",
        description: "Every detail of your experience is designed to transport you to a state of total relaxation."
    },
    {
        icon: Heart,
        title: "Personalized Care",
        description: "No two faces are alike. We customize every treatment to your unique biology and goals."
    },
    {
        icon: Award,
        title: "Expert Artistry",
        description: "Our team consists of master-level practitioners who are true artists in their craft."
    }
];

export function AboutClient() {
    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero - Cinematic Typography */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent -z-10" />
                    <div className="container mx-auto text-center max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                                About Galeo Beauty Hartbeespoort
                            </span>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[0.9] mb-8">
                                Your Premier <span className="text-gold italic">Beauty Salon</span><br />
                                in <span className="text-gold italic">Hartbeespoort</span>
                            </h1>
                            <p className="text-muted-foreground text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                More than a salon — Galeo Beauty is Harties&apos; destination for advanced aesthetics, medical-grade skincare, and luxury self-care near Hartbeespoort Dam.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* The Story - Editorial Split */}
                <section className="py-20 lg:py-32 border-y border-border/40 bg-amber-50/30">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="aspect-[4/5] relative rounded-lg overflow-hidden">
                                    <CloudinaryImage
                                        src="/images/founder_dandi.jpg"
                                        alt="Dandi Meyer - Founder of Galeo Beauty Salon in Hartbeespoort, Harties"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>
                                {/* Floating text box */}
                                <div className="absolute -bottom-10 -right-10 bg-background p-8 max-w-xs shadow-2xl border border-gold/20 hidden lg:block">
                                    <p className="font-serif text-xl italic text-gold">&quot;Beauty is about enhancing what you have.&quot;</p>
                                    <p className="text-muted-foreground text-sm mt-2">— Dandi Meyer, Founder</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="font-serif text-4xl lg:text-5xl text-foreground mb-8">
                                    Our <span className="text-gold">Philosophy</span> at Galeo Beauty Harties
                                </h2>
                                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
                                    <p>
                                        At Galeo Beauty in Hartbeespoort, we believe true radiance is achieved when health and aesthetics align. Our approach is rooted in the understanding that beauty is biological, structural, and deeply personal.
                                    </p>
                                    <p>
                                        We offer 16 specialist treatment categories — from Dermalogica facials, QMS Medicosmetics, and medical skin treatments to injectables &amp; fillers (Hart Aesthetics), body contouring, permanent makeup, IPL &amp; laser, lash &amp; brow artistry, waxing, tinting, hair salon services, hair extensions, nail artistry, sunbed &amp; tanning, and makeup — all under one roof at our Landsmeer salon.
                                    </p>
                                    <p>
                                        Every treatment delivers visible, tangible results while offering the sensory experience of a luxury spa near Hartbeespoort Dam.
                                    </p>
                                </div>
                                <div className="mt-10">
                                    <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">
                                        <NavLink href="/prices">Explore Our Treatments</NavLink>
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* E-E-A-T Credentials Section */}
                <section className="py-20 lg:py-28 bg-rose-50/40">
                    <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                                Why Trust Galeo Beauty
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                                Why Trust Galeo Beauty <span className="text-gold">Hartbeespoort</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
                            {/* Founder Credentials */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 className="font-serif text-2xl text-foreground mb-6">Meet Our Founder</h3>
                                <div className="bg-secondary/10 rounded-xl p-6 border border-border/40 mb-6">
                                    <p className="font-semibold text-foreground text-lg mb-1">Dandi Meyer</p>
                                    <p className="text-gold text-sm font-medium mb-4">Founder & Lead Practitioner</p>
                                    <div className="space-y-3">
                                        {[
                                            "Certified aesthetic practitioner with 15+ years of experience in Hartbeespoort",
                                            "Trained in advanced injectable techniques and medical aesthetics",
                                            "Dermalogica & QMS Medicosmetics certified skin therapist",
                                            "Specialist in permanent makeup and cosmetic tattooing",
                                            "Ongoing professional development in latest beauty technologies",
                                        ].map((credential, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground text-sm">{credential}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Salon Trust Signals */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h3 className="font-serif text-2xl text-foreground mb-6">Salon Credentials</h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: Star, title: "4.9 Star Rating", desc: "Based on 159+ verified client reviews across Google and Fresha" },
                                        { icon: Shield, title: "CE-Approved Equipment", desc: "All aesthetic devices are medically certified and regularly maintained" },
                                        { icon: Award, title: "Premium Brand Partners", desc: "Official stockist of Dermalogica, QMS Medicosmetics, and Kryolan" },
                                        { icon: MapPin, title: "Established Since 2020", desc: "Proudly serving Hartbeespoort, Pretoria, and greater Gauteng" },
                                        { icon: Clock, title: "5,000+ Treatments Performed", desc: "From facials to injectables, our team delivers consistent results" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 bg-secondary/10 rounded-xl border border-border/40">
                                            <item.icon className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-foreground text-sm">{item.title}</p>
                                                <p className="text-muted-foreground text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Visit Our Salon - Location Section for Local SEO */}
                <section className="py-20 lg:py-28 bg-secondary/20" id="location">
                    <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                                Our Location
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Visit Our <span className="text-gold">Salon in Hartbeespoort</span>
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                                Nestled in the heart of Hartbeespoort, Galeo Beauty is your destination for premium beauty treatments and relaxation by the Hartbeespoort Dam.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Map */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="rounded-2xl overflow-hidden shadow-xl h-[300px] lg:h-[350px]"
                            >
                                <Map
                                    latitude={-25.753414}
                                    longitude={27.909252}
                                    zoom={15}
                                    markerTitle="Galeo Beauty"
                                    markerDescription="Shop 6, Landsmeer, Jan Smuts Rd, Hartbeespoort, 0216"
                                />
                            </motion.div>

                            {/* Address & Details */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex flex-col justify-center"
                            >
                                <div className="space-y-8">
                                    {/* Address */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gold/10 rounded-full flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-gold" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-foreground mb-2">Salon Address</h3>
                                            <address className="not-italic text-muted-foreground leading-relaxed">
                                                <strong className="text-foreground">Shop 6, Landsmeer</strong><br />
                                                Jan Smuts Road<br />
                                                Hartbeespoort, 0216<br />
                                                North West, South Africa
                                            </address>
                                        </div>
                                    </div>

                                    {/* Opening Hours */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gold/10 rounded-full flex-shrink-0">
                                            <Clock className="w-6 h-6 text-gold" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-foreground mb-2">Opening Hours</h3>
                                            <div className="text-muted-foreground space-y-1">
                                                <p>Monday – Friday: <span className="text-foreground font-medium">8:00 AM – 6:00 PM</span></p>
                                                <p>Saturday: <span className="text-foreground font-medium">8:00 AM – 4:00 PM</span></p>
                                                <p>Sunday: <span className="text-foreground font-medium">Closed</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gold/10 rounded-full flex-shrink-0">
                                            <Phone className="w-6 h-6 text-gold" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-foreground mb-2">Contact Us</h3>
                                            <p className="text-muted-foreground">
                                                Call or WhatsApp: <a href="tel:+27121111730" className="text-gold hover:underline font-medium">012 111 1730</a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* About the location - SEO text */}
                                    <div className="bg-white/80 rounded-xl p-6 border border-gold/10">
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            Galeo Beauty is proudly located in <strong className="text-foreground">Hartbeespoort</strong>, conveniently situated on Jan Smuts Road at the Landsmeer centre. As the <strong className="text-foreground">top-rated beauty salon in Hartbeespoort</strong>, we serve clients from across the Hartbeespoort Dam area, including Schoemansville, Melodie, Ifafi, Kosmos, Pecanwood, and surrounding estates. We're also just a scenic 45-minute drive from Pretoria and easily accessible from Johannesburg and Centurion.
                                        </p>
                                    </div>

                                    {/* Get Directions CTA */}
                                    <a
                                        href="https://www.google.com/maps/dir/?api=1&destination=-25.753414,27.909252"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300 shadow-lg w-fit"
                                    >
                                        <Navigation className="w-5 h-5" />
                                        Get Directions to Galeo Beauty
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Values - Icon Grid */}
                <section className="py-20 bg-stone-50/50">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="text-center p-6 border border-transparent hover:border-gold/20 rounded-xl transition-colors duration-300"
                                >
                                    <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 lg:py-32 text-center bg-foreground text-background">
                    <div className="container mx-auto px-4">
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Experience Galeo Beauty in Hartbeespoort</h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg font-light">
                            Your journey to your best self begins with a single appointment at our Harties salon.
                        </p>
                        <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground h-14 px-10 text-lg rounded-full">
                            <NavLink href="/prices">Book Your Visit</NavLink>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
