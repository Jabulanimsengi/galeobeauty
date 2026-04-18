"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { SelectedTreatment } from "@/lib/booking-types";
import { businessInfo } from "@/lib/constants";

interface BookingSummaryProps {
  items: SelectedTreatment[];
  onRemoveItem: (index: number) => void;
  onBook: () => void;
}

export function BookingSummary({ items, onRemoveItem, onBook }: BookingSummaryProps) {
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
  const compactAddress = `${businessInfo.name}, ${businessInfo.address.street}, ${businessInfo.address.area}`;

  return (
    <div className="flex max-h-[calc(100vh-140px)] min-h-0 flex-col overflow-hidden rounded-[0.4rem] border border-border/50 bg-white shadow-[0_26px_65px_-38px_rgba(0,0,0,0.3)]">
      <div className="shrink-0 p-5">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[0.4rem] border border-border/50 bg-stone-100">
            <CloudinaryImage
              src="/images/interior/galeo-beauty-interior-p1.jpg"
              alt="Galeo Beauty salon interior"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[1.95rem] font-semibold leading-none tracking-[-0.04em] text-foreground">
              Galeo Beauty
            </h3>
            <div className="mt-3 flex items-center gap-2 text-[1rem] text-foreground">
              <span className="font-semibold">4,9</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#FDB515] text-[#FDB515]" />
                ))}
              </div>
              <span className="font-medium text-foreground/80">(299)</span>
            </div>
            <p className="mt-2 truncate text-base text-muted-foreground">
              {compactAddress}
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col border-t border-border/40">
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-3">
          {items.length > 0 ? (
            <>
              <div className="space-y-0">
                <AnimatePresence mode="popLayout">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.item.id}-${index}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      layout
                      className="group border-b border-border/40 py-4 last:border-b-0"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-[1.1rem] font-medium leading-snug text-foreground">
                            {item.item.name}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.item.duration ? `${item.item.duration} with any professional` : "with any professional"}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-start gap-2 text-right">
                          <div>
                            <p className="text-[1.05rem] font-semibold text-foreground">from {item.item.price}</p>
                          </div>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="rounded-[0.3rem] p-1.5 text-muted-foreground opacity-60 transition-all group-hover:opacity-100 hover:bg-red-100 hover:text-red-500"
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

              <div className="mt-5 space-y-2 border-t border-border/30 pt-4">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>from R {total.toLocaleString()}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-[0.4rem] bg-stone-50 px-5 py-4 text-sm leading-6 text-muted-foreground">
              Select a treatment from the menu and it will appear here before you continue to booking.
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-border/40 p-5">
        <Button
          onClick={onBook}
          disabled={items.length === 0}
          className="h-14 w-full rounded-[0.35rem] bg-[#111111] text-[1.02rem] font-semibold text-white hover:bg-black disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
