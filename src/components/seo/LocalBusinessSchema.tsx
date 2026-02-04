export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "name": "Galeo Beauty Salon & Spa",
        "description": "Premier beauty salon and medical spa in Hartbeespoort offering body contouring, anti-aging treatments, permanent makeup, laser hair removal, and bridal beauty services.",
        "url": "https://www.galeobeauty.com",
        "logo": "https://www.galeobeauty.com/logo.png",
        "image": "https://www.galeobeauty.com/images/salon.jpg",
        "telephone": "+27-XX-XXX-XXXX", // Replace with actual phone
        "email": "info@galeobeauty.com", // Replace with actual email
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Your Street Address", // Replace with actual address
            "addressLocality": "Hartbeespoort",
            "addressRegion": "North West",
            "postalCode": "0216",
            "addressCountry": "ZA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-25.7479", // Replace with actual coordinates
            "longitude": "27.8561"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "17:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "15:00"
            }
        ],
        "priceRange": "R200 - R5000",
        "areaServed": [
            {
                "@type": "City",
                "name": "Hartbeespoort"
            },
            {
                "@type": "City",
                "name": "Brits"
            },
            {
                "@type": "City",
                "name": "Rustenburg"
            },
            {
                "@type": "City",
                "name": "Pretoria"
            },
            {
                "@type": "City",
                "name": "Centurion"
            }
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
            "ratingValue": "5.0",
            "reviewCount": "500",
            "bestRating": "5",
            "worstRating": "1"
        },
        "sameAs": [
            "https://www.facebook.com/galeobeauty", // Replace with actual social links
            "https://www.instagram.com/galeobeauty"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
