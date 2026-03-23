"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin } from "lucide-react";

import { Footer, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { DeferredMap } from "@/components/ui/DeferredMap";
import { businessInfo } from "@/lib/constants";

export function LocationClient() {
    return (
        <>
            <Header />
            <main className="bg-background">
                <section className="bg-rose-50/30 px-6 pt-32 pb-10 lg:pt-40 lg:pb-14">
                    <div className="container mx-auto max-w-4xl text-center">
                        <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold sm:text-sm">
                            Visit Galeo Beauty
                        </span>
                        <h1 className="mb-6 font-serif text-4xl text-foreground sm:text-5xl lg:text-6xl">
                            Our <span className="text-gold">Salon Location</span> in Hartbeespoort
                        </h1>
                        <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
                            Find us at Landsmeer Estate in Hartbeespoort. This page is focused on
                            where we are, when we are open, and how to get to the salon.
                        </p>
                    </div>
                </section>

                <section className="bg-stone-50/40 py-12 lg:py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid items-stretch gap-8 lg:grid-cols-3">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col rounded-2xl border border-gold/10 bg-white p-8 shadow-lg"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                                    <MapPin className="h-7 w-7 text-gold" />
                                </div>
                                <h2 className="mb-2 font-serif text-2xl text-foreground">
                                    Visit Our Salon
                                </h2>
                                <p className="mb-1 text-muted-foreground">{businessInfo.address.street}</p>
                                <p className="mb-1 text-muted-foreground">{businessInfo.address.area}</p>
                                <p className="mb-6 text-muted-foreground">{businessInfo.address.city}</p>

                                <div className="mb-6 rounded-2xl bg-stone-50 px-5 py-4">
                                    <div className="mb-3 flex items-center gap-2 text-foreground">
                                        <Clock className="h-4 w-4 text-gold" />
                                        <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                                            Opening Hours
                                        </span>
                                    </div>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        <p>{businessInfo.hours.weekday}</p>
                                        <p>{businessInfo.hours.saturday}</p>
                                        <p className="text-gold">{businessInfo.hours.publicHoliday}</p>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <Button asChild className="w-full bg-gold text-white hover:bg-gold-dark">
                                        <a
                                            href="https://maps.app.goo.gl/rheE1Ud1GurDRFzQ8"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Get Directions
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="h-[350px] overflow-hidden rounded-2xl border border-border/40 shadow-lg md:h-[420px] lg:col-span-2 lg:h-[520px]"
                            >
                                <DeferredMap
                                    latitude={-25.753414}
                                    longitude={27.909252}
                                    zoom={18}
                                    className="h-full w-full"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
