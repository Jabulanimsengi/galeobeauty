"use client";

import { useState, useEffect } from "react";
import { Header, Footer } from "@/components/layout";
import { TrustBadge } from "@/components/ui/trust-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Download } from "lucide-react";
import { serviceCategories } from "@/lib/services-data";

// Re-using the sticky nav component
function CategoryNav({ activeCategory, onCategoryClick }: { activeCategory: string; onCategoryClick: (id: string) => void }) {
    return (
        <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-3 px-1">
                    {serviceCategories.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryClick(cat.id)}
                                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${isActive
                                    ? "bg-foreground text-background shadow-md"
                                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                                    }`}
                            >
                                {cat.title}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function PricesPage() {
    const [activeCategory, setActiveCategory] = useState("facials");

    const handleCategoryClick = (id: string) => {
        setActiveCategory(id);
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky header
            const y = element.getBoundingClientRect().top + window.scrollY - 180;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = serviceCategories.map(cat => ({
                id: cat.id,
                element: document.getElementById(cat.id),
            }));

            // Find which section is currently in view
            for (const section of sections.reverse()) {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect();
                    if (rect.top <= 200) {
                        setActiveCategory(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 bg-secondary/20">
                    <div className="container mx-auto text-center max-w-4xl">
                        <span className="text-gold font-medium uppercase tracking-widest text-xs sm:text-sm block mb-4">
                            Transparent Pricing
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            Official Price <span className="text-gold">List</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-2xl mx-auto">
                            Browse our comprehensive list of treatments. All prices are in ZAR and subject to consultation.
                        </p>
                    </div>
                </section>

                <CategoryNav activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />

                <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-20 max-w-5xl space-y-24">
                    {serviceCategories.map((category) => {
                        return (
                            <section key={category.id} id={category.id} className="scroll-mt-40">
                                {/* Category Header */}
                                <div className="mb-8 border-b border-foreground/10 pb-4">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="font-serif text-3xl sm:text-4xl text-foreground">{category.title}</h2>
                                        <TrustBadge variant={category.badgeVariant} className="hidden sm:inline-flex">{category.badge}</TrustBadge>
                                    </div>
                                    <p className="text-muted-foreground">{category.subtitle}</p>
                                </div>

                                {/* Price Groups Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                    {category.subcategories.map((subcategory, idx) => (
                                        <motion.div
                                            key={subcategory.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                                            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-border/40 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <h3 className="font-serif text-xl text-foreground mb-6 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                                {subcategory.title}
                                            </h3>

                                            <div className="space-y-4">
                                                {subcategory.items.map((item) => (
                                                    <div key={item.id} className="flex items-end justify-between border-b border-dashed border-muted/30 pb-2 last:border-0 last:pb-0">
                                                        <div className="flex flex-col">
                                                            <span className="text-foreground/90 font-medium">{item.name}</span>
                                                            {item.duration && (
                                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    {item.duration}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="font-semibold text-gold whitespace-nowrap ml-4">{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {subcategory.note && (
                                                <p className="mt-4 text-xs text-muted-foreground italic bg-secondary/50 p-2 rounded-lg text-center">
                                                    * {subcategory.note}
                                                </p>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Floating Download Button */}
                <div className="fixed bottom-6 right-6 z-50">
                    <Button className="rounded-full shadow-2xl bg-foreground text-background hover:bg-gold hover:text-white px-6 py-6 h-auto flex gap-3 transition-all duration-300 group">
                        <Download className="w-5 h-5 group-hover:animate-bounce" />
                        <span className="font-medium pr-1">Download PDF</span>
                    </Button>
                </div>

                {/* CTA */}
                <section className="py-20 bg-foreground text-background text-center mt-20">
                    <div className="container mx-auto px-4">
                        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                            Ready to book?
                        </h2>
                        <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground font-semibold px-10">
                            <Link href="/booking">
                                Make a Booking
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
