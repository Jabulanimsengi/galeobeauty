import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { getAllIntentPages } from "../src/lib/intent-pages";

const CONTENT_DIR = path.join(process.cwd(), "src/content/intent-pages");

// Ensure directory exists
if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

function migrate() {
    const pages = getAllIntentPages();
    let migratedCount = 0;

    for (const page of pages) {
        // Extract sections for the markdown body
        const { sections, ...frontmatterData } = page;

        // Convert the frontmatter object to a YAML string
        const yamlFrontmatter = yaml.dump(frontmatterData, {
            indent: 2,
            lineWidth: -1, // Don't wrap lines in YAML, prevents breaking long strings
            noRefs: true,
        });

        // Convert the sections array to raw markdown text
        let markdownBody = "";
        for (const section of sections) {
            markdownBody += `## ${section.title}\n\n${section.body}\n\n`;
        }

        // Combine YAML and Markdown
        const mdxContent = `---\n${yamlFrontmatter}---\n\n${markdownBody}`;

        // Write to file
        const filePath = path.join(CONTENT_DIR, `${page.slug}.mdx`);
        fs.writeFileSync(filePath, mdxContent, "utf-8");
        migratedCount++;
    }

    console.log(`Successfully migrated ${migratedCount} intent pages to MDX files inside ${CONTENT_DIR}`);
}

migrate();
