"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/product-types";

export default function CartPage() {
  const prefersReducedMotion = useReducedMotion();
  const { items, itemCount, totalCents, updateQuantity, removeFromCart, clearCart } =
    useCart();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f6efe6]">
        {/* Header */}
        <section className="bg-[#17120f] px-6 pb-8 pt-28 text-center text-white sm:pb-10 sm:pt-32 lg:pt-36">
          <h1 className="font-sans text-[1.6rem] font-bold uppercase tracking-[0.08em] sm:text-[2.2rem]">
            Your Cart
          </h1>
          {itemCount > 0 && (
            <p className="mt-2 text-[0.84rem] text-white/60">
              {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
            </p>
          )}
        </section>

        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {items.length === 0 ? (
            /* Empty cart */
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-16 text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ebe4db]">
                <ShoppingBag className="h-8 w-8 text-[#a89272]" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-[#17120f]">
                Your cart is empty
              </h2>
              <p className="mt-2 max-w-sm text-[0.86rem] text-[#9a8e7f]">
                Browse our curated selection of beauty products and add something
                to your cart.
              </p>
              <NavLink
                href="/shop"
                className="mt-6 inline-flex items-center gap-2 bg-[#17120f] px-8 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-gold"
              >
                Continue Shopping
                <ArrowRight className="h-3.5 w-3.5" />
              </NavLink>
            </motion.div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
              {/* Cart Items */}
              <div>
                {/* Clear all */}
                <div className="mb-4 flex items-center justify-between border-b border-black/8 pb-3">
                  <NavLink
                    href="/shop"
                    className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-[#7a6f62] transition-colors hover:text-gold"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Continue Shopping
                  </NavLink>
                  <button
                    onClick={clearCart}
                    className="text-[0.72rem] font-medium text-red-500/70 transition-colors hover:text-red-600"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.productId}:${item.variantId ?? ""}`}
                      layout
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, x: -40 }}
                      className="flex gap-4 border-b border-black/6 bg-white p-4 sm:gap-5"
                    >
                      {/* Image */}
                      <NavLink
                        href={`/shop/${item.productSlug}`}
                        className="relative h-24 w-20 shrink-0 overflow-hidden bg-[#ebe4db] sm:h-28 sm:w-24"
                      >
                        {item.image && (
                          <CloudinaryImage
                            src={item.image}
                            alt={item.productName}
                            fill
                            sizes="96px"
                            className="object-cover"
                            noSpinner
                          />
                        )}
                      </NavLink>

                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          {item.brand && (
                            <span className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-[#a89272]">
                              {item.brand}
                            </span>
                          )}
                          <NavLink
                            href={`/shop/${item.productSlug}`}
                            className="block text-[0.84rem] font-medium text-[#17120f] hover:text-gold transition-colors sm:text-[0.88rem]"
                          >
                            {item.productName}
                          </NavLink>
                          {item.variantName && (
                            <span className="text-[0.68rem] text-[#9a8e7f]">
                              {item.variantName}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex items-end justify-between">
                          {/* Quantity */}
                          <div className="flex items-center border border-black/10">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.variantId,
                                  item.quantity - 1
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center text-[#7a6f62] hover:text-[#17120f]"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="flex h-8 w-8 items-center justify-center text-[0.78rem] font-semibold text-[#17120f]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.variantId,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center text-[#7a6f62] hover:text-[#17120f]"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[0.88rem] font-semibold text-[#17120f]">
                              {formatPrice(item.priceCents * item.quantity)}
                            </span>
                            <button
                              onClick={() =>
                                removeFromCart(item.productId, item.variantId)
                              }
                              className="text-[#b3a898] transition-colors hover:text-red-500"
                              aria-label={`Remove ${item.productName} from cart`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:sticky lg:top-[140px] lg:self-start">
                <div className="bg-white p-6">
                  <h2 className="mb-4 text-[0.82rem] font-bold uppercase tracking-[0.14em] text-[#17120f]">
                    Order Summary
                  </h2>

                  <div className="space-y-2 border-b border-black/8 pb-4">
                    <div className="flex items-center justify-between text-[0.82rem]">
                      <span className="text-[#7a6f62]">
                        Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})
                      </span>
                      <span className="font-semibold text-[#17120f]">
                        {formatPrice(totalCents)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[0.82rem]">
                      <span className="text-[#7a6f62]">Delivery</span>
                      <span className="text-[#9a8e7f]">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <span className="text-[0.88rem] font-bold text-[#17120f]">
                      Total
                    </span>
                    <span className="text-[1.1rem] font-bold text-[#17120f]">
                      {formatPrice(totalCents)}
                    </span>
                  </div>

                  <NavLink
                    href="/shop/checkout"
                    className="flex w-full items-center justify-center gap-2 bg-[#17120f] py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-gold"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-3.5 w-3.5" />
                  </NavLink>

                  <p className="mt-3 text-center text-[0.66rem] text-[#b3a898]">
                    Secure checkout powered by PayFast
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
