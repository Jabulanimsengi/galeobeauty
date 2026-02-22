"use client";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { cn } from "@/lib/utils";

// Placeholder press logos - replace with actual press mention logos
const pressLogos = [
    {
        name: "Elle Magazine",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Elle_logo.svg/1200px-Elle_logo.svg.png",
    },
    {
        name: "Vogue",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vogue_logo.svg/2560px-Vogue_logo.svg.png",
    },
    {
        name: "Harper's Bazaar",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Harper%27s_Bazaar_Logo.svg/2560px-Harper%27s_Bazaar_Logo.svg.png",
    },
    {
        name: "Cosmopolitan",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cosmopolitan_logo.svg/2560px-Cosmopolitan_logo.svg.png",
    },
];

interface FeaturedInProps {
    className?: string;
    logos?: typeof pressLogos;
}

export function FeaturedIn({
    className,
    logos = pressLogos
}: FeaturedInProps) {
    return (
        <div className={cn("space-y-4", className)}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground text-center">
                As Featured In
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                {logos.map((press) => (
                    <div
                        key={press.name}
                        className="relative h-6 sm:h-8 w-20 sm:w-28 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    >
                        <CloudinaryImage
                            src={press.logo}
                            alt={press.name}
                            fill
                            className="object-contain"
                            sizes="112px"
                            unoptimized // For external images
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// Alternative version with local placeholder brands (uses existing brand images)
export function FeaturedInLocal({ className }: { className?: string }) {
    const localBrands = [
        { name: "Dermalogica", src: "/images/brands/dermalogica.png" },
        { name: "QMS", src: "/images/brands/qms.png" },
        { name: "Moroccanoil", src: "/images/brands/moroccanoil.png" },
        { name: "Milkshake", src: "/images/brands/milkshake.png" },
        { name: "Lola Lee", src: "/images/brands/lola-lee.png" },
    ];

    return (
        <div className={cn("space-y-4", className)}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-background/60 text-center">
                Trusted By Leading Brands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                {localBrands.map((brand) => (
                    <div
                        key={brand.name}
                        className="relative h-10 sm:h-12 w-24 sm:w-32 opacity-60 hover:opacity-100 transition-opacity duration-300"
                    >
                        <CloudinaryImage
                            src={brand.src}
                            alt={brand.name}
                            fill
                            className="object-contain brightness-0 invert"
                            sizes="128px"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
