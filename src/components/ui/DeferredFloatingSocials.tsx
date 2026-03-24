"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FloatingSocials = dynamic(
    () => import("@/components/ui/floating-socials").then((mod) => mod.FloatingSocials),
    { ssr: false, loading: () => null }
);

export function DeferredFloatingSocials() {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        let idleId: number | null = null;

        const enable = () => setShouldRender(true);
        const requestIdleCallback = window.requestIdleCallback?.bind(window);
        const cancelIdleCallback = window.cancelIdleCallback?.bind(window);

        if (requestIdleCallback) {
            idleId = requestIdleCallback(enable, { timeout: 1500 });
        } else {
            timeoutId = setTimeout(enable, 800);
        }

        return () => {
            if (idleId !== null && cancelIdleCallback) {
                cancelIdleCallback(idleId);
            }

            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    if (!shouldRender) {
        return null;
    }

    return <FloatingSocials />;
}
