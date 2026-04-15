import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/lib/constants";

const quickLinks = [
    {
        title: "Browse Services",
        description: "Start from the full treatment menu and jump into the exact service you need.",
        href: "/prices",
    },
    {
        title: "Explore Locations",
        description: "See which pages are available for Hartbeespoort, Gauteng, and nearby areas.",
        href: "/locations",
    },
    {
        title: "Contact Galeo Beauty",
        description: "Reach the team if you want help finding the right treatment or booking page.",
        href: "/contact",
    },
    {
        title: "View Specials",
        description: "Check current offers if you were looking for a promotion or package deal.",
        href: "/specials",
    },
];

const nextSteps = [
    "Check the URL for spelling mistakes or outdated service names.",
    "Use the service and location hubs instead of trying to guess an old page path.",
    "Contact the salon if you want help finding the right treatment or booking option.",
];

export default function NotFound() {
    const whatsappHref = `https://wa.me/${businessInfo.socials.whatsapp}?text=${encodeURIComponent(
        "Hi Galeo Beauty, I landed on a page that could not be found and need help finding the right service or booking page."
    )}`;

    return (
        <>
            <Header />
            <main className="min-h-[80vh] bg-[radial-gradient(circle_at_top,rgba(184,149,85,0.18),transparent_38%),linear-gradient(180deg,#fbf8f2_0%,#ffffff_55%,#f5efe3_100%)]">
                <section className="container mx-auto px-6 py-16 sm:py-20">
                    <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-black/5 bg-white/90 shadow-[0_30px_80px_rgba(17,17,17,0.08)] backdrop-blur">
                        <div className="grid gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-14">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-gold">
                                        Error 404
                                    </span>
                                    <div className="space-y-4">
                                        <p className="font-serif text-6xl leading-none text-gold sm:text-7xl">Page Not Found</p>
                                        <h1 className="max-w-2xl font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                                            Let&apos;s get you back to the right treatment, location, or booking page.
                                        </h1>
                                        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                                            The page you requested is no longer available, may have moved, or may never have existed.
                                            The quickest recovery path is to start from the service hub, the locations hub, or contact the team directly.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button asChild size="lg" className="rounded-full bg-gold px-8 text-foreground hover:bg-gold-dark">
                                        <Link href="/prices">View Services</Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                                        <Link href="/locations">Browse Locations</Link>
                                    </Button>
                                    <Button asChild size="lg" variant="ghost" className="rounded-full px-8">
                                        <Link href="/">Return Home</Link>
                                    </Button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    {nextSteps.map((step, index) => (
                                        <div
                                            key={step}
                                            className="rounded-3xl border border-black/5 bg-stone-50/80 p-5"
                                        >
                                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                                                Step {index + 1}
                                            </p>
                                            <p className="text-sm leading-7 text-stone-700">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <aside className="space-y-5 rounded-[1.75rem] border border-black/5 bg-[#f8f3e8] p-6 sm:p-8">
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Need help fast?</p>
                                    <h2 className="font-serif text-3xl text-foreground">Speak to Galeo Beauty</h2>
                                    <p className="text-base leading-7 text-stone-700">
                                        If you were looking for a treatment, price, or booking page, the team can point you to the right destination quickly.
                                    </p>
                                </div>

                                <div className="space-y-3 rounded-3xl bg-white/90 p-5">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Direct help</p>
                                    <a className="block text-lg font-semibold text-foreground hover:text-gold" href={whatsappHref}>
                                        WhatsApp: {businessInfo.cell}
                                    </a>
                                    <a className="block text-base text-stone-700 hover:text-gold" href={`tel:${businessInfo.phone}`}>
                                        Call: {businessInfo.phone}
                                    </a>
                                    <a className="block text-base text-stone-700 hover:text-gold" href={`mailto:${businessInfo.email}`}>
                                        Email: {businessInfo.email}
                                    </a>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Popular recovery paths</p>
                                    <div className="grid gap-3">
                                        {quickLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className="rounded-3xl border border-black/5 bg-white/85 p-4 transition hover:-translate-y-0.5 hover:border-gold/35 hover:shadow-[0_18px_36px_rgba(17,17,17,0.08)]"
                                            >
                                                <p className="text-base font-semibold text-foreground">{link.title}</p>
                                                <p className="mt-1 text-sm leading-6 text-stone-600">{link.description}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
