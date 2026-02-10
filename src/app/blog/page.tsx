import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { getAllBlogPosts } from "@/lib/blog-data";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Beauty Blog | Expert Tips & Guides | Galeo Beauty Hartbeespoort",
    description: "Expert beauty tips, treatment guides, and skincare advice from Galeo Beauty in Hartbeespoort. Learn about facials, lash extensions, permanent makeup, anti-aging & more.",
    keywords: [
        "beauty blog Hartbeespoort",
        "skincare tips South Africa",
        "beauty advice Hartbeespoort Dam",
        "facial guide Hartbeespoort",
        "lash extensions tips",
        "wedding makeup tips South Africa",
        "beauty trends South Africa",
        "anti-aging skincare advice",
        "permanent makeup guide",
        "IPL hair removal tips",
        "Galeo Beauty blog",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/blog",
    },
    openGraph: {
        title: "Beauty Blog | Expert Tips & Guides | Galeo Beauty",
        description:
            "Expert beauty tips, treatment guides & skincare advice from Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/blog",
        type: "website",
    },
};

// Fully static - no ISR
export const dynamic = "force-static";
export const revalidate = false;

export default function BlogPage() {
    const posts = getAllBlogPosts();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://www.galeobeauty.com" },
        { name: "Blog", url: "https://www.galeobeauty.com/blog" },
    ]);

    const blogListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Galeo Beauty Blog Articles",
        description: "Expert beauty tips, treatment guides, and skincare advice from Galeo Beauty in Hartbeespoort.",
        url: "https://www.galeobeauty.com/blog",
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://www.galeobeauty.com/blog/${post.slug}`,
            name: post.title,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, blogListSchema]) }}
            />
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent -z-10" />

                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="inline-block text-gold text-sm font-medium tracking-wider uppercase mb-4">
                                Beauty Blog
                            </span>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                                Expert Beauty <span className="text-gold italic">Tips & Guides</span>
                            </h1>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Discover skincare secrets, treatment guides, and beauty trends from our expert team at Galeo Beauty.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <article
                                    key={post.slug}
                                    className="group bg-secondary/30 rounded-2xl overflow-hidden border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-xl"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden bg-secondary">
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <span className="bg-gold/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(post.date).toLocaleDateString('en-ZA', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <h2 className="font-serif text-xl text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">
                                            <Link href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h2>

                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-gold font-medium text-sm group-hover:gap-3 transition-all"
                                        >
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Reviews Section */}
                <ReviewsSection />

                {/* CTA Section */}
                <section className="py-20 bg-foreground text-background text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                            Ready to Experience These Treatments?
                        </h2>
                        <p className="text-background/70 mb-8 max-w-lg mx-auto">
                            Book your appointment at Galeo Beauty and let our experts take care of you.
                        </p>
                        <Link
                            href="/prices"
                            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-foreground font-semibold px-8 py-3 rounded-full transition-colors"
                        >
                            View Our Services
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
