import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface CategoryFaq {
    question: string;
    answer: string;
}

export interface CategoryPageSpec {
    categoryId: string;
    title: string;
    description: string;
    h1: string;
    definition: string;
    whoIsItFor: string;
    faqs?: CategoryFaq[];
    content: string; // The markdown content (Aftercare)
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/categories");
let _allCategoryPages: CategoryPageSpec[] | null = null;

export function getAllCategoryPages(): CategoryPageSpec[] {
    if (!_allCategoryPages) {
        if (!fs.existsSync(CONTENT_DIR)) {
            return [];
        }

        const files = fs.readdirSync(CONTENT_DIR);
        _allCategoryPages = files
            .filter((file) => file.endsWith(".mdx"))
            .map((file) => {
                const rawContent = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
                const { data, content } = matter(rawContent);

                return {
                    ...(data as Omit<CategoryPageSpec, "content">),
                    content,
                };
            });
    }

    return _allCategoryPages;
}

export function getCategoryPageBySlug(categoryId: string): CategoryPageSpec | undefined {
    try {
        const filePath = path.join(CONTENT_DIR, `${categoryId}.mdx`);
        const rawContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(rawContent);

        return {
            ...(data as Omit<CategoryPageSpec, "content">),
            content,
        };
    } catch {
        return undefined; // Returns undefined if the file doesn't exist
    }
}
