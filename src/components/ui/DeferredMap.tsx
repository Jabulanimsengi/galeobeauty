"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import type { MapProps } from "@/components/ui/map";

const Map = dynamic(
    () => import("@/components/ui/map").then((mod) => mod.Map),
    {
        ssr: false,
        loading: () => <div className="h-full min-h-[300px] w-full animate-pulse bg-stone-100" />,
    }
);

interface DeferredMapProps extends MapProps {
    loadStrategy?: "in-view" | "interaction";
    previewTitle?: string;
    previewDescription?: string;
    directionsClassName?: string;
}

export function DeferredMap({
    latitude,
    longitude,
    markerTitle = "Galeo Beauty",
    markerDescription = "Shop 6, Landsmeer, Jan Smuts Rd, Hartbeespoort",
    loadStrategy = "in-view",
    previewTitle,
    previewDescription,
    directionsClassName,
    ...props
}: DeferredMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    useEffect(() => {
        const node = containerRef.current;

        if (!node || shouldLoad || loadStrategy !== "in-view") {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "240px" }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [loadStrategy, shouldLoad]);

    return (
        <div ref={containerRef} className="h-full w-full">
            {shouldLoad ? (
                <Map
                    latitude={latitude}
                    longitude={longitude}
                    markerTitle={markerTitle}
                    markerDescription={markerDescription}
                    directionsClassName={directionsClassName}
                    {...props}
                />
            ) : (
                <div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f5f2ec_0%,#ebe2d2_52%,#dfd2bb_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.45),transparent_32%),radial-gradient(circle_at_24%_75%,rgba(201,165,92,0.18),transparent_28%)]" />
                    <div className="relative z-10 flex max-w-md flex-col items-center px-6 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/85 shadow-sm">
                            <svg className="h-7 w-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21s-6-5.33-6-11a6 6 0 1112 0c0 5.67-6 11-6 11z" />
                                <circle cx="12" cy="10" r="2.35" strokeWidth={1.8} />
                            </svg>
                        </div>
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-foreground/55">
                            Salon Map
                        </p>
                        <h3 className="mt-3 font-serif text-2xl text-foreground">
                            {previewTitle ?? markerTitle}
                        </h3>
                        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                            {previewDescription ?? markerDescription}
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            {loadStrategy === "interaction" && (
                                <Button
                                    type="button"
                                    className="bg-foreground text-background hover:bg-gold hover:text-white"
                                    onClick={() => setShouldLoad(true)}
                                >
                                    Load Live Map
                                </Button>
                            )}
                            <TrackedExternalLink
                                href={directionsUrl}
                                trackingContext="deferred_map_preview_directions"
                                linkType="maps"
                                linkLabel="Deferred map preview directions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center justify-center border border-foreground/15 bg-white/80 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:text-gold ${directionsClassName ?? "rounded-full"}`}
                            >
                                Get Directions
                            </TrackedExternalLink>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
