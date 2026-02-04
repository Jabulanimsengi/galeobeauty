import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { CheckCircle, Clock, Award, Shield, Palette, Eye } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Permanent Makeup Hartbeespoort | Microblading, Powder Brows & Lip Blush",
    description: "Wake up with perfect makeup! Certified permanent makeup artist offering microblading, powder brows, hybrid brows, permanent eyeliner & lip blush in Hartbeespoort.",
    keywords: "permanent makeup hartbeespoort, semi-permanent makeup south africa, microblading, powder brows, eyebrow tattoo, permanent eyeliner, cosmetic tattooing, ombre brows, lip blush",
    alternates: {
        canonical: "https://www.galeobeauty.com/permanent-makeup",
    },
    openGraph: {
        title: "Permanent Makeup Hartbeespoort | Microblading & Powder Brows",
        description: "Professional semi-permanent makeup. Microblading, powder brows, lip blush, permanent eyeliner. Wake up beautiful daily.",
        url: "https://www.galeobeauty.com/permanent-makeup",
        type: "website",
    },
};

export default function PermanentMakeupPage() {
    return (
        <>
            <Header />
            <main className="bg-background">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden bg-gradient-to-br from-background via-secondary/5 to-background">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-secondary/10 -z-10 skew-x-12" />
                    <div className="container mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 block">
                                    Semi-Permanent Beauty
                                </span>
                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                                    Wake Up <span className="italic text-gold">Beautiful</span> Every Day
                                </h1>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    Save hours of makeup application with professional permanent makeup. From flawless brows to defined eyes and tinted lips, our certified cosmetic tattoo artist creates natural, long-lasting results.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                        <NavLink href="/booking">Book Consultation</NavLink>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <NavLink href="/prices#permanent-makeup">View Pricing</NavLink>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200"
                                    alt="Professional permanent makeup microblading"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Benefits */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Why Choose Permanent Makeup?
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                The ultimate solution for effortless, flawless beauty
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Clock,
                                    title: "Save Time Daily",
                                    description: "Skip the morning makeup routine. Wake up with perfect brows, eyeliner, and lips ready to go."
                                },
                                {
                                    icon: Award,
                                    title: "Always Picture-Perfect",
                                    description: "Smudge-proof, waterproof, gym-proof. Your makeup stays flawless 24/7 in any situation."
                                },
                                {
                                    icon: Shield,
                                    title: "Safe & Certified",
                                    description: "Performed by certified permanent makeup artists using sterile, single-use equipment and premium pigments."
                                },
                                {
                                    icon: Palette,
                                    title: "Natural-Looking Results",
                                    description: "Customized to your face shape, skin tone, and personal style. Subtle enhancement, not overdone."
                                },
                                {
                                    icon: CheckCircle,
                                    title: "Long-Lasting Beauty",
                                    description: "Results last 1-3 years depending on technique. Touch-ups maintain perfect appearance."
                                },
                                {
                                    icon: Eye,
                                    title: "Perfect Symmetry",
                                    description: "Achieve balanced, symmetrical features that are impossible with hand-drawn makeup."
                                }
                            ].map((benefit, index) => (
                                <div key={index} className="bg-background p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                                    <benefit.icon className="w-12 h-12 text-gold mb-4" />
                                    <h3 className="font-serif text-xl text-foreground mb-3">{benefit.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Our Permanent Makeup Services
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Expert techniques for brows, eyes, and lips
                            </p>
                        </div>

                        {/* Eyebrows */}
                        <div className="mb-20">
                            <h3 className="font-serif text-2xl text-center text-foreground mb-12">Eyebrow Treatments</h3>
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="relative h-56">
                                        <Image
                                            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200"
                                            alt="Microblading hair-stroke brows"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-serif text-xl text-foreground mb-3">Microblading</h4>
                                        <p className="text-muted-foreground mb-4 leading-relaxed">
                                            Hair-stroke technique creating ultra-natural brows. Perfect for filling sparse areas or creating entirely new brows. Lasts 12-18 months.
                                        </p>
                                        <ul className="space-y-2 mb-4">
                                            <li className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Natural hair-like strokes</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Ideal for all skin types</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Includes touch-up session</span>
                                            </li>
                                        </ul>
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="font-serif text-2xl text-gold">R1,350</span>
                                        </div>
                                        <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                            <NavLink href="/services/microblading">Learn More</NavLink>
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="relative h-56">
                                        <Image
                                            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200"
                                            alt="Powder brows ombre effect"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1 rounded-full font-bold text-xs">
                                            Popular
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-serif text-xl text-foreground mb-3">Powder Pixel Brows</h4>
                                        <p className="text-muted-foreground mb-4 leading-relaxed">
                                            Soft, powdery brow effect mimicking filled-in makeup. Perfect for oily skin. Lasts 2-3 years with proper care.
                                        </p>
                                        <ul className="space-y-2 mb-4">
                                            <li className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Soft powder/ombre effect</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Best for oily skin types</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Longer-lasting results</span>
                                            </li>
                                        </ul>
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="font-serif text-2xl text-gold">R1,710</span>
                                        </div>
                                        <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                            <NavLink href="/prices#permanent-makeup">Book Now</NavLink>
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="relative h-56">
                                        <Image
                                            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200"
                                            alt="Hybrid brows combination technique"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-serif text-xl text-foreground mb-3">Hybrid Brows</h4>
                                        <p className="text-muted-foreground mb-4 leading-relaxed">
                                            Best of both worlds! Combines microblading hair strokes with powder shading for full, defined, natural-looking brows.
                                        </p>
                                        <ul className="space-y-2 mb-4">
                                            <li className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Hair strokes + powder shading</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Maximum definition & fullness</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">All skin types</span>
                                            </li>
                                        </ul>
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="font-serif text-2xl text-gold">R1,710</span>
                                        </div>
                                        <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                            <NavLink href="/prices#permanent-makeup">Book Now</NavLink>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Eyes & Lips */}
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Eyeliner */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="font-serif text-2xl text-foreground mb-6">Permanent Eyeliner</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Wake up with perfectly defined eyes. From subtle lash enhancement to dramatic winged liner, we create waterproof eyeliner that never smudges.
                                </p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-foreground">Top Eyeliner:</strong>
                                            <span className="text-muted-foreground"> Lash line to winged options - R720</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-foreground">Bottom Eyeliner:</strong>
                                            <span className="text-muted-foreground"> Subtle lower lash definition - R720</span>
                                        </div>
                                    </li>
                                </ul>
                                <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                    <NavLink href="/prices#permanent-makeup">View Options</NavLink>
                                </Button>
                            </div>

                            {/* Lips */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="font-serif text-2xl text-foreground mb-6">Permanent Lip Color</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Fuller, more defined lips with natural-looking color. From subtle lip liner to full lip blush, achieve perfectly tinted lips that last.
                                </p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-foreground">Full Lip Blush:</strong>
                                            <span className="text-muted-foreground"> Complete lip color & contour - R2,430</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-foreground">Lip Liner:</strong>
                                            <span className="text-muted-foreground"> Define & enhance lip shape - R1,710</span>
                                        </div>
                                    </li>
                                </ul>
                                <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                    <NavLink href="/prices#permanent-makeup">View Options</NavLink>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                What to Expect: The Process
                            </h2>
                        </div>
                        <div className="max-w-4xl mx-auto space-y-8">
                            {[
                                {
                                    step: "1",
                                    title: "Consultation & Design",
                                    description: "We discuss your goals, measure facial features for symmetry, and custom-design your perfect shape and color. You'll see the design before any work begins."
                                },
                                {
                                    step: "2",
                                    title: "Numbing Application",
                                    description: "Professional topical numbing cream is applied for 20-30 minutes to ensure your comfort throughout the procedure."
                                },
                                {
                                    step: "3",
                                    title: "Pigment Application",
                                    description: "Using sterile, single-use equipment, we carefully apply pigment using the chosen technique. Most procedures take 1-2 hours."
                                },
                                {
                                    step: "4",
                                    title: "Healing Period",
                                    description: "Initial healing takes 7-14 days. Color appears darker initially and lightens to final result as skin heals."
                                },
                                {
                                    step: "5",
                                    title: "Touch-Up Session",
                                    description: "A perfecting touch-up session 6-8 weeks later ensures optimal color retention and perfect results."
                                }
                            ].map((item, index) => (
                                <div key={index} className="flex gap-6 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold text-black font-bold flex items-center justify-center text-xl">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Permanent Makeup Questions
                            </h2>
                        </div>
                        <div className="space-y-6">
                            {[
                                {
                                    q: "Does permanent makeup hurt?",
                                    a: "Most clients describe it as mildly uncomfortable rather than painful. We use professional numbing cream to minimize discomfort. Pain tolerance varies, but most find the procedure very tolerable."
                                },
                                {
                                    q: "How long does permanent makeup last?",
                                    a: "Microblading lasts 12-18 months, powder brows 2-3 years, eyeliner 2-3 years, and lip color 2-3 years. Longevity depends on skin type, lifestyle, and sun exposure. Touch-ups extend results."
                                },
                                {
                                    q: "Is permanent makeup actually permanent?",
                                    a: "It's semi-permanent. Unlike traditional tattoos, permanent makeup uses pigments designed to fade gradually over time. This allows for adjustments as your face changes and beauty trends evolve."
                                },
                                {
                                    q: "What's the healing process like?",
                                    a: "Initial healing takes 7-14 days. Expect some redness, slight swelling, and scabbing. Color appears darker initially and lightens 30-40% as you heal. Full healing takes 4-6 weeks."
                                },
                                {
                                    q: "Can I wear regular makeup over permanent makeup?",
                                    a: "Yes! Permanent makeup provides a base that you can enhance with regular makeup for special occasions or leave as-is for everyday wear."
                                },
                                {
                                    q: "Who should avoid permanent makeup?",
                                    a: "Pregnant or nursing women, those with certain medical conditions, keloid scarring, or taking blood thinners should avoid or postpone treatment. We'll review contraindications during consultation."
                                }
                            ].map((faq, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 className="font-serif text-xl text-foreground mb-3">{faq.q}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-to-br from-gold/10 via-secondary/5 to-gold/5">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                            Ready for Effortless Beauty?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Book your consultation to discuss which permanent makeup service is right for you.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                <NavLink href="/booking">Book Consultation</NavLink>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <NavLink href="/gallery">View Gallery</NavLink>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Related */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="font-serif text-3xl text-center text-foreground mb-12">
                            Complete Your Look
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <NavLink href="/services/lash-extensions" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Lash Extensions</h3>
                                <p className="text-sm text-muted-foreground">Volume & hybrid lashes</p>
                            </NavLink>
                            <NavLink href="/services/lip-fillers" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Lip Fillers</h3>
                                <p className="text-sm text-muted-foreground">Dermal filler enhancement</p>
                            </NavLink>
                            <NavLink href="/anti-aging" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Anti-Aging</h3>
                                <p className="text-sm text-muted-foreground">Injectables & facials</p>
                            </NavLink>
                            <NavLink href="/services/dermalogica-facial" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Facials</h3>
                                <p className="text-sm text-muted-foreground">Professional skincare</p>
                            </NavLink>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
