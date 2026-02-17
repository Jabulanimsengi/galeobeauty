
// ============================================
// CENTRALIZED SERVICES CONTENT
// ============================================
// This file contains the pure data for services without UI dependencies (icons).
// It is safe to import in next.config.ts for redirects.

export interface ServiceItem {
    id: string;
    name: string;
    price: string;
    duration?: string;
    note?: string;
    description?: string;
}

export interface ServiceSubcategory {
    id: string;
    title: string;
    items: ServiceItem[];
    note?: string;
}

export interface ServiceCategoryContent {
    id: string;
    title: string;
    subtitle: string;
    // Icon removed for pure data
    badge?: string;
    badgeVariant?: "medical" | "premium" | "safe";
    image: string;
    subcategories: ServiceSubcategory[];
}

export const serviceCategoriesContent: ServiceCategoryContent[] = [
    // ========================================
    // HART AESTHETICS (Injectables)
    // ========================================
    {
        id: "hart-aesthetics",
        title: "Hart Aesthetics",
        subtitle: "Advanced Injectables",
        image: "/images/services/anti_ageing/anti_ageing_01.jpeg",
        badge: "Medical Grade",
        badgeVariant: "medical",
        subcategories: [
            {
                id: "face-lifts",
                title: "Face Lifts & Rejuvenation",
                items: [
                    { id: "nefertiti-lift", name: "Nefertiti Lift", duration: "1hr", price: "R7,950", description: "Named after the Egyptian queen, this treatment uses targeted injections along the jawline and neck to lift and define, creating a sleeker, more youthful profile." },
                    { id: "liquid-facelift", name: "Non Surgical Liquid Face Lift", duration: "1hr", price: "R10,000", description: "A comprehensive rejuvenation combining dermal fillers and muscle relaxants to restore volume, smooth wrinkles, and lift sagging skin without surgery." },
                    { id: "collagen-biostimulator", name: "Collagen Biostimulator Injections 10ml", duration: "1hr", price: "R5,000", description: "Stimulates your skin's natural collagen production for gradual, long-lasting skin tightening and rejuvenation that looks completely natural." },
                ],
            },
            {
                id: "tox-treatment",
                title: "Tox Treatment",
                items: [
                    { id: "tox-per-unit", name: "Tox Per Unit", duration: "1hr", price: "R59.60", description: "Precision muscle relaxant injections that smooth fine lines and wrinkles. Units customized to your needs for natural-looking results." },
                ],
            },
            {
                id: "skin-boosters",
                title: "Under Eye Skin Boosters",
                items: [
                    { id: "undereye-2-treatments", name: "Under Eye Skin Booster (2 Treatments)", duration: "1hr", price: "R4,000", description: "Intensive hydration therapy for the delicate under-eye area. Two sessions of micro-injections to plump, brighten, and reduce dark circles." },
                    { id: "undereye-1-treatment", name: "Under Eye Skin Booster (1 Treatment)", duration: "1hr", price: "R2,800", description: "Targeted hydration boost using hyaluronic acid micro-injections to refresh tired eyes and reduce the appearance of fine lines." },
                ],
            },
            {
                id: "dermal-fillers",
                title: "Dermal Fillers",
                items: [
                    { id: "cheek-fillers-2ml", name: "Dermal Cheek Fillers 2ml", duration: "1hr", price: "R6,000", description: "Restore youthful volume to mid-face with premium hyaluronic acid filler. Lifts cheekbones and smooths nasolabial folds for a refreshed appearance." },
                    { id: "cheek-fillers-1ml", name: "Dermal Cheek Fillers 1ml", duration: "1hr", price: "R3,500", description: "Subtle cheek enhancement using premium filler to add definition and lift. Perfect for maintaining or light enhancement." },
                    { id: "russian-lip-1ml", name: "Dermal Russian Lip Fillers 1ml", duration: "1hr", price: "R3,000", description: "The sought-after Russian lip technique creates a flatter, more defined lip shape with height rather than projection. Creates a doll-like, heart-shaped pout." },
                    { id: "dermal-filler-1ml", name: "Dermal Filler 1ml", duration: "1hr", price: "R2,800", description: "Versatile hyaluronic acid filler for lips, lines, or facial contouring. Customizable placement for natural-looking enhancement." },
                ],
            },
        ],
    },
    // ========================================
    // FAT FREEZING
    // ========================================
    {
        id: "fat-freezing",
        title: "Fat Freezing",
        subtitle: "Body Contouring",
        image: "/images/services/fat_freezing/Gallery_image_01(32).png.jpeg",
        subcategories: [
            {
                id: "cryolipolysis",
                title: "Cryolipolysis",
                items: [
                    { id: "fat-freezing-session", name: "Fat Freezing Session", duration: "45min", price: "R800" },
                    { id: "fat-freezing-4-cups", name: "Fat Freezing (4 Cups)", duration: "45min", price: "R2,450" },
                    { id: "fat-freezing-2-cups", name: "Fat Freezing (2 Cups)", duration: "45min", price: "R1,450" },
                ],
            },
        ],
    },
    // ========================================
    // SLIMMING
    // ========================================
    {
        id: "slimming",
        title: "Slimming",
        subtitle: "Weight Loss",
        image: "/images/services/slimming_weightloss/EMS01.png",
        subcategories: [
            {
                id: "slimming-injections",
                title: "Injections",
                items: [
                    { id: "lemon-bottle-10ml", name: "Lemon Bottle (10ml)", duration: "30min", price: "R1,400" },
                    { id: "slimming-injection", name: "Slimming Injection", duration: "15min", price: "R300" },
                ],
            },
        ],
    },
    // ========================================
    // MASSAGES
    // ========================================
    {
        id: "massages",
        title: "Massages",
        subtitle: "Relaxation & Therapy",
        image: "/images/services/massage.png",
        subcategories: [
            {
                id: "body-massage",
                title: "Full Body",
                items: [
                    { id: "swedish-massage-60", name: "Swedish Massage (60min)", duration: "1hr", price: "R500" },
                    { id: "aromatherapy-60", name: "Aromatherapy Massage (60min)", duration: "1hr", price: "R550" },
                    { id: "hot-stone-60", name: "Hot Stone Massage (60min)", duration: "1hr", price: "R600" },
                    { id: "deep-tissue-60", name: "Deep Tissue Massage (60min)", duration: "1hr", price: "R600" },
                    { id: "sports-massage-60", name: "Sports Massage (60min)", duration: "1hr", price: "R600" },
                    { id: "back-neck-30", name: "Back & Neck Massage (30min)", duration: "30min", price: "R350" },
                    { id: "back-neck-45", name: "Back & Neck Massage (45min)", duration: "45min", price: "R450" },
                ],
            },
        ],
    },
    // ========================================
    // DERMALOGICA
    // ========================================
    {
        id: "dermalogica",
        title: "Dermalogica",
        subtitle: "Professional Skincare",
        image: "/images/services/face-care-01.png",
        subcategories: [
            {
                id: "pro-skin",
                title: "Pro Skin Treatments",
                items: [
                    { id: "pro-skin-30", name: "Pro Skin 30", duration: "30min", price: "R380" },
                    { id: "pro-skin-60", name: "Pro Skin 60", duration: "1hr", price: "R620" },
                    { id: "pro-bright", name: "Pro Bright", duration: "1hr", price: "R990" },
                    { id: "pro-firm", name: "Pro Firm", duration: "1hr", price: "R990" },
                    { id: "pro-clear", name: "Pro Clear", duration: "1hr", price: "R990" },
                    { id: "pro-calm", name: "Pro Calm", duration: "1hr", price: "R990" },
                    { id: "eye-peel", name: "Pro Eye Peel", duration: "30min", price: "R350" },
                ],
            },
            {
                id: "peels",
                title: "Chemical Peels",
                items: [
                    { id: "pro-power-peel-30", name: "Pro Power Peel 30", duration: "30min", price: "R750" },
                    { id: "pro-power-peel-60", name: "Pro Power Peel 60", duration: "1hr", price: "R1,050" },
                ],
            },
        ],
    },
    // ========================================
    // IPL
    // ========================================
    {
        id: "ipl",
        title: "IPL",
        subtitle: "Hair Removal",
        image: "/images/services/ipl-hair-removal.png",
        subcategories: [
            {
                id: "ipl-face",
                title: "Face",
                items: [
                    { id: "ipl-full-face", name: "IPL Full Face", duration: "30min", price: "R550" },
                    { id: "ipl-lip", name: "IPL Upper Lip", duration: "15min", price: "R200" },
                    { id: "ipl-chin", name: "IPL Chin", duration: "15min", price: "R200" },
                    { id: "ipl-beard", name: "IPL Beard", duration: "30min", price: "R450" },
                ],
            },
            {
                id: "ipl-body",
                title: "Body",
                items: [
                    { id: "ipl-underarm", name: "IPL Underarm", duration: "15min", price: "R350" },
                    { id: "ipl-bikini", name: "IPL Bikini", duration: "30min", price: "R450" },
                    { id: "ipl-brazilian", name: "IPL Brazilian", duration: "45min", price: "R550" },
                    { id: "ipl-hollywood", name: "IPL Hollywood", duration: "45min", price: "R650" },
                    { id: "ipl-full-leg", name: "IPL Full Leg", duration: "1hr", price: "R1,200" },
                    { id: "ipl-half-leg", name: "IPL Half Leg", duration: "45min", price: "R800" },
                    { id: "ipl-full-arm", name: "IPL Full Arm", duration: "45min", price: "R800" },
                    { id: "ipl-half-arm", name: "IPL Half Arm", duration: "30min", price: "R550" },
                    { id: "ipl-back", name: "IPL Back", duration: "45min", price: "R1,200" },
                    { id: "ipl-chest", name: "IPL Chest", duration: "45min", price: "R900" },
                ],
            },
        ],
    },
    // ========================================
    // MAKEUP
    // ========================================
    {
        id: "makeup",
        title: "Makeup",
        subtitle: "Professional Application",
        image: "/images/services/makeup/makeup_01.jpeg",
        subcategories: [
            {
                id: "makeup-services",
                title: "Services",
                items: [
                    { id: "full-face-makeup", name: "Full Face Makeup", duration: "1hr", price: "R550" },
                    { id: "bridal-makeup", name: "Bridal Makeup", duration: "1hr 30min", price: "R850" },
                    { id: "bridal-trial", name: "Bridal Makeup Trial", duration: "1hr", price: "R650" },
                ],
            },
        ],
    },
    // ========================================
    // MEDICAL
    // ========================================
    {
        id: "medical",
        title: "Medical",
        subtitle: "Clinical Treatments",
        image: "/images/services/eye-care-01.png",
        subcategories: [
            {
                id: "medical-treatments",
                title: "Medical Treatments",
                items: [
                    { id: "vaginal-tightening", name: "Vaginal Tightening", duration: "1hr", price: "R4,950" },
                    { id: "fractional-laser", name: "Fractional Laser Full Face", duration: "1hr", price: "R2,430" },
                    { id: "plasmage", name: "Plasmage", duration: "1hr", price: "R899.10" },
                    { id: "iv-drip", name: "IV Drip", duration: "45min", price: "R1,200" },
                ],
            },
        ],
    },

    // ========================================
    // PERMANENT MAKEUP
    // ========================================
    {
        id: "permanent-makeup",
        title: "Permanent Makeup",
        subtitle: "Long-lasting Beauty",
        image: "/images/services/face/lashes_01.jpeg",
        subcategories: [
            {
                id: "brows",
                title: "Brows",
                items: [
                    { id: "microblading", name: "Microblading", duration: "1hr 30min", price: "R1,500" },
                    { id: "microshading", name: "Microshading", duration: "1hr 30min", price: "R1,800" },
                    { id: "combo-brows", name: "Combo Brows", duration: "2hr", price: "R2,000" },
                    { id: "powder-brows", name: "Powder Brows", duration: "1hr 30min", price: "R1,800" },
                    { id: "brow-touchup", name: "Brow Touch Up (4-6 weeks)", duration: "1hr", price: "R800" },
                ],
            },
            {
                id: "lips",
                title: "Lips",
                items: [
                    { id: "lip-blush", name: "Lip Blush", duration: "2hr", price: "R2,200" },
                    { id: "lip-liner", name: "Lip Liner", duration: "1hr 30min", price: "R1,500" },
                    { id: "full-lips", name: "Full Lip Colour", duration: "2hr 30min", price: "R2,500" },
                    { id: "lip-touchup", name: "Lip Touch Up", duration: "1hr", price: "R1,000" },
                ],
            },
            {
                id: "eyes",
                title: "Eyes",
                items: [
                    { id: "upper-liner", name: "Upper Eyeliner", duration: "1hr", price: "R1,200" },
                    { id: "lower-liner", name: "Lower Eyeliner", duration: "1hr", price: "R1,000" },
                    { id: "designer-liner", name: "Designer Eyeliner", duration: "1hr 30min", price: "R1,500" },
                ],
            },
        ],
    },
    // ========================================
    // QMS MEDICOSMETICS
    // ========================================
    {
        id: "qms",
        title: "QMS Medicosmetics",
        subtitle: "Advanced Collagen",
        image: "/images/services/facials/Image_facial_02.jpeg",
        subcategories: [
            {
                id: "qms-facials",
                title: "QMS Facials",
                items: [
                    { id: "collagen-rejuvenation", name: "Collagen Rejuvenation", duration: "1hr", price: "R1,200" },
                    { id: "sensitive-skin-facial", name: "Sensitive Skin Rebalance", duration: "1hr", price: "R1,100" },
                    { id: "deep-cleanse", name: "Deep Cleanse Intense", duration: "1hr", price: "R950" },
                    { id: "urban-repair", name: "Urban Repair Facial", duration: "1hr", price: "R1,050" },
                    { id: "activator-treatment", name: "Activator Treatment", duration: "1hr", price: "R1,300" },
                    { id: "sk-alpha-treatment", name: "SK Alpha Treatment", duration: "1hr", price: "R1,400" },
                ],
            },
        ],
    },
    // ========================================
    // SUNBED
    // ========================================
    {
        id: "sunbed",
        title: "Sunbed",
        subtitle: "Tanning",
        image: "/images/services/spray-tan.png",
        subcategories: [
            {
                id: "tanning-sessions",
                title: "Tanning Sessions",
                items: [
                    { id: "sunbed-session", name: "Sunbed Session (20min)", duration: "20min", price: "R80" },
                    { id: "sunbed-course-10", name: "Sunbed Course (10 Sessions)", duration: "N/A", price: "R700" },
                    { id: "sunbed-course-20", name: "Sunbed Course (20 Sessions)", duration: "N/A", price: "R1,200" },
                ],
            },
        ],
    },
    // ========================================
    // WAXING
    // ========================================
    {
        id: "waxing",
        title: "Waxing",
        subtitle: "Hair Removal",
        image: "/images/services/waxing/waxing_01.jpeg",
        subcategories: [
            {
                id: "face-wax",
                title: "Face",
                items: [
                    { id: "wax-eyebrow", name: "Eyebrow Wax", duration: "15min", price: "R100" },
                    { id: "wax-lip", name: "Lip Wax", duration: "10min", price: "R80" },
                    { id: "wax-chin", name: "Chin Wax", duration: "10min", price: "R80" },
                    { id: "wax-full-face", name: "Full Face Wax", duration: "30min", price: "R280" },
                    { id: "wax-nose", name: "Nose/Ear Wax", duration: "10min", price: "R80" },
                ],
            },
            {
                id: "body-wax",
                title: "Body",
                items: [
                    { id: "wax-underarm", name: "Underarm Wax", duration: "15min", price: "R150" },
                    { id: "wax-bikini", name: "Bikini Wax", duration: "20min", price: "R180" },
                    { id: "wax-brazilian", name: "Brazilian Wax", duration: "45min", price: "R300" },
                    { id: "wax-hollywood", name: "Hollywood Wax", duration: "45min", price: "R350" },
                    { id: "wax-full-leg", name: "Full Leg Wax", duration: "45min", price: "R320" },
                    { id: "wax-half-leg", name: "Half Leg Wax", duration: "30min", price: "R220" },
                    { id: "wax-full-arm", name: "Full Arm Wax", duration: "30min", price: "R250" },
                    { id: "wax-half-arm", name: "Half Arm Wax", duration: "20min", price: "R180" },
                    { id: "wax-back", name: "Back Wax", duration: "30min", price: "R300" },
                    { id: "wax-chest", name: "Chest Wax", duration: "30min", price: "R280" },
                ],
            },
        ],
    },
    // ========================================
    // HAIR
    // ========================================
    {
        id: "hair",
        title: "Hair",
        subtitle: "Cut, Colour & Style",
        image: "/images/services/face-care-02.png",
        subcategories: [
            {
                id: "ladies-hair",
                title: "Ladies Hair",
                items: [
                    { id: "cut-blow", name: "Cut & Blow Dry", duration: "1hr", price: "R450" },
                    { id: "blow-dry-short", name: "Blow Dry (Short)", duration: "30min", price: "R200" },
                    { id: "blow-dry-med", name: "Blow Dry (Medium)", duration: "45min", price: "R250" },
                    { id: "blow-dry-long", name: "Blow Dry (Long)", duration: "1hr", price: "R300" },
                    { id: "tint-roots", name: "Tint (Roots Only)", duration: "1hr 30min", price: "R550" },
                    { id: "full-tint-short", name: "Full Tint (Short)", duration: "1hr 30min", price: "R650" },
                    { id: "full-tint-med", name: "Full Tint (Medium)", duration: "2hr", price: "R750" },
                    { id: "full-tint-long", name: "Full Tint (Long)", duration: "2hr", price: "R950" },
                    { id: "highlights-half", name: "Highlights (Half Head)", duration: "2hr", price: "R850" },
                    { id: "highlights-full", name: "Highlights (Full Head)", duration: "3hr", price: "R1,200" },
                    { id: "balayage", name: "Balayage / Ombre", duration: "3hr", price: "R1,500" },
                    { id: "brazilian-blowout", name: "Brazilian Blowout", duration: "2hr 30min", price: "R1,800" },
                ],
            },
            {
                id: "gents-hair",
                title: "Gents Hair",
                items: [
                    { id: "gents-cut", name: "Gents Cut", duration: "30min", price: "R200" },
                    { id: "gents-cut-shave", name: "Gents Cut & Shave", duration: "45min", price: "R300" },
                    { id: "clipper-cut", name: "Clipper Cut", duration: "20min", price: "R120" },
                ],
            },
        ],
    },
    // ========================================
    // NAILS
    // ========================================
    {
        id: "nails",
        title: "Nails",
        subtitle: "Manicure & Pedicure",
        image: "/images/services/lashes.png",
        subcategories: [
            {
                id: "hands",
                title: "Hands",
                items: [
                    { id: "manicure-basic", name: "Basic Manicure", duration: "30min", price: "R200" },
                    { id: "manicure-gel", name: "Gel Manicure", duration: "45min", price: "R350" },
                    { id: "gel-overlay-hands", name: "Gel Overlay (Hands)", duration: "1hr", price: "R380" },
                    { id: "tips-gel", name: "Tips with Gel", duration: "1hr 15min", price: "R480" },
                    { id: "acrylic-overlay", name: "Acrylic Overlay", duration: "1hr", price: "R400" },
                    { id: "acrylic-tips", name: "Acrylic Tips", duration: "1hr 30min", price: "R500" },
                    { id: "sculpture-nails", name: "Sculpture Nails", duration: "2hr", price: "R550" },
                    { id: "soak-off-hands", name: "Soak Off (Hands)", duration: "30min", price: "R100" },
                    { id: "nail-art-per-nail", name: "Nail Art (Per Nail)", duration: "10min", price: "R20" },
                ],
            },
            {
                id: "feet",
                title: "Feet",
                items: [
                    { id: "pedicure-basic", name: "Basic Pedicure", duration: "45min", price: "R250" },
                    { id: "pedicure-gel", name: "Gel Pedicure", duration: "1hr", price: "R400" },
                    { id: "gel-overlay-toes", name: "Gel Overlay (Toes)", duration: "45min", price: "R280" },
                    { id: "pedicure-deluxe", name: "Deluxe Pedicure (with Paraffin)", duration: "1hr 15min", price: "R480" },
                    { id: "heel-peel", name: "MediHeel Peel", duration: "30min", price: "R250" },
                    { id: "soak-off-toes", name: "Soak Off (Toes)", duration: "30min", price: "R100" },
                ],
            },
        ],
    },
    // ========================================
    // LASHES & BROWS (Tinting)
    // ========================================
    {
        id: "lashes-brows",
        title: "Lashes & Brows",
        subtitle: "Enhancements",
        image: "/images/services/face/lashes_02.jpeg",
        subcategories: [
            {
                id: "tinting",
                title: "Tinting & Lifting",
                items: [
                    { id: "lash-tint", name: "Eyelash Tint", duration: "20min", price: "R120" },
                    { id: "brow-tint", name: "Eyebrow Tint", duration: "15min", price: "R100" },
                    { id: "lash-brow-tint", name: "Lash & Brow Tint", duration: "30min", price: "R200" },
                    { id: "lash-lift", name: "Lash Lift", duration: "1hr", price: "R450" },
                    { id: "brow-lamination", name: "Brow Lamination", duration: "45min", price: "R400" },
                ],
            },
            {
                id: "extensions",
                title: "Lash Extensions",
                items: [
                    { id: "classic-lashes", name: "Classic Lashes (Full Set)", duration: "1hr 30min", price: "R650" },
                    { id: "volume-lashes", name: "Volume Lashes (Full Set)", duration: "2hr", price: "R850" },
                    { id: "hybrid-lashes", name: "Hybrid Lashes (Full Set)", duration: "1hr 45min", price: "R750" },
                    { id: "fill-2-week", name: "2 Week Fill", duration: "1hr", price: "R350" },
                    { id: "fill-3-week", name: "3 Week Fill", duration: "1hr 15min", price: "R450" },
                    { id: "lash-removal", name: "Lash Removal", duration: "30min", price: "R150" },
                ],
            },
        ],
    },
    // ========================================
    // HAIR EXTENSIONS
    // ========================================
    {
        id: "hair-extensions",
        title: "Hair Extensions",
        subtitle: "Premium 100% Human Hair",
        image: "/images/services/hair_extension/hair_extension01.jpeg",
        badge: "Premium Quality",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "tape-in",
                title: "Tape in Hair",
                note: "20 pieces – 50g | Double Drawn",
                items: [
                    { id: "tape-35cm-dark", name: "Tape in 35cm - Dark Colours", price: "R1,000" },
                    { id: "tape-35cm-light", name: "Tape in 35cm - Light/Ombre/Piano", price: "R1,200" },
                    { id: "tape-40cm-dark", name: "Tape in 40cm - Dark Colours", price: "R1,200" },
                    { id: "tape-40cm-light", name: "Tape in 40cm - Light/Ombre/Piano", price: "R1,400" },
                    { id: "tape-45cm-dark", name: "Tape in 45cm - Dark Colours", price: "R1,400" },
                    { id: "tape-45cm-light", name: "Tape in 45cm - Light/Ombre/Piano", price: "R1,600" },
                    { id: "tape-50cm-dark", name: "Tape in 50cm - Dark Colours", price: "R1,600" },
                    { id: "tape-50cm-light", name: "Tape in 50cm - Light/Ombre/Piano", price: "R1,800" },
                    { id: "tape-55cm-dark", name: "Tape in 55cm - Dark Colours", price: "R1,800" },
                    { id: "tape-55cm-light", name: "Tape in 55cm - Light/Ombre/Piano", price: "R2,000" },
                    { id: "tape-60cm-dark", name: "Tape in 60cm - Dark Colours", price: "R2,000" },
                    { id: "tape-60cm-light", name: "Tape in 60cm - Light/Ombre/Piano", price: "R2,200" },
                ],
            },
            {
                id: "micro-loop-ring",
                title: "Micro Loop Ring",
                note: "100 strands – 100g | Double Drawn",
                items: [
                    { id: "microloop-35cm-dark", name: "Micro Loop 35cm - Dark Colours", price: "R2,000" },
                    { id: "microloop-35cm-light", name: "Micro Loop 35cm - Light/Ombre/Piano", price: "R2,200" },
                    { id: "microloop-40cm-dark", name: "Micro Loop 40cm - Dark Colours", price: "R2,200" },
                    { id: "microloop-40cm-light", name: "Micro Loop 40cm - Light/Ombre/Piano", price: "R2,400" },
                    { id: "microloop-45cm-dark", name: "Micro Loop 45cm - Dark Colours", price: "R2,400" },
                    { id: "microloop-45cm-light", name: "Micro Loop 45cm - Light/Ombre/Piano", price: "R2,600" },
                    { id: "microloop-50cm-dark", name: "Micro Loop 50cm - Dark Colours", price: "R2,600" },
                    { id: "microloop-50cm-light", name: "Micro Loop 50cm - Light/Ombre/Piano", price: "R2,800" },
                    { id: "microloop-55cm-dark", name: "Micro Loop 55cm - Dark Colours", price: "R2,800" },
                    { id: "microloop-55cm-light", name: "Micro Loop 55cm - Light/Ombre/Piano", price: "R3,000" },
                    { id: "microloop-60cm-dark", name: "Micro Loop 60cm - Dark Colours", price: "R3,000" },
                    { id: "microloop-60cm-light", name: "Micro Loop 60cm - Light/Ombre/Piano", price: "R3,200" },
                ],
            },
            {
                id: "clip-in-hair",
                title: "Clip in Hair",
                note: "7 pieces – 100g | Double Drawn",
                items: [
                    { id: "clip-35cm-dark", name: "Clip in 35cm - Dark Colours", price: "R1,600" },
                    { id: "clip-35cm-light", name: "Clip in 35cm - Light/Ombre/Piano", price: "R1,800" },
                    { id: "clip-40cm-dark", name: "Clip in 40cm - Dark Colours", price: "R1,800" },
                    { id: "clip-40cm-light", name: "Clip in 40cm - Light/Ombre/Piano", price: "R2,000" },
                    { id: "clip-45cm-dark", name: "Clip in 45cm - Dark Colours", price: "R2,000" },
                    { id: "clip-45cm-light", name: "Clip in 45cm - Light/Ombre/Piano", price: "R2,200" },
                    { id: "clip-50cm-dark", name: "Clip in 50cm - Dark Colours", price: "R2,200" },
                    { id: "clip-50cm-light", name: "Clip in 50cm - Light/Ombre/Piano", price: "R2,400" },
                    { id: "clip-55cm-dark", name: "Clip in 55cm - Dark Colours", price: "R2,400" },
                    { id: "clip-55cm-light", name: "Clip in 55cm - Light/Ombre/Piano", price: "R2,600" },
                    { id: "clip-60cm-dark", name: "Clip in 60cm - Dark Colours", price: "R2,600" },
                    { id: "clip-60cm-light", name: "Clip in 60cm - Light/Ombre/Piano", price: "R2,800" },
                ],
            },
            {
                id: "machine-weave",
                title: "Machine Weave",
                note: "100g | Double Drawn",
                items: [
                    { id: "machine-40cm-dark", name: "Machine Weave 40cm - Dark Colours", price: "R1,800" },
                    { id: "machine-40cm-light", name: "Machine Weave 40cm - Light/Ombre/Piano", price: "R2,000" },
                    { id: "machine-45cm-dark", name: "Machine Weave 45cm - Dark Colours", price: "R2,000" },
                    { id: "machine-45cm-light", name: "Machine Weave 45cm - Light/Ombre/Piano", price: "R2,200" },
                    { id: "machine-50cm-dark", name: "Machine Weave 50cm - Dark Colours", price: "R2,200" },
                    { id: "machine-50cm-light", name: "Machine Weave 50cm - Light/Ombre/Piano", price: "R2,400" },
                    { id: "machine-55cm-dark", name: "Machine Weave 55cm - Dark Colours", price: "R2,400" },
                    { id: "machine-55cm-light", name: "Machine Weave 55cm - Light/Ombre/Piano", price: "R2,600" },
                    { id: "machine-60cm-dark", name: "Machine Weave 60cm - Dark Colours", price: "R2,600" },
                    { id: "machine-60cm-light", name: "Machine Weave 60cm - Light/Ombre/Piano", price: "R2,800" },
                ],
            },
            {
                id: "ponytail",
                title: "Ponytail",
                note: "80g | Double Drawn",
                items: [
                    { id: "ponytail-40cm-dark", name: "Ponytail 40cm - Dark Colours", price: "R1,600" },
                    { id: "ponytail-40cm-light", name: "Ponytail 40cm - Light/Ombre/Piano", price: "R1,800" },
                    { id: "ponytail-45cm-dark", name: "Ponytail 45cm - Dark Colours", price: "R1,800" },
                    { id: "ponytail-45cm-light", name: "Ponytail 45cm - Light/Ombre/Piano", price: "R2,000" },
                    { id: "ponytail-50cm-dark", name: "Ponytail 50cm - Dark Colours", price: "R2,000" },
                    { id: "ponytail-50cm-light", name: "Ponytail 50cm - Light/Ombre/Piano", price: "R2,200" },
                    { id: "ponytail-55cm-dark", name: "Ponytail 55cm - Dark Colours", price: "R2,200" },
                    { id: "ponytail-55cm-light", name: "Ponytail 55cm - Light/Ombre/Piano", price: "R2,400" },
                    { id: "ponytail-60cm-dark", name: "Ponytail 60cm - Dark Colours", price: "R2,400" },
                    { id: "ponytail-60cm-light", name: "Ponytail 60cm - Light/Ombre/Piano", price: "R2,600" },
                ],
            },
            {
                id: "halo-hair",
                title: "Halo Hair",
                note: "80-100g | Double Drawn",
                items: [
                    { id: "halo-35cm-dark", name: "Halo Hair 35cm - Dark Colours", price: "R1,400" },
                    { id: "halo-35cm-light", name: "Halo Hair 35cm - Light/Ombre/Piano", price: "R1,600" },
                    { id: "halo-40cm-dark", name: "Halo Hair 40cm - Dark Colours", price: "R1,600" },
                    { id: "halo-40cm-light", name: "Halo Hair 40cm - Light/Ombre/Piano", price: "R1,800" },
                    { id: "halo-45cm-dark", name: "Halo Hair 45cm - Dark Colours", price: "R1,800" },
                    { id: "halo-45cm-light", name: "Halo Hair 45cm - Light/Ombre/Piano", price: "R2,000" },
                    { id: "halo-50cm-dark", name: "Halo Hair 50cm - Dark Colours", price: "R2,000" },
                    { id: "halo-50cm-light", name: "Halo Hair 50cm - Light/Ombre/Piano", price: "R2,200" },
                ],
            },
            {
                id: "genius-weave",
                title: "Genius Weave",
                note: "All Colours | Double Drawn",
                items: [
                    { id: "genius-40cm", name: "Genius Weave 40cm (100g)", price: "R2,200" },
                    { id: "genius-45cm", name: "Genius Weave 45cm (120g)", price: "R2,600" },
                    { id: "genius-50cm", name: "Genius Weave 50cm (140g)", price: "R3,200" },
                    { id: "genius-55cm", name: "Genius Weave 55cm (160g)", price: "R3,600" },
                    { id: "genius-60cm", name: "Genius Weave 60cm (160g)", price: "R4,000" },
                ],
            },
            {
                id: "butterfly-weave",
                title: "Butterfly Weave",
                note: "All Colours | Double Drawn",
                items: [
                    { id: "butterfly-40cm", name: "Butterfly Weave 40cm (80g)", price: "R2,000" },
                    { id: "butterfly-45cm", name: "Butterfly Weave 45cm (100g)", price: "R2,200" },
                    { id: "butterfly-50cm", name: "Butterfly Weave 50cm (100g)", price: "R2,600" },
                    { id: "butterfly-55cm", name: "Butterfly Weave 55cm (100g)", price: "R2,800" },
                    { id: "butterfly-60cm", name: "Butterfly Weave 60cm (100g)", price: "R3,000" },
                ],
            },
            {
                id: "hair-ext-extras",
                title: "Extras",
                note: "Processing: +-7 working days | Delivery: R99 or Self Pick Up",
                items: [
                    { id: "tape-strips-precut", name: "Tape in Strips (Pre-cut) - 60 pieces", price: "R200" },
                    { id: "tape-in-remover", name: "Tape in Remover - 100ml", price: "R150" },
                ],
            },
        ],
    },
];
