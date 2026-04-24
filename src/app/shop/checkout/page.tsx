"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Truck,
  Lock,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/product-types";
import type { DeliveryMethod, DeliveryAddress, OrderItem } from "@/lib/product-types";

// ============================================
// CONSTANTS
// ============================================

const DELIVERY_FEE_CENTS = 15000; // R150 flat rate

// ============================================
// VALIDATION
// ============================================

function normalizeSAPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  let normalized = digits;
  if (normalized.startsWith("00")) normalized = normalized.slice(2);
  if (normalized.startsWith("0")) normalized = `27${normalized.slice(1)}`;
  else if (!normalized.startsWith("27")) normalized = `27${normalized}`;
  return `+${normalized.slice(0, 11)}`;
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return phone.startsWith("+27") && digits.length === 11;
}

function isValidName(name: string): boolean {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.length >= 2 && parts.every((p) => p.length >= 2);
}

// ============================================
// CHECKOUT PAGE
// ============================================

export default function CheckoutPage() {
  const prefersReducedMotion = useReducedMotion();
  const { items, itemCount, totalCents, clearCart } = useCart();
  const formRef = useRef<HTMLFormElement>(null);

  // Customer details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Delivery
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("pickup");
  const [address, setAddress] = useState<DeliveryAddress>({
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });

  // Notes
  const [notes, setNotes] = useState("");

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payFastUrl, setPayFastUrl] = useState<string | null>(null);
  const [payFastData, setPayFastData] = useState<Record<string, string> | null>(null);

  // Auto-submit PayFast form when data is ready
  useEffect(() => {
    if (payFastUrl && payFastData && formRef.current) {
      formRef.current.submit();
    }
  }, [payFastUrl, payFastData]);

  const deliveryFeeCents = deliveryMethod === "delivery" ? DELIVERY_FEE_CENTS : 0;
  const grandTotalCents = totalCents + deliveryFeeCents;

  const canSubmit =
    isValidName(name) &&
    isValidPhone(phone) &&
    items.length > 0 &&
    (deliveryMethod === "pickup" || address.street.trim().length > 0);

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const orderItems: OrderItem[] = items.map((item) => ({
        productId: item.productId,
        productSlug: item.productSlug,
        name: item.productName,
        brand: item.brand,
        variantId: item.variantId,
        variantName: item.variantName,
        priceCents: item.priceCents,
        quantity: item.quantity,
        image: item.image,
      }));

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          customerEmail: email.trim() || undefined,
          customerPhone: phone.trim(),
          deliveryMethod,
          deliveryAddress: deliveryMethod === "delivery" ? address : undefined,
          items: orderItems,
          notes: notes.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Failed to create order.");
      }

      // Clear cart and redirect to PayFast
      clearCart();
      setPayFastUrl(result.payFastUrl);
      setPayFastData(result.payFastData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  // Empty cart redirect
  if (items.length === 0 && !payFastUrl) {
    return (
      <>
        <Header />
        <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f6efe6] px-6">
          <h1 className="text-xl font-bold text-[#17120f]">Your cart is empty</h1>
          <p className="mt-2 text-[0.86rem] text-[#9a8e7f]">
            Add products to your cart before checking out.
          </p>
          <NavLink
            href="/shop"
            className="mt-6 bg-[#17120f] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:bg-gold"
          >
            Browse Products
          </NavLink>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f6efe6]">
        {/* Header */}
        <section className="bg-[#17120f] px-6 pb-8 pt-28 text-center text-white sm:pb-10 sm:pt-32 lg:pt-36">
          <h1 className="font-sans text-[1.6rem] font-bold uppercase tracking-[0.08em] sm:text-[2.2rem]">
            Checkout
          </h1>
          <p className="mt-2 text-[0.84rem] text-white/60">
            <Lock className="mr-1 inline h-3.5 w-3.5" />
            Secure checkout powered by PayFast
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <NavLink
            href="/shop/cart"
            className="mb-6 inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-[#7a6f62] transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Cart
          </NavLink>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left — Form */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Customer Details */}
              <div className="bg-white p-5 sm:p-6">
                <h2 className="mb-4 text-[0.82rem] font-bold uppercase tracking-[0.14em] text-[#17120f]">
                  Customer Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-[0.72rem] text-[#7a6f62]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Nicole Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-black/10 bg-[#faf7f3] px-4 py-2.5 text-[0.84rem] text-[#17120f] outline-none transition-colors placeholder:text-[#b3a898] focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[0.72rem] text-[#7a6f62]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+27 69 123 0520"
                      value={phone}
                      inputMode="numeric"
                      onFocus={() => {
                        if (!phone) setPhone("+27");
                      }}
                      onBlur={() => {
                        if (phone === "+27") setPhone("");
                      }}
                      onChange={(e) => setPhone(normalizeSAPhone(e.target.value))}
                      className="w-full border border-black/10 bg-[#faf7f3] px-4 py-2.5 text-[0.84rem] text-[#17120f] outline-none transition-colors placeholder:text-[#b3a898] focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[0.72rem] text-[#7a6f62]">
                      Email <span className="text-[#b3a898]">(optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-black/10 bg-[#faf7f3] px-4 py-2.5 text-[0.84rem] text-[#17120f] outline-none transition-colors placeholder:text-[#b3a898] focus:border-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-white p-5 sm:p-6">
                <h2 className="mb-4 text-[0.82rem] font-bold uppercase tracking-[0.14em] text-[#17120f]">
                  Delivery Method
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`flex flex-col items-center gap-2 border p-4 text-center transition-colors ${
                      deliveryMethod === "pickup"
                        ? "border-[#17120f] bg-[#17120f] text-white"
                        : "border-black/10 bg-[#faf7f3] text-[#17120f] hover:border-gold"
                    }`}
                  >
                    <MapPin className="h-5 w-5" />
                    <span className="text-[0.76rem] font-semibold uppercase tracking-[0.1em]">
                      In-Store Pickup
                    </span>
                    <span className={`text-[0.68rem] ${deliveryMethod === "pickup" ? "text-white/70" : "text-[#9a8e7f]"}`}>
                      Free — Hartbeespoort
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("delivery")}
                    className={`flex flex-col items-center gap-2 border p-4 text-center transition-colors ${
                      deliveryMethod === "delivery"
                        ? "border-[#17120f] bg-[#17120f] text-white"
                        : "border-black/10 bg-[#faf7f3] text-[#17120f] hover:border-gold"
                    }`}
                  >
                    <Truck className="h-5 w-5" />
                    <span className="text-[0.76rem] font-semibold uppercase tracking-[0.1em]">
                      Delivery
                    </span>
                    <span className={`text-[0.68rem] ${deliveryMethod === "delivery" ? "text-white/70" : "text-[#9a8e7f]"}`}>
                      {formatPrice(DELIVERY_FEE_CENTS)} flat rate
                    </span>
                  </button>
                </div>

                {/* Delivery address form */}
                {deliveryMethod === "delivery" && (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 space-y-3"
                  >
                    <input
                      type="text"
                      placeholder="Street Address *"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                      className="w-full border border-black/10 bg-[#faf7f3] px-4 py-2.5 text-[0.84rem] outline-none transition-colors placeholder:text-[#b3a898] focus:border-gold"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        className="w-full border border-black/10 bg-[#faf7f3] px-4 py-2.5 text-[0.84rem] outline-none transition-colors placeholder:text-[#b3a898] focus:border-gold"
                      />
                      <input
                        type="text"
                        placeholder="Province"
                        value={address.province}
                        onChange={(e) =>
                          setAddress({ ...address, province: e.target.value })
                        }
                        className="w-full border border-black/10 bg-[#faf7f3] px-4 py-2.5 text-[0.84rem] outline-none transition-colors placeholder:text-[#b3a898] focus:border-gold"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={address.postalCode}
                      onChange={(e) =>
                        setAddress({ ...address, postalCode: e.target.value })
                      }
                      className="w-full border border-black/10 bg-[#faf7f3] px-4 py-2.5 text-[0.84rem] outline-none transition-colors placeholder:text-[#b3a898] focus:border-gold"
                    />
                  </motion.div>
                )}
              </div>

              {/* Notes */}
              <div className="bg-white p-5 sm:p-6">
                <h2 className="mb-3 text-[0.82rem] font-bold uppercase tracking-[0.14em] text-[#17120f]">
                  Order Notes <span className="font-normal text-[#b3a898]">(optional)</span>
                </h2>
                <textarea
                  placeholder="Any special instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full resize-none border border-black/10 bg-[#faf7f3] px-4 py-2.5 text-[0.84rem] outline-none transition-colors placeholder:text-[#b3a898] focus:border-gold"
                />
              </div>
            </motion.div>

            {/* Right — Order Summary */}
            <div className="lg:sticky lg:top-[140px] lg:self-start">
              <div className="bg-white p-5 sm:p-6">
                <h2 className="mb-4 text-[0.82rem] font-bold uppercase tracking-[0.14em] text-[#17120f]">
                  Order Summary
                </h2>

                <div className="space-y-3 border-b border-black/8 pb-4">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}:${item.variantId ?? ""}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-[#ebe4db]">
                        {item.image && (
                          <CloudinaryImage
                            src={item.image}
                            alt={item.productName}
                            fill
                            sizes="48px"
                            className="object-cover"
                            noSpinner
                          />
                        )}
                        {item.quantity > 1 && (
                          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#17120f] px-1 text-[0.5rem] font-bold text-white">
                            {item.quantity}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-[0.76rem] font-medium text-[#17120f]">
                          {item.productName}
                        </p>
                        {item.variantName && (
                          <p className="text-[0.64rem] text-[#9a8e7f]">
                            {item.variantName}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-[0.78rem] font-semibold text-[#17120f]">
                        {formatPrice(item.priceCents * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-b border-black/8 py-3">
                  <div className="flex justify-between text-[0.78rem]">
                    <span className="text-[#7a6f62]">Subtotal</span>
                    <span className="font-medium text-[#17120f]">
                      {formatPrice(totalCents)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[0.78rem]">
                    <span className="text-[#7a6f62]">Delivery</span>
                    <span className="font-medium text-[#17120f]">
                      {deliveryMethod === "pickup"
                        ? "Free"
                        : formatPrice(deliveryFeeCents)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4">
                  <span className="text-[0.88rem] font-bold text-[#17120f]">Total</span>
                  <span className="text-[1.1rem] font-bold text-[#17120f]">
                    {formatPrice(grandTotalCents)}
                  </span>
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-3 flex items-start gap-2 rounded bg-red-50 p-3 text-[0.76rem] text-red-700">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Pay button */}
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className={`flex w-full items-center justify-center gap-2 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition-colors ${
                    canSubmit && !isSubmitting
                      ? "bg-[#17120f] text-white hover:bg-gold"
                      : "cursor-not-allowed bg-[#17120f]/40 text-white/60"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" />
                      Pay {formatPrice(grandTotalCents)}
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[0.62rem] text-[#b3a898]">
                  You will be redirected to PayFast to complete your payment securely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hidden PayFast form — auto-submitted when data is ready */}
        {payFastUrl && payFastData && (
          <form
            ref={formRef}
            action={payFastUrl}
            method="POST"
            className="hidden"
          >
            {Object.entries(payFastData).map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}
