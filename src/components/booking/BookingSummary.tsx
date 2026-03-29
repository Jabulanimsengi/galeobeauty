"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock3, MapPin, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import { SelectedTreatment } from "@/lib/booking-types";
import { businessInfo } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BookingSummaryProps {
  items: SelectedTreatment[];
  onRemoveItem: (index: number) => void;
  onBook: () => void;
}

export function BookingSummary({ items, onRemoveItem, onBook }: BookingSummaryProps) {
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=-25.753414,27.909252";

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    for (const item of items) {
      const priceStr = item.item.price.replace(/[R\s,]/g, "");
      const price = parseFloat(priceStr) || 0;
      total += price;
    }
    return total;
  };

  const total = calculateTotal();

  return (
    <div className="flex max-h-[calc(100vh-220px)] flex-col overflow-hidden rounded-[1.2rem] border border-border/50 bg-white shadow-[0_26px_65px_-38px_rgba(0,0,0,0.3)]">
      <div className="shrink-0 p-7">
        <div className="min-w-0">
          <h3 className="text-5xl font-semibold tracking-[-0.04em] text-foreground">
            Galeo Beauty
          </h3>
          <div className="mt-5 flex items-center gap-2 text-[1.05rem] text-foreground">
            <span className="font-semibold">4,9</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#FDB515] text-[#FDB515]" />
              ))}
            </div>
            <span className="font-medium text-[#6d5efc]">(299)</span>
          </div>
          <span className="mt-8 inline-flex rounded-full border border-[#bfe9b7] bg-[#edfbe7] px-5 py-2 text-sm font-medium text-[#26951f]">
            Deals
          </span>

          <Button
            onClick={onBook}
            disabled={items.length === 0}
            className="mt-8 h-16 w-full rounded-full bg-[#111111] text-[1.05rem] font-semibold text-white hover:bg-black disabled:opacity-50"
          >
            Book now
          </Button>
        </div>
      </div>

      <div className="shrink-0 border-t border-border/40 px-7 py-6">
        <div className="space-y-5">
          <div className="flex items-center gap-3 text-[0.98rem] text-foreground">
            <Clock3 className="h-6 w-6 shrink-0" />
            <span className="font-medium text-[#26951f]">Open</span>
            <span>until 18:00</span>
            <ChevronDown className="h-4 w-4 text-foreground/70" />
          </div>

          <div className="flex items-start gap-3 text-[0.98rem] leading-relaxed text-foreground">
            <MapPin className="mt-0.5 h-6 w-6 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="break-words">
                Galeo Beauty, Landsmeer Equestrian Estate, Shop 6, Meerhof, Hartbeespoort, North West
              </p>
              <TrackedExternalLink
                href={directionsUrl}
                trackingContext="booking_summary_directions"
                linkType="directions"
                linkLabel="Booking summary directions"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex font-medium text-[#6d5efc] transition-colors hover:text-[#5648f5]"
              >
                Get directions
              </TrackedExternalLink>
            </div>
          </div>
        </div>
      </div>

      {items.length > 0 && (
        <div
          className={cn(
            "flex-1 border-t border-border/40",
            items.length > 2 ? "overflow-y-auto" : "overflow-y-hidden"
          )}
        >
          <div className="p-7">
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.item.id}-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    layout
                    className="group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-medium text-foreground">
                          {item.item.name}
                        </p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {item.item.duration ? `${item.item.duration} with any professional` : "with any professional"}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-start gap-2 text-right">
                        <div>
                          <p className="text-base font-semibold">from {item.item.price}</p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="rounded-full p-1.5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-red-100 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-6 space-y-2 border-t border-border/30 pt-5">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>from R {total.toLocaleString()}</span>
              </div>
              <p className="pt-1 text-sm text-muted-foreground">
                Call {businessInfo.phone.replace("+27", "0")} if you need help choosing the right combination.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
