import fs from "node:fs";
import path from "node:path";

function readFile(relativePath) {
    return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function extractMapBlock(source, exportName) {
    const pattern = new RegExp(
        `export const ${exportName}: Record<string, string> = \\{([\\s\\S]*?)\\n\\};`
    );
    const match = source.match(pattern);

    if (!match) {
        throw new Error(`Could not find export block for ${exportName}`);
    }

    return match[1];
}

function extractStringMapEntries(block) {
    const entries = [];
    const pairPattern = /"([^"]+)": "([^"]+)"/g;
    let match = pairPattern.exec(block);

    while (match) {
        entries.push([match[1], match[2]]);
        match = pairPattern.exec(block);
    }

    return entries;
}

function extractCurrentServiceIds(source) {
    const ids = new Set();
    const idPattern = /id:\s*"([^"]+)"/g;
    let match = idPattern.exec(source);

    while (match) {
        ids.add(match[1]);
        match = idPattern.exec(source);
    }

    return ids;
}

function extractLocationCount(source) {
    const locationPattern = /\{\s*slug:\s*"[^"]+",\s*name:\s*"[^"]+",\s*region:\s*"[^"]+"\s*\}/g;
    return (source.match(locationPattern) || []).length;
}

function main() {
    const redirectConfigSource = readFile("src/lib/redirect-config.ts");
    const servicesContentSource = readFile("src/lib/services-content.ts");
    const seoDataSource = readFile("src/lib/seo-data.ts");

    const staleCategoryEntries = extractStringMapEntries(
        extractMapBlock(redirectConfigSource, "STALE_CATEGORY_MAP")
    );
    const staleRemapEntries = new Map(
        extractStringMapEntries(extractMapBlock(redirectConfigSource, "STALE_SLUG_REMAPS"))
    );

    const currentServiceIds = extractCurrentServiceIds(servicesContentSource);
    const locationCount = extractLocationCount(seoDataSource);

    const overlaps = staleCategoryEntries
        .filter(([slug]) => currentServiceIds.has(slug))
        .map(([slug, staleCategoryId]) => {
            const remapTarget = staleRemapEntries.get(slug) ?? null;

            return {
                slug,
                staleCategoryId,
                remapTarget,
                createsSelfRedirectLoop: !remapTarget || remapTarget === slug,
            };
        })
        .sort((a, b) => a.slug.localeCompare(b.slug));

    const selfRedirectLocationLoops = overlaps.filter((item) => item.createsSelfRedirectLoop);

    console.log(JSON.stringify({
        totalCurrentServices: currentServiceIds.size,
        totalLocations: locationCount,
        staleSlugEntries: staleCategoryEntries.length,
        overlappingCurrentSlugs: overlaps.length,
        estimatedBrokenLocationUrls: overlaps.length * locationCount,
        selfRedirectLocationLoops: selfRedirectLocationLoops.length,
        estimatedSelfRedirectLocationUrls: selfRedirectLocationLoops.length * locationCount,
        overlaps,
    }, null, 2));
}

main();
