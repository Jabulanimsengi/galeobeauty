"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { CartItem, Product, ProductVariant } from "@/lib/product-types";
import { getCartItemKey, resolveProductPrice } from "@/lib/product-types";

// ============================================
// CART CONTEXT TYPES
// ============================================

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  totalCents: number;
  addToCart: (product: Product, variant: ProductVariant | null, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, variantId: string | null) => boolean;
  getItemQuantity: (productId: string, variantId: string | null) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

// ============================================
// LOCAL STORAGE
// ============================================

const CART_STORAGE_KEY = "galeo_cart";

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

// ============================================
// PROVIDER
// ============================================

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    setItems(loadCartFromStorage());
    setIsHydrated(true);
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      saveCartToStorage(items);
    }
  }, [items, isHydrated]);

  const addToCart = useCallback(
    (product: Product, variant: ProductVariant | null, quantity: number = 1) => {
      setItems((prev) => {
        const key = getCartItemKey(product.id, variant?.id ?? null);
        const existing = prev.find(
          (item) => getCartItemKey(item.productId, item.variantId) === key
        );

        if (existing) {
          return prev.map((item) =>
            getCartItemKey(item.productId, item.variantId) === key
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        const newItem: CartItem = {
          productId: product.id,
          productSlug: product.slug,
          productName: product.name,
          brand: product.brand,
          image: product.images[0] ?? null,
          variantId: variant?.id ?? null,
          variantName: variant?.name ?? null,
          priceCents: resolveProductPrice(product, variant),
          quantity,
        };

        return [...prev, newItem];
      });
    },
    []
  );

  const removeFromCart = useCallback(
    (productId: string, variantId: string | null) => {
      setItems((prev) => {
        const key = getCartItemKey(productId, variantId);
        return prev.filter(
          (item) => getCartItemKey(item.productId, item.variantId) !== key
        );
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string | null, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, variantId);
        return;
      }
      setItems((prev) => {
        const key = getCartItemKey(productId, variantId);
        return prev.map((item) =>
          getCartItemKey(item.productId, item.variantId) === key
            ? { ...item, quantity }
            : item
        );
      });
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (productId: string, variantId: string | null) => {
      const key = getCartItemKey(productId, variantId);
      return items.some(
        (item) => getCartItemKey(item.productId, item.variantId) === key
      );
    },
    [items]
  );

  const getItemQuantity = useCallback(
    (productId: string, variantId: string | null) => {
      const key = getCartItemKey(productId, variantId);
      const item = items.find(
        (i) => getCartItemKey(i.productId, i.variantId) === key
      );
      return item?.quantity ?? 0;
    },
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalCents = useMemo(
    () => items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      totalCents,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
    }),
    [
      items,
      itemCount,
      totalCents,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ============================================
// HOOK
// ============================================

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return context;
}
