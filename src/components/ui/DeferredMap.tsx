"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
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
    previewPriority?: boolean;
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
    previewPriority = false,
    ...props
}: DeferredMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(loadStrategy === "interaction");
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
    const staticMapUrl = useMemo(() => {
        if (!apiKey) {
            return null;
        }

        const params = new URLSearchParams({
            center: `${latitude},${longitude}`,
            zoom: String(props.zoom ?? 15),
            size: "960x560",
            scale: "2",
            maptype: "roadmap",
            markers: `color:0x2d3436|${latitude},${longitude}`,
            key: apiKey,
        });

        return `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}`;
    }, [apiKey, latitude, longitude, props.zoom]);

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
            { rootMargin: "720px" }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [loadStrategy, shouldLoad]);

    useEffect(() => {
        if (typeof document === "undefined") {
            return;
        }

        for (const href of ["https://maps.googleapis.com", "https://maps.gstatic.com"]) {
            if (document.head.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
                continue;
            }

            const link = document.createElement("link");
            link.rel = "preconnect";
            link.href = href;
            link.crossOrigin = "";
            document.head.appendChild(link);
        }
    }, []);

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
                <div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden bg-stone-100">
                    {staticMapUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={staticMapUrl}
                            alt={`${previewTitle ?? markerTitle} map preview`}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading={previewPriority ? "eager" : "lazy"}
                            decoding="async"
                            fetchPriority={previewPriority ? "high" : "low"}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f5f2ec_0%,#ebe2d2_52%,#dfd2bb_100%)]" />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,16,13,0.58),rgba(20,16,13,0.18)_48%,rgba(20,16,13,0.36))]" />
                    <div className="relative z-10 flex max-w-md flex-col items-center px-6 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center bg-white/90 shadow-sm">
                            <svg className="h-7 w-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21s-6-5.33-6-11a6 6 0 1112 0c0 5.67-6 11-6 11z" />
                                <circle cx="12" cy="10" r="2.35" strokeWidth={1.8} />
                            </svg>
                        </div>
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/78">
                            Salon Map
                        </p>
                        <h3 className="mt-3 font-sans text-2xl text-white">
                            {previewTitle ?? markerTitle}
                        </h3>
                        <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">
                            {previewDescription ?? markerDescription}
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <TrackedExternalLink
                                href={directionsUrl}
                                trackingContext="deferred_map_preview_directions"
                                linkType="maps"
                                linkLabel="Deferred map preview directions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center justify-center border border-white/25 bg-white/90 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:text-gold ${directionsClassName ?? "rounded-full"}`}
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
