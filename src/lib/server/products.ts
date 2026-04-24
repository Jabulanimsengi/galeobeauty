import "server-only";
import { getPostgresPool } from "@/lib/server/postgres";
import type { Product, ProductVariant } from "@/lib/product-types";

// ============================================
// DATABASE ROW TYPES
// ============================================

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  short_description: string | null;
  description: string;
  category: string;
  subcategory: string | null;
  base_price_cents: number;
  compare_at_price_cents: number | null;
  currency: string;
  images: string[];
  tags: string[];
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  weight_grams: number | null;
  ingredients: string | null;
  usage_instructions: string | null;
  seo_title: string | null;
  seo_description: string | null;
}

interface VariantRow {
  id: string;
  product_id: string;
  name: string;
  sku: string | null;
  price_cents: number | null;
  compare_at_price_cents: number | null;
  is_default: boolean;
  sort_order: number;
}

// ============================================
// MAPPERS
// ============================================

function mapVariantRow(row: VariantRow): ProductVariant {
  return {
    id: row.id,
    productId: row.product_id,
    name: row.name,
    sku: row.sku,
    priceCents: row.price_cents,
    compareAtPriceCents: row.compare_at_price_cents,
    isDefault: row.is_default,
    sortOrder: row.sort_order,
  };
}

function mapProductRow(row: ProductRow, variants: ProductVariant[]): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    shortDescription: row.short_description,
    description: row.description,
    category: row.category,
    subcategory: row.subcategory,
    basePriceCents: row.base_price_cents,
    compareAtPriceCents: row.compare_at_price_cents,
    currency: row.currency,
    images: Array.isArray(row.images) ? row.images : [],
    tags: Array.isArray(row.tags) ? row.tags : [],
    isActive: row.is_active,
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
    weightGrams: row.weight_grams,
    ingredients: row.ingredients,
    usageInstructions: row.usage_instructions,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    variants,
  };
}

// ============================================
// QUERIES
// ============================================

async function attachVariants(productIds: string[]): Promise<Map<string, ProductVariant[]>> {
  if (productIds.length === 0) return new Map();

  const pool = getPostgresPool();
  const result = await pool.query<VariantRow>(
    `select * from product_variants
     where product_id = any($1::uuid[])
     order by sort_order asc, created_at asc`,
    [productIds]
  );

  const map = new Map<string, ProductVariant[]>();
  for (const row of result.rows) {
    const variants = map.get(row.product_id) ?? [];
    variants.push(mapVariantRow(row));
    map.set(row.product_id, variants);
  }
  return map;
}

/** Get all active products, ordered by sort_order. */
export async function getActiveProducts(): Promise<Product[]> {
  const pool = getPostgresPool();
  const result = await pool.query<ProductRow>(
    `select * from products
     where is_active = true
     order by sort_order asc, created_at desc`
  );

  const variantMap = await attachVariants(result.rows.map((r) => r.id));
  return result.rows.map((row) => mapProductRow(row, variantMap.get(row.id) ?? []));
}

/** Get featured products for the homepage showcase. */
export async function getFeaturedProducts(): Promise<Product[]> {
  const pool = getPostgresPool();
  const result = await pool.query<ProductRow>(
    `select * from products
     where is_active = true and is_featured = true
     order by sort_order asc, created_at desc`
  );

  const variantMap = await attachVariants(result.rows.map((r) => r.id));
  return result.rows.map((row) => mapProductRow(row, variantMap.get(row.id) ?? []));
}

/** Get a single product by slug. Returns null if not found or inactive. */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const pool = getPostgresPool();
  const result = await pool.query<ProductRow>(
    `select * from products where slug = $1 and is_active = true limit 1`,
    [slug]
  );

  const row = result.rows[0];
  if (!row) return null;

  const variantMap = await attachVariants([row.id]);
  return mapProductRow(row, variantMap.get(row.id) ?? []);
}

/** Get active products in a specific category. */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const pool = getPostgresPool();
  const result = await pool.query<ProductRow>(
    `select * from products
     where is_active = true and category = $1
     order by sort_order asc, created_at desc`,
    [category]
  );

  const variantMap = await attachVariants(result.rows.map((r) => r.id));
  return result.rows.map((row) => mapProductRow(row, variantMap.get(row.id) ?? []));
}

/** Get all active product slugs (for generateStaticParams). */
export async function getAllProductSlugs(): Promise<string[]> {
  const pool = getPostgresPool();
  const result = await pool.query<{ slug: string }>(
    `select slug from products where is_active = true order by sort_order asc`
  );
  return result.rows.map((r) => r.slug);
}

/** Get a product by ID (for order validation). */
export async function getProductById(id: string): Promise<Product | null> {
  const pool = getPostgresPool();
  const result = await pool.query<ProductRow>(
    `select * from products where id = $1 and is_active = true limit 1`,
    [id]
  );

  const row = result.rows[0];
  if (!row) return null;

  const variantMap = await attachVariants([row.id]);
  return mapProductRow(row, variantMap.get(row.id) ?? []);
}
