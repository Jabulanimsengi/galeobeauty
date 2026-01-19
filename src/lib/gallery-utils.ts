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

// Categories to cycle through for auto-generated items
const categories = [
    "Treatments",
    "Ambiance",
    "Skin",
    "Nails",
    "Hair",
    "Results",
    "Makeup",
    "Lashes",
    "Brows",
    "Team",
    "Medical",
    "Waxing",
    "Products",
];

// Titles to cycle through for auto-generated items
const titles = [
    "Beauty Treatment",
    "Spa Experience",
    "Skincare",
    "Nail Art",
    "Hair Styling",
    "Treatment Room",
    "Facial Treatment",
    "Glowing Results",
    "Makeup Artistry",
    "Happy Client",
    "Wellness",
    "Our Space",
    "Premium Products",
    "Lash Extensions",
    "Brow Perfection",
    "Our Team",
    "Relaxation",
    "Aesthetics",
    "Transformation",
    "Smooth Skin",
    "Pamper Session",
    "Attention to Detail",
    "The Experience",
];

// Aspects to cycle through
const aspects: ("portrait" | "landscape" | "square")[] = [
    "portrait",
    "landscape",
    "square",
];

/**
 * Reads the gallery folder and returns all valid image files.
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

    // Sort files naturally (so "1" comes before "10")
    imageFiles.sort((a, b) => {
        const numA = extractNumber(a);
        const numB = extractNumber(b);
        if (numA !== null && numB !== null) {
            return numA - numB;
        }
        return a.localeCompare(b);
    });

    // Generate gallery items from files
    const galleryItems: GalleryItem[] = imageFiles.map((file, index) => {
        const id = String(index + 1);
        const src = `/images/gallery/${file}`;

        return {
            id,
            src,
            alt: `Galeo Beauty - ${titles[index % titles.length]}`,
            title: titles[index % titles.length],
            category: categories[index % categories.length],
            aspect: aspects[index % aspects.length],
        };
    });

    return galleryItems;
}

/**
 * Extract number from filename for natural sorting
 * e.g., "Gallery_image_01 (12).jpeg" -> 12
 */
function extractNumber(filename: string): number | null {
    // Try to match number in parentheses first (e.g., "(12)")
    const parenMatch = filename.match(/\((\d+)\)/);
    if (parenMatch) {
        return parseInt(parenMatch[1], 10);
    }

    // Try to match trailing number (e.g., "image_12.jpg")
    const trailingMatch = filename.match(/(\d+)\.[^.]+$/);
    if (trailingMatch) {
        return parseInt(trailingMatch[1], 10);
    }

    return null;
}
