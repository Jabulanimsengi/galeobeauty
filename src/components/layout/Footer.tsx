"use client";

import { NavLink } from "@/components/ui/nav-link";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import { TrackedWhatsAppLink } from "@/components/tracking/TrackedWhatsAppLink";

import { businessInfo } from "@/lib/constants";

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const socialLinkClassName =
    "group flex h-12 w-12 items-center justify-center rounded-[0.35rem] border border-[#1d1d1f]/10 bg-white text-[#1d1d1f] shadow-[0_16px_34px_-24px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/35 hover:bg-[#1d1d1f] hover:text-white";

const footerLocations = [
    { name: "Hartbeespoort", href: "/locations/hartbeespoort" },
    { name: "Pecanwood", href: "/locations/pecanwood" },
    { name: "Kosmos", href: "/locations/kosmos" },
    { name: "Hartbeespoort Dam", href: "/locations/hartbeespoort-dam" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/30 bg-[#f7f4ef] text-foreground">
            <div className="container mx-auto px-4 py-14 sm:px-6 md:py-20">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)_minmax(0,0.95fr)_minmax(0,0.95fr)_auto] lg:gap-12 xl:gap-14">
                    <div className="space-y-5">
                        <NavLink href="/" className="inline-block">
                            <CloudinaryImage
                                src="/images/logo.png"
                                alt="Galeo Beauty logo"
                                width={200}
                                height={80}
                                className="h-16 w-auto object-contain sm:h-20"
                                noSpinner
                            />
                        </NavLink>
                        <p className="max-w-sm font-sans text-sm leading-relaxed text-foreground/68">
                            A calm Hartbeespoort beauty destination for hair, nails, facials, massage, and advanced aesthetics at Landsmeer near Hartbeespoort Dam.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-foreground/60">
                            Visit Us
                        </h3>
                        <div className="space-y-4 font-sans text-[1rem] leading-relaxed text-foreground/88">
                            <p>
                                {businessInfo.address.street}<br />
                                {businessInfo.address.area}<br />
                                {businessInfo.address.city}
                            </p>
                            <p>
                                Tel:{" "}
                                <TrackedExternalLink
                                    href={`tel:${businessInfo.phone}`}
                                    trackingContext="footer_phone"
                                    linkType="phone"
                                    linkLabel="Call salon"
                                    className="text-gold transition-colors hover:text-gold-dark"
                                >
                                    012 111 1730
                                </TrackedExternalLink>
                            </p>
                            <p>
                                WhatsApp:{" "}
                                <TrackedWhatsAppLink
                                    message="Hi, I found you on www.galeobeauty.com and would like to enquire about your services."
                                    trackingContext="footer_whatsapp_text"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gold transition-colors hover:text-gold-dark"
                                >
                                    {businessInfo.cell}
                                </TrackedWhatsAppLink>
                            </p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-foreground/60">
                            Working Hours
                        </h3>
                        <div className="space-y-4 font-sans text-[1rem] leading-relaxed text-foreground/88">
                            <p>{businessInfo.hours.weekday}</p>
                            <p>{businessInfo.hours.saturday}</p>
                            <p>{businessInfo.hours.publicHoliday}</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-foreground/60">
                            Areas We Serve
                        </h3>
                        <div className="space-y-3 font-sans text-[1rem] leading-relaxed text-foreground/88">
                            {footerLocations.map((location) => (
                                <NavLink
                                    key={location.href}
                                    href={location.href}
                                    className="block transition-colors hover:text-gold"
                                >
                                    {location.name}
                                </NavLink>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <NavLink
                                href="/locations"
                                className="inline-flex items-center rounded-[0.35rem] border border-foreground/18 px-4 py-2 font-sans text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
                            >
                                View All Areas
                            </NavLink>
                            <NavLink
                                href="/salons"
                                className="inline-flex items-center rounded-[0.35rem] border border-gold/40 bg-gold/5 px-4 py-2 font-sans text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-white"
                            >
                                Salon Directory
                            </NavLink>
                        </div>
                    </div>

                    <div className="space-y-4 lg:justify-self-end">
                        <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-foreground/60">
                            Follow Us
                        </h3>
                        <div className="flex flex-wrap items-start gap-3 lg:max-w-[7.5rem] lg:justify-end">
                            <TrackedExternalLink
                                href={businessInfo.socials.facebook || "#"}
                                trackingContext="footer_facebook"
                                linkType="social"
                                linkLabel="Facebook"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className={socialLinkClassName}
                            >
                                <FacebookIcon className="h-5 w-5" />
                            </TrackedExternalLink>
                            <TrackedExternalLink
                                href={businessInfo.socials.instagram || "#"}
                                trackingContext="footer_instagram"
                                linkType="social"
                                linkLabel="Instagram"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className={socialLinkClassName}
                            >
                                <InstagramIcon className="h-5 w-5" />
                            </TrackedExternalLink>
                            <TrackedExternalLink
                                href={businessInfo.socials.tiktok || "#"}
                                trackingContext="footer_tiktok"
                                linkType="social"
                                linkLabel="TikTok"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className={socialLinkClassName}
                            >
                                <TikTokIcon className="h-5 w-5" />
                            </TrackedExternalLink>
                            <TrackedWhatsAppLink
                                message="Hi, I found you on www.galeobeauty.com and would like to enquire about your services."
                                trackingContext="footer_whatsapp_icon"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className={socialLinkClassName}
                            >
                                <WhatsAppIcon className="h-5 w-5" />
                            </TrackedWhatsAppLink>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-border/20 pt-10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-2">
                            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-foreground/60">
                                From The Blog
                            </h3>
                            <p className="max-w-2xl font-sans text-sm leading-relaxed text-foreground/68">
                                Explore every beauty guide, treatment article, and planning post we have published so far.
                            </p>
                        </div>
                        <NavLink
                            href="/blog"
                            className="inline-flex items-center rounded-[0.35rem] border border-foreground/18 px-4 py-2 font-sans text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
                        >
                            View Blog Hub
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="border-t border-border/25">
                <div className="container mx-auto flex flex-col gap-4 px-4 py-6 font-sans text-sm text-foreground/52 sm:px-6 md:flex-row md:items-center md:justify-between">
                    <p>&copy; {currentYear} Galeo Beauty Hartbeespoort. All rights reserved.</p>
                    <div className="flex gap-6">
                        <NavLink href="/privacy-policy" className="transition-colors hover:text-gold">
                            Privacy Policy
                        </NavLink>
                        <NavLink href="/terms-of-service" className="transition-colors hover:text-gold">
                            Terms of Service
                        </NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}
