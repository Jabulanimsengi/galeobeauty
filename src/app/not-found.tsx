import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";

const quickLinks = [
    { label: "View Services", href: "/prices" },
    { label: "View Gallery", href: "/gallery" },
    { label: "View Specials", href: "/specials" },
    { label: "Return Home", href: "/" },
];

export default function NotFound() {
    return (
        <>
            <Header />
            <main className="min-h-[70vh] bg-[linear-gradient(180deg,#fbf8f2_0%,#ffffff_100%)]">
                <section className="container mx-auto px-6 py-20 sm:py-28">
                    <div className="mx-auto flex max-w-3xl flex-col items-center rounded-[2rem] border border-black/5 bg-white px-8 py-14 text-center shadow-[0_24px_64px_rgba(17,17,17,0.06)] sm:px-12">
                        <span className="mb-5 inline-flex rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                            404
                        </span>
                        <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
                            Page Not Found
                        </h1>
                        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                            The page you are looking for is unavailable. Continue browsing Galeo Beauty using one of the links below.
                        </p>

                        <div className="mt-10 flex w-full max-w-2xl flex-col gap-3 sm:grid sm:grid-cols-2">
                            {quickLinks.map((link, index) => (
                                <Button
                                    key={link.href}
                                    asChild
                                    size="lg"
                                    variant={index === 0 ? "default" : "outline"}
                                    className={index === 0
                                        ? "rounded-full bg-gold px-8 text-foreground hover:bg-gold-dark"
                                        : "rounded-full px-8"}
                                >
                                    <Link href={link.href}>{link.label}</Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
