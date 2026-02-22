"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Share2, Check } from "lucide-react";

interface LightboxProps {
    images: { src: string; alt: string }[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
}

export function Lightbox({ images, initialIndex = 0, isOpen, onClose }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
    const [copied, setCopied] = React.useState(false);

    // Track previous isOpen state to accurately reset currentIndex when the lightbox opens
    const [prevIsOpen, setPrevIsOpen] = React.useState(isOpen);
    if (isOpen && !prevIsOpen) {
        setPrevIsOpen(true);
        // Reset index immediately during render to prevent out-of-bounds and flickers
        setCurrentIndex(initialIndex);
    } else if (!isOpen && prevIsOpen) {
        setPrevIsOpen(false);
    }

    // Safety fallback just in case the images array changes size unexpectedly
    const validIndex = currentIndex < images.length && currentIndex >= 0 ? currentIndex : 0;

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
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
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
                        className="absolute top-4 right-16 md:right-20 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white flex items-center gap-2 group"
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
                        className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                        aria-label="Close lightbox"
                    >
                        <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 z-10 text-white/70 text-sm">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Previous Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                        className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Image */}
                    <motion.div
                        key={validIndex}
                        className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[validIndex].src}
                            alt={images[validIndex].alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1280px) 100vw, 1280px"
                            priority
                        />
                    </motion.div>

                    {/* Next Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4 py-2">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(index);
                                }}
                                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${index === currentIndex
                                    ? "border-gold opacity-100"
                                    : "border-transparent opacity-50 hover:opacity-75"
                                    }`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                />
                            </button>
                        ))}
                    </div>
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
