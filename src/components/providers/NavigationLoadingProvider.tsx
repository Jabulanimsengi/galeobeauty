"use client";

import { createContext, useContext, useState, useEffect, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

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

    const startNavigation = useCallback(() => {
        setIsNavigating(true);
    }, []);

    return (
        <NavigationLoadingContext.Provider value={{ isNavigating, startNavigation }}>
            <Suspense fallback={children}>
                <NavigationLoadingProviderInner setIsNavigating={setIsNavigating}>
                    {children}
                </NavigationLoadingProviderInner>
            </Suspense>

            {/* Centered Loading Overlay */}
            {isNavigating && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
                    {/* Logo with pulse animation */}
                    <div className="relative mb-8">
                        <Image
                            src="/images/logo.png"
                            alt="Galeo Beauty"
                            width={200}
                            height={80}
                            className="h-20 w-auto animate-pulse"
                            priority
                        />
                    </div>

                    {/* Gold Spinner */}
                    <Spinner size={48} className="mb-4" />

                    {/* Loading text */}
                    <p className="text-sm text-muted-foreground font-medium tracking-wider uppercase">
                        Loading...
                    </p>
                </div>
            )}
        </NavigationLoadingContext.Provider>
    );
}
