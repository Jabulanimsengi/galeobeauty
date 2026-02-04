import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { Sparkles, CheckCircle, Shield, Award, Heart, Zap } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Anti-Aging Treatments Hartbeespoort | Non-Surgical Facial Rejuvenation",
    description: "Turn back the clock with advanced anti-aging treatments. Botox alternatives, dermal fillers, liquid facelifts & collagen stimulators. Medical-grade skincare at Galeo Beauty.",
    keywords: "anti-aging treatments hartbeespoort, botox alternative south africa, non-surgical facelift, liquid facelift, collagen stimulator, wrinkle reduction, facial rejuvenation, dermal fillers",
    alternates: {
        canonical: "https://www.galeobeauty.com/anti-aging",
    },
    openGraph: {
        title: "Anti-Aging Treatments Hartbeespoort | Non-Surgical Rejuvenation",
        description: "Advanced anti-aging solutions. Botox alternatives, dermal fillers, collagen stimulators. Medical-grade results.",
        url: "https://www.galeobeauty.com/anti-aging",
        type: "website",
    },
};

export default function AntiAgingPage() {
    return (
        <>
            <Header />
            <main className="bg-background">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden bg-gradient-to-br from-background via-gold/5 to-background">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gold/5 -z-10 skew-x-12" />
                    <div className="container mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 block">
                                    Medical-Grade Anti-Aging
                                </span>
                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                                    Turn Back Time with <span className="italic text-gold">Advanced Rejuvenation</span>
                                </h1>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    Erase years without surgery. Our medical-grade anti-aging treatments combine innovative injectables, collagen stimulators, and professional skincare for natural, youthful results that last.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                        <NavLink href="/booking">Book Consultation</NavLink>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <NavLink href="/prices">View All Treatments</NavLink>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/services/Hart_Aesthetics/Hart_Aesthetics_image_02.jpeg"
                                    alt="Anti-aging facial rejuvenation treatment"
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
                                Why Choose Our Anti-Aging Treatments?
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Medical expertise meets aesthetic artistry for safe, beautiful results
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Shield,
                                    title: "Medical-Grade Results",
                                    description: "Professional aesthetic treatments performed by certified practitioners using premium products."
                                },
                                {
                                    icon: Sparkles,
                                    title: "Natural-Looking",
                                    description: "Subtle enhancements that refresh and rejuvenate without looking 'done'."
                                },
                                {
                                    icon: Zap,
                                    title: "No Surgery Required",
                                    description: "Achieve facelift-like results without going under the knife."
                                },
                                {
                                    icon: Award,
                                    title: "Proven Technology",
                                    description: "FDA & CE-approved treatments backed by clinical research."
                                },
                                {
                                    icon: Heart,
                                    title: "Minimal Downtime",
                                    description: "Most treatments take 30-60 minutes with little to no recovery time."
                                },
                                {
                                    icon: CheckCircle,
                                    title: "Long-Lasting Effects",
                                    description: "Results that last months to years depending on treatment type."
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

                {/* Treatment Options */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Our Anti-Aging Treatment Menu
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Customized solutions for every age and concern
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Hart Aesthetics Injectables */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="relative h-64">
                                    <Image
                                        src="/images/services/Hart_Aesthetics/Hart_Aesthetics_image_01.jpeg"
                                        alt="Botox alternative and dermal fillers"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-gold text-black px-4 py-2 rounded-full font-bold text-sm">
                                        Premium
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-serif text-2xl text-foreground mb-4">
                                        Hart Aesthetics Injectable Treatments
                                    </h3>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        Premium anti-wrinkle injectables and dermal fillers for natural facial rejuvenation. From Nefertiti neck lifts to liquid facelifts, our certified practitioners deliver artistic, natural-looking results.
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Tox Treatments:</strong> Smooth wrinkles & fine lines</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Dermal Fillers:</strong> Restore volume & contour</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Liquid Facelift:</strong> Non-surgical face lifting</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Nefertiti Lift:</strong> Jawline & neck definition</span>
                                        </li>
                                    </ul>
                                    <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                        <NavLink href="/prices#hart-aesthetics">View Pricing</NavLink>
                                    </Button>
                                </div>
                            </div>

                            {/* Collagen Stimulators */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="relative h-64">
                                    <Image
                                        src="/images/services/Hart_Aesthetics/Hart_Aesthetics_image_03.jpeg"
                                        alt="Collagen biostimulator treatment"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-gold text-black px-4 py-2 rounded-full font-bold text-sm">
                                        Advanced
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-serif text-2xl text-foreground mb-4">
                                        Collagen Biostimulators
                                    </h3>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        Stimulate your skin's natural collagen production for gradual, natural-looking rejuvenation that improves over time. The ultimate anti-aging solution that works with your body's biology.
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Rebuilds skin's collagen scaffold</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Results improve over months</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Natural, gradual rejuvenation</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Lasts up to 2 years</span>
                                        </li>
                                    </ul>
                                    <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                        <NavLink href="/prices#hart-aesthetics">Learn More</NavLink>
                                    </Button>
                                </div>
                            </div>

                            {/* Advanced Dermalogica */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="relative h-64">
                                    <Image
                                        src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200"
                                        alt="Professional anti-aging facial treatment"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-gold text-black px-4 py-2 rounded-full font-bold text-sm">
                                        Professional
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-serif text-2xl text-foreground mb-4">
                                        Dermalogica Pro Anti-Aging Facials
                                    </h3>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        Professional-grade skincare treatments targeting fine lines, wrinkles, loss of firmness, and age spots. Clinical results you can see and feel.
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Age Smart Facial:</strong> Anti-aging powerhouse</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Pro Firm Treatment:</strong> Lift & tighten</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Neurosculpt:</strong> Facial muscle stimulation</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Pro Power Peel:</strong> Resurface & renew</span>
                                        </li>
                                    </ul>
                                    <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                        <NavLink href="/prices#dermalogica">View Options</NavLink>
                                    </Button>
                                </div>
                            </div>

                            {/* Medical Treatments */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="relative h-64">
                                    <Image
                                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200"
                                        alt="Medical-grade laser treatments"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-gold text-black px-4 py-2 rounded-full font-bold text-sm">
                                        Medical
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-serif text-2xl text-foreground mb-4">
                                        Medical-Grade Laser Treatments
                                    </h3>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        Advanced laser and plasma technologies for serious anti-aging results. Clinical-strength treatments for wrinkles, sun damage, and skin texture.
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Fractional Laser:</strong> Resurface full face</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Plasmage:</strong> Skin tightening technology</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Microneedling:</strong> Collagen induction</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Treats wrinkles, scars, sun damage</span>
                                        </li>
                                    </ul>
                                    <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                        <NavLink href="/prices#medical">Explore Treatments</NavLink>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Compare: Surgery vs Non-Surgical */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Why Choose Non-Surgical Anti-Aging?
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Compare surgical facelift to our non-surgical alternatives
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-red-50 p-8 rounded-xl">
                                    <h3 className="font-serif text-2xl text-foreground mb-6">Surgical Facelift</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 text-xl">✗</span>
                                            <span className="text-muted-foreground">Invasive surgery with risks</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 text-xl">✗</span>
                                            <span className="text-muted-foreground">Weeks of recovery downtime</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 text-xl">✗</span>
                                            <span className="text-muted-foreground">R150,000+ cost</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 text-xl">✗</span>
                                            <span className="text-muted-foreground">Permanent scarring</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 text-xl">✗</span>
                                            <span className="text-muted-foreground">General anesthesia required</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gold/10 p-8 rounded-xl border-2 border-gold">
                                    <h3 className="font-serif text-2xl text-foreground mb-6">Our Non-Surgical Treatments</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Non-invasive, needle-based only</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Walk in, walk out same day</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Fraction of the cost</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">No scars, natural results</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Local numbing only</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Common Questions About Anti-Aging
                            </h2>
                        </div>
                        <div className="space-y-6">
                            {[
                                {
                                    q: "What's the best anti-aging treatment for me?",
                                    a: "The best treatment depends on your age, concerns, and goals. Injectables are ideal for dynamic wrinkles, fillers restore volume, collagen stimulators provide overall rejuvenation, and facials maintain results. We'll create a personalized plan during your consultation."
                                },
                                {
                                    q: "When should I start anti-aging treatments?",
                                    a: "Prevention is easier than correction! Many people start in their late 20s or early 30s with preventative injectables and professional facials. It's never too late to start - we have effective treatments for all ages."
                                },
                                {
                                    q: "Are anti-wrinkle injectables safe?",
                                    a: "Yes! When performed by certified practitioners, anti-wrinkle injectables have an excellent safety profile. They've been used for decades with millions of treatments worldwide. All products we use are approved and sourced from reputable suppliers."
                                },
                                {
                                    q: "How long do results last?",
                                    a: "Results vary by treatment: Anti-wrinkle injectables last 3-4 months, dermal fillers 6-18 months, collagen stimulators up to 2 years, and professional facials provide cumulative benefits with regular maintenance."
                                },
                                {
                                    q: "Will I look 'frozen' or 'overdone'?",
                                    a: "No! Our philosophy is natural enhancement. We aim for refreshed, rested results - not an overdone appearance. You'll still look like yourself, just rejuvenated."
                                },
                                {
                                    q: "What's the difference between fillers and anti-wrinkle injections?",
                                    a: "Anti-wrinkle injections relax muscles that cause dynamic wrinkles (crow's feet, frown lines). Dermal fillers add volume to restore fullness in cheeks, lips, and under-eye areas. Often, combining both provides the best results."
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

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-gold/10 via-secondary/5 to-gold/5">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                            Ready to Turn Back the Clock?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Book your complimentary consultation to discover which anti-aging treatments will help you achieve your aesthetic goals.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                <NavLink href="/booking">Book Free Consultation</NavLink>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <NavLink href="/contact">Ask a Question</NavLink>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Related Treatments */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="font-serif text-3xl text-center text-foreground mb-12">
                            Complete Your Transformation
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <NavLink href="/body-contouring" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Body Contouring</h3>
                                <p className="text-sm text-muted-foreground">Fat freezing & EMS</p>
                            </NavLink>
                            <NavLink href="/services/ipl-hair-removal" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Permanent Hair Removal</h3>
                                <p className="text-sm text-muted-foreground">IPL laser technology</p>
                            </NavLink>
                            <NavLink href="/services/microblading" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Permanent Makeup</h3>
                                <p className="text-sm text-muted-foreground">Brows, lips, eyeliner</p>
                            </NavLink>
                            <NavLink href="/specials" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Current Specials</h3>
                                <p className="text-sm text-muted-foreground">Save on treatments</p>
                            </NavLink>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
