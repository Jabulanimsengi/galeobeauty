// Schema.org JSON-LD helper utilities for SEO

const BUSINESS_BASE = {
    name: "Galeo Beauty",
    url: "https://www.galeobeauty.com",
    telephone: "+27121111730",
    address: {
        "@type": "PostalAddress" as const,
        streetAddress: "Shop 6, Landsmeer, Jan Smuts Rd",
        addressLocality: "Hartbeespoort",
        addressRegion: "North West",
        postalCode: "0216",
        addressCountry: "ZA",
    },
};

export function generateServiceSchema(service: {
    name: string;
    description: string;
    url: string;
    image?: string;
    priceRange?: string;
    offers?: { name: string; price: string; description?: string }[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: service.url,
        ...(service.image && { image: service.image }),
        provider: {
            "@type": "BeautySalon",
            ...BUSINESS_BASE,
        },
        areaServed: {
            "@type": "City",
            name: "Hartbeespoort",
        },
        ...(service.priceRange && { priceRange: service.priceRange }),
        ...(service.offers && {
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: `${service.name} Options`,
                itemListElement: service.offers.map((offer) => ({
                    "@type": "Offer",
                    name: offer.name,
                    price: offer.price.replace(/[^0-9.,]/g, "").split("-")[0].replace(",", ""),
                    priceCurrency: "ZAR",
                    ...(offer.description && { description: offer.description }),
                    availability: "https://schema.org/InStock",
                })),
            },
        }),
    };
}

export function generateBreadcrumbSchema(
    items: { name: string; url: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function generateFAQSchema(
    faqs: { question: string; answer: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}
