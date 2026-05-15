import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { buildLocationsIndexKeywords } from "@/lib/seo-keywords";
import { getLocationIndexGroups, isBroadLocationHub, isLocationAliasSlug, TARGET_LOCATIONS } from "@/lib/seo-data";
import { businessInfo } from "@/lib/constants";

const serviceAreaCount = TARGET_LOCATIONS.filter(
    (location) => !isBroadLocationHub(location) && !isLocationAliasSlug(location.slug)
).length;
const locationGroups = getLocationIndexGroups();

const featuredAreas = [
    {
        name: "Hartbeespoort",
        slug: "hartbeespoort",
        description: "Our home area for regular beauty appointments, maintenance treatments, and local Harties bookings.",
    },
    {
        name: "Pretoria",
        slug: "pretoria",
        description: "Popular for clients planning a calmer salon visit outside the city while still staying close to Gauteng.",
    },
    {
        name: "Centurion",
        slug: "centurion",
        description: "A practical route for advance bookings, event preparation, and planned self-care appointments.",
    },
    {
        name: "Johannesburg",
        slug: "johannesburg",
        description: "Useful for clients who want a destination beauty visit with clear pricing and treatment guidance.",
    },
    {
        name: "Brits",
        slug: "brits",
        description: "Nearby North West clients often book treatments around Hartbeespoort errands and weekend plans.",
    },
    {
        name: "North West",
        slug: "north-west",
        description: "A broader hub for clients comparing North West towns, estates, and Hartbeespoort salon access.",
    },
];

const areaFaqs = [
    {
        question: "Where is Galeo Beauty located?",
        answer: `Galeo Beauty is based at ${businessInfo.address.street}, ${businessInfo.address.area}. We are a Hartbeespoort salon and welcome clients from surrounding estates, North West towns, Pretoria, Centurion, Johannesburg, and wider Gauteng.`,
    },
    {
        question: "Can I book if I live outside Hartbeespoort?",
        answer: "Yes. Many clients travel to Galeo Beauty from nearby suburbs, estates, Gauteng metros, and North West towns. If you are planning around travel time, contact us and we can help you choose a practical booking slot.",
    },
    {
        question: "Which areas are closest to the salon?",
        answer: "Hartbeespoort, Harties, Landsmeer, Melodie, Ifafi, Schoemansville, Meerhof, Pecanwood, The Islands Estate, and Brits are among the closest or most common local areas.",
    },
    {
        question: "Do you serve clients from Pretoria, Centurion, and Johannesburg?",
        answer: "Yes. Pretoria, Centurion, and Johannesburg clients often use our location pages to compare travel context, popular treatments, and whether a Hartbeespoort salon visit suits the appointment they want to book.",
    },
];

export const metadata: Metadata = {
    title: "Areas We Serve | Beauty Salon Services Across Hartbeespoort, Gauteng & North West",
    description: `Galeo Beauty serves ${serviceAreaCount} locations across Hartbeespoort, Gauteng, North West, and surrounding areas. Explore local beauty hubs, provincial coverage, and premium treatments near you.`,
    keywords: buildLocationsIndexKeywords(),
    alternates: {
        canonical: "https://www.galeobeauty.com/locations",
    },
    openGraph: {
        title: "Areas We Serve | Beauty Salon Services Across Hartbeespoort, Gauteng & North West",
        description:
            `Find Galeo Beauty services across ${serviceAreaCount} locations in Hartbeespoort, Gauteng, North West, and surrounding areas.`,
        url: "https://www.galeobeauty.com/locations",
        type: "website",
    },
};

export default function LocationsIndexPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: areaFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
                <section className="border-b border-border/60 bg-white pt-24 sm:pt-28 lg:pt-32">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="overflow-hidden border-x border-border/60">
                            <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]">
                                <CloudinaryImage
                                    src="/images/interior/galeo-beauty-interior-p1.jpg"
                                    alt="Galeo Beauty salon interior in Hartbeespoort"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="100vw"
                                    noSpinner
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.08),rgba(10,8,6,0.32))]" />
                            </div>
                        </div>

                        <div className="mx-auto max-w-4xl py-10 text-center sm:py-12 lg:py-14">
                            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gold">
                                Galeo Beauty Service Areas
                            </p>
                            <h1 className="font-sans text-[2.5rem] font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                                Areas We Serve
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                                Explore our national, provincial, and local beauty coverage. Based in Hartbeespoort, we welcome clients from across Gauteng, North West, and surrounding areas.
                            </p>

                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <Button asChild size="lg" className="rounded-none bg-gold px-8 text-white hover:bg-gold-dark">
                                    <Link href="/contact">Contact Galeo Beauty</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="rounded-none px-8">
                                    <Link href="/services">View Services</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-background py-14">
                    <div className="container mx-auto max-w-5xl px-6">
                        <div className="border border-border bg-white p-6 sm:p-8 lg:p-10">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                Beauty Services From Hartbeespoort
                            </h2>
                            <div className="mt-6 grid gap-6 text-sm leading-7 text-muted-foreground md:grid-cols-3">
                                <p>
                                    Galeo Beauty is based in Hartbeespoort, making this page a guide for clients comparing
                                    whether our salon is practical for their area, route, and appointment plans.
                                </p>
                                <p>
                                    Use the location links below to find area-specific pages for nearby estates, North West
                                    towns, Pretoria, Centurion, Johannesburg, and wider Gauteng search intent.
                                </p>
                                <p>
                                    Each area page points you toward relevant services, travel context, nearby places, and
                                    booking options without making you search through the whole site first.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-y border-border/60 bg-stone-50/70 py-14">
                    <div className="container mx-auto max-w-5xl px-6">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                Most Popular Service Areas
                            </h2>
                            <p className="mt-3 text-base leading-8 text-muted-foreground">
                                Start with the areas clients most often use when planning a Galeo Beauty appointment.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {featuredAreas.map((area) => (
                                <Link
                                    key={area.slug}
                                    href={`/locations/${area.slug}`}
                                    className="group border border-border bg-white p-5 shadow-[0_18px_50px_-42px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="font-sans text-lg font-semibold text-foreground transition-colors group-hover:text-gold">
                                            {area.name}
                                        </h3>
                                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-gold" />
                                    </div>
                                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-background py-14">
                    <div className="container mx-auto max-w-5xl px-6">
                        <div className="grid gap-6 border border-border bg-white p-6 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:p-10">
                            <div>
                                <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                    Our Salon Location
                                </h2>
                                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                                    Galeo Beauty is located in Hartbeespoort at Landsmeer. Clients often plan appointments
                                    around regular maintenance, special events, weekends away, or a calmer beauty visit
                                    outside busier city salon routes.
                                </p>
                            </div>
                            <div className="space-y-4 border border-border bg-secondary/10 p-5">
                                <div className="flex gap-3">
                                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                                    <div className="text-sm leading-7 text-muted-foreground">
                                        <p className="font-semibold text-foreground">{businessInfo.address.street}</p>
                                        <p>{businessInfo.address.area}</p>
                                        <p>{businessInfo.address.city}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 border-t border-border pt-4">
                                    <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" />
                                    <div className="text-sm leading-7 text-muted-foreground">
                                        <p>{businessInfo.hours.weekday}</p>
                                        <p>{businessInfo.hours.saturday}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Locations Grid */}
                <section className="border-y border-border/60 bg-stone-50/70 py-16 lg:py-20">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="mx-auto mb-10 max-w-3xl text-center">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                Browse All Areas We Serve
                            </h2>
                            <p className="mt-3 text-base leading-8 text-muted-foreground">
                                Choose your area to see local service information, nearby places, and relevant treatment links.
                            </p>
                        </div>
                        <div className="space-y-14">
                            {locationGroups.map((group, idx) => (
                                <div key={idx}>
                                    <h2 className="mb-6 border-b border-border pb-3 font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem]">
                                        {group.title}
                                    </h2>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {group.locations.map((location) => (
                                            <Link
                                                key={location.slug}
                                                href={`/locations/${location.slug}`}
                                                className="group flex items-center gap-2 border border-border bg-white px-4 py-3 transition-all duration-200 hover:border-gold/50 hover:bg-gold/5"
                                            >
                                                <span className="text-sm font-medium text-foreground group-hover:text-gold transition-colors truncate flex-1">
                                                    {location.name}
                                                </span>
                                                {"badge" in location && location.badge && (
                                                    <span className="shrink-0 bg-gold/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                                                        {location.badge}
                                                    </span>
                                                )}
                                                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-gold transition-colors shrink-0" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-background px-6 py-16">
                    <div className="container mx-auto max-w-4xl">
                        <div className="mx-auto mb-10 max-w-3xl text-center">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-foreground sm:text-[2rem] lg:text-[2.25rem]">
                                Areas We Serve FAQs
                            </h2>
                            <p className="mt-3 text-base leading-8 text-muted-foreground">
                                Quick answers for clients deciding whether Galeo Beauty is practical for their area.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {areaFaqs.map((faq) => (
                                <article key={faq.question} className="border border-border bg-white p-6">
                                    <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-stone-50/70 px-6 py-14">
                    <div className="container mx-auto max-w-4xl">
                        <div className="border border-[#2b2b2f] bg-[#171719] px-6 py-10 text-center text-white shadow-[0_30px_90px_-45px_rgba(0,0,0,0.65)] sm:px-10">
                            <h2 className="font-sans text-[1.45rem] font-bold uppercase tracking-[0.08em] text-white sm:text-[2rem] lg:text-[2.25rem]">
                                Don&apos;t see your area?
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/70">
                                We welcome clients from all areas. Contact us to book your appointment.
                            </p>
                            <Button asChild size="lg" className="mt-7 rounded-none bg-gold px-8 text-white hover:bg-gold-dark">
                                <Link href="/contact">
                                    Get in Touch
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
