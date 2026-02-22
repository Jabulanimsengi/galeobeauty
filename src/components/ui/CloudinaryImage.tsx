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
        <Image
            src={localSrc}
            alt={alt || "Image"}
            fill={fill}
            width={width}
            height={height}
            className={cn(className)}
            onLoad={onLoad}
            {...props}
        />
    );
}
