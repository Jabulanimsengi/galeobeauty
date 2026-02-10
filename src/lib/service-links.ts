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
        image: "/images/services/fat_freezing/Gallery_image_01(32).png.jpeg",
    },
    {
        title: "Anti-Aging",
        href: "/anti-aging",
        description: "Injectable aesthetics & facial rejuvenation",
        image: "/images/services/anti_ageing/anti_ageing_01.jpeg",
    },
    {
        title: "Permanent Makeup",
        href: "/permanent-makeup",
        description: "Microblading, powder brows & lip blush",
        image: "/images/services/makeup/makeup_01.jpeg",
    },
    {
        title: "Medical Spa",
        href: "/medical-spa",
        description: "Advanced aesthetic treatments & skincare",
        image: "/images/services/facials/Image_facial_02.jpeg",
    },
    {
        title: "Bridal Beauty",
        href: "/bridal-beauty",
        description: "Complete wedding day makeup & styling",
        image: "/images/services/bridal/bridal_01.jpeg",
    },
    {
        title: "Laser Hair Removal",
        href: "/laser-hair-removal",
        description: "Permanent IPL hair removal for all areas",
        image: "/images/services/IPL_Hair_removal/IPL_image_01.jpeg",
    },
    {
        title: "Matric Dance",
        href: "/matric-dance",
        description: "Glamorous matric dance styling packages",
        image: "/images/services/makeup/makeup_01.jpeg",
    },
];
