"use client";

import { createContext, useContext, useState, useEffect, useEffectEvent, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

interface NavigationLoadingContextType {
    isNavigating: boolean;
    startNavigation: () => void;
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType>({
    isNavigating: false,
    startNavigation: () => { },
});

export function useNavigationLoading() {
    return useContext(NavigationLoadingContext);
}

export function NavigationLoadingProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isNavigating, setIsNavigating] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);
    const showTimerRef = useRef<number | null>(null);

    const startNavigation = useCallback(() => {
        setIsNavigating(true);
        if (showTimerRef.current) {
            window.clearTimeout(showTimerRef.current);
        }
        showTimerRef.current = window.setTimeout(() => {
            setShowIndicator(true);
        }, 150);
    }, []);

    useEffect(() => {
        return () => {
            if (showTimerRef.current) {
                window.clearTimeout(showTimerRef.current);
            }
        };
    }, []);

    const stopNavigation = useEffectEvent(() => {
        if (showTimerRef.current) {
            window.clearTimeout(showTimerRef.current);
            showTimerRef.current = null;
        }

        setIsNavigating(false);
        setShowIndicator(false);
    });

    useEffect(() => {
        stopNavigation();
    }, [pathname]);

    return (
        <NavigationLoadingContext.Provider value={{ isNavigating, startNavigation }}>
            {children}

            {isNavigating && showIndicator && (
                <div className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
                    <div className="h-1 w-full overflow-hidden bg-gold/10">
                        <div className="animate-loading-shimmer h-full w-1/3 rounded-full bg-gradient-to-r from-gold/40 via-gold to-gold-light" />
                    </div>
                    <div className="mx-auto mt-3 flex w-fit items-center rounded-full border border-gold/20 bg-background/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold shadow-sm backdrop-blur-sm">
                        Loading
                    </div>
                </div>
            )}
        </NavigationLoadingContext.Provider>
    );
}
