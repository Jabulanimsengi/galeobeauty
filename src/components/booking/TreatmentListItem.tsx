"use client";

import { useState } from "react";
import { Clock, Plus, Check } from "lucide-react";
import { ServiceItem } from "@/lib/services-data";
import { SelectedTreatment } from "@/lib/booking-types";

interface TreatmentListItemProps {
  item: ServiceItem;
  categoryId: string;
  categoryTitle: string;
  subcategoryId: string;
  subcategoryTitle: string;
  note?: string;
  isSelected?: boolean;
  onToggle: (treatment: SelectedTreatment) => void;
}

export function TreatmentListItem({
  item,
  categoryId,
  categoryTitle,
  subcategoryId,
  subcategoryTitle,
  note,
  isSelected = false,
  onToggle,
}: TreatmentListItemProps) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    onToggle({
      categoryId,
      categoryTitle,
      subcategoryId,
      subcategoryTitle,
      item,
      note,
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSelected
          ? "border-gold bg-gold/5"
          : "border-border/40 bg-white hover:border-gold/50"
        }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span className="text-foreground font-medium text-base block">
            {item.name}
          </span>
          {item.description && (
            <div className="mt-1">
              <p className={`text-sm text-muted-foreground leading-relaxed ${expanded ? '' : 'line-clamp-1'} sm:line-clamp-none`}>
                {item.description}
              </p>
              <span
                onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                className="text-xs text-gold font-medium sm:hidden cursor-pointer"
              >
                {expanded ? 'Show less' : 'Show more'}
              </span>
            </div>
          )}
          {item.duration && (
            <span className="text-sm text-muted-foreground flex items-center gap-1 mt-1.5">
              <Clock className="w-3.5 h-3.5" />
              {item.duration}
            </span>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-foreground/80 text-sm">
              from <span className="font-semibold text-foreground">{item.price}</span>
            </span>
            {note && (
              <>
                <span className="text-muted-foreground">·</span>
                <span className="text-gold text-sm font-medium">{note}</span>
              </>
            )}
          </div>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isSelected
              ? "bg-foreground text-white"
              : "border-2 border-border/60 text-transparent hover:border-gold"
            }`}
        >
          {isSelected ? (
            <Check className="w-5 h-5" strokeWidth={3} />
          ) : (
            <Plus className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </div>
    </button>
  );
}
