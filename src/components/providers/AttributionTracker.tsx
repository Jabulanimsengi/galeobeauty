"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { captureAttributionFromCurrentVisit } from "@/lib/attribution";

export function AttributionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttributionFromCurrentVisit(pathname ?? "/");
  }, [pathname]);

  return null;
}
