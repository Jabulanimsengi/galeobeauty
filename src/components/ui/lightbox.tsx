"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Share2, Check } from "lucide-react";

interface LightboxProps {
    images: { src: string; alt: string; title?: string; subtitle?: string }[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
}

export function Lightbox({ images, initialIndex = 0, isOpen, onClose }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
    const [copied, setCopied] = React.useState(false);
    const imagePanelRef = React.useRef<HTMLDivElement | null>(null);

    // Safety fallback just in case the images array changes size unexpectedly
    const validIndex = currentIndex < images.length && currentIndex >= 0 ? currentIndex : 0;
    const activeImage = images[validIndex];

    React.useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setCopied(false);
        }
    }, [initialIndex, isOpen]);

    React.useEffect(() => {
        if (isOpen) {
            imagePanelRef.current?.focus();
        }
    }, [isOpen, validIndex]);

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "ArrowLeft":
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                    break;
                case "ArrowRight":
                    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, images.length, onClose]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    const handleShare = async () => {
        const currentImage = images[validIndex];
        const urlToShare = `${window.location.origin}${currentImage.src}`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Check out this image from Galeo Beauty!',
                    text: currentImage.alt,
                    url: urlToShare,
                });
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(urlToShare);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    if (!images.length) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 bg-[radial-gradient(circle_at_top,rgba(24,24,24,0.5),rgba(0,0,0,0.985))] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    {/* Share Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleShare();
                        }}
                        className="absolute top-4 right-16 md:right-20 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white flex items-center gap-2 group"
                        aria-label="Share image"
                        title="Share image"
                    >
                        {copied ? (
                            <>
                                <Check className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                                <span className="hidden sm:block text-sm font-medium pr-1 text-green-400">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Share2 className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                                <span className="hidden sm:block text-sm font-medium pr-1">Share</span>
                            </>
                        )}
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 transition-colors text-white"
                        aria-label="Close lightbox"
                    >
                        <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 z-10 text-white/70 text-sm">
                        {validIndex + 1} / {images.length}
                    </div>

                    {/* Previous Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                        className="absolute left-4 z-10 p-3 rounded-full bg-black/45 hover:bg-black/65 transition-colors text-white"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div
                        className="mx-4 flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4 py-20 md:py-24"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <motion.div
                            key={validIndex}
                            ref={imagePanelRef}
                            tabIndex={-1}
                            className="relative w-full flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Image
                                src={activeImage.src}
                                alt={activeImage.alt}
                                fill
                                className="object-contain"
                                sizes="(max-width: 1280px) 100vw, 1280px"
                                priority
                            />
                        </motion.div>

                        <div className="w-full rounded-[20px] border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md md:px-5">
                            <div className="max-w-3xl">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/90">
                                    {activeImage.subtitle || "Galeo Beauty Gallery"}
                                </p>
                                <h3 className="mt-1.5 font-serif text-base text-white md:text-lg">
                                    {activeImage.title || activeImage.alt}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        className="absolute right-4 z-10 p-3 rounded-full bg-black/45 hover:bg-black/65 transition-colors text-white"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook to manage lightbox state
export function useLightbox() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [initialIndex, setInitialIndex] = React.useState(0);

    const open = React.useCallback((index: number = 0) => {
        setInitialIndex(index);
        setIsOpen(true);
    }, []);

    const close = React.useCallback(() => setIsOpen(false), []);

    return { isOpen, initialIndex, open, close };
}
