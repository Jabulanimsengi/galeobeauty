// ============================================
// SEED DATA — INITIAL PRODUCTS
// ============================================
// Static product data used for development and initial DB seeding.
// In production, products are managed via the admin panel and stored in PostgreSQL.
// ============================================

import type { Product } from "@/lib/product-types";

/**
 * Six curated products spanning the core categories Galeo Beauty retails.
 * Prices are in cents (ZAR). Images reference existing Cloudinary paths.
 */
export const seedProducts: Product[] = [
  {
    id: "seed-product-001",
    slug: "dermalogica-daily-microfoliant",
    name: "Daily Microfoliant",
    brand: "Dermalogica",
    shortDescription:
      "A rice-based enzyme powder that micro-exfoliates for brighter, smoother skin.",
    description:
      "Dermalogica Daily Microfoliant is a unique rice-based enzyme powder that activates upon contact with water, releasing Papain, Salicylic Acid and Rice Enzymes to micro-exfoliate dead skin cells. Suitable for all skin types, it brightens and smooths the skin without irritation. Use daily for a polished, luminous complexion.",
    category: "skincare",
    subcategory: "exfoliant",
    basePriceCents: 129500,
    compareAtPriceCents: null,
    currency: "ZAR",
    images: ["/images/dermalogica/dermalogica-proskin-treatment.jpg"],
    tags: ["bestseller", "sensitive-safe", "daily-use"],
    isActive: true,
    isFeatured: true,
    sortOrder: 1,
    weightGrams: 74,
    ingredients:
      "Corn Starch, Rice Bran, Rice Extract, Papain, Salicylic Acid, Phytic Acid, Grapefruit Extract, Licorice Extract, Colloidal Oatmeal.",
    usageInstructions:
      "Dispense about half a teaspoon into very wet hands. Create a creamy paste by rubbing hands together, then apply to face in circular motions for 60 seconds. Rinse thoroughly with warm water.",
    seoTitle: "Buy Dermalogica Daily Microfoliant | Galeo Beauty",
    seoDescription:
      "Shop the Dermalogica Daily Microfoliant at Galeo Beauty, Hartbeespoort. Rice-based enzyme powder for brighter, smoother skin.",
    variants: [
      {
        id: "seed-variant-001a",
        productId: "seed-product-001",
        name: "13g Travel",
        sku: "DL-DMF-13",
        priceCents: 39500,
        compareAtPriceCents: null,
        isDefault: false,
        sortOrder: 0,
      },
      {
        id: "seed-variant-001b",
        productId: "seed-product-001",
        name: "74g Full Size",
        sku: "DL-DMF-74",
        priceCents: null,  // uses base price
        compareAtPriceCents: null,
        isDefault: true,
        sortOrder: 1,
      },
    ],
  },
  {
    id: "seed-product-002",
    slug: "dermalogica-biolumin-c-serum",
    name: "BioLumin-C Serum",
    brand: "Dermalogica",
    shortDescription:
      "A high-performance Vitamin C serum that firms, brightens, and defends against environmental damage.",
    description:
      "This ultra-stable Vitamin C serum from Dermalogica uses a bio-technology approach to dramatically brighten and firm skin while defending against environmental assault. The advanced formula includes Lactic Acid and Palmitoyl Tripeptide-5 to boost the skin's natural luminosity. Ideal for dull, uneven skin tones.",
    category: "skincare",
    subcategory: "serum",
    basePriceCents: 199500,
    compareAtPriceCents: 225000,
    currency: "ZAR",
    images: ["/images/dermalogica/dermalogica-proskin-treatment.jpg"],
    tags: ["anti-ageing", "vitamin-c", "brightening"],
    isActive: true,
    isFeatured: true,
    sortOrder: 2,
    weightGrams: 30,
    ingredients:
      "Ascorbyl Glucoside, Palmitoyl Tripeptide-5, Lactic Acid, Sophora Japonica Extract, Chia Seed Oil.",
    usageInstructions:
      "Apply 4–6 drops to clean skin morning and evening before moisturiser. Gently press into face, neck, and décolleté using upward strokes.",
    seoTitle: "Buy Dermalogica BioLumin-C Serum | Galeo Beauty",
    seoDescription:
      "Shop the Dermalogica BioLumin-C Vitamin C Serum at Galeo Beauty, Hartbeespoort. Firms, brightens, and defends your skin.",
    variants: [
      {
        id: "seed-variant-002a",
        productId: "seed-product-002",
        name: "30ml",
        sku: "DL-BLC-30",
        priceCents: null,
        compareAtPriceCents: null,
        isDefault: true,
        sortOrder: 0,
      },
    ],
  },
  {
    id: "seed-product-003",
    slug: "olaplex-no-3-hair-perfector",
    name: "No. 3 Hair Perfector",
    brand: "Olaplex",
    shortDescription:
      "Award-winning at-home bond repair treatment that strengthens and restores damaged hair.",
    description:
      "Olaplex No. 3 Hair Perfector is a weekly at-home treatment that reduces breakage and visibly strengthens hair by repairing broken disulfide bonds. It works on all hair types and is especially effective for colour-treated, chemically processed, or heat-damaged hair. Use before shampoo for noticeably softer, shinier, healthier hair.",
    category: "haircare",
    subcategory: "treatment",
    basePriceCents: 65000,
    compareAtPriceCents: null,
    currency: "ZAR",
    images: ["/images/gallery/hair/balayage-hair-styling-galeo-salon.jpg"],
    tags: ["bond-repair", "colour-safe", "award-winning"],
    isActive: true,
    isFeatured: true,
    sortOrder: 3,
    weightGrams: 100,
    ingredients:
      "Bis-Aminopropyl Diglycol Dimaleate, Water, Propylene Glycol, Cetearyl Alcohol, Behentrimonium Methosulfate, Cetyl Alcohol, Phenoxyethanol.",
    usageInstructions:
      "Apply a generous amount to damp, towel-dried hair. Comb through and leave on for a minimum of 10 minutes. Rinse, then shampoo and condition as normal.",
    seoTitle: "Buy Olaplex No. 3 Hair Perfector | Galeo Beauty",
    seoDescription:
      "Shop the Olaplex No. 3 Hair Perfector at Galeo Beauty. The award-winning bond repair treatment for stronger, healthier hair.",
    variants: [
      {
        id: "seed-variant-003a",
        productId: "seed-product-003",
        name: "100ml",
        sku: "OPX-NO3-100",
        priceCents: null,
        compareAtPriceCents: null,
        isDefault: true,
        sortOrder: 0,
      },
      {
        id: "seed-variant-003b",
        productId: "seed-product-003",
        name: "250ml",
        sku: "OPX-NO3-250",
        priceCents: 115000,
        compareAtPriceCents: null,
        isDefault: false,
        sortOrder: 1,
      },
    ],
  },
  {
    id: "seed-product-004",
    slug: "bio-sculpture-cuticle-oil",
    name: "Cuticle Oil",
    brand: "Bio Sculpture",
    shortDescription:
      "Nourishing cuticle oil enriched with Vitamin E and Jojoba to hydrate nails and cuticles.",
    description:
      "Bio Sculpture Cuticle Oil is a professional-grade nail care essential that delivers deep hydration to dry, damaged cuticles. Formulated with Jojoba Oil and Vitamin E, it penetrates the nail plate to restore flexibility and prevent breakage. Use daily to maintain healthy, salon-fresh nails between appointments.",
    category: "nails",
    subcategory: "nail-care",
    basePriceCents: 22000,
    compareAtPriceCents: 27500,
    currency: "ZAR",
    images: ["/images/gallery/nails/nude-almond-gel-nails-galeo-beauty-salon.jpg"],
    tags: ["nail-care", "moisturising", "professional"],
    isActive: true,
    isFeatured: true,
    sortOrder: 4,
    weightGrams: 15,
    ingredients:
      "Simmondsia Chinensis (Jojoba) Seed Oil, Tocopheryl Acetate (Vitamin E), Prunus Amygdalus Dulcis (Sweet Almond) Oil, Fragrance.",
    usageInstructions:
      "Apply a small drop to each cuticle and nail bed. Massage gently in circular motions until fully absorbed. Use morning and evening for best results.",
    seoTitle: "Buy Bio Sculpture Cuticle Oil | Galeo Beauty",
    seoDescription:
      "Shop Bio Sculpture Cuticle Oil at Galeo Beauty, Hartbeespoort. Professional nail care with Jojoba and Vitamin E.",
    variants: [
      {
        id: "seed-variant-004a",
        productId: "seed-product-004",
        name: "9ml",
        sku: "BS-CO-9",
        priceCents: null,
        compareAtPriceCents: null,
        isDefault: true,
        sortOrder: 0,
      },
    ],
  },
  {
    id: "seed-product-005",
    slug: "matsimela-body-butter-marula",
    name: "Marula Body Butter",
    brand: "Matsimela",
    shortDescription:
      "Luxurious African Marula body butter that deeply moisturises and softens dry skin.",
    description:
      "Matsimela Marula Body Butter is a rich, luxurious moisturiser infused with cold-pressed Marula Oil — a deeply nourishing African superfood for the skin. It absorbs quickly without leaving a greasy residue, leaving skin silky, supple, and intensely hydrated. The warm, African-inspired fragrance makes every application a sensory experience.",
    category: "body",
    subcategory: "moisturiser",
    basePriceCents: 34500,
    compareAtPriceCents: null,
    currency: "ZAR",
    images: ["/images/massages/deep-relaxation-neck-massage.jpg"],
    tags: ["south-african", "marula", "hydrating"],
    isActive: true,
    isFeatured: true,
    sortOrder: 5,
    weightGrams: 200,
    ingredients:
      "Sclerocarya Birrea (Marula) Seed Oil, Shea Butter, Glycerin, Cocoa Seed Butter, Beeswax, Vitamin E, Natural Fragrance.",
    usageInstructions:
      "Scoop a generous amount and massage into skin after bathing. Focus on dry areas such as elbows, knees, and heels. Reapply as needed throughout the day.",
    seoTitle: "Buy Matsimela Marula Body Butter | Galeo Beauty",
    seoDescription:
      "Shop Matsimela Marula Body Butter at Galeo Beauty. Luxurious African body moisturiser with cold-pressed Marula Oil.",
    variants: [
      {
        id: "seed-variant-005a",
        productId: "seed-product-005",
        name: "200ml",
        sku: "MAT-BB-200",
        priceCents: null,
        compareAtPriceCents: null,
        isDefault: true,
        sortOrder: 0,
      },
      {
        id: "seed-variant-005b",
        productId: "seed-product-005",
        name: "400ml",
        sku: "MAT-BB-400",
        priceCents: 55000,
        compareAtPriceCents: null,
        isDefault: false,
        sortOrder: 1,
      },
    ],
  },
  {
    id: "seed-product-006",
    slug: "qms-active-exfoliant",
    name: "Active Exfoliant",
    brand: "QMS Medicosmetics",
    shortDescription:
      "Clinical-grade enzyme exfoliant that refines pores and accelerates cell turnover.",
    description:
      "QMS Active Exfoliant is a medical-grade enzyme peel that gently dissolves dead surface cells without abrasion. It uses a combination of fruit enzymes and micro-particles to refine pores, even skin tone, and prepare the skin for deeper absorption of serums and moisturisers. Developed by German plastic surgeons, this product represents the intersection of clinical efficacy and luxury skincare.",
    category: "skincare",
    subcategory: "exfoliant",
    basePriceCents: 175000,
    compareAtPriceCents: 195000,
    currency: "ZAR",
    images: ["/images/dermalogica/dermalogica-proskin-treatment.jpg"],
    tags: ["medical-grade", "enzyme-peel", "pore-refining"],
    isActive: true,
    isFeatured: true,
    sortOrder: 6,
    weightGrams: 75,
    ingredients:
      "Papain, Bromelain, Kaolin, Jojoba Esters, Glycerin, Aloe Barbadensis Leaf Juice, Tocopherol.",
    usageInstructions:
      "Apply a thin layer to cleansed, dry skin avoiding the eye area. Leave for 5–10 minutes, then remove with a damp cloth using gentle circular motions. Use 2–3 times per week.",
    seoTitle: "Buy QMS Active Exfoliant | Galeo Beauty",
    seoDescription:
      "Shop QMS Medicosmetics Active Exfoliant at Galeo Beauty, Hartbeespoort. Clinical-grade enzyme peel for refined, luminous skin.",
    variants: [
      {
        id: "seed-variant-006a",
        productId: "seed-product-006",
        name: "30ml",
        sku: "QMS-AE-30",
        priceCents: 89500,
        compareAtPriceCents: 99500,
        isDefault: false,
        sortOrder: 0,
      },
      {
        id: "seed-variant-006b",
        productId: "seed-product-006",
        name: "75ml",
        sku: "QMS-AE-75",
        priceCents: null,
        compareAtPriceCents: null,
        isDefault: true,
        sortOrder: 1,
      },
    ],
  },
];
