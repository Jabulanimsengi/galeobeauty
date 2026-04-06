"use client";

import dynamic from "next/dynamic";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import { TrackedWhatsAppLink } from "@/components/tracking/TrackedWhatsAppLink";
import { businessInfo } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Facebook, Instagram, MapPin } from "lucide-react";

const DeferredMap = dynamic(
    () => import("@/components/ui/DeferredMap").then((mod) => mod.DeferredMap),
    {
        ssr: false,
        loading: () => <div className="h-full min-h-[350px] w-full animate-pulse bg-stone-100" />,
    }
);

const contactMethods = [
    {
        label: "Call the salon",
        detail: businessInfo.phone,
        caption: "Speak to the team during salon hours.",
        href: `tel:${businessInfo.phone}`,
        trackingContext: "contact_phone_primary",
        linkType: "phone",
        linkLabel: "Call the salon",
    },
    {
        label: "WhatsApp us",
        detail: businessInfo.cell ?? "082 444 7389",
        caption: "Best for quick booking questions and availability.",
        isWhatsApp: true,
    },
    {
        label: "Email us",
        detail: businessInfo.email,
        caption: "Ideal for detailed enquiries or group requests.",
        href: `mailto:${businessInfo.email}`,
        trackingContext: "contact_email_primary",
        linkType: "email",
        linkLabel: "Email the team",
    },
] as const;

const socialLinks = [
    {
        href: businessInfo.socials.instagram,
        label: "Instagram",
        trackingContext: "contact_social_instagram",
        icon: Instagram,
    },
    {
        href: businessInfo.socials.facebook,
        label: "Facebook",
        trackingContext: "contact_social_facebook",
        icon: Facebook,
    },
];

export function ContactClient() {
    return (
        <>
            <Header />
            <main className="overflow-x-hidden bg-[#f6efe6] text-foreground">
                <section className="relative overflow-hidden border-b border-black/5 bg-[#f6efe6] pt-28 sm:pt-32 lg:pt-36">
                    <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(201,165,92,0.18),transparent_70%)]" />
                    <div className="grid min-h-[calc(100svh-5.5rem)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
                        <div className="flex items-center px-5 pb-14 sm:px-8 lg:px-12 lg:pb-16 xl:px-16">
                            <div className="max-w-xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.65 }}
                                >
                                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold/95">
                                        Contact Galeo Beauty
                                    </p>
                                    <h1 className="mt-5 max-w-[9.5ch] font-serif text-[2.85rem] leading-[0.92] tracking-[-0.05em] text-[#17120f] sm:text-[3.7rem] lg:text-[4.25rem] xl:text-[4.6rem]">
                                        Book the visit,
                                        <br />
                                        ask the question,
                                        <br />
                                        find the salon.
                                    </h1>
                                    <p className="mt-6 max-w-[34rem] text-base leading-8 text-foreground/72 sm:text-[1.02rem]">
                                        Reach Galeo Beauty by phone, WhatsApp, email, or visit us at Landsmeer in Hartbeespoort for your next hair, nail, lash, skincare, or body treatment booking.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.65, delay: 0.08 }}
                                    className="mt-8 flex flex-wrap items-center gap-4"
                                >
                                    <Button
                                        asChild
                                        size="lg"
                                        className="rounded-none bg-[#17120f] px-7 text-xs font-semibold uppercase tracking-[0.22em] text-white hover:bg-gold hover:text-white sm:text-sm"
                                    >
                                        <TrackedWhatsAppLink
                                            message="Hi, I found you on www.galeobeauty.com and would like to book or enquire about your services."
                                            trackingContext="contact_hero_whatsapp"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Message Us
                                        </TrackedWhatsAppLink>
                                    </Button>

                                    <TrackedExternalLink
                                        href={`tel:${businessInfo.phone}`}
                                        trackingContext="contact_hero_phone"
                                        linkType="phone"
                                        linkLabel="Contact hero phone"
                                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/72 transition-colors hover:text-gold sm:text-sm"
                                    >
                                        Call {businessInfo.phone}
                                    </TrackedExternalLink>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 28 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.65, delay: 0.16 }}
                                    className="mt-10 border-t border-black/10 pt-6"
                                >
                                    <div className="space-y-5">
                                        <div className="flex items-start gap-4">
                                            <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#17120f]" />
                                            <div className="text-sm leading-7 text-foreground/68 sm:text-[0.96rem]">
                                                <p>{businessInfo.address.street}</p>
                                                <p>{businessInfo.address.area}</p>
                                                <p>{businessInfo.address.city}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <Clock className="mt-1 h-5 w-5 shrink-0 text-[#17120f]" />
                                            <div className="text-sm leading-7 text-foreground/68 sm:text-[0.96rem]">
                                                <p>{businessInfo.hours.weekday}</p>
                                                <p>{businessInfo.hours.saturday}</p>
                                                <p>{businessInfo.hours.publicHoliday}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.75, delay: 0.12 }}
                            className="relative min-h-[21rem] overflow-hidden lg:min-h-full"
                        >
                            <CloudinaryImage
                                src="/images/interior/galeo-beauty-interior-p2.jpg"
                                alt="Interior of Galeo Beauty salon in Hartbeespoort"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 48vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-black/10 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-black/8 lg:to-black/38" />
                            <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8 lg:inset-x-auto lg:right-8 lg:bottom-8">
                                <div className="max-w-sm border border-white/12 bg-black/34 px-5 py-5 text-white sm:px-6">
                                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/72">
                                        Visit In Person
                                    </p>
                                    <p className="mt-3 font-serif text-2xl leading-tight">
                                        A calm Hartbeespoort setting for the full Galeo Beauty experience.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="bg-[#fffaf3] py-14 sm:py-16 lg:py-20">
                    <div className="container mx-auto px-5 sm:px-6">
                        <div className="border-y border-black/8">
                            {contactMethods.map((method, index) => (
                                <motion.div
                                    key={method.label}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.45, delay: index * 0.05 }}
                                    className="grid gap-4 py-6 sm:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-6"
                                >
                                    <div>
                                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-gold/95">
                                            {method.label}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-serif text-2xl leading-tight text-[#17120f] sm:text-[2rem]">
                                            {method.detail}
                                        </p>
                                        <p className="mt-1 text-sm leading-7 text-foreground/62 sm:text-[0.96rem]">
                                            {method.caption}
                                        </p>
                                    </div>
                                    <div>
                                        {method.isWhatsApp ? (
                                            <Button
                                                asChild
                                                size="lg"
                                                className="rounded-none bg-[#17120f] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-gold hover:text-white sm:text-sm"
                                            >
                                                <TrackedWhatsAppLink
                                                    message="Hi, I found you on www.galeobeauty.com and would like to enquire about your services."
                                                    trackingContext="contact_row_whatsapp"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Open WhatsApp
                                                </TrackedWhatsAppLink>
                                            </Button>
                                        ) : (
                                            <TrackedExternalLink
                                                href={method.href}
                                                trackingContext={method.trackingContext}
                                                linkType={method.linkType}
                                                linkLabel={method.linkLabel}
                                                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/72 transition-colors hover:text-gold sm:text-sm"
                                            >
                                                Contact now
                                                <ArrowRight className="h-4 w-4" />
                                            </TrackedExternalLink>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-14 sm:py-16 lg:py-20">
                    <div className="container mx-auto px-5 sm:px-6">
                        <div className="grid gap-6 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.12fr)] lg:items-stretch lg:gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col justify-between bg-stone-50 px-6 py-7 sm:px-7 lg:px-8"
                            >
                                <div>
                                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold/95">
                                        Find Galeo Beauty
                                    </p>
                                    <h2 className="mt-4 font-serif text-3xl leading-[0.95] text-[#17120f] sm:text-4xl lg:max-w-[12ch]">
                                        Visit the salon with confidence.
                                    </h2>
                                    <p className="mt-4 max-w-md text-sm leading-7 text-foreground/66 sm:text-[0.96rem]">
                                        Use Google Maps for direct routing, or save the location before you leave if you are driving in from Pretoria, Johannesburg, or nearby Hartbeespoort estates.
                                    </p>

                                    <div className="mt-8 space-y-5 text-foreground/80">
                                        <div className="flex items-start gap-4">
                                            <MapPin className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                                            <div className="text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                                                <p>{businessInfo.address.street}</p>
                                                <p>{businessInfo.address.area}</p>
                                                <p>{businessInfo.address.city}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-wrap items-center gap-4">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="rounded-none bg-[#17120f] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-gold hover:text-white sm:text-sm"
                                    >
                                        <TrackedExternalLink
                                            href={businessInfo.socials.google ?? "#"}
                                            trackingContext="contact_get_directions"
                                            linkType="maps"
                                            linkLabel="Get directions"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Get Directions
                                        </TrackedExternalLink>
                                    </Button>

                                    <TrackedExternalLink
                                        href={`tel:${businessInfo.phone}`}
                                        trackingContext="contact_map_phone"
                                        linkType="phone"
                                        linkLabel="Contact map phone"
                                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/72 transition-colors hover:text-gold sm:text-sm"
                                    >
                                        Call the salon
                                    </TrackedExternalLink>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.55, delay: 0.06 }}
                                className="min-h-[22rem] overflow-hidden border border-border/40 bg-stone-100 shadow-[0_28px_60px_-46px_rgba(31,24,20,0.35)] sm:min-h-[24rem] lg:min-h-[31rem]"
                            >
                                <DeferredMap
                                    latitude={-25.753414}
                                    longitude={27.909252}
                                    zoom={15}
                                    previewTitle="Find Galeo Beauty"
                                    previewDescription="Our location is visible here and opens directly to turn-by-turn directions when you need it."
                                    directionsClassName="rounded-none"
                                    className="h-full w-full"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-black/5 bg-[#f6efe6] py-14 sm:py-16">
                    <div className="container mx-auto px-5 sm:px-6">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold/95">
                                    Stay Connected
                                </p>
                                <h2 className="mt-4 font-serif text-3xl leading-[0.96] text-[#17120f] sm:text-4xl">
                                    Follow the salon, see new work, or book straight from Fresha.
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;

                                    return (
                                        <TrackedExternalLink
                                            key={link.label}
                                            href={link.href}
                                            trackingContext={link.trackingContext}
                                            linkType="social"
                                            linkLabel={link.label}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 border border-black/10 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:border-gold/35 hover:text-gold sm:text-sm"
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{link.label}</span>
                                        </TrackedExternalLink>
                                    );
                                })}

                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-none bg-[#17120f] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-gold hover:text-white sm:text-sm"
                                >
                                    <TrackedExternalLink
                                        href={businessInfo.socials.fresha}
                                        trackingContext="contact_social_fresha"
                                        linkType="booking_platform"
                                        linkLabel="Fresha"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Book on Fresha
                                    </TrackedExternalLink>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
