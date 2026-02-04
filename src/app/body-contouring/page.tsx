import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { NearbyLocationsSection } from "@/components/sections/NearbyLocationsSection";
import { Zap, CheckCircle, Clock, TrendingUp, Shield, Sparkles } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Body Contouring Hartbeespoort | Non-Surgical Fat Reduction & Body Sculpting",
    description: "Transform your body with advanced body contouring treatments in Hartbeespoort. Fat freezing, EMS body sculpting & non-surgical fat reduction. CE-approved technology with proven results.",
    keywords: "body contouring hartbeespoort, body sculpting south africa, non-surgical fat reduction, EMS body sculpting, fat freezing, cryolipolysis, body shaping salon, cellulite reduction",
    alternates: {
        canonical: "https://www.galeobeauty.com/body-contouring",
    },
    openGraph: {
        title: "Body Contouring Hartbeespoort | Non-Surgical Fat Reduction",
        description: "Advanced body contouring & sculpting treatments. Fat freezing, EMS technology. No surgery, no downtime.",
        url: "https://www.galeobeauty.com/body-contouring",
        type: "website",
    },
};

export default function BodyContouringPage() {
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
                                    Advanced Body Contouring
                                </span>
                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                                    Non-Surgical <span className="italic text-gold">Body Sculpting</span> in Hartbeespoort
                                </h1>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    Transform stubborn fat into your dream silhouette without surgery. Our CE-approved body contouring treatments combine cutting-edge technology with proven results for safe, effective body sculpting.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                        <NavLink href="/booking">Book Consultation</NavLink>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <NavLink href="/prices">View Pricing</NavLink>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/services/slimming_weightloss/EMS01.png"
                                    alt="Body contouring treatment in Hartbeespoort"
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
                                Why Choose Body Contouring?
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Achieve your body goals without surgery, downtime, or recovery period
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Zap,
                                    title: "No Surgery Required",
                                    description: "Non-invasive treatments with zero downtime. Walk in, transform, walk out."
                                },
                                {
                                    icon: Clock,
                                    title: "Quick Sessions",
                                    description: "30-60 minute sessions that fit your busy schedule. See results in weeks."
                                },
                                {
                                    icon: Shield,
                                    title: "CE-Approved Technology",
                                    description: "Safe, clinically proven equipment with certified practitioners."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Proven Results",
                                    description: "Visible fat reduction and muscle toning backed by science."
                                },
                                {
                                    icon: CheckCircle,
                                    title: "No Recovery Time",
                                    description: "Resume normal activities immediately after treatment."
                                },
                                {
                                    icon: Sparkles,
                                    title: "Long-Lasting Effects",
                                    description: "Permanent fat cell elimination with proper maintenance."
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
                                Our Body Contouring Treatments
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Choose the perfect treatment for your body transformation goals
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Fat Freezing */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="relative h-64">
                                    <Image
                                        src="/images/services/fat_freezing/fat_freezing_03.jpeg"
                                        alt="Fat freezing cryolipolysis treatment"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-gold text-black px-4 py-2 rounded-full font-bold text-sm">
                                        CE Approved
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-serif text-2xl text-foreground mb-4">
                                        Fat Freezing (Cryolipolysis)
                                    </h3>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        Freeze away stubborn fat cells permanently. Our cryolipolysis technology targets and eliminates fat cells without surgery, needles, or downtime. Results visible in 6-12 weeks as your body naturally processes frozen fat cells.
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Non-invasive fat reduction</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Permanent fat cell elimination</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">1 hour sessions, zero downtime</span>
                                        </li>
                                    </ul>
                                    <div className="flex items-baseline gap-2 mb-6">
                                        <span className="font-serif text-3xl text-gold">R799</span>
                                        <span className="text-muted-foreground">per session</span>
                                    </div>
                                    <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                        <NavLink href="/services/fat-freezing-treatment">Learn More</NavLink>
                                    </Button>
                                </div>
                            </div>

                            {/* Tesla EMS */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="relative h-64">
                                    <Image
                                        src="/images/services/slimming_weightloss/EMS01.png"
                                        alt="EMS body sculpting muscle building"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-gold text-black px-4 py-2 rounded-full font-bold text-sm">
                                        New Tech
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-serif text-2xl text-foreground mb-4">
                                        Tesla EMS Body Sculpting
                                    </h3>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        Build muscle while burning fat! High-Intensity Focused Electromagnetic technology delivers the equivalent of 20,000 sit-ups in just 30 minutes. Sculpt abs, lift buttocks, and tone arms with breakthrough HIFEM technology.
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Build muscle + burn fat simultaneously</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">20,000 muscle contractions in 30 min</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">Visible results after first sessions</span>
                                        </li>
                                    </ul>
                                    <div className="flex items-baseline gap-2 mb-6">
                                        <span className="font-serif text-3xl text-gold">R1,850</span>
                                        <span className="text-muted-foreground">per session</span>
                                    </div>
                                    <Button asChild className="w-full bg-gold hover:bg-gold/90">
                                        <NavLink href="/prices#slimming">Learn More</NavLink>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                How Body Contouring Works
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Your journey to a sculpted physique in simple steps
                            </p>
                        </div>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                {
                                    step: "1",
                                    title: "Free Consultation",
                                    description: "Meet with our certified specialists to discuss your goals and create a personalized treatment plan."
                                },
                                {
                                    step: "2",
                                    title: "Treatment Session",
                                    description: "Relax during your 30-60 minute session. No pain, no needles, no surgery required."
                                },
                                {
                                    step: "3",
                                    title: "Resume Activities",
                                    description: "Walk out and continue your day immediately. Zero downtime or recovery period."
                                },
                                {
                                    step: "4",
                                    title: "See Results",
                                    description: "Notice visible changes within weeks as your body naturally processes fat cells and builds muscle."
                                }
                            ].map((item, index) => (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold text-black font-bold text-2xl mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="font-serif text-xl text-foreground mb-3">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Frequently Asked Questions
                            </h2>
                        </div>
                        <div className="space-y-6">
                            {[
                                {
                                    q: "Is body contouring safe?",
                                    a: "Yes! Our body contouring treatments use CE-approved, clinically tested technology. Fat freezing and EMS are non-invasive procedures with excellent safety profiles when performed by certified practitioners."
                                },
                                {
                                    q: "How many sessions do I need?",
                                    a: "Most clients see results with 4-6 sessions for EMS body sculpting and 1-3 sessions for fat freezing per target area. Your personalized treatment plan will be discussed during your consultation."
                                },
                                {
                                    q: "When will I see results?",
                                    a: "EMS results are visible after 2-4 sessions. Fat freezing results appear gradually over 6-12 weeks as your body naturally eliminates frozen fat cells."
                                },
                                {
                                    q: "Does body contouring hurt?",
                                    a: "No! Fat freezing may feel cold initially, then your skin goes numb. EMS creates intense muscle contractions that feel like an intensive workout. Both treatments are well-tolerated."
                                },
                                {
                                    q: "Is there any downtime?",
                                    a: "Zero downtime! You can return to normal activities immediately after treatment. Some clients experience temporary redness or muscle soreness, similar to post-workout sensation."
                                },
                                {
                                    q: "Who is a good candidate for body contouring?",
                                    a: "Body contouring is ideal for those near their target weight with stubborn fat pockets or who want to build muscle tone. It's not a weight loss solution but rather a body sculpting treatment for specific areas."
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
                            Ready to Transform Your Body?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Book your free consultation today and discover which body contouring treatment is right for you.
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

                {/* Related Services */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="font-serif text-3xl text-center text-foreground mb-12">
                            Related Treatments
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <NavLink href="/services/microblading" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Microblading</h3>
                                <p className="text-sm text-muted-foreground">Semi-permanent brows</p>
                            </NavLink>
                            <NavLink href="/services/dermalogica-facial" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Dermalogica Facial</h3>
                                <p className="text-sm text-muted-foreground">Professional skincare</p>
                            </NavLink>
                            <NavLink href="/services/ipl-hair-removal" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">IPL Hair Removal</h3>
                                <p className="text-sm text-muted-foreground">Permanent results</p>
                            </NavLink>
                            <NavLink href="/prices" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">All Treatments</h3>
                                <p className="text-sm text-muted-foreground">View full price list</p>
                            </NavLink>
                        </div>
                    </div>
                </section>

                {/* Nearby Locations - Internal Linking for SEO */}
                <NearbyLocationsSection serviceName="Body Contouring" />
            </main>
            <Footer />
        </>
    );
}
