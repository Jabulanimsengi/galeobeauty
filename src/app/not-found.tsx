import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <>
            <Header />
            <main className="bg-background min-h-[80vh] flex items-center justify-center">
                <section className="container mx-auto px-6 py-20 text-center">
                    <span className="text-gold font-bold text-6xl block mb-4">404</span>
                    <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
                        Page Not Found
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-10">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground rounded-full px-8">
                            <Link href="/">
                                Return Home
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                            <Link href="/prices">
                                View Services
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" size="lg" className="rounded-full px-8">
                            <Link href="/contact">
                                Contact Us
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
