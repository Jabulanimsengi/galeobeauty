import { getCategoryById, serviceCategories, type ServiceCategory, type ServiceItem } from "./services-data";
import { getCachedSEOServices, type FAQ, type SEOService, type TreatmentStep } from "./seo-data";

export interface BespokeServiceVariant {
    serviceSlug: string;
    summary: string;
    bestFor?: string;
}

export interface BespokeServiceVariantGroup {
    title: string;
    description: string;
    variants: BespokeServiceVariant[];
}

export interface BespokeServicePage {
    slug: string;
    categoryId: string;
    title: string;
    heroTitle: string;
    metaTitle: string;
    metaDescription: string;
    heroIntro: string;
    heroBody: string;
    image: string;
    imageAlt: string;
    bookingMessage: string;
    consultationLabel: string;
    focusTagsTitle: string;
    focusTags: string[];
    sectionIntroTitle: string;
    sectionIntroBody: string;
    comparisonTitle: string;
    benefitsTitle: string;
    benefits: string[];
    processTitle: string;
    ctaTitle: string;
    ctaBody: string;
    faqs: FAQ[];
    treatmentProcess: TreatmentStep[];
    variantGroups: BespokeServiceVariantGroup[];
    includedServiceSlugs: string[];
    relatedServiceSlugs?: string[];
}

export interface BespokeServiceVariantDetail extends BespokeServiceVariant {
    service: SEOService;
    item: ServiceItem;
}

export interface ResolvedBespokeServicePage extends BespokeServicePage {
    category: ServiceCategory;
    variantGroups: Array<{
        title: string;
        description: string;
        variants: BespokeServiceVariantDetail[];
    }>;
    includedServices: SEOService[];
}

const bespokeServicePages: BespokeServicePage[] = [
    {
        slug: "hair-colour",
        categoryId: "hair",
        title: "Hair Colour",
        heroTitle: "Hair Colour In Hartbeespoort",
        metaTitle: "Hair Colour, Foils And Toners | Galeo Beauty",
        metaDescription:
            "Bespoke hair colour in Hartbeespoort. Compare root tint, full tint, foils, balayage and toner options by goal, hair length, timing and price before you book.",
        heroIntro:
            "Hair colour should be chosen by outcome, maintenance level and hair length, not by guessing from a price list. This page brings our tint, foil, balayage and toner options into one place so you can see what each service is for and where the pricing changes.",
        heroBody:
            "If you are covering regrowth, refreshing an all-over shade, brightening with foils, softening brassiness or booking balayage, the real choice usually comes down to how much change you want, how visible the grow-out should be and how much hair we are working through. That is why the service options below are grouped by colour job first, then by hair length where relevant.",
        image: "/images/gallery/hair/brunette-curls-hair-styling-blowout-results.jpg",
        imageAlt: "Hair colour and finishing results at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Hair Colour page on galeobeauty.com. I want help choosing the right colour service for my hair length and result. Can you guide me?",
        consultationLabel: "Ask About Hair Colour",
        focusTagsTitle: "Popular colour goals",
        focusTags: ["Grey coverage", "Solid all-over colour", "Dimensional highlights", "Low-maintenance balayage", "Brassiness correction"],
        sectionIntroTitle: "Choosing The Right Colour Service",
        sectionIntroBody:
            "Start with the result you want, not the product name. If the issue is regrowth, root tint is usually the right starting point. If you want one even shade through the whole head, look at full tint. If you want brightness and dimension, compare foils and balayage. If the colour is already there but the tone has shifted, toner is often the more relevant service.",
        comparisonTitle: "Compare Hair Colour Options",
        benefitsTitle: "What This Hair Colour Menu Helps You Compare",
        benefits: [
            "You can see the difference between regrowth coverage, all-over colour, foils, balayage and toner without guessing from service names alone.",
            "Length-based pricing is grouped under the relevant service type, so short, medium, long and extra-long differences are easier to understand.",
            "The page helps you decide whether you need a solid-colour appointment, a dimensional lightening service or simply a tone refresh.",
            "It makes maintenance clearer by showing which options usually grow out softer and which need more frequent upkeep.",
            "You can message the salon with a more specific brief because the colour paths are laid out in a practical way.",
        ],
        processTitle: "What To Expect During A Hair Colour Appointment",
        ctaTitle: "Ready To Choose The Right Hair Colour Service?",
        ctaBody:
            "Message Galeo Beauty with your hair length, current colour and target result, and we can point you to the most relevant option.",
        faqs: [
            {
                question: "What is the difference between root tint and full tint?",
                answer:
                    "Root tint is usually the better fit when the main issue is regrowth or grey coverage close to the scalp. Full tint is for all-over colour from roots through the rest of the hair, so it suits a broader shade refresh or complete colour change.",
            },
            {
                question: "When are foils better than a full tint?",
                answer:
                    "Foils are usually chosen when you want dimension, brightness or visible contrast through selected sections rather than one uniform shade all over. Full tint is more of a solid-colour service, while foils create a lighter or more multi-tonal result.",
            },
            {
                question: "Where does balayage fit compared with highlights?",
                answer:
                    "Balayage is generally the softer, more lived-in option with a more diffused grow-out. Traditional foils are often the better choice when you want lift that starts closer to the root or a brighter, more structured highlight result.",
            },
            {
                question: "Why does hair length change the price?",
                answer:
                    "Longer and thicker hair usually means more product, more sectioning and more appointment time. That is why several colour services are listed by short, medium, long and extra-long hair rather than pretending every head of hair takes the same work.",
            },
            {
                question: "Is toner a standalone service or an add-on?",
                answer:
                    "A toner can be a useful standalone refresh when the main issue is unwanted warmth, dullness or faded tone. In other cases it works best after lightening or highlighting, so the right answer depends on what your hair currently looks like.",
            },
        ],
        treatmentProcess: [
            {
                step: 1,
                title: "Colour Goal And Hair Assessment",
                description:
                    "We start by checking what you want to change, what your current colour history looks like and how much hair we are working with. This is where we separate a root refresh from a full tint, foils, balayage or a tone correction.",
                duration: "10-15 min",
            },
            {
                step: 2,
                title: "Service Match And Section Planning",
                description:
                    "Once the goal is clear, we match you to the right colour family and confirm whether your pricing falls under short, medium, long or extra-long hair. If your hair needs more than a straightforward refresh, we can talk through the more corrective options before we start.",
                duration: "10 min",
            },
            {
                step: 3,
                title: "Application",
                description:
                    "Your selected colour service is applied using the technique that matches the result: regrowth coverage, all-over tint, sectioned foils, balayage placement or toner work. Timing depends on the service you choose and how much hair is involved.",
                duration: "Varies by option",
            },
            {
                step: 4,
                title: "Rinse, Tone And Finish",
                description:
                    "After processing, we rinse out the colour, refine the tone where needed and finish the hair so you can actually see the result clearly. This is the stage where shine, softness and the final colour balance come together.",
                duration: "20-30 min",
            },
            {
                step: 5,
                title: "Maintenance Advice",
                description:
                    "Before you leave, we help you understand what kind of maintenance the result will need, whether the grow-out will be soft or high maintenance, and when to come back for your next refresh.",
                duration: "5 min",
            },
        ],
        variantGroups: [
            {
                title: "Regrowth And Full Colour",
                description:
                    "These are the services to look at when your main goal is covering regrowth, refreshing one all-over shade or booking a full tint that scales with hair length.",
                variants: [
                    {
                        serviceSlug: "tint-roots",
                        summary: "A focused regrowth service for grey coverage or root maintenance without recolouring the full length every time.",
                        bestFor: "Existing colour clients who mainly need regrowth coverage.",
                    },
                    {
                        serviceSlug: "tint-short",
                        summary: "Full all-over colour for shorter lengths when the goal is one even shade and a cleaner overall refresh.",
                        bestFor: "Short hair that needs solid colour rather than highlights.",
                    },
                    {
                        serviceSlug: "tint-medium",
                        summary: "Full tint for medium hair where more product and sectioning are needed than a short cut.",
                        bestFor: "Shoulder-length hair needing complete colour coverage.",
                    },
                    {
                        serviceSlug: "tint-long",
                        summary: "A full-colour service for longer lengths where the job extends well beyond a simple root refresh.",
                        bestFor: "Long hair needing even colour from roots through the length.",
                    },
                    {
                        serviceSlug: "tint-xl",
                        summary: "The most comprehensive full tint option for extra-long hair, with extra time built in for product saturation and application.",
                        bestFor: "Very long or very dense hair that needs a full-colour service.",
                    },
                ],
            },
            {
                title: "Foils And Balayage",
                description:
                    "These options suit clients who want dimension, lightness or a more visible colour design rather than a single solid tint all over.",
                variants: [
                    {
                        serviceSlug: "highlights-half-short",
                        summary: "A lighter top-section refresh for short hair when you want brightness around the visible layers without doing the full head.",
                        bestFor: "Short hair that needs a lighter refresh through the crown and top.",
                    },
                    {
                        serviceSlug: "highlights-half-medium",
                        summary: "Half-head foils for medium hair when the front and top need more lightness but a full foil service is not necessary.",
                        bestFor: "Medium hair needing a maintenance highlight refresh.",
                    },
                    {
                        serviceSlug: "highlights-half-long",
                        summary: "A softer long-hair foil service focused on the most visible sections, often chosen for a sun-kissed lift.",
                        bestFor: "Long hair clients not ready for a full-head foil appointment.",
                    },
                    {
                        serviceSlug: "highlights-half-xl",
                        summary: "Half-head foils adapted for extra-long hair where more time is still needed even for a partial highlight service.",
                        bestFor: "Extra-long hair needing strategic brightness through the visible sections.",
                    },
                    {
                        serviceSlug: "highlights-full-short",
                        summary: "Full-head foils for short hair when the goal is overall brightness and full highlight coverage.",
                        bestFor: "Short cuts that need a stronger all-over highlighted effect.",
                    },
                    {
                        serviceSlug: "highlights-full-medium",
                        summary: "A complete foil service for medium hair, suited to clients who want a more noticeable dimensional result.",
                        bestFor: "Medium hair needing brighter or more complete highlight coverage.",
                    },
                    {
                        serviceSlug: "highlights-full-long",
                        summary: "A longer, fuller foil appointment designed for long hair where brightness needs to run through the full head.",
                        bestFor: "Long hair clients wanting a fuller highlighted transformation.",
                    },
                    {
                        serviceSlug: "highlights-full-xl",
                        summary: "The most extensive foil option for extra-long hair, where full-head lightening takes more time and section work.",
                        bestFor: "Extra-long hair needing a high-impact highlight result.",
                    },
                    {
                        serviceSlug: "balayage",
                        summary: "Freehand colour placement for a softer, more diffused result with a more forgiving grow-out than traditional highlights.",
                        bestFor: "Clients who want a lived-in colour result rather than visible root-to-tip foil structure.",
                    },
                    {
                        serviceSlug: "foil-per",
                        summary: "A per-foil option that works when only a few targeted placements are needed rather than a full defined foil service.",
                        bestFor: "Smaller corrective or highly targeted foil work.",
                    },
                ],
            },
            {
                title: "Toners And Shade Refinement",
                description:
                    "These services are for refining warmth, brassiness or faded colour tone. The right option still depends on hair length because the amount of hair being refined changes the time and product used.",
                variants: [
                    {
                        serviceSlug: "toner-short",
                        summary: "A shorter-length toner service for refining warmth and restoring a cleaner tone on short hair.",
                        bestFor: "Short blondes or lightened hair needing a tone refresh.",
                    },
                    {
                        serviceSlug: "toner-medium",
                        summary: "Tone refinement for medium-length hair when the issue is more about colour balance than a new full colour service.",
                        bestFor: "Medium hair with brassiness or faded salon tone.",
                    },
                    {
                        serviceSlug: "toner-long",
                        summary: "A longer-hair toner service for restoring a cleaner, glossier shade after fading or unwanted warmth sets in.",
                        bestFor: "Long hair needing shade correction more than a full recolour.",
                    },
                    {
                        serviceSlug: "toner-xl",
                        summary: "The extra-long toner option for clients with more hair to refine and gloss over.",
                        bestFor: "Extra-long hair that needs a full tone refresh without a major colour change.",
                    },
                ],
            },
        ],
        includedServiceSlugs: [
            "tint-roots",
            "tint-short",
            "tint-medium",
            "tint-long",
            "tint-xl",
            "foil-per",
            "highlights-full-short",
            "highlights-full-medium",
            "highlights-full-long",
            "highlights-full-xl",
            "highlights-half-short",
            "highlights-half-medium",
            "highlights-half-long",
            "highlights-half-xl",
            "balayage",
            "toner-short",
            "toner-medium",
            "toner-long",
            "toner-xl",
        ],
        relatedServiceSlugs: ["brazilian-short", "brazilian-medium", "brazilian-long", "keratin", "botox"],
    },
    {
        slug: "brazilian-blowout",
        categoryId: "hair",
        title: "Brazilian Blowout",
        heroTitle: "Brazilian Blowout And Smoothing Treatments In Hartbeespoort",
        metaTitle: "Brazilian Blowout And Keratin Treatments | Galeo Beauty",
        metaDescription:
            "Compare Brazilian Blowout, keratin, hair botox and chemical straightening in Hartbeespoort. See which smoothing option suits your length, texture and finish.",
        heroIntro:
            "Smoothing treatments are not all trying to do the same job. Some are aimed at frizz reduction and easier styling, while others push further toward a straighter or more controlled finish.",
        heroBody:
            "If your hair is swelling in humidity, taking too long to blow-dry or feeling rough through the lengths, this page helps you compare the smoothing family properly. Start with the result you want, then look at the length-based Brazilian options and the other treatments that sit alongside them.",
        image: "/images/gallery/hair/brunette-curls-hair-styling-blowout-results.jpg",
        imageAlt: "Smooth glossy hair results at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Brazilian Blowout page on galeobeauty.com. I want help choosing the right smoothing treatment for my hair length and texture. Can you guide me?",
        consultationLabel: "Ask About Smoothing Treatments",
        focusTagsTitle: "Popular smoothing goals",
        focusTags: ["Frizz reduction", "Humidity control", "Faster styling", "Smoother lengths", "Straighter finish"],
        sectionIntroTitle: "Choosing The Right Smoothing Service",
        sectionIntroBody:
            "If the goal is a smoother blow-dry and easier day-to-day styling, Brazilian Blowout is usually the first thing to compare by hair length. Keratin and hair botox can come in when the focus shifts toward repair, softness or strengthening. Chemical straightening is the stronger option when someone wants a more committed straightening result rather than general smoothing alone.",
        comparisonTitle: "Compare Smoothing Options",
        benefitsTitle: "What This Smoothing Menu Helps You Compare",
        benefits: [
            "You can compare Brazilian Blowout pricing by hair length without losing sight of the bigger treatment decision.",
            "The page separates softer smoothing options from more structural straightening choices.",
            "It helps clarify whether the goal is frizz control, repair, softness or a straighter finish.",
            "Timing differences are easier to understand because short, medium, long and extra-long hair are grouped together properly.",
            "Clients can book with clearer expectations about upkeep, finish and maintenance.",
        ],
        processTitle: "What To Expect During A Smoothing Appointment",
        ctaTitle: "Ready To Choose The Right Smoothing Treatment?",
        ctaBody:
            "Send your hair length, texture and biggest frustration on WhatsApp, and the salon can point you toward the treatment that makes the most sense.",
        faqs: [
            {
                question: "What is the difference between a Brazilian Blowout and keratin treatment?",
                answer:
                    "A Brazilian Blowout is usually chosen for smoother styling, reduced frizz and more manageable hair, especially when the service is priced by length. Keratin often comes up when clients also want more strengthening and softness, so the better fit depends on whether styling ease or restorative support matters more.",
            },
            {
                question: "Why is Brazilian Blowout listed by hair length?",
                answer:
                    "Hair length changes how much product is needed, how much sectioning is required and how long the service takes. That is why the short, medium, long and extra-long versions are shown separately instead of pretending every smoothing appointment is the same size job.",
            },
            {
                question: "When is hair botox more relevant?",
                answer:
                    "Hair botox is often asked about when the hair feels dry, rough or overworked and the client wants a softer, more conditioned result. It can sit slightly differently from a straightening-led appointment because the goal is often better hair quality as much as smoother styling.",
            },
            {
                question: "Is chemical straightening the same as a Brazilian Blowout?",
                answer:
                    "No. Chemical straightening is usually the stronger, more structural option. A Brazilian Blowout is more commonly chosen for manageability, frizz control and smoother finishing, while chemical straightening is for someone deliberately moving closer to a straight result.",
            },
            {
                question: "How do I know which smoothing option to book first?",
                answer:
                    "Start with the result you want most. If the main complaint is frizz and difficult styling, compare the Brazilian options first. If the hair feels damaged and needs softness, keratin or botox may make more sense. If your aim is a more committed straightening result, chemical straightening is the better conversation to have.",
            },
        ],
        treatmentProcess: [
            { step: 1, title: "Hair Assessment And Goal Setting", description: "We start by looking at your current texture, density, damage level and how you usually wear your hair. That helps us separate a smoothing appointment from a stronger straightening or restorative treatment.", duration: "10-15 min" },
            { step: 2, title: "Service Match By Hair Length", description: "Once the treatment family is clear, we confirm whether your pricing falls under short, medium, long or extra-long hair. This matters because product use and appointment time both scale with length and density.", duration: "5-10 min" },
            { step: 3, title: "Treatment Application", description: "The smoothing formula is applied in sections and worked through methodically so the hair is evenly covered from the areas that need the most control through the rest of the length.", duration: "Varies by option" },
            { step: 4, title: "Processing And Sealing", description: "After processing, the treatment is dried and sealed into the hair according to the service being performed. This is the stage that locks in the smoother finish and helps determine the final feel and movement.", duration: "30-45 min" },
            { step: 5, title: "Finish And Homecare Advice", description: "Before you leave, we explain what to expect from the result, how to maintain it at home and when to come back if you want to keep the finish consistent.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Brazilian Blowout By Hair Length",
                description: "These are the core smoothing services when the goal is easier styling, less frizz and a more polished finish. The main difference here is the amount of hair being treated.",
                variants: [
                    { serviceSlug: "brazilian-short", summary: "Brazilian Blowout for shorter lengths where the goal is smoother styling and less frizz without a long appointment window.", bestFor: "Short hair needing a cleaner, easier finish." },
                    { serviceSlug: "brazilian-medium", summary: "A medium-length smoothing appointment with more time built in for coverage through the full head.", bestFor: "Shoulder-length hair needing more control and polish." },
                    { serviceSlug: "brazilian-long", summary: "Brazilian Blowout for long hair where the focus is usually humidity control, smoother styling and less daily effort.", bestFor: "Long hair that puffs, frizzes or feels hard to manage." },
                    { serviceSlug: "brazilian-xl", summary: "The extra-long version for thicker or very long hair that needs the same smoothing result across a larger amount of hair.", bestFor: "Extra-long or dense hair needing full smoothing coverage." },
                ],
            },
            {
                title: "Supportive Smoothing And Straightening Options",
                description: "These services sit next to Brazilian Blowout when the hair needs a slightly different outcome, such as more restorative support or a stronger straightening direction.",
                variants: [
                    { serviceSlug: "keratin", summary: "A smoothing and strengthening option often considered when softness and repair matter alongside frizz control.", bestFor: "Dry or damaged hair that also needs better manageability." },
                    { serviceSlug: "botox", summary: "Hair botox is generally chosen when the hair needs a softer, more conditioned finish rather than a purely sleek result.", bestFor: "Hair that feels rough, tired or overprocessed." },
                    { serviceSlug: "chem-straight", summary: "A stronger straightening option for clients who want a more committed reduction in curl or movement.", bestFor: "Clients aiming for a straighter result rather than just smoother styling." },
                ],
            },
        ],
        includedServiceSlugs: ["brazilian-short", "brazilian-medium", "brazilian-long", "brazilian-xl", "keratin", "botox", "chem-straight"],
        relatedServiceSlugs: ["cut-blow-long", "cut-blow-xl", "tint-roots", "tint-long", "balayage"],
    },
    {
        slug: "lash-extensions",
        categoryId: "lashes-brows",
        title: "Lash Extensions",
        heroTitle: "Lash Extensions In Hartbeespoort",
        metaTitle: "Classic, Hybrid And Volume Lashes | Galeo Beauty",
        metaDescription:
            "Compare classic, hybrid, volume, glamour and silk lash extensions in Hartbeespoort, plus fills and lash removal, on one bespoke service page.",
        heroIntro:
            "Lash extensions are easier to choose when you compare the look, density and maintenance level side by side instead of guessing from the names alone.",
        heroBody:
            "This page groups our extension styles, fills and removal into one lash family so you can understand which option gives a softer everyday finish, which one adds more fluff or drama, and what happens once you move into maintenance.",
        image: "/images/gallery/lashes-brows/hybrid-lashes-with-defined-eyebrows.png",
        imageAlt: "Lash extension results at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Lash Extensions page on galeobeauty.com. I want help choosing the right lash set or fill. Can you guide me?",
        consultationLabel: "Ask About Lash Extensions",
        focusTagsTitle: "Popular lash goals",
        focusTags: ["Natural definition", "Textured fullness", "Fluffier volume", "Drama for events", "Maintenance fills"],
        sectionIntroTitle: "Choosing The Right Lash Set",
        sectionIntroBody:
            "Start with the look you want to wear every day. If you want cleaner and lighter definition, compare classic and silk styles first. If you want a fuller textured set, hybrid is often the stronger comparison. If the goal is more density and impact, move toward volume and glamour. Fills and removal come in once you are maintaining or resetting an existing set.",
        comparisonTitle: "Compare Lash Extension Options",
        benefitsTitle: "What This Lash Extension Menu Helps You Compare",
        benefits: [
            "You can compare lash styles by finish and fullness instead of only by service name.",
            "It separates full sets from maintenance fills so the booking choice is clearer.",
            "The page helps you understand when a softer style is enough and when a fuller set is the better fit.",
            "It makes the maintenance side of extensions more visible before you commit.",
            "Clients can book a set that matches their everyday look instead of only chasing the fullest option.",
        ],
        processTitle: "What To Expect During A Lash Appointment",
        ctaTitle: "Ready To Choose The Right Lash Set?",
        ctaBody:
            "Send us the look you want, whether you already have lashes on, and whether you prefer soft, textured or fuller volume. We can point you to the most relevant set or fill.",
        faqs: [
            { question: "What is the difference between classic, hybrid and volume lashes?", answer: "Classic lashes are usually the cleanest and lightest-looking option. Hybrid adds more texture and visible fullness by mixing techniques. Volume is for clients who want a fluffier, denser result. The right one depends on how much definition you want to see day to day." },
            { question: "When should I choose glamour lashes?", answer: "Glamour lashes are usually the better fit when you want a more dramatic, higher-impact result than a standard volume or hybrid set. They suit clients who prefer a bolder lash look or are booking around an event." },
            { question: "How do I know if I need a fill or a new set?", answer: "A fill makes sense when you still have enough healthy extension coverage left and mainly need to refresh gaps. If retention is very low, the set has grown out unevenly or you want a different style altogether, starting fresh may be the better move." },
            { question: "Is lash removal worth booking separately?", answer: "Yes, if the set needs to come off safely without damaging the natural lashes. Removal is also useful when you want to switch styles, reset after poor retention or take a break from extensions altogether." },
            { question: "Which lash set looks the most natural?", answer: "Classic and silk styles are usually the first options to compare for a softer everyday finish. The most natural choice depends on your own lashes, eye shape and how noticeable you want the result to be." },
        ],
        treatmentProcess: [
            { step: 1, title: "Style Consultation", description: "We start by talking through the finish you want, whether you wear lashes every day or only for occasions, and whether you are booking a fresh set, a fill or a removal.", duration: "5-10 min" },
            { step: 2, title: "Eye And Lash Prep", description: "The natural lashes are cleaned and prepped so the application area is ready and the set can be applied as cleanly and evenly as possible.", duration: "10 min" },
            { step: 3, title: "Application Or Fill", description: "The selected set is applied with the density and style that fits your brief, or existing lashes are refreshed in the case of a fill. Timing varies depending on how full the look is and whether it is a new set or maintenance appointment.", duration: "Varies by option" },
            { step: 4, title: "Final Check And Finish", description: "Once the lashes are complete, we check balance, direction and overall finish so the set reads the way it was intended from both a close-up and everyday distance.", duration: "5-10 min" },
            { step: 5, title: "Aftercare And Maintenance Advice", description: "Before you go, we explain how to care for the set, when to book a fill and what to avoid if you want the extensions to wear as well as possible.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Full Sets",
                description: "These are the options to compare when you are booking a fresh extension set and want to choose the overall finish first.",
                variants: [
                    { serviceSlug: "classic-lashes", summary: "A cleaner one-to-one lash style that gives definition without aiming for the fullest possible result.", bestFor: "Clients who want an everyday, lighter-looking set." },
                    { serviceSlug: "silk-lashes", summary: "A soft glossy lash finish that still stays on the natural side of the spectrum.", bestFor: "Clients who want polish without heavy density." },
                    { serviceSlug: "hybrid-lashes", summary: "A textured blend of classic and volume styling for more fullness without going to maximum drama.", bestFor: "Clients who want visible texture and more fullness than classic." },
                    { serviceSlug: "volume-lashes", summary: "A fuller, fluffier extension style for clients who want more density and noticeable lash presence.", bestFor: "Clients who prefer a bolder set than hybrid." },
                    { serviceSlug: "glamour-lashes", summary: "The higher-impact option in the family when the goal is maximum lash drama and presence.", bestFor: "Events, glam styling or clients who love a dramatic finish." },
                ],
            },
            {
                title: "Maintenance And Reset",
                description: "These services matter once you are already wearing extensions and need to maintain the look or remove the set safely.",
                variants: [
                    { serviceSlug: "lash-fill-2", summary: "A lighter maintenance appointment for clients returning fairly soon after the original set.", bestFor: "Clients keeping up with fills consistently." },
                    { serviceSlug: "lash-fill-3", summary: "A slightly longer maintenance appointment for sets that need more work than a two-week refresh.", bestFor: "Clients returning later in the wear cycle." },
                    { serviceSlug: "lash-removal", summary: "A safe removal service when extensions need to come off cleanly before a break or style change.", bestFor: "Clients removing an old set or starting over." },
                ],
            },
        ],
        includedServiceSlugs: ["classic-lashes", "silk-lashes", "hybrid-lashes", "volume-lashes", "glamour-lashes", "lash-fill-2", "lash-fill-3", "lash-removal"],
        relatedServiceSlugs: ["lash-lift-tint", "lash-lamination", "lash-tint", "brow-tint"],
    },
    {
        slug: "ipl-hair-removal",
        categoryId: "ipl",
        title: "IPL Hair Removal",
        heroTitle: "IPL Hair Removal In Hartbeespoort",
        metaTitle: "IPL Hair Removal By Area | Galeo Beauty",
        metaDescription:
            "Compare facial, intimate and body-area IPL hair removal in Hartbeespoort, including upper lip, underarm, bikini, Brazilian, Hollywood and leg treatments.",
        heroIntro:
            "IPL is easier to choose when you compare by area rather than trying to treat every body zone like the same booking. The time, price and reason for choosing each option all change depending on where the hair is being reduced.",
        heroBody:
            "This page groups our IPL menu into face, intimate and larger body-area services so you can see which appointments are quick maintenance zones and which ones are more comprehensive sessions. That makes it easier to compare the treatment that fits the area you actually want to target.",
        image: "/images/ipl/ipl-full-leg-hair-removal.jpg",
        imageAlt: "IPL hair removal service at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your IPL Hair Removal page on galeobeauty.com. I want help choosing the right area-based IPL treatment. Can you guide me?",
        consultationLabel: "Ask About IPL Hair Removal",
        focusTagsTitle: "Popular IPL goals",
        focusTags: ["Facial hair reduction", "Underarm smoothness", "Bikini and intimate areas", "Leg hair reduction", "Lower-maintenance grooming"],
        sectionIntroTitle: "Choosing The Right IPL Area",
        sectionIntroBody:
            "Start with the area you want to treat and the amount of coverage you need. Smaller face zones and underarms are usually quick entry points. Intimate services vary depending on how much hair removal you want. Larger body zones like legs, arms or back are the more comprehensive appointments because they cover a lot more surface area.",
        comparisonTitle: "Compare IPL Hair Removal Options",
        benefitsTitle: "What This IPL Menu Helps You Compare",
        benefits: [
            "You can compare IPL by treatment area instead of wading through one long list of unrelated body zones.",
            "The page makes the difference between facial, intimate and larger body appointments much clearer.",
            "It helps you see which services are quick maintenance areas and which are larger time and budget commitments.",
            "Coverage differences like bikini vs Brazilian vs Hollywood are easier to understand side by side.",
            "Clients can choose the right zone more confidently before asking for session guidance.",
        ],
        processTitle: "What To Expect During An IPL Appointment",
        ctaTitle: "Ready To Choose Your IPL Area?",
        ctaBody:
            "Tell the salon which area you want to treat first and whether you are comparing a smaller maintenance zone or a larger body area, and we can guide you to the right booking.",
        faqs: [
            { question: "How do I choose between bikini, Brazilian and Hollywood IPL?", answer: "The difference usually comes down to how much hair you want removed. Bikini sides is the lighter tidy-up option, Brazilian goes further across the intimate area while leaving some hair, and Hollywood is the more complete removal choice." },
            { question: "Are facial IPL services different from body IPL services?", answer: "Yes. Facial services usually cover smaller zones like upper lip, chin or full face and are often shorter bookings. Larger body appointments such as legs, arms or back take longer because they cover more surface area and need more passes." },
            { question: "Is underarm IPL a good place to start?", answer: "Often yes. Underarm is a straightforward area and is commonly one of the first zones clients choose when they want to move away from regular shaving or waxing." },
            { question: "What if I only want one small area treated?", answer: "That is exactly why the smaller facial and targeted body zones are listed separately. You do not need to book a larger treatment if the real concern is just the upper lip, chin, underarm or another focused area." },
            { question: "How do I choose between full leg and half leg IPL?", answer: "Choose based on the area you actually want reduced. Full leg is the better fit when you want hip-to-ankle coverage, while half leg works when your priority is only the lower or upper portion." },
        ],
        treatmentProcess: [
            { step: 1, title: "Area Consultation", description: "We confirm which zone you want to treat, how much coverage you need and whether a smaller targeted area or a larger body service is the better fit for your goal.", duration: "5-10 min" },
            { step: 2, title: "Skin And Hair Prep", description: "The treatment area is assessed and prepared so the IPL session can be carried out as cleanly and consistently as possible on the selected zone.", duration: "5 min" },
            { step: 3, title: "IPL Treatment", description: "The handpiece is worked across the area using the settings suited to the zone being treated. Smaller facial areas move faster, while larger regions like legs or back naturally take longer.", duration: "Varies by area" },
            { step: 4, title: "Post-Treatment Check", description: "After the session we check the area, talk through what is normal immediately after treatment and make sure you know what to expect next.", duration: "5 min" },
            { step: 5, title: "Session Planning", description: "Because hair reduction is usually a course-based process, we help you understand how to think about the next session and what kind of spacing to expect between visits.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Face And Neck Areas",
                description: "These are the smaller, more targeted services when the goal is reducing facial hair or defining a focused visible zone.",
                variants: [
                    { serviceSlug: "ipl-lip", summary: "A quick focused session for upper lip hair reduction.", bestFor: "Clients targeting a small facial zone first." },
                    { serviceSlug: "ipl-chin", summary: "A chin-specific IPL option when the issue is localized stubborn chin hair.", bestFor: "Clients dealing with a focused chin area." },
                    { serviceSlug: "ipl-full-face", summary: "A fuller facial treatment covering the visible face rather than only one small spot.", bestFor: "Clients wanting broader facial hair reduction." },
                    { serviceSlug: "ipl-full-face-neck", summary: "An expanded face-and-neck option when both zones need to be treated together.", bestFor: "Clients wanting a more complete facial coverage area." },
                    { serviceSlug: "ipl-beardline", summary: "A shaping service for the beardline where the goal is cleaner long-term definition.", bestFor: "Clients wanting a tidier beard outline." },
                    { serviceSlug: "ipl-neck", summary: "A neck-focused session for a cleaner neckline and less daily maintenance.", bestFor: "Clients targeting the neck area only." },
                    { serviceSlug: "ipl-neck-men", summary: "A neck service tailored for coarser male hair growth patterns.", bestFor: "Men dealing with neck shaving irritation or heavier regrowth." },
                ],
            },
            {
                title: "Underarm And Intimate Areas",
                description: "These are common maintenance zones where the main question is usually how much of the area you want covered.",
                variants: [
                    { serviceSlug: "ipl-underarm", summary: "A popular maintenance zone for clients wanting smoother underarms with less ongoing upkeep.", bestFor: "Clients starting with a quick high-value area." },
                    { serviceSlug: "ipl-bikini-sides", summary: "A lighter bikini-area option focused on tidying the edges rather than broader removal.", bestFor: "Clients who want a cleaner bikini line only." },
                    { serviceSlug: "ipl-brazilian", summary: "A more complete intimate-area reduction service that goes further than bikini sides.", bestFor: "Clients wanting broader intimate-area hair reduction without full removal." },
                    { serviceSlug: "ipl-hollywood", summary: "The most complete intimate-area option in the IPL family.", bestFor: "Clients who want the fullest intimate-area coverage." },
                ],
            },
            {
                title: "Larger Body Areas",
                description: "These appointments cover more surface area and are the better comparison when the goal extends beyond smaller maintenance zones.",
                variants: [
                    { serviceSlug: "ipl-half-leg", summary: "A lower-commitment leg option when only part of the leg needs treatment.", bestFor: "Clients targeting only lower or upper leg coverage." },
                    { serviceSlug: "ipl-full-leg", summary: "The full leg appointment for hip-to-ankle coverage.", bestFor: "Clients wanting one comprehensive leg service." },
                    { serviceSlug: "ipl-half-arm", summary: "A more focused arm option when only part of the arm is the priority.", bestFor: "Clients who do not need full arm coverage." },
                    { serviceSlug: "ipl-full-arm", summary: "The complete arm option from shoulder to wrist.", bestFor: "Clients wanting full arm smoothness." },
                    { serviceSlug: "ipl-back", summary: "A larger-area session for the back where broader coverage matters.", bestFor: "Clients wanting back hair reduction." },
                    { serviceSlug: "ipl-stomach", summary: "A torso-area option for hair reduction across the stomach.", bestFor: "Clients targeting the stomach area specifically." },
                ],
            },
        ],
        includedServiceSlugs: ["ipl-lip", "ipl-chin", "ipl-full-face", "ipl-full-face-neck", "ipl-beardline", "ipl-neck", "ipl-neck-men", "ipl-underarm", "ipl-bikini-sides", "ipl-brazilian", "ipl-hollywood", "ipl-half-leg", "ipl-full-leg", "ipl-half-arm", "ipl-full-arm", "ipl-back", "ipl-stomach"],
        relatedServiceSlugs: ["ipl-belly-button", "ipl-toes-feet", "ipl-buttocks", "tattoo-removal"],
    },
    {
        slug: "qms-facials",
        categoryId: "qms",
        title: "QMS Facials",
        heroTitle: "QMS Facials In Hartbeespoort",
        metaTitle: "QMS Facials And Peels | Galeo Beauty",
        metaDescription:
            "Compare QMS collagen facials, chemical peel, rejuvenating, deep-cleansing and sensitive-skin options in Hartbeespoort on one bespoke page.",
        heroIntro:
            "QMS is not one single facial. The line includes collagen-led options, glow and rejuvenation treatments, pore-focused work and gentler facials for reactive skin.",
        heroBody:
            "This page brings the QMS family together so you can compare which option is aimed at firmness, hydration, dullness, congestion or sensitivity instead of trying to choose from a flat menu without context.",
        image: "/images/dermalogica/dermalogica-microneedling-treatment.png",
        imageAlt: "Professional facial treatment at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your QMS Facials page on galeobeauty.com. I want help choosing the right QMS facial for my skin. Can you guide me?",
        consultationLabel: "Ask About QMS Facials",
        focusTagsTitle: "Popular QMS goals",
        focusTags: ["Collagen support", "Fresh glow", "Deep cleansing", "Sensitive-skin support", "Surface renewal"],
        sectionIntroTitle: "Choosing The Right QMS Facial",
        sectionIntroBody:
            "Start with the main skin concern. If the goal is firmer, plumper-looking skin, compare the collagen and rejuvenation side first. If the issue is dullness, congestion or uneven texture, the peel and pore-clearing options may make more sense. If the skin is reactive, the gentler facials are the better place to start.",
        comparisonTitle: "Compare QMS Facial Options",
        benefitsTitle: "What This QMS Menu Helps You Compare",
        benefits: [
            "You can compare anti-ageing, glow, cleansing and sensitive-skin options in one place.",
            "The page makes it easier to separate maintenance facials from stronger surface-renewal choices.",
            "It helps clients understand whether the better fit is collagen support, hydration, deep cleansing or a peel.",
            "The QMS family reads more like a treatment pathway and less like an unstructured list.",
            "Clients can choose a facial based on concern rather than only on the service name.",
        ],
        processTitle: "What To Expect During A QMS Facial",
        ctaTitle: "Ready To Choose The Right QMS Facial?",
        ctaBody:
            "Send the salon your main skin concern, whether it is dullness, congestion, sensitivity or firmness, and we can guide you toward the right QMS option.",
        faqs: [
            { question: "Which QMS facial is best if my main goal is firmness?", answer: "Collagen Facial is usually one of the first options to compare when the priority is firmer, plumper-looking skin. Rejuvenating and activator-led options may also come into the conversation depending on whether the skin needs more glow, softness or general revitalising support." },
            { question: "When is the QMS chemical peel the better choice?", answer: "The peel is more relevant when the main concern is surface renewal, uneven texture or skin that needs a stronger reset than a maintenance facial alone. If your priority is comfort, hydration or sensitivity, another QMS facial may be a better starting point." },
            { question: "Is deep pore cleansing only for oily skin?", answer: "Not necessarily. It is most relevant when congestion, blocked pores or buildup are the bigger issue, but the real question is whether cleansing and clarity matter more than hydration or anti-ageing support." },
            { question: "Which QMS option is gentlest for sensitive skin?", answer: "Sensitive Skin Facial is the clearest starting point when the skin is reactive or easily irritated. It gives the gentler side of the QMS family a more appropriate place than jumping into a peel or more active treatment too quickly." },
            { question: "Do I need a collagen facial or just a maintenance facial?", answer: "That depends on whether your goal is basic upkeep or more specific collagen-focused support. If the skin mainly needs a comfortable maintenance treatment, the simpler facials may be enough. If firmness and plumpness are the bigger priority, collagen-led options are more relevant." },
        ],
        treatmentProcess: [
            { step: 1, title: "Skin Consultation", description: "We begin by looking at whether the skin needs anti-ageing support, a glow reset, deeper cleansing or gentler calming care before matching you to the right QMS facial.", duration: "10 min" },
            { step: 2, title: "Cleanse And Prep", description: "The skin is prepared so the selected QMS treatment can be applied properly and the active steps in the facial suit the condition of the skin that day.", duration: "5-10 min" },
            { step: 3, title: "Core Treatment Phase", description: "This is where the chosen facial does its main work, whether that means collagen support, a brighter rejuvenating finish, pore-focused cleansing or a more calming direction.", duration: "Varies by option" },
            { step: 4, title: "Finishing Products", description: "The treatment is completed with the finishing layers and support products that match the purpose of the facial, whether the goal is comfort, glow or a fresher-looking surface.", duration: "10-15 min" },
            { step: 5, title: "Homecare And Next-Step Advice", description: "Before you leave, we explain whether your skin would benefit more from repeat maintenance, a stronger QMS option or a different treatment direction next time.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Collagen And Rejuvenation",
                description: "These are the QMS options to compare when the skin needs more freshness, firmness or general revitalising support.",
                variants: [
                    { serviceSlug: "collagen-facial", summary: "The signature collagen-focused option when the main goal is plumper, firmer-looking skin support.", bestFor: "Clients prioritising firmness and anti-ageing support." },
                    { serviceSlug: "rejuvenating-facial", summary: "A revitalising treatment when the skin feels dull, tired or generally in need of a fresher look.", bestFor: "Clients wanting an overall revived finish." },
                    { serviceSlug: "activator-treatment", summary: "A more activation-led facial when the skin needs a stronger push toward renewal and freshness.", bestFor: "Clients wanting more than a basic maintenance appointment." },
                ],
            },
            {
                title: "Clarifying And Surface Renewal",
                description: "These are the options to compare when pores, buildup, dull texture or a stronger reset are the main concerns.",
                variants: [
                    { serviceSlug: "deep-pore-cleansing", summary: "A pore-focused facial for clients whose skin feels clogged, oily or congested.", bestFor: "Congestion and blocked pores." },
                    { serviceSlug: "chemical-peel", summary: "A stronger surface-renewal option for clients needing a more active texture or tone reset.", bestFor: "Uneven texture or skin that needs a more corrective refresh." },
                ],
            },
            {
                title: "Gentler Maintenance Options",
                description: "These are the softer QMS options when the skin needs a simpler upkeep facial or more comfort-focused support.",
                variants: [
                    { serviceSlug: "basic-facial", summary: "A classic maintenance facial when the goal is straightforward upkeep and refreshment.", bestFor: "Clients wanting a simpler maintenance treatment." },
                    { serviceSlug: "sensitive-skin-facial", summary: "A gentler QMS option for reactive skin that needs calm support rather than stronger actives.", bestFor: "Sensitive or easily irritated skin." },
                ],
            },
        ],
        includedServiceSlugs: ["collagen-facial", "rejuvenating-facial", "activator-treatment", "deep-pore-cleansing", "chemical-peel", "basic-facial", "sensitive-skin-facial"],
        relatedServiceSlugs: [],
    },
    {
        slug: "dermalogica-corrective-facials",
        categoryId: "dermalogica",
        title: "Dermalogica Corrective Facials",
        heroTitle: "Dermalogica Corrective Facials In Hartbeespoort",
        metaTitle: "Dermalogica Facials, Peels And Advanced Skin Treatments | Galeo Beauty",
        metaDescription:
            "Compare Dermalogica Pro Skin, Pro Bright, Pro Clear, Pro Calm, peels, Hydraderm, microneedling, Luminfusion and other corrective skin treatments in Hartbeespoort.",
        heroIntro:
            "Dermalogica at Galeo goes beyond a single standard facial. The menu includes quicker maintenance treatments, concern-led facials, stronger resurfacing options and more advanced corrective technologies.",
        heroBody:
            "This page is meant to help you compare the corrective skin family properly. If your priority is a custom facial, clogged pores, pigmentation, sensitivity, brighter skin, resurfacing or microneedling, the most useful first step is to group those options by what they actually do rather than treat them all as interchangeable facials.",
        image: "/images/dermalogica/dermalogica-microneedling-treatment.png",
        imageAlt: "Dermalogica corrective skin treatment at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Dermalogica corrective facials page on galeobeauty.com. I want help choosing the right treatment for my skin concern. Can you guide me?",
        consultationLabel: "Ask About Dermalogica Treatments",
        focusTagsTitle: "Popular Dermalogica goals",
        focusTags: ["Custom facials", "Pigmentation support", "Acne and congestion", "Glow and infusion", "Peels and resurfacing"],
        sectionIntroTitle: "Choosing The Right Dermalogica Treatment",
        sectionIntroBody:
            "Start with the level of correction you need. If your skin needs a tailored maintenance facial, compare the Pro Skin options first. If the concern is brightening, breakouts, sensitivity or firmness, move into the concern-led facials. If the skin needs more obvious resurfacing or stronger corrective support, compare the peels, microneedling and advanced technology-led treatments.",
        comparisonTitle: "Compare Dermalogica Corrective Options",
        benefitsTitle: "What This Dermalogica Menu Helps You Compare",
        benefits: [
            "You can separate basic custom facials from more corrective and advanced treatment options.",
            "The page helps clarify whether your concern is better served by a Pro Skin facial, a concern-led facial, a peel or a technology-driven treatment.",
            "It brings peels, microneedling, hydration-led treatments and concern-led facials into one decision framework.",
            "Clients can compare quick-entry facials with more intensive corrective treatments before booking.",
            "It reduces the guesswork around which Dermalogica service is actually built for the concern you want to solve.",
        ],
        processTitle: "What To Expect During A Dermalogica Treatment",
        ctaTitle: "Ready To Choose The Right Dermalogica Treatment?",
        ctaBody:
            "Send the salon your main skin concern, whether it is breakouts, pigmentation, dullness, texture, sensitivity or signs of ageing, and we can guide you toward the best-matched Dermalogica option.",
        faqs: [
            { question: "What is the difference between Pro Skin and the more advanced Dermalogica treatments?", answer: "Pro Skin is usually the first comparison when you want a customised facial and a good overall skin reset. The more advanced options come in when the concern is stronger, more specific or more corrective, such as peels, microneedling, infusion-based treatments or a targeted concern-led facial." },
            { question: "Which Dermalogica treatment is best for breakouts and congestion?", answer: "Pro Clear and Skin Clearing Facial are usually the clearest starting points when congestion and breakouts are the main issue. Depending on the severity and the skin condition, stronger resurfacing options may come into the conversation later rather than first." },
            { question: "When is a peel more relevant than a facial?", answer: "A peel becomes more relevant when the skin needs stronger surface renewal than a maintenance facial is likely to give. If texture, pigment or a more corrective reset is the main goal, peels are often the better comparison than a standard facial alone." },
            { question: "Where do Hydraderm, Luminfusion and Nanoinfusion fit?", answer: "Those treatments tend to sit in the technology-led or finish-led part of the family. They are often chosen when the client wants hydration, infusion, glow or a polished surface result rather than only a traditional facial experience." },
            { question: "When is microneedling worth considering in this menu?", answer: "Microneedling usually enters the conversation when the concern is more corrective, especially around texture, post-acne change or collagen-focused improvement. It is not usually the first answer for every skin concern, which is why it helps to compare it inside the broader Dermalogica family." },
        ],
        treatmentProcess: [
            { step: 1, title: "Skin Concern Assessment", description: "We begin by working out whether your skin needs a custom facial, a concern-led treatment or a more corrective resurfacing option before choosing the right Dermalogica treatment.", duration: "10 min" },
            { step: 2, title: "Prep And Cleansing", description: "The skin is prepared according to the treatment family selected, whether that is a Pro Skin-style facial, a peel or an advanced corrective service.", duration: "5-10 min" },
            { step: 3, title: "Core Treatment", description: "This is where the chosen treatment does its main work, whether that means custom facial steps, exfoliation, infusion, peel activity or collagen-focused correction.", duration: "Varies by option" },
            { step: 4, title: "Finish And Protection", description: "The session is completed with the products and finishing care suited to the treatment path you chose so the skin leaves supported rather than overworked.", duration: "10-15 min" },
            { step: 5, title: "Next-Step Guidance", description: "Before you leave, we explain whether your best next step is repeat maintenance, another concern-led facial or a more corrective treatment at a later stage.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Customised Pro Skin And Foundational Facials",
                description: "These are the starting points when the skin needs a tailored facial, a glow reset or a more general skin-maintenance treatment.",
                variants: [
                    { serviceSlug: "pro-skin-30", summary: "A shorter custom facial when the goal is a focused skin reset in less time.", bestFor: "Clients wanting a quicker tailored treatment." },
                    { serviceSlug: "pro-skin-60", summary: "A fuller custom facial when the skin needs more treatment time and a broader reset.", bestFor: "Clients wanting a more complete tailored facial." },
                    { serviceSlug: "multivitamin-treatment", summary: "A nutrient-led facial for dull or tired-looking skin needing a healthier-looking boost.", bestFor: "Dull, tired skin." },
                    { serviceSlug: "age-smart-facial", summary: "A facial aimed at skin showing more visible age-related change.", bestFor: "Clients focused on ageing support." },
                    { serviceSlug: "ultra-calming-facial", summary: "A calmer facial direction for skin that feels reactive or easily irritated.", bestFor: "Sensitive or reactive skin." },
                    { serviceSlug: "skin-clearing-facial", summary: "A facial option when congestion and breakouts are the bigger concern.", bestFor: "Breakout-prone or clogged skin." },
                ],
            },
            {
                title: "Concern-Led Corrective Facials",
                description: "These are the options to compare when the skin concern is more specific than a general facial reset.",
                variants: [
                    { serviceSlug: "pro-bright", summary: "A brightening facial choice when tone, dullness or pigment are higher on the list.", bestFor: "Pigmentation and radiance goals." },
                    { serviceSlug: "pro-firm", summary: "A firmer, more lifting-focused facial option when elasticity support matters most.", bestFor: "Clients wanting stronger firming support." },
                    { serviceSlug: "pro-clear", summary: "A concern-led facial for breakouts, congestion and oilier skin patterns.", bestFor: "Persistent congestion and acne-prone skin." },
                    { serviceSlug: "pro-calm", summary: "A more targeted calm-and-barrier treatment for reactive or easily irritated skin.", bestFor: "Red, reactive or sensitised skin." },
                    { serviceSlug: "eye-peel", summary: "A more focused treatment for the eye area when tiredness, puffiness or fine lines around the eyes are the issue.", bestFor: "Clients targeting the eye area specifically." },
                    { serviceSlug: "neurosculpt-30", summary: "A shorter sculpting-oriented option when the focus is facial tension and contour support.", bestFor: "Clients wanting a shorter sculpting facial." },
                    { serviceSlug: "neurosculpt-full", summary: "A longer sculpting treatment when contour and facial tension work need more time.", bestFor: "Clients wanting a fuller contour-focused treatment." },
                ],
            },
            {
                title: "Resurfacing And Technology-Led Treatments",
                description: "These are the more advanced options when the skin needs stronger exfoliation, infusion, hydration technology or collagen-focused correction.",
                variants: [
                    { serviceSlug: "pro-dermaplaning-30", summary: "A shorter dermaplaning treatment for smoother texture and a cleaner surface finish.", bestFor: "Quick texture and glow support." },
                    { serviceSlug: "pro-dermaplaning-full", summary: "A fuller dermaplaning treatment with more complete facial time around the exfoliation benefit.", bestFor: "Clients wanting a more complete dermaplaning session." },
                    { serviceSlug: "hydraderm", summary: "A hydration and resurfacing treatment when cleansing and replenishment both matter.", bestFor: "Skin that feels both dull and dehydrated." },
                    { serviceSlug: "nanoinfusion", summary: "An infusion-led treatment for a plumper, fresher surface finish without moving into full microneedling territory.", bestFor: "Clients wanting glow and infusion rather than deeper correction." },
                    { serviceSlug: "luminfusion", summary: "A glow-focused advanced treatment when brightness and event-ready polish matter.", bestFor: "Clients wanting a more luminous finished look." },
                    { serviceSlug: "pro-microneedling", summary: "A more corrective collagen-focused treatment when texture and deeper improvement matter more than a standard facial.", bestFor: "Texture, post-acne change or corrective goals." },
                    { serviceSlug: "power-peel-30", summary: "A quicker peel option when the skin needs a more active resurfacing step in a shorter appointment.", bestFor: "Clients wanting a lighter entry into peel-based correction." },
                    { serviceSlug: "power-peel-60", summary: "A fuller peel appointment with more time for a stronger resurfacing treatment.", bestFor: "Clients needing a more complete peel session." },
                    { serviceSlug: "pro-power-peel", summary: "A strong Dermalogica peel option for clients who need more decisive resurfacing support.", bestFor: "Pigment, texture or stronger peel-led correction." },
                    { serviceSlug: "melanopro-peel", summary: "A pigment-focused peel treatment when darker marks and uneven tone are the bigger priority.", bestFor: "Clients focused on more serious pigmentation support." },
                ],
            },
        ],
        includedServiceSlugs: ["pro-skin-30", "pro-skin-60", "multivitamin-treatment", "age-smart-facial", "ultra-calming-facial", "skin-clearing-facial", "pro-bright", "pro-firm", "pro-clear", "pro-calm", "eye-peel", "neurosculpt-30", "neurosculpt-full", "pro-dermaplaning-30", "pro-dermaplaning-full", "hydraderm", "nanoinfusion", "luminfusion", "pro-microneedling", "power-peel-30", "power-peel-60", "pro-power-peel", "melanopro-peel"],
        relatedServiceSlugs: [],
    },
    {
        slug: "waxing-services",
        categoryId: "waxing",
        title: "Waxing Services",
        heroTitle: "Waxing Services In Hartbeespoort",
        metaTitle: "Face, Body And Intimate Waxing | Galeo Beauty",
        metaDescription:
            "Compare face, body and intimate waxing in Hartbeespoort, including eyebrows, lip, full face, underarm, legs, Brazilian and Hollywood waxing.",
        heroIntro:
            "Waxing choices are easier when they are grouped by area and coverage instead of sitting in one long list. A facial tidy-up, a full leg appointment and an intimate wax are not the same kind of booking, even if they all live under waxing.",
        heroBody:
            "This page brings the waxing family together by the decision people are actually making: facial clean-up, body-area maintenance or intimate waxing. That makes it easier to compare the level of coverage you want and choose the right appointment without overbooking or underbooking.",
        image: "/images/waxing/full-leg-wax-salon-service.jpg",
        imageAlt: "Waxing services at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Waxing Services page on galeobeauty.com. I want help choosing the right waxing option for the area I need. Can you guide me?",
        consultationLabel: "Ask About Waxing",
        focusTagsTitle: "Popular waxing goals",
        focusTags: ["Facial tidy-up", "Smooth underarms", "Leg waxing", "Brazilian and Hollywood", "Body-area maintenance"],
        sectionIntroTitle: "Choosing The Right Waxing Appointment",
        sectionIntroBody:
            "Start with the area you want to wax and the amount of coverage you need. Face waxing is usually a smaller shaping or tidy-up booking. Body waxing covers larger maintenance zones like underarms, arms or legs. Intimate waxing becomes its own comparison because Brazilian and Hollywood serve different levels of removal.",
        comparisonTitle: "Compare Waxing Options",
        benefitsTitle: "What This Waxing Menu Helps You Compare",
        benefits: [
            "You can compare facial, body and intimate waxing in the way clients actually book it.",
            "The difference between Brazilian and Hollywood becomes clearer when they sit side by side.",
            "Smaller tidy-up areas and larger body appointments are easier to distinguish before booking.",
            "The page helps clients choose the right level of coverage instead of guessing from names only.",
            "It turns the waxing menu into a practical decision tool rather than a flat price list.",
        ],
        processTitle: "What To Expect During A Waxing Appointment",
        ctaTitle: "Ready To Choose The Right Waxing Appointment?",
        ctaBody:
            "Tell the salon which area you want to wax and how much coverage you want, and we can guide you toward the most relevant option.",
        faqs: [
            { question: "What is the difference between Brazilian and Hollywood wax?", answer: "Brazilian usually leaves a strip or some hair, while Hollywood is the more complete intimate removal option. The better fit depends on how much hair you want taken off." },
            { question: "Should I book full face wax or separate facial areas?", answer: "Book full face when you want several facial zones done together. If the concern is only one area like lip, brow or chin, the smaller targeted options are the more appropriate booking." },
            { question: "How do I choose between full leg and half leg wax?", answer: "Choose based on how much of the leg you actually want treated. Full leg covers hip to ankle, while half leg is better when you only need lower or upper leg maintenance." },
            { question: "Is underarm waxing considered a large appointment?", answer: "No, underarm is usually one of the quicker maintenance zones. It sits very differently from larger appointments like full leg or full back waxing." },
            { question: "When should I book men back wax instead of standard back wax?", answer: "Men back wax is the better fit when the back hair growth pattern is heavier or coarser and needs the appointment calibrated around that level of coverage." },
        ],
        treatmentProcess: [
            { step: 1, title: "Area And Coverage Check", description: "We confirm which zone you want waxed and how much of that area needs to be covered before starting the appointment.", duration: "5 min" },
            { step: 2, title: "Prep", description: "The skin is prepared so the wax can be applied cleanly and the area can be treated as efficiently and comfortably as possible.", duration: "5 min" },
            { step: 3, title: "Waxing", description: "The selected zone is waxed according to the size and coverage of the service you booked, whether that is a small facial area, a larger body area or an intimate wax.", duration: "Varies by area" },
            { step: 4, title: "Finish And Soothe", description: "After waxing, the area is cleaned up and soothed so the skin feels calmer before you leave.", duration: "5 min" },
            { step: 5, title: "Aftercare Advice", description: "Before you go, we explain what to avoid immediately after the appointment and how to think about your next maintenance visit.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Face Waxing",
                description: "These are the smaller facial tidy-up and shaping services when the goal is targeted facial hair removal.",
                variants: [
                    { serviceSlug: "wax-eyebrow", summary: "A focused brow-shaping appointment for cleaner definition.", bestFor: "Clients needing brow clean-up and shape." },
                    { serviceSlug: "wax-lip", summary: "A quick upper-lip tidy-up service.", bestFor: "Clients booking a single small facial zone." },
                    { serviceSlug: "wax-cheek", summary: "A cheek and side-area waxing option for smoother facial edges.", bestFor: "Clients targeting the cheek area." },
                    { serviceSlug: "wax-nose", summary: "A targeted wax for visible nose hair.", bestFor: "Clients needing a very focused grooming area." },
                    { serviceSlug: "wax-ear", summary: "A small-area wax for ear hair clean-up.", bestFor: "Clients targeting ear hair." },
                    { serviceSlug: "wax-chin", summary: "A chin-focused option when the concern is localized chin hair.", bestFor: "Clients dealing with one specific facial zone." },
                    { serviceSlug: "wax-full-face", summary: "A broader facial waxing appointment when several face zones need to be done together.", bestFor: "Clients wanting one complete facial waxing booking." },
                ],
            },
            {
                title: "Body And Intimate Waxing",
                description: "These are the larger-area maintenance appointments, including the intimate waxing options people often compare most closely.",
                variants: [
                    { serviceSlug: "wax-underarm", summary: "A quick maintenance wax for smoother underarms.", bestFor: "Clients wanting a smaller body-area booking." },
                    { serviceSlug: "wax-half-arm", summary: "A focused arm wax when only part of the arm needs coverage.", bestFor: "Clients not needing the full arm done." },
                    { serviceSlug: "wax-full-arm", summary: "A complete arm wax from shoulder to wrist.", bestFor: "Clients wanting full arm maintenance." },
                    { serviceSlug: "wax-half-leg", summary: "A smaller leg booking for lower or upper leg maintenance.", bestFor: "Clients not needing full leg coverage." },
                    { serviceSlug: "wax-full-leg", summary: "A full leg wax from hip to ankle.", bestFor: "Clients wanting one complete leg appointment." },
                    { serviceSlug: "wax-brazilian", summary: "An intimate wax that removes more than bikini waxing but is not full removal.", bestFor: "Clients wanting an in-between intimate option." },
                    { serviceSlug: "wax-hollywood", summary: "The fullest intimate wax in the family.", bestFor: "Clients wanting complete intimate hair removal." },
                    { serviceSlug: "wax-full-back", summary: "A complete back wax for standard back-area coverage.", bestFor: "Clients wanting full back maintenance." },
                    { serviceSlug: "wax-men-back", summary: "A men’s back wax for heavier or broader back growth.", bestFor: "Men needing fuller back-area removal." },
                    { serviceSlug: "wax-chest", summary: "A chest-area waxing option for upper body grooming.", bestFor: "Clients targeting chest hair." },
                    { serviceSlug: "wax-tummy", summary: "A stomach-area wax for torso grooming.", bestFor: "Clients wanting tummy-area maintenance." },
                ],
            },
        ],
        includedServiceSlugs: ["wax-eyebrow", "wax-lip", "wax-cheek", "wax-nose", "wax-ear", "wax-chin", "wax-full-face", "wax-underarm", "wax-half-arm", "wax-full-arm", "wax-half-leg", "wax-full-leg", "wax-brazilian", "wax-hollywood", "wax-full-back", "wax-men-back", "wax-chest", "wax-tummy"],
        relatedServiceSlugs: ["wax-half-back", "wax-butt"],
    },
    {
        slug: "premium-hair-extensions",
        categoryId: "hair-extensions",
        title: "Hair Extensions",
        heroTitle: "Premium Hair Extensions In Hartbeespoort",
        metaTitle: "Tape-Ins, Micro Loops, Halos And Weaves | Galeo Beauty",
        metaDescription:
            "Compare premium hair extensions in Hartbeespoort, including tape-ins, micro loops, clip-ins, halos, ponytails, machine weaves and genius weaves by method, length and colour family.",
        heroIntro:
            "Hair extensions are easier to choose when you compare the method first, then the length and colour family inside that method. Tape-ins, halos and weaves may all add length or volume, but they are not the same wearing experience.",
        heroBody:
            "This page groups our premium extension options by attachment method so you can compare how the hair is worn, what kind of commitment it suits and where the pricing changes by length, weight or colour family.",
        image: "/images/hair-extensions/beachy-blonde-waves-extensions.png",
        imageAlt: "Premium hair extensions at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Hair Extensions page on galeobeauty.com. I want help choosing the right extension method, length and colour family. Can you guide me?",
        consultationLabel: "Ask About Hair Extensions",
        focusTagsTitle: "Popular extension goals",
        focusTags: ["Extra length", "More volume", "Temporary wear", "Semi-permanent wear", "Colour match options"],
        sectionIntroTitle: "Choosing The Right Extension Method",
        sectionIntroBody:
            "Start with how you want to wear the hair. Tape-ins, micro loops and weaves suit clients who want more ongoing installed wear. Clip-ins, halos and ponytails are often better when flexibility matters more. Once the method is right, compare the length and whether you need a dark or light/ombre colour family.",
        comparisonTitle: "Compare Hair Extension Options",
        benefitsTitle: "What This Hair Extensions Menu Helps You Compare",
        benefits: [
            "You can compare extension methods before getting lost in dozens of length variations.",
            "The page helps separate installed methods from more removable or occasional-wear options.",
            "Length and colour-family pricing sits inside the right method group instead of feeling random.",
            "Clients can understand whether they need tape-ins, halos, clip-ins, ponytails or weaves before discussing exact specs.",
            "It makes a large extension catalogue feel like a real decision guide instead of a raw stock list.",
        ],
        processTitle: "What To Expect During An Extension Consultation",
        ctaTitle: "Ready To Choose The Right Extension Method?",
        ctaBody:
            "Send the salon your current hair length, the look you want and whether you prefer removable or longer-wear extensions, and we can guide you to the best fit.",
        faqs: [
            { question: "How do I choose between tape-ins, clip-ins and halos?", answer: "Start with how often you want to wear the extensions. Tape-ins are usually part of a more installed, longer-wear approach. Clip-ins and halos are better when you want flexibility and easier removal between wears." },
            { question: "What is the difference between micro loops and weaves?", answer: "They are different installation methods, so the better choice depends on the kind of wear, look and commitment you want. Comparing by method first is more useful than looking at length pricing in isolation." },
            { question: "Why are dark and light extension prices different?", answer: "Light, ombre and piano colour families are priced separately in many of the extension lines, so colour family matters alongside length when comparing the options." },
            { question: "Which extensions are best for occasional wear?", answer: "Clip-ins, halos and ponytails are often the strongest comparison when you want flexibility and do not need a more installed method full time." },
            { question: "Do I need to decide the exact length before messaging the salon?", answer: "Not necessarily. It helps to know roughly how much extra length you want, but the better first step is usually to decide the method and whether you want a dark or lighter colour family." },
        ],
        treatmentProcess: [
            { step: 1, title: "Method Consultation", description: "We begin by working out whether you need an installed extension method or a more removable option before looking at length and colour family.", duration: "10-15 min" },
            { step: 2, title: "Length And Colour Match", description: "Once the method is clear, we compare the relevant length range and whether your colour falls into dark or light/ombre pricing where applicable.", duration: "10 min" },
            { step: 3, title: "Specification Selection", description: "This is where the specific extension line, length and weight are narrowed down so the option matches the transformation you want.", duration: "Varies" },
            { step: 4, title: "Application Planning", description: "If the chosen method is an installed one, we talk through what the fitting process involves and what kind of upkeep comes with it.", duration: "5-10 min" },
            { step: 5, title: "Care Guidance", description: "Before finalising, we explain the day-to-day care expectations for the method you are comparing so the choice fits your routine, not just the look in the mirror.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Installed Extension Methods",
                description: "These methods are usually compared when the client wants a more integrated extension result rather than a quick removable piece.",
                variants: [
                    { serviceSlug: "tape-40cm-dark", summary: "A tape-in reference point for the installed extension family, with pricing that scales by length and colour family.", bestFor: "Clients considering tape-ins for longer-wear use." },
                    { serviceSlug: "microloop-40cm-dark", summary: "A micro loop reference point for clients comparing installed strand-based wear.", bestFor: "Clients wanting an installed method with a different attachment style." },
                    { serviceSlug: "machine-40cm-dark", summary: "A machine weave reference point when comparing woven installed methods.", bestFor: "Clients considering weave-style wear." },
                    { serviceSlug: "genius-45cm", summary: "A genius weave reference point for the more premium weave end of the family.", bestFor: "Clients comparing higher-end weave options." },
                    { serviceSlug: "butterfly-45cm", summary: "A butterfly weave reference point when comparing premium installed methods.", bestFor: "Clients exploring weave-based extension options." },
                ],
            },
            {
                title: "Removable And Flexible-Wear Options",
                description: "These are the options to compare when flexibility or occasional wear matters more than a fuller installed method.",
                variants: [
                    { serviceSlug: "clip-40cm-dark", summary: "A clip-in reference point for clients wanting removable volume and length.", bestFor: "Clients wanting to wear extensions only when needed." },
                    { serviceSlug: "halo-40cm-dark", summary: "A halo reference point for easier, lower-commitment extension wear.", bestFor: "Clients wanting quick removable volume and length." },
                    { serviceSlug: "ponytail-40cm-dark", summary: "A ponytail extension reference point for instant longer, fuller ponytail styling.", bestFor: "Clients focused on quick styling impact." },
                ],
            },
        ],
        includedServiceSlugs: ["tape-40cm-dark", "tape-40cm-light", "tape-50cm-dark", "tape-50cm-light", "microloop-40cm-dark", "microloop-40cm-light", "machine-40cm-dark", "machine-40cm-light", "clip-40cm-dark", "clip-40cm-light", "halo-40cm-dark", "halo-40cm-light", "ponytail-40cm-dark", "ponytail-40cm-light", "genius-45cm", "butterfly-45cm"],
        relatedServiceSlugs: ["tape-strips-precut", "tape-in-remover"],
    },
    {
        slug: "permanent-makeup-services",
        categoryId: "permanent-makeup",
        title: "Permanent Makeup",
        heroTitle: "Permanent Makeup In Hartbeespoort",
        metaTitle: "Brows, Lips And Liner Permanent Makeup | Galeo Beauty",
        metaDescription:
            "Compare microblading, powder brows, hybrid brows, lip liner, full lip contour and eyeliner permanent makeup in Hartbeespoort.",
        heroIntro:
            "Permanent makeup is easier to choose when it is grouped by facial feature and finish. Brows, lips and eyeliner solve different problems, and even inside brows the result changes depending on whether you want hair strokes, powder shading or a hybrid finish.",
        heroBody:
            "This page brings the permanent makeup family together so you can compare the real outcomes first: brow definition, lip definition and colour, or more visible eye framing. That gives you a clearer starting point before deciding on the exact technique.",
        image: "/images/gallery/lashes-brows/microblading-hair-stroke-eyebrows.png",
        imageAlt: "Permanent makeup results at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Permanent Makeup page on galeobeauty.com. I want help choosing the right brow, lip or liner option. Can you guide me?",
        consultationLabel: "Ask About Permanent Makeup",
        focusTagsTitle: "Popular permanent makeup goals",
        focusTags: ["Natural-looking brows", "Soft shaded brows", "Defined lips", "Upper-liner definition", "Longer-lasting daily definition"],
        sectionIntroTitle: "Choosing The Right Permanent Makeup Option",
        sectionIntroBody:
            "Start with the feature you want to improve. Brow options differ by finish, from hair-stroke realism to softer shaded definition. Lip services are about border, shape and all-over tint effect. Eyeliner sits separately because the goal there is eye definition rather than brow or lip correction.",
        comparisonTitle: "Compare Permanent Makeup Options",
        benefitsTitle: "What This Permanent Makeup Menu Helps You Compare",
        benefits: [
            "You can compare brows, lips and liner by outcome instead of trying to treat them as one generic tattoo category.",
            "The page helps make the difference between microblading, powder brows and hybrid brows much clearer.",
            "It separates lip-border definition from fuller lip-colour enhancement.",
            "Clients can understand which feature they actually want to improve before choosing the technique.",
            "It turns a specialist service list into a clearer consultation starting point.",
        ],
        processTitle: "What To Expect During A Permanent Makeup Consultation",
        ctaTitle: "Ready To Choose The Right Permanent Makeup Option?",
        ctaBody:
            "Send the salon the feature you want to improve and the type of finish you prefer, and we can guide you toward the most relevant permanent makeup option.",
        faqs: [
            { question: "What is the difference between microblading, powder brows and hybrid brows?", answer: "Microblading is usually the first comparison for hair-stroke realism. Powder brows are softer and more shaded. Hybrid brows combine both ideas for clients who want definition with some natural front detail." },
            { question: "How do I choose between lip liner and full lip contour?", answer: "Lip liner is more focused on defining the border and improving lip shape. Full lip contour is the stronger comparison when you want a more complete lip-colour effect rather than just edge definition." },
            { question: "Is eyeliner permanent makeup only for bold looks?", answer: "Not necessarily. It can be used for cleaner daily definition as well. The main question is how much eye framing you want to see on a normal day." },
            { question: "Which permanent makeup option looks the most natural?", answer: "That depends on the area and finish you want. In brows, microblading often reads as the most stroke-like. In lips and liner, the most natural option depends on how subtle or visible you want the colour and shape definition to be." },
            { question: "Should I compare permanent makeup by area first or technique first?", answer: "By area first. Once you know whether your priority is brows, lips or eyeliner, the technique comparison becomes much easier and more relevant." },
        ],
        treatmentProcess: [
            { step: 1, title: "Feature Consultation", description: "We begin by confirming whether the priority is brows, lips or eyeliner and what kind of daily definition you want to wake up with.", duration: "10-15 min" },
            { step: 2, title: "Shape And Finish Discussion", description: "Once the feature is clear, we compare the finishes that make sense for that area, such as hair strokes, shading, border definition or fuller pigment effect.", duration: "10 min" },
            { step: 3, title: "Technique Selection", description: "The most suitable permanent makeup technique is selected based on the result you want rather than only on the service name.", duration: "Varies" },
            { step: 4, title: "Treatment Planning", description: "We talk through what the treatment involves and what the chosen option is designed to achieve on that specific area.", duration: "5-10 min" },
            { step: 5, title: "Aftercare Guidance", description: "Before you leave, we explain how to think about healing, maintenance and what to expect from the finish you chose.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Brows",
                description: "These options are for clients whose priority is fuller, better-defined or more balanced brows.",
                variants: [
                    { serviceSlug: "microblading", summary: "A brow option centred around fine hair-stroke realism.", bestFor: "Clients wanting a more natural stroke-style brow result." },
                    { serviceSlug: "powderpixel-brows", summary: "A softer shaded brow finish rather than individual hair-stroke focus.", bestFor: "Clients wanting a more powdered or makeup-like brow effect." },
                    { serviceSlug: "hybrid-brows", summary: "A mix of hair-stroke detail and shading for clients wanting both softness and definition.", bestFor: "Clients wanting a balanced brow result between natural and defined." },
                    { serviceSlug: "brow-henna", summary: "A non-permanent brow-definition option that still helps clients compare their brow goals before committing to permanent makeup.", bestFor: "Clients exploring brow definition before a more lasting result." },
                ],
            },
            {
                title: "Lips And Eyeliner",
                description: "These are the permanent makeup options when the priority shifts from brows to lip shape or eye definition.",
                variants: [
                    { serviceSlug: "lip-liner", summary: "A lip-definition option focused on border, shape and clearer outline.", bestFor: "Clients wanting better lip-edge definition." },
                    { serviceSlug: "full-lips-contour", summary: "A fuller lip-colour option when more than the border needs to be enhanced.", bestFor: "Clients wanting a stronger lip-colour and shape effect." },
                    { serviceSlug: "eyeliner-top", summary: "A top-liner option for daily eye definition and a more framed lash line.", bestFor: "Clients wanting upper-eye definition." },
                    { serviceSlug: "eyeliner-bottom", summary: "A lower-liner option when extra depth under the eye is the priority.", bestFor: "Clients wanting lower-eye definition." },
                ],
            },
        ],
        includedServiceSlugs: ["microblading", "powderpixel-brows", "hybrid-brows", "brow-henna", "lip-liner", "full-lips-contour", "eyeliner-top", "eyeliner-bottom"],
        relatedServiceSlugs: ["brow-tint", "lash-tint"],
    },
    {
        slug: "injectable-aesthetics",
        categoryId: "hart-aesthetics",
        title: "Injectable Aesthetics",
        heroTitle: "Injectable Aesthetics In Hartbeespoort",
        metaTitle: "Fillers, Tox And Skin Boosters | Galeo Beauty",
        metaDescription:
            "Compare Hart Aesthetics injectable treatments in Hartbeespoort, including tox, lip fillers, cheek fillers, Russian lips, skin boosters and facial rejuvenation options.",
        heroIntro:
            "Injectables work best when they are compared by the concern being treated, not just by product type. Lip shape, cheek support, wrinkle softening and under-eye hydration are different decisions, even though they all sit under aesthetic injections.",
        heroBody:
            "This page groups our injectable aesthetics menu into rejuvenation, tox, skin boosters and fillers so you can understand what each category is trying to improve before you message the salon about a specific treatment.",
        image: "/images/gallery/facials/professional-skin-facial-treatment-in-progress.jpg",
        imageAlt: "Injectable aesthetics consultation at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Injectable Aesthetics page on galeobeauty.com. I want help choosing the right injectable treatment for my concern. Can you guide me?",
        consultationLabel: "Ask About Injectables",
        focusTagsTitle: "Popular injectable goals",
        focusTags: ["Lip enhancement", "Cheek support", "Wrinkle softening", "Under-eye hydration", "Non-surgical rejuvenation"],
        sectionIntroTitle: "Choosing The Right Injectable Treatment",
        sectionIntroBody:
            "Start with the feature or concern you want to improve. If the goal is softening movement-related lines, tox is the clearer conversation. If you want volume or shape support, compare the filler options. If the goal is fresher-looking skin quality around the eyes, skin boosters make more sense. The lift and rejuvenation treatments sit above those when the concern is broader facial support.",
        comparisonTitle: "Compare Injectable Aesthetic Options",
        benefitsTitle: "What This Injectable Menu Helps You Compare",
        benefits: [
            "You can separate wrinkle-softening treatments from volume and shape treatments more clearly.",
            "Lip, cheek and under-eye options are easier to compare when grouped by concern.",
            "The page helps clients understand whether they need tox, filler, boosters or a broader rejuvenation treatment.",
            "It turns a specialist treatment menu into a clearer consultation starting point.",
            "Clients can message the salon with a better idea of what outcome they actually want.",
        ],
        processTitle: "What To Expect During An Injectable Consultation",
        ctaTitle: "Ready To Compare Injectable Options?",
        ctaBody:
            "Tell the salon which feature or concern you want to improve, and we can point you toward the right injectable conversation before you book.",
        faqs: [
            { question: "What is the difference between tox and fillers?", answer: "Tox is usually the comparison when the goal is softening expression-related movement and lines. Fillers are more about adding volume, contour or shape support." },
            { question: "How do I choose between regular lip filler and Russian lips?", answer: "Russian lips are usually chosen for a flatter, more shaped look, while standard lip filler is the more general volume-and-definition option. The better fit depends on the lip shape you want to create." },
            { question: "When are cheek fillers more relevant?", answer: "Cheek fillers make more sense when the concern is mid-face support, shape or lift rather than lip volume or wrinkle softening." },
            { question: "What are under-eye skin boosters for?", answer: "They are usually the better conversation when the under-eye area needs hydration and refreshment rather than fuller volume correction elsewhere on the face." },
            { question: "Which treatment is the broadest rejuvenation option?", answer: "The face-lift and rejuvenation options are the broader comparison when the goal is not just one feature, but more general support, lift or rejuvenation across the face and neck." },
        ],
        treatmentProcess: [
            { step: 1, title: "Concern Consultation", description: "We begin by identifying whether the priority is movement lines, lip shape, cheek support, under-eye freshness or broader facial rejuvenation.", duration: "10-15 min" },
            { step: 2, title: "Treatment Match", description: "Once the concern is clear, we narrow the choice to the right injectable family so you are comparing the treatments that actually match the result you want.", duration: "10 min" },
            { step: 3, title: "Area Planning", description: "The selected treatment area is reviewed so the appointment is planned around the feature being treated and the kind of result being discussed.", duration: "Varies" },
            { step: 4, title: "Procedure Discussion", description: "Before treatment, we explain what the chosen treatment is designed to do and what kind of result you can realistically expect from it.", duration: "5-10 min" },
            { step: 5, title: "Aftercare Guidance", description: "You leave with clear aftercare and follow-up guidance based on the injectable path you chose.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Rejuvenation And Lift",
                description: "These are the broader injectable options when the concern is not just one small feature but overall support and rejuvenation.",
                variants: [
                    { serviceSlug: "nefertiti-lift", summary: "A lift-focused treatment aimed at jawline and neck definition.", bestFor: "Clients wanting lower-face or neck support." },
                    { serviceSlug: "liquid-facelift", summary: "A broader non-surgical rejuvenation treatment combining more than one aesthetic goal.", bestFor: "Clients wanting an overall refreshed look." },
                    { serviceSlug: "collagen-biostimulator", summary: "A collagen-supporting injectable treatment when the goal is gradual skin support and rejuvenation.", bestFor: "Clients prioritising longer-term skin support." },
                ],
            },
            {
                title: "Wrinkle Softening And Feature-Specific Injectables",
                description: "These are the more specific treatment families when one area or one concern is the main priority.",
                variants: [
                    { serviceSlug: "tox-per-unit", summary: "A customised tox treatment for softening movement-related lines.", bestFor: "Clients targeting expression lines." },
                    { serviceSlug: "undereye-1-treatment", summary: "A focused under-eye booster option for fresher-looking eye-area skin support.", bestFor: "Clients starting with under-eye hydration support." },
                    { serviceSlug: "undereye-2-treatments", summary: "A fuller under-eye booster course when the eye-area goal needs a stronger treatment plan.", bestFor: "Clients wanting a more complete under-eye treatment path." },
                    { serviceSlug: "cheek-fillers-1ml", summary: "A lighter cheek-filler option for subtle contour and support.", bestFor: "Clients wanting more conservative cheek enhancement." },
                    { serviceSlug: "cheek-fillers-2ml", summary: "A stronger cheek-filler option when more support or shape change is needed.", bestFor: "Clients wanting a fuller cheek enhancement." },
                    { serviceSlug: "lip-filler-1ml", summary: "A standard lip-filler option for fuller, more defined lips.", bestFor: "Clients wanting general lip enhancement." },
                    { serviceSlug: "russian-lip-1ml", summary: "A Russian lip technique option for a more shaped, flatter-profile lip effect.", bestFor: "Clients wanting a more sculpted lip look." },
                    { serviceSlug: "dermal-filler-1ml", summary: "A more flexible filler option when the exact feature plan still needs to be confirmed in consultation.", bestFor: "Clients comparing a broader filler conversation." },
                ],
            },
        ],
        includedServiceSlugs: ["nefertiti-lift", "liquid-facelift", "collagen-biostimulator", "tox-per-unit", "undereye-1-treatment", "undereye-2-treatments", "cheek-fillers-1ml", "cheek-fillers-2ml", "lip-filler-1ml", "russian-lip-1ml", "dermal-filler-1ml"],
        relatedServiceSlugs: [],
    },
    {
        slug: "body-contouring",
        categoryId: "fat-freezing",
        title: "Body Contouring",
        heroTitle: "Body Contouring And Slimming In Hartbeespoort",
        metaTitle: "Fat Freezing And Slimming Treatments | Galeo Beauty",
        metaDescription:
            "Compare fat freezing and slimming treatments in Hartbeespoort, including cryolipolysis sessions, multi-cup fat freezing, Lemon Bottle and slimming injections.",
        heroIntro:
            "Body contouring options are easier to compare when you separate localised fat reduction from broader slimming support. A fat-freezing session and a slimming injection are not trying to do the same job.",
        heroBody:
            "This page brings the body contouring options together so you can compare cryolipolysis-based treatments against slimming injections and see which option better matches the area and type of result you are trying to work toward.",
        image: "/images/gallery/body-contouring/fat-freezing-red-light-body-contouring-treatment.jpg",
        imageAlt: "Body contouring treatment at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Body Contouring page on galeobeauty.com. I want help choosing the right fat freezing or slimming treatment. Can you guide me?",
        consultationLabel: "Ask About Body Contouring",
        focusTagsTitle: "Popular body goals",
        focusTags: ["Stubborn localised fat", "Double chin support", "Waist and flank contouring", "Multi-area treatment", "Slimming support"],
        sectionIntroTitle: "Choosing The Right Body Contouring Route",
        sectionIntroBody:
            "Start with whether the goal is treating a localised stubborn area or looking for lighter slimming support. Fat freezing is usually the clearer comparison when the concern is a visible pocket of resistant fat. Slimming injections and Lemon Bottle come into the conversation differently, depending on the area and the support you want around a broader body goal.",
        comparisonTitle: "Compare Body Contouring Options",
        benefitsTitle: "What This Body Contouring Menu Helps You Compare",
        benefits: [
            "You can separate localised contouring treatments from lighter slimming-support options.",
            "The difference between single-session fat freezing and multi-cup appointments is clearer.",
            "It helps clients compare area-based contouring goals with more general slimming support.",
            "The menu reads more like a body-goal decision guide instead of a mixed treatment list.",
            "Clients can ask better questions about what fits the area they want to target.",
        ],
        processTitle: "What To Expect During A Body Contouring Consultation",
        ctaTitle: "Ready To Compare Body Contouring Options?",
        ctaBody:
            "Send the salon the area you want to target and whether the goal is local contouring or broader slimming support, and we can guide you toward the right option.",
        faqs: [
            { question: "What is the difference between fat freezing and slimming injections?", answer: "Fat freezing is usually the stronger comparison when the goal is a localised stubborn area. Slimming injections are more of a broader support conversation rather than a like-for-like replacement for cryolipolysis." },
            { question: "When do multi-cup fat-freezing sessions make sense?", answer: "Multi-cup options make more sense when you want to treat more than one area or a broader zone in the same appointment rather than focusing on only one local spot." },
            { question: "What is Lemon Bottle usually used for?", answer: "Lemon Bottle is often compared when the concern is a more localised area that may suit an injection-led contouring conversation rather than a freezing-led one." },
            { question: "How do I know if my goal is local contouring or general slimming support?", answer: "If you can point to a specific stubborn area, contouring treatments are usually the more relevant comparison. If your question is broader and more general, the slimming-support conversation may be more useful." },
            { question: "Can I start with one area first?", answer: "Yes. Many clients begin with one clear problem area first, then decide later whether they want a broader contouring plan." },
        ],
        treatmentProcess: [
            { step: 1, title: "Area And Goal Review", description: "We begin by working out whether the concern is one specific stubborn area or a broader slimming-support goal.", duration: "10 min" },
            { step: 2, title: "Treatment Match", description: "Once the goal is clearer, we compare the contouring and slimming options that actually suit that type of concern.", duration: "10 min" },
            { step: 3, title: "Session Planning", description: "The area coverage is reviewed so the appointment is matched to the right size and type of treatment.", duration: "Varies" },
            { step: 4, title: "Treatment Discussion", description: "Before treatment, we explain what the selected treatment is trying to achieve and what kind of change it is meant to support.", duration: "5-10 min" },
            { step: 5, title: "Follow-Up Guidance", description: "You leave with clearer guidance on what the next step might look like if you continue the contouring or slimming plan.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Cryolipolysis And Fat Freezing",
                description: "These are the options to compare when the priority is localised fat-freezing treatment.",
                variants: [
                    { serviceSlug: "fat-freezing-session", summary: "A focused fat-freezing appointment for a smaller localised treatment conversation.", bestFor: "Clients starting with one target area." },
                    { serviceSlug: "fat-freezing-2-cups", summary: "A two-cup option when more than one local pocket needs to be treated in the same session.", bestFor: "Clients comparing a slightly broader contouring appointment." },
                    { serviceSlug: "fat-freezing-4-cups", summary: "A four-cup option when the contouring plan needs the broadest cryolipolysis coverage in one visit.", bestFor: "Clients targeting multiple areas at once." },
                ],
            },
            {
                title: "Slimming-Support Injections",
                description: "These are the options to compare when the conversation shifts away from freezing alone and toward injection-led support.",
                variants: [
                    { serviceSlug: "lemon-bottle-10ml", summary: "An injection-led contouring option often discussed for localised fat concerns.", bestFor: "Clients comparing a local injection-led contouring treatment." },
                    { serviceSlug: "slimming-injection", summary: "A lighter slimming-support injection when the goal is broader support around a weight-loss journey.", bestFor: "Clients wanting a simpler slimming-support appointment." },
                ],
            },
        ],
        includedServiceSlugs: ["fat-freezing-session", "fat-freezing-2-cups", "fat-freezing-4-cups", "lemon-bottle-10ml", "slimming-injection"],
        relatedServiceSlugs: [],
    },
    {
        slug: "massage-therapy",
        categoryId: "massages",
        title: "Massage Therapy",
        heroTitle: "Massage Therapy In Hartbeespoort",
        metaTitle: "Relaxation, Deep Tissue And Sports Massage | Galeo Beauty",
        metaDescription:
            "Compare Swedish, aromatherapy, hot stone, deep tissue, sports and back-and-neck massage in Hartbeespoort.",
        heroIntro:
            "Massage is easier to choose when you compare by the kind of relief you want, not just by duration. Relaxation massage, deeper tension work and sports recovery are not the same booking.",
        heroBody:
            "This page groups our massage menu by pressure, purpose and body focus so you can choose whether you need a calm full-body unwind, deeper muscular work or a shorter back-and-neck reset.",
        image: "/images/massages/deep-relaxation-neck-massage.jpg",
        imageAlt: "Massage therapy at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Massage Therapy page on galeobeauty.com. I want help choosing the right massage for my tension or relaxation goal. Can you guide me?",
        consultationLabel: "Ask About Massage",
        focusTagsTitle: "Popular massage goals",
        focusTags: ["Relaxation", "Stress relief", "Deep muscle tension", "Sports recovery", "Back and neck relief"],
        sectionIntroTitle: "Choosing The Right Massage",
        sectionIntroBody:
            "Start with what you want the session to do. If the goal is a calmer, more relaxing treatment, Swedish, aromatherapy and hot stone are the first comparisons. If the concern is deeper tension or recovery, deep tissue and sports massage are usually more relevant. Back-and-neck sessions are the clearer choice when the tension is concentrated in one area.",
        comparisonTitle: "Compare Massage Options",
        benefitsTitle: "What This Massage Menu Helps You Compare",
        benefits: [
            "You can separate relaxation massage from deeper muscular work more clearly.",
            "The page helps clients compare full-body treatments with shorter focused sessions.",
            "It makes sports recovery and deep tissue easier to distinguish from general relaxation massage.",
            "The menu becomes a practical choice by outcome rather than just by price and duration.",
            "Clients can book a massage that fits the tension pattern they actually have.",
        ],
        processTitle: "What To Expect During A Massage Appointment",
        ctaTitle: "Ready To Choose The Right Massage?",
        ctaBody:
            "Send the salon your main concern, whether it is stress, deep tension, recovery or back-and-neck tightness, and we can guide you to the right massage option.",
        faqs: [
            { question: "What is the difference between Swedish and deep tissue massage?", answer: "Swedish is usually the comparison when the goal is general relaxation and easier unwinding. Deep tissue is the stronger comparison when the issue is deeper muscular tension and knots." },
            { question: "When is sports massage more relevant?", answer: "Sports massage is usually the better fit when recovery, performance or exercise-related tightness is part of the conversation rather than only general relaxation." },
            { question: "Should I book a full-body massage or only back and neck?", answer: "If the tension is concentrated mainly in the shoulders, neck and upper back, the focused session is often the better fit. Full body is more relevant when you want a broader whole-body relaxation or recovery treatment." },
            { question: "What is hot stone best for?", answer: "Hot stone is often compared when the client wants a deeply relaxing heat-supported massage experience rather than a purely pressure-led one." },
            { question: "How do I choose between aromatherapy and Swedish massage?", answer: "Both sit on the more relaxation-led side of the menu. Aromatherapy is usually chosen when the sensory and essential-oil component matters, while Swedish is the more classic general-relaxation comparison." },
        ],
        treatmentProcess: [
            { step: 1, title: "Tension And Goal Review", description: "We begin by checking whether the goal is relaxation, deeper muscle work, recovery or a focused back-and-neck reset.", duration: "5-10 min" },
            { step: 2, title: "Massage Match", description: "The most relevant massage type is chosen based on the outcome you want and whether the issue is broad or concentrated in one region.", duration: "5 min" },
            { step: 3, title: "Treatment Session", description: "The massage is carried out using the pressure style and body focus that suit the treatment you booked, whether that is full body or a shorter target area.", duration: "Varies by option" },
            { step: 4, title: "Reset And Finish", description: "The session is brought down gently so the body can settle before you get up and move on with your day.", duration: "5 min" },
            { step: 5, title: "Aftercare Advice", description: "You leave with simple guidance on how to handle the rest of the day depending on the style and intensity of the massage.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Relaxation-Led Massage",
                description: "These are the options to compare when calm, stress relief and full-body relaxation are the bigger priorities.",
                variants: [
                    { serviceSlug: "swedish-massage-60", summary: "A classic relaxation massage for overall stress relief and easier unwinding.", bestFor: "Clients wanting a general full-body relaxation session." },
                    { serviceSlug: "aromatherapy-60", summary: "A more sensory relaxation option when essential oils and mood support matter.", bestFor: "Clients wanting a more atmosphere-led massage experience." },
                    { serviceSlug: "hot-stone-60", summary: "A heat-supported relaxation massage when warmth and deeper comfort are part of the appeal.", bestFor: "Clients wanting a deeply soothing full-body treatment." },
                ],
            },
            {
                title: "Tension And Recovery Work",
                description: "These are the stronger comparisons when the body needs more focused muscular work or recovery support.",
                variants: [
                    { serviceSlug: "deep-tissue-60", summary: "A deeper-pressure massage for stubborn muscular tightness and knots.", bestFor: "Clients dealing with deeper chronic tension." },
                    { serviceSlug: "sports-massage-60", summary: "A recovery-focused massage option for active bodies and post-training tightness.", bestFor: "Clients wanting sports-oriented recovery support." },
                    { serviceSlug: "back-neck-30", summary: "A shorter focused session for upper-back, shoulder and neck tension.", bestFor: "Clients with more localised upper-body tightness." },
                    { serviceSlug: "back-neck-45", summary: "A longer focused back-and-neck option when the area needs more treatment time.", bestFor: "Clients with heavier neck and shoulder tension." },
                ],
            },
        ],
        includedServiceSlugs: ["swedish-massage-60", "aromatherapy-60", "hot-stone-60", "deep-tissue-60", "sports-massage-60", "back-neck-30", "back-neck-45"],
        relatedServiceSlugs: [],
    },
    {
        slug: "haircuts-and-styling",
        categoryId: "hair",
        title: "Haircuts And Styling",
        heroTitle: "Haircuts And Styling In Hartbeespoort",
        metaTitle: "Cuts, Blow Dries And Upstyles | Galeo Beauty",
        metaDescription:
            "Compare haircuts, cut-and-blow-dry services, blow dries, gents cuts and upstyles in Hartbeespoort by length and styling goal.",
        heroIntro:
            "Hair appointments are easier to choose when you separate reshaping, styling and occasion hair. A trim, a blow dry and an upstyle all solve different problems even though they sit in the same broad menu.",
        heroBody:
            "This page groups our cuts and styling family by appointment type so you can compare whether you need a cut-only booking, a cut-and-finish service, a blow dry, a gent’s cut or a more occasion-led upstyle.",
        image: "/images/gallery/hair/brunette-curls-hair-styling-blowout-results.jpg",
        imageAlt: "Haircut and styling services at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Haircuts and Styling page on galeobeauty.com. I want help choosing the right cut or styling service. Can you guide me?",
        consultationLabel: "Ask About Haircuts And Styling",
        focusTagsTitle: "Popular styling goals",
        focusTags: ["Trim and reshape", "Cut and finish", "Blow dry", "Occasion styling", "Gents grooming"],
        sectionIntroTitle: "Choosing The Right Hair Appointment",
        sectionIntroBody:
            "Start with what needs to happen to the hair. If you need reshaping and a finished look, cut-and-blow-dry is the first comparison. If you only need the haircut itself, compare the cut-only options. If the cut is already done and you just want styling, blow dries or upstyles are the more useful comparison. Gents cuts sit separately because the appointment style is different.",
        comparisonTitle: "Compare Haircut And Styling Options",
        benefitsTitle: "What This Hair Styling Menu Helps You Compare",
        benefits: [
            "You can separate cut-only services from cut-and-finish appointments more clearly.",
            "Blow dries and upstyles are easier to compare once they are removed from the haircut conversation.",
            "Length-based differences are easier to understand when grouped inside the right appointment family.",
            "The page helps clients avoid booking a styling service when they really need a cut, or vice versa.",
            "It turns the hair menu into a practical booking guide instead of one long styling list.",
        ],
        processTitle: "What To Expect During A Hair Styling Appointment",
        ctaTitle: "Ready To Choose The Right Hair Appointment?",
        ctaBody:
            "Tell the salon whether you need reshaping, a finished blow dry, occasion styling or a gent’s cut, and we can point you toward the right option.",
        faqs: [
            { question: "What is the difference between cut only and cut and blow dry?", answer: "Cut only is for the haircut itself. Cut and blow dry is the better comparison when you want the reshaping plus a finished styled result before you leave." },
            { question: "When should I book a blow dry instead of a haircut?", answer: "Book a blow dry when the hair shape is already where it needs to be and the goal is a polished finish rather than a reshape or trim." },
            { question: "How do I choose by hair length?", answer: "Length matters because it changes the time and styling effort required. That is why several of the cut-and-styling services are grouped by short, medium, long and extra-long hair." },
            { question: "Are upstyles only for bridal hair?", answer: "No. Upstyles are also relevant for matric dance, formal events and any occasion where you want a more pinned or styled finish than a regular blow dry gives." },
            { question: "Why is gents hair a separate comparison?", answer: "Because the appointment type, timing and styling expectation are different enough that it helps to treat gents cuts as their own option." },
        ],
        treatmentProcess: [
            { step: 1, title: "Hair Goal Check", description: "We begin by confirming whether the appointment is for a reshape, a finished blow dry, a more occasion-led style or a gent’s cut.", duration: "5-10 min" },
            { step: 2, title: "Length And Service Match", description: "The most relevant service is chosen based on hair length and whether the cut, the finish or both are needed.", duration: "5 min" },
            { step: 3, title: "Cut Or Styling Work", description: "The haircut or styling work is carried out according to the service you booked.", duration: "Varies by option" },
            { step: 4, title: "Finish", description: "The look is completed so you can see the final shape, movement and finish clearly before you leave.", duration: "10-15 min" },
            { step: 5, title: "Maintenance Advice", description: "You leave with guidance on when to return and how to maintain the shape or style between visits.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Cuts And Finished Cuts",
                description: "These are the services to compare when the hair needs reshaping, with or without a finished blow dry.",
                variants: [
                    { serviceSlug: "cut-blow-short", summary: "A short-hair cut and finished styling appointment.", bestFor: "Short styles needing both shape and finish." },
                    { serviceSlug: "cut-blow-medium", summary: "A medium-length cut with a finished blow-dry result.", bestFor: "Shoulder-length hair needing reshape and finish." },
                    { serviceSlug: "cut-blow-long", summary: "A long-hair cut and finish for reshaping with a polished result.", bestFor: "Long hair needing a full salon finish." },
                    { serviceSlug: "cut-only-short", summary: "A short-hair haircut without the full styled finish.", bestFor: "Clients who only need the cut itself." },
                    { serviceSlug: "cut-only-medium", summary: "A medium-length cut-only option for maintenance shaping.", bestFor: "Clients not needing the full blow-dry finish." },
                    { serviceSlug: "cut-only-long", summary: "A long-hair cut-only option for trimming and reshaping.", bestFor: "Clients who mainly need length and layer maintenance." },
                ],
            },
            {
                title: "Styling And Occasion Hair",
                description: "These are the options to compare when the cut is already sorted and the focus is styling.",
                variants: [
                    { serviceSlug: "blow-short", summary: "A shorter blow-dry appointment for cropped or shorter lengths.", bestFor: "Short hair needing polish and movement." },
                    { serviceSlug: "blow-medium", summary: "A medium-length blow-dry appointment for smoother or bouncier finish work.", bestFor: "Medium hair needing styling only." },
                    { serviceSlug: "blow-long", summary: "A long-hair blow-dry for sleek finish or styled movement.", bestFor: "Long hair needing a polished styling result." },
                    { serviceSlug: "upstyle-short", summary: "A more occasion-led styling option for shorter lengths.", bestFor: "Short hair needing event styling." },
                    { serviceSlug: "upstyle-medium", summary: "A medium-length upstyle option for more formal hair dressing.", bestFor: "Clients booking occasion hair." },
                    { serviceSlug: "upstyle-long", summary: "A long-hair upstyle for formal or event-focused styling.", bestFor: "Clients wanting a more complete upstyle result." },
                    { serviceSlug: "gents-cut", summary: "A standard gent’s cut option for classic or modern grooming.", bestFor: "Men booking a standard cut." },
                    { serviceSlug: "gents-clipper", summary: "A clipper-based option when the cut is simpler and more machine-led.", bestFor: "Men wanting a quicker clipper finish." },
                ],
            },
        ],
        includedServiceSlugs: ["cut-blow-short", "cut-blow-medium", "cut-blow-long", "cut-only-short", "cut-only-medium", "cut-only-long", "blow-short", "blow-medium", "blow-long", "upstyle-short", "upstyle-medium", "upstyle-long", "gents-cut", "gents-clipper"],
        relatedServiceSlugs: ["cut-blow-xl", "blow-xl", "cut-pensioner"],
    },
    {
        slug: "nail-services",
        categoryId: "nails",
        title: "Nail Services",
        heroTitle: "Nail Services In Hartbeespoort",
        metaTitle: "Manicure, Pedicure, Gel And Acrylic Nails | Galeo Beauty",
        metaDescription:
            "Compare manicure, pedicure, gel, acrylic, rubber base and designer nail services in Hartbeespoort.",
        heroIntro:
            "Nail services are easier to choose when you separate natural-nail support, extension work, toes and classic maintenance. Gel overlays, acrylic tips and a pedicure are not competing versions of the same appointment.",
        heroBody:
            "This page groups our nail menu by the type of finish and maintenance you want, so you can decide whether the priority is stronger natural nails, more length, a hands-and-feet refresh or more design-led work.",
        image: "/images/gallery/nails/nude-almond-gel-nails-galeo-beauty-salon.jpg",
        imageAlt: "Nail services at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Nail Services page on galeobeauty.com. I want help choosing the right manicure, extension or pedicure option. Can you guide me?",
        consultationLabel: "Ask About Nail Services",
        focusTagsTitle: "Popular nail goals",
        focusTags: ["Stronger natural nails", "More length", "Pedicure care", "Long-lasting finish", "Designer nails"],
        sectionIntroTitle: "Choosing The Right Nail Appointment",
        sectionIntroBody:
            "Start with what you want the appointment to do. If the aim is supporting your natural nails, compare overlays and rubber base first. If you want length, compare tips, sculpted forms and acrylic options. If the focus is feet, compare pedicure, gel toes and toe-specific options. Designer work and combos come in when the finish matters as much as the base service.",
        comparisonTitle: "Compare Nail Options",
        benefitsTitle: "What This Nail Menu Helps You Compare",
        benefits: [
            "You can separate natural-nail overlays from extension services more clearly.",
            "The page helps clients compare hand-focused, feet-focused and combo appointments.",
            "It makes gel, acrylic and rubber-base decisions easier to understand before booking.",
            "Clients can see when a maintenance manicure is enough and when they actually want length or design.",
            "The menu becomes a clearer booking tool instead of a dense treatment list.",
        ],
        processTitle: "What To Expect During A Nail Appointment",
        ctaTitle: "Ready To Choose The Right Nail Service?",
        ctaBody:
            "Tell the salon whether you want strength, length, toes, a simple refresh or a more design-led set, and we can guide you to the best option.",
        faqs: [
            { question: "What is the difference between gel overlay and acrylic overlay?", answer: "Both sit in the natural-nail support part of the menu, but they use different systems and feel different in wear. The better fit depends on the finish and durability style you prefer." },
            { question: "When should I choose tips or sculpted forms?", answer: "Those are the stronger comparisons when you want added length rather than just support over your natural nails." },
            { question: "Is rubber base for natural nails or extensions?", answer: "Rubber base is usually part of the natural-nail support conversation, especially when the goal is a flexible, stronger base rather than a full extension look." },
            { question: "How do I choose between manicure and mani-pedi combo?", answer: "Choose manicure when hands are the main focus. The combo is better when both hands and feet need a refresh in one booking." },
            { question: "When does designer nails make sense?", answer: "Designer nails are the better comparison when the art, detail or custom finish matters as much as the base nail service itself." },
        ],
        treatmentProcess: [
            { step: 1, title: "Finish And Goal Check", description: "We start by confirming whether the priority is natural-nail support, added length, a pedicure refresh or a more design-led finish.", duration: "5-10 min" },
            { step: 2, title: "Service Match", description: "The most relevant nail option is selected based on whether you want maintenance, strength, extension length or feet-focused care.", duration: "5 min" },
            { step: 3, title: "Prep And Application", description: "The nails are prepared and the selected system or service is carried out according to the treatment you booked.", duration: "Varies by option" },
            { step: 4, title: "Finish Work", description: "Colour, gloss, shaping or design details are completed so the final result matches the style you chose.", duration: "10-20 min" },
            { step: 5, title: "Maintenance Advice", description: "You leave with a clear idea of how to maintain the set and when to come back for the next appointment.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Natural Nail Support",
                description: "These are the services to compare when you want strength and finish without moving fully into length-focused extensions.",
                variants: [
                    { serviceSlug: "gel-overlay-hands", summary: "A gel overlay option for strengthening natural nails with a durable finish.", bestFor: "Clients wanting support on their existing nails." },
                    { serviceSlug: "acrylic-overlay", summary: "An acrylic overlay option for clients comparing a harder-wearing natural-nail coating.", bestFor: "Clients wanting a firmer overlay feel." },
                    { serviceSlug: "rubber-base", summary: "A rubber-base option when flexible support and natural-nail strength are the priority.", bestFor: "Clients wanting stronger natural nails without full extensions." },
                    { serviceSlug: "full-manicure", summary: "A maintenance manicure for shaping, cuticle care and a cleaner overall hand finish.", bestFor: "Clients wanting a classic hands refresh." },
                ],
            },
            {
                title: "Extensions And Design",
                description: "These are the stronger comparisons when you want more length or a more custom finished set.",
                variants: [
                    { serviceSlug: "gel-tips", summary: "A gel-and-tips option when you want added length with a gel finish.", bestFor: "Clients wanting a cleaner length extension option." },
                    { serviceSlug: "acrylic-tips", summary: "A classic acrylic extension option for added length and structure.", bestFor: "Clients wanting a stronger traditional extension set." },
                    { serviceSlug: "sculpted-forms", summary: "A sculpted extension option without relying on tips.", bestFor: "Clients wanting a more custom extension build." },
                    { serviceSlug: "designer-nails", summary: "A more creative option when the final design matters as much as the base system.", bestFor: "Clients wanting nail art or a more statement set." },
                ],
            },
            {
                title: "Feet And Combo Appointments",
                description: "These are the options to compare when toes or combined hand-and-foot maintenance are the priority.",
                variants: [
                    { serviceSlug: "gel-toes", summary: "A toe-focused gel option for a long-lasting polished finish.", bestFor: "Clients wanting a toes-only polish service." },
                    { serviceSlug: "rubber-base-toes", summary: "A toe-focused rubber-base option when longer wear matters on toes as well.", bestFor: "Clients wanting a longer-wear toe finish." },
                    { serviceSlug: "pedicure", summary: "A full pedicure option when the goal is more foot care plus polish rather than only colour.", bestFor: "Clients wanting a fuller feet refresh." },
                    { serviceSlug: "mani-pedi-combo", summary: "A combined hands-and-feet booking for broader maintenance in one appointment.", bestFor: "Clients wanting both hands and feet done together." },
                ],
            },
        ],
        includedServiceSlugs: ["gel-overlay-hands", "acrylic-overlay", "rubber-base", "full-manicure", "gel-tips", "acrylic-tips", "sculpted-forms", "designer-nails", "gel-toes", "rubber-base-toes", "pedicure", "mani-pedi-combo"],
        relatedServiceSlugs: ["soak-off", "para-dip", "revarnish", "nail-art"],
    },
    {
        slug: "makeup-services",
        categoryId: "makeup",
        title: "Makeup Services",
        heroTitle: "Makeup Services In Hartbeespoort",
        metaTitle: "Bridal, Evening And Day Makeup | Galeo Beauty",
        metaDescription:
            "Compare bridal, bridal trial, evening and day makeup in Hartbeespoort on one bespoke makeup service page.",
        heroIntro:
            "Makeup bookings are easier to choose when you compare them by occasion and pressure level. Bridal makeup, a trial, an evening glam look and a lighter daytime appointment are all different decisions.",
        heroBody:
            "This page groups our makeup menu by event type so you can choose whether the booking is for your wedding day, a trial run, a special evening look or a cleaner daytime finish.",
        image: "/images/make-up/expert-bridal-makeup-application.jpg",
        imageAlt: "Professional makeup application at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Makeup Services page on galeobeauty.com. I want help choosing the right makeup booking for my event. Can you guide me?",
        consultationLabel: "Ask About Makeup",
        focusTagsTitle: "Popular makeup goals",
        focusTags: ["Wedding-day makeup", "Bridal trial", "Evening glam", "Natural daytime look", "Photo-ready finish"],
        sectionIntroTitle: "Choosing The Right Makeup Booking",
        sectionIntroBody:
            "Start with the occasion. Bridal makeup and bridal trials sit in their own category because they carry more planning and expectation than a standard event look. Evening makeup is the stronger comparison when you want more glam or a more visible finish, while day makeup suits a lighter and cleaner result.",
        comparisonTitle: "Compare Makeup Options",
        benefitsTitle: "What This Makeup Menu Helps You Compare",
        benefits: [
            "You can separate bridal makeup from standard event makeup more clearly.",
            "The page makes bridal trials easier to understand as a planning appointment, not just another makeup slot.",
            "It helps clients choose between lighter day makeup and fuller evening makeup.",
            "The menu becomes occasion-led instead of feeling like one generic makeup list.",
            "Clients can book with clearer expectations about finish and intensity.",
        ],
        processTitle: "What To Expect During A Makeup Appointment",
        ctaTitle: "Ready To Choose The Right Makeup Booking?",
        ctaBody:
            "Tell the salon what event you are booking for and how soft or glam you want the finish, and we can guide you toward the right makeup option.",
        faqs: [
            { question: "What is the difference between bridal makeup and bridal trial?", answer: "Bridal makeup is the wedding-day booking itself. A bridal trial is the planning and testing appointment before the day so the final look feels settled and clear in advance." },
            { question: "When should I choose evening makeup over day makeup?", answer: "Evening makeup is the stronger comparison when you want a more glamorous, visible or photo-led finish. Day makeup is better when the goal is fresher and lighter." },
            { question: "Is bridal makeup only for very full glam looks?", answer: "No. Bridal makeup is still chosen by the kind of bride you want to look like. The category matters because of the occasion and planning, not because every bride wants the same finish." },
            { question: "Do I need a bridal trial if I already know what I like?", answer: "A trial is still useful when you want to see the final bridal direction on your own face before the day and remove uncertainty from the wedding booking." },
            { question: "Which makeup option is best for photoshoots or formal events?", answer: "Evening makeup is usually the stronger comparison when the look needs more impact, polish or camera-readiness than a simple daytime booking." },
        ],
        treatmentProcess: [
            { step: 1, title: "Occasion Review", description: "We start by confirming whether the booking is for a wedding, a trial, an evening event or a lighter daytime look.", duration: "5-10 min" },
            { step: 2, title: "Finish Direction", description: "The level of glam, softness and overall feel is matched to the occasion so the look suits the event instead of fighting it.", duration: "5-10 min" },
            { step: 3, title: "Makeup Application", description: "The chosen makeup look is applied according to the finish and occasion you booked for.", duration: "Varies by option" },
            { step: 4, title: "Refinement", description: "The final look is refined so the balance, polish and overall impact match the brief discussed at the start.", duration: "10 min" },
            { step: 5, title: "Final Check", description: "Before you leave, we make sure the look reads the way you want in person and for the type of event you are heading into.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Bridal Makeup",
                description: "These are the options to compare when the booking is connected to your wedding and needs more planning certainty.",
                variants: [
                    { serviceSlug: "bridal-makeup", summary: "The wedding-day makeup booking itself, designed around the final bridal look.", bestFor: "Brides booking their main event-day makeup." },
                    { serviceSlug: "bridal-trial", summary: "A trial appointment for testing and refining the bridal look before the wedding day.", bestFor: "Brides wanting more certainty before the big day." },
                ],
            },
            {
                title: "Event And Day Makeup",
                description: "These are the stronger comparisons when the booking is not bridal and the main question is how soft or glam the finish should be.",
                variants: [
                    { serviceSlug: "evening-makeup", summary: "A fuller event makeup option for more glam, polish or occasion presence.", bestFor: "Clients attending formal events, functions or photoshoots." },
                    { serviceSlug: "day-makeup", summary: "A lighter daytime makeup option with a cleaner and softer finish.", bestFor: "Clients wanting a fresher daytime look." },
                ],
            },
        ],
        includedServiceSlugs: ["bridal-makeup", "bridal-trial", "evening-makeup", "day-makeup"],
        relatedServiceSlugs: [],
    },
    {
        slug: "tanning-services",
        categoryId: "sunbed",
        title: "Tanning Services",
        heroTitle: "Tanning Services In Hartbeespoort",
        metaTitle: "Spray Tan And Sunbed Sessions | Galeo Beauty",
        metaDescription:
            "Compare spray tan, single sunbed sessions and sunbed packages in Hartbeespoort on one bespoke tanning services page.",
        heroIntro:
            "Tanning bookings are easier to choose when you separate instant spray-tan results from session-based sunbed planning. They serve different routines and different expectations.",
        heroBody:
            "This page groups our tanning services by how you want to build the result: an immediate spray-tan finish, a one-off sunbed visit or a package for ongoing tanning maintenance.",
        image: "/images/gallery/specials/galeo-beauty-nail-specials-price-list.jpg",
        imageAlt: "Tanning services at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Tanning Services page on galeobeauty.com. I want help choosing between spray tan and sunbed options. Can you guide me?",
        consultationLabel: "Ask About Tanning",
        focusTagsTitle: "Popular tanning goals",
        focusTags: ["Instant glow", "Single-session tanning", "Ongoing tan maintenance", "Event-ready bronze", "Package tanning"],
        sectionIntroTitle: "Choosing The Right Tanning Option",
        sectionIntroBody:
            "Start with whether you want an immediate spray result or a session-based tanning plan. Spray tan is usually the comparison when the goal is a faster event-ready finish. Sunbed sessions and packages are the more relevant comparison when you want a repeatable tanning schedule.",
        comparisonTitle: "Compare Tanning Options",
        benefitsTitle: "What This Tanning Menu Helps You Compare",
        benefits: [
            "You can separate spray tan from sunbed planning more clearly.",
            "The page helps distinguish between one-off tanning and package-based tanning.",
            "It makes the difference between an instant bronze finish and a session-led plan easier to understand.",
            "Clients can choose the right tanning path based on timing and routine.",
            "The tanning menu becomes easier to understand before booking.",
        ],
        processTitle: "What To Expect During A Tanning Appointment",
        ctaTitle: "Ready To Choose The Right Tanning Option?",
        ctaBody:
            "Tell the salon whether you want an immediate spray-tan result or a session-based tanning plan, and we can guide you toward the right option.",
        faqs: [
            { question: "What is the difference between spray tan and sunbed sessions?", answer: "Spray tan is usually the better comparison when you want an immediate event-ready bronze finish. Sunbed sessions are more of a session-based tanning plan that fits repeat maintenance." },
            { question: "When should I choose a sunbed package instead of one session?", answer: "Packages make more sense when you want an ongoing tanning plan rather than a single standalone visit." },
            { question: "Is spray tan better for events?", answer: "Spray tan is often the clearer comparison when timing matters and you want the bronzed look more immediately." },
            { question: "What is the value of a 10- or 20-session sunbed package?", answer: "Those packages are the better comparison when tanning is something you want to maintain over time rather than treat as a one-off visit." },
            { question: "How do I know which tanning option fits me?", answer: "Start with how fast you want the result and whether you see the booking as a one-off finish or an ongoing tanning routine." },
        ],
        treatmentProcess: [
            { step: 1, title: "Tanning Goal Review", description: "We begin by confirming whether the goal is an immediate spray-tan finish or a session-based tanning plan.", duration: "5 min" },
            { step: 2, title: "Option Match", description: "The tanning service is matched to whether you need a one-off result or a longer tanning routine.", duration: "5 min" },
            { step: 3, title: "Treatment Session", description: "The chosen tanning treatment is carried out according to the service you booked.", duration: "Varies by option" },
            { step: 4, title: "Finish And Guidance", description: "You are guided on what to expect from the result and how to think about the next step if you want to maintain it.", duration: "5 min" },
            { step: 5, title: "Maintenance Planning", description: "Where relevant, we explain how single sessions and packages differ in terms of ongoing planning.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Immediate Bronze",
                description: "This is the option to compare when you want a faster visible tanning result.",
                variants: [
                    { serviceSlug: "spraytan", summary: "A spray-tan option for an immediate bronzed finish.", bestFor: "Clients wanting a faster event-ready glow." },
                ],
            },
            {
                title: "Sunbed Sessions And Packages",
                description: "These are the options to compare when tanning is more of a session-led routine.",
                variants: [
                    { serviceSlug: "sunbed-session", summary: "A one-off sunbed session when you want a single tanning visit.", bestFor: "Clients trying this option or booking a standalone session." },
                    { serviceSlug: "sunbed-10", summary: "A 10-session package when tanning is part of an ongoing plan.", bestFor: "Clients wanting a medium-term tanning package." },
                    { serviceSlug: "sunbed-20", summary: "A 20-session package when the tanning routine is more established and repeat-based.", bestFor: "Clients wanting a longer package option." },
                ],
            },
        ],
        includedServiceSlugs: ["spraytan", "sunbed-session", "sunbed-10", "sunbed-20"],
        relatedServiceSlugs: [],
    },
    {
        slug: "medical-aesthetic-treatments",
        categoryId: "medical",
        title: "Medical Aesthetic Treatments",
        heroTitle: "Medical Aesthetic Treatments In Hartbeespoort",
        metaTitle: "Fractional Laser, Plasmage, IV Drip And Vaginal Tightening | Galeo Beauty",
        metaDescription:
            "Compare medical aesthetic treatments in Hartbeespoort, including fractional laser, Plasmage, IV drips and vaginal tightening.",
        heroIntro:
            "Medical treatments should be compared by what area and concern they address, not just by technology name. Laser resurfacing, plasma tightening, IV wellness and intimate rejuvenation are very different conversations.",
        heroBody:
            "This page groups our medical aesthetic services into skin correction, wellness support and intimate treatment so the menu makes sense from a client point of view before anyone books a specialist appointment.",
        image: "/images/dermalogica/dermalogica-microneedling-treatment.png",
        imageAlt: "Medical aesthetic treatment at Galeo Beauty in Hartbeespoort",
        bookingMessage:
            "Hi! I found your Medical Aesthetic Treatments page on galeobeauty.com. I want help choosing the right specialist treatment. Can you guide me?",
        consultationLabel: "Ask About Medical Treatments",
        focusTagsTitle: "Popular medical treatment goals",
        focusTags: ["Skin resurfacing", "Skin tightening", "Hydration and wellness", "Intimate rejuvenation", "More specialist correction"],
        sectionIntroTitle: "Choosing The Right Medical Treatment",
        sectionIntroBody:
            "Start with the concern being treated. Fractional laser and Plasmage are the stronger comparisons when the conversation is about visible skin correction and tightening. IV drips sit in the wellness-support category, while vaginal tightening belongs to a more specific intimate-treatment conversation.",
        comparisonTitle: "Compare Medical Aesthetic Options",
        benefitsTitle: "What This Medical Menu Helps You Compare",
        benefits: [
            "You can separate specialist skin-correction treatments from wellness and intimate services more clearly.",
            "The page helps clients understand that these are very different treatment conversations.",
            "It makes laser and plasma options easier to compare at a high level before consultation.",
            "It gives the medical category a more usable structure than a mixed list of technologies.",
            "Clients can approach the right specialist conversation faster.",
        ],
        processTitle: "What To Expect During A Medical Consultation",
        ctaTitle: "Ready To Compare Medical Treatment Options?",
        ctaBody:
            "Tell the salon which concern you want to address, whether it is resurfacing, tightening, hydration support or intimate rejuvenation, and we can guide you to the right specialist treatment.",
        faqs: [
            { question: "What is the difference between fractional laser and Plasmage?", answer: "They are not the same kind of specialist treatment. Fractional laser is usually the comparison when resurfacing and texture correction are central, while Plasmage is more often discussed around tightening and lifting concerns." },
            { question: "When is IV drip the better comparison?", answer: "IV drip is the relevant option when the conversation is more about hydration, energy or wellness support rather than visible skin resurfacing or tightening." },
            { question: "Is vaginal tightening part of the same decision as laser or Plasmage?", answer: "No. It belongs to a much more specific intimate-treatment conversation, which is why it helps to separate it clearly inside the medical family." },
            { question: "How do I know if I need a medical category treatment instead of a standard facial?", answer: "If the concern is more specialist, technology-led or falls outside the typical facial conversation, the medical category is more likely to be the right place to start." },
            { question: "Should I message before booking a medical treatment?", answer: "Yes, because these services are more specialist and it helps to confirm the concern and the best-fit treatment before finalising the appointment." },
        ],
        treatmentProcess: [
            { step: 1, title: "Specialist Concern Review", description: "We begin by clarifying the treatment area and the specific specialist concern you want to address.", duration: "10-15 min" },
            { step: 2, title: "Treatment Match", description: "The most relevant medical treatment is matched to the concern so you are comparing the right category of care before anything else.", duration: "10 min" },
            { step: 3, title: "Procedure Planning", description: "The selected treatment plan is discussed in practical terms so the appointment is grounded in what the treatment is actually meant to do.", duration: "Varies" },
            { step: 4, title: "Treatment Discussion", description: "Before treatment, we explain what to expect from the chosen specialist treatment and what kind of follow-up may be involved.", duration: "5-10 min" },
            { step: 5, title: "Aftercare And Next Steps", description: "You leave with aftercare and clearer next-step guidance based on the specialist service discussed.", duration: "5 min" },
        ],
        variantGroups: [
            {
                title: "Skin Correction And Tightening",
                description: "These are the options to compare when visible correction, resurfacing or tightening are the main concerns.",
                variants: [
                    { serviceSlug: "fractional-laser", summary: "A specialist resurfacing treatment when texture and stronger skin correction are part of the conversation.", bestFor: "Clients wanting a more corrective skin treatment." },
                    { serviceSlug: "plasmage", summary: "A specialist tightening treatment when lift or skin laxity is the bigger concern.", bestFor: "Clients comparing a non-surgical tightening option." },
                ],
            },
            {
                title: "Wellness And Intimate Treatments",
                description: "These are the options to compare when the treatment goal sits outside a standard skin-correction conversation.",
                variants: [
                    { serviceSlug: "iv-drip", summary: "A wellness-support treatment for hydration and internal support conversations.", bestFor: "Clients asking about energy, hydration or recovery support." },
                    { serviceSlug: "vaginal-tightening", summary: "A specific intimate treatment for clients discussing non-surgical vaginal tightening.", bestFor: "Clients wanting an intimate rejuvenation conversation." },
                ],
            },
        ],
        includedServiceSlugs: ["fractional-laser", "plasmage", "iv-drip", "vaginal-tightening"],
        relatedServiceSlugs: [],
    },
];

function getServiceRecordMap() {
    return new Map(getCachedSEOServices().map((service) => [service.slug, service]));
}

function getServiceItemMap() {
    const entries: Array<[string, ServiceItem]> = [];

    for (const category of serviceCategories) {
        for (const subcategory of category.subcategories) {
            for (const item of subcategory.items) {
                entries.push([item.id, item]);
            }
        }
    }

    return new Map(entries);
}

export function getBespokeServicePageBySlug(slug: string): BespokeServicePage | undefined {
    return bespokeServicePages.find((page) => page.slug === slug);
}

export function getBespokeServicePagesForCategory(categoryId: string): BespokeServicePage[] {
    return bespokeServicePages.filter((page) => page.categoryId === categoryId);
}

export function getAllBespokeServicePages(): BespokeServicePage[] {
    return bespokeServicePages;
}

export function getAllBespokeServicePageParams(): Array<{ category: string; service: string }> {
    return bespokeServicePages.map((page) => ({
        category: page.categoryId,
        service: page.slug,
    }));
}

export function resolveBespokeServicePage(slug: string): ResolvedBespokeServicePage | undefined {
    const page = getBespokeServicePageBySlug(slug);

    if (!page) {
        return undefined;
    }

    const category = getCategoryById(page.categoryId);

    if (!category) {
        return undefined;
    }

    const serviceMap = getServiceRecordMap();
    const itemMap = getServiceItemMap();

    const includedServices = page.includedServiceSlugs
        .map((serviceSlug) => serviceMap.get(serviceSlug))
        .filter((service): service is SEOService => Boolean(service));

    const variantGroups = page.variantGroups.map((group) => ({
        ...group,
        variants: group.variants
            .map((variant) => {
                const service = serviceMap.get(variant.serviceSlug);
                const item = itemMap.get(variant.serviceSlug);

                if (!service || !item) {
                    return null;
                }

                return {
                    ...variant,
                    service,
                    item,
                };
            })
            .filter((variant): variant is BespokeServiceVariantDetail => Boolean(variant)),
    }));

    return {
        ...page,
        category,
        variantGroups,
        includedServices,
    };
}

export function getBespokeServicePageRelatedServices(page: ResolvedBespokeServicePage, limit = 6): SEOService[] {
    const included = new Set(page.includedServiceSlugs);

    const source = page.relatedServiceSlugs?.length
        ? page.relatedServiceSlugs
            .map((slug) => getServiceRecordMap().get(slug))
            .filter((service): service is SEOService => Boolean(service))
        : getCachedSEOServices().filter(
            (service) => service.categoryId === page.categoryId && !included.has(service.slug)
        );

    return source.slice(0, limit);
}
