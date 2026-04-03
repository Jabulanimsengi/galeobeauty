"use client";

import Link from "next/link";
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
  detailsLink?: string;
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
  detailsLink,
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
    <div
      className={`group w-full rounded-xl border-2 p-4 transition-all ${isSelected
          ? "border-gold bg-gold/5"
          : "border-border/40 bg-white hover:border-gold/50"
        }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <button type="button" onClick={handleToggle} className="w-full text-left">
            <span className="block text-base font-medium text-foreground">
              {item.name}
            </span>
            {item.description && (
              <div className="mt-1">
                <p className={`text-sm leading-relaxed text-muted-foreground ${expanded ? "" : "line-clamp-1"} sm:line-clamp-none`}>
                  {item.description}
                </p>
              </div>
            )}
            {item.duration && (
              <span className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {item.duration}
              </span>
            )}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-foreground/80">
                from <span className="font-semibold text-foreground">{item.price}</span>
              </span>
              {note && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-sm font-medium text-gold">{note}</span>
                </>
              )}
            </div>
          </button>

          {(item.description || detailsLink) && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {item.description && (
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="text-xs font-medium text-gold sm:hidden"
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              )}
              {detailsLink && (
                <Link
                  href={detailsLink}
                  className="text-xs font-medium text-foreground underline-offset-4 transition-colors hover:text-gold hover:underline"
                >
                  View treatment details
                </Link>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={isSelected}
          aria-label={isSelected ? `Remove ${item.name} from your booking` : `Add ${item.name} to your booking`}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${isSelected
              ? "bg-foreground text-white"
              : "border-2 border-border/60 text-transparent hover:border-gold"
            }`}
        >
          {isSelected ? (
            <Check className="h-5 w-5" strokeWidth={3} />
          ) : (
            <Plus className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
