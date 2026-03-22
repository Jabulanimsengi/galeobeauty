"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { MapProps } from "@/components/ui/map";

const Map = dynamic(
    () => import("@/components/ui/map").then((mod) => mod.Map),
    {
        ssr: false,
        loading: () => <div className="h-full min-h-[300px] w-full animate-pulse bg-stone-100" />,
    }
);

export function DeferredMap(props: MapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const node = containerRef.current;

        if (!node || shouldLoad) {
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
    }, [shouldLoad]);

    return (
        <div ref={containerRef} className="h-full w-full">
            {shouldLoad ? (
                <Map {...props} />
            ) : (
                <div className="h-full min-h-[300px] w-full animate-pulse bg-stone-100" />
            )}
        </div>
    );
}
