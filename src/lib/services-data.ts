import { Sparkles, Scissors, Eye, Star, Zap, Heart, Syringe, Sun, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ============================================
// CENTRALIZED SERVICES DATA
// ============================================
// This file is the single source of truth for all services.
// Update prices here and they reflect on both Prices and Booking pages.
// Prices sourced from Fresha booking system.
// ============================================

export interface ServiceItem {
    id: string;
    name: string;
    price: string;
    duration?: string;
    note?: string;
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
    // ========================================
    // HART AESTHETICS (Injectables)
    // ========================================
    {
        id: "hart-aesthetics",
        title: "Hart Aesthetics",
        subtitle: "Advanced Injectables",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200",
        Icon: Syringe,
        badge: "Medical Grade",
        badgeVariant: "medical",
        subcategories: [
            {
                id: "face-lifts",
                title: "Face Lifts & Rejuvenation",
                items: [
                    { id: "nefertiti-lift", name: "Nefertiti Lift", duration: "1hr", price: "R7,950" },
                    { id: "liquid-facelift", name: "Non Surgical Liquid Face Lift", duration: "1hr", price: "R10,000" },
                    { id: "collagen-biostimulator", name: "Collagen Biostimulator Injections 10ml", duration: "1hr", price: "R5,000" },
                ],
            },
            {
                id: "tox-treatment",
                title: "Tox Treatment",
                items: [
                    { id: "tox-per-unit", name: "Tox Per Unit", duration: "1hr", price: "R59.60" },
                ],
            },
            {
                id: "skin-boosters",
                title: "Under Eye Skin Boosters",
                items: [
                    { id: "undereye-2-treatments", name: "Under Eye Skin Booster (2 Treatments)", duration: "1hr", price: "R4,000" },
                    { id: "undereye-1-treatment", name: "Under Eye Skin Booster (1 Treatment)", duration: "1hr", price: "R2,800" },
                ],
            },
            {
                id: "dermal-fillers",
                title: "Dermal Fillers",
                items: [
                    { id: "cheek-fillers-2ml", name: "Dermal Cheek Fillers 2ml", duration: "1hr", price: "R6,000" },
                    { id: "cheek-fillers-1ml", name: "Dermal Cheek Fillers 1ml", duration: "1hr", price: "R3,500" },
                    { id: "russian-lip-1ml", name: "Dermal Russian Lip Fillers 1ml", duration: "1hr", price: "R3,000" },
                    { id: "dermal-filler-1ml", name: "Dermal Filler 1ml", duration: "1hr", price: "R2,800" },
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
        image: "/images/services/slimming_weightloss/Slimming_image_02.jpeg",
        Icon: Heart,
        badge: "CE Approved",
        badgeVariant: "safe",
        subcategories: [
            {
                id: "fat-freezing-sessions",
                title: "Fat Freezing Sessions",
                items: [
                    { id: "fat-freezing-session", name: "Fat Freezing Per Session", duration: "1hr", price: "R799.20" },
                ],
            },
        ],
    },
    // ========================================
    // DERMALOGICA TREATMENTS
    // ========================================
    {
        id: "dermalogica",
        title: "Dermalogica Treatments",
        subtitle: "Professional Skincare",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200",
        Icon: Sparkles,
        badge: "Premium",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "pro-treatments",
                title: "Pro Treatments",
                items: [
                    { id: "multivitamin-skin", name: "Multivitamin Skin Treatment", duration: "45 mins", price: "R690" },
                    { id: "pro-dermaplaning-30", name: "Pro Dermaplaning 30 min", duration: "30 mins", price: "R490" },
                    { id: "neurosculpt-30", name: "Neurosculpt 30 min", duration: "30 mins", price: "R650" },
                    { id: "pro-skin-treatment", name: "Pro Skin Treatment", duration: "55 mins", price: "R950" },
                    { id: "pro-calm-skin", name: "Pro Calm Skin Treatment", duration: "55 mins", price: "R1,100" },
                    { id: "pro-firm-treatment", name: "Pro Firm Treatment", duration: "55 mins", price: "R1,100" },
                    { id: "pro-power-peel", name: "Pro Power Peel", duration: "55 mins", price: "R1,100" },
                    { id: "pro-dermaplaning-55", name: "Pro Dermaplaning Skin Treatment", duration: "55 mins", price: "R890" },
                    { id: "neurosculpt-55", name: "Neurosculpt", duration: "55 mins", price: "R1,250" },
                    { id: "infusion-undereye-peel", name: "Infusion and Under Eye Peel", duration: "55 mins", price: "R1,350" },
                    { id: "luminfusion", name: "Luminfusion", duration: "55 mins", price: "R1,100" },
                    { id: "melanopro-peel", name: "Melanopro Peel", duration: "55 mins", price: "R6,999" },
                    { id: "hydraderm", name: "Hydraderm", duration: "55 mins", price: "R1,400" },
                    { id: "pro-microneedling", name: "Pro Microneedling", duration: "55 mins", price: "R1,950" },
                    { id: "nanoinfusion", name: "Nanoinfusion", duration: "55 mins", price: "R1,400" },
                ],
            },
            {
                id: "facial-treatments",
                title: "Facial Treatments",
                note: "Save up to 10%",
                items: [
                    { id: "ultra-calming-facial", name: "Ultra Calming Facial", duration: "1hr", price: "R810" },
                    { id: "skin-clearing-facial", name: "Skin Clearing Facial", duration: "1hr", price: "R810" },
                    { id: "skin-brightening-facial", name: "Skin Brightening Facial", duration: "1hr", price: "R810" },
                    { id: "age-smart-facial", name: "Age Smart Facial", duration: "1hr", price: "R810" },
                    { id: "power-peel-30", name: "Power Peel 30 min", duration: "1hr", price: "R720" },
                    { id: "power-peel-60", name: "Power Peel 60 min", duration: "1hr", price: "R990" },
                    { id: "facial-30", name: "Facial 30 min", duration: "1hr", price: "R450" },
                    { id: "facial-60", name: "Facial 60 min", duration: "1hr", price: "R810" },
                ],
            },
        ],
    },
    // ========================================
    // IPL HAIR REMOVAL
    // ========================================
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
                id: "ipl-face-neck",
                title: "Face & Neck",
                note: "Save up to 10%",
                items: [
                    { id: "moustache-ipl", name: "Moustache IPL", duration: "1hr", price: "R270" },
                    { id: "beardline-ipl", name: "Beardline IPL", duration: "1hr", price: "R495" },
                    { id: "neck-ipl-men", name: "Neck IPL Men", duration: "1hr", price: "R585" },
                    { id: "neck-ipl", name: "Neck IPL", duration: "1hr", price: "R495" },
                    { id: "full-face-ipl", name: "Full Face IPL", duration: "1hr", price: "R882" },
                    { id: "full-face-neck-ipl", name: "Full Face and Neck", duration: "1hr", price: "R945" },
                ],
            },
            {
                id: "ipl-body",
                title: "Body IPL",
                note: "Save up to 10%",
                items: [
                    { id: "under-arm-ipl", name: "Under Arm IPL", duration: "1hr", price: "R495" },
                    { id: "belly-button-ipl", name: "Belly Button IPL", duration: "1hr", price: "R450" },
                    { id: "stomach-ipl", name: "Stomach IPL", duration: "1hr", price: "R765" },
                    { id: "toes-feet-ipl", name: "Toes and Feet IPL", duration: "1hr", price: "R450" },
                    { id: "full-buttocks-ipl", name: "Full Buttocks IPL", duration: "1hr", price: "R1,170" },
                ],
            },
            {
                id: "ipl-bikini",
                title: "Bikini IPL",
                note: "Save up to 10%",
                items: [
                    { id: "bikini-sides-ipl", name: "Bikini Sides IPL", duration: "1hr", price: "R540" },
                    { id: "brazillian-ipl", name: "Brazilian IPL", duration: "1hr", price: "R765" },
                    { id: "hollywood-ipl", name: "Hollywood IPL", duration: "1hr", price: "R990" },
                ],
            },
            {
                id: "ipl-legs",
                title: "Legs IPL",
                note: "Save up to 10%",
                items: [
                    { id: "half-leg-ipl", name: "Half Leg IPL", duration: "1hr", price: "R1,305" },
                    { id: "full-leg-ipl", name: "Full Leg IPL", duration: "1hr", price: "R2,070" },
                    { id: "full-leg-ipl-premium", name: "Full Leg IPL Premium", duration: "1hr", price: "R2,565" },
                ],
            },
            {
                id: "ipl-arms",
                title: "Arms IPL",
                note: "Save up to 10%",
                items: [
                    { id: "half-arm-ipl", name: "Half Arm IPL", duration: "1hr", price: "R765" },
                    { id: "full-arm-ipl", name: "Full Arm IPL", duration: "1hr", price: "R1,350" },
                    { id: "full-arm-ipl-premium", name: "Full Arm IPL Premium", duration: "1hr", price: "R1,440" },
                ],
            },
            {
                id: "ipl-other",
                title: "Other IPL Services",
                note: "Save up to 10%",
                items: [
                    { id: "tattoo-removal", name: "Tattoo Removal", duration: "1hr", price: "R450" },
                ],
            },
        ],
    },
    // ========================================
    // MAKE UP
    // ========================================
    {
        id: "makeup",
        title: "Make Up",
        subtitle: "Professional Artistry",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200",
        Icon: Palette,
        badge: "Premium",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "makeup-services",
                title: "Make Up Services",
                note: "Save up to 10%",
                items: [
                    { id: "day-makeup", name: "Day Makeup", duration: "1hr", price: "R486" },
                    { id: "evening-makeup", name: "Evening Makeup", duration: "1hr", price: "R594" },
                    { id: "bridal-makeup", name: "Bridal Makeup", duration: "1hr", price: "R1,620" },
                ],
            },
        ],
    },
    // ========================================
    // MEDICAL TREATMENTS
    // ========================================
    {
        id: "medical",
        title: "Medical",
        subtitle: "Clinical Treatments",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200",
        Icon: Syringe,
        badge: "Medical Grade",
        badgeVariant: "medical",
        subcategories: [
            {
                id: "medical-treatments",
                title: "Medical Treatments",
                note: "Save up to 10%",
                items: [
                    { id: "vaginal-tightening", name: "Vaginal Tightening", duration: "1hr", price: "R4,950" },
                    { id: "fractional-laser", name: "Fractional Laser Full Face", duration: "1hr", price: "R2,430" },
                    { id: "plasmage", name: "Plasmage", duration: "1hr", price: "R899.10" },
                ],
            },
        ],
    },
    // ========================================
    // PERMANENT MAKE UP
    // ========================================
    {
        id: "permanent-makeup",
        title: "Permanent Make Up",
        subtitle: "Semi-Permanent Beauty",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200",
        Icon: Palette,
        badge: "Certified",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "brows-pmu",
                title: "Brows",
                note: "Save up to 10%",
                items: [
                    { id: "powderpixel-brows", name: "Powder Pixel Brows", duration: "1hr", price: "R1,710" },
                    { id: "microblading", name: "Microblading", duration: "1hr", price: "R1,350" },
                    { id: "hybrid-brows", name: "Hybrid Brows", duration: "1hr", price: "R1,710" },
                ],
            },
            {
                id: "eyes-pmu",
                title: "Eyes",
                note: "Save up to 10%",
                items: [
                    { id: "eyeliner-top", name: "Eyeliner Top", duration: "1hr", price: "R720" },
                    { id: "eyeliner-bottom", name: "Eyeliner Bottom", duration: "1hr", price: "R720" },
                ],
            },
            {
                id: "lips-pmu",
                title: "Lips",
                note: "Save up to 10%",
                items: [
                    { id: "full-lips-contour", name: "Full Lips Contour", duration: "1hr", price: "R2,430" },
                    { id: "lip-liner", name: "Lip Liner", duration: "1hr", price: "R1,710" },
                ],
            },
        ],
    },
    // ========================================
    // PRO SKIN
    // ========================================
    {
        id: "pro-skin",
        title: "Pro Skin",
        subtitle: "Advanced Skin Treatments",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200",
        Icon: Sparkles,
        badge: "Professional",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "pro-skin-treatments",
                title: "Pro Skin Treatments",
                note: "Save up to 10%",
                items: [
                    { id: "dermaplaning-pro", name: "Dermaplaning", duration: "1hr", price: "R1,080" },
                    { id: "dermaplaning-maintenance", name: "Dermaplaning Maintenance", duration: "1hr", price: "R315" },
                    { id: "microneedling-hands", name: "Micro Needling Hands", duration: "1hr", price: "R648" },
                    { id: "microneedling-pro", name: "Microneedling", duration: "1hr", price: "R1,620" },
                    { id: "high-frequency-facial", name: "High Frequency Facial", duration: "1hr", price: "R720" },
                ],
            },
        ],
    },
    // ========================================
    // QMS FACIAL
    // ========================================
    {
        id: "qms-facial",
        title: "QMS Facial",
        subtitle: "Medical Skincare",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200",
        Icon: Sparkles,
        badge: "Premium",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "qms-facials",
                title: "QMS Facials",
                note: "Save up to 10%",
                items: [
                    { id: "basic-facial-qms", name: "Basic Facial", duration: "1hr", price: "R657" },
                    { id: "sensitive-skin-facial", name: "Sensitive Skin Facial", duration: "1hr", price: "R540" },
                    { id: "activator-treatment", name: "Activator Treatment", duration: "1hr", price: "R648" },
                    { id: "deep-pore-cleansing", name: "Deep Pore Cleansing Facial", duration: "1hr", price: "R675" },
                    { id: "rejuvenating-facial", name: "Rejuvenating Facial", duration: "1hr", price: "R765" },
                    { id: "collagen-facial", name: "Collagen Facial", duration: "1hr", price: "R799.20" },
                    { id: "chemical-peel", name: "Chemical Peel", duration: "1hr", price: "R809.10" },
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
        subtitle: "Tanning Services",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200",
        Icon: Sun,
        badge: "Safe",
        badgeVariant: "safe",
        subcategories: [
            {
                id: "sunbed-services",
                title: "Sunbed & Spray Tan",
                note: "Save up to 10%",
                items: [
                    { id: "sunbed-session", name: "Sunbed Per Session", duration: "1hr", price: "R54" },
                    { id: "sunbed-10-sessions", name: "Sunbed 10 Sessions", duration: "1hr", price: "R315" },
                    { id: "sunbed-20-sessions", name: "Sunbed 20 Sessions", duration: "1hr", price: "R630" },
                    { id: "spraytan", name: "Spray Tan", duration: "1hr", price: "R486" },
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
        subtitle: "Smooth & Silky",
        image: "/images/services/waxing/waxing_04.jpeg",
        Icon: Sparkles,
        badge: "Hygienic",
        badgeVariant: "medical",
        subcategories: [
            {
                id: "face-wax",
                title: "Face Waxing",
                note: "Save up to 10%",
                items: [
                    { id: "lip-wax", name: "Lip Wax", duration: "1hr", price: "R90" },
                    { id: "cheek-wax", name: "Cheek Wax", duration: "1hr", price: "R157.50" },
                    { id: "nose-wax", name: "Nose Wax", duration: "1hr", price: "R81" },
                    { id: "ear-wax", name: "Ear Wax", duration: "1hr", price: "R108" },
                ],
            },
            {
                id: "body-wax",
                title: "Body Waxing",
                note: "Save up to 10%",
                items: [
                    { id: "under-arm-wax", name: "Under Arm Wax", duration: "1hr", price: "R157.50" },
                    { id: "full-tummy-wax", name: "Full Tummy Wax", duration: "1hr", price: "R180" },
                    { id: "chest-wax", name: "Chest Wax", duration: "1hr", price: "R216" },
                    { id: "half-back-wax", name: "Half Back Wax", duration: "1hr", price: "R225" },
                    { id: "full-back-wax", name: "Full Back Wax", duration: "1hr", price: "R261" },
                    { id: "men-back-wax", name: "Men Back Wax", duration: "1hr", price: "R522" },
                    { id: "butt-wax", name: "Butt Wax", duration: "1hr", price: "R180" },
                ],
            },
            {
                id: "leg-arm-wax",
                title: "Leg & Arm Waxing",
                note: "Save up to 10%",
                items: [
                    { id: "half-arm-wax", name: "Half Arm Wax", duration: "1hr", price: "R130.50" },
                    { id: "full-arm-wax", name: "Full Arm Wax", duration: "1hr", price: "R234" },
                    { id: "half-leg-wax", name: "Half Leg Wax", duration: "1hr", price: "R261" },
                    { id: "full-leg-wax", name: "Full Leg Wax", duration: "1hr", price: "R486" },
                ],
            },
            {
                id: "bikini-wax",
                title: "Bikini Waxing",
                note: "Save up to 10%",
                items: [
                    { id: "brazillian-wax", name: "Brazilian Wax", duration: "1hr", price: "R387" },
                    { id: "hollywood-wax", name: "Hollywood Wax", duration: "1hr", price: "R450" },
                ],
            },
        ],
    },
    // ========================================
    // HAIR & STYLING
    // ========================================
    {
        id: "hair",
        title: "Hair & Styling",
        subtitle: "Salon Excellence",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200",
        Icon: Scissors,
        badge: "Professional",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "haircuts",
                title: "Haircuts",
                note: "Save up to 10%",
                items: [
                    { id: "cut-0-5-years", name: "Cut 0-5 Years", duration: "30 mins", price: "R99" },
                    { id: "haircut-short", name: "Haircut Short", duration: "1hr", price: "R288" },
                    { id: "haircut-medium", name: "Haircut Medium", duration: "1hr", price: "R378" },
                    { id: "haircut-long", name: "Haircut Long", duration: "1hr", price: "R351" },
                    { id: "pensioner-cut-blow", name: "Pensioner Cut and Blow", duration: "1hr", price: "R252" },
                ],
            },
            {
                id: "blow-dry",
                title: "Blow Dry",
                note: "Save up to 10%",
                items: [
                    { id: "medium-blow", name: "Medium Blow", duration: "1hr", price: "R297" },
                    { id: "extra-long-blow", name: "Extra Long Blow", duration: "1hr", price: "R378" },
                    { id: "long-blow", name: "Long Blow", duration: "1hr", price: "R468" },
                ],
            },
            {
                id: "blow-packages",
                title: "Blow Packages (10x)",
                note: "Save up to 10%",
                items: [
                    { id: "short-blow-10x", name: "Short Blow Package 10x", duration: "1hr", price: "R1,080" },
                    { id: "medium-blow-10x", name: "Medium Blow Package 10x", duration: "1hr", price: "R1,350" },
                    { id: "long-blow-10x", name: "Long Blow Package 10x", duration: "1hr", price: "R1,620" },
                    { id: "extra-long-blow-10x", name: "Extra Long Blow Package 10x", duration: "1hr", price: "R1,890" },
                ],
            },
            {
                id: "color",
                title: "Hair Color",
                note: "Save up to 10%",
                items: [
                    { id: "roots", name: "Roots", duration: "1hr 15 mins", price: "R675" },
                    { id: "short-color", name: "Short Color", duration: "1hr", price: "R810" },
                    { id: "medium-color", name: "Medium Color", duration: "1hr", price: "R990" },
                    { id: "long-color", name: "Long Color", duration: "1hr", price: "R1,215" },
                    { id: "extra-long-color", name: "Extra Long Color", duration: "1hr", price: "R1,350" },
                    { id: "balayage", name: "Balayage", duration: "2hr 30 mins", price: "R135" },
                ],
            },
            {
                id: "foils",
                title: "Foils",
                note: "Save up to 10%",
                items: [
                    { id: "cap-highlights", name: "Cap Highlights", duration: "1hr", price: "R540" },
                    { id: "short-half-head-foils", name: "Short Half Head Foils", duration: "1hr", price: "R765" },
                    { id: "medium-half-head-foils", name: "Medium Half Head Foils", duration: "1hr", price: "R855" },
                    { id: "long-half-head-foils", name: "Long Half Head Foils", duration: "1hr", price: "R1,035" },
                    { id: "extra-long-half-head-foils", name: "Extra Long Half Head Foils", duration: "1hr", price: "R1,125" },
                    { id: "short-full-head-foils", name: "Short Full Head Foils", duration: "1hr", price: "R810" },
                    { id: "medium-full-head-foils", name: "Medium Full Head Foils", duration: "1hr", price: "R1,035" },
                    { id: "long-full-head-foils", name: "Long Full Head Foils", duration: "1hr", price: "R1,170" },
                    { id: "extra-long-full-head-foils", name: "Extra Long Full Head Foils", duration: "1hr", price: "R1,305" },
                ],
            },
            {
                id: "toner",
                title: "Hair Toner",
                note: "Save up to 10%",
                items: [
                    { id: "short-toner", name: "Short Hair Toner", duration: "1hr", price: "R342" },
                    { id: "medium-toner", name: "Medium Hair Toner", duration: "1hr", price: "R378" },
                    { id: "long-toner", name: "Long Hair Toner", duration: "1hr", price: "R450" },
                ],
            },
            {
                id: "treatments-hair",
                title: "Hair Treatments",
                note: "Save up to 10%",
                items: [
                    { id: "osmo-intensive-mask", name: "Osmo Intensive Mask", duration: "1hr", price: "R288" },
                    { id: "osmo-silver-mask", name: "Osmo Silver Mask", duration: "1hr", price: "R315" },
                    { id: "care-vital-mask", name: "Care Vital Mask", duration: "1hr", price: "R495" },
                    { id: "care-keratin-mask", name: "Care Keratin Mask", duration: "1hr", price: "R495" },
                    { id: "botox-short", name: "Botox Treat Short", duration: "1hr", price: "R810" },
                    { id: "botox-medium", name: "Botox Treat Medium Hair", duration: "1hr", price: "R720" },
                    { id: "botox-long", name: "Botox Long Hair Treat", duration: "1hr", price: "R810" },
                ],
            },
            {
                id: "brazilian-blow",
                title: "Brazilian Blow",
                note: "Save up to 10%",
                items: [
                    { id: "brazilian-blow-short", name: "Brazilian Blow Short", duration: "1hr", price: "R1,035" },
                    { id: "brazilian-blow-long", name: "Brazilian Blow Long", duration: "1hr", price: "R1,548" },
                    { id: "brazilian-blow-extra-long", name: "Brazilian Blow Extra Long", duration: "1hr", price: "R1,683" },
                ],
            },
            {
                id: "upstyle",
                title: "Upstyle",
                note: "Save up to 10%",
                items: [
                    { id: "short-upstyle", name: "Short Hair Upstyle", duration: "1hr", price: "R540" },
                    { id: "medium-upstyle", name: "Medium Upstyle", duration: "1hr", price: "R720" },
                    { id: "long-upstyle", name: "Long Hair Upstyle", duration: "1hr", price: "R900" },
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
        subtitle: "Nail Artistry",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200",
        Icon: Scissors,
        badge: "Hygienic",
        badgeVariant: "medical",
        subcategories: [
            {
                id: "manicure",
                title: "Manicure",
                note: "Save up to 10%",
                items: [
                    { id: "manicure-basic", name: "Manicure", duration: "45 mins", price: "R234" },
                ],
            },
            {
                id: "acrylic-nails",
                title: "Acrylic Nails",
                note: "Save up to 10%",
                items: [
                    { id: "acrylic-fill", name: "Acrylic Fill", duration: "1hr", price: "R378" },
                    { id: "acrylic-overlay", name: "Acrylic Overlay", duration: "1hr", price: "R414" },
                    { id: "full-set-acrylic-tips", name: "Full Set Acrylic with Tips", duration: "1hr", price: "R540" },
                    { id: "sculpted-acrylic", name: "Sculpted Acrylic with Forms", duration: "1hr", price: "R594" },
                    { id: "full-set-designer", name: "Full Set Designer Nails", duration: "1hr", price: "R648" },
                    { id: "acrylic-soak-off", name: "Acrylic Soak Off", duration: "1hr", price: "R108" },
                ],
            },
            {
                id: "gel-nails",
                title: "Gel Nails",
                note: "Save up to 10%",
                items: [
                    { id: "gel-toes", name: "Gel Toes", duration: "1hr", price: "R252" },
                    { id: "gel-overlay", name: "Gel Overlay", duration: "1hr", price: "R378" },
                    { id: "gel-fill", name: "Gel Fill", duration: "1hr", price: "R378" },
                    { id: "rubber-base-fill", name: "Rubber Base Fill", duration: "1hr", price: "R162" },
                    { id: "gel-soak-off", name: "Gel Soak Off", duration: "1hr", price: "R90" },
                ],
            },
            {
                id: "pedicure",
                title: "Pedicure",
                note: "Save up to 10%",
                items: [
                    { id: "pedicure-gel", name: "Pedicure with Gel", duration: "1hr", price: "R540" },
                ],
            },
            {
                id: "nail-extras",
                title: "Extras",
                note: "Save up to 10%",
                items: [
                    { id: "nail-repair", name: "Nail Repair", duration: "1hr", price: "R54" },
                    { id: "buff-only", name: "Buff Only", duration: "1hr", price: "R63" },
                ],
            },
        ],
    },
    // ========================================
    // EYEBROWS & EYELASHES
    // ========================================
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
                note: "Save up to 10%",
                items: [
                    { id: "full-set-silk", name: "Full Set Silk Lashes", duration: "1hr", price: "R450" },
                    { id: "full-set-classic", name: "Full Set Classic Lashes", duration: "1hr", price: "R630" },
                    { id: "full-set-volume", name: "Full Set Volume Lashes", duration: "1hr", price: "R720" },
                    { id: "hybrid-lashes", name: "Hybrid Lashes", duration: "1hr", price: "R720" },
                    { id: "glamour-lashes", name: "Glamour Lashes", duration: "1hr", price: "R900" },
                    { id: "lash-fill", name: "Lash Fill", duration: "1hr", price: "R360" },
                ],
            },
            {
                id: "lash-treatments",
                title: "Lash Treatments",
                note: "Save up to 10%",
                items: [
                    { id: "lash-tint", name: "Lash Tint", duration: "1hr", price: "R108" },
                    { id: "lash-lift", name: "Lash Lift", duration: "1hr", price: "R423" },
                    { id: "lash-lamination", name: "Lash Lamination", duration: "1hr", price: "R495" },
                ],
            },
            {
                id: "brow-treatments",
                title: "Brow Treatments",
                note: "Save up to 10%",
                items: [
                    { id: "brow-tint", name: "Brow Tint", duration: "1hr", price: "R90" },
                    { id: "brow-lamination", name: "Brow Lamination", duration: "1hr", price: "R423" },
                    { id: "brow-henna", name: "Brow Henna", duration: "1hr", price: "R423" },
                ],
            },
        ],
    },
    // ========================================
    // HAIR EXTENSIONS
    // European Remy Human Hair Extension Range
    // ========================================
    {
        id: "hair-extensions",
        title: "Hair Extensions",
        subtitle: "European Remy Human Hair",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200",
        Icon: Scissors,
        badge: "Premium Quality",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "tape-in-hair",
                title: "Tape in Hair",
                note: "40 tapes – 100g | Double Drawn",
                items: [
                    { id: "tape-35cm-dark", name: "Tape in 35cm - Dark Colours", price: "R2,000" },
                    { id: "tape-35cm-light", name: "Tape in 35cm - Light/Ombre/Piano", price: "R2,200" },
                    { id: "tape-40cm-dark", name: "Tape in 40cm - Dark Colours", price: "R2,200" },
                    { id: "tape-40cm-light", name: "Tape in 40cm - Light/Ombre/Piano", price: "R2,400" },
                    { id: "tape-45cm-dark", name: "Tape in 45cm - Dark Colours", price: "R2,400" },
                    { id: "tape-45cm-light", name: "Tape in 45cm - Light/Ombre/Piano", price: "R2,600" },
                    { id: "tape-50cm-dark", name: "Tape in 50cm - Dark Colours", price: "R2,600" },
                    { id: "tape-50cm-light", name: "Tape in 50cm - Light/Ombre/Piano", price: "R2,800" },
                    { id: "tape-55cm-dark", name: "Tape in 55cm - Dark Colours", price: "R2,800" },
                    { id: "tape-55cm-light", name: "Tape in 55cm - Light/Ombre/Piano", price: "R3,000" },
                    { id: "tape-60cm-dark", name: "Tape in 60cm - Dark Colours", price: "R3,000" },
                    { id: "tape-60cm-light", name: "Tape in 60cm - Light/Ombre/Piano", price: "R3,200" },
                ],
            },
            {
                id: "keratin-utip",
                title: "Keratin U-Tip",
                note: "100 strands – 100g | Double Drawn",
                items: [
                    { id: "utip-35cm-dark", name: "U-Tip 35cm - Dark Colours", price: "R2,000" },
                    { id: "utip-35cm-light", name: "U-Tip 35cm - Light/Ombre/Piano", price: "R2,200" },
                    { id: "utip-40cm-dark", name: "U-Tip 40cm - Dark Colours", price: "R2,200" },
                    { id: "utip-40cm-light", name: "U-Tip 40cm - Light/Ombre/Piano", price: "R2,400" },
                    { id: "utip-45cm-dark", name: "U-Tip 45cm - Dark Colours", price: "R2,400" },
                    { id: "utip-45cm-light", name: "U-Tip 45cm - Light/Ombre/Piano", price: "R2,600" },
                    { id: "utip-50cm-dark", name: "U-Tip 50cm - Dark Colours", price: "R2,600" },
                    { id: "utip-50cm-light", name: "U-Tip 50cm - Light/Ombre/Piano", price: "R2,800" },
                    { id: "utip-55cm-dark", name: "U-Tip 55cm - Dark Colours", price: "R2,800" },
                    { id: "utip-55cm-light", name: "U-Tip 55cm - Light/Ombre/Piano", price: "R3,000" },
                    { id: "utip-60cm-dark", name: "U-Tip 60cm - Dark Colours", price: "R3,000" },
                    { id: "utip-60cm-light", name: "U-Tip 60cm - Light/Ombre/Piano", price: "R3,200" },
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
