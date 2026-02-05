"use client";

import { Header, Footer } from "@/components/layout";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Users, Sparkles, Heart, ChevronRight } from "lucide-react";

// Job openings data - easily editable
const jobOpenings = [
    {
        id: 1,
        title: "Senior Aesthetician",
        type: "Full-time",
        location: "Hartbeespoort",
        description: "We're looking for an experienced aesthetician to join our team. You'll be providing advanced skincare treatments and helping clients achieve their beauty goals.",
        requirements: [
            "Minimum 3 years experience in aesthetics",
            "Certified in advanced skin treatments",
            "Excellent client communication skills",
            "Passion for skincare and beauty"
        ],
        isOpen: false
    },
    {
        id: 2,
        title: "Nail Technician",
        type: "Full-time",
        location: "Hartbeespoort",
        description: "Join our nail artistry team! We're seeking a skilled nail technician who can create stunning nail designs and provide excellent manicure/pedicure services.",
        requirements: [
            "2+ years nail technician experience",
            "Proficient in gel, acrylic, and nail art",
            "Strong attention to detail",
            "Creative and trend-aware"
        ],
        isOpen: false
    },
    {
        id: 3,
        title: "Receptionist",
        type: "Part-time",
        location: "Hartbeespoort",
        description: "Be the warm, welcoming face of Galeo Beauty. We need a friendly, organized receptionist to manage appointments and provide exceptional customer service.",
        requirements: [
            "Previous reception or customer service experience",
            "Excellent phone and communication skills",
            "Proficient in booking systems",
            "Professional and friendly demeanor"
        ],
        isOpen: false
    }
];

// Filter to only show open positions
const openPositions = jobOpenings.filter(job => job.isOpen);

const benefits = [
    {
        icon: Users,
        title: "Supportive Team",
        description: "Work alongside passionate professionals in a collaborative environment"
    },
    {
        icon: Sparkles,
        title: "Growth Opportunities",
        description: "Continuous training and career advancement pathways"
    },
    {
        icon: Heart,
        title: "Employee Benefits",
        description: "Competitive salary, staff discounts, and flexible scheduling"
    }
];

export default function CareersPage() {
    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent -z-10" />
                    <div className="container mx-auto text-center max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                                Join Our Team
                            </span>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[0.9] mb-8">
                                Build Your <span className="text-gold italic">Career</span><br />
                                With Us
                            </h1>
                            <p className="text-muted-foreground text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                Join the Galeo Beauty family and be part of a team that's passionate about transforming lives through beauty and wellness.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-16 bg-secondary/20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {benefits.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="text-center p-6 border border-transparent hover:border-gold/20 rounded-xl transition-colors duration-300"
                                >
                                    <benefit.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                                    <h3 className="font-serif text-xl text-foreground mb-3">{benefit.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Job Openings Section */}
                <section className="py-20 lg:py-32">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="text-center mb-16">
                            <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                                Current Openings
                            </span>
                            <h2 className="font-serif text-4xl lg:text-5xl text-foreground">
                                Available <span className="text-gold">Positions</span>
                            </h2>
                        </div>

                        {openPositions.length > 0 ? (
                            <div className="space-y-6 max-w-4xl mx-auto">
                                {openPositions.map((job, i) => (
                                    <motion.div
                                        key={job.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="bg-secondary/30 border border-border/40 rounded-xl p-6 sm:p-8 hover:border-gold/30 transition-colors duration-300"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="font-serif text-2xl text-foreground mb-2">{job.title}</h3>
                                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Briefcase className="w-4 h-4 text-gold" />
                                                        {job.type}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4 text-gold" />
                                                        {job.location}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 border border-green-500/20">
                                                Now Hiring
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground mb-6">{job.description}</p>

                                        <div className="mb-6">
                                            <h4 className="font-semibold text-foreground mb-3">Requirements:</h4>
                                            <ul className="space-y-2">
                                                {job.requirements.map((req, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <ChevronRight className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Button
                                            asChild
                                            className="bg-gold hover:bg-gold-dark text-white rounded-full px-6"
                                        >
                                            <a href="mailto:careers@galeobeauty.com?subject=Application for ${job.title}">
                                                Apply Now
                                            </a>
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-secondary/20 rounded-xl max-w-2xl mx-auto">
                                <Briefcase className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                                <h3 className="font-serif text-2xl text-foreground mb-3">No Open Positions</h3>
                                <p className="text-muted-foreground max-w-md mx-auto">
                                    We don't have any open positions right now, but we're always looking for talented individuals. Send us your CV and we'll keep it on file!
                                </p>
                                <Button
                                    asChild
                                    className="bg-gold hover:bg-gold-dark text-white rounded-full px-6 mt-6"
                                >
                                    <a
                                        href={`https://wa.me/27824447389?text=${encodeURIComponent("Hi Galeo Beauty, I found you on www.galeobeauty.com and I would like to send my CV for a potential career opportunity.")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Send Your CV
                                    </a>
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Reviews Section */}
                <ReviewsSection />

                {/* CTA Section */}
                <section className="py-20 lg:py-32 text-center bg-foreground text-background">
                    <div className="container mx-auto px-4">
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Ready to Join Us?</h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg font-light">
                            Take the first step towards an exciting career in beauty and wellness.
                        </p>
                        <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground h-14 px-10 text-lg rounded-full">
                            <a href="mailto:careers@galeobeauty.com?subject=Career Inquiry">
                                Get in Touch
                            </a>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
