import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { NearbyLocationsSection } from "@/components/sections/NearbyLocationsSection";
import { Heart, CheckCircle, Sparkles, Award, Clock, Shield } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bridal Beauty Packages Hartbeespoort | Wedding Hair & Makeup",
    description: "Look flawless on your big day! Complete bridal beauty packages including makeup, hair styling, lash extensions, nails & trial sessions. Wedding day perfection in Hartbeespoort.",
    keywords: "bridal makeup hartbeespoort, wedding beauty packages, bridal hair and makeup, wedding day salon, bridal beauty services, bride makeup artist, wedding hair stylist",
    alternates: {
        canonical: "https://www.galeobeauty.com/bridal-beauty",
    },
    openGraph: {
        title: "Bridal Beauty Packages Hartbeespoort | Wedding Hair & Makeup",
        description: "Complete bridal beauty services. Professional makeup, hair styling, lashes, nails. Look stunning on your wedding day.",
        url: "https://www.galeobeauty.com/bridal-beauty",
        type: "website",
    },
};

export default function BridalBeautyPage() {
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
                                    Wedding Day Beauty
                                </span>
                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                                    Look <span className="italic text-gold">Breathtaking</span> on Your Special Day
                                </h1>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    Your wedding day deserves perfection. Our complete bridal beauty packages ensure you look and feel absolutely stunning from ceremony to last dance. Professional makeup, hair styling, lashes, and nails – all coordinated for flawless results.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                        <NavLink href="/booking">Book Bridal Consultation</NavLink>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <NavLink href="/gallery">View Gallery</NavLink>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200"
                                    alt="Bridal makeup and hair styling services"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Why Brides Choose Galeo Beauty
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Trusted by hundreds of brides for wedding day perfection
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Award,
                                    title: "Professional Expertise",
                                    description: "Certified makeup artists and hair stylists with years of bridal experience using premium Kryolan products."
                                },
                                {
                                    icon: Heart,
                                    title: "Trial Sessions Included",
                                    description: "Perfect your look before the big day with complimentary trial sessions to test makeup and hair."
                                },
                                {
                                    icon: Clock,
                                    title: "Stress-Free Experience",
                                    description: "Relax on your wedding morning. We handle all beauty needs on schedule, in-salon or on-location."
                                },
                                {
                                    icon: Sparkles,
                                    title: "Photography-Perfect",
                                    description: "Makeup and hair designed to look flawless in person and stunning in photos all day long."
                                },
                                {
                                    icon: Shield,
                                    title: "Long-Lasting Results",
                                    description: "Tear-proof, kiss-proof, dance-proof beauty that stays perfect from first look to final dance."
                                },
                                {
                                    icon: CheckCircle,
                                    title: "Complete Packages",
                                    description: "Everything you need: makeup, hair, lashes, nails, and even bridal party services available."
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

                {/* Bridal Packages */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Bridal Beauty Packages
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Customizable packages for every bride's dream
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Essential Bride */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="bg-secondary/10 p-6 text-center">
                                    <h3 className="font-serif text-2xl text-foreground mb-2">Essential Bride</h3>
                                    <p className="text-sm text-muted-foreground">Perfect for intimate weddings</p>
                                </div>
                                <div className="p-8">
                                    <div className="text-center mb-6">
                                        <span className="font-serif text-4xl text-gold">From R2,500</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Professional bridal makeup</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Wedding day hair styling</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Complimentary makeup trial</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Premium Kryolan products</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Touch-up kit provided</span>
                                        </li>
                                    </ul>
                                    <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                        <NavLink href="/booking">Book Consultation</NavLink>
                                    </Button>
                                </div>
                            </div>

                            {/* Glamour Bride */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-2 border-gold">
                                <div className="bg-gold text-black p-6 text-center">
                                    <div className="inline-block bg-black text-gold px-3 py-1 rounded-full text-xs font-bold mb-2">
                                        MOST POPULAR
                                    </div>
                                    <h3 className="font-serif text-2xl mb-2">Glamour Bride</h3>
                                    <p className="text-sm">Complete bridal experience</p>
                                </div>
                                <div className="p-8">
                                    <div className="text-center mb-6">
                                        <span className="font-serif text-4xl text-gold">From R4,200</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Everything in Essential, plus:</strong></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Full set lash extensions</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Gel manicure & pedicure</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Hair trial session included</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Airbrush makeup option</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Bridal skincare facial pre-wedding</span>
                                        </li>
                                    </ul>
                                    <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                        <NavLink href="/booking">Book Consultation</NavLink>
                                    </Button>
                                </div>
                            </div>

                            {/* Luxury Bride */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="bg-gradient-to-br from-gold/20 to-gold/10 p-6 text-center">
                                    <h3 className="font-serif text-2xl text-foreground mb-2">Luxury Bride</h3>
                                    <p className="text-sm text-muted-foreground">Ultimate wedding day pampering</p>
                                </div>
                                <div className="p-8">
                                    <div className="text-center mb-6">
                                        <span className="font-serif text-4xl text-gold">From R6,500</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground"><strong>Everything in Glamour, plus:</strong></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">On-location service available</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">2 bridesmaids makeup & hair</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Professional skincare series (3 sessions)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Relaxing massage before wedding</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Emergency beauty kit for venue</span>
                                        </li>
                                    </ul>
                                    <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                        <NavLink href="/booking">Book Consultation</NavLink>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <p className="text-muted-foreground mb-4">
                                <strong>Bridal Party Services Available:</strong> Add makeup and hair for bridesmaids, mother of the bride, and flower girls
                            </p>
                            <p className="text-sm text-muted-foreground">
                                All packages are customizable. Contact us to design your perfect bridal beauty experience.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services Included */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Complete Bridal Beauty Services
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                                    <Sparkles className="w-10 h-10 text-gold" />
                                </div>
                                <h3 className="font-serif text-xl text-foreground mb-2">Bridal Makeup</h3>
                                <p className="text-sm text-muted-foreground">
                                    Airbrush or traditional application. Flawless, photo-ready finish that lasts all day and night.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                                    <Sparkles className="w-10 h-10 text-gold" />
                                </div>
                                <h3 className="font-serif text-xl text-foreground mb-2">Hair Styling</h3>
                                <p className="text-sm text-muted-foreground">
                                    Elegant updos, flowing curls, or sleek styles. Secured to last through vows and dancing.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                                    <Sparkles className="w-10 h-10 text-gold" />
                                </div>
                                <h3 className="font-serif text-xl text-foreground mb-2">Lash Extensions</h3>
                                <p className="text-sm text-muted-foreground">
                                    Natural or dramatic volume lashes. Wake up wedding-ready with no mascara needed.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                                    <Sparkles className="w-10 h-10 text-gold" />
                                </div>
                                <h3 className="font-serif text-xl text-foreground mb-2">Nail Services</h3>
                                <p className="text-sm text-muted-foreground">
                                    Chip-free gel manicure and pedicure. Perfect nails for ring photos and beyond.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Your Bridal Beauty Timeline
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Plan ahead for wedding day perfection
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-8">
                                {[
                                    {
                                        time: "3-6 Months Before",
                                        title: "Book Your Bridal Consultation",
                                        description: "Secure your date, discuss your vision, and plan your beauty schedule. Early booking ensures availability."
                                    },
                                    {
                                        time: "2-3 Months Before",
                                        title: "Start Skincare Treatments",
                                        description: "Begin professional facials, chemical peels, or microneedling for glowing skin. Allow time for treatments to work."
                                    },
                                    {
                                        time: "4-6 Weeks Before",
                                        title: "Makeup & Hair Trial",
                                        description: "Test your complete look. Make adjustments, try different styles, and perfect every detail."
                                    },
                                    {
                                        time: "2 Weeks Before",
                                        title: "Lash Extensions & Final Facial",
                                        description: "Apply lash extensions, final facial treatment, and any brow shaping or tinting."
                                    },
                                    {
                                        time: "1 Week Before",
                                        title: "Nails & Relaxation",
                                        description: "Gel manicure and pedicure. Optional massage for stress relief before the big day."
                                    },
                                    {
                                        time: "Wedding Day",
                                        title: "Final Makeup & Hair",
                                        description: "Arrive 3-4 hours before ceremony. Relax while we create your perfect bridal look."
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-6 items-start">
                                        <div className="flex-shrink-0 w-32 text-right">
                                            <span className="text-gold font-bold text-sm">{item.time}</span>
                                        </div>
                                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gold mt-1" />
                                        <div className="flex-1">
                                            <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Bridal Beauty Questions
                            </h2>
                        </div>
                        <div className="space-y-6">
                            {[
                                {
                                    q: "When should I book my bridal beauty services?",
                                    a: "Book as soon as you have your wedding date! Popular dates (Saturday weddings, December, peak summer) fill up 6-12 months in advance. Early booking ensures availability and gives you plenty of time for trials and pre-wedding treatments."
                                },
                                {
                                    q: "What's included in the makeup trial?",
                                    a: "Your trial is a full bridal makeup application where we test products, colors, and techniques. Bring inspiration photos, your dress color details, and accessories. We'll perfect your look and document it with photos for recreation on your wedding day."
                                },
                                {
                                    q: "Do you offer on-location services?",
                                    a: "Yes! We can come to your venue, hotel, or home for wedding morning services. On-location availability depends on date, distance, and number of people. Travel fees apply for locations outside Hartbeespoort."
                                },
                                {
                                    q: "How long does bridal makeup and hair take?",
                                    a: "Plan for 2-3 hours for the bride (60-90 min makeup, 60-90 min hair). Each bridesmaid needs approximately 90 minutes. We'll create a detailed timeline during consultation to ensure everyone is ready on schedule."
                                },
                                {
                                    q: "What products do you use for bridal makeup?",
                                    a: "We use professional-grade Kryolan products designed for photography and all-day wear. Products are tear-proof, kiss-proof, and humidity-resistant. We can accommodate sensitivities and can use your products if preferred."
                                },
                                {
                                    q: "Can you accommodate my bridal party?",
                                    a: "Absolutely! We offer bridesmaid packages for makeup and hair. Depending on party size, we may bring additional stylists. Book early for large parties (6+ people) to ensure adequate time and staff."
                                }
                            ].map((faq, index) => (
                                <div key={index} className="bg-secondary/5 p-6 rounded-xl">
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
                        <Heart className="w-16 h-16 text-gold mx-auto mb-6" />
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                            Ready to Look Stunning on Your Wedding Day?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Book your complimentary bridal consultation to discuss packages, trial dates, and create your perfect wedding day beauty plan.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                <NavLink href="/booking">Book Bridal Consultation</NavLink>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <NavLink href="/contact">Ask Questions</NavLink>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Related */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="font-serif text-3xl text-center text-foreground mb-12">
                            Pre-Wedding Beauty Treatments
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <NavLink href="/services/dermalogica-facial" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Facials</h3>
                                <p className="text-sm text-muted-foreground">Pre-wedding glow</p>
                            </NavLink>
                            <NavLink href="/services/lash-extensions" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Lash Extensions</h3>
                                <p className="text-sm text-muted-foreground">Full, dramatic lashes</p>
                            </NavLink>
                            <NavLink href="/permanent-makeup" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Permanent Makeup</h3>
                                <p className="text-sm text-muted-foreground">Microblading & brows</p>
                            </NavLink>
                            <NavLink href="/anti-aging" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Anti-Aging</h3>
                                <p className="text-sm text-muted-foreground">Look your best</p>
                            </NavLink>
                        </div>
                    </div>
                </section>

                {/* Nearby Locations - Internal Linking for SEO */}
                <NearbyLocationsSection serviceName="Bridal Beauty Packages" />
            </main>
            <Footer />
        </>
    );
}
