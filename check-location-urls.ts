import fs from 'fs';

async function checkUrls() {
    const locations = ["hartbeespoort", "harties"];

    // Read services-content.ts
    const content = fs.readFileSync('./src/lib/services-content.ts', 'utf8');

    // Quick regex to extract id: "..."
    const regex = /id:\s*"([^"]+)"/g;
    const currentSlugs = new Set<string>();
    let match;
    while ((match = regex.exec(content)) !== null) {
        currentSlugs.add(match[1]);
    }

    // Stale slugs from next.config.ts
    const staleSlugs = [
        // Lashes
        "lash-lift", "volume-lashes-2-week-fill", "volume-lashes-3-week-fill",
        "classic-lashes-2-week-fill", "classic-lashes-3-week-fill", "hybrid-lashes-2-week-fill",
        "hybrid-lashes-3-week-fill", "silky-soft-master-lashes", "volume-lashes", "classic-lashes",
        "lash-tint", "brow-tint",

        // Pro Skin
        "pro-skin-30", "pro-skin-60", "pro-bright", "pro-firm", "pro-clear", "pro-calm", "eye-peel",

        // QMS
        "chemical-peel", "activator-treatment", "deep-pore-cleansing", "rejuvenating-facial", "collagen-facial", "sensitive-skin-facial",
        "qms-facial", "pro-skin", "basic-facial",

        // Nails
        "gel-overlay", "gel-toes", "gel-tips", "acrylic-overlay", "acrylic-tips",

        // Fat freezing
        "cryolipolysis", "fat-freezing-session", "fat-freezing-2-cups", "fat-freezing-4-cups",

        // Hair
        "botox-short", "botox-medium", "botox-long", "brazilian-blow-short", "brazilian-blow-long",
        "brazilian-blow-extra-long", "short-upstyle", "medium-upstyle", "long-upstyle",
        "medium-blow", "long-blow", "extra-long-blow",

        // Waxing
        "wax-lip", "wax-eyebrow", "wax-chin", "wax-full-face", "wax-underarm", "wax-full-arm",
        "wax-half-arm", "wax-half-leg", "wax-full-leg", "wax-hollywood", "wax-brazilian",
        "full-leg-wax", "half-leg-wax", "full-arm-wax", "underarm-wax", "hollywood-wax", "brazilian-wax",
        "lip-wax", "brow-wax", "chin-wax", "full-face-wax",

        // IPL
        "brazillian-ipl", "hollywood-ipl", "full-face-ipl", "full-face-neck-ipl", "under-arm-ipl",
        "belly-button-ipl", "stomach-ipl", "toes-feet-ipl", "full-buttocks-ipl", "bikini-sides-ipl",
        "half-leg-ipl", "full-leg-ipl", "half-arm-ipl", "full-arm-ipl", "beardline-ipl", "neck-ipl", "neck-ipl-men",

        // Massages
        "swedish-massage-60", "aromatherapy-60", "hot-stone-60", "deep-tissue-60", "sports-massage-60", "back-neck-30", "back-neck-45",
    ];

    const slugsToCheck = Array.from(new Set([...Array.from(currentSlugs), ...staleSlugs]));

    console.log(`Checking URLs for ${slugsToCheck.length} slugs across ${locations.length} locations...`);

    let valid = 0;
    let redirects = 0;
    let missing = 0;
    const missingUrls = [];

    for (const location of locations) {
        for (const slug of slugsToCheck) {
            const url = `http://localhost:3000/locations/${location}/${slug}`;
            try {
                const res = await fetch(url, { redirect: 'manual' });
                if (res.status === 200) {
                    valid++;
                } else if (res.status === 308 || res.status === 301) {
                    redirects++;
                } else if (res.status === 404) {
                    missing++;
                    missingUrls.push(url);
                    console.log(`❌ 404: ${url}`);
                } else {
                    console.log(`⚠️ ${res.status}: ${url}`);
                }
            } catch (err) {
                console.error(`Fetch failed for ${url}:`, err);
            }
        }
    }

    console.log("\\n--- SUMMARY ---");
    console.log(`Total checked : ${slugsToCheck.length * locations.length}`);
    console.log(`✅ 200 OK      : ${valid}`);
    console.log(`↪️  308 Redirect: ${redirects}`);
    console.log(`❌ 404 Missing : ${missing}`);

    if (missing > 0) {
        console.log("\\nFailed URLs (First 10):");
        missingUrls.slice(0, 10).forEach(u => console.log(u));
    }
}

checkUrls();
