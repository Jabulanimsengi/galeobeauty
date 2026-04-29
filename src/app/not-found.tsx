import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { ArrowRight } from "lucide-react";

const quickLinks = [
    { label: "View Services", href: "/services" },
    { label: "View Gallery", href: "/gallery" },
    { label: "View Specials", href: "/specials" },
    { label: "Return Home", href: "/" },
];

export default function NotFound() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-background">
                <section className="border-b border-border/60 bg-white pt-24 sm:pt-28 lg:pt-32">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="overflow-hidden border-x border-border/60">
                            <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[460px]">
                                <CloudinaryImage
                                    src="/images/interior/galeo-beauty-interior-p1.jpg"
                                    alt="Galeo Beauty salon interior"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="100vw"
                                    noSpinner
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.08),rgba(10,8,6,0.34))]" />
                            </div>
                        </div>

                        <div className="mx-auto max-w-4xl py-10 text-center sm:py-12 lg:py-14">
                            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gold">
                                404
                            </p>
                            <h1 className="font-sans text-[2.5rem] font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                                Page Not Found
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                The page you are looking for is unavailable. Continue browsing Galeo Beauty or head back to the services page.
                            </p>

                            <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                                {quickLinks.map((link, index) => (
                                    <Button
                                        key={link.href}
                                        asChild
                                        size="lg"
                                        variant={index === 0 ? "default" : "outline"}
                                        className={index === 0
                                            ? "w-full rounded-none bg-foreground px-8 text-white hover:bg-gold hover:text-white"
                                            : "w-full rounded-none px-8"}
                                    >
                                        <Link href={link.href}>
                                            {link.label}
                                            {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
