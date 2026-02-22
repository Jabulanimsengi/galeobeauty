// Shared data for cross-linking service landing pages
// Used by the SEOLandingPage to show "Explore Other Treatments" section

export interface ServiceLink {
    title: string;
    href: string;
    description: string;
    image: string;
}

export const serviceLandingPages: ServiceLink[] = [
    {
        title: "Body Contouring",
        href: "/body-contouring",
        description: "Non-surgical fat reduction & EMS body sculpting",
        image: "/images/fat-freezing/fat-freezing-stomach-treatment.jpeg",
    },
    {
        title: "Anti-Aging",
        href: "/anti-aging",
        description: "Injectable aesthetics & facial rejuvenation",
        image: "/images/gallery/Facials/professional-skin-facial-treatment-in-progress.jpeg",
    },
    {
        title: "Permanent Makeup",
        href: "/permanent-makeup",
        description: "Microblading, powder brows & lip blush",
        image: "/images/gallery/Permanent-Makeup/powder-brows-natural-results-hartbeespoort.jpeg",
    },
    {
        title: "Medical Spa",
        href: "/medical-spa",
        description: "Advanced aesthetic treatments & skincare",
        image: "/images/gallery/Laser-and-IPL/ipl-laser-hair-removal-underarm-treatment.jpeg",
    },
    {
        title: "Bridal Beauty",
        href: "/bridal-beauty",
        description: "Complete wedding day makeup & styling",
        image: "/images/make-up/expert-bridal-makeup-application.jpeg",
    },
    {
        title: "Laser Hair Removal",
        href: "/laser-hair-removal",
        description: "Permanent IPL hair removal for all areas",
        image: "/images/ipl/ipl-full-leg-hair-removal.jpeg",
    },
    {
        title: "Matric Dance",
        href: "/matric-dance",
        description: "Glamorous matric dance styling packages",
        image: "/images/make-up/precision-makeup-base-application.jpeg",
    },
];
