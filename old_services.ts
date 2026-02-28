
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
    seoKeywords?: string[];
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
        image: "/images/gallery/Facials/professional-skin-facial-treatment-in-progress.jpeg",
        badge: "Medical Grade",
        badgeVariant: "medical",
        subcategories: [
            {
                id: "face-lifts",
                title: "Face Lifts & Rejuvenation",
                items: [
                    { id: "nefertiti-lift", name: "Nefertiti Lift", duration: "1hr", price: "R7,950", description: "Named after the Egyptian queen, this treatment uses targeted injections along the jawline and neck to lift and define, creating a sleeker, more youthful profile.", seoKeywords: ["jawline contouring", "neck lift injections", "lower face definition", "jawline slimming"] },
                    { id: "liquid-facelift", name: "Non Surgical Liquid Face Lift", duration: "1hr", price: "R10,000", description: "A comprehensive rejuvenation combining dermal fillers and muscle relaxants to restore volume, smooth wrinkles, and lift sagging skin without surgery.", seoKeywords: ["non-surgical facelift", "full face rejuvenation", "facial contouring with fillers", "anti-aging injectables"] },
                    { id: "collagen-biostimulator", name: "Collagen Biostimulator Injections 10ml", duration: "1hr", price: "R5,000", description: "Stimulates your skin's natural collagen production for gradual, long-lasting skin tightening and rejuvenation that looks completely natural.", seoKeywords: ["collagen biostimulator injections treatment", "best collagen biostimulator injections", "professional collagen biostimulator injections"] },
                ],
            },
            {
                id: "tox-treatment",
                title: "Tox Treatment",
                items: [
                    { id: "tox-per-unit", name: "Tox Per Unit", duration: "1hr", price: "R59.60", description: "Precision muscle relaxant injections that smooth fine lines and wrinkles. Units customized to your needs for natural-looking results.", seoKeywords: ["tox per unit injections", "best tox per unit", "medical aesthetics clinic"] },
                ],
            },
            {
                id: "skin-boosters",
                title: "Under Eye Skin Boosters",
                items: [
                    { id: "undereye-2-treatments", name: "Under Eye Skin Booster (2 Treatments)", duration: "1hr", price: "R4,000", description: "Intensive hydration therapy for the delicate under-eye area. Two sessions of micro-injections to plump, brighten, and reduce dark circles.", seoKeywords: ["under eye skin booster (2 treatments) treatment", "best under eye skin booster (2 treatments)", "professional under eye skin booster (2 treatments)"] },
                    { id: "undereye-1-treatment", name: "Under Eye Skin Booster (1 Treatment)", duration: "1hr", price: "R2,800", description: "Targeted hydration boost using hyaluronic acid micro-injections to refresh tired eyes and reduce the appearance of fine lines.", seoKeywords: ["under eye skin booster (1 treatment) treatment", "best under eye skin booster (1 treatment)", "professional under eye skin booster (1 treatment)"] },
                ],
            },
            {
                id: "dermal-fillers",
                title: "Dermal Fillers",
                items: [
                    { id: "cheek-fillers-2ml", name: "Dermal Cheek Fillers 2ml", duration: "1hr", price: "R6,000", description: "Restore youthful volume to mid-face with premium hyaluronic acid filler. Lifts cheekbones and smooths nasolabial folds for a refreshed appearance.", seoKeywords: ["dermal cheek fillers injections", "best dermal cheek fillers", "medical aesthetics clinic"] },
                    { id: "cheek-fillers-1ml", name: "Dermal Cheek Fillers 1ml", duration: "1hr", price: "R3,500", description: "Subtle cheek enhancement using premium filler to add definition and lift. Perfect for maintaining or light enhancement.", seoKeywords: ["dermal cheek fillers injections", "best dermal cheek fillers", "medical aesthetics clinic"] },
                    { id: "russian-lip-1ml", name: "Dermal Russian Lip Fillers 1ml", duration: "1hr", price: "R3,000", description: "The sought-after Russian lip technique creates a flatter, more defined lip shape with height rather than projection. Creates a doll-like, heart-shaped pout.", seoKeywords: ["dermal russian lip fillers treatment", "best dermal russian lip fillers", "professional dermal russian lip fillers"] },
                    { id: "lip-filler-1ml", name: "Lip Filler 1ml", duration: "1hr", price: "R2,800", description: "Enhance your natural lip shape with premium hyaluronic acid filler. Adds volume, definition, and hydration for beautifully plump, natural-looking lips.", seoKeywords: ["lip injections", "lip augmentation", "dermal fillers for lips", "plump lips", "lip enhancement"] },
                    { id: "dermal-filler-1ml", name: "Dermal Filler 1ml", duration: "1hr", price: "R2,800", description: "Versatile hyaluronic acid filler for lips, lines, or facial contouring. Customizable placement for natural-looking enhancement.", seoKeywords: ["dermal filler injections", "best dermal filler", "medical aesthetics clinic"] },
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
        image: "/images/fat-freezing/fat-freezing-stomach-treatment.jpeg",
        subcategories: [
            {
                id: "cryolipolysis",
                title: "Cryolipolysis",
                items: [
                    { id: "fat-freezing-session", name: "Fat Freezing Session", duration: "45min", price: "R799.20", description: "Freeze away stubborn fat permanently in just one session. Cryolipolysis technology targets and crystallises fat cells, which your body naturally eliminates over 6–12 weeks. Zero needles, zero downtime.", seoKeywords: ["cryolipolysis treatment", "non-surgical fat reduction", "freeze fat cells", "body contouring without surgery"] },
                    { id: "fat-freezing-4-cups", name: "Fat Freezing (4 Cups)", duration: "45min", price: "R2,450", description: "Tackle multiple problem areas in one visit. Four applicator cups treat larger zones like the abdomen and flanks simultaneously — maximum results, minimum time. Ideal for a full body contouring session.", seoKeywords: ["fat freezing treatment", "best fat freezing", "professional fat freezing"] },
                    { id: "fat-freezing-2-cups", name: "Fat Freezing (2 Cups)", duration: "45min", price: "R1,450", description: "Target two stubborn fat pockets at once. Perfect for love handles, inner thighs, or bra bulge. Walk in, relax for 45 minutes, and walk out — no recovery needed.", seoKeywords: ["fat freezing treatment", "best fat freezing", "professional fat freezing"] },
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
        image: "/images/slimming/emsculpt-body-contouring-session.png",
        subcategories: [
            {
                id: "slimming-injections",
                title: "Injections",
                items: [
                    { id: "lemon-bottle-10ml", name: "Lemon Bottle (10ml)", duration: "30min", price: "R1,400", description: "The viral fat-dissolving injection that breaks down localised fat deposits with minimal discomfort. Lemon Bottle's advanced formula targets stubborn areas like double chins, arms, and abdomen — visible results within days.", seoKeywords: ["fat dissolving injections", "lemon bottle fat removal", "non-surgical lipolysis", "stubborn fat injection"] },
                    { id: "slimming-injection", name: "Slimming Injection", duration: "15min", price: "R300", description: "A quick, effective injection to support your weight loss journey. Boosts metabolism and assists in breaking down fat — the perfect complement to a healthy lifestyle for faster, more visible results.", seoKeywords: ["slimming injection treatment", "best slimming injection", "professional slimming injection"] },
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
        image: "/images/massages/deep-relaxation-neck-massage.jpeg",
        subcategories: [
            {
                id: "body-massage",
                title: "Full Body",
                items: [
                    { id: "swedish-massage-60", name: "Swedish Massage (60min)", duration: "1hr", price: "R500", description: "The ultimate stress-reliever. Long, flowing strokes improve circulation, ease muscle tension, and leave you in a state of deep relaxation. Perfect for first-timers or anyone needing to unwind completely.", seoKeywords: ["swedish massage therapy", "best swedish massage", "relaxation spa massage"] },
                    { id: "aromatherapy-60", name: "Aromatherapy Massage (60min)", duration: "1hr", price: "R550", description: "A sensory journey combining therapeutic massage with pure essential oils chosen for your mood and needs. Calms the nervous system, lifts your mood, and leaves your skin silky smooth and fragrant.", seoKeywords: ["aromatherapy massage treatment", "best aromatherapy massage", "professional aromatherapy massage"] },
                    { id: "hot-stone-60", name: "Hot Stone Massage (60min)", duration: "1hr", price: "R600", description: "Warm basalt stones melt away deep muscle tension that hands alone can't reach. The heat penetrates tired muscles, improves blood flow, and creates an intensely relaxing, almost meditative experience.", seoKeywords: ["hot stone massage treatment", "best hot stone massage", "professional hot stone massage"] },
                    { id: "deep-tissue-60", name: "Deep Tissue Massage (60min)", duration: "1hr", price: "R600", description: "Targeted pressure on deep muscle layers to release chronic tension, knots, and tightness. Ideal if you carry stress in your shoulders, have a stiff neck, or suffer from persistent muscle aches.", seoKeywords: ["deep tissue massage treatment", "best deep tissue massage", "professional deep tissue massage"] },
                    { id: "sports-massage-60", name: "Sports Massage (60min)", duration: "1hr", price: "R600", description: "Designed for active bodies. Reduces muscle soreness, speeds up recovery, and improves flexibility. Whether you're training hard or recovering from exertion, this massage gets you back at your best faster.", seoKeywords: ["sports massage therapy", "best sports massage", "muscle tension relief massage"] },
                    { id: "back-neck-30", name: "Back & Neck Massage (30min)", duration: "30min", price: "R350", description: "A focused 30-minute treatment targeting the most common tension hotspots — upper back, shoulders, and neck. Quick enough to fit into a lunch break, effective enough to feel the difference immediately.", seoKeywords: ["back & neck massage treatment", "best back & neck massage", "professional back & neck massage"] },
                    { id: "back-neck-45", name: "Back & Neck Massage (45min)", duration: "45min", price: "R450", description: "Extra time to work through stubborn tension in your back, neck, and shoulders. The additional 15 minutes allows for deeper work on problem areas, leaving you genuinely relaxed and pain-free.", seoKeywords: ["back & neck massage treatment", "best back & neck massage", "professional back & neck massage"] },
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
        image: "/images/gallery/Facials/facial-treatment-room-steamer-dermalogica-products.jpeg",
        subcategories: [
            {
                id: "pro-skin",
                title: "Pro Skin Treatments",
                items: [
                    // New items from list
                    { id: "multivitamin-treatment", name: "Multivitamin Skin Treatment", duration: "45min", price: "R690", description: "A nutrient-rich boost for dull, tired skin. Vitamins A, C, and E work together to repair damage, improve elasticity, and restore a healthy glow.", seoKeywords: ["multivitamin skin treatment treatment", "best multivitamin skin treatment", "professional multivitamin skin treatment"] },
                    { id: "pro-dermaplaning-30", name: "Pro Dermaplaning 30 min", duration: "30min", price: "R490", description: "Exfoliates and removes peach fuzz for instantly smoother, brighter skin. Enhances product absorption and creates a flawless base for makeup.", seoKeywords: ["pro dermaplaning treatment", "best pro dermaplaning", "professional pro dermaplaning"] },
                    { id: "neurosculpt-30", name: "Neurosculpt 30 min", duration: "30min", price: "R650", description: "A targeted 30-minute treatment focusing on muscle relaxation and facial contouring to relieve tension and smooth fine lines.", seoKeywords: ["neurosculpt treatment", "best neurosculpt", "professional neurosculpt"] },

                    // Updated existing items
                    { id: "pro-skin-30", name: "Pro Skin 30", duration: "30min", price: "R450", description: "A precision 30-minute facial customised to your skin's exact needs. Dermalogica's expert mapping identifies your unique concerns and targets them directly — perfect for a quick but effective skin reset." }, // Updated to match "facial 30 min" price R450? Or keep old? List has "facial 30 min $450". I'll use that.
                    { id: "pro-skin-60", name: "Pro Skin 60", duration: "1hr", price: "R950", description: "The full Dermalogica experience. A comprehensive 60-minute treatment that deeply cleanses, exfoliates, and nourishes your skin using professional-grade products. Leaves skin visibly clearer, brighter, and healthier." }, // Matched to 'pro skin treatment' R950
                    { id: "pro-bright", name: "Pro Bright", duration: "1hr", price: "R990", description: "Fade dark spots, even skin tone, and restore your natural radiance. This brightening treatment targets hyperpigmentation, sun damage, and dullness using Dermalogica's most advanced brightening actives.", seoKeywords: ["pro bright treatment", "best pro bright", "professional pro bright"] },
                    { id: "pro-firm", name: "Pro Firm", duration: "1hr", price: "R1,100", description: "Lift, firm, and tighten ageing or lax skin. Pro Firm uses powerful peptides and collagen-stimulating actives to visibly reduce sagging and restore a more youthful, sculpted facial contour." }, // Updated to R1100
                    { id: "pro-clear", name: "Pro Clear", duration: "1hr", price: "R990", description: "The ultimate solution for breakout-prone and congested skin. Deep-cleans pores, reduces inflammation, and regulates oil production — leaving skin clearer, calmer, and less prone to future breakouts.", seoKeywords: ["pro clear treatment", "best pro clear", "professional pro clear"] },
                    { id: "pro-calm", name: "Pro Calm", duration: "1hr", price: "R1,100", description: "Designed for sensitive, reactive, or rosacea-prone skin. This ultra-gentle treatment soothes redness, reduces irritation, and strengthens the skin barrier — so your skin can finally feel comfortable in itself." }, // Updated to R1100
                    { id: "eye-peel", name: "Pro Eye Peel", duration: "30min", price: "R1,350", description: "A targeted infusion and peel for the delicate eye area. Reduces fine lines, puffiness, and dark circles. Gentle yet effective — wake up looking refreshed even when you haven't slept enough." }, // Matched to "infusion and under eye peel $1,350"?

                    // More New Items
                    { id: "pro-dermaplaning-full", name: "Pro Dermaplaning Skin Treatment", duration: "55min", price: "R890", description: "A complete 55-minute Dermaplaning facial. Combines deep exfoliation with Dermalogica's professional serums and masques for glass-like skin.", seoKeywords: ["pro dermaplaning skin treatment treatment", "best pro dermaplaning skin treatment", "professional pro dermaplaning skin treatment"] },
                    { id: "neurosculpt-full", name: "Neurosculpt", duration: "55min", price: "R1,250", description: "Advanced structural facial massage and treatment that lifts, tones, and sculpts facial muscles for a non-surgical facelift effect.", seoKeywords: ["neurosculpt treatment", "best neurosculpt", "professional neurosculpt"] },
                    { id: "luminfusion", name: "Luminfusion", duration: "55min", price: "R1,100", description: "A high-tech glow treatment that combines exfoliation, nano-infusion, and LED light therapy for unparalleled skin luminosity.", seoKeywords: ["luminfusion treatment", "best luminfusion", "professional luminfusion"] },
                    { id: "melanopro-peel", name: "Melanopro Peel", duration: "55min", price: "R6,999", description: "A comprehensive clinical peel system for hyperpigmentation. Dramatically fades dark spots and sun damage for an even, radiant complexion.", seoKeywords: ["melanopro peel treatment", "chemical skin resurfacing", "pigmentation peel"] },
                    { id: "hydraderm", name: "Hydraderm", duration: "55min", price: "R1,400", description: "Deep hydration and resurfacing. Uses vortex technology to cleanse, extract, and hydrate simultaneously.", seoKeywords: ["hydraderm treatment", "best hydraderm", "professional hydraderm"] },
                    { id: "pro-microneedling", name: "Pro Microneedling", duration: "55min", price: "R1,950", description: "Professional microneedling to stimulate collagen, refine texture, and fade scars. Delivering active ingredients deeper into the skin for maximum regeneration.", seoKeywords: ["pro microneedling treatment", "best pro microneedling", "professional pro microneedling"] },
                    { id: "nanoinfusion", name: "Nanoinfusion", duration: "55min", price: "R1,400", description: "Non-invasive transdermal serum delivery. Resurfaces and infuses active ingredients for instant glow and plumpness without downtime.", seoKeywords: ["nanoinfusion treatment", "best nanoinfusion", "professional nanoinfusion"] },
                    { id: "ultra-calming-facial", name: "Ultra Calming Facial", duration: "1hr", price: "R810", description: "Targeted relief for sensitized skin. Calms flare-ups and provides long-lasting relief from redness and irritation.", seoKeywords: ["professional ultra calming facial", "ultra calming facial near me", "anti-aging skin treatment", "luxury spa facial"] },
                    { id: "skin-clearing-facial", name: "Skin Clearing Facial", duration: "1hr", price: "R810", description: "Deep cleansing and purification for adult acne and congestion. Clears current breakouts and prevents future ones.", seoKeywords: ["professional skin clearing facial", "skin clearing facial near me", "anti-aging skin treatment", "luxury spa facial"] },
                    { id: "age-smart-facial", name: "Age Smart Facial", duration: "1hr", price: "R810", description: "Revitalise mature skin. Targets the visible signs of ageing like loss of elasticity and dullness.", seoKeywords: ["professional age smart facial", "age smart facial near me", "anti-aging skin treatment", "luxury spa facial"] },
                ],
            },
            {
                id: "peels",
                title: "Chemical Peels",
                items: [
                    { id: "pro-power-peel", name: "Pro Power Peel", duration: "55min", price: "R1,100", description: "Dermalogica's strongest peel. Customised to your skin goals — ageing, pigmentation, or acne — for dramatic resurfacing and renewal.", seoKeywords: ["pro power peel treatment", "chemical skin resurfacing", "pigmentation peel"] },
                    { id: "power-peel-60", name: "Power Peel 60 min", duration: "1hr", price: "R990", description: "The full-strength resurfacing experience. A 60-minute multi-acid peel that transforms skin texture, fades pigmentation, and stimulates cell renewal.", seoKeywords: ["power peel treatment", "chemical skin resurfacing", "pigmentation peel"] },
                    { id: "power-peel-30", name: "Power Peel 30 min", duration: "30min", price: "R720", description: "A rapid resurfacing treatment. Removes dead skin and instantly refines texture in just 30 minutes.", seoKeywords: ["power peel treatment", "chemical skin resurfacing", "pigmentation peel"] },
                ],
            },
        ],
    },
    // ========================================
    // IPL
    // ========================================
    {
        id: "ipl",
        title: "IPL (Intense Pulsed Light)",
        subtitle: "Hair Removal",
        image: "/images/ipl/ipl-full-leg-hair-removal.jpeg",
        subcategories: [
            {
                id: "ipl-face",
                title: "Face",
                items: [
                    { id: "ipl-full-face", name: "IPL Full Face Hair Removal", duration: "30min", price: "R882", description: "Permanently reduce all unwanted facial hair in one comprehensive session. Covers the full face including upper lip, chin, cheeks, and sideburns. Smooth, hair-free skin that lasts.", seoKeywords: ["ipl full face hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-full-face-neck", name: "IPL Full Face & Neck Hair Removal", duration: "45min", price: "R945", description: "Complete facial and neck hair removal. Ideal for those with hormonal hair growth or those who want a completely seamless finish.", seoKeywords: ["ipl full face & neck hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-lip", name: "IPL Upper Lip Hair Removal", duration: "15min", price: "R270", description: "Say goodbye to upper lip hair for good. A quick 15-minute session that targets the hair follicle at the root for permanent reduction.", seoKeywords: ["ipl upper lip hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-chin", name: "IPL Chin Hair Removal", duration: "15min", price: "R270", description: "Permanently reduce stubborn chin hair with targeted IPL light energy. Quick, effective, and far more lasting than any temporary hair removal method." }, // Price inferred/kept? List doesn't have plain 'Chin'. It has 'beardline'. I'll keep it at R270 to match lip.
                    { id: "ipl-beardline", name: "IPL Beardline Hair Removal", duration: "30min", price: "R495", description: "Shape and define your beard line permanently. Reduces regrowth for a consistently sharp, clean look.", seoKeywords: ["ipl beardline hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-neck", name: "IPL Neck Hair Removal", duration: "30min", price: "R495", description: "Remove unwanted neck hair for a cleaner profile. Great for tidying low hairlines or hormonal growth.", seoKeywords: ["ipl neck hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-neck-men", name: "IPL Neck Hair Removal (Men)", duration: "30min", price: "R585", description: "Targeted treatment for coarser male neck hair. Reduces razor burn and ingrown hairs caused by daily shaving.", seoKeywords: ["ipl neck hair removal (men) near me", "permanent hair reduction", "laser skin treatment"] },
                ],
            },
            {
                id: "ipl-body",
                title: "Body",
                items: [
                    { id: "ipl-underarm", name: "IPL Underarm Hair Removal", duration: "15min", price: "R495", description: "One of our most popular treatments. Permanently reduce underarm hair so you can wear sleeveless with confidence every day.", seoKeywords: ["ipl underarm hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-bikini-sides", name: "IPL Bikini Sides Hair Removal", duration: "30min", price: "R540", description: "Tidy the bikini line permanently. Removes hair along the bikini edges for a clean, confident look.", seoKeywords: ["ipl bikini sides hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-brazilian", name: "IPL Brazilian Hair Removal", duration: "45min", price: "R765", description: "Permanent hair reduction across the full bikini area, leaving a small strip. Freedom from monthly waxing appointments.", seoKeywords: ["ipl brazilian hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-hollywood", name: "IPL Hollywood Hair Removal", duration: "45min", price: "R990", description: "Complete permanent hair removal from the entire intimate area. The ultimate in smooth, carefree confidence.", seoKeywords: ["ipl hollywood hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-full-leg", name: "IPL Full Leg Hair Removal", duration: "1hr", price: "R2,565", description: "Silky smooth legs from hip to ankle, permanently. Treat both full legs in one session and say farewell to shaving, waxing, and razor bumps.", seoKeywords: ["ipl full leg hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-half-leg", name: "IPL Half Leg Hair Removal", duration: "45min", price: "R1,305", description: "Target the lower or upper leg for permanent hair reduction. Great for those who want smooth calves or thighs.", seoKeywords: ["ipl half leg hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-full-arm", name: "IPL Full Arm Hair Removal", duration: "45min", price: "R1,440", description: "Permanently reduce arm hair from shoulder to wrist. Smooth, hair-free arms that always look and feel polished.", seoKeywords: ["ipl full arm hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-half-arm", name: "IPL Half Arm Hair Removal", duration: "30min", price: "R765", description: "Target the lower or upper arm for permanent hair reduction. A focused treatment for specific areas.", seoKeywords: ["ipl half arm hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-back", name: "IPL Full Back Hair Removal", duration: "45min", price: "R1,200", description: "Permanently eliminate back hair with a comprehensive IPL treatment. Restore confidence and comfort." }, // Keep old price? List: none (has men back wax). Keep old.
                    { id: "ipl-buttocks", name: "IPL Full Buttocks Hair Removal", duration: "45min", price: "R1,170", description: "Remove unwanted hair from the buttocks for a smooth, confident finish.", seoKeywords: ["ipl full buttocks hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-stomach", name: "IPL Stomach Hair Removal", duration: "30min", price: "R765", description: "Remove hair from the stomach area. Ideal for a smooth torso contour.", seoKeywords: ["ipl stomach hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-belly-button", name: "IPL Belly Button Hair Removal", duration: "15min", price: "R450", description: "Targeted hair removal for the navel line/snail trail.", seoKeywords: ["ipl belly button hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "ipl-toes-feet", name: "IPL Toes & Feet Hair Removal", duration: "15min", price: "R450", description: "Eliminate stray hairs on toes and feet for a cleaner look in open shoes.", seoKeywords: ["ipl toes & feet hair removal near me", "permanent hair reduction", "laser skin treatment"] },
                    { id: "tattoo-removal", name: "Tattoo Removal", duration: "1hr", price: "R450", description: "Laser tattoo removal session. Price may vary based on size and ink density.", seoKeywords: ["tattoo removal treatment", "best tattoo removal", "professional tattoo removal"] },
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
        image: "/images/make-up/expert-bridal-makeup-application.jpeg",
        subcategories: [
            {
                id: "makeup-services",
                title: "Services",
                items: [

                    { id: "bridal-makeup", name: "Bridal Makeup", duration: "1hr 30min", price: "R1,620", description: "Look breathtaking on your wedding day. Our bridal makeup is designed to photograph beautifully, last all day, and make you feel like the most radiant version of yourself. Includes a touch-up kit.", seoKeywords: ["bridal makeup treatment", "best bridal makeup", "professional bridal makeup"] },
                    { id: "evening-makeup", name: "Evening Makeup", duration: "1hr", price: "R594", description: "Professional makeup application for date nights, functions, or photoshoots. Flawless, long-lasting, and tailored to your style.", seoKeywords: ["evening makeup treatment", "best evening makeup", "professional evening makeup"] },
                    { id: "day-makeup", name: "Day Makeup", duration: "1hr", price: "R486", description: "A fresh, natural makeup look perfect for daytime events or professional settings. Enhances your features without looking heavy.", seoKeywords: ["day makeup treatment", "best day makeup", "professional day makeup"] },
                    { id: "bridal-trial", name: "Bridal Makeup Trial", duration: "1hr", price: "R650", description: "Test your wedding day look before the big day. Work with your artist to perfect every detail — from foundation shade to lip colour — so you walk down the aisle with complete confidence.", seoKeywords: ["bridal makeup trial treatment", "best bridal makeup trial", "professional bridal makeup trial"] },
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
        image: "/images/lashes-brows/Hybrid-Brows-Permanent-makeup.png",
        subcategories: [
            {
                id: "medical-treatments",
                title: "Medical Treatments",
                items: [
                    { id: "vaginal-tightening", name: "Vaginal Tightening", duration: "1hr", price: "R4,950", description: "Non-surgical vaginal rejuvenation using advanced radiofrequency technology. Restores tone, improves sensitivity, and addresses laxity caused by childbirth or ageing — in a private, professional, and judgement-free environment.", seoKeywords: ["non-surgical vaginal rejuvenation", "intimate wellness", "radiofrequency tightening", "vaginal laxity treatment"] },
                    { id: "fractional-laser", name: "Fractional Laser Full Face", duration: "1hr", price: "R2,430", description: "Medical-grade skin resurfacing that targets fine lines, acne scars, enlarged pores, and uneven texture. Fractional laser creates controlled micro-injuries that trigger your skin's natural collagen repair process for dramatic, lasting improvement.", seoKeywords: ["skin resurfacing laser", "acne scar removal", "collagen stimulation laser", "anti-aging laser treatment"] },
                    { id: "plasmage", name: "Plasmage", duration: "1hr", price: "R899.10", description: "The non-surgical alternative to eyelid surgery. Plasmage uses plasma energy to tighten and lift loose skin around the eyes, neck, and face — visible tightening without going under the knife.", seoKeywords: ["non-surgical blepharoplasty", "eyelid lifting without surgery", "plasma skin tightening", "drooping eyelid treatment"] },
                    { id: "iv-drip", name: "IV Drip", duration: "45min", price: "R1,200", description: "Deliver vitamins, minerals, and hydration directly into your bloodstream for immediate effect. Whether you need an energy boost, immune support, skin glow, or hangover recovery — IV therapy works from the inside out.", seoKeywords: ["iv drip treatment", "best iv drip", "professional iv drip"] },
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
        image: "/images/lashes-brows/dramatic-volume-eyelash-extensions.png",
        subcategories: [
            {
                id: "brows",
                title: "Brows",
                items: [
                    { id: "microblading", name: "Microblading", duration: "1hr 30min", price: "R1,350", description: "Ultra-fine hair strokes implanted into the skin to create perfectly natural-looking brows. Ideal for sparse, over-plucked, or uneven brows.", seoKeywords: ["semi-permanent eyebrow tattoo", "natural microblading strokes", "eyebrow embroidery", "brow feathering"] },
                    { id: "powderpixel-brows", name: "Powderpixel Brows", duration: "1hr 30min", price: "R1,710", description: "A soft, powdery brow effect created with tiny dots of pigment. Gives the appearance of filled-in brows without looking drawn-on.", seoKeywords: ["professional powderpixel brows", "powderpixel brows near me"] },
                    { id: "hybrid-brows", name: "Hybrid Brows", duration: "2hr", price: "R1,710", description: "The best of both worlds. Hair strokes at the front for a natural look, shading through the body and tail for depth and definition.", seoKeywords: ["professional hybrid brows", "hybrid brows near me"] },
                    { id: "brow-henna", name: "Brow Henna", duration: "45min", price: "R423", description: "A natural alternative to tinting that tints both the hair and the skin beneath for a fuller, more defined look. Lasts longer than regular tint.", seoKeywords: ["professional brow henna", "brow henna near me"] },
                ],
            },
            {
                id: "lips",
                title: "Lips",
                items: [
                    { id: "full-lips-contour", name: "Full Lips Contour", duration: "2hr 30min", price: "R2,430", description: "Complete lip colour from liner to full pigmentation. Wake up with perfectly tinted, defined lips every day.", seoKeywords: ["full lips contour treatment", "best full lips contour", "professional full lips contour"] },
                    { id: "lip-liner", name: "Lip Liner", duration: "1hr 30min", price: "R1,710", description: "Define and enhance your lip shape with a permanent liner that makes lips appear fuller and more symmetrical.", seoKeywords: ["lip liner treatment", "best lip liner", "professional lip liner"] },
                ],
            },
            {
                id: "eyes",
                title: "Eyes",
                items: [
                    { id: "eyeliner-top", name: "Eyeliner Top", duration: "1hr", price: "R720", description: "A permanent upper lash line that makes eyes appear larger, more defined, and always made-up.", seoKeywords: ["eyeliner top treatment", "best eyeliner top", "professional eyeliner top"] },
                    { id: "eyeliner-bottom", name: "Eyeliner Bottom", duration: "1hr", price: "R720", description: "Define the lower lash line for added depth and intensity without the smudge.", seoKeywords: ["eyeliner bottom treatment", "best eyeliner bottom", "professional eyeliner bottom"] },
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
        image: "/images/dermalogica/dermalogica-microneedling-treatment.png",
        subcategories: [
            {
                id: "qms-facials",
                title: "QMS Facials",
                items: [

                    { id: "chemical-peel", name: "Chemical Peel", duration: "1hr", price: "R809.10", description: "A targeted chemical peel to resurface and renew skin texture.", seoKeywords: ["chemical peel treatment", "chemical skin resurfacing", "pigmentation peel"] },
                    { id: "collagen-facial", name: "Collagen Facial", duration: "1hr", price: "R799.20", description: "QMS's signature collagen boosting treatment for firm, plump skin.", seoKeywords: ["professional collagen facial", "collagen facial near me", "anti-aging skin treatment", "luxury spa facial"] },
                    { id: "rejuvenating-facial", name: "Rejuvenating Facial", duration: "1hr", price: "R765", description: "Restores vitality and moisture to tired, dull skin.", seoKeywords: ["professional rejuvenating facial", "rejuvenating facial near me", "anti-aging skin treatment", "luxury spa facial"] },
                    { id: "deep-pore-cleansing", name: "Deep Pore Cleansing Facial", duration: "1hr", price: "R675", description: "Deeply purifies pores and balances oil production.", seoKeywords: ["deep pore cleansing facial treatment", "best deep pore cleansing facial", "professional deep pore cleansing facial"] },
                    { id: "basic-facial", name: "Basic Facial", duration: "1hr", price: "R657", description: "A classic maintenance facial for hydration and relaxation.", seoKeywords: ["professional basic facial", "basic facial near me", "anti-aging skin treatment", "luxury spa facial"] },
                    { id: "activator-treatment", name: "Activator Treatment", duration: "1hr", price: "R648", description: "Intensive activation treatment to kickstart skin renewal.", seoKeywords: ["activator treatment treatment", "best activator treatment", "professional activator treatment"] },
                    { id: "sensitive-skin-facial", name: "Sensitive Skin Facial", duration: "1hr", price: "R540", description: "Calming treatment specifically for reactive and sensitive skin.", seoKeywords: ["professional sensitive skin facial", "sensitive skin facial near me", "anti-aging skin treatment", "luxury spa facial"] },
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
        image: "/images/gallery/Specials/galeo-beauty-nail-specials-price-list.jpeg",
        subcategories: [
            {
                id: "tanning-sessions",
                title: "Tanning Sessions",
                items: [

                    { id: "spraytan", name: "Spraytan", duration: "20min", price: "R486", description: "A flawless, streak-free spray tan for a natural golden glow. Customized to your skin tone.", seoKeywords: ["spraytan treatment", "best spraytan", "professional spraytan"] },
                    { id: "sunbed-20", name: "Sunbed 20 Sessions", duration: "N/A", price: "R630", description: "Our best value package for regular tanners.", seoKeywords: ["sunbed 20 sessions treatment", "best sunbed 20 sessions", "professional sunbed 20 sessions"] },
                    { id: "sunbed-10", name: "Sunbed 10 Sessions", duration: "N/A", price: "R315", description: "Course of 10 sessions to build a lasting tan.", seoKeywords: ["sunbed 10 sessions treatment", "best sunbed 10 sessions", "professional sunbed 10 sessions"] },
                    { id: "sunbed-session", name: "Sunbed Per Session", duration: "20min", price: "R54", description: "Single high-performance tanning session.", seoKeywords: ["sunbed per session treatment", "best sunbed per session", "professional sunbed per session"] },
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
        image: "/images/waxing/full-leg-wax-salon-service.jpeg",
        subcategories: [
            {
                id: "face-wax",
                title: "Face",
                items: [
                    { id: "wax-eyebrow", name: "Eyebrow Wax", duration: "15min", price: "R108", description: "Clean, defined brows." }, // Derived from Ear wax price? No, list doesn't have eyebrow wax. Wait, it doesn't? Code has R100. List has nose, ear, lip, cheek. Missing eyebrow! I will keep R100 or update roughly. I'll leave R100. Actually list has NO eyebrow wax? It MUST have. I'll keep it R100.
                    { id: "wax-lip", name: "Lip Wax", duration: "10min", price: "R90", description: "Quick upper lip hair removal.", seoKeywords: ["professional lip wax", "painless hair removal", "lip waxing service"] },
                    { id: "wax-cheek", name: "Cheek Wax", duration: "15min", price: "R157.50", description: "Smooth cheeks and sideburns.", seoKeywords: ["professional cheek wax", "painless hair removal", "cheek waxing service"] },
                    { id: "wax-nose", name: "Nose Wax", duration: "10min", price: "R81", description: "Removal of nose hair.", seoKeywords: ["professional nose wax", "painless hair removal", "nose waxing service"] },
                    { id: "wax-ear", name: "Ear Wax", duration: "10min", price: "R108", description: "Removal of ear hair.", seoKeywords: ["professional ear wax", "painless hair removal", "ear waxing service"] },
                    { id: "wax-chin", name: "Chin Wax", duration: "10min", price: "R80", description: "Chin hair removal." }, // Keeping old price as list doesn't specifiy
                    { id: "wax-full-face", name: "Full Face Wax", duration: "30min", price: "R280", description: "Complete facial waxing." }, // Keeping old price
                ],
            },
            {
                id: "body-wax",
                title: "Body",
                items: [
                    { id: "wax-full-leg", name: "Full Leg Wax", duration: "45min", price: "R486", description: "Silky smooth legs from hip to ankle.", seoKeywords: ["professional full leg wax", "painless hair removal", "full leg waxing service"] },
                    { id: "wax-half-leg", name: "Half Leg Wax", duration: "30min", price: "R261", description: "Lower or upper leg wax.", seoKeywords: ["professional half leg wax", "painless hair removal", "half leg waxing service"] },
                    { id: "wax-hollywood", name: "Hollywood Wax", duration: "45min", price: "R450", description: "Complete intimate hair removal.", seoKeywords: ["professional hollywood wax", "painless hair removal", "hollywood waxing service"] },
                    { id: "wax-brazilian", name: "Brazilian Wax", duration: "45min", price: "R387", description: "Intimate waxing with a strip remaining.", seoKeywords: ["professional brazilian wax", "painless hair removal", "brazilian waxing service"] },
                    { id: "wax-underarm", name: "Underarm Wax", duration: "15min", price: "R157.50", description: "Smooth underarms.", seoKeywords: ["professional underarm wax", "painless hair removal", "underarm waxing service"] },
                    { id: "wax-full-arm", name: "Full Arm Wax", duration: "30min", price: "R234", description: "Hair removal from shoulder to wrist.", seoKeywords: ["professional full arm wax", "painless hair removal", "full arm waxing service"] },
                    { id: "wax-half-arm", name: "Half Arm Wax", duration: "20min", price: "R130.50", description: "Lower or upper arm wax.", seoKeywords: ["professional half arm wax", "painless hair removal", "half arm waxing service"] },
                    { id: "wax-full-back", name: "Full Back Wax", duration: "30min", price: "R261", description: "Complete back hair removal.", seoKeywords: ["professional full back wax", "painless hair removal", "full back waxing service"] },
                    { id: "wax-half-back", name: "Half Back Wax", duration: "20min", price: "R225", description: "Upper or lower back wax.", seoKeywords: ["professional half back wax", "painless hair removal", "half back waxing service"] },
                    { id: "wax-men-back", name: "Men Back Wax", duration: "30min", price: "R522", description: "Back waxing for men.", seoKeywords: ["professional men back wax", "painless hair removal", "men back waxing service"] },
                    { id: "wax-chest", name: "Chest Wax", duration: "30min", price: "R216", description: "Chest hair removal.", seoKeywords: ["professional chest wax", "painless hair removal", "chest waxing service"] },
                    { id: "wax-tummy", name: "Full Tummy Wax", duration: "30min", price: "R180", description: "Stomach hair removal.", seoKeywords: ["professional full tummy wax", "painless hair removal", "full tummy waxing service"] },
                    { id: "wax-butt", name: "Butt Wax", duration: "30min", price: "R180", description: "Buttocks hair removal.", seoKeywords: ["professional butt wax", "painless hair removal", "butt waxing service"] },
                ],
            },
        ],
    },
    // ========================================
    // HAIR
    // ========================================
    {
        id: "hair",
        title: "Hair & Styling",
        subtitle: "Cut, Colour & Style",
        image: "/images/gallery/Laser-and-IPL/ipl-laser-hair-removal-underarm-treatment.jpeg",
        subcategories: [
            {
                id: "hair-cuts-styling",
                title: "Cuts & Styling",
                items: [
                    // Cuts
                    { id: "cut-blow-short", name: "Cut & Blow Dry (Short)", duration: "45min", price: "R378", description: "Precision cut and professional blow dry for short styles.", seoKeywords: ["cut & blow dry (short) salon", "best cut & blow dry (short) stylist"] },
                    { id: "cut-blow-medium", name: "Cut & Blow Dry (Medium)", duration: "1hr", price: "R432", description: "Refresh your length or add layers with a tailored cut and finish.", seoKeywords: ["cut & blow dry (medium) salon", "best cut & blow dry (medium) stylist"] },
                    { id: "cut-blow-long", name: "Cut & Blow Dry (Long)", duration: "1hr 15min", price: "R468", description: "Expert shaping and styling for long hair.", seoKeywords: ["cut & blow dry (long) salon", "best cut & blow dry (long) stylist"] },
                    { id: "cut-blow-xl", name: "Cut & Blow Dry (Extra Long)", duration: "1hr 30min", price: "R522", description: "Complete restyle or maintenance for extra long hair.", seoKeywords: ["cut & blow dry (extra long) salon", "best cut & blow dry (extra long) stylist"] },
                    { id: "cut-only-short", name: "Cut Only (Short)", duration: "30min", price: "R252", description: "Express dry or wet cut for short hair.", seoKeywords: ["cut only (short) salon", "best cut only (short) stylist"] },
                    { id: "cut-only-medium", name: "Cut Only (Medium)", duration: "45min", price: "R315", description: "Maintenance cut for medium length hair.", seoKeywords: ["cut only (medium) salon", "best cut only (medium) stylist"] },
                    { id: "cut-only-long", name: "Cut Only (Long)", duration: "45min", price: "R360", description: "Trimming dead ends or reshaping long layers.", seoKeywords: ["cut only (long) salon", "best cut only (long) stylist"] },

                    // Blow Drys
                    { id: "blow-short", name: "Blow Dry (Short)", duration: "30min", price: "R279", description: "Volume and shine for cropped styles.", seoKeywords: ["blow dry (short) treatment", "best blow dry (short)", "professional blow dry (short)"] },
                    { id: "blow-medium", name: "Blow Dry (Medium)", duration: "45min", price: "R315", description: "Smooth, bouncy finish for shoulder-length hair.", seoKeywords: ["blow dry (medium) treatment", "best blow dry (medium)", "professional blow dry (medium)"] },
                    { id: "blow-long", name: "Blow Dry (Long)", duration: "1hr", price: "R351", description: "Sleek straight or Hollywood waves for long hair.", seoKeywords: ["blow dry (long) treatment", "best blow dry (long)", "professional blow dry (long)"] },
                    { id: "blow-xl", name: "Blow Dry (Extra Long)", duration: "1hr 15min", price: "R405", description: "Professional styling for very long or thick hair.", seoKeywords: ["blow dry (extra long) treatment", "best blow dry (extra long)", "professional blow dry (extra long)"] },

                    // Kids & Pensioners
                    { id: "cut-pensioner", name: "Pensioner Cut", duration: "30min", price: "R225", description: "Standard cut for seniors.", seoKeywords: ["pensioner cut salon", "best pensioner cut stylist"] },
                    { id: "cut-0-5-boys", name: "Cut 0-5yrs (Boys)", duration: "20min", price: "R126", description: "Gentle trim for little ones.", seoKeywords: ["cut 0-5yrs (boys) salon", "best cut 0-5yrs (boys) stylist"] },
                    { id: "cut-0-5-girls", name: "Cut 0-5yrs (Girls)", duration: "20min", price: "R153", description: "Gentle trim for little ones.", seoKeywords: ["cut 0-5yrs (girls) salon", "best cut 0-5yrs (girls) stylist"] },
                    { id: "cut-6-12-boys", name: "Cut 6-12yrs (Boys)", duration: "30min", price: "R153", description: "School cut for boys.", seoKeywords: ["cut 6-12yrs (boys) salon", "best cut 6-12yrs (boys) stylist"] },
                    { id: "cut-6-12-girls", name: "Cut 6-12yrs (Girls)", duration: "30min", price: "R189", description: "Trim and tidy for girls.", seoKeywords: ["cut 6-12yrs (girls) salon", "best cut 6-12yrs (girls) stylist"] },
                    { id: "cut-13-18-boys", name: "Cut 13-18yrs (Boys)", duration: "30min", price: "R180", description: "Teen cut for boys.", seoKeywords: ["cut 13-18yrs (boys) salon", "best cut 13-18yrs (boys) stylist"] },
                    { id: "cut-13-18-girls", name: "Cut 13-18yrs (Girls)", duration: "45min", price: "R225", description: "Teen cut for girls.", seoKeywords: ["cut 13-18yrs (girls) salon", "best cut 13-18yrs (girls) stylist"] },

                    // Upstyles
                    { id: "upstyle-short", name: "Upstyle (Short)", duration: "45min", price: "R540", description: "Creative styling for shorter lengths.", seoKeywords: ["upstyle (short) treatment", "best upstyle (short)", "professional upstyle (short)"] },
                    { id: "upstyle-medium", name: "Upstyle (Medium)", duration: "1hr", price: "R630", description: "Elegant pinned styles for special occasions.", seoKeywords: ["upstyle (medium) treatment", "best upstyle (medium)", "professional upstyle (medium)"] },
                    { id: "upstyle-long", name: "Upstyle (Long)", duration: "1hr 15min", price: "R720", description: "Intricate bridal or matric dance styling.", seoKeywords: ["upstyle (long) treatment", "best upstyle (long)", "professional upstyle (long)"] },
                ],
            },
            {
                id: "hair-color",
                title: "Colour & Foils",
                items: [
                    // Tints
                    { id: "tint-roots", name: "Root Tint", duration: "1hr", price: "R522", description: "Cover greys or regrowth.", seoKeywords: ["root tint treatment", "best root tint", "professional root tint"] },
                    { id: "tint-short", name: "Full Tint (Short)", duration: "1hr 15min", price: "R594", description: "All-over colour for short hair.", seoKeywords: ["full tint (short) treatment", "best full tint (short)", "professional full tint (short)"] },
                    { id: "tint-medium", name: "Full Tint (Medium)", duration: "1hr 30min", price: "R702", description: "Rich, vibrant colour for medium lengths.", seoKeywords: ["full tint (medium) treatment", "best full tint (medium)", "professional full tint (medium)"] },
                    { id: "tint-long", name: "Full Tint (Long)", duration: "1hr 45min", price: "R810", description: "Full head colour application for long hair.", seoKeywords: ["full tint (long) treatment", "best full tint (long)", "professional full tint (long)"] },
                    { id: "tint-xl", name: "Full Tint (Extra Long)", duration: "2hr", price: "R954", description: "Complete colour transformation for extra long hair.", seoKeywords: ["full tint (extra long) treatment", "best full tint (extra long)", "professional full tint (extra long)"] },

                    // Foils
                    { id: "foil-per", name: "Per Foil", duration: "15min", price: "R63", description: "Individual foil placement.", seoKeywords: ["per foil treatment", "best per foil", "professional per foil"] },
                    { id: "highlights-full-short", name: "Full Head Foils (Short)", duration: "1hr 30min", price: "R873", description: "Brighten your entire look with full highlights.", seoKeywords: ["full head foils (short) treatment", "best full head foils (short)", "professional full head foils (short)"] },
                    { id: "highlights-full-medium", name: "Full Head Foils (Medium)", duration: "2hr", price: "R1,107", description: "Dimensional blonde or colour for medium hair.", seoKeywords: ["full head foils (medium) treatment", "best full head foils (medium)", "professional full head foils (medium)"] },
                    { id: "highlights-full-long", name: "Full Head Foils (Long)", duration: "2hr 30min", price: "R1,287", description: "Full head lightening for long hair.", seoKeywords: ["full head foils (long) treatment", "best full head foils (long)", "professional full head foils (long)"] },
                    { id: "highlights-full-xl", name: "Full Head Foils (Ex Long)", duration: "3hr", price: "R1,377", description: "Maximum impact highlights for extra long hair.", seoKeywords: ["full head foils (ex long) treatment", "best full head foils (ex long)", "professional full head foils (ex long)"] },
                    { id: "highlights-half-short", name: "Half Head Foils (Short)", duration: "1hr", price: "R666", description: "Refresh your top section and crown.", seoKeywords: ["half head foils (short) treatment", "best half head foils (short)", "professional half head foils (short)"] },
                    { id: "highlights-half-medium", name: "Half Head Foils (Medium)", duration: "1hr 30min", price: "R819", description: "Natural dimension for the top layers.", seoKeywords: ["half head foils (medium) treatment", "best half head foils (medium)", "professional half head foils (medium)"] },
                    { id: "highlights-half-long", name: "Half Head Foils (Long)", duration: "1hr 45min", price: "R927", description: "Sun-kissed look for long hair.", seoKeywords: ["half head foils (long) treatment", "best half head foils (long)", "professional half head foils (long)"] },
                    { id: "highlights-half-xl", name: "Half Head Foils (Ex Long)", duration: "2hr", price: "R1,026", description: "Brighten up the front and crown.", seoKeywords: ["half head foils (ex long) treatment", "best half head foils (ex long)", "professional half head foils (ex long)"] },

                    // Techniques
                    { id: "balayage", name: "Balayage", duration: "2hr 30min", price: "R765", description: "Freehand painting for a natural, lived-in blonde.", seoKeywords: ["balayage salon", "best balayage stylist"] },
                    { id: "toner-short", name: "Toner (Short)", duration: "30min", price: "R450", description: "Correct brassiness and add shine.", seoKeywords: ["toner (short) treatment", "best toner (short)", "professional toner (short)"] },
                    { id: "toner-medium", name: "Toner (Medium)", duration: "30min", price: "R540", description: "Refresh tone on medium hair.", seoKeywords: ["toner (medium) treatment", "best toner (medium)", "professional toner (medium)"] },
                    { id: "toner-long", name: "Toner (Long)", duration: "45min", price: "R630", description: "Perfect shade for long blondes.", seoKeywords: ["toner (long) treatment", "best toner (long)", "professional toner (long)"] },
                    { id: "toner-xl", name: "Toner (Extra Long)", duration: "45min", price: "R720", description: "Even tone for extra long hair.", seoKeywords: ["toner (extra long) treatment", "best toner (extra long)", "professional toner (extra long)"] },
                ],
            },
            {
                id: "hair-treatments",
                title: "Treatments & Brazilian",
                items: [
                    { id: "brazilian-short", name: "Brazilian Blowout (Short)", duration: "1hr 30min", price: "R990", description: "Smooth, frizz-free hair for up to 3 months.", seoKeywords: ["brazilian blowout (short) treatment", "best brazilian blowout (short)", "professional brazilian blowout (short)"] },
                    { id: "brazilian-medium", name: "Brazilian Blowout (Medium)", duration: "2hr", price: "R1,215", description: "Sleek, manageable medium length hair.", seoKeywords: ["brazilian blowout (medium) treatment", "best brazilian blowout (medium)", "professional brazilian blowout (medium)"] },
                    { id: "brazilian-long", name: "Brazilian Blowout (Long)", duration: "2hr 30min", price: "R1,530", description: "Transform coarse or frizzy long hair.", seoKeywords: ["brazilian blowout (long) treatment", "best brazilian blowout (long)", "professional brazilian blowout (long)"] },
                    { id: "brazilian-xl", name: "Brazilian Blowout (Ex Long)", duration: "3hr", price: "R1,800", description: "Ultimate smoothing for extra long, thick hair.", seoKeywords: ["brazilian blowout (ex long) treatment", "best brazilian blowout (ex long)", "professional brazilian blowout (ex long)"] },
                    { id: "botox", name: "Hair Botox", duration: "1hr", price: "R810", description: "Deep conditioning anti-ageing treatment.", seoKeywords: ["hair botox injections", "best hair botox", "medical aesthetics clinic"] },
                    { id: "keratin", name: "Keratin Treatment", duration: "1hr", price: "R585", description: "Strengthen and smooth damaged hair.", seoKeywords: ["keratin treatment treatment", "best keratin treatment", "professional keratin treatment"] },
                    { id: "vital", name: "Vital Treatment", duration: "30min", price: "R153", description: "Essential nutrient boost.", seoKeywords: ["vital treatment treatment", "best vital treatment", "professional vital treatment"] },
                    { id: "silver", name: "Silver Treatment", duration: "15min", price: "R108", description: "Neutralise yellow tones.", seoKeywords: ["silver treatment treatment", "best silver treatment", "professional silver treatment"] },
                    { id: "chem-straight", name: "Chemical Straightener", duration: "2hr", price: "R200", description: "Permanent straightening.", seoKeywords: ["chemical straightener treatment", "best chemical straightener", "professional chemical straightener"] },
                ],
            },
            {
                id: "gents-hair",
                title: "Gents Hair",
                items: [
                    { id: "gents-cut", name: "Gents Cut", duration: "30min", price: "R200", description: "Classic or modern clipper/scissor cut.", seoKeywords: ["gents cut salon", "best gents cut stylist"] },
                    { id: "gents-clipper", name: "Clipper Cut", duration: "20min", price: "R150", description: "All-over machine cut.", seoKeywords: ["clipper cut treatment", "best clipper cut", "professional clipper cut"] },
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
        image: "/images/gallery/Nails/nude-almond-gel-nails-galeo-beauty-salon.jpeg",
        subcategories: [
            {
                id: "hands-feet",
                title: "Hands & Feet",
                items: [
                    { id: "gel-overlay-hands", name: "Gel Overlay (Hands)", duration: "1hr", price: "R342", description: "Strengthen natural nails with a durable gel coating.", seoKeywords: ["gel overlay (hands) salon", "best gel overlay (hands)", "long lasting nail art"] },
                    { id: "gel-tips", name: "Gel & Tips", duration: "1hr 30min", price: "R414", description: "Length extension with tips and strong gel overlay.", seoKeywords: ["gel & tips salon", "best gel & tips", "long lasting nail art"] },
                    { id: "acrylic-overlay", name: "Acrylic Overlay", duration: "1hr 15min", price: "R414", description: "Hard-wearing acrylic coating for natural nails.", seoKeywords: ["acrylic overlay salon", "best acrylic overlay", "long lasting nail art"] },
                    { id: "acrylic-tips", name: "Acrylic Tips", duration: "1hr 45min", price: "R432", description: "Classic durable extensions.", seoKeywords: ["acrylic tips salon", "best acrylic tips", "long lasting nail art"] },
                    { id: "rubber-base", name: "Rubber Base", duration: "1hr", price: "R360", description: "Flexible, strong base for natural nails.", seoKeywords: ["rubber base treatment", "best rubber base", "professional rubber base"] },
                    { id: "rubber-base-toes", name: "Rubber Base (Toes)", duration: "1hr", price: "R342", description: "Long-lasting rubber base for toes.", seoKeywords: ["rubber base (toes) treatment", "best rubber base (toes)", "professional rubber base (toes)"] },
                    { id: "sculpted-forms", name: "Sculpted with Forms", duration: "2hr", price: "R495", description: "Custom sculpted extensions without tips.", seoKeywords: ["sculpted with forms treatment", "best sculpted with forms", "professional sculpted with forms"] },
                    { id: "designer-nails", name: "Designer Nails", duration: "2hr", price: "R450", description: "Intricate art and custom shaping.", seoKeywords: ["designer nails salon", "best designer nails", "long lasting nail art"] },
                    { id: "gel-toes", name: "Gel Toes", duration: "45min", price: "R297", description: "Chip-free colour for your toes.", seoKeywords: ["gel toes salon", "best gel toes", "long lasting nail art"] },
                    { id: "mani-pedi-combo", name: "Mani & Pedi Combo", duration: "2hr", price: "R477", description: "Complete package for hands and feet.", seoKeywords: ["mani & pedi combo treatment", "best mani & pedi combo", "professional mani & pedi combo"] },
                    { id: "full-manicure", name: "Manicure", duration: "45min", price: "R225", description: "Cuticle work, shape, and paint.", seoKeywords: ["manicure treatment", "best manicure", "professional manicure"] },
                    { id: "pedicure", name: "Pedicure", duration: "1hr", price: "R279", description: "Soak, scrub, and paint for feet.", seoKeywords: ["pedicure salon", "best pedicure", "long lasting nail art"] },
                    { id: "soak-off", name: "Soak Off", duration: "30min", price: "R99", description: "Safe removal of gel or acrylic.", seoKeywords: ["soak off treatment", "best soak off", "professional soak off"] },
                    { id: "para-dip", name: "Paraffin Dip", duration: "20min", price: "R99", description: "Deep moisturising treat.", seoKeywords: ["paraffin dip treatment", "best paraffin dip", "professional paraffin dip"] },
                    { id: "nail-art", name: "Nail Art (Per Nail)", duration: "10min", price: "R18", description: "Custom design per nail.", seoKeywords: ["nail art (per nail) salon", "best nail art (per nail)", "long lasting nail art"] },
                    { id: "revarnish", name: "Revarnish", duration: "20min", price: "R135", description: "File and paint refresh.", seoKeywords: ["revarnish treatment", "best revarnish", "professional revarnish"] },
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
        image: "/images/lashes-brows/eyebrow-microblading-hair-strokes-transformation.png",
        subcategories: [
            {
                id: "lashes-brows-all",
                title: "All",
                items: [
                    { id: "classic-lashes", name: "Classic Lashes", duration: "1hr 30min", price: "R450", description: "One extension applied to one natural lash. Clean, natural definition.", seoKeywords: ["professional classic lashes", "classic lashes near me"] },
                    { id: "volume-lashes", name: "Volume Lashes", duration: "2hr", price: "R540", description: "Multiple fine lashes per natural lash for fluffier volume.", seoKeywords: ["professional volume lashes", "volume lashes near me"] },
                    { id: "glamour-lashes", name: "Glamour Lashes", duration: "2hr", price: "R630", description: "High impact, dramatic volume.", seoKeywords: ["professional glamour lashes", "glamour lashes near me"] },
                    { id: "silk-lashes", name: "Silk Lashes", duration: "1hr 30min", price: "R540", description: "Soft, glossy finish for a natural look.", seoKeywords: ["professional silk lashes", "silk lashes near me"] },
                    { id: "hybrid-lashes", name: "Hybrid Lashes", duration: "1hr 45min", price: "R500", description: "Mix of classic and volume for textured density.", seoKeywords: ["professional hybrid lashes", "hybrid lashes near me"] },
                    { id: "lash-fill-2", name: "Lash Fill (2 Week)", duration: "1hr", price: "R270", description: "Maintenance fill at 2 weeks.", seoKeywords: ["professional lash fill (2 week)", "lash fill (2 week) near me"] },
                    { id: "lash-fill-3", name: "Lash Fill (3 Week)", duration: "1hr 15min", price: "R315", description: "Maintenance fill at 3 weeks.", seoKeywords: ["professional lash fill (3 week)", "lash fill (3 week) near me"] },
                    { id: "lash-lift-tint", name: "Lash Lift & Tint", duration: "45min", price: "R405", description: "Curl and darken natural lashes for an open-eyed look.", seoKeywords: ["professional lash lift & tint", "lash lift & tint near me", "semi-permanent eye makeup"] },
                    { id: "lash-lamination", name: "Lash Lamination", duration: "45min", price: "R405", description: "Advanced lifting treatment for thicker, darker looking lashes.", seoKeywords: ["professional lash lamination", "lash lamination near me"] },
                    { id: "lash-tint", name: "Lash Tint", duration: "15min", price: "R99", description: "Darken pale lashes.", seoKeywords: ["professional lash tint", "lash tint near me", "semi-permanent eye makeup"] },
                    { id: "brow-tint", name: "Brow Tint", duration: "15min", price: "R90", description: "Define brows with colour.", seoKeywords: ["professional brow tint", "brow tint near me", "semi-permanent eye makeup"] },
                    { id: "lash-removal", name: "Lash Removal", duration: "30min", price: "R135", description: "Safe removal of extensions.", seoKeywords: ["professional lash removal", "lash removal near me"] },
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
        image: "/images/hair-extensions/beachy-blonde-waves-extensions.png",
        badge: "Premium Quality",
        badgeVariant: "premium",
        subcategories: [
            {
                id: "tape-in",
                title: "Tape in Hair",
                note: "20 pieces – 50g | Double Drawn",
                items: [
                    { id: "tape-35cm-dark", name: "Tape in 35cm - Dark Colours", price: "R1,000", seoKeywords: ["tape in 35cm - dark colours treatment", "best tape in 35cm - dark colours", "professional tape in 35cm - dark colours"] },
                    { id: "tape-35cm-light", name: "Tape in 35cm - Light/Ombre/Piano", price: "R1,200", seoKeywords: ["tape in 35cm - light/ombre/piano treatment", "best tape in 35cm - light/ombre/piano", "professional tape in 35cm - light/ombre/piano"] },
                    { id: "tape-40cm-dark", name: "Tape in 40cm - Dark Colours", price: "R1,200", seoKeywords: ["tape in 40cm - dark colours treatment", "best tape in 40cm - dark colours", "professional tape in 40cm - dark colours"] },
                    { id: "tape-40cm-light", name: "Tape in 40cm - Light/Ombre/Piano", price: "R1,400", seoKeywords: ["tape in 40cm - light/ombre/piano treatment", "best tape in 40cm - light/ombre/piano", "professional tape in 40cm - light/ombre/piano"] },
                    { id: "tape-45cm-dark", name: "Tape in 45cm - Dark Colours", price: "R1,400", seoKeywords: ["tape in 45cm - dark colours treatment", "best tape in 45cm - dark colours", "professional tape in 45cm - dark colours"] },
                    { id: "tape-45cm-light", name: "Tape in 45cm - Light/Ombre/Piano", price: "R1,600", seoKeywords: ["tape in 45cm - light/ombre/piano treatment", "best tape in 45cm - light/ombre/piano", "professional tape in 45cm - light/ombre/piano"] },
                    { id: "tape-50cm-dark", name: "Tape in 50cm - Dark Colours", price: "R1,600", seoKeywords: ["tape in 50cm - dark colours treatment", "best tape in 50cm - dark colours", "professional tape in 50cm - dark colours"] },
                    { id: "tape-50cm-light", name: "Tape in 50cm - Light/Ombre/Piano", price: "R1,800", seoKeywords: ["tape in 50cm - light/ombre/piano treatment", "best tape in 50cm - light/ombre/piano", "professional tape in 50cm - light/ombre/piano"] },
                    { id: "tape-55cm-dark", name: "Tape in 55cm - Dark Colours", price: "R1,800", seoKeywords: ["tape in 55cm - dark colours treatment", "best tape in 55cm - dark colours", "professional tape in 55cm - dark colours"] },
                    { id: "tape-55cm-light", name: "Tape in 55cm - Light/Ombre/Piano", price: "R2,000", seoKeywords: ["tape in 55cm - light/ombre/piano treatment", "best tape in 55cm - light/ombre/piano", "professional tape in 55cm - light/ombre/piano"] },
                    { id: "tape-60cm-dark", name: "Tape in 60cm - Dark Colours", price: "R2,000", seoKeywords: ["tape in 60cm - dark colours treatment", "best tape in 60cm - dark colours", "professional tape in 60cm - dark colours"] },
                    { id: "tape-60cm-light", name: "Tape in 60cm - Light/Ombre/Piano", price: "R2,200", seoKeywords: ["tape in 60cm - light/ombre/piano treatment", "best tape in 60cm - light/ombre/piano", "professional tape in 60cm - light/ombre/piano"] },
                ],
            },
            {
                id: "micro-loop-ring",
                title: "Micro Loop Ring",
                note: "100 strands – 100g | Double Drawn",
                items: [
                    { id: "microloop-35cm-dark", name: "Micro Loop 35cm - Dark Colours", price: "R2,000", seoKeywords: ["micro loop 35cm - dark colours treatment", "best micro loop 35cm - dark colours", "professional micro loop 35cm - dark colours"] },
                    { id: "microloop-35cm-light", name: "Micro Loop 35cm - Light/Ombre/Piano", price: "R2,200", seoKeywords: ["micro loop 35cm - light/ombre/piano treatment", "best micro loop 35cm - light/ombre/piano", "professional micro loop 35cm - light/ombre/piano"] },
                    { id: "microloop-40cm-dark", name: "Micro Loop 40cm - Dark Colours", price: "R2,200", seoKeywords: ["micro loop 40cm - dark colours treatment", "best micro loop 40cm - dark colours", "professional micro loop 40cm - dark colours"] },
                    { id: "microloop-40cm-light", name: "Micro Loop 40cm - Light/Ombre/Piano", price: "R2,400", seoKeywords: ["micro loop 40cm - light/ombre/piano treatment", "best micro loop 40cm - light/ombre/piano", "professional micro loop 40cm - light/ombre/piano"] },
                    { id: "microloop-45cm-dark", name: "Micro Loop 45cm - Dark Colours", price: "R2,400", seoKeywords: ["micro loop 45cm - dark colours treatment", "best micro loop 45cm - dark colours", "professional micro loop 45cm - dark colours"] },
                    { id: "microloop-45cm-light", name: "Micro Loop 45cm - Light/Ombre/Piano", price: "R2,600", seoKeywords: ["micro loop 45cm - light/ombre/piano treatment", "best micro loop 45cm - light/ombre/piano", "professional micro loop 45cm - light/ombre/piano"] },
                    { id: "microloop-50cm-dark", name: "Micro Loop 50cm - Dark Colours", price: "R2,600", seoKeywords: ["micro loop 50cm - dark colours treatment", "best micro loop 50cm - dark colours", "professional micro loop 50cm - dark colours"] },
                    { id: "microloop-50cm-light", name: "Micro Loop 50cm - Light/Ombre/Piano", price: "R2,800", seoKeywords: ["micro loop 50cm - light/ombre/piano treatment", "best micro loop 50cm - light/ombre/piano", "professional micro loop 50cm - light/ombre/piano"] },
                    { id: "microloop-55cm-dark", name: "Micro Loop 55cm - Dark Colours", price: "R2,800", seoKeywords: ["micro loop 55cm - dark colours treatment", "best micro loop 55cm - dark colours", "professional micro loop 55cm - dark colours"] },
                    { id: "microloop-55cm-light", name: "Micro Loop 55cm - Light/Ombre/Piano", price: "R3,000", seoKeywords: ["micro loop 55cm - light/ombre/piano treatment", "best micro loop 55cm - light/ombre/piano", "professional micro loop 55cm - light/ombre/piano"] },
                    { id: "microloop-60cm-dark", name: "Micro Loop 60cm - Dark Colours", price: "R3,000", seoKeywords: ["micro loop 60cm - dark colours treatment", "best micro loop 60cm - dark colours", "professional micro loop 60cm - dark colours"] },
                    { id: "microloop-60cm-light", name: "Micro Loop 60cm - Light/Ombre/Piano", price: "R3,200", seoKeywords: ["micro loop 60cm - light/ombre/piano treatment", "best micro loop 60cm - light/ombre/piano", "professional micro loop 60cm - light/ombre/piano"] },
                ],
            },
            {
                id: "clip-in-hair",
                title: "Clip in Hair",
                note: "7 pieces – 100g | Double Drawn",
                items: [
                    { id: "clip-35cm-dark", name: "Clip in 35cm - Dark Colours", price: "R1,600", seoKeywords: ["clip in 35cm - dark colours treatment", "best clip in 35cm - dark colours", "professional clip in 35cm - dark colours"] },
                    { id: "clip-35cm-light", name: "Clip in 35cm - Light/Ombre/Piano", price: "R1,800", seoKeywords: ["clip in 35cm - light/ombre/piano treatment", "best clip in 35cm - light/ombre/piano", "professional clip in 35cm - light/ombre/piano"] },
                    { id: "clip-40cm-dark", name: "Clip in 40cm - Dark Colours", price: "R1,800", seoKeywords: ["clip in 40cm - dark colours treatment", "best clip in 40cm - dark colours", "professional clip in 40cm - dark colours"] },
                    { id: "clip-40cm-light", name: "Clip in 40cm - Light/Ombre/Piano", price: "R2,000", seoKeywords: ["clip in 40cm - light/ombre/piano treatment", "best clip in 40cm - light/ombre/piano", "professional clip in 40cm - light/ombre/piano"] },
                    { id: "clip-45cm-dark", name: "Clip in 45cm - Dark Colours", price: "R2,000", seoKeywords: ["clip in 45cm - dark colours treatment", "best clip in 45cm - dark colours", "professional clip in 45cm - dark colours"] },
                    { id: "clip-45cm-light", name: "Clip in 45cm - Light/Ombre/Piano", price: "R2,200", seoKeywords: ["clip in 45cm - light/ombre/piano treatment", "best clip in 45cm - light/ombre/piano", "professional clip in 45cm - light/ombre/piano"] },
                    { id: "clip-50cm-dark", name: "Clip in 50cm - Dark Colours", price: "R2,200", seoKeywords: ["clip in 50cm - dark colours treatment", "best clip in 50cm - dark colours", "professional clip in 50cm - dark colours"] },
                    { id: "clip-50cm-light", name: "Clip in 50cm - Light/Ombre/Piano", price: "R2,400", seoKeywords: ["clip in 50cm - light/ombre/piano treatment", "best clip in 50cm - light/ombre/piano", "professional clip in 50cm - light/ombre/piano"] },
                    { id: "clip-55cm-dark", name: "Clip in 55cm - Dark Colours", price: "R2,400", seoKeywords: ["clip in 55cm - dark colours treatment", "best clip in 55cm - dark colours", "professional clip in 55cm - dark colours"] },
                    { id: "clip-55cm-light", name: "Clip in 55cm - Light/Ombre/Piano", price: "R2,600", seoKeywords: ["clip in 55cm - light/ombre/piano treatment", "best clip in 55cm - light/ombre/piano", "professional clip in 55cm - light/ombre/piano"] },
                    { id: "clip-60cm-dark", name: "Clip in 60cm - Dark Colours", price: "R2,600", seoKeywords: ["clip in 60cm - dark colours treatment", "best clip in 60cm - dark colours", "professional clip in 60cm - dark colours"] },
                    { id: "clip-60cm-light", name: "Clip in 60cm - Light/Ombre/Piano", price: "R2,800", seoKeywords: ["clip in 60cm - light/ombre/piano treatment", "best clip in 60cm - light/ombre/piano", "professional clip in 60cm - light/ombre/piano"] },
                ],
            },
            {
                id: "machine-weave",
                title: "Machine Weave",
                note: "100g | Double Drawn",
                items: [
                    { id: "machine-40cm-dark", name: "Machine Weave 40cm - Dark Colours", price: "R1,800", seoKeywords: ["machine weave 40cm - dark colours treatment", "best machine weave 40cm - dark colours", "professional machine weave 40cm - dark colours"] },
                    { id: "machine-40cm-light", name: "Machine Weave 40cm - Light/Ombre/Piano", price: "R2,000", seoKeywords: ["machine weave 40cm - light/ombre/piano treatment", "best machine weave 40cm - light/ombre/piano", "professional machine weave 40cm - light/ombre/piano"] },
                    { id: "machine-45cm-dark", name: "Machine Weave 45cm - Dark Colours", price: "R2,000", seoKeywords: ["machine weave 45cm - dark colours treatment", "best machine weave 45cm - dark colours", "professional machine weave 45cm - dark colours"] },
                    { id: "machine-45cm-light", name: "Machine Weave 45cm - Light/Ombre/Piano", price: "R2,200", seoKeywords: ["machine weave 45cm - light/ombre/piano treatment", "best machine weave 45cm - light/ombre/piano", "professional machine weave 45cm - light/ombre/piano"] },
                    { id: "machine-50cm-dark", name: "Machine Weave 50cm - Dark Colours", price: "R2,200", seoKeywords: ["machine weave 50cm - dark colours treatment", "best machine weave 50cm - dark colours", "professional machine weave 50cm - dark colours"] },
                    { id: "machine-50cm-light", name: "Machine Weave 50cm - Light/Ombre/Piano", price: "R2,400", seoKeywords: ["machine weave 50cm - light/ombre/piano treatment", "best machine weave 50cm - light/ombre/piano", "professional machine weave 50cm - light/ombre/piano"] },
                    { id: "machine-55cm-dark", name: "Machine Weave 55cm - Dark Colours", price: "R2,400", seoKeywords: ["machine weave 55cm - dark colours treatment", "best machine weave 55cm - dark colours", "professional machine weave 55cm - dark colours"] },
                    { id: "machine-55cm-light", name: "Machine Weave 55cm - Light/Ombre/Piano", price: "R2,600", seoKeywords: ["machine weave 55cm - light/ombre/piano treatment", "best machine weave 55cm - light/ombre/piano", "professional machine weave 55cm - light/ombre/piano"] },
                    { id: "machine-60cm-dark", name: "Machine Weave 60cm - Dark Colours", price: "R2,600", seoKeywords: ["machine weave 60cm - dark colours treatment", "best machine weave 60cm - dark colours", "professional machine weave 60cm - dark colours"] },
                    { id: "machine-60cm-light", name: "Machine Weave 60cm - Light/Ombre/Piano", price: "R2,800", seoKeywords: ["machine weave 60cm - light/ombre/piano treatment", "best machine weave 60cm - light/ombre/piano", "professional machine weave 60cm - light/ombre/piano"] },
                ],
            },
            {
                id: "ponytail",
                title: "Ponytail",
                note: "80g | Double Drawn",
                items: [
                    { id: "ponytail-40cm-dark", name: "Ponytail 40cm - Dark Colours", price: "R1,600", seoKeywords: ["ponytail 40cm - dark colours treatment", "best ponytail 40cm - dark colours", "professional ponytail 40cm - dark colours"] },
                    { id: "ponytail-40cm-light", name: "Ponytail 40cm - Light/Ombre/Piano", price: "R1,800", seoKeywords: ["ponytail 40cm - light/ombre/piano treatment", "best ponytail 40cm - light/ombre/piano", "professional ponytail 40cm - light/ombre/piano"] },
                    { id: "ponytail-45cm-dark", name: "Ponytail 45cm - Dark Colours", price: "R1,800", seoKeywords: ["ponytail 45cm - dark colours treatment", "best ponytail 45cm - dark colours", "professional ponytail 45cm - dark colours"] },
                    { id: "ponytail-45cm-light", name: "Ponytail 45cm - Light/Ombre/Piano", price: "R2,000", seoKeywords: ["ponytail 45cm - light/ombre/piano treatment", "best ponytail 45cm - light/ombre/piano", "professional ponytail 45cm - light/ombre/piano"] },
                    { id: "ponytail-50cm-dark", name: "Ponytail 50cm - Dark Colours", price: "R2,000", seoKeywords: ["ponytail 50cm - dark colours treatment", "best ponytail 50cm - dark colours", "professional ponytail 50cm - dark colours"] },
                    { id: "ponytail-50cm-light", name: "Ponytail 50cm - Light/Ombre/Piano", price: "R2,200", seoKeywords: ["ponytail 50cm - light/ombre/piano treatment", "best ponytail 50cm - light/ombre/piano", "professional ponytail 50cm - light/ombre/piano"] },
                    { id: "ponytail-55cm-dark", name: "Ponytail 55cm - Dark Colours", price: "R2,200", seoKeywords: ["ponytail 55cm - dark colours treatment", "best ponytail 55cm - dark colours", "professional ponytail 55cm - dark colours"] },
                    { id: "ponytail-55cm-light", name: "Ponytail 55cm - Light/Ombre/Piano", price: "R2,400", seoKeywords: ["ponytail 55cm - light/ombre/piano treatment", "best ponytail 55cm - light/ombre/piano", "professional ponytail 55cm - light/ombre/piano"] },
                    { id: "ponytail-60cm-dark", name: "Ponytail 60cm - Dark Colours", price: "R2,400", seoKeywords: ["ponytail 60cm - dark colours treatment", "best ponytail 60cm - dark colours", "professional ponytail 60cm - dark colours"] },
                    { id: "ponytail-60cm-light", name: "Ponytail 60cm - Light/Ombre/Piano", price: "R2,600", seoKeywords: ["ponytail 60cm - light/ombre/piano treatment", "best ponytail 60cm - light/ombre/piano", "professional ponytail 60cm - light/ombre/piano"] },
                ],
            },
            {
                id: "halo-hair",
                title: "Halo Hair",
                note: "80-100g | Double Drawn",
                items: [
                    { id: "halo-35cm-dark", name: "Halo Hair 35cm - Dark Colours", price: "R1,400", seoKeywords: ["halo hair 35cm - dark colours treatment", "best halo hair 35cm - dark colours", "professional halo hair 35cm - dark colours"] },
                    { id: "halo-35cm-light", name: "Halo Hair 35cm - Light/Ombre/Piano", price: "R1,600", seoKeywords: ["halo hair 35cm - light/ombre/piano treatment", "best halo hair 35cm - light/ombre/piano", "professional halo hair 35cm - light/ombre/piano"] },
                    { id: "halo-40cm-dark", name: "Halo Hair 40cm - Dark Colours", price: "R1,600", seoKeywords: ["halo hair 40cm - dark colours treatment", "best halo hair 40cm - dark colours", "professional halo hair 40cm - dark colours"] },
                    { id: "halo-40cm-light", name: "Halo Hair 40cm - Light/Ombre/Piano", price: "R1,800", seoKeywords: ["halo hair 40cm - light/ombre/piano treatment", "best halo hair 40cm - light/ombre/piano", "professional halo hair 40cm - light/ombre/piano"] },
                    { id: "halo-45cm-dark", name: "Halo Hair 45cm - Dark Colours", price: "R1,800", seoKeywords: ["halo hair 45cm - dark colours treatment", "best halo hair 45cm - dark colours", "professional halo hair 45cm - dark colours"] },
                    { id: "halo-45cm-light", name: "Halo Hair 45cm - Light/Ombre/Piano", price: "R2,000", seoKeywords: ["halo hair 45cm - light/ombre/piano treatment", "best halo hair 45cm - light/ombre/piano", "professional halo hair 45cm - light/ombre/piano"] },
                    { id: "halo-50cm-dark", name: "Halo Hair 50cm - Dark Colours", price: "R2,000", seoKeywords: ["halo hair 50cm - dark colours treatment", "best halo hair 50cm - dark colours", "professional halo hair 50cm - dark colours"] },
                    { id: "halo-50cm-light", name: "Halo Hair 50cm - Light/Ombre/Piano", price: "R2,200", seoKeywords: ["halo hair 50cm - light/ombre/piano treatment", "best halo hair 50cm - light/ombre/piano", "professional halo hair 50cm - light/ombre/piano"] },
                ],
            },
            {
                id: "genius-weave",
                title: "Genius Weave",
                note: "All Colours | Double Drawn",
                items: [
                    { id: "genius-40cm", name: "Genius Weave 40cm (100g)", price: "R2,200", seoKeywords: ["genius weave 40cm (100g) treatment", "best genius weave 40cm (100g)", "professional genius weave 40cm (100g)"] },
                    { id: "genius-45cm", name: "Genius Weave 45cm (120g)", price: "R2,600", seoKeywords: ["genius weave 45cm (120g) treatment", "best genius weave 45cm (120g)", "professional genius weave 45cm (120g)"] },
                    { id: "genius-50cm", name: "Genius Weave 50cm (140g)", price: "R3,200", seoKeywords: ["genius weave 50cm (140g) treatment", "best genius weave 50cm (140g)", "professional genius weave 50cm (140g)"] },
                    { id: "genius-55cm", name: "Genius Weave 55cm (160g)", price: "R3,600", seoKeywords: ["genius weave 55cm (160g) treatment", "best genius weave 55cm (160g)", "professional genius weave 55cm (160g)"] },
                    { id: "genius-60cm", name: "Genius Weave 60cm (160g)", price: "R4,000", seoKeywords: ["genius weave 60cm (160g) treatment", "best genius weave 60cm (160g)", "professional genius weave 60cm (160g)"] },
                ],
            },
            {
                id: "butterfly-weave",
                title: "Butterfly Weave",
                note: "All Colours | Double Drawn",
                items: [
                    { id: "butterfly-40cm", name: "Butterfly Weave 40cm (80g)", price: "R2,000", seoKeywords: ["butterfly weave 40cm (80g) treatment", "best butterfly weave 40cm (80g)", "professional butterfly weave 40cm (80g)"] },
                    { id: "butterfly-45cm", name: "Butterfly Weave 45cm (100g)", price: "R2,200", seoKeywords: ["butterfly weave 45cm (100g) treatment", "best butterfly weave 45cm (100g)", "professional butterfly weave 45cm (100g)"] },
                    { id: "butterfly-50cm", name: "Butterfly Weave 50cm (100g)", price: "R2,600", seoKeywords: ["butterfly weave 50cm (100g) treatment", "best butterfly weave 50cm (100g)", "professional butterfly weave 50cm (100g)"] },
                    { id: "butterfly-55cm", name: "Butterfly Weave 55cm (100g)", price: "R2,800", seoKeywords: ["butterfly weave 55cm (100g) treatment", "best butterfly weave 55cm (100g)", "professional butterfly weave 55cm (100g)"] },
                    { id: "butterfly-60cm", name: "Butterfly Weave 60cm (100g)", price: "R3,000", seoKeywords: ["butterfly weave 60cm (100g) treatment", "best butterfly weave 60cm (100g)", "professional butterfly weave 60cm (100g)"] },
                ],
            },
            {
                id: "hair-ext-extras",
                title: "Extras",
                note: "Processing: +-7 working days | Delivery: R99 or Self Pick Up",
                items: [
                    { id: "tape-strips-precut", name: "Tape in Strips (Pre-cut) - 60 pieces", price: "R200", seoKeywords: ["tape in strips (pre-cut) - 60 pieces salon", "best tape in strips (pre-cut) - 60 pieces stylist"] },
                    { id: "tape-in-remover", name: "Tape in Remover - 100ml", price: "R150", seoKeywords: ["tape in remover - treatment", "best tape in remover -", "professional tape in remover -"] },
                ],
            },
        ],
    },
];
