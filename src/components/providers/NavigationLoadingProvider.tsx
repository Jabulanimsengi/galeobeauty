"use client";

import { createContext, useContext, useState, useEffect, useCallback, Suspense, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

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

// Inner component that uses useSearchParams (must be wrapped in Suspense)
function NavigationLoadingProviderInner({
    children,
    setIsNavigating
}: {
    children: React.ReactNode;
    setIsNavigating: (value: boolean) => void;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // When route changes, hide the loading overlay
    useEffect(() => {
        setIsNavigating(false);
    }, [pathname, searchParams, setIsNavigating]);

    return <>{children}</>;
}

export function NavigationLoadingProvider({ children }: { children: React.ReactNode }) {
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

    return (
        <NavigationLoadingContext.Provider value={{ isNavigating, startNavigation }}>
            <Suspense fallback={children}>
                <NavigationLoadingProviderInner
                    setIsNavigating={(value) => {
                        if (!value && showTimerRef.current) {
                            window.clearTimeout(showTimerRef.current);
                            showTimerRef.current = null;
                        }
                        setIsNavigating(value);
                        if (!value) {
                            setShowIndicator(false);
                        }
                    }}
                >
                    {children}
                </NavigationLoadingProviderInner>
            </Suspense>

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
