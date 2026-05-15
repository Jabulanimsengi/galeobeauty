export interface CategoryHubSeoCard {
    title: string;
    description: string;
}

export interface CategoryHubSeoLink {
    label: string;
    href: string;
    description: string;
}

export interface CategoryHubSeoServiceLink {
    serviceSlug: string;
    description: string;
    localHref?: string;
    localLabel?: string;
}

export interface CategoryHubSeoContent {
    heading: string;
    body: string;
    cards: CategoryHubSeoCard[];
    serviceLinks: CategoryHubSeoServiceLink[];
    areaLinks: CategoryHubSeoLink[];
    decisionPrompt?: string;
    decisionLinks?: CategoryHubSeoLink[];
    reassurance?: CategoryHubSeoCard[];
}

const DEFAULT_AREA_LINKS: CategoryHubSeoLink[] = [
    {
        label: "Hartbeespoort",
        href: "/locations/hartbeespoort",
        description: "Our main salon area near Hartbeespoort Dam.",
    },
    {
        label: "Pretoria",
        href: "/locations/pretoria",
        description: "Convenient for clients visiting us from Pretoria.",
    },
    {
        label: "Centurion",
        href: "/locations/centurion",
        description: "Convenient for clients visiting us from Centurion.",
    },
];

export const CATEGORY_HUB_SEO_CONTENT: Record<string, CategoryHubSeoContent> = {
    hair: {
        heading: "Hair salon and hairdresser appointments in Hartbeespoort",
        body: "Explore cuts, blow-dries, colour, balayage, toning and smoothing treatments in one place, then choose the appointment that best fits your hair goal. Whether you need a quick refresh or a bigger colour change, the menu below helps you compare the most requested hair services at Galeo Beauty.",
        cards: [
            {
                title: "Cuts, blow-dries and styling",
                description: "For regular maintenance, event styling, clean shape updates or a polished salon finish.",
            },
            {
                title: "Colour and smoothing",
                description: "For balayage, grey coverage, toner, Brazilian smoothing and frizz-control treatments.",
            },
            {
                title: "Local salon visits",
                description: "For Hartbeespoort, Harties, Pretoria and Centurion clients who want a trusted salon menu before booking.",
            },
        ],
        serviceLinks: [
            { serviceSlug: "balayage", description: "Best for dimensional colour and soft blonding.", localHref: "/locations/hartbeespoort/balayage", localLabel: "Balayage in Hartbeespoort" },
            { serviceSlug: "brazilian-medium", description: "Best for smoothing, frizz control and easier styling." },
            { serviceSlug: "tint-roots", description: "Best for regrowth, grey coverage and colour maintenance." },
            { serviceSlug: "blow-medium", description: "Best for a polished salon finish before events or weekends." },
        ],
        areaLinks: DEFAULT_AREA_LINKS,
        decisionPrompt: "Start with the result you want, then choose the appointment that matches the amount of change, maintenance and finish you need.",
        decisionLinks: [
            { label: "Colour refresh", href: "/services/hair/balayage", description: "For balayage, tonal changes and a softer dimensional colour result." },
            { label: "Smoother styling", href: "/services/hair/brazilian-medium", description: "For frizz control, smoothing and easier day-to-day styling." },
            { label: "Everyday finish", href: "/services/hair/blow-medium", description: "For a polished blow-dry before events, weekends or regular maintenance." },
        ],
        reassurance: [
            { title: "Bring your goal", description: "Reference photos and your current hair history help the stylist plan the right route." },
            { title: "Plan enough time", description: "Colour and smoothing services usually need more time than a quick cut or blow-dry." },
        ],
    },
    nails: {
        heading: "Nail salon appointments for gel, acrylics, manicures and pedicures",
        body: "Compare gel nails, rubber base, acrylics, manicures, pedicures and nail art before choosing your appointment. This section is designed to help you find a nail service that suits your natural nails, lifestyle and preferred finish.",
        cards: [
            {
                title: "Durability and maintenance",
                description: "For clients comparing gel overlays, rubber base, fills and maintenance appointments.",
            },
            {
                title: "Natural nails and extensions",
                description: "For clients who want stronger natural nails, acrylic length, gel tips or a cleaner manicure routine.",
            },
            {
                title: "Hands and feet",
                description: "For manicures, pedicures, gel toes and polished event-ready nails.",
            },
        ],
        serviceLinks: [
            { serviceSlug: "gel-overlay-hands", description: "Best for neat, glossy gel on natural nails." },
            { serviceSlug: "rubber-base", description: "Best for flexible strengthening and natural nail support." },
            { serviceSlug: "acrylic-tips", description: "Best for added length and structure." },
            { serviceSlug: "pedicure-gel", description: "Best for longer-lasting polished feet." },
        ],
        areaLinks: DEFAULT_AREA_LINKS,
        decisionPrompt: "Choose by nail condition first, then by the finish you want to maintain between appointments.",
        decisionLinks: [
            { label: "Natural nail support", href: "/services/nails/rubber-base", description: "For flexible strength when your natural nails need extra support." },
            { label: "Neat gel finish", href: "/services/nails/gel-overlay-hands", description: "For glossy colour on your own nails without extra length." },
            { label: "Added length", href: "/services/nails/acrylic-tips", description: "For clients who want more structure, length or a reshaped set." },
        ],
        reassurance: [
            { title: "Maintenance matters", description: "Fills, soak-offs and repairs are easier when the first appointment matches your lifestyle." },
            { title: "Hands and feet", description: "Pair hand treatments with pedicures when you want one polished finish for an event or holiday." },
        ],
    },
    massages: {
        heading: "Massage therapy for relaxation, tension and recovery",
        body: "Choose a massage based on what your body needs most: relaxation, firmer pressure, targeted tension relief or a warmer spa-style reset. The options below help you compare Swedish, deep tissue, hot stone, aromatherapy and recovery-focused treatments.",
        cards: [
            {
                title: "Relaxation",
                description: "For full-body massage, Swedish massage, aromatherapy or a spa-style reset.",
            },
            {
                title: "Tension relief",
                description: "For back, neck, shoulder, deep tissue and sports massage when the goal is muscle relief.",
            },
            {
                title: "Spa-style comfort",
                description: "For Hartbeespoort and nearby clients comparing massage options, prices and appointment lengths.",
            },
        ],
        serviceLinks: [
            { serviceSlug: "full-body-massage", description: "Best for full-body relaxation and a complete reset.", localHref: "/locations/hartbeespoort/full-body-massage", localLabel: "Full body massage in Hartbeespoort" },
            { serviceSlug: "deep-tissue-60", description: "Best for firm pressure and muscle tension.", localHref: "/locations/hartbeespoort/deep-tissue-60", localLabel: "Deep tissue massage in Hartbeespoort" },
            { serviceSlug: "hot-stone-60", description: "Best for warmth, comfort and deeper relaxation." },
            { serviceSlug: "sports-massage-60", description: "Best for active clients and targeted recovery." },
        ],
        areaLinks: DEFAULT_AREA_LINKS,
        decisionPrompt: "Pick the session by pressure and purpose: calm relaxation, firmer muscle work, warmth or focused recovery.",
        decisionLinks: [
            { label: "Full-body reset", href: "/services/massages/full-body-massage", description: "For a complete relaxation session when you want broad full-body work." },
            { label: "Firm tension relief", href: "/services/massages/deep-tissue-60", description: "For tighter muscles, knots and a deeper pressure preference." },
            { label: "Warm comfort", href: "/services/massages/hot-stone-60", description: "For a soothing treatment where warmth is part of the relaxation." },
        ],
        reassurance: [
            { title: "Pressure can be adjusted", description: "Tell us whether you prefer lighter relaxation or firmer work before the treatment starts." },
            { title: "Focused sessions help", description: "If your concern is mainly shoulders, neck or back, a targeted appointment may be the better fit." },
        ],
    },
    waxing: {
        heading: "Professional waxing and hair removal in Hartbeespoort",
        body: "Compare intimate, facial and body waxing services in one place, then choose the appointment that matches the area you want treated. Our waxing menu focuses on hygiene, comfort and smooth results that last longer than daily shaving.",
        cards: [
            {
                title: "Intimate waxing",
                description: "For Brazilian, Hollywood, bikini and male waxing where comfort and hygiene matter most.",
            },
            {
                title: "Body waxing",
                description: "For legs, arms, underarms, back and full-body hair removal.",
            },
            {
                title: "Facial waxing",
                description: "For brows, lip, chin and full-face waxing where speed and neat shaping are important.",
            },
        ],
        serviceLinks: [
            { serviceSlug: "wax-hollywood", description: "Best for complete intimate waxing." },
            { serviceSlug: "wax-brazilian", description: "Best for a clean intimate wax with a chosen finish.", localHref: "/locations/hartbeespoort/wax-brazilian", localLabel: "Brazilian wax in Hartbeespoort" },
            { serviceSlug: "wax-men-back", description: "Best for men's back waxing and body grooming." },
            { serviceSlug: "wax-full-leg", description: "Best for longer-lasting smooth legs." },
        ],
        areaLinks: DEFAULT_AREA_LINKS,
        decisionPrompt: "Choose the body area first, then select how much hair you want removed and how much privacy or preparation you prefer.",
        decisionLinks: [
            { label: "Brazilian wax", href: "/services/waxing/wax-brazilian", description: "For intimate waxing with a chosen finish rather than complete removal." },
            { label: "Hollywood wax", href: "/services/waxing/wax-hollywood", description: "For complete intimate waxing with hygiene and comfort front of mind." },
            { label: "Body waxing", href: "/services/waxing/wax-full-leg", description: "For legs, underarms, arms, back or other body-area maintenance." },
        ],
        reassurance: [
            { title: "Hygiene first", description: "Waxing appointments are planned around cleanliness, privacy and a calm treatment room." },
            { title: "Prep helps comfort", description: "Arriving with enough hair growth and avoiding fresh irritation helps the appointment go smoothly." },
        ],
    },
    "lashes-brows": {
        heading: "Lash extensions, lash lifts and brow treatments in Hartbeespoort",
        body: "Choose from lash extensions, lash lifts, tinting and brow treatments based on how much definition you want and how much maintenance suits your routine. The options below help you compare fuller extensions, lifted natural lashes and polished brow shaping.",
        cards: [
            {
                title: "Lash extensions",
                description: "For classic, hybrid and volume lashes where fullness, mapping and natural lash health matter.",
            },
            {
                title: "Natural lash enhancements",
                description: "For lash lift, tint and low-maintenance eye definition.",
            },
            {
                title: "Brow shaping",
                description: "For brow tint, brow lamination and tidy everyday brow maintenance.",
            },
        ],
        serviceLinks: [
            { serviceSlug: "classic-lashes", description: "Best for softer, natural-looking lash extensions.", localHref: "/locations/hartbeespoort/classic-lashes", localLabel: "Classic lashes in Hartbeespoort" },
            { serviceSlug: "hybrid-lashes", description: "Best for a fuller but still wearable lash look." },
            { serviceSlug: "lash-lift-tint", description: "Best for lifted natural lashes without extensions.", localHref: "/locations/hartbeespoort/lash-lift-tint", localLabel: "Lash lift and tint in Hartbeespoort" },
            { serviceSlug: "brow-lamination", description: "Best for fuller-looking, neater brows." },
        ],
        areaLinks: DEFAULT_AREA_LINKS,
        decisionPrompt: "Decide how much daily maintenance you want: extensions for fullness, lifts for natural lashes, and brow treatments for cleaner shape.",
        decisionLinks: [
            { label: "Soft extensions", href: "/services/lashes-brows/classic-lashes", description: "For a natural lash-extension look with lighter fullness." },
            { label: "Natural lash lift", href: "/services/lashes-brows/lash-lift-tint", description: "For lifted lashes without extension maintenance." },
            { label: "Brow shape", href: "/services/lashes-brows/brow-lamination", description: "For neater, fuller-looking brows that frame the face." },
        ],
        reassurance: [
            { title: "Match your routine", description: "Your technician can help you choose a look that fits your natural lashes and maintenance habits." },
            { title: "Comfort and mapping", description: "Lash and brow appointments are planned around comfort, symmetry and a wearable finish." },
        ],
    },
    ipl: {
        heading: "IPL hair removal and tattoo removal options",
        body: "Choose an IPL or tattoo-removal treatment based on the area you want treated and the result you want to work toward. This menu covers longer-term hair reduction for face and body, plus tattoo fading options for unwanted ink.",
        cards: [
            {
                title: "Hair reduction",
                description: "For longer-term hair reduction, ingrown-hair support and lower-maintenance grooming.",
            },
            {
                title: "Face and body areas",
                description: "For Brazilian IPL, facial IPL, underarm IPL and leg treatments.",
            },
            {
                title: "Tattoo removal",
                description: "For clients comparing tattoo fading, number of sessions and laser-style removal options.",
            },
        ],
        serviceLinks: [
            { serviceSlug: "ipl-brazilian", description: "Best for longer-term intimate-area hair reduction." },
            { serviceSlug: "ipl-full-face", description: "Best for facial hair reduction plans." },
            { serviceSlug: "ipl-underarm", description: "Best for lower-maintenance underarms." },
            { serviceSlug: "tattoo-removal", description: "Best for fading unwanted ink.", localHref: "/locations/hartbeespoort/tattoo-removal", localLabel: "Tattoo removal in Hartbeespoort" },
        ],
        areaLinks: DEFAULT_AREA_LINKS,
        decisionPrompt: "Choose by area, skin comfort and the number of sessions you are prepared to plan around.",
        decisionLinks: [
            { label: "Intimate-area IPL", href: "/services/ipl/ipl-brazilian", description: "For longer-term hair reduction in intimate areas." },
            { label: "Facial IPL", href: "/services/ipl/ipl-full-face", description: "For face-area hair reduction where consistency matters." },
            { label: "Tattoo fading", href: "/services/ipl/tattoo-removal", description: "For unwanted ink where gradual fading is the goal." },
        ],
        reassurance: [
            { title: "Suitability first", description: "Treatment choice should consider skin, hair colour, comfort and expected session planning." },
            { title: "Courses take time", description: "IPL and tattoo fading are usually planned as a series rather than a once-off result." },
        ],
    },
    "permanent-makeup": {
        heading: "Permanent makeup, microblading and brow tattoo services",
        body: "Explore semi-permanent brow, lip and eyeliner treatments for a more polished look with less daily makeup. The options below help you compare microblading, powder brows, hybrid brows, lip colour and eyeliner services.",
        cards: [
            {
                title: "Brow enhancement",
                description: "For microblading, powder brows and hybrid brows where shape and natural-looking definition matter.",
            },
            {
                title: "Lip and liner",
                description: "For permanent lip colour, liner and eyeliner treatments with a specialist finish.",
            },
            {
                title: "Low-maintenance beauty",
                description: "For clients who want daily makeup time reduced without looking harsh or overdone.",
            },
        ],
        serviceLinks: [
            { serviceSlug: "microblading", description: "Best for fine brow strokes and natural-looking fullness.", localHref: "/locations/hartbeespoort/microblading", localLabel: "Microblading in Hartbeespoort" },
            { serviceSlug: "powderpixel-brows", description: "Best for a softly shaded brow finish." },
            { serviceSlug: "hybrid-brows", description: "Best for combining structure and softness." },
            { serviceSlug: "eyeliner-top", description: "Best for more defined eyes with less daily makeup." },
        ],
        areaLinks: DEFAULT_AREA_LINKS,
    },
    "hart-aesthetics": {
        heading: "Aesthetic injections, fillers and anti-aging treatments",
        body: "Explore injectable and advanced aesthetic treatments for softening expression lines, restoring volume and refreshing your features without changing what makes your face yours. Each option is planned around natural-looking balance and suitability.",
        cards: [
            {
                title: "Wrinkles and expression lines",
                description: "For anti-wrinkle and tox-per-unit appointments where conservative planning matters.",
            },
            {
                title: "Volume and contour",
                description: "For lip filler, dermal filler, cheek filler and Russian lip treatments.",
            },
            {
                title: "Lift and rejuvenation",
                description: "For Nefertiti lift, liquid facelift and natural-looking refresh treatments.",
            },
        ],
        serviceLinks: [
            { serviceSlug: "tox-per-unit", description: "Best for anti-wrinkle treatment planning." },
            { serviceSlug: "lip-filler-1ml", description: "Best for lip volume and shape.", localHref: "/locations/hartbeespoort/lip-filler-1ml", localLabel: "Lip filler in Hartbeespoort" },
            { serviceSlug: "dermal-filler-1ml", description: "Best for targeted facial volume." },
            { serviceSlug: "nefertiti-lift", description: "Best for jawline and neck refinement." },
        ],
        areaLinks: DEFAULT_AREA_LINKS,
        decisionPrompt: "Start with the concern you want to improve, then choose the treatment after suitability, shape and downtime have been considered.",
        decisionLinks: [
            { label: "Expression lines", href: "/services/hart-aesthetics/tox-per-unit", description: "For conservative anti-wrinkle planning around movement and expression." },
            { label: "Lip shape", href: "/services/hart-aesthetics/lip-filler-1ml", description: "For lip volume, hydration and definition with a balanced finish." },
            { label: "Facial volume", href: "/services/hart-aesthetics/dermal-filler-1ml", description: "For targeted contour and volume support where suitable." },
        ],
        reassurance: [
            { title: "Natural-looking planning", description: "Advanced appointments should prioritise balance, suitability and realistic expectations." },
            { title: "Ask before booking", description: "If you are unsure which treatment fits your concern, contact the salon before choosing." },
        ],
    },
    "fat-freezing": {
        heading: "Fat freezing and body contouring for stubborn areas",
        body: "Compare non-surgical body contouring options for stubborn areas such as the tummy, waist, thighs and love handles. The menu below helps you choose between single-session and multi-cup fat-freezing treatments based on the areas you want to target.",
        cards: [
            {
                title: "Stubborn areas",
                description: "For clients targeting belly, waist, thighs, love handles or other gym-resistant pockets.",
            },
            {
                title: "Non-surgical contouring",
                description: "For fat freezing, cryolipolysis and shape refinement without downtime.",
            },
            {
                title: "Course planning",
                description: "For clients deciding between one session, two cups, four cups and repeat appointments.",
            },
        ],
        serviceLinks: [
            { serviceSlug: "fat-freezing-session", description: "Best for starting a targeted contouring plan.", localHref: "/locations/hartbeespoort/fat-freezing-session", localLabel: "Fat freezing in Hartbeespoort" },
            { serviceSlug: "fat-freezing-2-cups", description: "Best for treating paired or medium-sized areas." },
            { serviceSlug: "fat-freezing-4-cups", description: "Best for larger or multi-area contouring." },
            { serviceSlug: "ems-single", description: "Best for adding toning support where suitable." },
        ],
        areaLinks: DEFAULT_AREA_LINKS,
    },
    dermalogica: {
        heading: "Dermalogica facials, peels and skin treatment planning",
        body: "Choose a professional skin treatment based on your main concern, whether that is breakouts, congestion, pigmentation, texture, dullness or hydration. This menu brings Dermalogica facials, peels, microneedling and dermaplaning into one clear treatment guide.",
        cards: [
            {
                title: "Breakouts and congestion",
                description: "For acne, clogged pores, deep cleansing and Pro Clear treatments.",
            },
            {
                title: "Texture and pigmentation",
                description: "For chemical peels, microneedling, dermaplaning and skin-renewal treatments.",
            },
            {
                title: "Glow and maintenance",
                description: "For facials, hydration, dull skin and ongoing professional skincare.",
            },
        ],
        serviceLinks: [
            { serviceSlug: "pro-skin-60", description: "Best for a customized professional facial." },
            { serviceSlug: "pro-clear", description: "Best for breakout-prone and congested skin." },
            { serviceSlug: "pro-microneedling", description: "Best for texture, marks and collagen support." },
            { serviceSlug: "hydraderm", description: "Best for hydration and glow-focused skin work." },
        ],
        areaLinks: DEFAULT_AREA_LINKS,
        decisionPrompt: "Choose the treatment by skin concern first, then by how much intensity, downtime or maintenance you are ready for.",
        decisionLinks: [
            { label: "Breakout support", href: "/services/dermalogica/pro-clear", description: "For congestion, breakouts and a clearer-skin treatment plan." },
            { label: "Texture work", href: "/services/dermalogica/pro-microneedling", description: "For texture, post-breakout marks and collagen-support goals." },
            { label: "Hydration and glow", href: "/services/dermalogica/hydraderm", description: "For dull, dehydrated or tired-looking skin." },
        ],
        reassurance: [
            { title: "Concern-led choices", description: "Skin treatments work best when they are matched to your current skin condition." },
            { title: "Consistency counts", description: "Maintenance facials and home care usually matter as much as one intensive appointment." },
        ],
    },
    medical: {
        heading: "Clinical skin, laser and advanced treatments",
        body: "Explore advanced treatments that usually need more planning than a standard salon appointment, including fractional laser, Plasmage, IV drip and intimate rejuvenation options. We recommend choosing these services with suitability, downtime and expected results in mind.",
        cards: [
            {
                title: "Skin resurfacing",
                description: "For fractional laser and skin-renewal treatments where downtime and suitability matter.",
            },
            {
                title: "Advanced lifting",
                description: "For Plasmage and selected non-surgical tightening treatments.",
            },
            {
                title: "Wellness and intimate treatments",
                description: "For IV drip and vaginal tightening enquiries that need clear, private treatment information.",
            },
        ],
        serviceLinks: [
            { serviceSlug: "fractional-laser", description: "Best for texture, scarring and resurfacing.", localHref: "/locations/hartbeespoort/fractional-laser", localLabel: "Fractional laser in Hartbeespoort" },
            { serviceSlug: "plasmage", description: "Best for selected non-surgical tightening concerns." },
            { serviceSlug: "iv-drip", description: "Best for wellness-focused treatment enquiries." },
            { serviceSlug: "vaginal-tightening", description: "Best for private intimate rejuvenation enquiries." },
        ],
        areaLinks: DEFAULT_AREA_LINKS,
    },
};

export function getCategoryHubSeoContent(categoryId: string): CategoryHubSeoContent | undefined {
    return CATEGORY_HUB_SEO_CONTENT[categoryId];
}
