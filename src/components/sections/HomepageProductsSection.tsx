"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";
import { seedProducts } from "@/lib/products-data";
import {
  formatPrice,
  resolveProductPrice,
  resolveCompareAtPrice,
  getDiscountPercentage,
} from "@/lib/product-types";
import type { Product, ProductVariant } from "@/lib/product-types";

/**
 * Resolve which variant to display by default.
 * Falls back to the first variant or null.
 */
function getDefaultVariant(product: Product): ProductVariant | null {
  if (product.variants.length === 0) return null;
  return (
    product.variants.find((v) => v.isDefault) ?? product.variants[0] ?? null
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const defaultVariant = getDefaultVariant(product);
  const priceCents = resolveProductPrice(product, defaultVariant);
  const compareAtCents = resolveCompareAtPrice(product, defaultVariant);
  const discount =
    compareAtCents !== null
      ? getDiscountPercentage(priceCents, compareAtCents)
      : 0;

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: "easeOut",
        delay: prefersReducedMotion ? 0 : Math.min(index * 0.08, 0.32),
      }}
      className="group flex w-[68vw] shrink-0 flex-col sm:w-[42vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw]"
    >
      <NavLink
        href={`/shop/${product.slug}`}
        className="flex flex-col overflow-hidden bg-white"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe4db]">
          {product.images[0] && (
            <CloudinaryImage
              src={product.images[0]}
              alt={`${product.name} by ${product.brand ?? "Galeo Beauty"}`}
              fill
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 44vw, 25vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
              noSpinner
            />
          )}

          {/* Sale badge */}
          {discount > 0 && (
            <div className="absolute left-3 top-3 z-10">
              <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white shadow-md">
                {discount}% off
              </span>
            </div>
          )}

          {/* Quick-view overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 to-transparent p-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
            <span className="inline-flex w-full items-center justify-center gap-2 bg-white px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#17120f] transition-colors hover:bg-gold hover:text-white">
              <ShoppingBag className="h-3.5 w-3.5" />
              View Product
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-3 pb-4 pt-3 sm:px-4 sm:pb-5 sm:pt-4">
          {/* Brand */}
          {product.brand && (
            <span className="mb-1 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-[#a89272]">
              {product.brand}
            </span>
          )}

          {/* Name */}
          <h3 className="line-clamp-2 text-[0.82rem] font-medium leading-snug text-[#17120f] sm:text-[0.88rem]">
            {product.name}
          </h3>

          {/* Variant label */}
          {defaultVariant && product.variants.length > 1 && (
            <span className="mt-1 text-[0.64rem] text-[#9a8e7f]">
              {defaultVariant.name}
              {" · "}
              {product.variants.length} options
            </span>
          )}

          {/* Price */}
          <div className="mt-auto flex items-baseline gap-2 pt-2">
            <span className="text-[0.92rem] font-semibold text-[#17120f]">
              {formatPrice(priceCents)}
            </span>
            {compareAtCents !== null && compareAtCents > priceCents && (
              <span className="text-[0.72rem] text-[#b3a898] line-through">
                {formatPrice(compareAtCents)}
              </span>
            )}
          </div>
        </div>
      </NavLink>
    </motion.article>
  );
}

export function HomepageProductsSection() {
  const prefersReducedMotion = useReducedMotion();

  // Use seed data in dev; in production this would be fetched via props/server component
  const products = seedProducts.filter((p) => p.isFeatured && p.isActive);

  if (products.length === 0) return null;

  return (
    <section className="bg-[#f6efe6] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: "easeOut",
          }}
          className="mb-7 text-center px-2 sm:px-0 lg:mb-10"
        >
          <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-black sm:text-[2rem] lg:text-[2.25rem]">
            Shop Our Products
          </h2>
          <p className="mx-auto mt-1.5 max-w-lg text-[0.82rem] leading-relaxed text-[#7a6f62] sm:text-[0.88rem]">
            Curated beauty essentials from the brands we trust and use in the
            salon.
          </p>
        </motion.div>

        {/* Product row — horizontal scroll on all screen sizes */}
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:gap-4 sm:px-0 hide-scrollbar">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-6 text-center">
          <NavLink
            href="/shop"
            className="inline-flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#17120f] transition-colors hover:text-gold"
          >
            View All Products
            <ArrowRight className="h-3.5 w-3.5" />
          </NavLink>
        </div>
      </div>
    </section>
  );
}
