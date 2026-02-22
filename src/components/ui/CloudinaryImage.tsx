"use client";

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from "@/lib/utils";

interface CloudinaryImageProps extends Omit<ImageProps, "src"> {
    src: string;
    noSpinner?: boolean;
    // We intentionally ignore Cloudinary-specific props that might have been passed
    width?: number | `${number}`;
    height?: number | `${number}`;
}

export function CloudinaryImage({ src, alt, className, fill, noSpinner, onLoad, width, height, ...props }: CloudinaryImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Format the source so it works locally. (We assume most src strings are paths like "/images/...")
    let localSrc = src;
    if (!localSrc.startsWith('/') && !localSrc.startsWith('http')) {
        localSrc = `/${localSrc}`;
    }

    // Safety fallback for Cloudinary specific edge cases where maybe .jpg was removed earlier
    if (localSrc.indexOf('.') === -1 && !localSrc.startsWith('http')) {
        // Just a catch-all if someone passed a publicId without extension
        // It's safer to just let the standard Next Image fail gracefully or handle it.
        // For Galeo, all current images have extensions.
    }

    return (
        <>
            {!noSpinner && isLoading && (
                <div
                    className={cn(
                        "flex items-center justify-center bg-black/5 z-0",
                        fill ? "absolute inset-0" : "w-full h-full min-h-[100px]",
                        className?.includes('rounded') ? className.match(/rounded-[a-z0-9]+/)?.[0] : 'rounded-lg'
                    )}
                >
                    <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-gold border-t-transparent rounded-full animate-spin opacity-70"></div>
                </div>
            )}
            <Image
                src={localSrc}
                alt={alt || "Image"}
                fill={fill}
                width={width}
                height={height}
                className={cn(
                    "transition-opacity duration-500",
                    isLoading && !noSpinner ? "opacity-0" : "opacity-100",
                    className
                )}
                onLoad={(e) => {
                    setIsLoading(false);
                    if (onLoad) onLoad(e);
                }}
                {...props}
            />
        </>
    );
}
