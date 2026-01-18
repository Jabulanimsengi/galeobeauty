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
    function NavLink({ href, onClick, children, ...props }, ref) {
        const { startNavigation } = useNavigationLoading();
        const pathname = usePathname();

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            const targetPath = typeof href === "string" ? href : href?.pathname;

            // Only show loading if navigating to a different page
            if (targetPath && targetPath !== pathname && !targetPath.startsWith("#")) {
                startNavigation();
            }

            // Call original onClick if provided
            if (onClick) {
                onClick(e);
            }
        };

        return (
            <NextLink ref={ref} href={href} onClick={handleClick} {...props}>
                {children}
            </NextLink>
        );
    }
);
