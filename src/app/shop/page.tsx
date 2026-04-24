"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  Star,
  Sparkles,
  SlidersHorizontal,
  PlayCircle,
  ShieldCheck,
  Truck,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { NavLink } from "@/components/ui/nav-link";
import { useCart } from "@/components/providers/CartProvider";
import { seedProducts } from "@/lib/products-data";
import {
  PRODUCT_CATEGORIES,
  formatPrice,
  getDiscountPercentage,
  resolveCompareAtPrice,
  resolveProductPrice,
} from "@/lib/product-types";
import type { CartItem, Product, ProductVariant } from "@/lib/product-types";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

function getDefaultVariant(product: Product): ProductVariant | null {
  if (product.variants.length === 0) return null;
  return product.variants.find((variant) => variant.isDefault) ?? product.variants[0] ?? null;
}

function formatLabel(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getConcernLabel(product: Product): string {
  return formatLabel(product.tags[0] ?? product.subcategory ?? product.category);
}

function getTagLabel(product: Product, discount: number): string {
  if (discount > 0) return `${discount}% Off`;
  if (product.tags[0]) return formatLabel(product.tags[0]);
  if (product.isFeatured) return "Salon Pick";
  return "Curated";
}

function Badge({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light" | "sale";
}) {
  const styles =
    tone === "light"
      ? "bg-white/90 text-neutral-950"
      : tone === "sale"
        ? "bg-red-600 text-white"
        : "bg-neutral-950 text-white";

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${styles}`}
    >
      {children}
    </span>
  );
}

function ProductCard({
  product,
  index,
  onAdd,
}: {
  product: Product;
  index: number;
  onAdd: (product: Product) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const defaultVariant = getDefaultVariant(product);
  const priceCents = resolveProductPrice(product, defaultVariant);
  const compareAtCents = resolveCompareAtPrice(product, defaultVariant);
  const discount = compareAtCents !== null ? getDiscountPercentage(priceCents, compareAtCents) : 0;
  const tag = getTagLabel(product, discount);

  return (
    <motion.article
      layout
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.35,
        ease: "easeOut",
        delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.2),
      }}
      className="group overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-xl"
    >
      <NavLink href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
          {product.images[0] && (
            <CloudinaryImage
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              noSpinner
            />
          )}
          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
            <Badge tone={discount > 0 ? "sale" : "light"}>{tag}</Badge>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105"
              aria-label={`Save ${product.name}`}
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onAdd(product);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <ShoppingBag className="h-4 w-4" /> Add to bag
            </button>
          </div>
        </div>
        <div className="space-y-3 p-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              {product.brand ?? "Galeo Beauty"}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-neutral-950">{product.name}</h2>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-neutral-500">
              {product.shortDescription ?? product.description}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 text-sm text-neutral-700">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{product.isFeatured ? "4.9" : "4.8"}</span>
              <span className="text-neutral-400">({24 + index * 13})</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-neutral-950">{formatPrice(priceCents)}</p>
              {compareAtCents !== null && compareAtCents > priceCents && (
                <p className="text-xs text-neutral-400 line-through">{formatPrice(compareAtCents)}</p>
              )}
            </div>
          </div>
        </div>
      </NavLink>
    </motion.article>
  );
}

function RoutineCard() {
  return (
    <section className="grid gap-6 rounded-[36px] bg-neutral-950 p-6 text-white md:grid-cols-[1.1fr_0.9fr] md:p-10">
      <div className="flex flex-col justify-between gap-8">
        <div>
          <Badge tone="light">Routine Builder</Badge>
          <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight md:text-5xl">
            Shop by your beauty goal, not just by product.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/65 md:text-base">
            Guide customers into simple routines: cleanse, treat, moisturise, protect.
            This makes Galeo Beauty feel like a premium beauty advisor instead of a normal
            product grid.
          </p>
        </div>
        <NavLink
          href="/contact"
          className="flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950"
        >
          Build my routine <ChevronRight className="h-4 w-4" />
        </NavLink>
      </div>
      <div className="grid gap-3">
        {["1. Cleanse", "2. Treat", "3. Moisturise", "4. Protect"].map((step) => (
          <div
            key={step}
            className="flex items-center justify-between rounded-2xl bg-white/10 p-4 ring-1 ring-white/10"
          >
            <span className="font-medium">{step}</span>
            <Plus className="h-4 w-4 text-white/60" />
          </div>
        ))}
      </div>
    </section>
  );
}

function MiniCart({
  cart,
  totalCents,
  onRemove,
}: {
  cart: CartItem[];
  totalCents: number;
  onRemove: (item: CartItem) => void;
}) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <aside className="sticky top-6 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your bag</h3>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold">
          {totalItems} items
        </span>
      </div>
      <div className="mt-5 space-y-4">
        {cart.length === 0 ? (
          <p className="rounded-2xl bg-stone-50 p-4 text-sm leading-6 text-neutral-500">
            Your selected products will appear here. Keeping the bag visible on desktop
            helps customers move to checkout faster.
          </p>
        ) : (
          cart.map((item) => (
            <div key={`${item.productId}:${item.variantId ?? "base"}`} className="flex gap-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-stone-100">
                {item.image && (
                  <CloudinaryImage
                    src={item.image}
                    alt={item.productName}
                    fill
                    sizes="64px"
                    className="object-cover"
                    noSpinner
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{item.productName}</p>
                <p className="text-xs text-neutral-500">
                  Qty {item.quantity}
                  {item.variantName ? ` · ${item.variantName}` : ""}
                  {" · "}
                  {formatPrice(item.priceCents)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(item)}
                className="grid h-7 w-7 place-items-center rounded-full bg-stone-100"
                aria-label={`Remove ${item.productName}`}
              >
                <Minus className="h-3 w-3" />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="mt-6 border-t border-stone-100 pt-5">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Subtotal</span>
          <span className="font-semibold">{formatPrice(totalCents)}</span>
        </div>
        <div className="mt-4 grid gap-3">
          <NavLink
            href={cart.length ? "/shop/checkout" : "/shop/cart"}
            className={`w-full rounded-full px-5 py-3 text-center text-sm font-semibold ${
              cart.length
                ? "bg-neutral-950 text-white"
                : "cursor-not-allowed bg-neutral-200 text-neutral-500"
            }`}
          >
            {cart.length ? "Checkout securely" : "Your bag is empty"}
          </NavLink>
          <NavLink
            href="/shop/cart"
            className="w-full rounded-full border border-black/10 px-5 py-3 text-center text-sm font-semibold text-neutral-950"
          >
            View full bag
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default function ShopPage() {
  const [category, setCategory] = useState("All");
  const [concern, setConcern] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const { items, totalCents, addToCart, updateQuantity, removeFromCart } = useCart();

  const allProducts = useMemo(() => seedProducts.filter((product) => product.isActive), []);

  const concerns = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(allProducts.map((product) => getConcernLabel(product)))).sort(),
    ];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      const categoryLabel =
        PRODUCT_CATEGORIES.find((option) => option.id === product.category)?.label ?? formatLabel(product.category);
      const productConcern = getConcernLabel(product);
      const matchesCategory = category === "All" || categoryLabel === category;
      const matchesConcern = concern === "All" || productConcern === concern;
      const haystack = [
        product.brand ?? "",
        product.name,
        categoryLabel,
        productConcern,
        product.shortDescription ?? "",
        product.description,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesCategory && matchesConcern && matchesQuery;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => {
          const aPrice = resolveProductPrice(a, getDefaultVariant(a));
          const bPrice = resolveProductPrice(b, getDefaultVariant(b));
          return aPrice - bPrice;
        });
        break;
      case "price-desc":
        result = [...result].sort((a, b) => {
          const aPrice = resolveProductPrice(a, getDefaultVariant(a));
          const bPrice = resolveProductPrice(b, getDefaultVariant(b));
          return bPrice - aPrice;
        });
        break;
      case "newest":
        result = [...result].slice().reverse();
        break;
      case "featured":
      default:
        result = [...result].sort((a, b) => a.sortOrder - b.sortOrder);
        break;
    }

    return result;
  }, [allProducts, category, concern, query, sort]);

  const categoryOptions = useMemo(() => {
    return [
      "All",
      ...PRODUCT_CATEGORIES.filter((option) =>
        allProducts.some((product) => product.category === option.id)
      ).map((option) => option.label),
    ];
  }, [allProducts]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, getDefaultVariant(product), 1);
  };

  const handleRemoveFromCart = (item: CartItem) => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.variantId, item.quantity - 1);
      return;
    }

    removeFromCart(item.productId, item.variantId);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f5eee6] text-neutral-950">
        <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
                <Sparkles className="h-4 w-4" /> GaleoBeauty Shop
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Premium beauty essentials, curated by the salon.
              </h1>
            </div>
            <div className="grid gap-2 text-sm text-neutral-600 md:w-72">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Salon-approved products
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" /> Delivery or salon pickup
              </div>
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" /> Product demos coming soon
              </div>
            </div>
          </header>

          <div className="mt-8 grid gap-3 rounded-[28px] bg-white/70 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur lg:grid-cols-[1fr_auto_auto_auto]">
            <label className="flex items-center gap-3 rounded-full bg-white px-4 py-3">
              <Search className="h-4 w-4 text-neutral-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Dermalogica, Olaplex, nails..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-full bg-white px-4 py-3 text-sm outline-none"
            >
              {categoryOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select
              value={concern}
              onChange={(event) => setConcern(event.target.value)}
              className="rounded-full bg-white px-4 py-3 text-sm outline-none"
            >
              {concerns.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="rounded-full bg-white px-4 py-3 text-sm outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-8">
              <RoutineCard />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Shop products</h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} matched
                  </p>
                </div>
                <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/5">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
              </div>

              {filteredProducts.length > 0 ? (
                <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      onAdd={handleAddToCart}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="rounded-[28px] bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
                  <p className="text-lg font-medium text-[#17120f]">No products found</p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Try adjusting your search, category or concern filters.
                  </p>
                </div>
              )}
            </div>

            <MiniCart cart={items} totalCents={totalCents} onRemove={handleRemoveFromCart} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
