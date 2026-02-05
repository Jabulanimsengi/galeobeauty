// ============================================
// REVIEWS DATA - Centralized Testimonials
// ============================================
// Single source of truth for all customer reviews
// Used by: ReviewsSection component + Schema markup

export interface Review {
    id: number;
    name: string;
    date: string;
    datePublished: string; // ISO format for schema
    rating: number;
    text: string;
    service: string;
}

// Real customer testimonials from Fresha (4.9 stars, 159+ reviews)
// TODO: Replace with Fresha API integration when ready
export const TESTIMONIALS: Review[] = [
    {
        id: 1,
        name: "Lynmari",
        date: "January 2026",
        datePublished: "2026-01-15",
        rating: 5,
        text: "Absolutely amazing! I had my eyebrows done, eyeliner and had tattoo removal done, all at the same time. They were so kind, caring and professional. The lady that attended to me had more than 20 years of experience and it shows.",
        service: "Permanent Makeup",
    },
    {
        id: 2,
        name: "Lelani S.",
        date: "January 2026",
        datePublished: "2026-01-12",
        rating: 5,
        text: "Dandi and Lindsey are my favorites 🥰 Thank you Galeo Beauty!",
        service: "Beauty Services",
    },
    {
        id: 3,
        name: "Morgan",
        date: "January 2026",
        datePublished: "2026-01-10",
        rating: 5,
        text: "It was absolutely amazing! I love my eyelashes. Angel lashes again by Dandi 😊",
        service: "Lash Extensions",
    },
    {
        id: 4,
        name: "Corinne C.",
        date: "January 2026",
        datePublished: "2026-01-08",
        rating: 5,
        text: "Lindzi is very professional. Always a great experience!",
        service: "Beauty Treatment",
    },
    {
        id: 5,
        name: "Tersia",
        date: "January 2026",
        datePublished: "2026-01-06",
        rating: 5,
        text: "Elishia does great nails! 💕 Always happy with the results.",
        service: "Nail Services",
    },
    {
        id: 6,
        name: "Mariaan",
        date: "January 2026",
        datePublished: "2026-01-04",
        rating: 5,
        text: "Excellent service! The team really knows what they're doing. Highly recommend Galeo Beauty to everyone.",
        service: "Salon Services",
    },
    {
        id: 7,
        name: "Morgan",
        date: "January 2026",
        datePublished: "2026-01-02",
        rating: 5,
        text: "Awesome experience! The salon is beautiful and the staff are so welcoming. Will definitely be back!",
        service: "Beauty Services",
    },
    {
        id: 8,
        name: "Petunia",
        date: "December 2025",
        datePublished: "2025-12-28",
        rating: 5,
        text: "Very professional, happy with the results. Great attention to detail!",
        service: "Beauty Treatment",
    },
];

// Aggregate rating calculated from all reviews
export const AGGREGATE_RATING = {
    ratingValue: "4.9",
    reviewCount: "159",
    bestRating: "5",
    worstRating: "1",
};

// Helper: Get reviews for schema markup (first 4)
export function getReviewsForSchema() {
    return TESTIMONIALS.slice(0, 4).map(review => ({
        "@type": "Review",
        author: { "@type": "Person", name: review.name },
        datePublished: review.datePublished,
        reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating.toString(),
            bestRating: "5"
        },
        reviewBody: review.text,
    }));
}

// Helper: Get aggregate rating for schema
export function getAggregateRatingForSchema() {
    return {
        "@type": "AggregateRating",
        ...AGGREGATE_RATING,
    };
}

// TODO: Future integration with Fresha
// export async function fetchReviewsFromFresha() {
//     // Implement Fresha API integration here
//     // const response = await fetch('FRESHA_API_ENDPOINT');
//     // return response.json();
// }
