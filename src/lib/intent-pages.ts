import { getAllSEOServices } from "./seo-data";

export interface IntentFaq {
    question: string;
    answer: string;
}

export interface IntentLink {
    label: string;
    href: string;
    description: string;
}

export interface IntentPageSpec {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    eyebrow: string;
    heroDescription: string;
    heroImage: string;
    heroImageAlt: string;
    primaryKeywords: string[];
    supportingKeywords: string[];
    symptoms: string[];
    results: string[];
    comparisons: string[];
    objections: string[];
    audiences: string[];
    whyItHappens: string;
    treatmentApproach: string;
    bestFor: string[];
    sections: Array<{
        title: string;
        body: string;
    }>;
    faqs: IntentFaq[];
    categoryIds: string[];
    serviceSlugs: string[];
}

function buildServiceLinks(serviceSlugs: string[]): IntentLink[] {
    const services = getAllSEOServices();

    return serviceSlugs
        .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
        .filter((service): service is NonNullable<typeof service> => Boolean(service))
        .map((service) => ({
            label: service.keyword,
            href: `/prices/${service.categoryId}/${service.slug}`,
            description: `${service.price}${service.duration ? ` | ${service.duration}` : ""}`,
        }));
}

const INTENT_PAGES: IntentPageSpec[] = [
    {
        slug: "acne-treatment-hartbeespoort",
        title: "Acne Treatment in Hartbeespoort",
        metaTitle: "Acne Treatment in Hartbeespoort | Facials, Peels & Microneedling",
        metaDescription: "Looking for acne treatment in Hartbeespoort or Harties? Explore facials, peels and microneedling for breakouts, clogged pores, oily skin and post-acne marks at Galeo Beauty.",
        h1: "Acne Treatment in Hartbeespoort",
        eyebrow: "Breakouts, congestion and acne-prone skin",
        heroDescription: "If your skin feels stuck in a cycle of angry breakouts, blocked pores, oiliness and marks that never quite clear, this guide explains which professional treatments can help settle things down.",
        heroImage: "/images/dermalogica/dermalogica-proskin-treatment.jpg",
        heroImageAlt: "Acne treatment facial in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["acne treatment hartbeespoort", "adult acne treatment harties", "breakout treatment hartbeespoort", "clogged pores treatment hartbeespoort"],
        supportingKeywords: ["acne facial hartbeespoort", "blackhead removal facial", "oily skin treatment", "hormonal breakouts treatment"],
        symptoms: ["stubborn adult breakouts", "blocked pores that keep filling up", "blackheads that return quickly", "shiny oily skin", "skin that feels congested all the time", "spots that flare before events"],
        results: ["clearer calmer skin", "fewer active breakouts", "cleaner clearer pores", "less oiliness through the day", "smoother skin texture"],
        comparisons: ["acne facials vs peels", "peels vs microneedling", "best treatment for congested skin"],
        objections: ["treatment for sensitive acne skin", "manageable downtime", "professional help for recurring breakouts"],
        audiences: ["adult acne sufferers", "oily skin clients", "event prep skin reset", "clients with recurring congestion"],
        whyItHappens: "Acne rarely feels like one simple problem. Some skin stays inflamed, some stays oily and congested, and some seems to improve only to leave new marks behind. That is why the right starting point depends on what is happening on your skin right now.",
        treatmentApproach: "We first work out whether your biggest issue is inflamed breakouts, clogged pores, excess oil or the marks left behind. From there, we guide you toward the facial, peel or corrective plan that makes the most sense for your skin pattern.",
        bestFor: ["recurring breakouts", "blocked pores and blackheads", "oily acne prone skin", "skin that feels constantly congested", "adult acne flare ups"],
        sections: [
            {
                title: "Why acne can feel difficult to treat",
                body: "Many people know they need help with breakouts, but are not yet sure whether they need a peel, a deep-cleansing facial or a more corrective treatment. The first step is understanding what your skin is doing now.",
            },
            {
                title: "Professional options for active acne and congestion",
                body: "For active acne, the focus is usually on calming inflammation, clearing congestion and helping the skin feel cleaner and more balanced before moving into stronger corrective work.",
            },
            {
                title: "When the focus shifts from breakouts to marks",
                body: "If your breakouts are settling but you are left with dark marks or uneven texture, the right plan may shift toward skin recovery, scar refinement and more corrective treatments.",
            },
        ],
        faqs: [
            { question: "What is the best acne treatment in Hartbeespoort?", answer: "That depends on whether your main issue is active breakouts, congestion, oily skin, blackheads or post-acne marks. Galeo typically matches facials, peels and microneedling based on the dominant concern." },
            { question: "Can I treat adult acne with facials and peels?", answer: "Yes. Adult acne often responds well to targeted skin-clearing facials, pore-decongesting treatments and carefully selected resurfacing support when appropriate." },
            { question: "What if I have both acne and acne marks?", answer: "The treatment plan normally needs to start by calming active breakouts first, then shift toward mark fading or scar refinement once inflammation is under better control." },
        ],
        categoryIds: ["dermalogica"],
        serviceSlugs: ["pro-clear", "skin-clearing-facial", "pro-power-peel", "pro-microneedling"],
    },
    {
        slug: "acne-scar-treatment-hartbeespoort",
        title: "Acne Scar Treatment in Hartbeespoort",
        metaTitle: "Acne Scar Treatment in Hartbeespoort | Microneedling, Peels & Laser",
        metaDescription: "Treat acne scars, dark acne marks and uneven texture in Hartbeespoort with microneedling, resurfacing peels and corrective skin treatments at Galeo Beauty.",
        h1: "Acne Scar Treatment in Hartbeespoort",
        eyebrow: "Texture, marks and post-acne repair",
        heroDescription: "If the breakouts have faded but your skin still shows the aftermath through dark marks, rough texture or indented scarring, this guide explains the treatments that can help your skin look smoother again.",
        heroImage: "/images/dermalogica/dermalogica-microneedling-treatment.png",
        heroImageAlt: "Acne scar treatment in Hartbeespoort with microneedling",
        primaryKeywords: ["acne scar treatment hartbeespoort", "acne scars harties", "pitted acne scars treatment", "dark acne marks treatment"],
        supportingKeywords: ["textured skin after acne", "post acne marks", "microneedling for acne scars", "peel for acne scars"],
        symptoms: ["pitted acne scars", "dark marks that linger for months", "uneven skin texture after acne", "rough skin that catches makeup", "skin that still looks marked after breakouts"],
        results: ["smoother skin texture", "softer looking scars", "lighter post acne marks", "a more even skin surface", "gradual visible skin renewal"],
        comparisons: ["microneedling vs peel", "fractional laser vs microneedling", "best treatment for acne scars"],
        objections: ["corrective treatment with manageable downtime", "gradual but visible improvement", "professional scar-focused treatment plan"],
        audiences: ["post-acne clients", "textural skin concerns", "adults with lingering scars", "clients comparing corrective treatments"],
        whyItHappens: "What acne leaves behind is not always the same. Some people mainly see dark marks, while others feel bothered by pitting, roughness or skin that no longer reflects light evenly. Those differences matter because each one responds to a different treatment approach.",
        treatmentApproach: "We look at whether the concern is colour, texture or both, then factor in sensitivity and downtime before recommending a staged plan. Acne-scar work is usually about steady improvement rather than a single quick fix.",
        bestFor: ["dark marks after acne", "pitted acne scarring", "post acne texture", "skin that still looks uneven after breakouts"],
        sections: [
            {
                title: "Acne scars and acne marks are not the same thing",
                body: "Dark marks, lingering redness and pitted texture usually need different treatment approaches. Understanding that difference helps set more realistic expectations from the start.",
            },
            {
                title: "Treatment options for texture, marks and skin renewal",
                body: "Microneedling, resurfacing peels and stronger corrective treatments each play a different role depending on how stubborn the texture or pigmentation has become.",
            },
            {
                title: "What realistic improvement can look like",
                body: "Acne-scar work is usually about gradual change rather than a once-off transformation. Smoother texture often comes from a course of treatments and consistent professional guidance.",
            },
        ],
        faqs: [
            { question: "What is the best acne scar treatment in Hartbeespoort?", answer: "That depends on whether you are dealing with dark marks, textural scarring or both. Galeo typically considers microneedling, resurfacing peels and stronger corrective treatments based on scar type." },
            { question: "Does microneedling help acne scars?", answer: "Yes. Microneedling is commonly used to stimulate collagen and help refine the look of textural acne scars over a course of sessions." },
            { question: "What if my acne scars are dark marks rather than pits?", answer: "Dark marks usually need a slightly different strategy from pitted scars, often leaning more into brightening, resurfacing and pigment-focused treatments." },
        ],
        categoryIds: ["dermalogica", "medical"],
        serviceSlugs: ["pro-microneedling", "pro-power-peel", "fractional-laser"],
    },
    {
        slug: "stubborn-belly-fat-treatment-hartbeespoort",
        title: "Stubborn Belly Fat Treatment in Hartbeespoort",
        metaTitle: "Stubborn Belly Fat Treatment in Hartbeespoort | Fat Freezing & Body Contouring",
        metaDescription: "Treat stubborn belly fat, love handles and lower tummy fullness in Hartbeespoort with fat freezing and body contouring options at Galeo Beauty.",
        h1: "Stubborn Belly Fat Treatment in Hartbeespoort",
        eyebrow: "Body contouring for gym-resistant fat",
        heroDescription: "If you feel close to your goal but still have a lower tummy, love handles or another area that refuses to budge, this guide explains the non-surgical options for refining that shape.",
        heroImage: "/images/fat-freezing/fat-freezing-stomach-treatment.jpg",
        heroImageAlt: "Stubborn belly fat treatment in Hartbeespoort",
        primaryKeywords: ["stubborn belly fat treatment hartbeespoort", "lower belly pooch treatment", "non surgical belly fat reduction", "love handles treatment hartbeespoort"],
        supportingKeywords: ["muffin top treatment", "inch loss treatment", "coolsculpting alternative hartbeespoort", "body contouring for stomach fat"],
        symptoms: ["stubborn tummy fullness", "a lower belly pooch that will not shift", "love handles in fitted clothes", "muffin top around the waist", "small fat pockets that resist the gym"],
        results: ["a flatter smoother stomach area", "better waist definition", "visible inch loss", "a cleaner body contour", "more confidence in fitted clothing"],
        comparisons: ["fat freezing vs slimming injections", "cryolipolysis vs liposuction", "body contouring vs weight loss"],
        objections: ["non surgical belly fat treatment", "no downtime contouring", "treatment for gym-resistant areas"],
        audiences: ["post baby body contouring", "holiday body prep", "clients close to goal weight", "event shape prep"],
        whyItHappens: "Localized fullness often feels different from general weight gain. Many clients are eating well, training consistently and still feel annoyed by one or two areas that change much more slowly than the rest of the body.",
        treatmentApproach: "The aim is targeted contour refinement, not dramatic scale changes. We help you compare which non-surgical option best suits the area bothering you, the amount of fullness there, and the kind of change that feels realistic.",
        bestFor: ["lower tummy fullness", "love handles", "gym resistant fat pockets", "clients who want shape refinement"],
        sections: [
            {
                title: "Why localized belly fat feels different",
                body: "This concern is usually about shape and contour rather than the number on a scale. Many clients feel healthy overall but still want support in an area that feels resistant.",
            },
            {
                title: "Treatment options for resistant areas",
                body: "Different contouring treatments suit different goals. The right option depends on the area you want to refine, your comfort with downtime and how targeted the concern is.",
            },
            {
                title: "What realistic contouring results can look like",
                body: "The goal is usually a flatter, more defined shape or visible inch loss in a specific area, rather than a dramatic full-body change.",
            },
        ],
        faqs: [
            { question: "What is the best treatment for stubborn belly fat in Hartbeespoort?", answer: "That depends on whether the main issue is localized fat, overall weight-loss goals or general body shape. Galeo uses body contouring treatments for targeted areas rather than positioning them as overall weight-loss solutions." },
            { question: "Does fat freezing help with love handles?", answer: "Yes, love handles are one of the most common areas clients target with fat freezing because they are often resistant to exercise alone." },
            { question: "Can these treatments flatten the lower tummy?", answer: "They can help contour and reduce localized fullness in the lower tummy area when you are an appropriate candidate, but they are not a substitute for overall lifestyle change or surgical intervention." },
        ],
        categoryIds: ["fat-freezing", "slimming"],
        serviceSlugs: ["fat-freezing-session", "fat-freezing-2-cups", "fat-freezing-4-cups", "lemon-bottle-10ml"],
    },
    {
        slug: "lip-filler-hartbeespoort",
        title: "Lip Filler in Hartbeespoort",
        metaTitle: "Lip Filler in Hartbeespoort | Natural Lip Enhancement & Russian Lips",
        metaDescription: "Book lip filler in Hartbeespoort for natural lip enhancement, fuller lips and better definition. Explore classic lip filler and Russian lips at Galeo Beauty.",
        h1: "Lip Filler in Hartbeespoort",
        eyebrow: "Natural lip enhancement and shape refinement",
        heroDescription: "If your lips feel thin, uneven or less defined than you would like, this guide explains how lip filler can create a softer, fuller shape without pushing you into an overdone result.",
        heroImage: "/images/gallery/permanent-makeup/nano-lip-colour-before-after-galeo-beauty.jpg",
        heroImageAlt: "Lip filler and lip enhancement in Hartbeespoort",
        primaryKeywords: ["lip filler hartbeespoort", "natural lip filler harties", "thin lips treatment hartbeespoort", "lip filler without duck lips"],
        supportingKeywords: ["russian lips hartbeespoort", "lip augmentation hartbeespoort", "subtle lip enhancement", "lip symmetry treatment"],
        symptoms: ["lips that feel too thin", "uneven lip shape", "a lip border with little definition", "lips that look flat in photos"],
        results: ["soft natural fullness", "better lip definition", "a more balanced lip shape", "lips that still look like you"],
        comparisons: ["russian lips vs classic lip filler", "lip filler vs lip blush", "subtle lip filler vs dramatic volume"],
        objections: ["lip filler without duck lips", "natural-looking lip filler", "first time lip filler"],
        audiences: ["first-time filler clients", "clients wanting natural results", "bridal beauty prep", "symmetry-focused clients"],
        whyItHappens: "Most lip filler questions are not really about wanting obviously bigger lips. They are usually about shape, symmetry, definition or wanting a fresher lip line that feels elegant instead of obvious.",
        treatmentApproach: "We start with proportion and shape, then decide how much softness, lift or definition makes sense for your features. The goal is a result that looks intentional and flattering, not inflated.",
        bestFor: ["thin lips", "lip asymmetry", "subtle lip enhancement", "better lip definition"],
        sections: [
            {
                title: "When lip filler can make the biggest difference",
                body: "Lip filler can be a beautiful choice if you want more definition, a softer cupid's bow, better symmetry or a fuller shape that still feels like you.",
            },
            {
                title: "Classic lip filler vs Russian lips",
                body: "The best style depends on your natural lip shape and the finish you love most. Some people want gentle softness, while others prefer a slightly more lifted and defined result.",
            },
            {
                title: "Natural lip filler results",
                body: "A refined result should suit your features, feel balanced from every angle and leave you looking fresher rather than obviously treated.",
            },
        ],
        faqs: [
            { question: "Can lip filler look natural?", answer: "Yes. Many clients specifically want subtle lip filler that improves shape, hydration and definition without looking overdone." },
            { question: "What is the difference between Russian lips and regular lip filler?", answer: "Russian lips aim for a more lifted, defined lip shape, while classic lip filler is often used for balanced volume and contour. The best option depends on your lip shape and goals." },
            { question: "Is lip filler only for very thin lips?", answer: "No. Some clients want more symmetry, sharper definition or a fresher lip shape rather than dramatic fullness." },
        ],
        categoryIds: ["hart-aesthetics"],
        serviceSlugs: ["lip-filler-1ml", "russian-lip-1ml", "dermal-filler-1ml"],
    },
    {
        slug: "ipl-hair-removal-hartbeespoort",
        title: "IPL Hair Removal in Hartbeespoort",
        metaTitle: "IPL Hair Removal in Hartbeespoort | Permanent Hair Reduction for Face & Body",
        metaDescription: "Reduce unwanted face and body hair in Hartbeespoort with IPL hair removal at Galeo Beauty. Ideal for ingrown hairs, shaving rash and long-term hair reduction.",
        h1: "IPL Hair Removal in Hartbeespoort",
        eyebrow: "Face, body and intimate hair reduction",
        heroDescription: "If you are over the constant shaving, bumps, ingrowns and fast regrowth, this guide explains how IPL can give you smoother skin with far less maintenance.",
        heroImage: "/images/ipl/ipl-full-leg-hair-removal.jpg",
        heroImageAlt: "IPL hair removal in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["ipl hair removal hartbeespoort", "permanent hair reduction hartbeespoort", "laser hair removal alternative harties", "ingrown hair treatment hartbeespoort"],
        supportingKeywords: ["bikini hair removal", "facial hair removal", "underarm hair reduction", "chin hair removal"],
        symptoms: ["unwanted facial or body hair", "bikini line irritation", "painful ingrown hairs", "shaving rash", "hair that grows back too quickly"],
        results: ["smoother skin", "less daily shaving", "slower softer regrowth", "fewer ingrowns and bumps", "a cleaner lower maintenance finish"],
        comparisons: ["ipl vs waxing", "ipl vs laser hair removal", "best method for ingrown hairs"],
        objections: ["painless hair reduction", "treatment for sensitive skin", "long-term results without surgery"],
        audiences: ["women with facial hair", "men with grooming irritation", "holiday prep clients", "bikini-line maintenance clients"],
        whyItHappens: "For most people, unwanted hair becomes frustrating because of everything that comes with it: constant upkeep, shaving rash, bumps, ingrowns and the feeling that smooth skin never lasts for long.",
        treatmentApproach: "We look at the area you want to treat, the irritation or regrowth pattern you are dealing with, and how much maintenance you want to cut down. From there we can map out the most suitable IPL course.",
        bestFor: ["ingrown prone skin", "fast regrowth", "unwanted facial hair", "bikini line maintenance", "clients tired of shaving"],
        sections: [
            {
                title: "Why many people move from shaving or waxing to IPL",
                body: "The appeal is often less regrowth, fewer ingrowns, smoother skin and less day-to-day maintenance in areas that quickly become frustrating.",
            },
            {
                title: "Areas commonly treated with IPL",
                body: "IPL can be tailored for the face, underarms, bikini area, legs and other body zones, depending on where you want a cleaner, lower-maintenance finish.",
            },
            {
                title: "Comparing IPL with waxing or regular shaving",
                body: "The biggest differences usually come down to maintenance, how quickly hair returns, how prone you are to irritation, and how long-lasting you want the result to feel.",
            },
        ],
        faqs: [
            { question: "Is IPL hair removal permanent?", answer: "IPL is best understood as long-term or permanent hair reduction rather than complete permanent removal. Most clients need a course of sessions and occasional maintenance depending on the area." },
            { question: "Can IPL help with ingrown hairs?", answer: "Yes. Many clients pursue IPL because reducing regrowth can also reduce shaving-related ingrowns and irritation over time." },
            { question: "Which areas can be treated with IPL?", answer: "IPL can be used on common areas such as the face, underarms, legs and bikini zones depending on the treatment plan and suitability." },
        ],
        categoryIds: ["ipl"],
        serviceSlugs: ["ipl-full-face", "ipl-underarm", "ipl-full-leg", "ipl-brazilian"],
    },
    {
        slug: "lash-extensions-hartbeespoort",
        title: "Lash Extensions in Hartbeespoort",
        metaTitle: "Lash Extensions in Hartbeespoort | Classic, Hybrid, Volume & Wispy Lashes",
        metaDescription: "Book lash extensions in Hartbeespoort for classic, hybrid, volume and wispy styles. Find the right lash look for natural beauty or full glam at Galeo Beauty.",
        h1: "Lash Extensions in Hartbeespoort",
        eyebrow: "Natural everyday lashes to full glam volume",
        heroDescription: "If your lashes disappear without mascara or you are unsure whether you want natural, wispy or fuller glam, this guide helps you choose a lash look that suits your face and routine.",
        heroImage: "/images/lashes-brows/wispy-hybrid-lash-extensions-green-eyes.png",
        heroImageAlt: "Lash extensions in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["lash extensions hartbeespoort", "eyelash extensions harties", "natural lash extensions hartbeespoort", "wispy lashes hartbeespoort"],
        supportingKeywords: ["classic lashes", "hybrid lashes", "volume lashes", "cat eye lashes"],
        symptoms: ["short or sparse lashes", "lashes that disappear without mascara", "straight lashes with little lift", "not knowing which lash style will suit you"],
        results: ["fuller looking lashes", "more lift around the eyes", "soft everyday definition", "a polished makeup free look", "glam lashes that still feel wearable"],
        comparisons: ["classic vs hybrid lashes", "hybrid vs volume lashes", "lash extensions vs lash lift"],
        objections: ["natural-looking lash extensions", "lashes that do not damage natural lashes", "low-maintenance lash style"],
        audiences: ["everyday beauty clients", "bridal lashes", "glam-event clients", "clients wanting softer eye definition"],
        whyItHappens: "Most lash bookings start with a simple feeling: you want your eyes to stand out more without having to do the same mascara routine every day. The real decision is how subtle or glam you want that change to feel.",
        treatmentApproach: "We begin with the finish you want to wake up with, then match you to the level of fullness, texture and lift that suits your features and your natural lashes.",
        bestFor: ["lashes that need more definition", "soft glam lash looks", "wispy everyday lashes", "fuller lash styling"],
        sections: [
            {
                title: "Start with the look you love",
                body: "Choosing your lash style is usually easier when you think in terms of the finish you want, whether that is barely-there definition, soft texture or fuller glam.",
            },
            {
                title: "Classic vs hybrid vs volume",
                body: "Each style creates a different level of density and drama. The right one depends on how natural or noticeable you want your lashes to feel day to day.",
            },
            {
                title: "Extensions vs lash lift",
                body: "If you want added fullness and styling, extensions often make more sense. If you prefer a lighter-maintenance enhancement of your own lashes, a lift may be the better fit.",
            },
        ],
        faqs: [
            { question: "Which lash extensions look the most natural?", answer: "Classic lashes are often the most natural-looking option, but some clients also prefer soft hybrid or wispy sets for a slightly fuller result." },
            { question: "What is the difference between classic, hybrid and volume lashes?", answer: "Classic sets are cleaner and more natural, hybrids add texture and density, and volume sets create a fuller, fluffier lash line." },
            { question: "Should I choose lash extensions or a lash lift?", answer: "If you want added fullness and shape, lash extensions usually make more sense. If you want to enhance your own lashes with a lower-maintenance finish, a lash lift can be the better option." },
        ],
        categoryIds: ["lashes-brows"],
        serviceSlugs: ["classic-lashes", "hybrid-lashes", "volume-lashes", "lash-lift-tint"],
    },
    {
        slug: "hair-salon-hartbeespoort",
        title: "Hair Salon in Hartbeespoort",
        metaTitle: "Hair Salon in Hartbeespoort | Colour, Balayage, Blowouts & Hair Repair",
        metaDescription: "Visit Galeo Beauty hair salon in Hartbeespoort for colour, balayage, blowouts, smoothing and hair repair. Ideal for grey coverage, frizz control and colour refresh.",
        h1: "Hair Salon in Hartbeespoort",
        eyebrow: "Colour, blonding, smoothing and repair",
        heroDescription: "If your colour feels dull, your blonde has gone brassy, or your hair is just not sitting the way you want anymore, this guide helps you find the salon service that matches the problem you actually want solved.",
        heroImage: "/images/gallery/hair/blowdry-styling-session-two-stylists-salon.jpg",
        heroImageAlt: "Hair salon in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["hair salon hartbeespoort", "hairdresser harties", "hair colour hartbeespoort", "balayage hartbeespoort"],
        supportingKeywords: ["colour correction", "grey coverage", "blow dry styling", "frizz control treatment"],
        symptoms: ["visible grey regrowth", "yellow or brassy blonde", "hair that falls flat", "frizz in humidity", "colour that has faded", "hair that feels dry after colouring"],
        results: ["fresher more dimensional colour", "smoother hair", "a glossy salon finish", "healthier looking lengths", "hair that feels polished again"],
        comparisons: ["balayage vs foils", "keratin vs brazilian smoothing", "colour correction vs toner"],
        objections: ["natural-looking grey coverage", "blonde refresh without damage", "frizz control without flat hair"],
        audiences: ["busy professionals", "blonde maintenance clients", "frizz-prone clients", "bridal hair prep clients"],
        whyItHappens: "Hair appointments usually start with something feeling off. It might be regrowth, brassiness, rough ends, frizz or simply hair that no longer feels expensive or easy to style.",
        treatmentApproach: "We start with the thing you notice first in the mirror, then guide you toward the colour, smoothing, repair or styling service that best fits your hair history and the finish you want.",
        bestFor: ["colour refresh", "brassy blonde correction", "frizz control", "grey coverage", "hair that needs more polish"],
        sections: [
            {
                title: "Colour and blonding goals",
                body: "Whether you want softer dimension, brighter blonde, better grey coverage or a full refresh, the best colour service starts with the result you want to see in the mirror.",
            },
            {
                title: "Frizz control and smoothing",
                body: "If your hair feels puffy, hard to style or overly reactive to humidity, smoothing treatments can help you create a finish that feels calmer and easier to manage.",
            },
            {
                title: "Repair, shine and styling",
                body: "Healthy-looking hair often comes from combining the right restorative care with styling that adds gloss, movement and a polished final shape.",
            },
        ],
        faqs: [
            { question: "What hair services can I book in Hartbeespoort?", answer: "Galeo offers a broad hair menu including colour, balayage, smoothing, blowouts and repair-focused treatments from the Hartbeespoort salon." },
            { question: "Do you offer balayage and grey coverage?", answer: "Yes. Broad colour services like balayage, dimension work and root or grey coverage are part of the salon offering." },
            { question: "What if my main issue is frizz rather than colour?", answer: "The salon can route you toward smoothing and frizz-control options when the main problem is manageability rather than colour." },
        ],
        categoryIds: ["hair"],
        serviceSlugs: ["balayage", "keratin", "brazilian-medium", "brazilian-long"],
    },
    {
        slug: "nail-salon-hartbeespoort",
        title: "Nail Salon in Hartbeespoort",
        metaTitle: "Nail Salon in Hartbeespoort | Gel Nails, Acrylics, Builder Gel & Pedicures",
        metaDescription: "Book gel nails, acrylics, builder gel and pedicures in Hartbeespoort at Galeo Beauty. Ideal for stronger nails, long-lasting manicures and polished feet.",
        h1: "Nail Salon in Hartbeespoort",
        eyebrow: "Long-lasting manicures and polished pedicures",
        heroDescription: "If your manicures chip too fast, your natural nails keep bending or breaking, or your feet need more care than a basic polish, this guide helps you choose the nail service that will hold up best.",
        heroImage: "/images/nails/nude-almond-gel-nails-galeo-beauty-salon.jpg",
        heroImageAlt: "Nail salon in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["nail salon hartbeespoort", "gel nails hartbeespoort", "acrylic nails hartbeespoort", "builder gel nails harties"],
        supportingKeywords: ["chip free manicure", "strong natural nails", "pedicure for cracked heels", "bridal nails"],
        symptoms: ["nails that bend or peel", "manicures that chip too quickly", "short nails that will not grow", "brittle weak nails", "rough dry heels"],
        results: ["a manicure that lasts longer", "stronger natural nails", "clean elegant nail shape", "soft polished feet", "a glossy well kept finish"],
        comparisons: ["biab vs gel nails", "builder gel vs acrylic", "pedicure vs spa pedicure"],
        objections: ["natural-looking nail strengthening", "manicure that lasts", "hygienic pedicure care"],
        audiences: ["working professionals", "bridal nail clients", "holiday nail clients", "natural nail growth clients"],
        whyItHappens: "Nail concerns are usually practical before they are aesthetic. You want something that lasts, feels neat, and does not leave you dealing with chips, peeling or tired-looking hands and feet after only a few days.",
        treatmentApproach: "We look at whether your priority is strength, length, durability or foot care, then steer you toward the system that gives you the cleanest result with the wear time you want.",
        bestFor: ["weak natural nails", "manicures that need to last", "pedicure care", "clients who want a refined polished finish"],
        sections: [
            {
                title: "Best manicure for weak nails",
                body: "If your nails bend, split or never seem to last, builder-based support and structured manicures can offer a stronger, cleaner foundation without always needing dramatic length.",
            },
            {
                title: "Gel vs acrylic vs builder support",
                body: "Each option suits a slightly different goal. Some are better for natural-looking strength, while others are chosen for added shape, length or durability.",
            },
            {
                title: "Pedicures and heel-focused care",
                body: "Pedicures are not only about colour. They can also help refresh rough heels, restore a neater look and leave your feet feeling more comfortable and polished.",
            },
        ],
        faqs: [
            { question: "What is the best manicure for weak natural nails?", answer: "That depends on whether you want strength, added length or the most natural-looking support. Builder-based and structured options are often popular for weak nails." },
            { question: "Do you offer both gel and acrylic nails in Hartbeespoort?", answer: "Yes. Galeo offers long-lasting options including gel-based services, acrylic systems and pedicure treatments from the Hartbeespoort salon." },
            { question: "Can a pedicure help dry cracked heels?", answer: "A pedicure can help improve the appearance and feel of rough feet while restoring a cleaner, more polished finish." },
        ],
        categoryIds: ["nails"],
        serviceSlugs: ["rubber-base", "acrylic-tips", "acrylic-overlay", "pedicure"],
    },
    {
        slug: "dark-circles-treatment-hartbeespoort",
        title: "Dark Circles Treatment in Hartbeespoort",
        metaTitle: "Dark Circles Treatment in Hartbeespoort | Under-Eye Rejuvenation & Skin Boosters",
        metaDescription: "Treat dark circles, tired eyes and under-eye bags in Hartbeespoort with under-eye rejuvenation, skin boosters and targeted eye treatments at Galeo Beauty.",
        h1: "Dark Circles Treatment in Hartbeespoort",
        eyebrow: "Under-eye rejuvenation for tired eyes",
        heroDescription: "If your eyes always look tired no matter how rested you feel, this guide explains which under-eye treatments can help with shadows, puffiness and a worn-out look.",
        heroImage: "/images/gallery/facials/professional-skin-facial-treatment-in-progress.jpg",
        heroImageAlt: "Dark circles treatment in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["dark circles treatment hartbeespoort", "tired eyes treatment harties", "under eye bags treatment hartbeespoort", "under eye rejuvenation hartbeespoort"],
        supportingKeywords: ["under eye skin booster", "pro eye peel", "tired eyes refresh"],
        symptoms: ["dark under eye shadows", "eyes that always look tired", "under eye bags", "puffiness under the eyes", "dry crepey under eye skin"],
        results: ["brighter smoother under eyes", "a fresher eye area", "less of a tired look", "better hydration around the eyes"],
        comparisons: ["under eye skin boosters vs eye peel", "dark circles vs puffiness treatment", "under eye rejuvenation options"],
        objections: ["natural under eye treatment", "minimal downtime eye refresh", "treatment that does not look obvious"],
        audiences: ["busy professionals", "mature skin clients", "event prep clients", "camera-facing clients"],
        whyItHappens: "The under-eye area can look tired for very different reasons. Sometimes it is pigment, sometimes puffiness, sometimes dehydration, and sometimes the natural shape of the area creates more shadow than you would like.",
        treatmentApproach: "We look at whether the area needs hydration, brightening, smoothing or a more rejuvenating plan, then guide you toward the treatment that best matches what is actually making you look tired.",
        bestFor: ["dark circles", "shadowed under eyes", "under eye dehydration", "clients who want to look less tired"],
        sections: [
            {
                title: "Why dark circles and tired eyes are not all the same problem",
                body: "Some under-eye concerns are caused by pigment, others by puffiness, dehydration or the way light falls into the area. Knowing which one affects you most helps guide the right solution.",
            },
            {
                title: "Best treatments for a fresher under-eye area",
                body: "The goal is usually brighter, smoother and fresher-looking eyes. The best treatment depends on whether the focus is hydration, skin quality, puffiness or overall rejuvenation.",
            },
            {
                title: "What subtle under-eye rejuvenation looks like",
                body: "A beautiful under-eye result should look rested and refined, not obvious. The aim is to help you look less tired while still looking entirely like yourself.",
            },
        ],
        faqs: [
            { question: "What is the best treatment for dark circles in Hartbeespoort?", answer: "That depends on whether the main issue is pigmentation, dehydration, hollowness or puffiness. Galeo uses different under-eye approaches based on the visible concern." },
            { question: "Can under-eye treatments make me look less tired?", answer: "Yes. The main goal of many under-eye treatments is to refresh the area so the eyes look brighter, smoother and less exhausted." },
            { question: "What if I have puffiness rather than dark circles?", answer: "Puffiness and dark circles are not exactly the same issue, so the best treatment depends on which under-eye problem is most dominant." },
        ],
        categoryIds: ["hart-aesthetics", "dermalogica"],
        serviceSlugs: ["undereye-1-treatment", "undereye-2-treatments", "eye-peel"],
    },
    {
        slug: "frizz-control-keratin-treatment-hartbeespoort",
        title: "Frizz Control Treatment in Hartbeespoort",
        metaTitle: "Frizz Control Treatment in Hartbeespoort | Keratin & Brazilian Smoothing",
        metaDescription: "Control frizz and smooth hard-to-manage hair in Hartbeespoort with keratin and Brazilian smoothing treatments at Galeo Beauty.",
        h1: "Frizz Control Treatment in Hartbeespoort",
        eyebrow: "Smoothing and manageability for hard-to-control hair",
        heroDescription: "If humidity turns your hair into a frizzy cloud or styling never seems to hold for long, this guide explains which smoothing treatments can make your hair feel calmer and easier to manage.",
        heroImage: "/images/gallery/hair/brunette-curls-hair-styling-blowout-results.jpg",
        heroImageAlt: "Frizz control treatment in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["frizz control treatment hartbeespoort", "keratin treatment hartbeespoort", "brazilian treatment harties", "smoothing treatment hartbeespoort"],
        supportingKeywords: ["damaged hair smoothing", "humidity hair treatment", "glossy smooth hair"],
        symptoms: ["frizz that flares in humidity", "puffy hard to manage hair", "styling that does not last", "rough dry texture", "hair that takes too much effort to smooth"],
        results: ["softer smoother hair", "less frizz through the day", "easier styling at home", "a glossier finish", "hair that feels calmer in humidity"],
        comparisons: ["keratin vs brazilian treatment", "smoothing treatment vs blowout", "frizz control vs repair treatment"],
        objections: ["smoothing without flat hair", "manageable maintenance routine", "damage-conscious smoothing"],
        audiences: ["frizz-prone clients", "humid-weather sufferers", "low-maintenance beauty seekers", "pre-holiday hair clients"],
        whyItHappens: "Frizz is not only about how hair looks. It affects how long your styling lasts, how much heat you end up using, and whether your hair feels polished or chaotic by midday.",
        treatmentApproach: "We look at your texture, how strong the frizz is, and how sleek or natural you want the finish to stay, then recommend the smoothing option that fits your routine.",
        bestFor: ["frizzy hair", "humidity reactive hair", "puffiness", "clients who want easier styling"],
        sections: [
            {
                title: "Why hair gets frizzy and hard to manage",
                body: "Frizz can be linked to dryness, porosity, texture, weather and previous chemical stress. Understanding that pattern makes it easier to choose the right smoothing path.",
            },
            {
                title: "Keratin vs Brazilian smoothing",
                body: "Both treatments are chosen for smoother, more manageable hair, but they can differ in softness, intensity and how the finish settles over time.",
            },
            {
                title: "What smoother hair should still feel like",
                body: "The goal is not flat, lifeless hair. It is softer texture, less puffiness, easier styling and a finish that still moves naturally.",
            },
        ],
        faqs: [
            { question: "What is the best treatment for frizzy hair in Hartbeespoort?", answer: "That depends on how strong the frizz is, how much smoothing you want and how much maintenance you are comfortable with. Galeo uses keratin and Brazilian-style smoothing options for different goals." },
            { question: "What is the difference between keratin and Brazilian smoothing?", answer: "Both are used to make hair smoother and easier to manage, but they can differ in intensity, finish and maintenance expectations depending on the treatment path." },
            { question: "Can a smoothing treatment help humidity frizz?", answer: "Yes. Many people book smoothing services because their hair reacts badly to humidity and becomes harder to manage." },
        ],
        categoryIds: ["hair"],
        serviceSlugs: ["keratin", "brazilian-medium", "brazilian-long"],
    },
    {
        slug: "anti-aging-treatment-hartbeespoort",
        title: "Anti-Aging Treatment in Hartbeespoort",
        metaTitle: "Anti-Aging Treatment in Hartbeespoort | Facial Rejuvenation, Fillers & Skin Boosters",
        metaDescription: "Explore anti-aging treatment in Hartbeespoort for wrinkles, tired-looking skin, facial volume loss and non-surgical rejuvenation with injectables and advanced skin treatments at Galeo Beauty.",
        h1: "Anti-Aging Treatment in Hartbeespoort",
        eyebrow: "Facial rejuvenation for tired, ageing or less defined features",
        heroDescription: "If you feel like your face looks more tired, lined or less lifted than it used to, this guide helps you compare non-surgical options for looking fresher without losing natural expression.",
        heroImage: "/images/gallery/Facials/professional-skin-facial-treatment-in-progress.jpeg",
        heroImageAlt: "Anti-aging treatment in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["anti aging treatment hartbeespoort", "facial rejuvenation hartbeespoort", "non surgical facelift harties", "wrinkle treatment hartbeespoort"],
        supportingKeywords: ["skin boosters hartbeespoort", "volume loss treatment", "natural anti aging injectables", "looking less tired treatment"],
        symptoms: ["fine lines that are becoming more obvious", "a face that looks tired even when you are rested", "loss of facial volume", "skin that feels less firm", "features that look softer or less lifted"],
        results: ["looking fresher and more rested", "softer lines", "subtle natural lifting", "better facial balance", "a result that still looks like you"],
        comparisons: ["botox vs fillers", "skin boosters vs filler", "injectables vs laser resurfacing"],
        objections: ["natural looking anti aging treatment", "minimal downtime facial rejuvenation", "first time injectable treatment"],
        audiences: ["busy professionals", "mature skin clients", "first time aesthetics clients", "clients wanting subtle refreshment"],
        whyItHappens: "Ageing rarely shows up as only one issue. Some people notice lines first, others notice tired-looking eyes, facial hollowness, loss of firmness or a jawline that no longer looks as crisp as it used to.",
        treatmentApproach: "We look at what is making you feel older or more tired in the mirror, then compare options that restore freshness in the most natural way for your face, features and comfort level.",
        bestFor: ["looking tired", "early to moderate facial ageing", "volume loss", "clients who want a natural refresh"],
        sections: [
            {
                title: "Why anti-aging goals are rarely only about wrinkles",
                body: "Many people come in asking about lines, but the real frustration is often that the whole face looks more tired, heavier or less defined than before. The best plan usually looks at the full picture rather than one line in isolation.",
            },
            {
                title: "Choosing between softening, restoring and lifting",
                body: "Some concerns respond best to relaxing movement, others to restoring volume, boosting hydration or improving skin quality. Understanding which category your concern falls into makes treatment choices much clearer.",
            },
            {
                title: "What natural rejuvenation should actually look like",
                body: "The strongest anti-aging results usually do not look obvious. They make you look fresher, better rested and more balanced while still leaving your face expressive and recognisably yours.",
            },
        ],
        faqs: [
            { question: "What is the best anti-aging treatment in Hartbeespoort?", answer: "That depends on whether your main concern is wrinkles, tired eyes, volume loss, skin laxity or a general loss of freshness. Galeo usually matches the treatment to the visible ageing pattern rather than pushing one approach for everyone." },
            { question: "Can anti-aging treatment still look natural?", answer: "Yes. Many clients specifically want to look fresher and less tired without obvious change, so the focus is usually on subtle correction and balance rather than dramatic transformation." },
            { question: "Do I need fillers if my concern is mostly looking tired?", answer: "Not always. Some people need volume support, while others benefit more from skin quality, line-softening or lifting-focused options. It depends on what is actually creating the tired look." },
        ],
        categoryIds: ["hart-aesthetics", "medical", "qms"],
        serviceSlugs: ["tox-per-unit", "collagen-biostimulator", "liquid-facelift", "nefertiti-lift", "collagen-facial"],
    },
    {
        slug: "event-makeup-hartbeespoort",
        title: "Event Makeup in Hartbeespoort",
        metaTitle: "Event Makeup in Hartbeespoort | Bridal, Evening & Long-Wear Glam",
        metaDescription: "Book event makeup in Hartbeespoort for bridal glam, evening makeup and long-wear looks that photograph beautifully and still feel like you at Galeo Beauty.",
        h1: "Event Makeup in Hartbeespoort",
        eyebrow: "Bridal, occasion and camera-ready glam",
        heroDescription: "If you want makeup that lasts, looks beautiful in photos and still feels flattering up close, this guide helps you choose the right look for weddings, formals and special events.",
        heroImage: "/images/make-up/expert-bridal-makeup-application.jpeg",
        heroImageAlt: "Event makeup in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["event makeup hartbeespoort", "bridal makeup hartbeespoort", "evening makeup harties", "long wear makeup hartbeespoort"],
        supportingKeywords: ["makeup artist hartbeespoort", "bridal makeup trial", "soft glam makeup", "photo ready makeup"],
        symptoms: ["worrying that makeup will melt or fade", "not knowing which glam level suits you", "wanting to look polished but still like yourself", "concern about flash photography", "needing makeup to last all event"],
        results: ["makeup that lasts", "beautiful photos", "a polished but flattering look", "confidence on the day", "glam that still feels wearable"],
        comparisons: ["soft glam vs full glam makeup", "bridal trial vs wedding day makeup", "day makeup vs evening makeup"],
        objections: ["makeup that lasts in heat", "bridal makeup that is not cakey", "natural glam that still shows up in photos"],
        audiences: ["brides", "event guests", "matric and formal clients", "clients booking photoshoots"],
        whyItHappens: "Special event makeup can feel high pressure because you want it to hold up for hours, work with flash photography and still look beautiful in person, not just on social media.",
        treatmentApproach: "We start with the event, lighting, dress code and the version of yourself you want to see in the mirror, then tailor the finish so it feels right for the full day or night.",
        bestFor: ["bridal beauty prep", "formal events", "evening glam", "clients who want long wear makeup"],
        sections: [
            {
                title: "Why event makeup needs more than everyday products",
                body: "Special occasion makeup usually needs to hold for longer, photograph more cleanly and still survive heat, dancing, tears or long hours. That changes the way the look should be built from the start.",
            },
            {
                title: "Choosing the right level of glam",
                body: "Some clients want polished softness, while others want more drama and definition. The best result usually depends on the event, what you are wearing and how comfortable you are with a stronger look.",
            },
            {
                title: "How to look camera-ready without feeling overdone",
                body: "Beautiful makeup should still feel balanced up close. The goal is not to hide your features but to make them read better in person and on camera for the full event.",
            },
        ],
        faqs: [
            { question: "What kind of event makeup can I book in Hartbeespoort?", answer: "Galeo offers bridal makeup, bridal trials, day makeup and evening makeup for weddings, formals, events and other special occasions." },
            { question: "Is a bridal makeup trial worth it?", answer: "Yes. A trial helps you test the finish, coverage, colours and overall glam level ahead of the wedding day so there are fewer unknowns on the day itself." },
            { question: "Can event makeup still look natural in photos?", answer: "Yes. Long-wear and photo-friendly makeup does not have to look heavy. Many clients choose softer glam that still reads beautifully on camera." },
        ],
        categoryIds: ["makeup"],
        serviceSlugs: ["bridal-makeup", "evening-makeup", "day-makeup", "bridal-trial"],
    },
    {
        slug: "permanent-makeup-brows-hartbeespoort",
        title: "Permanent Makeup Brows in Hartbeespoort",
        metaTitle: "Permanent Makeup Brows in Hartbeespoort | Microblading, Powder Brows & Hybrid Brows",
        metaDescription: "Book permanent makeup brows in Hartbeespoort for microblading, powder brows and hybrid brows that reduce daily makeup time and create softer, fuller-looking brows at Galeo Beauty.",
        h1: "Permanent Makeup Brows in Hartbeespoort",
        eyebrow: "Semi-permanent brows for shape, fullness and easier mornings",
        heroDescription: "If your brows feel sparse, uneven or too dependent on pencil every morning, this guide helps you compare permanent makeup brow styles that create a fuller, more defined shape.",
        heroImage: "/images/lashes-brows/Hybrid-Brows-Permanent-makeup.png",
        heroImageAlt: "Permanent makeup brows in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["permanent makeup brows hartbeespoort", "microblading hartbeespoort", "powder brows harties", "hybrid brows hartbeespoort"],
        supportingKeywords: ["semi permanent brows", "sparse brows treatment", "eyebrow tattoo hartbeespoort", "natural looking permanent brows"],
        symptoms: ["sparse brows", "uneven brow shape", "brows that need filling in every day", "patchy areas in the brows", "brow makeup that rubs off easily"],
        results: ["fuller looking brows", "better brow symmetry", "less daily brow makeup", "a softer face-framing shape", "waking up more put together"],
        comparisons: ["microblading vs powder brows", "hybrid brows vs microblading", "brow henna vs permanent makeup"],
        objections: ["natural looking permanent brows", "permanent makeup for oily skin", "soft brow result not too dark"],
        audiences: ["busy professionals", "clients with sparse brows", "beauty clients who want lower maintenance", "bridal prep clients"],
        whyItHappens: "Brows often become frustrating because so much of the face changes when they are too light, patchy or uneven. Many clients are not looking for dramatic brows, only shape and fullness that feel easier to maintain.",
        treatmentApproach: "We start by deciding whether you need hair-stroke realism, a softer shaded finish or a blend of both, then tailor the brow shape and depth so the result suits your features and skin.",
        bestFor: ["sparse brows", "uneven brows", "clients tired of drawing on brows", "low maintenance beauty routines"],
        sections: [
            {
                title: "Why brows change the whole face",
                body: "Brows frame the eyes and affect how polished the whole face looks. Even a subtle improvement in brow shape or fullness can make mornings feel much easier and your features more balanced.",
            },
            {
                title: "Microblading vs powder vs hybrid brows",
                body: "Hair strokes tend to suit clients who want a finer, more natural look, while powder and hybrid approaches suit clients who want more density, softness or definition through the body of the brow.",
            },
            {
                title: "What makes permanent brows look natural",
                body: "The most flattering result usually comes from choosing the right technique for your skin and keeping the overall shape soft enough to enhance your features rather than overpower them.",
            },
        ],
        faqs: [
            { question: "What is the difference between microblading and powder brows?", answer: "Microblading focuses on fine hair-like strokes, while powder brows create a softer shaded effect. Hybrid brows combine both for more definition and depth." },
            { question: "Which permanent brow style looks the most natural?", answer: "That depends on your skin, existing brow hair and the finish you like. Some clients suit hair strokes best, while others look better with a softly shaded brow." },
            { question: "Can permanent makeup help if my brows are patchy?", answer: "Yes. Brow tattooing is often used to fill sparse areas, create better balance and reduce the need for daily brow products." },
        ],
        categoryIds: ["permanent-makeup"],
        serviceSlugs: ["microblading", "powderpixel-brows", "hybrid-brows", "brow-henna"],
    },
    {
        slug: "qms-facial-hartbeespoort",
        title: "QMS Facial in Hartbeespoort",
        metaTitle: "QMS Facial in Hartbeespoort | Collagen, Hydration & Skin Renewal",
        metaDescription: "Book a QMS facial in Hartbeespoort for dehydrated, tired or mature skin needing collagen support, hydration and a fresher glow at Galeo Beauty.",
        h1: "QMS Facial in Hartbeespoort",
        eyebrow: "Collagen-focused facials for tired, dry or mature skin",
        heroDescription: "If your skin feels dry, dull, tired or less firm than it used to, this guide helps you compare QMS facials that focus on hydration, comfort and a fresher-looking complexion.",
        heroImage: "/images/dermalogica/dermalogica-microneedling-treatment.png",
        heroImageAlt: "QMS facial in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["qms facial hartbeespoort", "collagen facial hartbeespoort", "anti aging facial harties", "hydrating facial hartbeespoort"],
        supportingKeywords: ["rejuvenating facial", "medical grade facial", "mature skin facial", "firming facial hartbeespoort"],
        symptoms: ["skin that feels dry and depleted", "a dull tired complexion", "fine lines from dehydration", "loss of bounce and firmness", "skin that needs a reset before an event"],
        results: ["plumper hydrated skin", "a healthier glow", "smoother softer skin", "a fresher less tired look", "better comfort in the skin"],
        comparisons: ["qms facial vs standard facial", "collagen facial vs chemical peel", "best facial for mature skin"],
        objections: ["anti aging facial with no downtime", "hydrating facial for sensitive skin", "visible results from one facial"],
        audiences: ["mature skin clients", "pre event clients", "clients with dry skin", "professionals wanting a polished glow"],
        whyItHappens: "Skin can start to look tired for many reasons, including dehydration, stress, travel, environmental exposure and the natural slowing of collagen support with age.",
        treatmentApproach: "We choose between hydration, collagen support, calming care or stronger renewal based on how your skin feels right now and how quickly you want to see it look fresher.",
        bestFor: ["dehydrated skin", "tired looking skin", "mature skin", "clients who want a firmer glow"],
        sections: [
            {
                title: "When a facial needs to feel more corrective",
                body: "Some clients want more than a relaxing treatment. They want skin that looks smoother, better hydrated and visibly fresher, especially when dryness and dullness have become persistent.",
            },
            {
                title: "What QMS facials are usually chosen for",
                body: "These facials are often selected when the goal is comfort, bounce, radiance and a more polished complexion rather than treating active breakouts or strong congestion.",
            },
            {
                title: "Why hydration can change how the whole face looks",
                body: "When skin is properly hydrated, it often looks brighter, smoother and less tired overall. Fine dehydration lines soften, makeup sits better and the whole complexion reflects light more evenly.",
            },
        ],
        faqs: [
            { question: "What is a QMS facial best for?", answer: "QMS facials are commonly chosen for dehydration, dullness, early visible ageing and skin that needs firmer, fresher-looking results." },
            { question: "Are QMS facials only for mature skin?", answer: "No. They are especially popular with mature skin, but they can also suit younger clients whose skin feels dry, stressed or in need of a stronger glow-focused reset." },
            { question: "Can I book a QMS facial before an event?", answer: "Yes. Many clients choose these facials before events because they want skin that looks hydrated, smoother and more polished without downtime." },
        ],
        categoryIds: ["qms"],
        serviceSlugs: ["collagen-facial", "rejuvenating-facial", "chemical-peel", "sensitive-skin-facial"],
    },
    {
        slug: "spray-tan-hartbeespoort",
        title: "Spray Tan in Hartbeespoort",
        metaTitle: "Spray Tan in Hartbeespoort | Natural Glow for Weddings, Holidays & Events",
        metaDescription: "Book a spray tan in Hartbeespoort for a natural-looking glow before weddings, holidays and events. Explore spray tan and tanning options at Galeo Beauty.",
        h1: "Spray Tan in Hartbeespoort",
        eyebrow: "Natural glow for events, photos and holidays",
        heroDescription: "If you want a healthy-looking glow without worrying about streaks, patchiness or turning orange, this guide helps you compare the tanning options available.",
        heroImage: "/images/gallery/Specials/galeo-beauty-nail-specials-price-list.jpeg",
        heroImageAlt: "Spray tan in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["spray tan hartbeespoort", "tanning hartbeespoort", "bridal tan harties", "event tan hartbeespoort"],
        supportingKeywords: ["natural spray tan", "sunbed tanning hartbeespoort", "pre holiday tan", "camera ready tan"],
        symptoms: ["feeling pale or washed out", "worrying about a streaky tan", "needing colour before an event", "wanting a glow before a holiday", "being nervous about going orange"],
        results: ["a natural warm glow", "even colour", "more confidence in photos", "healthier looking skin tone", "a tan that still looks believable"],
        comparisons: ["spray tan vs sunbed", "best tan before a wedding", "event tan vs holiday tan prep"],
        objections: ["tan that does not go orange", "streak free spray tan", "quick glow before an event"],
        audiences: ["brides", "holiday prep clients", "photoshoot clients", "clients wanting year round colour"],
        whyItHappens: "People usually start looking for a tan because they want to feel less washed out in photos, events or summer clothes, not because they want an obviously artificial result.",
        treatmentApproach: "We help you compare whether a quick cosmetic glow or a buildable tanning option makes more sense based on your timeline, your event and how natural you want the colour to look.",
        bestFor: ["event prep", "bridal glow", "holiday prep", "clients wanting believable colour"],
        sections: [
            {
                title: "Why event tanning feels high stakes",
                body: "When a wedding, holiday or photoshoot is involved, most clients want reassurance that the tan will look even, natural and flattering in every kind of lighting.",
            },
            {
                title: "Choosing between spray tan and sunbed",
                body: "The right option depends on timing, how quickly you need colour, and whether you want an instant cosmetic finish or a more gradual tanning route.",
            },
            {
                title: "What a good tan should look like",
                body: "The best glow usually looks warm and healthy rather than obviously bronzed. It should make your skin look more alive without looking patchy, muddy or unnatural up close.",
            },
        ],
        faqs: [
            { question: "What is the best tan before a wedding or event?", answer: "Many clients prefer a spray tan when they want a quick, controlled glow before a fixed date, while others use sunbed sessions when they want to build colour over time." },
            { question: "Can I get a spray tan that looks natural?", answer: "Yes. The goal for most clients is a believable sun-kissed finish rather than a dark or obviously artificial colour." },
            { question: "Do you offer both spray tanning and sunbed tanning in Hartbeespoort?", answer: "Yes. Galeo offers both spray tan and sunbed options so clients can choose the approach that fits their timing and preferred finish." },
        ],
        categoryIds: ["sunbed"],
        serviceSlugs: ["spraytan", "sunbed-session", "sunbed-10", "sunbed-20"],
    },
    {
        slug: "waxing-hair-removal-hartbeespoort",
        title: "Waxing Hair Removal in Hartbeespoort",
        metaTitle: "Waxing Hair Removal in Hartbeespoort | Brazilian, Hollywood & Body Waxing",
        metaDescription: "Book waxing hair removal in Hartbeespoort for Brazilian, Hollywood, leg, underarm and body waxing with smoother skin and longer-lasting results at Galeo Beauty.",
        h1: "Waxing Hair Removal in Hartbeespoort",
        eyebrow: "Face, body and intimate waxing for smoother skin",
        heroDescription: "If you are tired of shaving, annoyed by fast regrowth or want smoother skin for longer, this guide helps you compare waxing options for face, body and intimate areas.",
        heroImage: "/images/waxing/full-leg-wax-salon-service.jpeg",
        heroImageAlt: "Waxing hair removal in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["waxing hartbeespoort", "brazilian wax hartbeespoort", "hollywood wax harties", "body waxing hartbeespoort"],
        supportingKeywords: ["underarm wax", "leg wax hartbeespoort", "intimate waxing", "waxing vs shaving"],
        symptoms: ["fast regrowth after shaving", "shaving rash", "constant upkeep", "wanting a cleaner bikini line", "needing smoother skin for longer"],
        results: ["smooth skin for longer", "slower regrowth", "less daily shaving hassle", "a cleaner grooming finish", "more comfort in exposed areas"],
        comparisons: ["brazilian vs hollywood wax", "waxing vs shaving", "waxing vs ipl"],
        objections: ["gentle waxing for sensitive skin", "less irritation after waxing", "first time brazilian wax"],
        audiences: ["holiday prep clients", "bridal prep clients", "regular grooming clients", "first time intimate waxing clients"],
        whyItHappens: "Waxing is often less about the hair itself and more about the constant effort of keeping up with it. Many clients want smoother skin that lasts longer than shaving and feels easier to maintain.",
        treatmentApproach: "We help you compare areas, regrowth patterns and comfort levels, then guide you toward the waxing option that gives you the cleaner, longer-lasting finish you want.",
        bestFor: ["bikini maintenance", "body hair removal", "clients tired of shaving", "smoother skin before holidays"],
        sections: [
            {
                title: "Why many clients move from shaving to waxing",
                body: "The shift usually happens when regrowth feels too fast, shaving causes bumps or irritation, or the daily upkeep simply becomes more annoying than it feels worth.",
            },
            {
                title: "Brazilian, Hollywood and body waxing options",
                body: "Different waxing services suit different comfort levels and grooming preferences. Some clients want a cleaner bikini edge, while others want a more complete intimate result or full body maintenance.",
            },
            {
                title: "What longer-lasting smooth skin really means",
                body: "The biggest appeal is usually not perfection. It is being able to go longer between maintenance and still feel neater, smoother and more comfortable day to day.",
            },
        ],
        faqs: [
            { question: "What is the difference between a Brazilian and Hollywood wax?", answer: "A Brazilian usually leaves a small strip or shape, while a Hollywood removes everything. The better option depends on your grooming preference." },
            { question: "Is waxing better than shaving for longer-lasting smoothness?", answer: "For many clients, yes. Waxing usually keeps skin smoother for longer because the hair is removed from the root rather than cut at the surface." },
            { question: "Can I book both body waxing and intimate waxing in Hartbeespoort?", answer: "Yes. Galeo offers face, body and intimate waxing including common services such as Brazilian, Hollywood, leg and underarm waxing." },
        ],
        categoryIds: ["waxing"],
        serviceSlugs: ["wax-brazilian", "wax-hollywood", "wax-full-leg", "wax-underarm"],
    },
    {
        slug: "massage-hartbeespoort",
        title: "Massage in Hartbeespoort",
        metaTitle: "Massage in Hartbeespoort | Relaxation, Deep Tissue, Aromatherapy & Hot Stone",
        metaDescription: "Book a massage in Hartbeespoort for stress relief, tight shoulders, muscle tension and deep relaxation. Explore Swedish, deep tissue, aromatherapy and hot stone massage at Galeo Beauty.",
        h1: "Massage in Hartbeespoort",
        eyebrow: "Relaxation, recovery and relief from built-up tension",
        heroDescription: "If your neck and shoulders feel locked up, your body feels overworked or you simply need a real reset, this guide helps you choose the massage style that fits what you need most.",
        heroImage: "/images/massages/deep-relaxation-neck-massage.jpeg",
        heroImageAlt: "Massage therapy in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["massage hartbeespoort", "deep tissue massage hartbeespoort", "relaxation massage harties", "aromatherapy massage hartbeespoort"],
        supportingKeywords: ["hot stone massage", "stress relief massage", "back and neck massage", "sports massage hartbeespoort"],
        symptoms: ["tight neck and shoulders", "muscle knots", "back tension", "feeling stressed and overloaded", "soreness after training"],
        results: ["deeper relaxation", "relief from muscle tension", "a body that feels looser", "better recovery", "feeling calmer and lighter"],
        comparisons: ["deep tissue vs swedish massage", "hot stone vs aromatherapy massage", "sports massage vs deep tissue"],
        objections: ["massage for chronic tight shoulders", "firm pressure without too much pain", "relaxing massage for stress relief"],
        audiences: ["office workers", "stressed professionals", "athletes and active clients", "spa day clients"],
        whyItHappens: "Massage usually becomes a priority when stress stops feeling mental only and starts living in the body through tight shoulders, headaches, sore muscles and a nervous system that never seems to switch off.",
        treatmentApproach: "We begin with whether you need to unwind, recover or work through stubborn tightness, then match you to the pressure level and massage style that will feel most effective.",
        bestFor: ["stress relief", "tight shoulders", "deep relaxation", "muscle recovery"],
        sections: [
            {
                title: "When your body is asking for more than a quick stretch",
                body: "Once tension starts to feel built in, it often affects sleep, posture, concentration and how comfortable your body feels through the whole day. That is usually the point when hands-on treatment helps most.",
            },
            {
                title: "Choosing the right massage style",
                body: "Some clients need deeper work on knots and chronic tightness, while others need the nervous system benefits of a slower, more restorative massage. The right style depends on what relief means for you.",
            },
            {
                title: "What good massage results should feel like",
                body: "The best massage often leaves you feeling both looser and calmer. It is not only about less tension in the muscles, but also about breathing easier and feeling more settled overall.",
            },
        ],
        faqs: [
            { question: "What is the best massage for stress in Hartbeespoort?", answer: "Swedish, aromatherapy and hot stone massage are popular when the main goal is relaxation and switching off." },
            { question: "What is best for muscle knots and tight shoulders?", answer: "Deep tissue or focused back-and-neck massage often suits clients whose main issue is chronic tightness, stiffness or repetitive stress in the upper body." },
            { question: "Can I book a massage for sports recovery?", answer: "Yes. Sports massage is available for active clients who want help with soreness, recovery and easier movement after training or exertion." },
        ],
        categoryIds: ["massages"],
        serviceSlugs: ["swedish-massage-60", "deep-tissue-60", "aromatherapy-60", "hot-stone-60"],
    },
    {
        slug: "hair-extensions-hartbeespoort",
        title: "Hair Extensions in Hartbeespoort",
        metaTitle: "Hair Extensions in Hartbeespoort | Tape-Ins, Clip-Ins, Halo & Remy Hair",
        metaDescription: "Book hair extensions in Hartbeespoort for instant length, fuller volume and seamless blending with premium Remy hair at Galeo Beauty.",
        h1: "Hair Extensions in Hartbeespoort",
        eyebrow: "Instant length, fullness and better hair density",
        heroDescription: "If your hair feels too fine, too short or too flat to create the look you want, this guide helps you compare extension methods for fuller, longer and more balanced hair.",
        heroImage: "/images/hair-extensions/beachy-blonde-waves-extensions.png",
        heroImageAlt: "Hair extensions in Hartbeespoort at Galeo Beauty",
        primaryKeywords: ["hair extensions hartbeespoort", "tape in extensions hartbeespoort", "clip in hair extensions harties", "remy hair extensions hartbeespoort"],
        supportingKeywords: ["halo hair extensions", "extensions for fine hair", "length and volume enhancement", "natural blend extensions"],
        symptoms: ["hair that feels too fine or flat", "struggling to grow hair longer", "thin ends", "a ponytail that feels too small", "wanting instant volume or length"],
        results: ["longer fuller hair", "more volume through the lengths", "a thicker ponytail", "better shape and balance", "extensions that blend naturally"],
        comparisons: ["tape in vs clip in extensions", "halo hair vs tape in", "best extensions for fine hair"],
        objections: ["natural looking hair extensions", "extensions safe for fine hair", "lower maintenance extension methods"],
        audiences: ["clients with fine hair", "special occasion clients", "bridal hair clients", "clients wanting instant transformation"],
        whyItHappens: "Hair extensions usually become appealing when natural hair is not giving enough density, length or balance to create the style you want, even with good cutting and colour work.",
        treatmentApproach: "We compare how much fullness or length you want, how often you are happy to maintain it, and how discreet the finished result needs to feel before choosing the best extension method.",
        bestFor: ["fine flat hair", "instant length", "extra thickness", "clients who want fuller styling"],
        sections: [
            {
                title: "Why extensions are often about more than length",
                body: "Many clients do not only want longer hair. They want better density through the sides and ends, a stronger ponytail or more body when styling so the whole hairstyle feels more balanced.",
            },
            {
                title: "Choosing the right extension method",
                body: "Tape-ins, clip-ins, halo hair and other methods each suit a different routine. The right choice depends on whether you want something more temporary, more seamless or more suitable for finer natural hair.",
            },
            {
                title: "What makes extensions look believable",
                body: "The most natural result usually comes from matching the right amount of hair, the right colour blend and the right placement so the added fullness feels integrated instead of obvious.",
            },
        ],
        faqs: [
            { question: "What are the best hair extensions for fine hair?", answer: "That depends on how much volume you want and how permanent you want the method to be. Many fine-haired clients compare tape-ins, halo hair and other lighter-feeling methods." },
            { question: "Can hair extensions look natural?", answer: "Yes. When the colour, density and method are chosen properly, extensions can blend very naturally and add fullness without looking obvious." },
            { question: "Do you offer different hair extension methods in Hartbeespoort?", answer: "Yes. Galeo offers multiple methods including tape-ins, clip-ins, halo hair and other premium Remy options depending on the result you want." },
        ],
        categoryIds: ["hair-extensions"],
        serviceSlugs: ["tape-45cm-dark", "clip-45cm-dark", "halo-45cm-dark", "genius-45cm"],
    },
];

export function getAllIntentPages(): IntentPageSpec[] {
    return INTENT_PAGES;
}

export function getIntentPageBySlug(slug: string): IntentPageSpec | undefined {
    return INTENT_PAGES.find((page) => page.slug === slug);
}

export function getIntentPageServiceLinks(page: IntentPageSpec): IntentLink[] {
    return buildServiceLinks(page.serviceSlugs);
}

export function getIntentPagesForCategory(categoryId: string): IntentPageSpec[] {
    return INTENT_PAGES.filter((page) => page.categoryIds.includes(categoryId));
}

export function getIntentPagesForService(serviceSlug: string): IntentPageSpec[] {
    return INTENT_PAGES.filter((page) => page.serviceSlugs.includes(serviceSlug));
}
