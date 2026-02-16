import { ServiceItem } from './services-data';

/**
 * Generates a rich SEO description for a service item if one doesn't exist.
 * Uses the item's name, price, and category context to build unique content.
 */
export function generateServiceDescription(
    item: ServiceItem,
    categoryTitle: string,
    subcategoryTitle: string
): string {
    // If the item already has a description, use it
    if (item.description && item.description.length > 10) {
        return item.description;
    }

    // Parse attributes from the name (common in hair extensions)
    const nameLower = item.name.toLowerCase();

    // -- HAIR EXTENSIONS LOGIC --
    if (categoryTitle.includes("Hair Extensions") || subcategoryTitle.includes("Hair Extensions")) {
        const lengthMatch = nameLower.match(/(\d+)cm/);
        const length = lengthMatch ? lengthMatch[1] + "cm" : "";

        let type = "extensions";
        if (nameLower.includes("tape")) type = "tape-in extensions";
        if (nameLower.includes("utip") || nameLower.includes("u-tip")) type = "keratin U-tip bonds";
        if (nameLower.includes("micro") || nameLower.includes("loop")) type = "micro loop extensions";
        if (nameLower.includes("clip")) type = "clip-in sets";
        if (nameLower.includes("weft") || nameLower.includes("weave")) type = "machine weft bundle";
        if (nameLower.includes("halo")) type = "halo hair piece";
        if (nameLower.includes("ponytail")) type = "wrap-around ponytail";

        let color = "";
        if (nameLower.includes("dark")) color = "dark shades (black to medium brown)";
        if (nameLower.includes("light")) color = "light shades (blondes to light brown)";
        if (nameLower.includes("piano") || nameLower.includes("ombre")) color = "highlighted options (piano/ombre)";

        const weight = nameLower.includes("100g") ? "100g" : "";

        return `Transform your look instantly with our premium **${item.name}**. These high-quality **${type}** are perfect for adding luxurious volume and length${length ? ` (${length})` : ""}. Made from **Double Drawn European Remy Human Hair**, they ensure a natural blend${color ? ` tailored for **${color}**` : ""}. Whether you want everyday glamour or a special occasion boost, these extensions provide a seamless, comfortable fit. Price: ${item.price}.`;
    }

    // -- SPECIFIC CATEGORY LOGIC --

    // Nails
    if (categoryTitle.includes("Nail") || subcategoryTitle.includes("Nail") || subcategoryTitle.includes("Manicure") || subcategoryTitle.includes("Pedicure")) {
        return `Treat your hands and feet to our professional **${item.name}**. Using top-tier products like ${nameLower.includes('gel') ? 'Bio Sculpture and rubber base' : 'premium polish'}, our technicians ensure long-lasting results and pristine cuticle care. Whether you need a durability boost or a pampering session, this treatment delivers the perfect finish. Price: ${item.price}.`;
    }

    // Skincare / Facials
    if (categoryTitle.includes("Skin") || categoryTitle.includes("Facial") || subcategoryTitle.includes("Peel")) {
        return `Rejuvenate your skin with our specialized **${item.name}**. Designed to target specific skin concerns, this professional treatment uses clinical-grade formulations to hydrate, brighten, and restore your complexion. Ideal for maintaining healthy skin or addressing problem areas in a relaxing spa environment. Price: ${item.price}.`;
    }

    // Lashes / Brows
    if (categoryTitle.includes("Lash") || categoryTitle.includes("Brow") || subcategoryTitle.includes("Tint")) {
        return `Enhance your natural features with our expert **${item.name}**. We focus on precision and symmetry to frame your face perfectly. Using gentle, high-quality products, we ensure a comfortable experience and stunning, long-lasting definition that simplifies your daily beauty routine. Price: ${item.price}.`;
    }

    // Massage / Body
    if (categoryTitle.includes("Massage") || categoryTitle.includes("Body")) {
        return `Unwind with our therapeutic **${item.name}**. This session is tailored to relieve tension, improve circulation, and promote deep relaxation. Let our skilled therapists melt away stress in our tranquil Hartbeespoort sanctuary. Price: ${item.price}.`;
    }

    // Waxing
    if (categoryTitle.includes("Wax") || subcategoryTitle.includes("Wax")) {
        return `Experience smooth, silky skin with our professional **${item.name}**. We use high-quality waxes suitable for sensitive skin to ensure effective hair removal with minimal discomfort. Perfect for long-lasting smoothness. Price: ${item.price}.`;
    }

    // -- GENERIC FALLBACK --
    return `Experience the best **${item.name}** in Hartbeespoort at Galeo Beauty. Part of our professional **${subcategoryTitle}** range, this treatment is designed to enhance your beauty and confidence. Book your appointment today for just ${item.price}.`;
}

/**
 * Generates a list of benefits based on the category
 */
export function generateServiceBenefits(categoryTitle: string, subcategoryTitle: string): string[] {
    const cat = categoryTitle.toLowerCase();
    const sub = subcategoryTitle.toLowerCase();

    if (cat.includes("hair extensions")) {
        return [
            "100% European Remy Human Hair",
            "Double Drawn for thick ends",
            "Cuticle aligned to prevent tangling",
            "Can be styled with heat tools",
            "Long-lasting with proper care",
            "Professional color match available"
        ];
    }

    if (cat.includes("nails")) {
        return [
            "Professional products",
            "Hygienic sterile tools",
            "Long-lasting wear",
            "Expert technicians",
            "Wide color selection"
        ];
    }

    if (cat.includes("lashes") || cat.includes("brows")) {
        return [
            "Customized to your face shape",
            "Premium lightweight materials",
            "No damage to natural lashes",
            "Waterproof and durable",
            "Wake up ready to go"
        ];
    }

    return [
        "Professional certified service",
        "Premium quality products",
        "Relaxing environment",
        "Satisfaction guaranteed",
        "Personalized consultation"
    ];
}
