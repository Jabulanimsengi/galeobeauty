"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import {
  buildTrackedWhatsAppUrl,
  getStoredAttribution,
  trackWhatsAppClick,
  type StoredAttribution,
} from "@/lib/attribution";
import { businessInfo } from "@/lib/constants";

interface TrackedWhatsAppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  message: string;
  phone?: string;
  trackingContext?: string;
}

export const TrackedWhatsAppLink = React.forwardRef<HTMLAnchorElement, TrackedWhatsAppLinkProps>(
  function TrackedWhatsAppLink(
    {
      message,
      phone = businessInfo.socials.whatsapp,
      trackingContext,
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

    const href = useMemo(
      () =>
        buildTrackedWhatsAppUrl({
          phone,
          message,
          attribution,
          currentPage: pathname ?? "/",
        }),
      [attribution, message, pathname, phone]
    );

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (event.defaultPrevented) {
        return;
      }

      trackWhatsAppClick({
        attribution,
        context: trackingContext,
        currentPage: pathname ?? "/",
      });
    };

    return <a ref={ref} href={href} onClick={handleClick} {...props} />;
  }
);
