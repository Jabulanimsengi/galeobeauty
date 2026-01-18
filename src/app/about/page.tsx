"use client";

import { Header, Footer } from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import { NavLink } from "@/components/ui/nav-link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Heart, Shield, Award } from "lucide-react";

const teamMembers = [
    {
        name: "Sarah Johnson",
        role: "Lead Aesthetician",
        bio: "Specializing in advanced dermal therapies and non-surgical rejuvenation.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop",
    },
    {
        name: "Emily Chen",
        role: "Master Nail Artist",
        bio: "Award-winning technician creating wearable art for your fingertips.",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&h=800&fit=crop",
    },
    {
        name: "Maria Santos",
        role: "Senior Therapist",
        bio: "Expert in holistic massage therapies and body contouring.",
        image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&h=800&fit=crop",
    },
    {
        name: "Jessica Williams",
        role: "Creative Director",
        bio: "Color specialist with a passion for transformative hair artistry.",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&h=800&fit=crop",
    },
];

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

export default function AboutPage() {
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
                                The Galeo Standard
                            </span>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[0.9] mb-8">
                                Defined by <span className="text-gold italic">Science</span>.<br />
                                Inspired by <span className="text-gold italic">Art</span>.
                            </h1>
                            <p className="text-muted-foreground text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                We are not just a salon. We are a sanctuary for advanced aesthetics, where medical precision meets the luxury of self-care.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* The Story - Editorial Split */}
                <section className="py-20 lg:py-32 border-y border-border/40">
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
                                    <Image
                                        src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=1000&fit=crop"
                                        alt="Galeo Beauty Philosophy"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>
                                {/* Floating text box */}
                                <div className="absolute -bottom-10 -right-10 bg-background p-8 max-w-xs shadow-2xl border border-gold/20 hidden lg:block">
                                    <p className="font-serif text-2xl italic text-gold">"Beauty is a discipline."</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="font-serif text-4xl lg:text-5xl text-foreground mb-8">
                                    Our <span className="text-gold">Philosophy</span>
                                </h2>
                                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
                                    <p>
                                        At Galeo Beauty, we believe that true radiance is achieved when health and aesthetics align. Our approach is rooted in the understanding that beauty is not superficial—it is biological, structural, and deeply personal.
                                    </p>
                                    <p>
                                        Founded on the principles of clinical excellence, we have curated a menu of treatments that deliver visible, tangible results without compromising on the sensory experience of a luxury spa.
                                    </p>
                                    <p>
                                        From our advanced skin diagnostics to our artisanal nail care, every service is a testament to our obsession with quality.
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

                {/* Values - Icon Grid */}
                <section className="py-20 bg-secondary/20">
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

                {/* Team - The Experts */}
                <section className="py-20 lg:py-32">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="text-center mb-16">
                            <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                                The Artisans
                            </span>
                            <h2 className="font-serif text-4xl lg:text-5xl text-foreground">
                                Meet the <span className="text-gold">Experts</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {teamMembers.map((member, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="group relative cursor-pointer"
                                >
                                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted relative">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="font-serif text-2xl text-white mb-1">{member.name}</h3>
                                            <p className="text-gold text-xs font-bold uppercase tracking-wider mb-3">{member.role}</p>
                                            <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                {member.bio}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 lg:py-32 text-center bg-foreground text-background">
                    <div className="container mx-auto px-4">
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Experience the Difference</h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg font-light">
                            Your journey to your best self begins with a single appointment.
                        </p>
                        <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground h-14 px-10 text-lg rounded-full">
                            <NavLink href="/contact">Book Your Visit</NavLink>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
