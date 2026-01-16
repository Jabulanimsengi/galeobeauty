"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown, Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectedTreatment } from "@/lib/booking-types";

interface BookingCartProps {
  items: SelectedTreatment[];
  onRemoveItem: (index: number) => void;
  onClearAll: () => void;
  onBook: () => void;
}

export function BookingCart({ items, onRemoveItem, onClearAll, onBook }: BookingCartProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (items.length === 0) return null;

  // Calculate total price (extract numeric value from price string)
  const calculateTotal = () => {
    let total = 0;
    for (const item of items) {
      // Extract number from price string like "R 252" or "R7,950"
      const priceStr = item.item.price.replace(/[R\s,]/g, "");
      const price = parseFloat(priceStr) || 0;
      total += price;
    }
    return total;
  };

  const total = calculateTotal();
  const totalDuration = items.reduce((acc, item) => {
    if (!item.item.duration) return acc;
    // Parse duration like "1hr", "45 mins", "1hr 30 mins"
    const hours = item.item.duration.match(/(\d+)\s*hr/)?.[1] || "0";
    const mins = item.item.duration.match(/(\d+)\s*min/)?.[1] || "0";
    return acc + parseInt(hours) * 60 + parseInt(mins);
  }, 0);

  const formatDuration = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    if (hours === 0) return `${minutes} mins`;
    if (minutes === 0) return `${hours}hr`;
    return `${hours}hr ${minutes} mins`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-2xl shadow-black/20"
      >
        {/* Expanded Items List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="max-h-[40vh] overflow-y-auto">
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">Selected Treatments</h3>
                    <button
                      onClick={onClearAll}
                      className="text-sm text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  {items.map((item, index) => (
                    <div
                      key={`${item.item.id}-${index}`}
                      className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {item.item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.subcategoryTitle}
                          {item.item.duration && (
                            <span className="ml-2 inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.item.duration}
                            </span>
                          )}
                        </p>
                      </div>
                      <span className="font-semibold text-gold text-sm whitespace-nowrap">
                        {item.item.price}
                      </span>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="p-1 rounded-full hover:bg-red-100 text-muted-foreground hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Bar */}
        <div className="p-4">
          <div className="max-w-2xl mx-auto">
            {/* Toggle & Summary Row */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-foreground" />
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">
                    {items.length} {items.length === 1 ? "treatment" : "treatments"} selected
                  </p>
                  {totalDuration > 0 && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(totalDuration)} total
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">
                  R {total.toLocaleString()}
                </span>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Book Now Button */}
            <Button
              onClick={onBook}
              className="w-full py-6 text-base bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-full"
            >
              Book now
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
