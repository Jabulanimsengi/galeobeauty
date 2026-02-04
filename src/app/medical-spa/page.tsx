import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { Shield, Sparkles, Award, Heart, Zap, CheckCircle } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Medical Spa Hartbeespoort | Aesthetic Clinic & Advanced Treatments",
    description: "Premier medical spa offering advanced aesthetic treatments. Injectable fillers, laser treatments, body contouring, medical-grade facials & skin rejuvenation in Hartbeespoort.",
    keywords: "medical spa hartbeespoort, aesthetic clinic south africa, medical grade skincare, aesthetic procedures, medical aesthetics, skin tightening, laser treatments, medi-spa",
    alternates: {
        canonical: "https://www.galeobeauty.com/medical-spa",
    },
    openGraph: {
        title: "Medical Spa Hartbeespoort | Advanced Aesthetic Clinic",
        description: "Medical-grade beauty treatments. Injectable aesthetics, laser therapy, body sculpting. Clinical results.",
        url: "https://www.galeobeauty.com/medical-spa",
        type: "website",
    },
};

export default function MedicalSpaPage() {
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
                                    Medical-Grade Excellence
                                </span>
                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                                    Where <span className="italic text-gold">Medicine</span> Meets Beauty
                                </h1>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    Experience the pinnacle of aesthetic medicine. Our medical spa combines clinical expertise with luxury spa ambiance for safe, effective treatments that deliver transformative results.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                        <NavLink href="/booking">Book Consultation</NavLink>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <NavLink href="/prices">View All Services</NavLink>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200"
                                    alt="Medical spa aesthetic clinic treatments"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Medical Spa */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Why Choose a Medical Spa?
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Advanced treatments, clinical safety, and luxurious experience
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Shield,
                                    title: "Medical Oversight",
                                    description: "Certified practitioners perform treatments under medical protocols with highest safety standards."
                                },
                                {
                                    icon: Award,
                                    title: "Advanced Technology",
                                    description: "CE & FDA-approved equipment used in medical clinics worldwide for proven, clinical results."
                                },
                                {
                                    icon: Sparkles,
                                    title: "Comprehensive Solutions",
                                    description: "From injectables to laser therapy, all aesthetic needs under one roof."
                                },
                                {
                                    icon: Heart,
                                    title: "Personalized Approach",
                                    description: "Custom treatment plans based on your unique biology, goals, and concerns."
                                },
                                {
                                    icon: Zap,
                                    title: "Clinical Results",
                                    description: "Medical-grade treatments deliver measurable improvements backed by science."
                                },
                                {
                                    icon: CheckCircle,
                                    title: "Luxury Experience",
                                    description: "Medical precision in a spa environment - effective treatments that feel indulgent."
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

                {/* Treatment Categories */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Our Medical Spa Treatments
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Advanced aesthetic procedures for face and body
                            </p>
                        </div>

                        <div className="space-y-12">
                            {/* Injectable Aesthetics */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="grid lg:grid-cols-2">
                                    <div className="relative h-80 lg:h-auto">
                                        <Image
                                            src="/images/services/Hart_Aesthetics/Hart_Aesthetics_image_02.jpeg"
                                            alt="Injectable aesthetic treatments"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-8 lg:p-12">
                                        <div className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-bold mb-4">
                                            Injectable Aesthetics
                                        </div>
                                        <h3 className="font-serif text-3xl text-foreground mb-4">
                                            Hart Aesthetics Injectable Treatments
                                        </h3>
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            Medical-grade anti-wrinkle treatments, dermal fillers, and collagen stimulators for natural facial rejuvenation without surgery.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Anti-wrinkle injectables (Tox treatments)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Dermal fillers for volume & contour</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Collagen biostimulators</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Liquid facelifts & Nefertiti lifts</span>
                                            </li>
                                        </ul>
                                        <Button asChild className="bg-gold hover:bg-gold/90">
                                            <NavLink href="/anti-aging">Explore Anti-Aging</NavLink>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Laser & Light Therapy */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="grid lg:grid-cols-2">
                                    <div className="relative h-80 lg:h-auto order-2 lg:order-1">
                                        <Image
                                            src="/images/services/IPL_Hair_removal/IPL_image_06.jpeg"
                                            alt="Laser and IPL treatments"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-8 lg:p-12 order-1 lg:order-2">
                                        <div className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-bold mb-4">
                                            Laser Therapy
                                        </div>
                                        <h3 className="font-serif text-3xl text-foreground mb-4">
                                            Advanced Laser & IPL Treatments
                                        </h3>
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            Clinical-strength laser technology for hair removal, skin resurfacing, and pigmentation correction.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">IPL permanent hair removal</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Fractional laser skin resurfacing</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Plasmage skin tightening</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Tattoo removal</span>
                                            </li>
                                        </ul>
                                        <Button asChild className="bg-gold hover:bg-gold/90">
                                            <NavLink href="/services/ipl-hair-removal">Learn More</NavLink>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Body Contouring */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="grid lg:grid-cols-2">
                                    <div className="relative h-80 lg:h-auto">
                                        <Image
                                            src="/images/services/slimming_weightloss/EMS01.png"
                                            alt="Body contouring and sculpting"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-8 lg:p-12">
                                        <div className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-bold mb-4">
                                            Body Sculpting
                                        </div>
                                        <h3 className="font-serif text-3xl text-foreground mb-4">
                                            Non-Surgical Body Contouring
                                        </h3>
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            Medical-grade body sculpting without surgery, needles, or downtime. Eliminate fat and build muscle with proven technology.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Cryolipolysis fat freezing</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Tesla EMS muscle building</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Vaginal rejuvenation therapy</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">CE-approved technology</span>
                                            </li>
                                        </ul>
                                        <Button asChild className="bg-gold hover:bg-gold/90">
                                            <NavLink href="/body-contouring">View Options</NavLink>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Medical-Grade Facials */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="grid lg:grid-cols-2">
                                    <div className="relative h-80 lg:h-auto order-2 lg:order-1">
                                        <Image
                                            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200"
                                            alt="Medical-grade facial treatments"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-8 lg:p-12 order-1 lg:order-2">
                                        <div className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-bold mb-4">
                                            Advanced Skincare
                                        </div>
                                        <h3 className="font-serif text-3xl text-foreground mb-4">
                                            Medical-Grade Facial Treatments
                                        </h3>
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            Professional skincare treatments using clinical-strength products and advanced technologies for visible results.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Dermalogica Pro treatments</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">QMS medical skincare</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Microneedling & dermaplaning</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">Chemical peels & LED therapy</span>
                                            </li>
                                        </ul>
                                        <Button asChild className="bg-gold hover:bg-gold/90">
                                            <NavLink href="/prices#dermalogica">Explore Facials</NavLink>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Medical Spa vs Traditional Spa */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Medical Spa vs Traditional Spa
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Understanding the difference in approach and results
                            </p>
                        </div>
                        <div className="max-w-5xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-background p-8 rounded-xl">
                                    <h3 className="font-serif text-2xl text-foreground mb-6">Traditional Day Spa</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-2">
                                            <span className="text-muted-foreground">• Relaxation and pampering focus</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-muted-foreground">• Surface-level treatments</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-muted-foreground">• Retail-grade products</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-muted-foreground">• Limited clinical equipment</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-muted-foreground">• Esthetician-performed</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-muted-foreground">• Temporary, subtle results</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gold/10 p-8 rounded-xl border-2 border-gold">
                                    <h3 className="font-serif text-2xl text-foreground mb-6">Medical Spa (Galeo Beauty)</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Results-driven with clinical oversight</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Deep tissue & structural treatments</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Medical-grade products & technology</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Advanced laser, injectable, RF equipment</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Certified medical practitioners</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Measurable, long-lasting transformation</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Safety & Certification */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <Shield className="w-16 h-16 text-gold mx-auto mb-6" />
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                                Your Safety is Our Priority
                            </h2>
                            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                                At Galeo Beauty Medical Spa, every treatment adheres to strict medical protocols. Our certified practitioners use only CE & FDA-approved equipment and follow comprehensive safety procedures to ensure your wellbeing and optimal results.
                            </p>
                            <div className="grid md:grid-cols-3 gap-8 text-left">
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <Award className="w-10 h-10 text-gold mb-4" />
                                    <h3 className="font-serif text-lg text-foreground mb-2">Certified Practitioners</h3>
                                    <p className="text-sm text-muted-foreground">All treatments performed by certified, trained professionals</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <Shield className="w-10 h-10 text-gold mb-4" />
                                    <h3 className="font-serif text-lg text-foreground mb-2">Medical-Grade Equipment</h3>
                                    <p className="text-sm text-muted-foreground">CE & FDA-approved technology used in medical clinics worldwide</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <CheckCircle className="w-10 h-10 text-gold mb-4" />
                                    <h3 className="font-serif text-lg text-foreground mb-2">Sterile Protocols</h3>
                                    <p className="text-sm text-muted-foreground">Hospital-grade sterilization and single-use supplies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-to-br from-gold/10 via-secondary/5 to-gold/5">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                            Experience Medical Spa Excellence
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Book your complimentary consultation to discover how our medical spa treatments can help you achieve your aesthetic goals safely and effectively.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                <NavLink href="/booking">Book Free Consultation</NavLink>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <NavLink href="/contact">Contact Us</NavLink>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Popular Treatments */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="font-serif text-3xl text-center text-foreground mb-12">
                            Most Popular Medical Spa Treatments
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <NavLink href="/services/dermalogica-facial" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Dermalogica Facial</h3>
                                <p className="text-sm text-muted-foreground">Medical-grade skincare</p>
                            </NavLink>
                            <NavLink href="/services/fat-freezing-treatment" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Fat Freezing</h3>
                                <p className="text-sm text-muted-foreground">Body contouring</p>
                            </NavLink>
                            <NavLink href="/services/microblading" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Microblading</h3>
                                <p className="text-sm text-muted-foreground">Permanent makeup</p>
                            </NavLink>
                            <NavLink href="/services/ipl-hair-removal" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">IPL Hair Removal</h3>
                                <p className="text-sm text-muted-foreground">Laser treatments</p>
                            </NavLink>
                            <NavLink href="/services/lash-extensions" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Lash Extensions</h3>
                                <p className="text-sm text-muted-foreground">Eye enhancement</p>
                            </NavLink>
                            <NavLink href="/services/lip-fillers" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Lip Fillers</h3>
                                <p className="text-sm text-muted-foreground">Injectable aesthetics</p>
                            </NavLink>
                            <NavLink href="/services/brazilian-wax" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Brazilian Wax</h3>
                                <p className="text-sm text-muted-foreground">Hair removal</p>
                            </NavLink>
                            <NavLink href="/specials" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">View Specials</h3>
                                <p className="text-sm text-muted-foreground">Current promotions</p>
                            </NavLink>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
