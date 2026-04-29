import { type FAQ } from "./seo-data";

export interface BespokeCategoryPage {
    categoryId: string;
    heroTitle: string;
    heroIntro: string;
    metaTitle?: string;
    metaDescription?: string;
    familySectionTitle: string;
    familySectionIntro: string;
    directoryTitle: string;
    directoryDescription: string;
    faqs: FAQ[];
    featuredFamilySlugs: string[];
}

const bespokeCategoryPages: BespokeCategoryPage[] = [
    {
        categoryId: "hair",
        heroTitle: "Hair Services In Hartbeespoort",
        heroIntro:
            "Explore cuts, colour, smoothing and styling in one place. If you already know what you want, you can go straight to the menu below. If you are still deciding, start with the most relevant option for your hair goal.",
        metaTitle: "Hair Salon Hartbeespoort | Hair Colour, Styling & Smoothing",
        metaDescription:
            "Browse hair services in Hartbeespoort, including colour, cuts, styling and smoothing. Compare options and choose the treatment that fits you best.",
        familySectionTitle: "Popular Hair Options",
        familySectionIntro:
            "Start with the result you want most, whether that is colour, a smoother finish or a cut and style refresh.",
        directoryTitle: "Full Hair Menu",
        directoryDescription:
            "Use the sections below when you already know the treatment you want or when you want to compare exact prices inside the hair category.",
        faqs: [
            { question: "Where should I start if I am not sure which hair service to book?", answer: "Start with the option that best matches your goal, like colour, smoothing or styling. If you already know the exact service, you can go straight to the full menu." },
            { question: "Why do some hair prices change by length?", answer: "Hair length affects product use, sectioning and appointment time, so some services scale by short, medium, long or extra-long hair." },
            { question: "Can I book more than one hair service in one visit?", answer: "Often yes, but it depends on the combination and timing. It is best to message first if you want colour, treatment and styling together." },
        ],
        featuredFamilySlugs: ["hair-colour", "haircuts-and-styling", "brazilian-blowout"],
    },
    {
        categoryId: "nails",
        heroTitle: "Nail Services In Hartbeespoort",
        heroIntro:
            "Explore overlays, acrylics, pedicures and nail maintenance in one place. If you already know the exact treatment you want, use the menu below. If not, start with the option that matches the finish you want.",
        metaTitle: "Nail Salon Hartbeespoort | Gel, Acrylic And Pedicure Services",
        metaDescription:
            "Browse nail services in Hartbeespoort, including gel, acrylic, overlays and pedicures. Compare the family first, then check the full menu and prices.",
        familySectionTitle: "Popular Nail Options",
        familySectionIntro:
            "Start with the finish you want: strength, added length, design impact or hands-and-feet maintenance.",
        directoryTitle: "Full Nail Menu",
        directoryDescription:
            "Use the menu below to compare exact nail treatments, fills, soak-offs and finishing services once you know which route suits you.",
        faqs: [
            { question: "Where should I start if I am not sure which nail service to choose?", answer: "Start with the option that matches what you want most, whether that is stronger natural nails, added length or hands-and-feet maintenance." },
            { question: "How often do nail maintenance appointments usually happen?", answer: "That depends on the system and your growth, but many clients return every two to three weeks for fills, rebalancing or fresh application." },
            { question: "Can I book hands and feet together?", answer: "Yes in many cases, but the final timing depends on the combination of services and whether detailed design work is included." },
        ],
        featuredFamilySlugs: ["nail-services"],
    },
    {
        categoryId: "lashes-brows",
        heroTitle: "Lash And Brow Services In Hartbeespoort",
        heroIntro:
            "Browse lash and brow treatments in one place. If you already know the exact set, fill or brow service you want, use the menu below. If not, start with the option that suits your routine best.",
        familySectionTitle: "Popular Lash And Brow Options",
        familySectionIntro:
            "The main choice is usually between fuller extensions and a softer, lower-maintenance result.",
        directoryTitle: "Full Lash And Brow Menu",
        directoryDescription:
            "The menu below lists the individual sets, fills, lifts, tints and brow services once you are ready to compare exact options and prices.",
        faqs: [
            { question: "Should I start with a lash option or the exact set?", answer: "Start with the option that matches your routine if you are still comparing extensions with lower-maintenance treatments. Choose the exact set when you already know the look you want." },
            { question: "What belongs in this category besides lash extensions?", answer: "This category also includes lash lifts, tints and brow services, so it works as the full eye-and-brow directory rather than just an extension page." },
            { question: "How do I know if I need an infill?", answer: "If you already wear extensions, the choice usually depends on retention and how much of the set is still in place. If in doubt, message the salon before booking." },
        ],
        featuredFamilySlugs: ["lash-extensions"],
    },
    {
        categoryId: "dermalogica",
        heroTitle: "Dermalogica Skin Services In Hartbeespoort",
        heroIntro:
            "Browse Dermalogica skin treatments in one place. If you are still deciding how active or corrective you want the treatment to be, start with the option that best fits your skin goal. If you already know the treatment you want, use the menu below.",
        familySectionTitle: "Popular Dermalogica Options",
        familySectionIntro:
            "Start with the option that best matches your skin goal, whether that is regular maintenance, clearer skin or stronger correction.",
        directoryTitle: "Full Dermalogica Menu",
        directoryDescription:
            "Use the menu below to compare the exact treatment names, price points and subcategory groupings once you know the level of treatment you want.",
        faqs: [
            { question: "Where should I start if I am unsure which skin treatment to book?", answer: "Start with the option that feels closest to your skin goal, or message the salon if you are unsure, especially if you think you may need a more corrective treatment." },
            { question: "Can I still browse every Dermalogica treatment here?", answer: "Yes. The full menu still shows the individual Dermalogica treatments and prices." },
            { question: "Should I book straight from the menu if I already know the treatment?", answer: "Yes. If you already know the treatment you want, you can go straight to the full menu below." },
        ],
        featuredFamilySlugs: ["dermalogica-corrective-facials"],
    },
    {
        categoryId: "ipl",
        heroTitle: "IPL Services In Hartbeespoort",
        heroIntro:
            "Browse IPL hair-reduction services in one place. If you already know the area you want to treat, use the menu below. If not, start with the option that feels closest to your goal.",
        familySectionTitle: "Popular IPL Options",
        familySectionIntro:
            "Start by deciding what you want to treat, then move into the exact area and session option that fits you.",
        directoryTitle: "Full IPL Menu",
        directoryDescription:
            "The menu below keeps every IPL line item accessible once you know the area or exact treatment you want.",
        faqs: [
            { question: "Should I choose the treatment area first?", answer: "If you already know the area you want to treat, you can go straight to the menu. If not, start with the option that feels closest to your goal and then narrow it down." },
            { question: "Can I ask for help choosing the correct IPL area?", answer: "Yes. If you are between two line items or areas, it is better to message the salon before finalising the booking." },
        ],
        featuredFamilySlugs: ["ipl-hair-removal"],
    },
    {
        categoryId: "qms",
        heroTitle: "QMS Facials In Hartbeespoort",
        heroIntro:
            "Browse QMS facials in one place. If you already know the facial you want, use the menu below. If not, start with the option that best matches your skin goal.",
        familySectionTitle: "Popular QMS Options",
        familySectionIntro:
            "Start with the kind of result you want, whether that is maintenance, collagen support or a more active treatment.",
        directoryTitle: "Full QMS Menu",
        directoryDescription:
            "Use the menu below to compare individual QMS facials, boosters and treatment lines once you know the route you want.",
        faqs: [
            { question: "Where should I start if I am unsure which QMS facial to book?", answer: "Start with the option that feels closest to your skin goal. If you already know the facial you want, you can go straight to the menu below." },
            { question: "Will this page still show all the QMS treatments?", answer: "Yes. The menu below still lists the individual QMS treatments and prices." },
            { question: "Can I book straight from the menu if I know the treatment name?", answer: "Yes. If you already know the exact facial you want, you can use the full menu directly." },
        ],
        featuredFamilySlugs: ["qms-facials"],
    },
    {
        categoryId: "waxing",
        heroTitle: "Waxing Services In Hartbeespoort",
        heroIntro:
            "Browse face, body and intimate waxing in one place. If you already know the exact area you want, use the menu below. If not, start with the option that best matches what you want treated.",
        familySectionTitle: "Popular Waxing Options",
        familySectionIntro:
            "Start with the area you want to focus on most, then choose the exact service that suits you.",
        directoryTitle: "Full Waxing Menu",
        directoryDescription:
            "The menu below keeps every waxing area and treatment line available once you already know the service you want to book.",
        faqs: [
            { question: "Where should I start if I am not sure which waxing service to book?", answer: "Start with the area you want to treat most, then choose the exact waxing service from the menu below." },
            { question: "Can I still see all the waxing options here?", answer: "Yes. The full menu below still shows the individual waxing services and prices." },
            { question: "Can I book multiple waxing areas at once?", answer: "Often yes, but if you want several areas in one visit it is best to confirm timing with the salon first." },
        ],
        featuredFamilySlugs: ["waxing-services"],
    },
    {
        categoryId: "hair-extensions",
        heroTitle: "Hair Extensions In Hartbeespoort",
        heroIntro:
            "Browse extension methods, premium hair options and the full menu in one place. If you already know the method you want, use the menu below. If not, start with the option that best matches your hair goals.",
        familySectionTitle: "Popular Hair Extension Options",
        familySectionIntro:
            "Start with the method or result you want most, then move into the exact extension line that suits you.",
        directoryTitle: "Full Hair Extensions Menu",
        directoryDescription:
            "Use the menu below once you already know the method or specific extension product you want to compare.",
        faqs: [
            { question: "Where should I start if I am unsure which extension method to choose?", answer: "Start with the option that best matches the result you want. If you already know the method, you can go straight to the menu below." },
            { question: "Can I still browse all the extension options here?", answer: "Yes. The full menu still lists the individual extension options and prices." },
            { question: "Should first-time extension clients message before booking?", answer: "Yes. It helps to confirm the best method before choosing the final booking line." },
        ],
        featuredFamilySlugs: ["premium-hair-extensions"],
    },
    {
        categoryId: "permanent-makeup",
        heroTitle: "Permanent Makeup Services In Hartbeespoort",
        heroIntro:
            "Browse brow, lip and other permanent makeup services in one place. If you already know the treatment you want, use the menu below. If not, start with the area you want to focus on most.",
        familySectionTitle: "Popular Permanent Makeup Options",
        familySectionIntro:
            "Start with the treatment area you want to focus on first, then choose the exact service that suits you.",
        directoryTitle: "Full Permanent Makeup Menu",
        directoryDescription:
            "The menu below lists the exact permanent makeup treatments and prices once you know the route that suits you.",
        faqs: [
            { question: "Where should I start if I am not sure which permanent makeup service to book?", answer: "Start with the area you want to improve most, then choose the exact service from the menu below." },
            { question: "Can I still see every permanent makeup service here?", answer: "Yes. The full menu below still lists the individual permanent makeup services and prices." },
            { question: "Should I ask before booking if I am unsure about the right option?", answer: "Yes. It is better to confirm the right route before choosing the final permanent makeup service." },
        ],
        featuredFamilySlugs: ["permanent-makeup-services"],
    },
    {
        categoryId: "hart-aesthetics",
        heroTitle: "Injectable Aesthetic Services In Hartbeespoort",
        heroIntro:
            "Browse injectable aesthetic treatments in one place. If you already know the treatment you want, use the menu below. If not, start with the result you want most.",
        familySectionTitle: "Popular Injectable Options",
        familySectionIntro:
            "Start with the result you want most, whether that is smoother skin, restored volume or a more lifted look.",
        directoryTitle: "Full Injectable Aesthetics Menu",
        directoryDescription:
            "The menu below keeps the full list of injectable treatment lines and prices available once you know what route you want.",
        faqs: [
            { question: "Where should I start if I am not sure which injectable treatment to book?", answer: "Start with the result you want most, then choose the exact treatment from the menu below once the direction feels clear." },
            { question: "Can I still browse the exact injectable treatments here?", answer: "Yes. The full menu below still shows the individual injectable services and prices." },
            { question: "Should I message before booking if I am unsure?", answer: "Yes. It helps to confirm the most relevant injectable route before selecting a specific treatment line." },
        ],
        featuredFamilySlugs: ["injectable-aesthetics"],
    },
    {
        categoryId: "fat-freezing",
        heroTitle: "Body Contouring Services In Hartbeespoort",
        heroIntro:
            "Browse body contouring treatments in one place. If you already know the treatment you want, use the menu below. If not, start with the area or result you want to focus on most.",
        familySectionTitle: "Popular Body Contouring Options",
        familySectionIntro:
            "Start with the area or result you want to focus on, then choose the exact treatment that suits you.",
        directoryTitle: "Full Body Contouring Menu",
        directoryDescription:
            "Use the menu below when you already know the exact contouring treatment line or area you want to book.",
        faqs: [
            { question: "Where should I start if I am not sure which contouring treatment to choose?", answer: "Start with the area or result you want to focus on most, then choose the exact treatment from the menu below." },
            { question: "Can I still see all the contouring treatments here?", answer: "Yes. The full menu below still lists the individual contouring services and prices." },
            { question: "Should I ask for help before picking a contouring line?", answer: "Yes if you are unsure, especially when choosing between areas or treatment routes." },
        ],
        featuredFamilySlugs: ["body-contouring"],
    },
    {
        categoryId: "massages",
        heroTitle: "Massage Services In Hartbeespoort",
        heroIntro:
            "Browse massage treatments in one place. If you already know the style or duration you want, use the menu below. If not, start with the kind of relief or relaxation you want most.",
        familySectionTitle: "Popular Massage Options",
        familySectionIntro:
            "Start with the feeling you want to leave with, whether that is deeper relief, recovery or a more relaxing experience.",
        directoryTitle: "Full Massage Menu",
        directoryDescription:
            "Use the menu below when you already know the massage style or duration you want to book.",
        faqs: [
            { question: "Where should I start if I am not sure which massage to book?", answer: "Start with the feeling you want most, like deeper relief, recovery or relaxation, then choose the exact treatment from the menu below." },
            { question: "Will the category page still show all massage options?", answer: "Yes. The full menu below still lists the massage options and prices." },
            { question: "Can I ask for help choosing the right massage style?", answer: "Yes. If the difference between styles is unclear, message the salon before finalising the booking." },
        ],
        featuredFamilySlugs: ["massage-therapy"],
    },
    {
        categoryId: "makeup",
        heroTitle: "Makeup Services In Hartbeespoort",
        heroIntro:
            "Browse makeup services in one place. If you already know the type of booking you want, use the menu below. If not, start with the kind of occasion you are booking for.",
        familySectionTitle: "Popular Makeup Options",
        familySectionIntro:
            "Start with the occasion or finish that suits you best, then choose the exact booking line you want.",
        directoryTitle: "Full Makeup Menu",
        directoryDescription:
            "Use the menu below once you already know the type of booking you want and just need the exact line and price.",
        faqs: [
            { question: "Where should I start if I am not sure which makeup booking to choose?", answer: "Start with the occasion you are getting ready for, then choose the exact booking line from the menu below." },
            { question: "Can I still go straight to the exact makeup service?", answer: "Yes. The full menu below still lists the individual makeup services and prices." },
            { question: "Should I message first for bridal or event bookings?", answer: "Yes. It helps to confirm the timing and the most relevant booking route before you choose the final line item." },
        ],
        featuredFamilySlugs: ["makeup-services"],
    },
    {
        categoryId: "sunbed",
        heroTitle: "Tanning Services In Hartbeespoort",
        heroIntro:
            "Browse tanning services in one place. If you already know whether you want spray tan or sunbed sessions, use the menu below. If not, start with the kind of result you want most.",
        familySectionTitle: "Popular Tanning Options",
        familySectionIntro:
            "Start with whether you want a faster event-ready glow or a more gradual tanning route.",
        directoryTitle: "Full Tanning Menu",
        directoryDescription:
            "Use the menu below for the exact tanning lines, packages and prices once the route is already clear.",
        faqs: [
            { question: "Where should I start if I am not sure which tanning option to choose?", answer: "Start with the kind of result you want most, whether that is a quicker glow or a more gradual tanning route, then choose the exact service from the menu below." },
            { question: "Does the category page still show all tanning options?", answer: "Yes. The menu below still lists the individual tanning services and prices." },
            { question: "Should I ask before booking if I am unsure?", answer: "Yes. It helps to confirm whether the faster route or the ongoing route is the better fit before choosing the final line item." },
        ],
        featuredFamilySlugs: ["tanning-services"],
    },
    {
        categoryId: "medical",
        heroTitle: "Medical Aesthetic Treatments In Hartbeespoort",
        heroIntro:
            "Browse medical aesthetic treatments in one place. If you already know the treatment you want, use the menu below. If not, start with the concern you want to focus on most.",
        familySectionTitle: "Popular Treatment Options",
        familySectionIntro:
            "Start with the concern you want to address first, then choose the exact treatment that suits you.",
        directoryTitle: "Full Medical Treatment Menu",
        directoryDescription:
            "Use the menu below when you already know the specialist treatment line you want to compare or book.",
        faqs: [
            { question: "Where should I start if I am not sure which medical treatment to choose?", answer: "Start with the concern you want to focus on most, then choose the exact treatment from the menu below or message the salon if you need guidance." },
            { question: "Will the category page still show the full medical menu?", answer: "Yes. The full menu below still lists the individual medical treatments and prices." },
            { question: "Should I message before booking a medical treatment?", answer: "Yes. Medical and specialist routes are better confirmed before you choose the final treatment line." },
        ],
        featuredFamilySlugs: ["medical-aesthetic-treatments"],
    },
];

export function getBespokeCategoryPage(categoryId: string): BespokeCategoryPage | undefined {
    return bespokeCategoryPages.find((page) => page.categoryId === categoryId);
}
