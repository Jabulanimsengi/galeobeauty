import fs from "fs";
import path from "path";

export interface GalleryItem {
    id: string;
    src: string;
    alt: string;
    title: string;
    category: string;
    aspect: "portrait" | "landscape" | "square";
}

/**
 * SEO-optimized metadata for each gallery image.
 * Keys are exact filenames (without extension matching).
 * Alt text, titles, and categories are specific to each image for Google Image SEO.
 */
const imageMetadata: Record<string, { alt: string; title: string; category: string; aspect: "portrait" | "landscape" | "square" }> = {
    "hybrid-brows-permanent-makeup-results-galeo-beauty": {
        alt: "Hybrid brows permanent makeup results at Galeo Beauty Hartbeespoort",
        title: "Hybrid Brows Results",
        category: "Permanent Makeup",
        aspect: "square",
    },
    "microblading-brow-mapping-lash-extensions-closeup": {
        alt: "Microblading brow mapping with lash extensions closeup at Galeo Beauty",
        title: "Brow Mapping & Lash Extensions",
        category: "Permanent Makeup",
        aspect: "portrait",
    },
    "permanent-eyeliner-healed-results-galeo-beauty": {
        alt: "Permanent eyeliner healed results by Dandi Meyer at Galeo Beauty",
        title: "Permanent Eyeliner Results",
        category: "Permanent Makeup",
        aspect: "square",
    },
    "powder-brows-natural-results-hartbeespoort": {
        alt: "Powder brows natural results at Galeo Beauty salon Hartbeespoort",
        title: "Powder Brows Natural Look",
        category: "Permanent Makeup",
        aspect: "square",
    },
    "phibrows-microblading-technique-closeup": {
        alt: "Phibrows microblading technique closeup showing hair stroke detail",
        title: "Phibrows Microblading",
        category: "Permanent Makeup",
        aspect: "square",
    },
    "lip-blush-tattoo-before-after-healed-results": {
        alt: "Lip blush tattoo before and after healed results at Galeo Beauty",
        title: "Lip Blush Before & After",
        category: "Permanent Makeup",
        aspect: "square",
    },
    "permanent-eyeliner-healed-blue-eyes-galeo": {
        alt: "Permanent eyeliner healed results with premium pigments at Galeo Beauty",
        title: "Permanent Eyeliner Healed",
        category: "Permanent Makeup",
        aspect: "square",
    },
    "nano-lip-colour-before-after-galeo-beauty": {
        alt: "Nano lip colour before and after treatment at Galeo Beauty Hartbeespoort",
        title: "Nano Lip Colour Transformation",
        category: "Permanent Makeup",
        aspect: "square",
    },
    "powder-brows-mapping-client-treatment-session": {
        alt: "Powder brows mapping on client during treatment session at Galeo Beauty",
        title: "Powder Brows Treatment Session",
        category: "Permanent Makeup",
        aspect: "portrait",
    },
    "permanent-eyeliner-quality-pigments-closeup": {
        alt: "Permanent eyeliner with quality pigments closeup at Galeo Beauty",
        title: "Quality Eyeliner Pigments",
        category: "Permanent Makeup",
        aspect: "square",
    },
    "nude-almond-gel-nails-galeo-beauty-salon": {
        alt: "Nude almond shaped gel nails done at Galeo Beauty salon Hartbeespoort",
        title: "Nude Almond Gel Nails",
        category: "Nails",
        aspect: "portrait",
    },
    "galeo-beauty-nail-specials-price-list": {
        alt: "Galeo Beauty nail and beauty specials price list Hartbeespoort",
        title: "Nail & Beauty Specials",
        category: "Specials",
        aspect: "square",
    },
    "dandi-meyer-performing-powder-brows-treatment": {
        alt: "Dandi Meyer performing powder brows treatment at Galeo Beauty salon",
        title: "Dandi Meyer at Work",
        category: "Permanent Makeup",
        aspect: "portrait",
    },
    "french-tip-gel-nails-salon-treatment": {
        alt: "French tip gel nails salon treatment at Galeo Beauty Hartbeespoort",
        title: "French Tip Gel Nails",
        category: "Nails",
        aspect: "portrait",
    },
    "french-gel-nails-with-nail-art-detail": {
        alt: "Lip blush permanent makeup before and after at Galeo Beauty salon",
        title: "Lip Blush Customized Look",
        category: "Permanent Makeup",
        aspect: "portrait",
    },
    "lip-blush-before-after-customized-look": {
        alt: "Lip blush before and after showing customized look at Galeo Beauty",
        title: "Customized Lip Blush",
        category: "Permanent Makeup",
        aspect: "square",
    },
    "french-tip-square-gel-nails-galeo": {
        alt: "French tip square gel nails at Galeo Beauty salon Hartbeespoort",
        title: "French Square Gel Nails",
        category: "Nails",
        aspect: "portrait",
    },
    "brunette-curls-hair-styling-blowout-results": {
        alt: "Brunette curls hair styling and blowout results at Galeo Beauty",
        title: "Curls & Blowout Styling",
        category: "Hair",
        aspect: "portrait",
    },
    "french-tip-gel-nails-curing-uv-lamp": {
        alt: "French tip gel nails being cured under UV lamp at Galeo Beauty",
        title: "Gel Nails UV Curing",
        category: "Nails",
        aspect: "portrait",
    },
    "permanent-makeup-microblading-booking-promo": {
        alt: "Permanent makeup microblading booking promo at Galeo Beauty Hartbeespoort",
        title: "Book Your Microblading",
        category: "Permanent Makeup",
        aspect: "portrait",
    },
    "ipl-laser-hair-removal-treatment-dandi-meyer": {
        alt: "IPL laser hair removal treatment performed by Dandi Meyer at Galeo Beauty",
        title: "IPL Laser Treatment",
        category: "Laser & IPL",
        aspect: "portrait",
    },
    "volume-lash-extensions-dramatic-closeup": {
        alt: "Volume lash extensions dramatic closeup at Galeo Beauty Hartbeespoort",
        title: "Volume Lash Extensions",
        category: "Lashes",
        aspect: "square",
    },
    "classic-lash-extensions-natural-green-eyes": {
        alt: "Classic lash extensions natural look with green eyes at Galeo Beauty",
        title: "Classic Lash Extensions",
        category: "Lashes",
        aspect: "landscape",
    },
    "galeo-beauty-salon-stylist-hair-wash-station": {
        alt: "Galeo Beauty salon stylist at hair wash station in Hartbeespoort",
        title: "Salon Hair Wash Station",
        category: "Salon",
        aspect: "portrait",
    },
    "hair-stylist-updo-treatment-galeo-salon-interior": {
        alt: "Hair stylist performing updo treatment inside Galeo Beauty salon",
        title: "Hair Styling & Updos",
        category: "Hair",
        aspect: "portrait",
    },
    "blowdry-styling-session-two-stylists-salon": {
        alt: "Blowdry styling session with two stylists at Galeo Beauty salon",
        title: "Professional Blowdry Session",
        category: "Hair",
        aspect: "portrait",
    },
    "facial-treatment-room-steamer-dermalogica-products": {
        alt: "Facial treatment room with steamer and Dermalogica products at Galeo Beauty",
        title: "Facial Treatment Room",
        category: "Facials",
        aspect: "portrait",
    },
    "professional-skin-facial-treatment-in-progress": {
        alt: "Professional skin facial treatment in progress at Galeo Beauty Hartbeespoort",
        title: "Professional Facial Treatment",
        category: "Facials",
        aspect: "square",
    },
    "ipl-laser-hair-removal-underarm-treatment": {
        alt: "IPL laser hair removal underarm treatment at Galeo Beauty salon",
        title: "Underarm Laser Hair Removal",
        category: "Laser & IPL",
        aspect: "portrait",
    },
    "fat-freezing-red-light-body-contouring-treatment": {
        alt: "Fat freezing with red light body contouring treatment at Galeo Beauty",
        title: "Fat Freezing Body Contouring",
        category: "Body Contouring",
        aspect: "portrait",
    },
    "fat-freezing-cryolipolysis-abdomen-treatment": {
        alt: "Fat freezing cryolipolysis abdomen treatment at Galeo Beauty Hartbeespoort",
        title: "Cryolipolysis Abdomen Treatment",
        category: "Body Contouring",
        aspect: "portrait",
    },
    "ipl-laser-hair-removal-legs-purple-light": {
        alt: "IPL laser hair removal on legs with purple light at Galeo Beauty",
        title: "Leg Laser Hair Removal",
        category: "Laser & IPL",
        aspect: "portrait",
    },
    "emsculpt-body-sculpting-treatment-areas-guide": {
        alt: "Emsculpt body sculpting treatment areas guide showing thighs abdomen buttock arms",
        title: "Emsculpt Treatment Areas",
        category: "Body Contouring",
        aspect: "portrait",
    },
    "emsculpt-neo-abdomen-body-contouring-device": {
        alt: "Emsculpt Neo abdomen body contouring device at Galeo Beauty Hartbeespoort",
        title: "Emsculpt Neo Device",
        category: "Body Contouring",
        aspect: "square",
    },
    "laser-hair-removal-legs-benefits-infographic": {
        alt: "Laser hair removal legs benefits including smooth skin and reduced ingrown hairs",
        title: "Laser Hair Removal Benefits",
        category: "Laser & IPL",
        aspect: "square",
    },
};

/**
 * Extracts the base filename without extension for metadata lookup.
 * Handles double extensions like .png.jpeg
 */
function getBaseFilename(filename: string): string {
    // Remove all extensions (handles .png.jpeg, .jpeg, .png etc.)
    let base = filename;
    while (path.extname(base)) {
        base = base.slice(0, -path.extname(base).length);
    }
    return base;
}

/**
 * Reads the gallery folder and returns all valid image files with SEO-optimized metadata.
 * This function runs at build time (server-side only).
 */
export function getGalleryImages(): GalleryItem[] {
    const galleryPath = path.join(process.cwd(), "public", "images", "gallery");

    // Check if directory exists
    if (!fs.existsSync(galleryPath)) {
        console.warn("Gallery directory not found:", galleryPath);
        return [];
    }

    // Read all files in the gallery directory
    const files = fs.readdirSync(galleryPath);

    // Filter for image files only
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const imageFiles = files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
    });

    // Sort alphabetically for consistent ordering
    imageFiles.sort((a, b) => a.localeCompare(b));

    // Generate gallery items from files with SEO metadata
    const galleryItems: GalleryItem[] = imageFiles.map((file, index) => {
        const id = String(index + 1);
        const src = `/images/gallery/${file}`;
        const baseName = getBaseFilename(file);

        // Look up specific metadata, or generate from filename
        const meta = imageMetadata[baseName];

        if (meta) {
            return {
                id,
                src,
                alt: meta.alt,
                title: meta.title,
                category: meta.category,
                aspect: meta.aspect,
            };
        }

        // Fallback: derive from filename (for any new images added later)
        const readableTitle = baseName
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

        return {
            id,
            src,
            alt: `Galeo Beauty - ${readableTitle}`,
            title: readableTitle,
            category: "Treatments",
            aspect: "portrait",
        };
    });

    return galleryItems;
}
