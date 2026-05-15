import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { businessInfo } from "@/lib/constants";
import { AGGREGATE_RATING, TESTIMONIALS, getReviewsForSchema } from "@/lib/reviews-data";

export const metadata: Metadata = {
    title: "Galeo Beauty Reviews | Hartbeespoort Salon Client Feedback",
    description:
        "Read Galeo Beauty reviews from Hartbeespoort salon clients for hair, nails, lashes, massage, permanent makeup and beauty treatments.",
    alternates: {
        canonical: "https://www.galeobeauty.com/reviews",
    },
    openGraph: {
        title: "Galeo Beauty Reviews | Hartbeespoort Salon Client Feedback",
        description:
            "Client feedback for Galeo Beauty in Hartbeespoort, including hair, nails, lashes, massage and advanced beauty treatments.",
        url: "https://www.galeobeauty.com/reviews",
        type: "website",
    },
};

const reviewHighlights = [
    "Hair and colour appointments",
    "Nail services and pedicures",
    "Lashes, brows and permanent makeup",
    "Massage and beauty treatments",
];

function RatingStars({ rating = 5 }: { rating?: number }) {
    return (
        <div className="flex items-center gap-1 text-gold" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

export default function ReviewsPage() {
    const reviewsSchema = {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        name: "Galeo Beauty",
        url: "https://www.galeobeauty.com/reviews",
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: AGGREGATE_RATING.ratingValue,
            reviewCount: AGGREGATE_RATING.reviewCount,
            bestRating: AGGREGATE_RATING.bestRating,
            worstRating: AGGREGATE_RATING.worstRating,
        },
        review: getReviewsForSchema(),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
            />
            <Header />
            <main className="bg-white">
                <section className="border-b border-border bg-[#17120f] py-16 text-white sm:py-20 lg:py-24">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-12">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                                Client Feedback
                            </p>
                            <h1 className="mt-5 font-sans text-[2.4rem] font-bold uppercase leading-[1.02] tracking-[0.05em] sm:text-[3.6rem] lg:text-[4.4rem]">
                                Galeo Beauty Reviews
                            </h1>
                            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                                Read what clients say after visiting Galeo Beauty in Hartbeespoort for hair,
                                nails, lashes, massage, permanent makeup and advanced beauty treatments.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/services"
                                    className="inline-flex items-center justify-center bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#17120f] transition-colors hover:bg-gold hover:text-white"
                                >
                                    View Services
                                </Link>
                                <a
                                    href={businessInfo.socials.google}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center border border-white/18 px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-gold hover:text-gold"
                                >
                                    Google Reviews
                                </a>
                            </div>
                        </div>

                        <div className="border border-white/12 bg-white/6 p-6 sm:p-8">
                            <RatingStars />
                            <p className="mt-5 text-4xl font-semibold text-white">
                                {AGGREGATE_RATING.ratingValue}/5
                            </p>
                            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/54">
                                {AGGREGATE_RATING.reviewCount}+ public reviews
                            </p>
                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {reviewHighlights.map((item) => (
                                    <div
                                        key={item}
                                        className="border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/72"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-14 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                        <div className="mb-8 max-w-3xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                                Recent Feedback
                            </p>
                            <h2 className="mt-4 font-sans text-[1.9rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2.5rem]">
                                What Clients Mention Most
                            </h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {TESTIMONIALS.map((review) => (
                                <article
                                    key={review.id}
                                    className="border border-border bg-white p-5 shadow-[0_22px_50px_-42px_rgba(28,20,16,0.35)]"
                                >
                                    <RatingStars rating={review.rating} />
                                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                        &ldquo;{review.text}&rdquo;
                                    </p>
                                    <div className="mt-5 border-t border-border pt-4">
                                        <p className="font-semibold text-foreground">{review.name}</p>
                                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                                            {review.service} | {review.date}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-t border-border bg-stone-50/70 py-14">
                    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 text-center sm:px-8">
                        <h2 className="font-sans text-[1.8rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2.3rem]">
                            Ready To Book After Reading The Reviews?
                        </h2>
                        <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground">
                            Choose the service family you are interested in, then book directly with the Hartbeespoort salon.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link
                                href="/services/hair"
                                className="border border-border bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:border-gold hover:text-gold"
                            >
                                Hair
                            </Link>
                            <Link
                                href="/services/nails"
                                className="border border-border bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:border-gold hover:text-gold"
                            >
                                Nails
                            </Link>
                            <Link
                                href="/services/massages"
                                className="border border-border bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:border-gold hover:text-gold"
                            >
                                Massage
                            </Link>
                            <Link
                                href="/services"
                                className="border border-[#17120f] bg-[#17120f] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:bg-gold"
                            >
                                All Services
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
