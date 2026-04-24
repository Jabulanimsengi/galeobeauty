"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { NavLink } from "@/components/ui/nav-link";

/**
 * A floating cart icon for the site header.
 * Shows an animated item count badge when the cart is non-empty.
 */
export function CartIndicator() {
  const { itemCount } = useCart();

  return (
    <NavLink
      href="/shop/cart"
      className="relative inline-flex items-center justify-center p-2 text-current transition-colors hover:text-gold"
      aria-label={`Shopping cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[0.56rem] font-bold leading-none text-white shadow-sm">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </NavLink>
  );
}
