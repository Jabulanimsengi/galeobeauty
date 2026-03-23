"use client";

import { createContext, useContext, useState, useEffect, useEffectEvent, useCallback } from "react";
import { usePathname } from "next/navigation";
import { RouteLoadingScreen } from "@/components/ui/RouteLoadingScreen";

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

    const startNavigation = useCallback(() => {
        setIsNavigating(true);
    }, []);

    const stopNavigation = useEffectEvent(() => {
        setIsNavigating(false);
    });

    useEffect(() => {
        stopNavigation();
    }, [pathname]);

    return (
        <NavigationLoadingContext.Provider value={{ isNavigating, startNavigation }}>
            {children}

            {isNavigating && (
                <RouteLoadingScreen className="pointer-events-none z-[110] bg-background/96 backdrop-blur-sm" />
            )}
        </NavigationLoadingContext.Provider>
    );
}
