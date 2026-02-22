"use client";

import React, { useState, useRef, useEffect } from "react";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterProps {
    beforeImage: string;
    afterImage: string;
    alt: string;
    className?: string;
}

export const BeforeAfterSlider = ({ beforeImage, afterImage, alt, className = "" }: BeforeAfterProps) => {
    const [sliderSystem, setSliderSystem] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        let clientX;

        if ('touches' in event) {
            clientX = event.touches[0].clientX;
        } else {
            clientX = (event as React.MouseEvent).clientX;
        }

        const x = Math.max(0, Math.min(clientX - containerRect.left, containerRect.width));
        const percentage = (x / containerRect.width) * 100;

        setSliderSystem(percentage);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        window.addEventListener("mouseup", handleGlobalMouseUp);
        window.addEventListener("touchend", handleGlobalMouseUp);

        return () => {
            window.removeEventListener("mouseup", handleGlobalMouseUp);
            window.removeEventListener("touchend", handleGlobalMouseUp);
        };
    }, []);

    return (
        <div
            className={`relative w-full overflow-hidden select-none cursor-ew-resize group ${className}`}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* After Image (Background) */}
            <div className="relative w-full h-full aspect-[4/5] md:aspect-square">
                <CloudinaryImage
                    src={afterImage}
                    alt={`${alt} after`}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full pointer-events-none">
                    After
                </div>
            </div>

            {/* Before Image (Foreground - Clipped) */}
            <div
                className="absolute top-0 left-0 h-full w-full"
                style={{ clipPath: `inset(0 ${100 - sliderSystem}% 0 0)` }}
            >
                <div className="relative w-full h-full">
                    <CloudinaryImage
                        src={beforeImage}
                        alt={`${alt} before`}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/80 text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full pointer-events-none">
                        Before
                    </div>
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-lg"
                style={{ left: `${sliderSystem}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-gold/50">
                    <MoveHorizontal className="w-5 h-5 text-gold" />
                </div>
            </div>
        </div>
    );
};
