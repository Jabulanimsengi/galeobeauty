"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Calendar } from "lucide-react";
import { businessInfo } from "@/lib/constants";

// Custom SVG icons for social platforms
const FacebookIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

// Fresha Calendar/Booking icon
const FreshaIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
    </svg>
);

const socialLinks = [
    {
        name: "WhatsApp",
        href: `https://wa.me/${businessInfo.socials.whatsapp}?text=${encodeURIComponent("Hi, I found you on www.galeobeauty.com and would like to enquire about your services.")}`,
        icon: WhatsAppIcon,
        color: "bg-[#25D366] hover:bg-[#128C7E]",
        label: "Chat with us",
    },
    {
        name: "Fresha",
        href: businessInfo.socials.fresha || "#",
        icon: FreshaIcon,
        color: "bg-[#6B4EE6] hover:bg-[#5438C5]",
        label: "Book Now",
    },
    {
        name: "Instagram",
        href: businessInfo.socials.instagram || "#",
        icon: InstagramIcon,
        color: "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] hover:opacity-90",
        label: "Follow us",
    },
    {
        name: "Facebook",
        href: businessInfo.socials.facebook || "#",
        icon: FacebookIcon,
        color: "bg-[#1877F2] hover:bg-[#0d65d9]",
        label: "Like us",
    },
    {
        name: "TikTok",
        href: businessInfo.socials.tiktok || "#",
        icon: TikTokIcon,
        color: "bg-black hover:bg-gray-800",
        label: "Watch us",
    },
];

export function FloatingSocials() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLabelDismissed, setIsLabelDismissed] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col-reverse items-end gap-2 sm:gap-3">
            {/* Social Icons - Expand upward */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                    transition={{
                                        duration: 0.15,
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                    }}
                                    className={`group flex items-center gap-3 ${social.color} text-white rounded-full shadow-lg transition-all duration-300`}
                                    aria-label={social.name}
                                >
                                    {/* Label - shows on hover, hidden on small screens */}
                                    <span className="hidden sm:block max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[100px] group-hover:pl-4">
                                        {social.label}
                                    </span>
                                    <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                </motion.a>
                            );
                        })}
                    </>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <AnimatePresence mode="wait">
                {isExpanded ? (
                    <motion.button
                        key="close-button"
                        onClick={() => setIsExpanded(false)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all duration-300 hover:bg-foreground/80"
                        whileTap={{ scale: 0.95 }}
                        aria-label="Close social menu"
                    >
                        <X className="h-6 w-6" />
                    </motion.button>
                ) : isLabelDismissed ? (
                    /* Compact icon only */
                    <motion.button
                        key="icon-only-button"
                        onClick={() => setIsExpanded(true)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:bg-[#128C7E] hover:scale-110"
                        whileTap={{ scale: 0.95 }}
                        aria-label="Chat with us on WhatsApp"
                    >
                        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
                    </motion.button>
                ) : (
                    /* Pill with label + dismiss X */
                    <motion.div
                        key="pill-button"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="relative"
                    >
                        {/* Dismiss X — corner badge */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLabelDismissed(true);
                            }}
                            className="absolute -top-2 -right-2 z-10 flex items-center justify-center h-6 w-6 rounded-full bg-foreground/80 text-background shadow-md hover:bg-foreground transition-colors"
                            aria-label="Dismiss label"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>

                        {/* Pill button */}
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="flex items-center gap-2 pl-4 sm:pl-5 py-1.5 sm:py-2 pr-1.5 sm:pr-2 rounded-full bg-[#25D366] text-white shadow-2xl transition-colors hover:bg-[#128C7E]"
                            aria-label="Chat with us on WhatsApp"
                        >
                            <span className="text-sm sm:text-base font-semibold whitespace-nowrap">Chat with us</span>
                            <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/20">
                                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                            </span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
