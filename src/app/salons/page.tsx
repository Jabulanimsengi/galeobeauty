import { Metadata } from "next";
import Link from "next/link";
import { COMMERCIAL_LOCATIONS, COMMERCIAL_CATEGORIES, COMMERCIAL_MODIFIERS } from "@/lib/commercial-seo";

export const metadata: Metadata = {
    title: "Salon Directory | Find Galeo Beauty Near You",
    description: "Browse our complete directory of beauty services across Hartbeespoort, Pretoria, Johannesburg, and Sandton. Professional hair, nails, and skin care.",
};

export default function SalonsDirectoryPage() {
    return (
        <main className="min-h-screen bg-[#f7f4ef] py-20 pb-32">
            <div className="container mx-auto px-4 sm:px-6">
                <header className="mb-20 text-center">
                    <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                        Our Reach
                    </span>
                    <h1 className="mb-6 font-serif text-4xl font-light text-[#1d1d1f] md:text-5xl lg:text-6xl">
                        Salon Directory
                    </h1>
                    <p className="mx-auto max-w-2xl text-[1.1rem] leading-relaxed text-[#1d1d1f]/70">
                        Discover the best in professional beauty across Gauteng. From our flagship Hartbeespoort estate 
                        salon to our specialized service areas in Pretoria and Sandton.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
                    {COMMERCIAL_LOCATIONS.map((location) => (
                        <div key={location.slug} className="space-y-8">
                            <h2 className="border-b border-[#1d1d1f]/10 pb-4 font-serif text-2xl text-[#1d1d1f]">
                                {location.name}
                            </h2>
                            <div className="space-y-12">
                                {COMMERCIAL_CATEGORIES.map((category) => (
                                    <div key={category.slug}>
                                        <h3 className="mb-4 text-[0.75rem] font-bold uppercase tracking-widest text-[#1d1d1f]/40">
                                            {category.name}
                                        </h3>
                                        <ul className="space-y-3">
                                            {COMMERCIAL_MODIFIERS.slice(0, 3).map((modifier) => {
                                                const slug = `${modifier.slug}-${category.slug}-in-${location.slug}`;
                                                return (
                                                    <li key={slug}>
                                                        <Link 
                                                            href={`/salons/${slug}`}
                                                            className="group flex items-center text-[0.95rem] text-[#1d1d1f]/80 transition-colors hover:text-gold"
                                                        >
                                                            <span className="mr-2 h-[1px] w-2 bg-gold/30 transition-all group-hover:w-4 group-hover:bg-gold" />
                                                            {modifier.label} {category.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
