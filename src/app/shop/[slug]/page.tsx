"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShoppingBag,
  Minus,
  Plus,
  ChevronDown,
  ChevronUp,
  Truck,
  MapPin,
  Check,
} from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";
import { useCart } from "@/components/providers/CartProvider";
import { seedProducts } from "@/lib/products-data";
import {
  formatPrice,
  resolveProductPrice,
  resolveCompareAtPrice,
  getDiscountPercentage,
} from "@/lib/product-types";
import type { Product, ProductVariant } from "@/lib/product-types";

function getDefaultVariant(product: Product): ProductVariant | null {
  if (product.variants.length === 0) return null;
  return product.variants.find((v) => v.isDefault) ?? product.variants[0] ?? null;
}

export default function ProductDetailPage() {
  const prefersReducedMotion = useReducedMotion();
  const params = useParams<{ slug: string }>();
  const { addToCart, isInCart } = useCart();

  // Find product from seed data (in production, this would be fetched server-side)
  const product = useMemo(
    () => seedProducts.find((p) => p.slug === params.slug && p.isActive) ?? null,
    [params.slug]
  );

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    () => (product ? getDefaultVariant(product) : null)
  );
  const [quantity, setQuantity] = useState(1);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showUsage, setShowUsage] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f6efe6] px-6">
          <h1 className="text-2xl font-bold text-[#17120f]">Product Not Found</h1>
          <p className="mt-3 text-[#9a8e7f]">
            The product you&apos;re looking for doesn&apos;t exist or is no longer available.
          </p>
          <NavLink
            href="/shop"
            className="mt-6 inline-flex items-center bg-[#17120f] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-gold"
          >
            Back to Shop
          </NavLink>
        </main>
        <Footer />
      </>
    );
  }

  const priceCents = resolveProductPrice(product, selectedVariant);
  const compareAtCents = resolveCompareAtPrice(product, selectedVariant);
  const discount =
    compareAtCents !== null ? getDiscountPercentage(priceCents, compareAtCents) : 0;
  const alreadyInCart = isInCart(product.id, selectedVariant?.id ?? null);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  // Related products (same category, different product)
  const relatedProducts = seedProducts.filter(
    (p) => p.isActive && p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f6efe6]">
        {/* Breadcrumbs */}
        <div className="mx-auto max-w-7xl px-4 pb-2 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          <nav className="flex items-center gap-2 text-[0.68rem] text-[#9a8e7f]">
            <NavLink href="/" className="hover:text-gold transition-colors">
              Home
            </NavLink>
            <span>/</span>
            <NavLink href="/shop" className="hover:text-gold transition-colors">
              Shop
            </NavLink>
            <span>/</span>
            <span className="text-[#17120f]">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Image Gallery */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            >
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden bg-white">
                {product.images[selectedImageIndex] && (
                  <CloudinaryImage
                    src={product.images[selectedImageIndex]}
                    alt={`${product.name} by ${product.brand ?? "Galeo Beauty"}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority
                  />
                )}
                {discount > 0 && (
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white shadow-md">
                      {discount}% off
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative h-16 w-16 overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === idx
                          ? "border-gold"
                          : "border-transparent hover:border-gold/40"
                      }`}
                    >
                      <CloudinaryImage
                        src={img}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                        noSpinner
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Brand */}
              {product.brand && (
                <span className="mb-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#a89272]">
                  {product.brand}
                </span>
              )}

              {/* Name */}
              <h1 className="font-sans text-[1.6rem] font-bold leading-tight text-[#17120f] sm:text-[2rem] lg:text-[2.4rem]">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-[1.3rem] font-bold text-[#17120f]">
                  {formatPrice(priceCents)}
                </span>
                {compareAtCents !== null && compareAtCents > priceCents && (
                  <span className="text-[0.92rem] text-[#b3a898] line-through">
                    {formatPrice(compareAtCents)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-[0.72rem] font-semibold text-red-600">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Short description */}
              {product.shortDescription && (
                <p className="mt-4 text-[0.88rem] leading-relaxed text-[#5d5348]">
                  {product.shortDescription}
                </p>
              )}

              {/* Variant selector */}
              {product.variants.length > 1 && (
                <div className="mt-6">
                  <label className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[#7a6f62]">
                    Size / Option
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => {
                      const isSelected = selectedVariant?.id === variant.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`border px-4 py-2.5 text-[0.76rem] font-medium transition-colors ${
                            isSelected
                              ? "border-[#17120f] bg-[#17120f] text-white"
                              : "border-black/15 bg-white text-[#17120f] hover:border-gold hover:text-gold"
                          }`}
                        >
                          {variant.name}
                          {variant.priceCents !== null && (
                            <span className="ml-1.5 text-[0.68rem] opacity-70">
                              ({formatPrice(variant.priceCents)})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="mt-6 flex items-stretch gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-black/15 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-12 w-10 items-center justify-center text-[#7a6f62] transition-colors hover:text-[#17120f]"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="flex h-12 w-10 items-center justify-center text-[0.86rem] font-semibold text-[#17120f]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-12 w-10 items-center justify-center text-[#7a6f62] transition-colors hover:text-[#17120f]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex flex-1 items-center justify-center gap-2 px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                    addedFeedback
                      ? "bg-green-600 text-white"
                      : "bg-[#17120f] text-white hover:bg-gold"
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <Check className="h-4 w-4" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      {alreadyInCart ? "Add More" : "Add to Cart"}
                    </>
                  )}
                </button>
              </div>

              {/* Delivery info */}
              <div className="mt-6 space-y-2 border-t border-black/8 pt-5">
                <div className="flex items-center gap-2.5 text-[0.76rem] text-[#5d5348]">
                  <MapPin className="h-4 w-4 text-[#a89272]" />
                  <span>In-store pickup available in Hartbeespoort</span>
                </div>
                <div className="flex items-center gap-2.5 text-[0.76rem] text-[#5d5348]">
                  <Truck className="h-4 w-4 text-[#a89272]" />
                  <span>Nationwide delivery available</span>
                </div>
              </div>

              {/* Full description */}
              <div className="mt-6 border-t border-black/8 pt-5">
                <h2 className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#17120f]">
                  Description
                </h2>
                <p className="text-[0.84rem] leading-relaxed text-[#5d5348]">
                  {product.description}
                </p>
              </div>

              {/* Ingredients (expandable) */}
              {product.ingredients && (
                <div className="border-t border-black/8">
                  <button
                    onClick={() => setShowIngredients(!showIngredients)}
                    className="flex w-full items-center justify-between py-4 text-left"
                  >
                    <span className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#17120f]">
                      Ingredients
                    </span>
                    {showIngredients ? (
                      <ChevronUp className="h-4 w-4 text-[#9a8e7f]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#9a8e7f]" />
                    )}
                  </button>
                  {showIngredients && (
                    <p className="pb-4 text-[0.78rem] leading-relaxed text-[#5d5348]">
                      {product.ingredients}
                    </p>
                  )}
                </div>
              )}

              {/* Usage instructions (expandable) */}
              {product.usageInstructions && (
                <div className="border-t border-black/8">
                  <button
                    onClick={() => setShowUsage(!showUsage)}
                    className="flex w-full items-center justify-between py-4 text-left"
                  >
                    <span className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#17120f]">
                      How to Use
                    </span>
                    {showUsage ? (
                      <ChevronUp className="h-4 w-4 text-[#9a8e7f]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#9a8e7f]" />
                    )}
                  </button>
                  {showUsage && (
                    <p className="pb-4 text-[0.78rem] leading-relaxed text-[#5d5348]">
                      {product.usageInstructions}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-black/6 bg-[#f0e8de] py-12 sm:py-16">
            <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-center font-sans text-[1.2rem] font-bold uppercase tracking-[0.08em] text-[#17120f] sm:text-[1.5rem]">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                {relatedProducts.map((p, i) => {
                  const dv = getDefaultVariant(p);
                  const pc = resolveProductPrice(p, dv);
                  return (
                    <NavLink
                      key={p.id}
                      href={`/shop/${p.slug}`}
                      className="group flex flex-col overflow-hidden bg-white transition-shadow hover:shadow-lg hover:shadow-gold/8"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe4db]">
                        {p.images[0] && (
                          <CloudinaryImage
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            noSpinner
                          />
                        )}
                      </div>
                      <div className="px-3 pb-4 pt-3">
                        {p.brand && (
                          <span className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-[#a89272]">
                            {p.brand}
                          </span>
                        )}
                        <h3 className="mt-1 line-clamp-1 text-[0.78rem] font-medium text-[#17120f]">
                          {p.name}
                        </h3>
                        <span className="mt-1 block text-[0.82rem] font-semibold text-[#17120f]">
                          {formatPrice(pc)}
                        </span>
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
