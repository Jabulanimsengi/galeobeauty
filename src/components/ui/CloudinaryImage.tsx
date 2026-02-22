"use client";

import { useState } from 'react';
import { CldImage, CldImageProps } from 'next-cloudinary';
import { cn } from "@/lib/utils";

interface CloudinaryImageProps extends Omit<CldImageProps, "src"> {
    src: string;
    noSpinner?: boolean;
}

export function CloudinaryImage({ src, alt, className, fill, noSpinner, onLoad, ...props }: CloudinaryImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Convert local path to Cloudinary public ID
    let publicId = src;
    if (publicId.startsWith('/images/')) {
        publicId = publicId.replace(/^\/images\//, '');
        publicId = publicId.replace(/\.[^/.]+$/, '');
        publicId = publicId.replace(/[^a-zA-Z0-9\/\.\-_]/g, '-').replace(/-+/g, '-');
        publicId = `galeobeauty/${publicId}`;
    } else if (!publicId.startsWith('http') && !publicId.startsWith('galeobeauty/')) {
        // If it's a generic public asset like /founder.jpg, map it
        publicId = publicId.startsWith('/') ? publicId.substring(1) : publicId;
        publicId = publicId.replace(/\.[^/.]+$/, '');
        publicId = publicId.replace(/[^a-zA-Z0-9\/\.\-_]/g, '-').replace(/-+/g, '-');
        publicId = `galeobeauty/${publicId}`;
    }

    // To seamlessly support `fill` without disrupting layouts,
    // we either wrap in a relative div or just render siblings if we assume the parent is already relative (which next/image with fill requires).

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
            <CldImage
                src={publicId}
                alt={alt || "Image"}
                fill={fill}
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
