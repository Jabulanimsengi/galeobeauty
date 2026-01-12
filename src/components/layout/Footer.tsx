import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

import { navItems, businessInfo } from "@/lib/constants";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-foreground text-background">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/">
                            <Image
                                src="/images/logo.png"
                                alt="Galeo Beauty"
                                width={240}
                                height={100}
                                className="h-32 w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-background/70 text-sm leading-relaxed">
                            Your destination for premium skincare and beauty treatments.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href={businessInfo.socials.facebook || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-all"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href={businessInfo.socials.instagram || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-all"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-4 text-gold">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-background/70 hover:text-gold transition-colors text-sm"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-4 text-gold">
                            Contact
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-background/70">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
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
                                    <Phone className="w-4 h-4 text-gold" />
                                    <span>012 111 1730</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${businessInfo.email}`}
                                    className="flex items-center gap-3 text-sm text-background/70 hover:text-gold transition-colors"
                                >
                                    <Mail className="w-4 h-4 text-gold" />
                                    <span>{businessInfo.email}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-4 text-gold">
                            Hours
                        </h4>
                        <ul className="space-y-2 text-sm text-background/70">
                            <li>{businessInfo.hours.weekday}</li>
                            <li>{businessInfo.hours.saturday}</li>
                            <li>{businessInfo.hours.publicHoliday}</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-background/10 mt-12 pt-8 text-center">
                    <p className="text-background/50 text-sm">
                        &copy; {currentYear} Galeo Beauty. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
