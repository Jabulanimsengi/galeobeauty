"use client";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
            {/* Logo with pulse animation */}
            <div className="relative mb-8">
                <CloudinaryImage
                    src="/images/logo.png"
                    alt="Galeo Beauty"
                    width={200}
                    height={80}
                    className="h-20 w-auto animate-pulse"
                    priority
                    noSpinner
                />
            </div>

            {/* Gold shimmer loading bar */}
            <div className="w-48 h-1 bg-secondary/30 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark rounded-full"
                    style={{
                        width: '50%',
                        animation: 'loading-shimmer 1.5s ease-in-out infinite',
                    }}
                />
            </div>

            {/* Loading text */}
            <p className="mt-4 text-sm text-muted-foreground font-medium tracking-wider uppercase">
                Loading...
            </p>

            {/* CSS for loading animation */}
            <style jsx>{`
                @keyframes loading-shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(300%);
                    }
                }
            `}</style>
        </div>
    );
}
