import { Sparkles, Scissors, Eye, Star, Zap, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ============================================
// CENTRALIZED SERVICES DATA
// ============================================
// This file is the single source of truth for all services.
// Update prices here and they reflect on both Prices and Booking pages.
// ============================================

export interface ServiceItem {
    id: string;
    name: string;
    price: string;
    duration?: string;
}

export interface ServiceSubcategory {
    id: string;
    title: string;
    items: ServiceItem[];
    note?: string;
}

export interface ServiceCategory {
    id: string;
    title: string;
    subtitle: string;
    Icon: LucideIcon;
    badge: string;
    badgeVariant: "medical" | "premium" | "safe";
    image: string;
    subcategories: ServiceSubcategory[];
}

// ============================================
// SERVICE CATEGORIES
// ============================================

export const serviceCategories: ServiceCategory[] = [
    {
        id: "facials",
        title: "Facials",
        subtitle: "Medical-Grade Skincare",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200",
        Icon: Sparkles,
        badge: "Medical Grade",
        badgeVariant: "medical",
        subcategories: [
            {
                id: "babor-skinovage",
                title: "Babor Skinovage Facials",
                items: [
                    { id: "moisturising-facial", name: "Moisturising Facial", duration: "60min", price: "R400" },
                    { id: "vitalising-facial", name: "Vitalising Facial", duration: "60min", price: "R450" },
                    { id: "purifying-facial", name: "Purifying Facial", duration: "60min", price: "R430" },
                    { id: "balancing-facial", name: "Balancing Facial", duration: "60min", price: "R420" },
                ],
            },
            {
                id: "babor-anti-ageing",
                title: "Babor Anti-ageing Facials",
                items: [
                    { id: "grand-cru-facial", name: "Grand CRU Facial", duration: "90min", price: "R1,200" },
                    { id: "hsr-lifting", name: "HSR Lifting Extra-Firming", duration: "90min", price: "R1,000" },
                    { id: "reversive-anti-ageing", name: "Reversive Anti-ageing", duration: "90min", price: "R1,900" },
                    { id: "sea-creation", name: "Sea Creation", duration: "120min", price: "R4,900" },
                ],
            },
            {
                id: "dr-babor",
                title: "Dr. Babor Facials",
                items: [
                    { id: "skin-renewal-peels", name: "Skin Renewal Peels", duration: "60min", price: "R650" },
                    { id: "microneedling", name: "Microneedling + Babor Ampoule", duration: "90min", price: "R1,400" },
                    { id: "ultimate-face-lifting", name: "Ultimate Face Lifting", duration: "90min", price: "R1,800" },
                    { id: "ultimate-a16-detox", name: "Ultimate A16 Detox", duration: "75min", price: "R550" },
                    { id: "neuro-sensitive", name: "Neuro Sensitive Treatment", duration: "60min", price: "R850" },
                ],
            },
            {
                id: "facial-addons",
                title: "Facial Add-ons",
                items: [
                    { id: "collagen-fleece", name: "Collagen Fleece Mask", price: "R500" },
                    { id: "hsr-faceline", name: "HSR Faceline Mask", price: "R450" },
                    { id: "firming-algae", name: "Firming Algae Peel-off", price: "R1,800" },
                    { id: "1-ampoule", name: "1 Ampoule", price: "R80" },
                    { id: "5-ampoules", name: "5 Ampoules", price: "R400" },
                ],
            },
        ],
    },
    {
        id: "nails",
        title: "Nails & Pedicures",
        subtitle: "Nail Artistry",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200",
        Icon: Scissors,
        badge: "Hygienic",
        badgeVariant: "medical",
        subcategories: [
            {
                id: "acrylic-nails",
                title: "Acrylic Nails",
                items: [
                    { id: "full-set-designer", name: "Full Set Designer Acrylic", price: "R450" },
                    { id: "acrylic-fill", name: "Acrylic Fill", price: "R300" },
                    { id: "acrylic-gel-tips", name: "Acrylic Gel and Tips", price: "R480" },
                    { id: "acrylic-gel-overlay", name: "Acrylic Gel Overlay", price: "R350" },
                    { id: "soak-off-acrylic", name: "Soak Off Acrylic", price: "R70" },
                ],
            },
            {
                id: "gel-nails",
                title: "Gel Nails",
                items: [
                    { id: "gel-toes", name: "Gel Toes", price: "R180" },
                    { id: "gel-overlay", name: "Gel Overlay Hands", price: "R250" },
                    { id: "soak-off-gel", name: "Soak Off Gel", price: "R50" },
                ],
            },
            {
                id: "pedicures",
                title: "Pedicures",
                items: [
                    { id: "medical-pedicure", name: "Medical Pedicure + Gel", price: "R399" },
                    { id: "standard-pedicure", name: "Standard Pedicure + Gel", price: "R299" },
                ],
            },
        ],
    },
    {
        id: "lashes",
        title: "Lashes & Brows",
        subtitle: "Eye Enhancement",
        image: "/images/services/face/lashes_01.jpeg",
        Icon: Eye,
        badge: "Certified & Safe",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "lash-extensions",
                title: "Lash Extensions",
                items: [
                    { id: "full-set-silk", name: "Full Set Silk Individual", price: "R699" },
                    { id: "full-set-2d-3d", name: "Full Set 2D/3D Volume", price: "R599" },
                    { id: "full-set-4d-5d", name: "Full Set 4D/5D Lashes", price: "R799" },
                    { id: "russian-volume", name: "Russian Volume", price: "R899" },
                    { id: "half-fill", name: "½ Fill", price: "R350" },
                    { id: "three-quarter-fill", name: "¾ Fill", price: "R280" },
                    { id: "lash-brow-tint", name: "Lash & Brow Tint", price: "R100" },
                ],
            },
        ],
    },
    {
        id: "waxing",
        title: "Waxing",
        subtitle: "Smooth & Silky",
        image: "/images/services/waxing/waxing_04.jpeg",
        Icon: Sparkles,
        badge: "Hygienic",
        badgeVariant: "medical",
        subcategories: [
            {
                id: "waxing",
                title: "Waxing",
                items: [
                    { id: "full-face-wax", name: "Full Face", price: "R150" },
                    { id: "lip-chin-brows", name: "Lip, Chin, Brows", price: "R140" },
                    { id: "brazilian", name: "Brazilian", price: "R200" },
                    { id: "hollywood", name: "Hollywood", price: "R240" },
                    { id: "full-legs", name: "Full Legs", price: "R200" },
                    { id: "underarm", name: "Underarm", price: "R90" },
                ],
            },
        ],
    },
    {
        id: "makeup",
        title: "Make-up & Massages",
        subtitle: "Beauty & Wellness",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200",
        Icon: Star,
        badge: "Premium",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "kryolan-makeup",
                title: "Kryolan Make-up",
                items: [
                    { id: "day-makeup", name: "Day Make-up", price: "R300" },
                    { id: "evening-makeup", name: "Evening Make-up", price: "R400" },
                    { id: "bridal-makeup", name: "Bridal Make-up", price: "R1,500" },
                    { id: "bridal-trial", name: "Bridal Trial", price: "R400" },
                    { id: "makeup-classes", name: "Make-up Classes", price: "R700" },
                ],
            },
            {
                id: "pmu",
                title: "Permanent Make-up (PMU)",
                items: [
                    { id: "powder-brows", name: "Powder Brows", price: "R2,800" },
                    { id: "microbladed-phi", name: "Microbladed Phi-Brows", price: "R2,200" },
                    { id: "full-lips-phi", name: "Full Lips Phi-Contour", price: "R3,588" },
                    { id: "hybrid-brows", name: "Hybrid Brows", price: "R2,400" },
                ],
                note: "Touch ups are 50% less",
            },
            {
                id: "massages",
                title: "Massages",
                items: [
                    { id: "back-neck-shoulders", name: "Back, Neck, Shoulders", duration: "30min", price: "R330" },
                    { id: "swedish-massage", name: "Swedish Massage", duration: "60min", price: "R520" },
                    { id: "deep-tissue", name: "Deep Tissue", price: "R590" },
                    { id: "full-body", name: "Full Body", duration: "60min", price: "R500" },
                ],
            },
        ],
    },
    {
        id: "ipl",
        title: "IPL Hair Removal",
        subtitle: "Permanent Results",
        image: "/images/services/IPL_Hair_removal/IPL_image_06.jpeg",
        Icon: Zap,
        badge: "CE Approved",
        badgeVariant: "safe",
        subcategories: [
            {
                id: "ipl-ladies",
                title: "IPL Ladies",
                items: [
                    { id: "ipl-full-face", name: "Full Face", price: "R650" },
                    { id: "ipl-underarms", name: "Underarms", price: "R400" },
                    { id: "ipl-full-bikini", name: "Full Bikini", price: "R650" },
                    { id: "ipl-full-leg", name: "Full Leg", price: "R1,000" },
                    { id: "ipl-bikini-underarms", name: "Full Bikini & Underarms", price: "R590" },
                ],
            },
            {
                id: "ipl-gents",
                title: "IPL Gents",
                items: [
                    { id: "ipl-full-back", name: "Full Back", price: "R700" },
                    { id: "ipl-chest", name: "Chest", price: "R1,200" },
                    { id: "ipl-shoulders", name: "Shoulders", price: "R450" },
                    { id: "ipl-full-arm", name: "Full Arm", price: "R600" },
                ],
            },
        ],
    },
    {
        id: "slimming",
        title: "Slimming & Body",
        subtitle: "Body Contouring",
        image: "/images/services/slimming_weightloss/Slimming_image_02.jpeg",
        Icon: Heart,
        badge: "CE Approved",
        badgeVariant: "safe",
        subcategories: [
            {
                id: "cryolipolysis",
                title: "Cryolipolysis (Fat Freeze)",
                items: [
                    { id: "cryo-chin", name: "Chin", price: "R1,200" },
                    { id: "cryo-arms", name: "Arms", price: "R1,700" },
                    { id: "cryo-stomach", name: "Stomach", price: "R3,400" },
                    { id: "cryo-buttocks", name: "Buttocks", price: "R3,900" },
                    { id: "cryo-love-handles", name: "Love Handles", price: "R2,300" },
                ],
                note: "Visible results from 3 weeks",
            },
        ],
    },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get a category by ID
 */
export function getCategoryById(categoryId: string): ServiceCategory | undefined {
    return serviceCategories.find((cat) => cat.id === categoryId);
}

/**
 * Get subcategories for a category
 */
export function getSubcategoriesForCategory(categoryId: string): ServiceSubcategory[] {
    const category = getCategoryById(categoryId);
    return category?.subcategories || [];
}

/**
 * Get items for a subcategory within a category
 */
export function getItemsForSubcategory(categoryId: string, subcategoryId: string): ServiceItem[] {
    const subcategories = getSubcategoriesForCategory(categoryId);
    const subcategory = subcategories.find((sub) => sub.id === subcategoryId);
    return subcategory?.items || [];
}

/**
 * Get a specific item
 */
export function getServiceItem(categoryId: string, subcategoryId: string, itemId: string): ServiceItem | undefined {
    const items = getItemsForSubcategory(categoryId, subcategoryId);
    return items.find((item) => item.id === itemId);
}
