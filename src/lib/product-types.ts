// ============================================
// PRODUCT & E-COMMERCE TYPE DEFINITIONS
// ============================================

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;           // e.g., "50ml", "100ml", "Light", "Medium"
  sku: string | null;
  priceCents: number | null;           // null = use product base price
  compareAtPriceCents: number | null;  // null = use product compare-at price
  isDefault: boolean;
  sortOrder: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  shortDescription: string | null;
  description: string;
  category: string;          // 'skincare', 'haircare', 'nails', 'body', 'tools'
  subcategory: string | null;
  basePriceCents: number;
  compareAtPriceCents: number | null;
  currency: string;
  images: string[];          // Cloudinary image paths
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  weightGrams: number | null;
  ingredients: string | null;
  usageInstructions: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  variants: ProductVariant[];
}

/** A product in the shopping cart. */
export interface CartItem {
  productId: string;
  productSlug: string;
  productName: string;
  brand: string | null;
  image: string | null;        // first image from product
  variantId: string | null;    // null if product has no variants
  variantName: string | null;
  priceCents: number;          // resolved price (variant override or base)
  quantity: number;
}

/** Snapshot of a cart item stored in the order record. */
export interface OrderItem {
  productId: string;
  productSlug: string;
  name: string;
  brand: string | null;
  variantId: string | null;
  variantName: string | null;
  priceCents: number;
  quantity: number;
  image: string | null;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

export type DeliveryMethod = "pickup" | "delivery";

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "ready"
  | "completed"
  | "shipped"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "unpaid" | "paid" | "failed" | "refunded";

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress: DeliveryAddress | null;
  deliveryFeeCents: number;
  subtotalCents: number;
  totalCents: number;
  currency: string;
  paymentMethod: string | null;
  paymentReference: string | null;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  items: OrderItem[];
  itemCount: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// PRODUCT CATEGORIES
// ============================================

export const PRODUCT_CATEGORIES = [
  { id: "skincare", label: "Skincare" },
  { id: "haircare", label: "Haircare" },
  { id: "nails", label: "Nails" },
  { id: "body", label: "Body" },
  { id: "tools", label: "Tools & Accessories" },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]["id"];

// ============================================
// HELPERS
// ============================================

/** Format cents to a ZAR price string, e.g. 45000 → "R 450" */
export function formatPrice(cents: number): string {
  const rands = cents / 100;
  return `R ${rands.toLocaleString("en-ZA", { minimumFractionDigits: rands % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}

/** Resolve the effective price for a product, optionally with a specific variant. */
export function resolveProductPrice(
  product: Pick<Product, "basePriceCents">,
  variant?: Pick<ProductVariant, "priceCents"> | null
): number {
  return variant?.priceCents ?? product.basePriceCents;
}

/** Resolve the effective compare-at price for a product. */
export function resolveCompareAtPrice(
  product: Pick<Product, "compareAtPriceCents">,
  variant?: Pick<ProductVariant, "compareAtPriceCents"> | null
): number | null {
  if (variant && variant.compareAtPriceCents !== null) {
    return variant.compareAtPriceCents;
  }
  return product.compareAtPriceCents;
}

/** Get the discount percentage between compare-at and actual price. */
export function getDiscountPercentage(priceCents: number, compareAtPriceCents: number): number {
  if (compareAtPriceCents <= priceCents) return 0;
  return Math.round(((compareAtPriceCents - priceCents) / compareAtPriceCents) * 100);
}

/** Generate a unique cart item key (product + variant combination). */
export function getCartItemKey(productId: string, variantId: string | null): string {
  return variantId ? `${productId}:${variantId}` : productId;
}
