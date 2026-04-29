"use client";

import NextLink from "next/link";
import { useNavigationLoading } from "@/components/providers/NavigationLoadingProvider";
import { usePathname } from "next/navigation";
import { ComponentProps, forwardRef } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

/**
 * Custom Link component that triggers the navigation loading overlay
 * when navigating to a different page.
 */
export const NavLink = forwardRef<HTMLAnchorElement, LinkProps>(
    function NavLink({ href, onClick, children, target, ...props }, ref) {
        const { startNavigation } = useNavigationLoading();
        const pathname = usePathname();

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (onClick) {
                onClick(e);
            }

            if (
                e.defaultPrevented ||
                e.button !== 0 ||
                e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey ||
                (target && target !== "_self")
            ) {
                return;
            }

            const targetPath = typeof href === "string" ? href : href?.pathname;

            if (!targetPath || targetPath.startsWith("#") || typeof window === "undefined") {
                return;
            }

            const destination = new URL(targetPath, window.location.href);

            if (destination.origin !== window.location.origin) {
                return;
            }

            const normalizePath = (value: string) => value.replace(/\/+$/, "") || "/";

            // Only show loading if navigating to a different page.
            if (normalizePath(destination.pathname) !== normalizePath(pathname)) {
                startNavigation();
            }
        };

        return (
            <NextLink ref={ref} href={href} target={target} onClick={handleClick} {...props}>
                {children}
            </NextLink>
        );
    }
);
