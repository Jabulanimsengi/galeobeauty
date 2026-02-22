"use client";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { businessInfo } from "@/lib/constants";

// Placeholder Instagram posts - replace with actual Instagram API data
const instagramPosts = [
    {
        id: 1,
        image: "/images/gallery/Facials/professional-skin-facial-treatment-in-progress.jpeg",
        likes: 234,
        comments: 18,
        alt: "Facial treatment at Galeo Beauty"
    },
    {
        id: 2,
        image: "/images/lashes-brows/dramatic-volume-eyelash-extensions.png",
        likes: 189,
        comments: 12,
        alt: "Lash extensions showcase"
    },
    {
        id: 3,
        image: "/images/dermalogica/dermalogica-microneedling-treatment.png",
        likes: 267,
        comments: 24,
        alt: "Skin treatment results"
    },
    {
        id: 4,
        image: "/images/founder_dandi.jpg",
        likes: 312,
        comments: 31,
        alt: "Behind the scenes at Galeo"
    },
];

interface InstagramFeedProps {
    className?: string;
    columns?: 2 | 4;
}

export function InstagramFeed({ className, columns = 4 }: InstagramFeedProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Instagram className="w-5 h-5 text-gold" />
                    <span className="text-sm font-medium text-foreground">
                        Follow us on Instagram
                    </span>
                </div>
                <a
                    href={businessInfo.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gold hover:underline font-medium"
                >
                    @galeobeauty
                </a>
            </div>

            {/* Grid */}
            <div className={cn(
                "grid gap-2 sm:gap-3",
                columns === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"
            )}>
                {instagramPosts.slice(0, columns).map((post) => (
                    <a
                        key={post.id}
                        href={businessInfo.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square rounded-xl overflow-hidden"
                    >
                        <CloudinaryImage
                            src={post.image}
                            alt={post.alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 50vw, 25vw"
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex items-center gap-4 text-white">
                                <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4 fill-white" />
                                    <span className="text-sm font-medium">{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-sm font-medium">{post.comments}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
