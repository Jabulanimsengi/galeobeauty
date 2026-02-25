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

// Function to format titles with proper capitalization and spaces
function formatTitle(filename: string): string {
    const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif|gif)$/i, '');
    return nameWithoutExt
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

export function getGalleryImages(): GalleryItem[] {
    const galleryDir = path.join(process.cwd(), "public/images/gallery");
    const items: GalleryItem[] = [];
    let idCounter = 1;

    try {
        if (!fs.existsSync(galleryDir)) {
            return [];
        }

        const categories = fs.readdirSync(galleryDir, { withFileTypes: true });

        for (const category of categories) {
            if (category.isDirectory() && !category.name.startsWith(".") && category.name !== "uncategorized") {
                const categoryPath = path.join(galleryDir, category.name);
                const files = fs.readdirSync(categoryPath, { withFileTypes: true });

                for (const file of files) {
                    if (file.isFile() && /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file.name)) {
                        const title = formatTitle(file.name);

                        let formattedCategory = category.name
                            .split('-')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join(' ');

                        if (category.name === "lashes-brows") {
                            formattedCategory = "Lash Extensions & Brow Styling";
                        } else if (category.name === "laser-ipl") {
                            formattedCategory = "IPL Hair Removal";
                        }

                        items.push({
                            id: String(idCounter++),
                            src: `/images/gallery/${category.name}/${file.name}`,
                            alt: `Galeo Beauty - ${title} in Hartbeespoort`,
                            title: title,
                            category: formattedCategory,
                            // We default to portrait for gallery masonry. Real aspect ratios could be calculated via an image library if needed.
                            aspect: "portrait",
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error reading gallery images:", error);
    }

    return items;
}
