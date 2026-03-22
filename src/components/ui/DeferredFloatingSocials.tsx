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
        let timeoutId: number | null = null;
        let idleId: number | null = null;

        const enable = () => setShouldRender(true);

        if ("requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(enable, { timeout: 1500 });
        } else {
            timeoutId = window.setTimeout(enable, 800);
        }

        return () => {
            if (idleId !== null && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }

            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
        };
    }, []);

    if (!shouldRender) {
        return null;
    }

    return <FloatingSocials />;
}
