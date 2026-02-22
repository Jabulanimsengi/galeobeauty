"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectedTreatment } from "@/lib/booking-types";
import { cn } from "@/lib/utils";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

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

  return (
    <div className="bg-white rounded-2xl border border-border/40 shadow-xl overflow-hidden flex flex-col max-h-[calc(100vh-220px)]">
      {/* Header with business info - Fixed */}
      <div className="p-6 border-b border-border/30 shrink-0">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-border/20">
            <CloudinaryImage
              src="/images/logo.png"
              alt="Galeo Beauty"
              fill
              className="object-contain p-1"
              noSpinner
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-lg">Galeo Beauty</h3>
            <div className="flex items-center gap-1.5 text-base mt-1">
              <span className="font-semibold">4.9</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-muted-foreground">(136)</span>
            </div>
            <p className="text-sm text-muted-foreground truncate flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 shrink-0" />
              Galeo Beauty, Landsmeer Equ...
            </p>
          </div>
        </div>
      </div>

      {/* Selected treatments list - Scrollable */}
      <div className={cn(
        "flex-1 min-h-[150px]",
        items.length > 2 ? "overflow-y-auto" : "overflow-y-hidden"
      )}>
        <div className="p-6">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-muted-foreground text-lg">
                  No treatments selected yet.
                </p>
                <p className="text-muted-foreground text-base mt-1">
                  Tap + to add treatments
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
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
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-base">
                          {item.item.name}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {item.item.duration ? `${item.item.duration} with any professional` : "with any professional"}
                        </p>
                      </div>
                      <div className="text-right shrink-0 flex items-start gap-2">
                        <div>
                          <p className="font-semibold text-base">from {item.item.price}</p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-100 text-muted-foreground hover:text-red-500 transition-all"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="shrink-0 border-t border-border/30 bg-white">
        {/* Totals */}
        {items.length > 0 && (
          <div className="px-6 py-4 space-y-2">
            <div className="flex justify-between text-base">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>from R {total.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Continue button */}
        <div className="p-6 pt-0 pb-10">
          <Button
            onClick={onBook}
            disabled={items.length === 0}
            className="w-full py-6 text-base bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-full disabled:opacity-50"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
