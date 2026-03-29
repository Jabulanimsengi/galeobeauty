"use client";

import dynamic from "next/dynamic";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import { motion } from "framer-motion";
import { Sparkles, Heart, Shield, Award, CheckCircle, MapPin, Clock, Star, Phone, Navigation } from "lucide-react";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

const DeferredMap = dynamic(
    () => import("@/components/ui/DeferredMap").then((mod) => mod.DeferredMap),
    {
        ssr: false,
        loading: () => <div className="h-full min-h-[300px] w-full animate-pulse bg-stone-100" />,
    }
);

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

const priorityLinks = [
    { href: "/prices/hair", label: "Hair Salon" },
    { href: "/prices/nails", label: "Nail Salon" },
    { href: "/prices/massages", label: "Massage" },
    { href: "/prices/permanent-makeup", label: "Permanent Makeup" },
    { href: "/prices/lashes-brows", label: "Lashes & Brows" },
];

export function AboutClient() {
    return (
        <>
            <Header />
            <main className="min-h-screen overflow-x-hidden bg-background">
                <section className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent -z-10" />
                    <div className="container mx-auto max-w-4xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="mb-6 block text-xs font-bold uppercase tracking-[0.22em] text-gold sm:tracking-[0.3em]">
                                About Galeo Beauty
                            </span>
                            <h1 className="mb-6 font-serif text-[2.55rem] leading-[0.92] text-foreground sm:mb-8 sm:text-5xl lg:text-6xl">
                                A Refined <span className="text-gold italic">Beauty Destination</span><br />
                                in <span className="text-gold italic">Hartbeespoort</span>
                            </h1>
                            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl sm:font-light">
                                More than a salon, Galeo Beauty brings together advanced aesthetics, medical-grade skincare, and luxury self-care in one elegant Hartbeespoort setting.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="border-y border-border/40 bg-amber-50/30 py-16 lg:py-32">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-24">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                                    <CloudinaryImage
                                        src="/images/founder_dandi.jpg"
                                        alt="Dandi Meyer, founder of Galeo Beauty in Hartbeespoort"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>
                                <div className="absolute -bottom-10 -right-10 hidden max-w-xs border border-gold/20 bg-background p-8 shadow-2xl lg:block">
                                    <p className="font-serif text-xl italic text-gold">&quot;Beauty is about enhancing what you have.&quot;</p>
                                    <p className="mt-2 text-sm text-muted-foreground">- Dandi Meyer, Founder</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="mb-6 font-serif text-3xl text-foreground sm:mb-8 sm:text-4xl lg:text-5xl">
                                    Our <span className="text-gold">Philosophy</span> at Galeo Beauty
                                </h2>
                                <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:space-y-6 sm:text-lg sm:font-light">
                                    <p>
                                        At Galeo Beauty in Hartbeespoort, we believe true radiance is achieved when health and aesthetics align. Our approach is rooted in the understanding that beauty is biological, structural, and deeply personal.
                                    </p>
                                    <p>
                                        From facials and injectables to hair, nails, lashes, body treatments, and permanent makeup, our treatment menu is designed to bring premium beauty and advanced care together under one roof.
                                    </p>
                                    <p>
                                        Every treatment is intended to deliver visible, thoughtful results while still feeling calm, polished, and deeply cared for.
                                    </p>
                                    <p>
                                        Many of our clients first get to know Galeo Beauty through the trusted feedback we receive on Google and Fresha, which reflects the care, professionalism, and consistency our team is known for.
                                    </p>
                                </div>
                                <div className="mt-10">
                                    <Button asChild size="lg" className="w-full rounded-full bg-gold px-8 text-white hover:bg-gold-dark sm:w-auto">
                                        <NavLink href="/prices">Explore Our Treatments</NavLink>
                                    </Button>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                                    {priorityLinks.map((link) => (
                                        <NavLink
                                            key={link.href}
                                            href={link.href}
                                            className="rounded-full border border-gold/30 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
                                        >
                                            {link.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="bg-rose-50/40 py-16 lg:py-28">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 text-center sm:mb-16"
                        >
                            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.22em] text-gold sm:tracking-[0.3em]">
                                Why Trust Galeo Beauty
                            </span>
                            <h2 className="font-serif text-3xl text-foreground md:text-4xl">
                                Why Trust Galeo Beauty <span className="text-gold">Hartbeespoort</span>
                            </h2>
                        </motion.div>

                        <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-16">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 className="mb-6 font-serif text-2xl text-foreground">Meet Our Founder</h3>
                                <div className="mb-6 rounded-xl border border-border/40 bg-secondary/10 p-6">
                                    <p className="mb-1 text-lg font-semibold text-foreground">Dandi Meyer</p>
                                    <p className="mb-4 text-sm font-medium text-gold">Founder & Lead Practitioner</p>
                                    <div className="space-y-3">
                                        {[
                                            "Certified aesthetic practitioner with 15+ years of experience in Hartbeespoort",
                                            "Trained in advanced injectable techniques and medical aesthetics",
                                            "Dermalogica & QMS Medicosmetics certified skin therapist",
                                            "Specialist in permanent makeup and cosmetic tattooing",
                                            "Ongoing professional development in latest beauty technologies",
                                        ].map((credential, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                                                <span className="text-sm text-muted-foreground">{credential}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h3 className="mb-6 font-serif text-2xl text-foreground">Salon Credentials</h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: Star, title: "4.9 Star Rating", desc: "Based on 190+ verified client reviews across Google and Fresha" },
                                        { icon: Shield, title: "CE-Approved Equipment", desc: "All aesthetic devices are medically certified and regularly maintained" },
                                        { icon: Award, title: "Premium Brand Partners", desc: "Official stockist of Dermalogica, QMS Medicosmetics, and Kryolan" },
                                        { icon: MapPin, title: "Established Since 2020", desc: "Proudly serving Hartbeespoort, Pretoria, and greater Gauteng" },
                                        { icon: Clock, title: "5,000+ Treatments Performed", desc: "From facials to injectables, our team delivers consistent results" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4 rounded-xl border border-border/40 bg-secondary/10 p-4">
                                            <item.icon className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold" />
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="bg-secondary/20 py-16 lg:py-28" id="location">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 text-center sm:mb-16"
                        >
                            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.22em] text-gold sm:tracking-[0.3em]">
                                Our Location
                            </span>
                            <h2 className="mb-4 font-serif text-3xl text-foreground md:text-4xl">
                                Visit Our <span className="text-gold">Salon in Hartbeespoort</span>
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                                Galeo Beauty is a warm, polished destination for beauty and advanced aesthetics near Hartbeespoort Dam.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="h-[300px] overflow-hidden rounded-2xl shadow-xl lg:h-[350px]"
                            >
                                <DeferredMap
                                    latitude={-25.753414}
                                    longitude={27.909252}
                                    zoom={15}
                                    markerTitle="Galeo Beauty"
                                    markerDescription="Shop 6, Landsmeer, Jan Smuts Rd, Hartbeespoort, 0216"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex flex-col justify-center"
                            >
                                <div className="space-y-6 sm:space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-gold/10 p-3 flex-shrink-0">
                                            <MapPin className="h-6 w-6 text-gold" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 font-serif text-xl text-foreground">Salon Address</h3>
                                            <address className="not-italic leading-relaxed text-muted-foreground">
                                                <strong className="text-foreground">Shop 6, Landsmeer</strong><br />
                                                Jan Smuts Road<br />
                                                Hartbeespoort, 0216<br />
                                                North West, South Africa
                                            </address>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-gold/10 p-3 flex-shrink-0">
                                            <Clock className="h-6 w-6 text-gold" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 font-serif text-xl text-foreground">Opening Hours</h3>
                                            <div className="space-y-1 text-muted-foreground">
                                                <p>Monday - Friday: <span className="font-medium text-foreground">8:00 AM - 6:00 PM</span></p>
                                                <p>Saturday: <span className="font-medium text-foreground">8:00 AM - 4:00 PM</span></p>
                                                <p>Sunday: <span className="font-medium text-foreground">Closed</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-gold/10 p-3 flex-shrink-0">
                                            <Phone className="h-6 w-6 text-gold" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 font-serif text-xl text-foreground">Contact Us</h3>
                                            <p className="text-muted-foreground">
                                                Call or WhatsApp: <TrackedExternalLink href="tel:+27121111730" trackingContext="about_phone" linkType="phone" linkLabel="About page phone" className="font-medium text-gold hover:underline">012 111 1730</TrackedExternalLink>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-gold/10 bg-white/80 p-6">
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            Galeo Beauty is proudly located in <strong className="text-foreground">Hartbeespoort</strong> at Landsmeer on Jan Smuts Road. We welcome local clients as well as guests visiting from Pretoria, Centurion, Johannesburg, and the surrounding Hartbeespoort Dam area.
                                        </p>
                                    </div>

                                    <TrackedExternalLink
                                        href="https://www.google.com/maps/dir/?api=1&destination=-25.753414,27.909252"
                                        trackingContext="about_get_directions"
                                        linkType="maps"
                                        linkLabel="Get directions to Galeo Beauty"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-center font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-gold-dark sm:w-fit sm:px-8"
                                    >
                                        <Navigation className="h-5 w-5" />
                                        Get Directions to Galeo Beauty
                                    </TrackedExternalLink>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="bg-stone-50/50 py-16 sm:py-20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {values.map((value, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="rounded-xl border border-transparent p-6 text-center transition-colors duration-300 hover:border-gold/20"
                                >
                                    <h3 className="mb-3 font-serif text-xl text-foreground">{value.title}</h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-foreground py-16 text-center text-background sm:py-20 lg:py-32">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Experience Galeo Beauty in Hartbeespoort</h2>
                        <p className="mx-auto mb-8 max-w-xl text-base font-light text-white/70 sm:mb-10 sm:text-lg">
                            Your next appointment starts with calm, thoughtful care at our Hartbeespoort salon.
                        </p>
                        <Button asChild size="lg" className="h-14 w-full rounded-full bg-gold px-8 text-base text-foreground hover:bg-gold-dark sm:w-auto sm:px-10 sm:text-lg">
                            <NavLink href="/prices">Book Your Visit</NavLink>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
