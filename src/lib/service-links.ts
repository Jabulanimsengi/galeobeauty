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
        image: "/images/gallery/body-contouring/fat-freezing-red-light-body-contouring-treatment.jpg",
    },
    {
        title: "Anti-Aging",
        href: "/anti-aging",
        description: "Injectable aesthetics & facial rejuvenation",
        image: "/images/gallery/facials/professional-skin-facial-treatment-in-progress.jpg",
    },
    {
        title: "Permanent Makeup",
        href: "/permanent-makeup",
        description: "Microblading, powder brows & lip blush",
        image: "/images/gallery/lashes-brows/powder-brows-natural-results-hartbeespoort.jpg",
    },
    {
        title: "Medical Spa",
        href: "/medical-spa",
        description: "Advanced aesthetic treatments & skincare",
        image: "/images/gallery/laser-ipl/ipl-laser-hair-removal-underarm-treatment.jpg",
    },
    {
        title: "Bridal Beauty",
        href: "/bridal-beauty",
        description: "Complete wedding day makeup & styling",
        image: "/images/make-up/expert-bridal-makeup-application.jpg",
    },
    {
        title: "Laser Hair Removal",
        href: "/laser-hair-removal",
        description: "Permanent IPL hair removal for all areas",
        image: "/images/ipl/ipl-full-leg-hair-removal.jpg",
    },
    {
        title: "Matric Dance",
        href: "/matric-dance",
        description: "Glamorous matric dance styling packages",
        image: "/images/make-up/precision-makeup-base-application.jpg",
    },
];
