import { AGGREGATE_RATING } from "@/lib/reviews-data";

export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "name": "Galeo Beauty Salon & Spa",
        "description": "Premier beauty salon and medical spa in Hartbeespoort offering body contouring, anti-aging treatments, permanent makeup, laser hair removal, and bridal beauty services.",
        "url": "https://www.galeobeauty.com",
        "logo": "https://www.galeobeauty.com/images/logo.png",
        "image": "https://www.galeobeauty.com/images/logo.png",
        "telephone": "+27121111730",
        "email": "info@galeobeauty.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Shop 6, Landsmeer Estate, Jan Smuts Ave",
            "addressLocality": "Hartbeespoort Dam",
            "addressRegion": "North West",
            "postalCode": "0216",
            "addressCountry": "ZA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-25.753414",
            "longitude": "27.909252"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "08:00",
                "closes": "16:00"
            }
        ],
        "priceRange": "$$",
        "areaServed": [
            { "@type": "City", "name": "Hartbeespoort" },
            { "@type": "City", "name": "Pretoria" },
            { "@type": "City", "name": "Johannesburg" },
            { "@type": "City", "name": "Centurion" },
            { "@type": "City", "name": "Brits" }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Beauty Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Body Contouring & Fat Freezing",
                        "description": "Non-surgical body sculpting with cryolipolysis and EMS technology",
                        "url": "https://www.galeobeauty.com/body-contouring"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Anti-Aging Treatments",
                        "description": "Injectable aesthetics, dermal fillers, and collagen stimulators",
                        "url": "https://www.galeobeauty.com/anti-aging"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Permanent Makeup",
                        "description": "Microblading, powder brows, and semi-permanent makeup",
                        "url": "https://www.galeobeauty.com/permanent-makeup"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Medical Spa Treatments",
                        "description": "Advanced aesthetic treatments and medical-grade skincare",
                        "url": "https://www.galeobeauty.com/medical-spa"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Bridal Beauty Packages",
                        "description": "Complete wedding day makeup, hair styling, and beauty services",
                        "url": "https://www.galeobeauty.com/bridal-beauty"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Laser Hair Removal",
                        "description": "IPL permanent hair removal for face, body, and bikini areas",
                        "url": "https://www.galeobeauty.com/laser-hair-removal"
                    }
                }
            ]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            ...AGGREGATE_RATING,
        },
        "sameAs": [
            "https://web.facebook.com/galeobeauty",
            "https://www.instagram.com/galeo_beauty/"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
