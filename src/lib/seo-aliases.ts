interface SeoAliasCluster {
    match: string[];
    aliases: string[];
}

const CATEGORY_ALIAS_CLUSTERS: Record<string, SeoAliasCluster[]> = {
    "hart-aesthetics": [
        {
            match: ["tox", "botox", "anti wrinkle", "wrinkle relaxer", "frown line", "crows feet"],
            aliases: [
                "anti wrinkle injections",
                "wrinkle relaxers",
                "wrinkle smoothing injections",
                "botulinum toxin treatment",
                "forehead line treatment",
                "frown line treatment",
                "crows feet treatment",
            ],
        },
        {
            match: ["lip filler", "russian lips", "lip augmentation", "lip enhancement", "lip flip"],
            aliases: [
                "lip filler",
                "lip augmentation",
                "lip enhancement",
                "natural lip filler",
                "subtle lip volume",
                "lip contouring",
                "lip volumising",
            ],
        },
        {
            match: ["dermal filler", "cheek filler", "jawline filler", "tear trough", "under eye filler", "marionette"],
            aliases: [
                "dermal fillers",
                "facial volumising",
                "facial contouring",
                "cheek enhancement",
                "jawline contouring",
                "under eye rejuvenation",
                "tear trough filler",
            ],
        },
        {
            match: ["skin booster", "skin boosters", "profhilo", "biostimulator", "collagen biostimulator"],
            aliases: [
                "skin boosters",
                "injectable skin hydration",
                "collagen biostimulator treatment",
                "skin quality injectables",
                "collagen stimulating injectables",
            ],
        },
        {
            match: ["liquid face lift", "liquid facelift", "face lift", "facelift", "nefertiti"],
            aliases: [
                "non surgical facelift",
                "full face rejuvenation",
                "facial rejuvenation injectables",
                "liquid facelift",
                "lift without surgery",
            ],
        },
    ],
    "fat-freezing": [
        {
            match: ["fat freezing", "cryolipolysis", "coolsculpting", "cool sculpting"],
            aliases: [
                "fat freezing",
                "cryolipolysis",
                "coolsculpting alternative",
                "fat cooling treatment",
                "non surgical fat reduction",
                "stubborn fat freezing",
            ],
        },
        {
            match: ["belly", "tummy", "stomach", "love handles", "muffin top"],
            aliases: [
                "stubborn belly fat treatment",
                "tummy contouring",
                "belly contouring",
                "love handles reduction",
                "muffin top treatment",
                "waistline slimming",
            ],
        },
        {
            match: ["double chin", "under chin"],
            aliases: [
                "double chin reduction",
                "chin contouring",
                "chin fat reduction",
                "under chin fat treatment",
            ],
        },
        {
            match: ["body contouring", "body sculpting", "inch loss", "slimming"],
            aliases: [
                "body contouring",
                "body sculpting",
                "inch loss treatment",
                "non surgical lipo alternative",
                "shape refinement treatment",
            ],
        },
    ],
    slimming: [
        {
            match: ["lemon bottle", "fat dissolving", "fat dissolving injection", "slimming injection", "slimming injections"],
            aliases: [
                "lemon bottle fat dissolving",
                "fat dissolving injections",
                "slimming injections",
                "localized fat dissolving",
                "stubborn fat injections",
                "injection fat reduction",
            ],
        },
        {
            match: ["double chin", "chin fat", "under chin"],
            aliases: [
                "double chin injections",
                "double chin fat dissolving",
                "under chin fat reduction",
                "chin contouring injections",
            ],
        },
        {
            match: ["arm", "belly", "tummy", "abdomen", "stomach", "waist"],
            aliases: [
                "arm fat reduction",
                "belly fat dissolving",
                "tummy contouring injections",
                "waistline slimming",
                "stubborn area slimming treatment",
            ],
        },
        {
            match: ["body sculpting", "body shaping", "inch loss", "contouring"],
            aliases: [
                "body sculpting treatment",
                "inch loss treatment",
                "body shaping treatment",
                "non surgical contouring",
                "slimmer silhouette treatment",
            ],
        },
    ],
    massages: [
        {
            match: ["swedish massage", "relaxation massage", "stress relief massage"],
            aliases: [
                "swedish massage",
                "relaxation massage",
                "stress relief massage",
                "full body relaxation massage",
                "calming massage therapy",
            ],
        },
        {
            match: ["deep tissue", "sports massage", "muscle tension", "knot removal"],
            aliases: [
                "deep tissue massage",
                "sports massage",
                "muscle recovery massage",
                "knot release massage",
                "therapeutic massage",
            ],
        },
        {
            match: ["hot stone", "aromatherapy"],
            aliases: [
                "hot stone massage",
                "aromatherapy massage",
                "warming tension relief massage",
                "essential oil massage",
            ],
        },
        {
            match: ["back and neck", "back neck", "neck and shoulder", "shoulder tension"],
            aliases: [
                "back and neck massage",
                "neck and shoulder massage",
                "upper back tension massage",
                "targeted tension relief massage",
            ],
        },
    ],
    dermalogica: [
        {
            match: ["acne", "breakout", "blackhead", "clogged pore", "oily skin", "congested"],
            aliases: [
                "acne treatment",
                "acne facial",
                "breakout facial",
                "congested skin treatment",
                "blackhead removal facial",
                "oily skin treatment",
            ],
        },
        {
            match: ["peel", "resurfacing", "exfoliation"],
            aliases: [
                "chemical peel",
                "skin resurfacing treatment",
                "corrective peel",
                "resurfacing facial",
                "professional peel",
            ],
        },
        {
            match: ["microneedling", "micro needling", "collagen induction"],
            aliases: [
                "microneedling",
                "collagen induction therapy",
                "skin needling",
                "texture refining treatment",
            ],
        },
        {
            match: ["pigmentation", "brightening", "dull skin", "glow", "uneven tone"],
            aliases: [
                "pigmentation treatment facial",
                "brightening facial",
                "glow facial",
                "skin tone correcting treatment",
                "radiance facial",
            ],
        },
        {
            match: ["hydrating", "dehydrated", "barrier", "sensitive skin", "soothing"],
            aliases: [
                "hydrating facial",
                "skin barrier facial",
                "soothing facial",
                "moisture boost facial",
            ],
        },
    ],
    ipl: [
        {
            match: ["ipl", "hair removal", "hair reduction", "laser hair", "permanent hair"],
            aliases: [
                "ipl hair removal",
                "permanent hair reduction",
                "laser hair removal alternative",
                "long term hair reduction",
                "photoepilation treatment",
            ],
        },
        {
            match: ["facial hair", "underarm", "bikini", "legs", "chin hair"],
            aliases: [
                "facial hair removal",
                "underarm hair reduction",
                "bikini hair removal",
                "leg hair reduction",
                "body hair removal",
            ],
        },
        {
            match: ["ingrown", "razor bump", "shaving rash", "bumps"],
            aliases: [
                "ingrown hair treatment",
                "shaving rash treatment",
                "razor bump reduction",
                "bikini bump treatment",
            ],
        },
        {
            match: ["tattoo", "ink removal", "fade ink"],
            aliases: [
                "tattoo removal",
                "laser tattoo removal alternative",
                "unwanted ink fading",
                "tattoo fading treatment",
            ],
        },
    ],
    makeup: [
        {
            match: ["bridal makeup", "bridal trial", "wedding makeup"],
            aliases: [
                "bridal makeup",
                "wedding day makeup",
                "bridal makeup trial",
                "natural bridal makeup",
                "waterproof bridal makeup",
                "long lasting bridal makeup",
            ],
        },
        {
            match: ["evening makeup", "event makeup", "occasion makeup", "special occasion"],
            aliases: [
                "event makeup",
                "special occasion makeup",
                "evening makeup",
                "occasion glam makeup",
                "photo ready event makeup",
            ],
        },
        {
            match: ["day makeup", "soft glam", "natural glam", "photoshoot makeup"],
            aliases: [
                "day makeup",
                "soft glam makeup",
                "natural glam makeup",
                "camera ready makeup",
                "photoshoot makeup",
            ],
        },
        {
            match: ["makeup artist", "mua", "professional makeup"],
            aliases: [
                "professional makeup artist",
                "makeup artist",
                "long wear makeup",
                "flash photography makeup",
                "makeup that lasts all day",
            ],
        },
    ],
    medical: [
        {
            match: ["fractional laser", "laser resurfacing", "resurfacing", "acne scar"],
            aliases: [
                "fractional laser treatment",
                "laser skin resurfacing",
                "acne scar laser treatment",
                "skin resurfacing treatment",
                "texture correction treatment",
                "collagen remodeling treatment",
            ],
        },
        {
            match: ["plasmage", "plasma", "eyelid", "non surgical eyelid lift", "fibroblast"],
            aliases: [
                "plasmage treatment",
                "non surgical eyelid lift",
                "plasma skin tightening",
                "fibroblast skin tightening",
                "blepharoplasty alternative",
            ],
        },
        {
            match: ["vaginal tightening", "vaginal rejuvenation", "intimate rejuvenation"],
            aliases: [
                "vaginal tightening",
                "vaginal rejuvenation",
                "intimate tightening treatment",
                "non surgical feminine rejuvenation",
            ],
        },
        {
            match: ["iv drip", "vitamin drip", "hydration drip", "iv therapy"],
            aliases: [
                "iv drip therapy",
                "vitamin drip",
                "hydration iv therapy",
                "wellness drip treatment",
                "skin glow drip",
            ],
        },
    ],
    "permanent-makeup": [
        {
            match: ["microblading", "hair stroke", "hair strokes", "semi permanent brows"],
            aliases: [
                "microblading",
                "hair stroke brows",
                "semi permanent brows",
                "natural looking permanent brows",
                "sparse brow correction",
            ],
        },
        {
            match: ["powderpixel brows", "powder brows", "ombre brows", "hybrid brows"],
            aliases: [
                "powder brows",
                "ombre brows",
                "hybrid brows",
                "soft shaded brows",
                "defined permanent brows",
            ],
        },
        {
            match: ["full lips contour", "lip liner", "lip blush", "lip tattoo"],
            aliases: [
                "lip blush tattoo",
                "lip liner tattoo",
                "full lip colour tattoo",
                "permanent lip tint",
                "defined lip contour treatment",
            ],
        },
        {
            match: ["eyeliner top", "eyeliner bottom", "eyeliner tattoo", "lash line"],
            aliases: [
                "eyeliner tattoo",
                "permanent eyeliner",
                "lash line enhancement",
                "smudge proof eyeliner",
                "waterproof eyeliner tattoo",
            ],
        },
        {
            match: ["brow henna"],
            aliases: [
                "brow henna",
                "long lasting brow tint",
                "defined brow stain",
            ],
        },
    ],
    qms: [
        {
            match: ["collagen facial", "anti aging facial", "rejuvenating facial", "firming facial"],
            aliases: [
                "collagen facial",
                "anti aging facial",
                "rejuvenating facial",
                "firming facial",
                "mature skin facial",
                "collagen boosting facial",
            ],
        },
        {
            match: ["hydrating facial", "basic facial", "dehydrated", "sensitive skin facial"],
            aliases: [
                "hydrating facial",
                "dehydrated skin facial",
                "sensitive skin facial",
                "comforting moisture facial",
                "plumping hydration treatment",
            ],
        },
        {
            match: ["deep pore cleansing", "chemical peel", "activator treatment"],
            aliases: [
                "medical grade facial",
                "deep pore cleansing facial",
                "qms chemical peel",
                "skin renewal facial",
                "corrective luxury facial",
            ],
        },
        {
            match: ["qms facial", "qms", "luxury facial"],
            aliases: [
                "qms facial",
                "luxury corrective facial",
                "premium anti aging facial",
                "healthy glow facial",
            ],
        },
    ],
    sunbed: [
        {
            match: ["spraytan", "spray tan", "spray tanning"],
            aliases: [
                "spray tan",
                "spray tanning",
                "natural looking spray tan",
                "streak free tan",
                "golden glow spray tan",
            ],
        },
        {
            match: ["sunbed", "tanning bed", "tanning booth", "uv tanning"],
            aliases: [
                "sunbed tanning",
                "tanning bed session",
                "uv tanning session",
                "bronzing session",
                "indoor tanning session",
            ],
        },
        {
            match: ["bridal tan", "event tan", "holiday tan", "pre holiday"],
            aliases: [
                "bridal tan",
                "event spray tan",
                "pre holiday tan",
                "occasion tanning treatment",
            ],
        },
        {
            match: ["glow", "bronzed", "tan"],
            aliases: [
                "sun kissed glow",
                "bronzed skin treatment",
                "camera ready tan",
                "golden glow treatment",
            ],
        },
    ],
    waxing: [
        {
            match: ["brazilian wax", "hollywood wax", "intimate waxing", "bikini wax"],
            aliases: [
                "brazilian wax",
                "hollywood wax",
                "intimate waxing",
                "bikini waxing",
                "female intimate wax",
            ],
        },
        {
            match: ["full leg wax", "half leg wax", "underarm wax", "arm wax", "body waxing"],
            aliases: [
                "body waxing",
                "full leg wax",
                "half leg wax",
                "underarm wax",
                "arm waxing",
                "smooth skin waxing",
            ],
        },
        {
            match: ["eyebrow wax", "lip wax", "chin wax", "full face wax", "facial waxing", "cheek wax"],
            aliases: [
                "facial waxing",
                "eyebrow wax",
                "lip wax",
                "chin wax",
                "full face wax",
                "face hair waxing",
            ],
        },
        {
            match: ["men back wax", "back wax", "chest wax", "mens waxing"],
            aliases: [
                "mens waxing",
                "back waxing",
                "chest wax",
                "male body waxing",
                "grooming wax treatment",
            ],
        },
    ],
    hair: [
        {
            match: ["hair salon", "hairdresser", "hair cut", "cut and blow", "ladies cut"],
            aliases: [
                "hair salon",
                "hairdresser",
                "ladies hair salon",
                "hair styling salon",
                "professional hair services",
            ],
        },
        {
            match: ["colour", "color", "balayage", "foils", "toner", "blonde", "root tint", "root touch"],
            aliases: [
                "hair colour",
                "balayage",
                "blonding service",
                "foil highlights",
                "toner appointment",
                "grey coverage",
            ],
        },
        {
            match: ["blow dry", "blow wave", "styling", "upstyle", "curls"],
            aliases: [
                "blow dry",
                "hair styling",
                "event hair styling",
                "smooth salon blowout",
                "occasion hair styling",
            ],
        },
        {
            match: ["keratin", "brazilian", "smooth", "frizz"],
            aliases: [
                "keratin treatment",
                "brazilian blow wave",
                "smoothing treatment",
                "frizz control treatment",
                "hair smoothing service",
            ],
        },
        {
            match: ["repair", "damaged hair", "deep treatment", "mask"],
            aliases: [
                "damaged hair treatment",
                "hair repair treatment",
                "restorative hair treatment",
                "deep conditioning treatment",
            ],
        },
    ],
    nails: [
        {
            match: ["gel nails", "gel manicure", "gel overlay"],
            aliases: [
                "gel nails",
                "gel manicure",
                "gel overlay",
                "long lasting manicure",
                "gloss manicure",
            ],
        },
        {
            match: ["acrylic", "full set", "acrylic overlay"],
            aliases: [
                "acrylic nails",
                "acrylic full set",
                "acrylic overlay",
                "acrylic nail extensions",
            ],
        },
        {
            match: ["biab", "builder gel", "rubber base", "builder overlay", "structured manicure"],
            aliases: [
                "builder gel nails",
                "biab nails",
                "structured manicure",
                "natural nail strengthening",
            ],
        },
        {
            match: ["manicure", "pedicure", "spa mani", "spa pedi"],
            aliases: [
                "manicure",
                "pedicure",
                "spa manicure",
                "spa pedicure",
                "nail maintenance",
            ],
        },
        {
            match: ["nail art", "french tip", "french manicure"],
            aliases: [
                "nail art",
                "designer nails",
                "custom nail set",
                "occasion nails",
            ],
        },
    ],
    "lashes-brows": [
        {
            match: ["lash extensions", "eyelash extensions", "classic lashes", "hybrid lashes", "volume lashes", "wispy lashes"],
            aliases: [
                "lash extensions",
                "eyelash extensions",
                "classic lashes",
                "hybrid lashes",
                "volume lashes",
                "wispy lashes",
            ],
        },
        {
            match: ["lash lift", "lift and tint", "lash tint"],
            aliases: [
                "lash lift and tint",
                "natural lash lift",
                "lifted lashes treatment",
                "curl and tint lashes",
            ],
        },
        {
            match: ["brow lamination", "lamination"],
            aliases: [
                "brow lamination",
                "fluffy brow treatment",
                "lifted brow styling",
                "brow setting treatment",
            ],
        },
        {
            match: ["brow tint", "brow shape", "eyebrow tint", "brow wax"],
            aliases: [
                "brow tint",
                "brow shape and tint",
                "eyebrow styling",
                "brow grooming",
                "defined brows treatment",
            ],
        },
    ],
    "hair-extensions": [
        {
            match: ["hair extensions", "remy", "human hair extensions"],
            aliases: [
                "hair extensions",
                "human hair extensions",
                "remy hair extensions",
                "length and volume extensions",
                "natural blend extensions",
            ],
        },
        {
            match: ["tape in", "invisible tape", "tape extensions"],
            aliases: [
                "tape in hair extensions",
                "invisible tape in extensions",
                "tape in volume extensions",
                "tape hair extensions",
            ],
        },
        {
            match: ["clip in", "halo hair", "halo"],
            aliases: [
                "clip in hair extensions",
                "halo hair extensions",
                "temporary volume extensions",
                "occasion hair extensions",
            ],
        },
        {
            match: ["keratin bond", "u tip", "micro ring", "weft", "genius weft", "nano ring"],
            aliases: [
                "keratin bond extensions",
                "micro ring extensions",
                "weft hair extensions",
                "genius weft extensions",
                "semi permanent hair extensions",
            ],
        },
    ],
};

function normalizeAliasPhrase(value: string): string {
    return value
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[()]/g, " ")
        .replace(/[/]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function dedupeAliasKeywords(values: Array<string | undefined>): string[] {
    const seen = new Set<string>();
    const keywords: string[] = [];

    for (const value of values) {
        if (!value) continue;
        const normalized = normalizeAliasPhrase(value);
        if (!normalized || seen.has(normalized)) continue;
        seen.add(normalized);
        keywords.push(normalized);
    }

    return keywords;
}

function keywordMatchesCluster(keyword: string, cluster: SeoAliasCluster): boolean {
    const normalizedKeyword = normalizeAliasPhrase(keyword);

    return cluster.match.some((phrase) => {
        const normalizedPhrase = normalizeAliasPhrase(phrase);
        return normalizedKeyword === normalizedPhrase
            || normalizedKeyword.includes(normalizedPhrase)
            || (normalizedKeyword.length >= 8 && normalizedPhrase.includes(normalizedKeyword));
    });
}

export function getCategoryAliasKeywords(categoryId: string): string[] {
    const clusters = CATEGORY_ALIAS_CLUSTERS[categoryId] ?? [];
    return dedupeAliasKeywords(clusters.flatMap((cluster) => cluster.aliases));
}

export function getMatchingAliasKeywords(categoryId: string, seedKeywords: string[] = []): string[] {
    const clusters = CATEGORY_ALIAS_CLUSTERS[categoryId] ?? [];

    if (clusters.length === 0 || seedKeywords.length === 0) {
        return [];
    }

    return dedupeAliasKeywords(
        clusters.flatMap((cluster) =>
            seedKeywords.some((keyword) => keywordMatchesCluster(keyword, cluster))
                ? cluster.aliases
                : []
        )
    );
}
