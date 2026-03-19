interface KeywordLocation {
    name: string;
    region?: string;
}

interface KeywordService {
    keyword: string;
    categoryId: string;
    seoKeywords?: string[];
}

interface KeywordServiceItem {
    name: string;
    seoKeywords?: string[];
}

interface KeywordCategory {
    id: string;
    title: string;
    subcategories: Array<{
        items: KeywordServiceItem[];
    }>;
}

interface CategorySeoStrategy {
    catalogLabel: string;
    catalogDescription: string;
    shortTail: string[];
    seoPainPoints: string[];
    journeyPainPoints: string[];
    seoResults: string[];
    journeyResults: string[];
    comparisonTerms: string[];
    objectionTerms: string[];
    audienceTerms: string[];
}

export interface SeoIntentSignals {
    painPoints: string[];
    results: string[];
    comparisons: string[];
    objections: string[];
    audiences: string[];
}

const REDUNDANT_KEYWORD_PATTERNS = [
    /\bbest\b/i,
    /\baffordable\b/i,
    /\bcheap\b/i,
    /\bprofessional\b/i,
    /\bnear me\b/i,
    /\bprice\b/i,
    /\bprices\b/i,
    /\bcost\b/i,
    /\bbook\b/i,
    /\bbooking\b/i,
    /\bwalk-?in\b/i,
    /\btop rated\b/i,
    /\btop hair salon\b/i,
    /\bexpert hair stylist\b/i,
    /\bexpert lash artist\b/i,
    /\btransform\b/i,
];

const LOCATION_NOISE_PATTERNS = [
    /\bhartbeespoort\b/i,
    /\bharties\b/i,
    /\bpretoria\b/i,
    /\bcenturion\b/i,
    /\bjohannesburg\b/i,
    /\bgauteng\b/i,
    /\bnorth west\b/i,
];

export const CATEGORY_SEO_STRATEGIES: Record<string, CategorySeoStrategy> = {
    "hart-aesthetics": {
        catalogLabel: "medical aesthetics",
        catalogDescription: "Injectables, fillers, anti-wrinkle treatments and non-surgical facial rejuvenation.",
        shortTail: [
            "anti wrinkle injections",
            "dermal fillers",
            "lip filler",
            "cheek filler",
            "skin boosters",
            "non surgical facelift",
        ],
        seoPainPoints: [
            "smile lines treatment",
            "dark circles treatment",
            "volume loss treatment",
            "under eye bags treatment",
            "marionette lines treatment",
            "jawline definition treatment",
            "turkey neck treatment",
            "preventative botox",
        ],
        journeyPainPoints: [
            "deepening smile lines",
            "shadows around the mouth",
            "looking tired or sunken",
            "under eyes that look puffy or shadowed",
            "a softer jawline than you want",
            "sagging neck skin",
            "wanting to age more preventatively",
        ],
        seoResults: [
            "facial balancing",
            "full face rejuvenation",
            "anti aging injections",
            "tired eyes refresh",
            "cheek contouring",
            "smoother forehead treatment",
        ],
        journeyResults: [
            "looking rested and fresher",
            "subtle, natural lifting",
            "softer forehead and frown lines",
            "more balanced facial shape",
            "gentle cheek and jaw definition",
            "a fresher look that still feels like you",
        ],
        comparisonTerms: [
            "botox alternative",
            "fillers vs thread lift",
            "lip filler vs lip flip",
            "skin boosters vs filler",
        ],
        objectionTerms: [
            "natural looking botox",
            "lip filler without duck lips",
            "first time filler treatment",
            "non surgical anti aging with minimal downtime",
        ],
        audienceTerms: [
            "preventative botox for 30s",
            "anti aging treatment for mature skin",
            "jawline definition for women",
            "under eye treatment for tired professionals",
        ],
    },
    "fat-freezing": {
        catalogLabel: "fat freezing and body contouring",
        catalogDescription: "Cryolipolysis treatments for stubborn fat, belly contouring and non-surgical sculpting.",
        shortTail: [
            "fat freezing",
            "cryolipolysis",
            "body contouring",
            "coolsculpting alternative",
            "non surgical fat reduction",
            "fat dissolving treatment",
        ],
        seoPainPoints: [
            "stubborn belly fat treatment",
            "love handles treatment",
            "muffin top treatment",
            "double chin reduction",
            "bra bulge treatment",
            "inner thigh fat reduction",
        ],
        journeyPainPoints: [
            "stubborn tummy fat that will not shift",
            "fullness around the waistline",
            "a muffin top in fitted clothes",
            "softness under the chin",
            "bulges around the bra line",
            "frustration with gym resistant areas",
        ],
        seoResults: [
            "inch loss treatment",
            "non surgical liposuction alternative",
            "body sculpting",
            "fat pocket reduction",
            "abdomen contouring",
            "waistline slimming",
        ],
        journeyResults: [
            "feeling more comfortable in your clothes",
            "a flatter, smoother shape",
            "visible inch loss in a stubborn area",
            "more definition through the waist",
            "a cleaner contour under the chin",
            "more confidence in fitted outfits",
        ],
        comparisonTerms: [
            "coolsculpting alternative",
            "fat freezing vs liposuction",
            "cryolipolysis vs fat dissolving injections",
            "body contouring vs weight loss treatment",
        ],
        objectionTerms: [
            "fat freezing with no downtime",
            "non surgical belly fat treatment",
            "fat freezing for small stubborn areas",
            "does fat freezing work for love handles",
        ],
        audienceTerms: [
            "post baby belly contouring",
            "wedding body prep treatment",
            "body contouring for gym resistant fat",
            "double chin treatment for selfies",
        ],
    },
    slimming: {
        catalogLabel: "slimming treatments",
        catalogDescription: "Fat dissolving injections and muscle-toning body shaping treatments.",
        shortTail: [
            "slimming injections",
            "fat dissolving injections",
            "body sculpting",
            "inch loss treatment",
            "non surgical weight loss support",
            "double chin injections",
        ],
        seoPainPoints: [
            "stubborn fat pockets",
            "double chin treatment",
            "arm fat reduction",
            "belly fat support",
            "body toning treatment",
            "cellulite appearance support",
        ],
        journeyPainPoints: [
            "small areas that hold onto fullness",
            "softness under the chin in photos",
            "feeling self conscious in sleeveless tops",
            "a stomach area that still bothers you",
            "wanting more shape without surgery",
            "skin texture that looks dimpled or uneven",
        ],
        seoResults: [
            "body shaping treatment",
            "non surgical contouring",
            "waist definition",
            "muscle toning treatment",
            "fat loss support",
            "slimmer silhouette treatment",
        ],
        journeyResults: [
            "a more sculpted body outline",
            "visible contour through stubborn areas",
            "better waist definition",
            "a firmer, more toned look",
            "more confidence in body conscious clothing",
            "a smoother overall silhouette",
        ],
        comparisonTerms: [
            "lemon bottle vs fat freezing",
            "slimming injections vs liposuction",
            "body sculpting vs gym results",
            "double chin injections vs jawline filler",
        ],
        objectionTerms: [
            "fat dissolving with minimal downtime",
            "body contouring without surgery",
            "non invasive slimming support",
            "slimming treatment for stubborn areas",
        ],
        audienceTerms: [
            "double chin treatment for women",
            "arm fat treatment for sleeveless dresses",
            "bridal inch loss treatment",
            "summer body contour prep",
        ],
    },
    massages: {
        catalogLabel: "massage therapy",
        catalogDescription: "Relaxation and therapeutic massages for stress, knots and muscle recovery.",
        shortTail: [
            "massage therapy",
            "deep tissue massage",
            "sports massage",
            "stress relief massage",
            "spa massage",
            "wellness massage",
        ],
        seoPainPoints: [
            "muscle tension relief",
            "knot removal massage",
            "back pain relief massage",
            "neck and shoulder tension",
            "post workout recovery",
            "stress and burnout relief",
        ],
        journeyPainPoints: [
            "a body that feels tight and overworked",
            "knots that keep coming back",
            "an aching back from daily stress",
            "heavy tension in the neck and shoulders",
            "soreness after training",
            "feeling run down and mentally overloaded",
        ],
        seoResults: [
            "deep muscle recovery",
            "relaxation massage",
            "couples spa day",
            "wellness retreat treatment",
            "circulation support massage",
            "full body reset",
        ],
        journeyResults: [
            "feeling looser and lighter in your body",
            "deeper relaxation",
            "relief from built up tension",
            "a proper nervous system reset",
            "easier movement after soreness",
            "leaving calmer than when you arrived",
        ],
        comparisonTerms: [
            "deep tissue vs swedish massage",
            "sports massage vs deep tissue",
            "hot stone vs aromatherapy massage",
            "which massage is best for stress",
        ],
        objectionTerms: [
            "gentle massage for stress relief",
            "massage for chronic tight shoulders",
            "massage with firm pressure",
            "relaxing massage without pain",
        ],
        audienceTerms: [
            "massage for office workers",
            "recovery massage for athletes",
            "couples relaxation massage",
            "spa day for burnout recovery",
        ],
    },
    dermalogica: {
        catalogLabel: "advanced facials and peels",
        catalogDescription: "Dermalogica facials, microneedling, dermaplaning and corrective skin treatments.",
        shortTail: [
            "acne treatment facial",
            "chemical peel",
            "microneedling",
            "dermaplaning facial",
            "deep cleansing facial",
            "skin resurfacing facial",
        ],
        seoPainPoints: [
            "acne scar treatment",
            "adult acne facial",
            "hyperpigmentation treatment",
            "dark spots treatment",
            "sun damage treatment",
            "blackhead removal facial",
            "deep pore extraction",
            "dull skin treatment",
        ],
        journeyPainPoints: [
            "stubborn post acne marks",
            "adult breakouts that keep flaring up",
            "dark marks that linger after spots",
            "uneven tone from sun exposure",
            "blocked pores and blackheads",
            "skin that feels rough and congested",
            "dull, tired looking skin",
            "texture that does not feel smooth",
        ],
        seoResults: [
            "glass skin facial",
            "collagen induction treatment",
            "skin tightening facial",
            "breakout clearing facial",
            "smoother skin texture",
            "brighter complexion treatment",
        ],
        journeyResults: [
            "cleaner, clearer pores",
            "smoother skin texture",
            "calmer active breakouts",
            "brighter, more even looking skin",
            "firmer, plumper skin",
            "a fresher healthy glow",
        ],
        comparisonTerms: [
            "microneedling vs chemical peel",
            "dermaplaning vs peel",
            "best facial for acne scars",
            "best treatment for pigmentation",
        ],
        objectionTerms: [
            "facial for sensitive acne skin",
            "chemical peel with low downtime",
            "glow treatment before an event",
            "microneedling for dark marks",
        ],
        audienceTerms: [
            "adult acne treatment for women",
            "bridal skin prep facial",
            "post summer pigmentation treatment",
            "corporate event glow facial",
        ],
    },
    ipl: {
        catalogLabel: "ipl hair removal",
        catalogDescription: "Permanent hair reduction for face, body and intimate areas with IPL technology.",
        shortTail: [
            "ipl hair removal",
            "permanent hair reduction",
            "laser hair removal alternative",
            "face hair removal",
            "body hair removal",
            "intimate hair removal",
        ],
        seoPainPoints: [
            "ingrown hair treatment",
            "razor bumps treatment",
            "chin hair removal",
            "upper lip hair removal",
            "beard line cleanup",
            "mens grooming hair removal",
            "bikini line hair removal",
        ],
        journeyPainPoints: [
            "shaving rash that keeps coming back",
            "painful ingrown hairs",
            "visible chin or upper lip hair",
            "beard line irritation",
            "fast body hair regrowth",
            "bikini line bumps and discomfort",
            "wanting less daily grooming",
        ],
        seoResults: [
            "smooth skin treatment",
            "painless hair removal",
            "long term hair reduction",
            "underarm hair reduction",
            "full body hair removal",
            "shaving rash relief",
        ],
        journeyResults: [
            "smoother skin with less upkeep",
            "fewer ingrowns and bumps",
            "slower regrowth",
            "less shaving and less irritation",
            "cleaner grooming lines",
            "more confidence in exposed areas",
        ],
        comparisonTerms: [
            "ipl vs laser hair removal",
            "waxing vs ipl",
            "laser hair removal alternative",
            "best hair removal for ingrown hairs",
        ],
        objectionTerms: [
            "hair removal for sensitive skin",
            "painless bikini hair removal",
            "permanent hair reduction for chin hair",
            "ingrown hair treatment after shaving",
        ],
        audienceTerms: [
            "mens beard line hair removal",
            "womens facial hair reduction",
            "bikini prep hair removal",
            "underarm treatment for dark shaving marks",
        ],
    },
    makeup: {
        catalogLabel: "professional makeup",
        catalogDescription: "Bridal, occasion and event makeup for long-wear glam and camera-ready finishes.",
        shortTail: [
            "bridal makeup",
            "special occasion makeup",
            "matric dance makeup",
            "soft glam makeup",
            "event makeup artist",
            "waterproof occasion makeup",
        ],
        seoPainPoints: [
            "makeup that lasts all day",
            "flashback free makeup",
            "bridal trial makeup",
            "photo ready makeup",
            "humidity proof makeup",
            "smudge resistant glam",
        ],
        journeyPainPoints: [
            "makeup melting in heat or humidity",
            "looking washed out in photos",
            "worrying about flashback",
            "not knowing which glam level suits you",
            "wanting to feel polished without looking overdone",
            "needing a look that lasts through the whole event",
        ],
        seoResults: [
            "natural glam makeup",
            "full glam makeover",
            "long wear makeup look",
            "flawless skin finish",
            "wedding morning beauty prep",
            "red carpet makeup",
        ],
        journeyResults: [
            "a polished look that still feels like you",
            "makeup that looks beautiful in person and in photos",
            "confidence in front of the camera",
            "long wear glam that stays put",
            "radiant skin without a heavy finish",
            "feeling ready for the whole event",
        ],
        comparisonTerms: [
            "soft glam vs full glam makeup",
            "bridal trial vs wedding day makeup",
            "airbrush makeup alternative",
            "best makeup look for matric dance",
        ],
        objectionTerms: [
            "makeup that lasts in heat",
            "natural bridal makeup not cakey",
            "makeup for flash photography",
            "waterproof bridal makeup",
        ],
        audienceTerms: [
            "bridal makeup for weddings",
            "matric dance makeup",
            "photoshoot makeup",
            "special event glam for guests",
        ],
    },
    medical: {
        catalogLabel: "clinical skin treatments",
        catalogDescription: "Fractional laser, plasmage, resurfacing and advanced corrective aesthetic procedures.",
        shortTail: [
            "fractional laser treatment",
            "skin resurfacing",
            "plasmage treatment",
            "advanced aesthetics",
            "scar revision treatment",
            "medical skin clinic",
        ],
        seoPainPoints: [
            "acne scars treatment",
            "loose eyelid skin treatment",
            "skin laxity treatment",
            "stretch mark treatment",
            "texture irregularity treatment",
            "post acne marks treatment",
        ],
        journeyPainPoints: [
            "stubborn acne scars",
            "heavy or drooping eyelids",
            "loose or sagging skin",
            "stretch marks that still bother you",
            "rough, uneven skin texture",
            "marks left behind after breakouts",
        ],
        seoResults: [
            "collagen remodeling",
            "skin tightening treatment",
            "non surgical lift",
            "smoother skin texture",
            "firmer skin treatment",
            "corrective skin renewal",
        ],
        journeyResults: [
            "firmer, tighter feeling skin",
            "smoother skin texture",
            "noticeable scar softening",
            "more lifted looking eyelids",
            "overall skin renewal",
            "more confidence without makeup",
        ],
        comparisonTerms: [
            "fractional laser vs microneedling",
            "plasmage vs blepharoplasty alternative",
            "best treatment for acne scars",
            "laser resurfacing vs chemical peel",
        ],
        objectionTerms: [
            "skin tightening without surgery",
            "fractional laser downtime",
            "non surgical eyelid lift",
            "advanced skin treatment with minimal downtime",
        ],
        audienceTerms: [
            "acne scar treatment for adults",
            "eyelid tightening for mature skin",
            "stretch mark treatment after pregnancy",
            "corrective skin treatment for texture",
        ],
    },
    "permanent-makeup": {
        catalogLabel: "permanent makeup",
        catalogDescription: "Microblading, powder brows, lip blush and eyeliner for low-maintenance beauty.",
        shortTail: [
            "microblading",
            "powder brows",
            "lip blush",
            "eyeliner tattoo",
            "semi permanent brows",
            "permanent makeup",
        ],
        seoPainPoints: [
            "sparse brows treatment",
            "smudge proof makeup",
            "effortless mornings",
            "uneven lip colour correction",
            "patchy eyebrows fix",
            "scar camouflage brows",
        ],
        journeyPainPoints: [
            "spending too long drawing on brows",
            "makeup that rubs off too easily",
            "uneven or faded lip colour",
            "brows that look patchy without makeup",
            "wanting to wake up looking more put together",
            "areas in the brows that need camouflage",
        ],
        seoResults: [
            "waterproof eyeliner",
            "defined brows",
            "natural hair stroke brows",
            "soft ombre brows",
            "tinted lips effect",
            "makeup free confidence",
        ],
        journeyResults: [
            "waking up with shape already there",
            "defined brows without daily pencil work",
            "softer, more even lip colour",
            "makeup that stays put through the day",
            "less effort in the mornings",
            "cleaner makeup free confidence",
        ],
        comparisonTerms: [
            "microblading vs powder brows",
            "lip blush vs lipstick look",
            "hybrid brows vs microblading",
            "eyeliner tattoo vs daily makeup",
        ],
        objectionTerms: [
            "natural looking permanent brows",
            "permanent makeup for oily skin",
            "semi permanent makeup with soft result",
            "low maintenance beauty treatment",
        ],
        audienceTerms: [
            "busy moms beauty treatment",
            "athletes needing waterproof makeup",
            "sparse brow correction",
            "bridal permanent makeup prep",
        ],
    },
    qms: {
        catalogLabel: "qms facials",
        catalogDescription: "Medical-grade QMS facials focused on collagen support, hydration and skin rejuvenation.",
        shortTail: [
            "collagen facial",
            "anti aging facial",
            "hydrating facial",
            "medical grade facial",
            "skin rejuvenation facial",
            "firming facial",
        ],
        seoPainPoints: [
            "fine lines facial",
            "dehydrated skin treatment",
            "dull mature skin treatment",
            "loss of firmness treatment",
            "tired skin facial",
            "post travel skin reset",
        ],
        journeyPainPoints: [
            "fine lines that are becoming more noticeable",
            "skin that feels dry and depleted",
            "mature skin that looks dull or tired",
            "loss of bounce and firmness",
            "a complexion that looks flat after stress or travel",
            "wanting your skin to look fresher again",
        ],
        seoResults: [
            "collagen boosting facial",
            "plumper skin treatment",
            "radiance facial",
            "firmer skin facial",
            "luxury corrective facial",
            "healthy glow treatment",
        ],
        journeyResults: [
            "plumper, bouncier skin",
            "deep hydration and comfort",
            "a smoother, firmer skin feel",
            "a healthy rested glow",
            "skin that looks less tired",
            "a more polished complexion before events",
        ],
        comparisonTerms: [
            "qms facial vs standard facial",
            "best facial for mature skin",
            "collagen facial vs microneedling",
            "medical grade facial vs spa facial",
        ],
        objectionTerms: [
            "anti aging facial with no downtime",
            "hydrating facial for tired skin",
            "firming facial for sensitive mature skin",
            "luxury facial with visible results",
        ],
        audienceTerms: [
            "mature skin facial",
            "pre event glow treatment",
            "travel recovery facial",
            "executive skincare treatment",
        ],
    },
    sunbed: {
        catalogLabel: "tanning services",
        catalogDescription: "Sunbed and spray tanning for even colour, event prep and year-round glow.",
        shortTail: [
            "spray tan",
            "sunbed tanning",
            "bridal tan",
            "event tan",
            "indoor tanning",
            "rapid glow treatment",
        ],
        seoPainPoints: [
            "pale skin prep",
            "streak free spray tan",
            "special event tanning",
            "vacation glow prep",
            "winter tanning solution",
            "pre wedding tan",
        ],
        journeyPainPoints: [
            "feeling washed out or pale",
            "worrying about a streaky or orange tan",
            "wanting colour before an event",
            "needing a holiday glow without waiting for the sun",
            "wanting to look healthier in winter",
            "nerves about tanning before a wedding",
        ],
        seoResults: [
            "sun kissed glow",
            "even tan finish",
            "golden skin tone",
            "camera ready tan",
            "bronzed skin look",
            "glow boost treatment",
        ],
        journeyResults: [
            "a natural sun kissed glow",
            "an even tan that does not look patchy",
            "warmer skin tone for events and photos",
            "more confidence in open outfits",
            "healthy looking colour all year",
            "a glow that still looks believable up close",
        ],
        comparisonTerms: [
            "spray tan vs sunbed",
            "best tan before a wedding",
            "rapid glow vs gradual tanning",
            "spray tan for events",
        ],
        objectionTerms: [
            "streak free spray tan",
            "natural looking spray tan",
            "tan that does not go orange",
            "quick pre event glow",
        ],
        audienceTerms: [
            "bridal spray tan",
            "holiday prep tanning",
            "photoshoot tan",
            "winter glow treatment",
        ],
    },
    waxing: {
        catalogLabel: "waxing services",
        catalogDescription: "Professional face and body waxing for smooth skin, intimate care and grooming.",
        shortTail: [
            "brazilian wax",
            "hollywood wax",
            "bikini wax",
            "full body wax",
            "facial waxing",
            "mens waxing",
        ],
        seoPainPoints: [
            "ingrown hair support",
            "intimate waxing",
            "bikini line tidy",
            "manscaping service",
            "upper lip waxing",
            "sensitive skin waxing",
        ],
        journeyPainPoints: [
            "frustration with shaving rash and ingrowns",
            "rapid uncomfortable regrowth",
            "wanting a cleaner bikini line",
            "wanting a neater grooming routine",
            "facial hair that needs quick tidy ups",
            "worrying that waxing will irritate your skin",
        ],
        seoResults: [
            "smooth skin for weeks",
            "clean bikini line",
            "long lasting hair removal",
            "gentle waxing treatment",
            "underarm waxing",
            "body grooming service",
        ],
        journeyResults: [
            "smooth skin without the daily hassle",
            "a cleaner bikini line for longer",
            "slower softer regrowth",
            "less shaving irritation",
            "more comfort in warm weather and holidays",
            "a neater low maintenance grooming routine",
        ],
        comparisonTerms: [
            "brazilian vs hollywood wax",
            "waxing vs shaving",
            "waxing vs ipl",
            "best hair removal for bikini line",
        ],
        objectionTerms: [
            "painless waxing for sensitive skin",
            "gentle brazilian wax",
            "waxing for ingrown prone skin",
            "intimate waxing with less irritation",
        ],
        audienceTerms: [
            "mens chest and back wax",
            "holiday bikini prep wax",
            "first time brazilian wax",
            "bridal waxing prep",
        ],
    },
    hair: {
        catalogLabel: "hair salon services",
        catalogDescription: "Cutting, colouring, smoothing and repair services for transformations and maintenance.",
        shortTail: [
            "hair salon",
            "hair colour",
            "balayage",
            "keratin treatment",
            "blow dry styling",
            "hair repair treatment",
        ],
        seoPainPoints: [
            "colour correction",
            "brassy hair fix",
            "grey coverage root touch up",
            "frizz control treatment",
            "damaged hair repair",
            "split end trim",
            "lived in blonde colour",
        ],
        journeyPainPoints: [
            "yellow or brassy blonde tones",
            "visible regrowth that feels untidy",
            "frizz that reacts to humidity",
            "dry, snapping ends",
            "hair that feels flat or lifeless",
            "colour that has gone dull",
            "wanting a softer more expensive looking blonde",
        ],
        seoResults: [
            "silky smooth hair",
            "glossy blowout",
            "healthy hair transformation",
            "root melt colour",
            "long lasting colour refresh",
            "salon finish styling",
        ],
        journeyResults: [
            "softer, glossier hair",
            "colour that looks fresh and dimensional",
            "manageable hair that holds a style",
            "a smoother finish without losing movement",
            "healthier looking lengths and ends",
            "hair that feels polished again",
        ],
        comparisonTerms: [
            "balayage vs foils",
            "keratin vs brazilian treatment",
            "colour correction vs toner",
            "best treatment for frizzy hair",
        ],
        objectionTerms: [
            "hair smoothing without flat result",
            "grey coverage that looks natural",
            "damage repair for bleached hair",
            "frizz control in humid weather",
        ],
        audienceTerms: [
            "bridal hair prep",
            "busy professionals root touch up",
            "blonde maintenance clients",
            "hair rescue after box dye",
        ],
    },
    nails: {
        catalogLabel: "nail salon services",
        catalogDescription: "Gel, acrylic and pedicure services focused on durability, nail health and nail art.",
        shortTail: [
            "gel nails",
            "acrylic nails",
            "biab nails",
            "builder gel manicure",
            "spa pedicure",
            "nail art",
        ],
        seoPainPoints: [
            "chip free manicure",
            "long lasting manicure",
            "strong natural nails",
            "dry cracked heels pedicure",
            "callus removal pedicure",
            "bridal nails",
        ],
        journeyPainPoints: [
            "manicures that chip after a few days",
            "nails that bend peel or break easily",
            "short nails that will not grow",
            "rough dry heels",
            "feet that need a more polished look",
            "wanting hands and nails to look put together",
        ],
        seoResults: [
            "glossy gel manicure",
            "structured manicure",
            "healthy cuticle care",
            "salon pedicure finish",
            "trendy nail designs",
            "durable nail enhancements",
        ],
        journeyResults: [
            "a manicure that actually lasts",
            "stronger natural nails over time",
            "clean elegant nail shaping",
            "soft polished feet",
            "a glossy well kept finish",
            "hands that look refined for longer",
        ],
        comparisonTerms: [
            "biab vs gel nails",
            "acrylic vs rubber base",
            "builder gel vs acrylic",
            "best manicure for weak nails",
        ],
        objectionTerms: [
            "long lasting manicure without chipping",
            "natural looking nail strength treatment",
            "pedicure for cracked heels",
            "nails that last for holidays",
        ],
        audienceTerms: [
            "bridal nail appointment",
            "vacation nails",
            "working hands nail strengthening",
            "minimalist nail art clients",
        ],
    },
    "lashes-brows": {
        catalogLabel: "lash and brow services",
        catalogDescription: "Lash extensions, lifts and brow styling for soft, wispy or dramatic finishes.",
        shortTail: [
            "lash extensions",
            "brow lamination",
            "lash lift and tint",
            "hybrid lashes",
            "volume lashes",
            "classic lashes",
        ],
        seoPainPoints: [
            "wispy lashes",
            "cat eye lashes",
            "natural lash extensions",
            "dramatic volume fans",
            "sparse brows styling",
            "low maintenance beauty routine",
        ],
        journeyPainPoints: [
            "lashes that disappear without mascara",
            "wanting more lift and shape around the eyes",
            "not knowing which lash style will suit you",
            "brows that look sparse or uneven",
            "spending too long getting ready every morning",
            "wanting a more put together look without full makeup",
        ],
        seoResults: [
            "effortless morning makeup",
            "face framing brows",
            "soft fluffy lashes",
            "defined lash line",
            "eye opening lash lift",
            "natural glam lashes",
        ],
        journeyResults: [
            "waking up looking more put together",
            "softer darker lifted lashes",
            "brows that frame the face better",
            "less need for daily makeup",
            "cleaner eye definition",
            "a polished look with minimal effort",
        ],
        comparisonTerms: [
            "classic vs volume lashes",
            "lash lift vs lash extensions",
            "hybrid lashes vs volume",
            "brow lamination vs tint",
        ],
        objectionTerms: [
            "lash extensions that do not damage lashes",
            "natural looking lash extensions",
            "low maintenance brow styling",
            "lash lift for straight lashes",
        ],
        audienceTerms: [
            "bridal lashes",
            "everyday natural lash clients",
            "dramatic glam lash lovers",
            "sparse brow grooming clients",
        ],
    },
    "hair-extensions": {
        catalogLabel: "hair extensions",
        catalogDescription: "Tape-ins, keratin bonds and Remy extensions for length, volume and colour blending.",
        shortTail: [
            "hair extensions",
            "tape in extensions",
            "keratin bond extensions",
            "clip in hair extensions",
            "remy human hair",
            "halo hair extensions",
        ],
        seoPainPoints: [
            "length and volume enhancement",
            "fine hair volume boost",
            "short hair transformation",
            "invisible tape ins",
            "colour blend extensions",
            "thinning hair volume support",
        ],
        journeyPainPoints: [
            "hair that feels too fine or flat",
            "wanting longer hair right away",
            "struggling to grow hair past a certain length",
            "a ponytail that feels too thin",
            "wanting fullness without obvious extensions",
            "needing extra thickness around the front or ends",
        ],
        seoResults: [
            "seamless hair extensions",
            "longer fuller hair",
            "natural blend extensions",
            "luxury hair makeover",
            "instant hair length",
            "thicker ponytail result",
        ],
        journeyResults: [
            "instant length and thickness",
            "fuller hair that still looks natural",
            "better balance through the ends",
            "a thicker ponytail and fuller styling",
            "more confidence wearing hair down",
            "seamless blending with your own colour",
        ],
        comparisonTerms: [
            "tape in vs keratin bond extensions",
            "clip in vs permanent extensions",
            "halo hair vs tape in",
            "best hair extensions for fine hair",
        ],
        objectionTerms: [
            "natural looking hair extensions",
            "extensions safe for fine hair",
            "hair extensions with low maintenance",
            "seamless extensions for short hair",
        ],
        audienceTerms: [
            "bridal hair extensions",
            "volume boost for thin hair",
            "length for special occasions",
            "colour blend extensions for blondes",
        ],
    },
};

function normalizeKeywordPhrase(value: string): string {
    return value
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[()]/g, " ")
        .replace(/[/]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function formatKeywordList(values: string[], maxItems = 3): string {
    const items = values.slice(0, maxItems);

    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;

    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function dedupeKeywords(values: Array<string | undefined>): string[] {
    const seen = new Set<string>();
    const keywords: string[] = [];

    for (const value of values) {
        if (!value) continue;
        const normalized = normalizeKeywordPhrase(value);
        if (!normalized || seen.has(normalized)) continue;
        seen.add(normalized);
        keywords.push(normalized);
    }

    return keywords;
}

function isRedundantKeyword(value: string): boolean {
    return REDUNDANT_KEYWORD_PATTERNS.some((pattern) => pattern.test(value))
        || LOCATION_NOISE_PATTERNS.some((pattern) => pattern.test(value));
}

function simplifyServiceName(name: string): string {
    return normalizeKeywordPhrase(
        name
            .replace(/\([^)]*\)/g, " ")
            .replace(/\b\d+\s?(ml|cm|min|mins|minutes?|units?|cups?)\b/gi, " ")
            .replace(/\b(light|dark)\s*colours?\b/gi, " ")
            .replace(/\blight\s*ombre\s*piano\b/gi, " ")
    );
}

function sanitizeLegacyKeywords(keywords: string[] = []): string[] {
    return dedupeKeywords(
        keywords
            .map((keyword) => normalizeKeywordPhrase(keyword))
            .filter((keyword) => keyword.length > 2 && !isRedundantKeyword(keyword))
    );
}

function getCategoryStrategy(categoryId: string): CategorySeoStrategy {
    return CATEGORY_SEO_STRATEGIES[categoryId] ?? {
        catalogLabel: "beauty treatments",
        catalogDescription: "Beauty, spa and aesthetic treatments.",
        shortTail: ["beauty treatments", "spa services", "salon services"],
        seoPainPoints: ["beauty maintenance", "self care treatments"],
        journeyPainPoints: ["wanting to feel more polished", "needing a little self care"],
        seoResults: ["confidence boost treatments", "salon results"],
        journeyResults: ["feeling refreshed and more confident", "results that feel worth the time"],
        comparisonTerms: ["best beauty treatment for my goal"],
        objectionTerms: ["professional treatment with visible results"],
        audienceTerms: ["beauty treatments for busy lifestyles"],
    };
}

export function getCategoryIntentSignals(categoryId: string): SeoIntentSignals {
    const strategy = getCategoryStrategy(categoryId);

    return {
        painPoints: strategy.journeyPainPoints,
        results: strategy.journeyResults,
        comparisons: strategy.comparisonTerms,
        objections: strategy.objectionTerms,
        audiences: strategy.audienceTerms,
    };
}

export function getServiceIntentSignals(service: KeywordService): SeoIntentSignals {
    return getCategoryIntentSignals(service.categoryId);
}

export function buildCategoryIntentCopy(categoryTitle: string, categoryId: string) {
    const signals = getCategoryIntentSignals(categoryId);

    return {
        problemStatement: `You may start exploring ${categoryTitle.toLowerCase()} because you want help with concerns like ${formatKeywordList(signals.painPoints)}.`,
        resultStatement: `Most often, the goal is to see results like ${formatKeywordList(signals.results)} in a way that still feels realistic and well suited to you.`,
        reassuranceStatement: `Before you book, it helps to understand options like ${formatKeywordList(signals.comparisons, 2)} and to feel clear about things like ${formatKeywordList(signals.objections, 2)}.`,
    };
}

export function buildServiceIntentCopy(service: KeywordService) {
    const signals = getServiceIntentSignals(service);

    return {
        problemStatement: `You may be considering ${service.keyword} because you want help with concerns like ${formatKeywordList(signals.painPoints)}.`,
        resultStatement: `The usual aim is to see results like ${formatKeywordList(signals.results)} with a plan that feels natural, considered and appropriate for you.`,
        reassuranceStatement: `Before you decide, it helps to understand options like ${formatKeywordList(signals.comparisons, 2)} and to feel reassured about ${formatKeywordList(signals.objections, 2)}.`,
    };
}

function getCategoryServiceHighlights(category: KeywordCategory): string[] {
    return dedupeKeywords(
        category.subcategories.flatMap((subcategory) =>
            subcategory.items.slice(0, 8).map((item) => simplifyServiceName(item.name))
        )
    ).filter((keyword) => keyword.length > 4).slice(0, 8);
}

export function buildGlobalKeywords(): string[] {
    return dedupeKeywords([
        "beauty salon hartbeespoort",
        "day spa hartbeespoort",
        "med spa hartbeespoort",
        "medical aesthetics hartbeespoort",
        "aesthetic clinic hartbeespoort",
        "skin clinic hartbeespoort",
        "hair salon hartbeespoort",
        "nail salon hartbeespoort",
        "lash studio hartbeespoort",
        "massage spa hartbeespoort",
        "beauty salon harties",
        "fat freezing hartbeespoort",
        "ipl hair removal hartbeespoort",
        "permanent makeup hartbeespoort",
        "beauty treatments harties",
        "wellness spa hartbeespoort",
    ]);
}

export function buildHomepageKeywords(): string[] {
    return dedupeKeywords([
        ...buildGlobalKeywords(),
        "injectables hartbeespoort",
        "facials hartbeespoort",
        "body contouring hartbeespoort",
        "bride to be beauty prep hartbeespoort",
        "luxury salon hartbeespoort",
        "anti aging treatments hartbeespoort",
        "hair and beauty salon hartbeespoort",
        "beauty and wellness hub hartbeespoort",
    ]);
}

export function buildPricesPageKeywords(): string[] {
    return dedupeKeywords([
        "beauty treatment prices hartbeespoort",
        "salon price list hartbeespoort",
        "facial prices hartbeespoort",
        "injectables prices hartbeespoort",
        "nail prices hartbeespoort",
        "massage prices hartbeespoort",
        "hair prices hartbeespoort",
        "ipl prices hartbeespoort",
        "permanent makeup prices hartbeespoort",
        "beauty services hartbeespoort",
        "treatment menu hartbeespoort",
    ]);
}

export function buildLocationsIndexKeywords(): string[] {
    return dedupeKeywords([
        "beauty salon hartbeespoort",
        "areas we serve hartbeespoort",
        "beauty treatments gauteng",
        "day spa near pretoria",
        "beauty salon near johannesburg",
        "hartbeespoort salon for pretoria clients",
        "hartbeespoort salon for johannesburg clients",
        "aesthetic clinic near centurion",
        "beauty services across harties",
    ]);
}

export function buildLocationHubKeywords(location: KeywordLocation): string[] {
    const locationName = normalizeKeywordPhrase(location.name);
    const regionName = location.region ? normalizeKeywordPhrase(location.region) : "";

    return dedupeKeywords([
        `beauty salon ${locationName}`,
        `day spa ${locationName}`,
        `aesthetic clinic ${locationName}`,
        `facials ${locationName}`,
        `injectables ${locationName}`,
        `hair salon ${locationName}`,
        `nail salon ${locationName}`,
        `lash extensions ${locationName}`,
        `massage ${locationName}`,
        `ipl hair removal ${locationName}`,
        `permanent makeup ${locationName}`,
        regionName ? `beauty treatments ${regionName}` : undefined,
    ]);
}

export function buildCategoryKeywords(category: KeywordCategory): string[] {
    const strategy = getCategoryStrategy(category.id);
    const serviceHighlights = getCategoryServiceHighlights(category);
    const legacyHighlights = sanitizeLegacyKeywords(
        category.subcategories.flatMap((subcategory) =>
            subcategory.items.flatMap((item) => item.seoKeywords ?? [])
        )
    ).slice(0, 8);

    return dedupeKeywords([
        `${strategy.catalogLabel} hartbeespoort`,
        `${normalizeKeywordPhrase(category.title)} hartbeespoort`,
        ...strategy.shortTail,
        ...strategy.seoPainPoints,
        ...strategy.seoResults,
        ...strategy.comparisonTerms,
        ...strategy.objectionTerms,
        ...strategy.audienceTerms,
        ...serviceHighlights,
        ...legacyHighlights,
    ]).slice(0, 36);
}

export function buildServiceKeywords(service: KeywordService, location?: KeywordLocation): string[] {
    const strategy = getCategoryStrategy(service.categoryId);
    const serviceKeyword = normalizeKeywordPhrase(service.keyword);
    const simplifiedKeyword = simplifyServiceName(service.keyword);
    const locationName = location ? normalizeKeywordPhrase(location.name) : "";
    const regionName = location?.region ? normalizeKeywordPhrase(location.region) : "";
    const serviceSeedKeywords = sanitizeLegacyKeywords(service.seoKeywords).slice(0, 10);

    return dedupeKeywords([
        serviceKeyword,
        simplifiedKeyword !== serviceKeyword ? simplifiedKeyword : undefined,
        locationName ? `${simplifiedKeyword} ${locationName}` : undefined,
        locationName ? `${strategy.catalogLabel} ${locationName}` : undefined,
        regionName ? `${strategy.catalogLabel} ${regionName}` : undefined,
        ...strategy.shortTail,
        ...strategy.seoPainPoints,
        ...strategy.seoResults,
        ...strategy.comparisonTerms,
        ...strategy.objectionTerms,
        ...strategy.audienceTerms,
        ...serviceSeedKeywords,
    ]).slice(0, 34);
}

export function buildOfferCatalogEntries() {
    return Object.entries(CATEGORY_SEO_STRATEGIES).map(([categoryId, strategy]) => ({
        "@type": "Offer",
        itemOffered: {
            "@type": "Service",
            name: `${strategy.catalogLabel} hartbeespoort`,
            description: strategy.catalogDescription,
            url: `https://www.galeobeauty.com/prices/${categoryId}`,
        },
    }));
}
