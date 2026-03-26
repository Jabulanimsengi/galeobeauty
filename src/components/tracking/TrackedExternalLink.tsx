"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  getStoredAttribution,
  trackExternalLinkClick,
  type StoredAttribution,
} from "@/lib/attribution";

interface TrackedExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  trackingContext?: string;
  linkType?: string;
  linkLabel?: string;
}

export const TrackedExternalLink = React.forwardRef<HTMLAnchorElement, TrackedExternalLinkProps>(
  function TrackedExternalLink(
    {
      trackingContext,
      linkType = "external",
      linkLabel,
      href,
      onClick,
      ...props
    },
    ref
  ) {
    const pathname = usePathname();
    const [attribution, setAttribution] = useState<StoredAttribution | null>(null);

    useEffect(() => {
      setAttribution(getStoredAttribution());
    }, [pathname]);

    const resolvedHref = typeof href === "string" ? href : "";

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (event.defaultPrevented || !resolvedHref) {
        return;
      }

      trackExternalLinkClick({
        attribution,
        href: resolvedHref,
        currentPage: pathname ?? "/",
        context: trackingContext,
        linkType,
        linkLabel,
      });
    };

    return <a ref={ref} href={href} onClick={handleClick} {...props} />;
  }
);
