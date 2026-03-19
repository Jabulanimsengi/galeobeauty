import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";

import { Button } from "@/components/ui/button";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";

// Generate static params for all blog posts
export function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Fully static - no ISR
export const dynamic = "force-static";
export const revalidate = false;

interface PageProps {
    params: Promise<{ slug: string }>;
}

function getRelevantServiceLinks(slug: string, category: string) {
    const bySlug: Record<string, { href: string; label: string }[]> = {
        "microblading-vs-powder-brows": [
            { href: "/prices/permanent-makeup", label: "Permanent Makeup Prices" },
            { href: "/prices/lashes-brows", label: "Lashes & Brows Treatments" },
            { href: "/prices", label: "All Beauty Prices" },
        ],
        "lash-extensions-hartbeespoort": [
            { href: "/prices/lashes-brows", label: "Lash Extensions & Brows" },
            { href: "/prices/nails", label: "Nail Salon Services" },
            { href: "/prices", label: "All Beauty Prices" },
        ],
        "hair-extensions-guide-south-africa": [
            { href: "/prices/hair-extensions", label: "Hair Extensions Prices" },
            { href: "/prices/hair", label: "Hair Salon Services" },
            { href: "/prices", label: "All Beauty Prices" },
        ],
    };

    if (bySlug[slug]) {
        return bySlug[slug];
    }

    const byCategory: Record<string, { href: string; label: string }[]> = {
        Hair: [
            { href: "/prices/hair", label: "Hair Salon Services" },
            { href: "/prices/hair-extensions", label: "Hair Extensions" },
            { href: "/prices", label: "All Beauty Prices" },
        ],
        Lashes: [
            { href: "/prices/lashes-brows", label: "Lashes & Brows Treatments" },
            { href: "/prices/permanent-makeup", label: "Permanent Makeup" },
            { href: "/prices", label: "All Beauty Prices" },
        ],
        "Permanent Makeup": [
            { href: "/prices/permanent-makeup", label: "Permanent Makeup Prices" },
            { href: "/prices/lashes-brows", label: "Lashes & Brows Treatments" },
            { href: "/prices", label: "All Beauty Prices" },
        ],
        Skincare: [
            { href: "/prices/dermalogica", label: "Dermalogica Treatments" },
            { href: "/prices/qms", label: "QMS Facials" },
            { href: "/prices", label: "All Beauty Prices" },
        ],
    };

    return byCategory[category] || [
        { href: "/prices/hair", label: "Hair Salon Services" },
        { href: "/prices/nails", label: "Nail Salon Services" },
        { href: "/prices", label: "All Beauty Prices" },
    ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: post.title,
        description: post.excerpt,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        alternates: {
            canonical: `https://www.galeobeauty.com/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(slug, 3);
    const relevantServiceLinks = getRelevantServiceLinks(slug, post.category);

    // Convert markdown-like content to HTML
    const formatContent = (content: string) => {
        return content
            .split('\n')
            .map((line) => {
                // Headers
                if (line.startsWith('## ')) {
                    return `<h2 class="font-serif text-2xl text-foreground mt-8 mb-4">${line.slice(3)}</h2>`;
                }
                if (line.startsWith('### ')) {
                    return `<h3 class="font-serif text-xl text-foreground mt-6 mb-3">${line.slice(4)}</h3>`;
                }
                // Bold text
                let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a class="text-gold hover:underline" href="$2">$1</a>');
                // Lists
                if (line.startsWith('- ')) {
                    return `<li class="ml-4 text-muted-foreground">${formatted.slice(2)}</li>`;
                }
                // Tables (simplified)
                if (line.startsWith('|')) {
                    return ''; // Skip table syntax for now
                }
                // Empty lines
                if (line.trim() === '') {
                    return '<br />';
                }
                // Regular paragraphs
                return `<p class="text-muted-foreground leading-relaxed mb-4">${formatted}</p>`;
            })
            .join('');
    };

    // Schema.org Article structured data
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        author: {
            "@type": "Organization",
            name: post.author,
        },
        publisher: {
            "@type": "Organization",
            name: "Galeo Beauty",
            logo: {
                "@type": "ImageObject",
                url: "https://www.galeobeauty.com/images/logo.png",
            },
        },
        datePublished: post.date,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.galeobeauty.com/blog/${slug}`,
        },
    };

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Article Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                />

                {/* Hero Section */}
                <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent -z-10" />

                    <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                        {/* Breadcrumb */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-6 text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        <span className="inline-block bg-gold/10 text-gold text-sm font-medium px-4 py-1 rounded-full mb-4">
                            {post.category}
                        </span>

                        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {post.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.date).toLocaleDateString('en-ZA', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-8 pb-16">
                    <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                        <article
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                        />
                        <div className="mt-10 rounded-2xl border border-gold/20 bg-secondary/20 p-6">
                            <h2 className="font-serif text-2xl text-foreground mb-3">
                                Explore Related Services
                            </h2>
                            <p className="text-muted-foreground mb-5">
                                Continue from this guide into the main treatment pages most relevant to this topic.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {relevantServiceLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="rounded-full border border-gold/30 bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-12 bg-secondary/30 border-y border-border">
                    <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
                        <h2 className="font-serif text-2xl text-foreground mb-4">
                            Ready to Book Your Treatment?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Experience the treatments mentioned in this article at Galeo Beauty.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button asChild className="bg-gold hover:bg-gold-dark text-foreground rounded-full px-8">
                                <Link href="/prices">View Prices</Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-full px-8">
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="py-16">
                        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                            <h2 className="font-serif text-2xl text-foreground mb-8 text-center">
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.slug}
                                        href={`/blog/${relatedPost.slug}`}
                                        className="group bg-secondary/30 rounded-xl p-6 border border-border hover:border-gold/30 transition-all"
                                    >
                                        <span className="text-gold text-xs font-medium">
                                            {relatedPost.category}
                                        </span>
                                        <h3 className="font-serif text-lg text-foreground mt-2 mb-2 group-hover:text-gold transition-colors line-clamp-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2">
                                            {relatedPost.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-gold text-sm mt-4 group-hover:gap-2 transition-all">
                                            Read More <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Reviews Section */}

            </main>
            <Footer />
        </>
    );
}
