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
    description?: string;
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
        subtitle: "Cryolipolysis",
        image: "/images/services/fat_freezing/Gallery_image_01(32).png.jpeg",
        Icon: Zap,
        badge: "CE Approved",
        badgeVariant: "safe",
        subcategories: [
            {
                id: "fat-freezing-sessions",
                title: "Fat Freezing Sessions",
                items: [
                    { id: "fat-freezing-session", name: "Fat Freezing Per Session", duration: "1hr", price: "R799.20", description: "Non-invasive cryolipolysis treatment that freezes and eliminates stubborn fat cells. CE-approved technology with no downtime. Results visible in 6-12 weeks." },
                ],
            },
        ],
    },
    {
        id: "slimming",
        title: "Slimming & Weightloss",
        subtitle: "Tesla EMS Body Contouring",
        image: "/images/services/slimming_weightloss/EMS01.png",
        Icon: Zap,
        badge: "New Tech",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "tesla-ems",
                title: "Tesla EMS Slimming Machine",
                note: "High-Intensity Focused Electromagnetic Technology",
                items: [
                    { id: "ems-single", name: "Single Session", duration: "30 mins", price: "R1,850", description: "Equivalent to 20,000 sit-ups in 30 minutes! HIFEM technology builds muscle while burning fat for sculpted abs, lifted buttocks, or toned arms." },
                    { id: "ems-package-4", name: "Package (4 Sessions)", duration: "4 x 30 mins", price: "R6,290 - R9,000", description: "Recommended treatment course for optimal muscle building and fat reduction. Visible results after the first few sessions." },
                    { id: "ems-package-6", name: "Large Package (6 Sessions)", duration: "6 x 30 mins", price: "R13,500+", description: "Comprehensive body transformation package. Ideal for significant muscle toning and fat reduction in targeted areas." },
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
        subtitle: "Therapeutic Relaxation",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200",
        Icon: Heart,
        badge: "Relaxing",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "therapeutic-massages",
                title: "Back, Neck & Shoulders",
                note: "Done with Lilian Terry aromatherapeutic oils",
                items: [
                    { id: "massage-30min", name: "Massage", duration: "30min", price: "R330", description: "Quick tension-relief massage targeting upper back, neck, and shoulders. Perfect for stress relief during a busy day." },
                    { id: "massage-45min", name: "Massage", duration: "45min", price: "R450", description: "Extended massage session for deeper muscle relaxation. Addresses stiffness and built-up tension in problem areas." },
                    { id: "indian-head-massage", name: "Indian Head Massage", duration: "30min", price: "R330", description: "Traditional technique focusing on head, neck, and shoulders. Relieves headaches, improves sleep, and promotes mental clarity." },
                    { id: "swedish-massage", name: "Swedish Massage", duration: "60min", price: "R520", description: "Classic relaxation massage using long, flowing strokes to improve circulation, ease muscle tension, and promote overall wellbeing." },
                    { id: "aromatherapy-massage", name: "Aromatherapy Massage", duration: "60min", price: "R450", description: "Therapeutic massage enhanced with Lilian Terry essential oils. The aromatic experience soothes the mind while the massage relaxes the body." },
                    { id: "deep-tissue-massage", name: "Deep Tissue Massage", duration: "60min", price: "R590", description: "Firm pressure massage targeting deep muscle layers and connective tissue. Ideal for chronic pain, sports recovery, and severe tension." },
                    { id: "full-body-massage", name: "Full Body Massage", duration: "60min", price: "R500", description: "Complete head-to-toe relaxation treating all major muscle groups. A comprehensive escape to melt away stress and tension." },
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
                    { id: "multivitamin-skin", name: "Multivitamin Skin Treatment", duration: "45 mins", price: "R690", description: "Vitamin-infused treatment to nourish and revitalize dull, tired skin. Restores a healthy, radiant glow." },
                    { id: "pro-dermaplaning-30", name: "Pro Dermaplaning 30 min", duration: "30 mins", price: "R490", description: "Express exfoliation removing dead skin cells and peach fuzz for instantly smoother, brighter skin." },
                    { id: "neurosculpt-30", name: "Neurosculpt 30 min", duration: "30 mins", price: "R650", description: "Express facial workout using electrical muscle stimulation to lift and tone facial muscles." },
                    { id: "pro-skin-treatment", name: "Pro Skin Treatment", duration: "55 mins", price: "R950", description: "Comprehensive Dermalogica facial customized to your skin concerns with professional-grade products and techniques." },
                    { id: "pro-calm-skin", name: "Pro Calm Skin Treatment", duration: "55 mins", price: "R1,100", description: "Specialized treatment for sensitive, reactive skin. Reduces redness and inflammation while strengthening the skin barrier." },
                    { id: "pro-firm-treatment", name: "Pro Firm Treatment", duration: "55 mins", price: "R1,100", description: "Advanced anti-aging facial targeting loss of firmness. Uses collagen-boosting actives to lift, tone, and tighten." },
                    { id: "pro-power-peel", name: "Pro Power Peel", duration: "55 mins", price: "R1,100", description: "Professional-grade chemical peel customized for your skin type. Resurfaces skin to reduce fine lines, pigmentation, and texture." },
                    { id: "pro-dermaplaning-55", name: "Pro Dermaplaning Skin Treatment", duration: "55 mins", price: "R890", description: "Full dermaplaning facial combining exfoliation with a tailored treatment. Leaves skin exceptionally smooth and glowing." },
                    { id: "neurosculpt-55", name: "Neurosculpt", duration: "55 mins", price: "R1,250", description: "Full facial sculpting treatment using EMS technology to lift, contour, and define facial features naturally." },
                    { id: "infusion-undereye-peel", name: "Infusion and Under Eye Peel", duration: "55 mins", price: "R1,350", description: "Targeted treatment for dark circles and puffiness. Combines gentle peeling with nourishing infusion for refreshed eyes." },
                    { id: "luminfusion", name: "Luminfusion", duration: "55 mins", price: "R1,100", description: "Brightening treatment using LED technology and vitamin-rich products to combat dullness and uneven skin tone." },
                    { id: "melanopro-peel", name: "Melanopro Peel", duration: "55 mins", price: "R6,999", description: "Professional-grade pigmentation treatment. Multi-session program to significantly reduce melasma, sun damage, and hyperpigmentation." },
                    { id: "hydraderm", name: "Hydraderm", duration: "55 mins", price: "R1,400", description: "Deep hydration treatment for dehydrated skin. Infuses moisture at multiple levels for plump, dewy, healthy-looking skin." },
                    { id: "pro-microneedling", name: "Pro Microneedling", duration: "55 mins", price: "R1,950", description: "Collagen induction therapy using fine needles to stimulate skin renewal. Improves scarring, texture, and signs of aging." },
                    { id: "nanoinfusion", name: "Nanoinfusion", duration: "55 mins", price: "R1,400", description: "Needle-free alternative to microneedling. Nanotechnology delivers actives deep into skin without invasive treatment." },
                ],
            },
            {
                id: "facial-treatments",
                title: "Facial Treatments",
                note: "Save up to 10%",
                items: [
                    { id: "ultra-calming-facial", name: "Ultra Calming Facial", duration: "1hr", price: "R810", description: "Soothing facial for sensitive and reactive skin types. Calms redness, irritation, and discomfort while hydrating." },
                    { id: "skin-clearing-facial", name: "Skin Clearing Facial", duration: "1hr", price: "R810", description: "Deep-cleansing facial targeting acne and congestion. Purifies pores, balances oil, and clears breakouts." },
                    { id: "skin-brightening-facial", name: "Skin Brightening Facial", duration: "1hr", price: "R810", description: "Luminosity-boosting treatment for dull, uneven skin. Reduces dark spots and reveals a natural radiance." },
                    { id: "age-smart-facial", name: "Age Smart Facial", duration: "1hr", price: "R810", description: "Anti-aging facial addressing fine lines, loss of firmness, and uneven texture. Nourishes and rejuvenates mature skin." },
                    { id: "power-peel-30", name: "Power Peel 30 min", duration: "1hr", price: "R720", description: "Express chemical peel for quick skin renewal. Exfoliates and resurfaces for brighter, smoother skin." },
                    { id: "power-peel-60", name: "Power Peel 60 min", duration: "1hr", price: "R990", description: "Comprehensive peel treatment including prep, peel, and recovery. Maximum results with Dermalogica's advanced peel system." },
                    { id: "facial-30", name: "Facial 30 min", duration: "1hr", price: "R450", description: "Express facial for a quick skin refresh. Perfect for maintenance or when time is limited." },
                    { id: "facial-60", name: "Facial 60 min", duration: "1hr", price: "R810", description: "Full Dermalogica facial with cleansing, exfoliation, extractions, massage, mask, and finish. Complete skin therapy." },
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
                    { id: "moustache-ipl", name: "Moustache IPL", duration: "1hr", price: "R270", description: "Targets upper lip hair for smooth, hair-free skin. Multiple sessions for permanent reduction." },
                    { id: "beardline-ipl", name: "Beardline IPL", duration: "1hr", price: "R495", description: "Define and maintain a clean beardline. Reduces ingrown hairs and shaving irritation." },
                    { id: "neck-ipl-men", name: "Neck IPL Men", duration: "1hr", price: "R585", description: "Treats the back and sides of the neck for men. No more razor bumps or daily shaving." },
                    { id: "neck-ipl", name: "Neck IPL", duration: "1hr", price: "R495", description: "Smooth, hair-free neck area. Perfect for fine hairs that are difficult to wax." },
                    { id: "full-face-ipl", name: "Full Face IPL", duration: "1hr", price: "R882", description: "Complete facial hair removal including upper lip, chin, cheeks, and sideburns." },
                    { id: "full-face-neck-ipl", name: "Full Face and Neck", duration: "1hr", price: "R945", description: "Comprehensive treatment for entire face and neck area. Maximum value package." },
                ],
            },
            {
                id: "ipl-body",
                title: "Body IPL",
                note: "Save up to 10%",
                items: [
                    { id: "under-arm-ipl", name: "Under Arm IPL", duration: "1hr", price: "R495", description: "Eliminate underarm hair for smooth, sweat-resistant results. No more shaving or stubble." },
                    { id: "belly-button-ipl", name: "Belly Button IPL", duration: "1hr", price: "R450", description: "Targets the tummy trail and area around the belly button for a smooth midsection." },
                    { id: "stomach-ipl", name: "Stomach IPL", duration: "1hr", price: "R765", description: "Full stomach area treatment for hair-free, smooth skin you can show off." },
                    { id: "toes-feet-ipl", name: "Toes and Feet IPL", duration: "1hr", price: "R450", description: "Perfect for pesky toe and foot hair. Ideal for open-toe shoe season." },
                    { id: "full-buttocks-ipl", name: "Full Buttocks IPL", duration: "1hr", price: "R1,170", description: "Complete buttock area treatment for smooth, hair-free skin." },
                ],
            },
            {
                id: "ipl-bikini",
                title: "Bikini IPL",
                note: "Save up to 10%",
                items: [
                    { id: "bikini-sides-ipl", name: "Bikini Sides IPL", duration: "1hr", price: "R540", description: "Targets hair along the bikini line for clean edges. Perfect for swimwear season." },
                    { id: "brazillian-ipl", name: "Brazilian IPL", duration: "1hr", price: "R765", description: "Removes most bikini area hair leaving a small strip or landing strip style." },
                    { id: "hollywood-ipl", name: "Hollywood IPL", duration: "1hr", price: "R990", description: "Complete removal of all bikini area hair for totally smooth, hair-free results." },
                ],
            },
            {
                id: "ipl-legs",
                title: "Legs IPL",
                note: "Save up to 10%",
                items: [
                    { id: "half-leg-ipl", name: "Half Leg IPL", duration: "1hr", price: "R1,305", description: "Lower leg treatment from knee to ankle. Say goodbye to daily shaving." },
                    { id: "full-leg-ipl", name: "Full Leg IPL", duration: "1hr", price: "R2,070", description: "Complete leg treatment from thigh to ankle for silky smooth legs year-round." },
                    { id: "full-leg-ipl-premium", name: "Full Leg IPL Premium", duration: "1hr", price: "R2,565", description: "Premium full leg treatment with additional passes for maximum hair reduction per session." },
                ],
            },
            {
                id: "ipl-arms",
                title: "Arms IPL",
                note: "Save up to 10%",
                items: [
                    { id: "half-arm-ipl", name: "Half Arm IPL", duration: "1hr", price: "R765", description: "Forearm treatment from elbow to wrist. Perfect for visible arm hair." },
                    { id: "full-arm-ipl", name: "Full Arm IPL", duration: "1hr", price: "R1,350", description: "Complete arm coverage from shoulder to wrist for smooth, hair-free arms." },
                    { id: "full-arm-ipl-premium", name: "Full Arm IPL Premium", duration: "1hr", price: "R1,440", description: "Premium full arm treatment with additional passes for darker or stubborn hair." },
                ],
            },
            {
                id: "ipl-other",
                title: "Other IPL Services",
                note: "Save up to 10%",
                items: [
                    { id: "tattoo-removal", name: "Tattoo Removal", duration: "1hr", price: "R450", description: "Laser treatment to fade and remove unwanted tattoos. Multiple sessions required for complete removal." },
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
                    { id: "day-makeup", name: "Day Makeup", duration: "1hr", price: "R486", description: "Fresh, natural makeup look perfect for daytime events, work, or casual outings using Kryolan products." },
                    { id: "evening-makeup", name: "Evening Makeup", duration: "1hr", price: "R594", description: "Glamorous, long-lasting makeup designed for evening events, parties, and special occasions." },
                    { id: "bridal-makeup", name: "Bridal Makeup", duration: "1hr", price: "R1,620", description: "Flawless bridal makeup using premium Kryolan products. Includes trial session recommendation. Photograph and tear-proof finish." },
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
                    { id: "vaginal-tightening", name: "Vaginal Tightening", duration: "1hr", price: "R4,950", description: "Non-surgical vaginal rejuvenation using advanced technology. Improves tone, sensitivity, and confidence without surgery or downtime." },
                    { id: "fractional-laser", name: "Fractional Laser Full Face", duration: "1hr", price: "R2,430", description: "Precision laser resurfacing to reduce wrinkles, scars, and sun damage. Stimulates collagen for smoother, younger-looking skin." },
                    { id: "plasmage", name: "Plasmage", duration: "1hr", price: "R899.10", description: "Plasma technology for skin tightening and rejuvenation. Effective for eyelid lifting, wrinkle reduction, and skin imperfections." },
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
                    { id: "powderpixel-brows", name: "Powder Pixel Brows", duration: "1hr", price: "R1,710", description: "Soft, powdery brow effect that mimics filled-in makeup. Lasts 2-3 years and works on all skin types including oily skin." },
                    { id: "microblading", name: "Microblading", duration: "1hr", price: "R1,350", description: "Hair-stroke technique creating natural-looking brows. Semi-permanent pigment lasts 12-18 months. Includes touch-up session." },
                    { id: "hybrid-brows", name: "Hybrid Brows", duration: "1hr", price: "R1,710", description: "Best of both worlds combining microblading strokes with powder shading for fuller, more defined brows." },
                ],
            },
            {
                id: "eyes-pmu",
                title: "Eyes",
                note: "Save up to 10%",
                items: [
                    { id: "eyeliner-top", name: "Eyeliner Top", duration: "1hr", price: "R720", description: "Semi-permanent upper eyeliner for defined eyes without daily makeup. Lash enhancement to winged options available." },
                    { id: "eyeliner-bottom", name: "Eyeliner Bottom", duration: "1hr", price: "R720", description: "Subtle lower lash line definition. Creates the look of fuller lashes and more defined eyes." },
                ],
            },
            {
                id: "lips-pmu",
                title: "Lips",
                note: "Save up to 10%",
                items: [
                    { id: "full-lips-contour", name: "Full Lips Contour", duration: "1hr", price: "R2,430", description: "Full lip blush and contour for beautifully defined, tinted lips. Enhances natural lip color and shape." },
                    { id: "lip-liner", name: "Lip Liner", duration: "1hr", price: "R1,710", description: "Semi-permanent lip liner to define and shape your lips. Creates the illusion of fuller, more symmetrical lips." },
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
                    { id: "dermaplaning-pro", name: "Dermaplaning", duration: "1hr", price: "R1,080", description: "Full dermaplaning treatment removing dead skin cells and peach fuzz. Reveals brighter, smoother skin and enhances product absorption." },
                    { id: "dermaplaning-maintenance", name: "Dermaplaning Maintenance", duration: "1hr", price: "R315", description: "Quick maintenance dermaplaning session for previously treated clients. Keeps skin smooth between full treatments." },
                    { id: "microneedling-hands", name: "Micro Needling Hands", duration: "1hr", price: "R648", description: "Collagen induction therapy for hands. Reduces age spots, crepey skin, and visible veins for youthful-looking hands." },
                    { id: "microneedling-pro", name: "Microneedling", duration: "1hr", price: "R1,620", description: "Professional microneedling with high-quality numbing and serums. Treats acne scars, wrinkles, and improves overall skin texture." },
                    { id: "high-frequency-facial", name: "High Frequency Facial", duration: "1hr", price: "R720", description: "Electrical current treatment that kills bacteria, reduces inflammation, and promotes healing. Great for acne-prone skin." },
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
                    { id: "basic-facial-qms", name: "Basic Facial", duration: "1hr", price: "R657", description: "Introduction to QMS Medicosmetics skincare. Deep cleansing facial with German medical-grade products." },
                    { id: "sensitive-skin-facial", name: "Sensitive Skin Facial", duration: "1hr", price: "R540", description: "Gentle facial designed for reactive, sensitive skin types. Calms, soothes, and protects with QMS formulations." },
                    { id: "activator-treatment", name: "Activator Treatment", duration: "1hr", price: "R648", description: "Targeted treatment using QMS Active Serums to address specific skin concerns like aging or dehydration." },
                    { id: "deep-pore-cleansing", name: "Deep Pore Cleansing Facial", duration: "1hr", price: "R675", description: "Thorough extraction and deep cleansing facial. Perfect for congested, oily, or acne-prone skin." },
                    { id: "rejuvenating-facial", name: "Rejuvenating Facial", duration: "1hr", price: "R765", description: "Anti-aging facial using QMS rejuvenating formulas. Stimulates cell renewal and improves skin vitality." },
                    { id: "collagen-facial", name: "Collagen Facial", duration: "1hr", price: "R799.20", description: "Intensive collagen-boosting treatment for firmer, more elastic skin. Reduces fine lines and improves skin density." },
                    { id: "chemical-peel", name: "Chemical Peel", duration: "1hr", price: "R809.10", description: "Professional chemical peel for skin resurfacing. Improves texture, reduces pigmentation, and reveals fresh, glowing skin." },
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
                    { id: "sunbed-session", name: "Sunbed Per Session", duration: "1hr", price: "R54", description: "Single sunbed session for a natural-looking tan. Time adjusted to your skin type for safe tanning." },
                    { id: "sunbed-10-sessions", name: "Sunbed 10 Sessions", duration: "1hr", price: "R315", description: "10-session package for building and maintaining your tan. Best value for regular tanners." },
                    { id: "sunbed-20-sessions", name: "Sunbed 20 Sessions", duration: "1hr", price: "R630", description: "Ultimate tanning package. 20 sessions for year-round golden glow at the best per-session rate." },
                    { id: "spraytan", name: "Spray Tan", duration: "1hr", price: "R486", description: "Airbrush spray tan for instant, streak-free color. Natural-looking results without UV exposure." },
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
                    { id: "lip-wax", name: "Lip Wax", duration: "1hr", price: "R90", description: "Upper lip hair removal for smooth, hair-free skin. Quick and effective with premium wax." },
                    { id: "cheek-wax", name: "Cheek Wax", duration: "1hr", price: "R157.50", description: "Remove unwanted cheek hair for a smooth, polished complexion." },
                    { id: "nose-wax", name: "Nose Wax", duration: "1hr", price: "R81", description: "Quick removal of visible nose hair. Clean, neat appearance without trimming." },
                    { id: "ear-wax", name: "Ear Wax", duration: "1hr", price: "R108", description: "Remove unwanted ear hair safely and effectively. Tidy, groomed look." },
                ],
            },
            {
                id: "body-wax",
                title: "Body Waxing",
                note: "Save up to 10%",
                items: [
                    { id: "under-arm-wax", name: "Under Arm Wax", duration: "1hr", price: "R157.50", description: "Smooth, hair-free underarms lasting 3-4 weeks. Premium wax for sensitive areas." },
                    { id: "full-tummy-wax", name: "Full Tummy Wax", duration: "1hr", price: "R180", description: "Complete stomach area waxing for smooth, hair-free results." },
                    { id: "chest-wax", name: "Chest Wax", duration: "1hr", price: "R216", description: "Full chest hair removal for men. Smooth results lasting weeks." },
                    { id: "half-back-wax", name: "Half Back Wax", duration: "1hr", price: "R225", description: "Lower or upper back waxing. Perfect for targeted hair removal." },
                    { id: "full-back-wax", name: "Full Back Wax", duration: "1hr", price: "R261", description: "Complete back hair removal from shoulders to waist. Smooth, hair-free results." },
                    { id: "men-back-wax", name: "Men Back Wax", duration: "1hr", price: "R522", description: "Full back waxing designed for men's coarser hair. Includes shoulders and upper buttocks." },
                    { id: "butt-wax", name: "Butt Wax", duration: "1hr", price: "R180", description: "Buttock hair removal for smooth, comfortable results. Professional and discreet." },
                ],
            },
            {
                id: "leg-arm-wax",
                title: "Leg & Arm Waxing",
                note: "Save up to 10%",
                items: [
                    { id: "half-arm-wax", name: "Half Arm Wax", duration: "1hr", price: "R130.50", description: "Forearm waxing from elbow to wrist. Smooth, hair-free arms." },
                    { id: "full-arm-wax", name: "Full Arm Wax", duration: "1hr", price: "R234", description: "Complete arm waxing from shoulder to wrist. Silky smooth results." },
                    { id: "half-leg-wax", name: "Half Leg Wax", duration: "1hr", price: "R261", description: "Lower leg waxing from knee to ankle. Smooth legs for weeks." },
                    { id: "full-leg-wax", name: "Full Leg Wax", duration: "1hr", price: "R486", description: "Complete leg waxing from thigh to ankle. Long-lasting smooth results." },
                ],
            },
            {
                id: "bikini-wax",
                title: "Bikini Waxing",
                note: "Save up to 10%",
                items: [
                    { id: "brazillian-wax", name: "Brazilian Wax", duration: "1hr", price: "R387", description: "Bikini area waxing leaving a small strip. Premium wax for sensitive areas with minimal discomfort." },
                    { id: "hollywood-wax", name: "Hollywood Wax", duration: "1hr", price: "R450", description: "Complete hair removal from the entire bikini area. Clean, smooth finish." },
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
                    { id: "cut-0-5-years", name: "Cut 0-5 Years", duration: "30 mins", price: "R99", description: "Gentle haircut for little ones. Patient stylists experienced with young children." },
                    { id: "haircut-short", name: "Haircut Short", duration: "1hr", price: "R288", description: "Precision cut for short hair. Includes consultation, wash, cut, and style." },
                    { id: "haircut-medium", name: "Haircut Medium", duration: "1hr", price: "R378", description: "Expert cutting for shoulder-length hair. Personalized style consultation included." },
                    { id: "haircut-long", name: "Haircut Long", duration: "1hr", price: "R351", description: "Beautiful shaping for long hair. Trim, layer, or reshape your look." },
                    { id: "pensioner-cut-blow", name: "Pensioner Cut and Blow", duration: "1hr", price: "R252", description: "Affordable cut and blow-dry for seniors. Quality styling at value pricing." },
                ],
            },
            {
                id: "blow-dry",
                title: "Blow Dry",
                note: "Save up to 10%",
                items: [
                    { id: "medium-blow", name: "Medium Blow", duration: "1hr", price: "R297", description: "Professional blow-dry for medium-length hair. Smooth, bouncy, or curled finish." },
                    { id: "extra-long-blow", name: "Extra Long Blow", duration: "1hr", price: "R378", description: "Expert styling for very long hair. Sleek, voluminous, or textured styles." },
                    { id: "long-blow", name: "Long Blow", duration: "1hr", price: "R468", description: "Professional blow-dry for long hair. Perfect finish for any occasion." },
                ],
            },
            {
                id: "blow-packages",
                title: "Blow Packages (10x)",
                note: "Save up to 10%",
                items: [
                    { id: "short-blow-10x", name: "Short Blow Package 10x", duration: "1hr", price: "R1,080", description: "10-session blow-dry package for short hair. Save with prepaid visits." },
                    { id: "medium-blow-10x", name: "Medium Blow Package 10x", duration: "1hr", price: "R1,350", description: "10-session blow-dry package for medium hair. Best value for regular clients." },
                    { id: "long-blow-10x", name: "Long Blow Package 10x", duration: "1hr", price: "R1,620", description: "10-session blow-dry package for long hair. Premium styling at bulk savings." },
                    { id: "extra-long-blow-10x", name: "Extra Long Blow Package 10x", duration: "1hr", price: "R1,890", description: "10-session package for extra long hair. Maximum savings on styling." },
                ],
            },
            {
                id: "color",
                title: "Hair Color",
                note: "Save up to 10%",
                items: [
                    { id: "roots", name: "Roots", duration: "1hr 15 mins", price: "R675", description: "Root touch-up to refresh your color. Blend seamlessly with existing color." },
                    { id: "short-color", name: "Short Color", duration: "1hr", price: "R810", description: "Full color application for short hair. Vibrant, even coverage." },
                    { id: "medium-color", name: "Medium Color", duration: "1hr", price: "R990", description: "Complete color service for medium-length hair. Professional formulation." },
                    { id: "long-color", name: "Long Color", duration: "1hr", price: "R1,215", description: "Full color treatment for long hair. Rich, lasting color results." },
                    { id: "extra-long-color", name: "Extra Long Color", duration: "1hr", price: "R1,350", description: "Comprehensive color for very long hair. Premium products for stunning results." },
                    { id: "balayage", name: "Balayage", duration: "2hr 30 mins", price: "R135", description: "Hand-painted highlights for natural, sun-kissed dimension. Low maintenance, beautiful grow-out." },
                ],
            },
            {
                id: "foils",
                title: "Foils",
                note: "Save up to 10%",
                items: [
                    { id: "cap-highlights", name: "Cap Highlights", duration: "1hr", price: "R540", description: "Traditional cap highlighting technique. Subtle, even highlights throughout." },
                    { id: "short-half-head-foils", name: "Short Half Head Foils", duration: "1hr", price: "R765", description: "Partial foil highlights for short hair. Add dimension around the face." },
                    { id: "medium-half-head-foils", name: "Medium Half Head Foils", duration: "1hr", price: "R855", description: "Half-head foils for medium hair. Perfect for refreshing your look." },
                    { id: "long-half-head-foils", name: "Long Half Head Foils", duration: "1hr", price: "R1,035", description: "Partial foil highlights for long hair. Beautiful dimension and depth." },
                    { id: "extra-long-half-head-foils", name: "Extra Long Half Head Foils", duration: "1hr", price: "R1,125", description: "Half-head foils for very long hair. Strategic placement for impact." },
                    { id: "short-full-head-foils", name: "Short Full Head Foils", duration: "1hr", price: "R810", description: "Complete foil highlights for short hair. All-over dimension and brightness." },
                    { id: "medium-full-head-foils", name: "Medium Full Head Foils", duration: "1hr", price: "R1,035", description: "Full head foils for medium hair. Dramatic, dimensional results." },
                    { id: "long-full-head-foils", name: "Long Full Head Foils", duration: "1hr", price: "R1,170", description: "Complete highlighting for long hair. Multi-tonal, stunning finish." },
                    { id: "extra-long-full-head-foils", name: "Extra Long Full Head Foils", duration: "1hr", price: "R1,305", description: "Full foil service for very long hair. Maximum dimension and impact." },
                ],
            },
            {
                id: "toner",
                title: "Hair Toner",
                note: "Save up to 10%",
                items: [
                    { id: "short-toner", name: "Short Hair Toner", duration: "1hr", price: "R342", description: "Color-correcting toner for short hair. Neutralize brassiness or add shine." },
                    { id: "medium-toner", name: "Medium Hair Toner", duration: "1hr", price: "R378", description: "Toning service for medium hair. Perfect the shade of your color." },
                    { id: "long-toner", name: "Long Hair Toner", duration: "1hr", price: "R450", description: "Full toning treatment for long hair. Even, beautiful color tone throughout." },
                ],
            },
            {
                id: "treatments-hair",
                title: "Hair Treatments",
                note: "Save up to 10%",
                items: [
                    { id: "osmo-intensive-mask", name: "Osmo Intensive Mask", duration: "1hr", price: "R288", description: "Deep conditioning treatment to restore moisture and shine to dry, damaged hair." },
                    { id: "osmo-silver-mask", name: "Osmo Silver Mask", duration: "1hr", price: "R315", description: "Purple toning mask for blonde & grey hair. Eliminates yellow tones." },
                    { id: "care-vital-mask", name: "Care Vital Mask", duration: "1hr", price: "R495", description: "Intensive repair treatment for damaged, over-processed hair. Restores strength and elasticity." },
                    { id: "care-keratin-mask", name: "Care Keratin Mask", duration: "1hr", price: "R495", description: "Keratin-infused deep conditioning. Smooths frizz and rebuilds hair structure." },
                    { id: "botox-short", name: "Botox Treat Short", duration: "1hr", price: "R810", description: "Hair botox treatment for short hair. Deep repair, shine, and manageability." },
                    { id: "botox-medium", name: "Botox Treat Medium Hair", duration: "1hr", price: "R720", description: "Hair botox for medium length. Repairs damage and adds incredible shine." },
                    { id: "botox-long", name: "Botox Long Hair Treat", duration: "1hr", price: "R810", description: "Full hair botox for long hair. Transforms dry, damaged hair to silky perfection." },
                ],
            },
            {
                id: "brazilian-blow",
                title: "Brazilian Blow",
                note: "Save up to 10%",
                items: [
                    { id: "brazilian-blow-short", name: "Brazilian Blow Short", duration: "1hr", price: "R1,035", description: "Keratin smoothing treatment for short hair. Eliminates frizz for up to 3 months." },
                    { id: "brazilian-blow-long", name: "Brazilian Blow Long", duration: "1hr", price: "R1,548", description: "Brazilian blowout for long hair. Smoother, shinier, more manageable hair." },
                    { id: "brazilian-blow-extra-long", name: "Brazilian Blow Extra Long", duration: "1hr", price: "R1,683", description: "Full keratin treatment for very long hair. Transform your daily styling routine." },
                ],
            },
            {
                id: "upstyle",
                title: "Upstyle",
                note: "Save up to 10%",
                items: [
                    { id: "short-upstyle", name: "Short Hair Upstyle", duration: "1hr", price: "R540", description: "Creative updo styling for short hair. Perfect for events and special occasions." },
                    { id: "medium-upstyle", name: "Medium Upstyle", duration: "1hr", price: "R720", description: "Elegant upstyle for medium-length hair. Weddings, galas, and celebrations." },
                    { id: "long-upstyle", name: "Long Hair Upstyle", duration: "1hr", price: "R900", description: "Stunning updo for long hair. Classic or trendy styles for your special event." },
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
                    { id: "manicure-basic", name: "Manicure", duration: "45 mins", price: "R234", description: "Classic manicure with cuticle care, shaping, hand massage, and polish application." },
                ],
            },
            {
                id: "acrylic-nails",
                title: "Acrylic Nails",
                note: "Save up to 10%",
                items: [
                    { id: "acrylic-fill", name: "Acrylic Fill", duration: "1hr", price: "R378", description: "Maintenance fill for existing acrylic nails. Refresh and reshape your look." },
                    { id: "acrylic-overlay", name: "Acrylic Overlay", duration: "1hr", price: "R414", description: "Acrylic applied over natural nails for strength and durability without tips." },
                    { id: "full-set-acrylic-tips", name: "Full Set Acrylic with Tips", duration: "1hr", price: "R540", description: "Complete set of acrylic nails with tip extensions. Choose your length and shape." },
                    { id: "sculpted-acrylic", name: "Sculpted Acrylic with Forms", duration: "1hr", price: "R594", description: "Custom sculpted acrylics using forms. No tips for a more natural nail bed." },
                    { id: "full-set-designer", name: "Full Set Designer Nails", duration: "1hr", price: "R648", description: "Full set with nail art and design. Express your style with custom creations." },
                    { id: "acrylic-soak-off", name: "Acrylic Soak Off", duration: "1hr", price: "R108", description: "Safe removal of acrylic nails protecting your natural nails underneath." },
                ],
            },
            {
                id: "gel-nails",
                title: "Gel Nails",
                note: "Save up to 10%",
                items: [
                    { id: "gel-toes", name: "Gel Toes", duration: "1hr", price: "R252", description: "Gel polish for toenails. Chip-resistant shine for 2-3 weeks." },
                    { id: "gel-overlay", name: "Gel Overlay", duration: "1hr", price: "R378", description: "Gel applied over natural nails for added strength and glossy finish." },
                    { id: "gel-fill", name: "Gel Fill", duration: "1hr", price: "R378", description: "Maintenance fill for gel extensions. Keep your nails looking fresh." },
                    { id: "rubber-base-fill", name: "Rubber Base Fill", duration: "1hr", price: "R162", description: "Fill service for rubber base gel. Strengthening and flexible wear." },
                    { id: "gel-soak-off", name: "Gel Soak Off", duration: "1hr", price: "R90", description: "Gentle removal of gel polish or gel nails to protect natural nails." },
                ],
            },
            {
                id: "pedicure",
                title: "Pedicure",
                note: "Save up to 10%",
                items: [
                    { id: "pedicure-gel", name: "Pedicure with Gel", duration: "1hr", price: "R540", description: "Complete spa pedicure with gel polish finish. Includes soak, scrub, massage, and polish." },
                ],
            },
            {
                id: "nail-extras",
                title: "Extras",
                note: "Save up to 10%",
                items: [
                    { id: "nail-repair", name: "Nail Repair", duration: "1hr", price: "R54", description: "Fix a broken or damaged nail. Quick repair to save your manicure." },
                    { id: "buff-only", name: "Buff Only", duration: "1hr", price: "R63", description: "Quick nail buffing for natural shine without polish. Clean, polished look." },
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
                    { id: "full-set-silk", name: "Full Set Silk Lashes", duration: "1hr", price: "R450", description: "Natural-looking silk lash extensions. Lightweight, soft, and perfect for everyday wear." },
                    { id: "full-set-classic", name: "Full Set Classic Lashes", duration: "1hr", price: "R630", description: "One extension per natural lash for enhanced, natural-looking length and fullness." },
                    { id: "full-set-volume", name: "Full Set Volume Lashes", duration: "1hr", price: "R720", description: "Multiple fine extensions per lash for dramatic, fluffy volume. Bold, glamorous look." },
                    { id: "hybrid-lashes", name: "Hybrid Lashes", duration: "1hr", price: "R720", description: "Mix of classic and volume for textured, dimensional lashes. Best of both worlds." },
                    { id: "glamour-lashes", name: "Glamour Lashes", duration: "1hr", price: "R900", description: "Maximum drama with mega volume technique. Red carpet-worthy, show-stopping lashes." },
                    { id: "lash-fill", name: "Lash Fill", duration: "1hr", price: "R360", description: "Maintenance fill for existing extensions. Keep your lashes full and beautiful." },
                ],
            },
            {
                id: "lash-treatments",
                title: "Lash Treatments",
                note: "Save up to 10%",
                items: [
                    { id: "lash-tint", name: "Lash Tint", duration: "1hr", price: "R108", description: "Darken natural lashes for definition without mascara. Lasts 4-6 weeks." },
                    { id: "lash-lift", name: "Lash Lift", duration: "1hr", price: "R423", description: "Semi-permanent curl for natural lashes. Wake up with wide, open eyes for 6-8 weeks." },
                    { id: "lash-lamination", name: "Lash Lamination", duration: "1hr", price: "R495", description: "Nourishing lift and tint treatment. Adds volume and curl while conditioning lashes." },
                ],
            },
            {
                id: "brow-treatments",
                title: "Brow Treatments",
                note: "Save up to 10%",
                items: [
                    { id: "brow-tint", name: "Brow Tint", duration: "1hr", price: "R90", description: "Color enhancement for brows. Defines sparse areas and adds depth." },
                    { id: "brow-lamination", name: "Brow Lamination", duration: "1hr", price: "R423", description: "Fluffy, brushed-up brow look that lasts 6-8 weeks. Trendy, full brow effect." },
                    { id: "brow-henna", name: "Brow Henna", duration: "1hr", price: "R423", description: "Natural tinting that stains the skin for fuller-looking brows. Lasts longer than regular tint." },
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
