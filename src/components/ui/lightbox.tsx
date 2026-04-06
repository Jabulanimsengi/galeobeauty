"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, SquareArrowOutUpRight, Check } from "lucide-react";

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
    const swipeThreshold = 80;

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

    React.useEffect(() => {
        if (typeof document !== "undefined") {
            document.body.dataset.galleryLightboxOpen = isOpen ? "true" : "false";
        }

        if (typeof window !== "undefined") {
            window.dispatchEvent(
                new CustomEvent("galeo-gallery-lightbox-toggle", {
                    detail: { open: isOpen },
                })
            );
        }

        return () => {
            if (typeof document !== "undefined") {
                document.body.dataset.galleryLightboxOpen = "false";
            }

            if (typeof window !== "undefined") {
                window.dispatchEvent(
                    new CustomEvent("galeo-gallery-lightbox-toggle", {
                        detail: { open: false },
                    })
                );
            }
        };
    }, [isOpen]);

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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black"
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
                        className="absolute top-4 right-16 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-black/45 text-white transition-colors hover:bg-black/70 md:right-20 md:h-12 md:w-12"
                        aria-label="Share image"
                        title="Share image"
                    >
                        {copied ? (
                            <Check className="h-5 w-5 text-green-400 md:h-5 md:w-5" />
                        ) : (
                            <SquareArrowOutUpRight className="h-5 w-5 md:h-5 md:w-5" />
                        )}
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-black/55 text-white transition-colors hover:bg-black/80 md:h-12 md:w-12"
                        aria-label="Close lightbox"
                    >
                        <X className="h-5 w-5 md:h-5 md:w-5" />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 z-20 rounded-2xl border border-white/10 bg-black/35 px-3 py-2 text-xs font-medium tracking-[0.12em] text-white/75 backdrop-blur-sm md:text-sm">
                        {validIndex + 1} / {images.length}
                    </div>

                    {/* Previous Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                        className="absolute left-3 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-white transition-colors hover:bg-black/60 md:left-5 md:h-12 md:w-12"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <div
                        className="flex h-[100svh] w-full items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <motion.div
                            key={validIndex}
                            ref={imagePanelRef}
                            tabIndex={-1}
                            className="relative h-[100svh] w-full overflow-hidden bg-black sm:h-[calc(100svh-1.5rem)] sm:w-[calc(100vw-1.5rem)] sm:rounded-[28px] md:h-[calc(100svh-2rem)] md:w-[calc(100vw-2rem)] md:max-w-[1600px]"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            drag={images.length > 1 ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.12}
                            onDragEnd={(_, info) => {
                                if (info.offset.x <= -swipeThreshold || info.velocity.x <= -500) {
                                    goToNext();
                                } else if (info.offset.x >= swipeThreshold || info.velocity.x >= 500) {
                                    goToPrevious();
                                }
                            }}
                        >
                            <Image
                                src={activeImage.src}
                                alt={activeImage.alt}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />

                            {activeImage.subtitle ? (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:bottom-5">
                                    <p className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/90 backdrop-blur-sm sm:text-[11px]">
                                    {activeImage.subtitle || "Galeo Beauty Gallery"}
                                    </p>
                                </div>
                            ) : null}
                        </motion.div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        className="absolute right-3 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-white transition-colors hover:bg-black/60 md:right-5 md:h-12 md:w-12"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-6 w-6" />
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
