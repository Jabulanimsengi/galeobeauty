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
    "group flex h-9 w-9 items-center justify-center border border-[#d8dce0] bg-white text-[#1d1d1f] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5d6a72] hover:bg-[#1d1d1f] hover:text-white";

const footerLocations = [
    { name: "Hartbeespoort", href: "/locations/hartbeespoort" },
    { name: "Pecanwood", href: "/locations/pecanwood" },
    { name: "Kosmos", href: "/locations/kosmos" },
    { name: "Hartbeespoort Dam", href: "/locations/hartbeespoort-dam" },
];

const footerServiceCategories = [
    { name: "Hair & Colour", href: "/services/hair" },
    { name: "Hair Extensions", href: "/services/hair-extensions" },
    { name: "Nails", href: "/services/nails" },
    { name: "Lashes & Brows", href: "/services/lashes-brows" },
    { name: "Waxing", href: "/services/waxing" },
    { name: "Massage", href: "/services/massages" },
    { name: "Facials & Skin", href: "/services/dermalogica" },
    { name: "QMS Facials", href: "/services/qms" },
    { name: "IPL Hair Removal", href: "/services/ipl" },
    { name: "Makeup", href: "/services/makeup" },
    { name: "Permanent Makeup", href: "/services/permanent-makeup" },
    { name: "Sunbed & Spray Tan", href: "/services/sunbed" },
    { name: "Fat Freezing", href: "/services/fat-freezing" },
    { name: "Slimming", href: "/services/slimming" },
    { name: "Injectables & Aesthetics", href: "/services/hart-aesthetics" },
    { name: "Medical Treatments", href: "/services/medical" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[#d8dce0] bg-[#f6f7f7] text-foreground">
            <div className="container mx-auto px-4 py-10 sm:px-6 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)_minmax(0,0.8fr)_minmax(16rem,1.3fr)_minmax(0,0.85fr)_auto] lg:gap-6 xl:gap-8">
                    <div className="space-y-4">
                        <NavLink href="/" className="inline-block">
                            <CloudinaryImage
                                src="/images/logo.png"
                                alt="Galeo Beauty logo"
                                width={200}
                                height={80}
                                className="h-12 w-auto object-contain sm:h-14"
                                style={{ width: "auto" }}
                                noSpinner
                            />
                        </NavLink>
                        <p className="max-w-sm font-sans text-[0.82rem] leading-6 text-foreground/68">
                            A calm Hartbeespoort beauty destination for hair, nails, facials, massage, and advanced aesthetics at Landsmeer near Hartbeespoort Dam.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-foreground/55">
                            Visit Us
                        </h3>
                        <div className="space-y-2.5 font-sans text-[0.86rem] leading-6 text-foreground/82">
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

                    <div className="space-y-3">
                        <h3 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-foreground/55">
                            Working Hours
                        </h3>
                        <div className="space-y-2.5 font-sans text-[0.86rem] leading-6 text-foreground/82">
                            <p>{businessInfo.hours.weekday}</p>
                            <p>{businessInfo.hours.saturday}</p>
                            <p>{businessInfo.hours.publicHoliday}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-foreground/55">
                            Our Services
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-sans text-[0.86rem] leading-6 text-foreground/82">
                            {footerServiceCategories.map((category) => (
                                <NavLink
                                    key={category.href}
                                    href={category.href}
                                    className="block transition-colors hover:text-gold"
                                >
                                    {category.name}
                                </NavLink>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <NavLink
                                href="/services"
                                className="inline-flex items-center border border-[#d8dce0] bg-white px-3 py-2 font-sans text-[0.78rem] font-medium text-foreground transition-colors hover:border-[#5d6a72] hover:text-[#5d6a72]"
                            >
                                All Services
                            </NavLink>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-foreground/55">
                            Areas We Serve
                        </h3>
                        <div className="space-y-2 font-sans text-[0.86rem] leading-6 text-foreground/82">
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
                        <div className="flex flex-wrap gap-2">
                            <NavLink
                                href="/locations"
                                className="inline-flex items-center border border-[#d8dce0] bg-white px-3 py-2 font-sans text-[0.78rem] font-medium text-foreground transition-colors hover:border-[#5d6a72] hover:text-[#5d6a72]"
                            >
                                View All Areas
                            </NavLink>
                        </div>
                    </div>

                    <div className="space-y-3 lg:justify-self-end">
                        <h3 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-foreground/55">
                            Follow Us
                        </h3>
                        <div className="flex flex-wrap items-start gap-2 lg:max-w-[5rem] lg:justify-end">
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
                                <FacebookIcon className="h-4 w-4" />
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
                                <InstagramIcon className="h-4 w-4" />
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
                                <TikTokIcon className="h-4 w-4" />
                            </TrackedExternalLink>
                            <TrackedWhatsAppLink
                                message="Hi, I found you on www.galeobeauty.com and would like to enquire about your services."
                                trackingContext="footer_whatsapp_icon"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className={socialLinkClassName}
                            >
                                <WhatsAppIcon className="h-4 w-4" />
                            </TrackedWhatsAppLink>
                        </div>
                    </div>
                </div>

            </div>

            <div className="border-t border-[#d8dce0] bg-white">
                <div className="container mx-auto flex flex-col gap-3 px-4 py-4 font-sans text-[0.78rem] text-foreground/52 sm:px-6 md:flex-row md:items-center md:justify-between">
                    <p>&copy; {currentYear} Galeo Beauty Hartbeespoort. All rights reserved.</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <NavLink href="/services" className="transition-colors hover:text-gold">
                            Services
                        </NavLink>
                        <NavLink href="/guides" className="transition-colors hover:text-gold">
                            Guides
                        </NavLink>
                        <NavLink href="/blog" className="transition-colors hover:text-gold">
                            Blog
                        </NavLink>
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
