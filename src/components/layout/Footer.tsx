"use client";

import Link from "next/link";
import { NavLink } from "@/components/ui/nav-link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Clock } from "lucide-react";

import { navItems, businessInfo } from "@/lib/constants";
import { FeaturedInLocal } from "@/components/ui/featured-in";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-foreground text-background">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-10">
                    {/* Brand Column */}
                    <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                        <NavLink href="/">
                            <Image
                                src="/images/logo.png"
                                alt="Galeo Beauty"
                                width={180}
                                height={60}
                                className="h-16 sm:h-20 md:h-24 w-auto object-contain brightness-0 invert"
                            />
                        </NavLink>
                        <p className="text-background/70 text-sm leading-relaxed max-w-xs">
                            Your destination for premium skincare and beauty treatments at Hartbeespoort Dam.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href={businessInfo.socials.facebook || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-all duration-300"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href={businessInfo.socials.instagram || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-all duration-300"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href={businessInfo.socials.tiktok || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-all duration-300"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                            <a
                                href={`https://wa.me/${businessInfo.socials.whatsapp}?text=${encodeURIComponent("Hi, I found you on www.galeobeauty.com and would like to enquire about your services.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Top Areas */}
                    <div>
                        <h4 className="text-lg font-bold uppercase tracking-wide mb-5 text-white">
                            Top Areas
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <NavLink
                                    href="/locations/hartbeespoort"
                                    className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block"
                                >
                                    Hartbeespoort
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/locations/pretoria"
                                    className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block"
                                >
                                    Pretoria
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/locations/johannesburg"
                                    className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block"
                                >
                                    Johannesburg
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/locations/centurion"
                                    className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block"
                                >
                                    Centurion
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/locations/sandton"
                                    className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block"
                                >
                                    Sandton
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/locations"
                                    className="text-gold hover:text-gold/80 transition-colors text-sm hover:translate-x-1 inline-block font-medium"
                                >
                                    View All Areas →
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold uppercase tracking-wide mb-5 text-white">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <NavLink
                                        href={item.href}
                                        className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block"
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                            <li>
                                <NavLink
                                    href="/careers"
                                    className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block"
                                >
                                    Careers
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Services - Internal Linking for SEO */}
                    <div className="lg:hidden xl:block">
                        <h4 className="text-lg font-bold uppercase tracking-wide mb-5 text-white">
                            Services
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <NavLink href="/permanent-makeup" className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block">
                                    Permanent Makeup
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/body-contouring" className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block">
                                    Body Contouring
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/anti-aging" className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block">
                                    Anti-Aging
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/laser-hair-removal" className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block">
                                    Laser Hair Removal
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/medical-spa" className="text-background/70 hover:text-gold transition-colors text-sm hover:translate-x-1 inline-block">
                                    Medical Spa
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/services" className="text-gold hover:text-gold/80 transition-colors text-sm hover:translate-x-1 inline-block font-medium">
                                    View All Services →
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold uppercase tracking-wide mb-5 text-white">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-background/70">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-gold" />
                                <span>
                                    {businessInfo.address.street}
                                    <br />
                                    {businessInfo.address.area}
                                </span>
                            </li>
                            <li>
                                <a
                                    href={`tel:${businessInfo.phone}`}
                                    className="flex items-center gap-3 text-sm text-background/70 hover:text-gold transition-colors"
                                >
                                    <Phone className="w-5 h-5 text-gold" />
                                    <span>012 111 1730</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${businessInfo.email}`}
                                    className="flex items-center gap-3 text-sm text-background/70 hover:text-gold transition-colors"
                                >
                                    <Mail className="w-5 h-5 text-gold" />
                                    <span>{businessInfo.email}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-lg font-bold uppercase tracking-wide mb-5 text-white">
                            Opening Hours
                        </h4>
                        <ul className="space-y-3 text-sm text-background/70">
                            <li className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-gold" />
                                <span>{businessInfo.hours.weekday}</span>
                            </li>
                            <li className="pl-8">{businessInfo.hours.saturday}</li>
                            <li className="pl-8 text-gold text-xs">{businessInfo.hours.publicHoliday}</li>
                        </ul>
                    </div>
                </div>

                {/* Trusted Brands Section */}
                <div className="mt-12 pt-8 border-t border-background/10">
                    <FeaturedInLocal />
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-background/10">
                <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-background/50 text-xs sm:text-sm text-center sm:text-left">
                        &copy; {currentYear} Galeo Beauty. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs sm:text-sm text-background/50">
                        <NavLink href="/privacy-policy" className="hover:text-gold transition-colors">
                            Privacy Policy
                        </NavLink>
                        <NavLink href="/terms-of-service" className="hover:text-gold transition-colors">
                            Terms of Service
                        </NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}
