import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { NearbyLocationsSection } from "@/components/sections/NearbyLocationsSection";
import { Zap, CheckCircle, Shield, TrendingDown, Clock, Award } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Laser Hair Removal Hartbeespoort | IPL Permanent Hair Removal",
    description: "Say goodbye to shaving forever! Professional IPL laser hair removal for face, body, bikini & legs. CE-approved technology with permanent results in Hartbeespoort.",
    keywords: "laser hair removal hartbeespoort, IPL treatment south africa, permanent hair removal, IPL hair removal, laser hair removal near me, bikini laser, facial hair removal",
    alternates: {
        canonical: "https://www.galeobeauty.com/laser-hair-removal",
    },
    openGraph: {
        title: "Laser Hair Removal Hartbeespoort | IPL Permanent Hair Removal",
        description: "Permanent hair removal with IPL technology. Face, body, bikini, legs. CE-approved. Say goodbye to razors!",
        url: "https://www.galeobeauty.com/laser-hair-removal",
        type: "website",
    },
};

export default function LaserHairRemovalPage() {
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
                                    Permanent Hair Removal
                                </span>
                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                                    Never Shave <span className="italic text-gold">Again</span>
                                </h1>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    Experience the freedom of smooth, hair-free skin all year round. Our CE-approved IPL laser hair removal targets unwanted hair at the root for permanent reduction. No more razors, waxing, or ingrown hairs – just effortlessly silky skin.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                        <NavLink href="/booking">Book Free Consultation</NavLink>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <NavLink href="/prices#ipl">View Pricing</NavLink>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/services/IPL_Hair_removal/IPL_image_06.jpeg"
                                    alt="IPL laser hair removal treatment"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                Why Choose IPL Laser Hair Removal?
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                The smart alternative to shaving and waxing
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: CheckCircle,
                                    title: "Permanent Results",
                                    description: "Reduce hair growth by 80-95% permanently. After treatment series, enjoy smooth skin for years."
                                },
                                {
                                    icon: TrendingDown,
                                    title: "Save Money Long-Term",
                                    description: "Stop spending on razors, waxing, and shaving cream. IPL pays for itself within 2-3 years."
                                },
                                {
                                    icon: Clock,
                                    title: "Save Time Daily",
                                    description: "No more daily shaving or monthly waxing appointments. Reclaim hours every week."
                                },
                                {
                                    icon: Shield,
                                    title: "Safe & Effective",
                                    description: "CE-approved IPL technology used safely on millions worldwide. Minimal discomfort."
                                },
                                {
                                    icon: Zap,
                                    title: "Fast Sessions",
                                    description: "Quick treatments – underarms in 5 minutes, full legs in under an hour."
                                },
                                {
                                    icon: Award,
                                    title: "No Ingrown Hairs",
                                    description: "Say goodbye to razor bumps, irritation, and painful ingrown hairs forever."
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

                {/* Treatment Areas */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                IPL Hair Removal Treatment Areas
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Permanent hair reduction for any body area
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 mb-16">
                            {/* Face & Neck */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="font-serif text-2xl text-foreground mb-6">Face & Neck</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-secondary/20 pb-3">
                                        <div>
                                            <span className="font-medium text-foreground">Upper Lip / Moustache</span>
                                            <p className="text-sm text-muted-foreground">Smooth, hair-free lip area</p>
                                        </div>
                                        <span className="text-gold font-bold">R270</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-secondary/20 pb-3">
                                        <div>
                                            <span className="font-medium text-foreground">Full Face</span>
                                            <p className="text-sm text-muted-foreground">Cheeks, chin, upper lip, sideburns</p>
                                        </div>
                                        <span className="text-gold font-bold">R882</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-secondary/20 pb-3">
                                        <div>
                                            <span className="font-medium text-foreground">Full Face & Neck</span>
                                            <p className="text-sm text-muted-foreground">Complete facial hair removal</p>
                                        </div>
                                        <span className="text-gold font-bold">R945</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium text-foreground">Beardline (Men)</span>
                                            <p className="text-sm text-muted-foreground">Clean neck & jawline</p>
                                        </div>
                                        <span className="text-gold font-bold">R495</span>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="font-serif text-2xl text-foreground mb-6">Body Areas</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-secondary/20 pb-3">
                                        <div>
                                            <span className="font-medium text-foreground">Underarms</span>
                                            <p className="text-sm text-muted-foreground">Popular choice – quick sessions</p>
                                        </div>
                                        <span className="text-gold font-bold">R495</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-secondary/20 pb-3">
                                        <div>
                                            <span className="font-medium text-foreground">Full Arms</span>
                                            <p className="text-sm text-muted-foreground">Shoulder to wrist</p>
                                        </div>
                                        <span className="text-gold font-bold">R1,350</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-secondary/20 pb-3">
                                        <div>
                                            <span className="font-medium text-foreground">Stomach</span>
                                            <p className="text-sm text-muted-foreground">Smooth midsection</p>
                                        </div>
                                        <span className="text-gold font-bold">R765</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium text-foreground">Full Back (Men)</span>
                                            <p className="text-sm text-muted-foreground">Complete back coverage</p>
                                        </div>
                                        <span className="text-gold font-bold">R1,170</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bikini */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="font-serif text-2xl text-foreground mb-6">Bikini Area</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-secondary/20 pb-3">
                                        <div>
                                            <span className="font-medium text-foreground">Bikini Line</span>
                                            <p className="text-sm text-muted-foreground">Sides only – swimwear ready</p>
                                        </div>
                                        <span className="text-gold font-bold">R540</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-secondary/20 pb-3">
                                        <div>
                                            <span className="font-medium text-foreground">Brazilian</span>
                                            <p className="text-sm text-muted-foreground">Leave small strip/triangle</p>
                                        </div>
                                        <span className="text-gold font-bold">R765</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium text-foreground">Hollywood</span>
                                            <p className="text-sm text-muted-foreground">Complete hair removal</p>
                                        </div>
                                        <span className="text-gold font-bold">R990</span>
                                    </div>
                                </div>
                            </div>

                            {/* Legs */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="font-serif text-2xl text-foreground mb-6">Legs</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-secondary/20 pb-3">
                                        <div>
                                            <span className="font-medium text-foreground">Half Legs</span>
                                            <p className="text-sm text-muted-foreground">Knee to ankle</p>
                                        </div>
                                        <span className="text-gold font-bold">R1,305</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-secondary/20 pb-3">
                                        <div>
                                            <span className="font-medium text-foreground">Full Legs</span>
                                            <p className="text-sm text-muted-foreground">Thigh to ankle – most popular</p>
                                        </div>
                                        <span className="text-gold font-bold">R2,070</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium text-foreground">Full Legs Premium</span>
                                            <p className="text-sm text-muted-foreground">Additional passes per session</p>
                                        </div>
                                        <span className="text-gold font-bold">R2,565</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-muted-foreground mb-6">
                                <strong>Package Deals Available:</strong> Combine multiple areas for better value. Ask about our popular combinations!
                            </p>
                            <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                <NavLink href="/services/ipl-hair-removal">View Full Price List</NavLink>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                How IPL Laser Hair Removal Works
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                The science behind permanent hair reduction
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-4 gap-8 mb-16">
                                {[
                                    {
                                        step: "1",
                                        title: "Light Absorption",
                                        description: "IPL light targets melanin (pigment) in hair follicles. Dark hair absorbs light energy."
                                    },
                                    {
                                        step: "2",
                                        title: "Heat Conversion",
                                        description: "Light energy converts to heat, warming the hair follicle to 70°C."
                                    },
                                    {
                                        step: "3",
                                        title: "Follicle Destruction",
                                        description: "Heat damages follicle's ability to regrow hair without harming surrounding skin."
                                    },
                                    {
                                        step: "4",
                                        title: "Natural Shedding",
                                        description: "Treated hairs fall out naturally over 1-2 weeks. Follicles don't regenerate."
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold text-black font-bold text-2xl mb-4">
                                            {item.step}
                                        </div>
                                        <h3 className="font-serif text-lg text-foreground mb-3">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gold/10 rounded-2xl p-8 border-2 border-gold/20">
                                <h3 className="font-serif text-2xl text-foreground mb-4 text-center">
                                    Why Multiple Sessions Are Needed
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Hair grows in cycles: active growth (anagen), transitional (catagen), and resting (telogen). IPL only works on actively growing hair. Since only 20-30% of hair is in active growth at any time, multiple sessions are required to catch all follicles during their growth phase.
                                </p>
                                <p className="text-foreground font-medium text-center">
                                    Typical treatment plan: 6-8 sessions spaced 4-6 weeks apart for optimal results
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* IPL vs Other Methods */}
                <section className="py-20 bg-secondary/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                IPL Laser vs Traditional Hair Removal
                            </h2>
                        </div>
                        <div className="max-w-5xl mx-auto overflow-x-auto">
                            <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
                                <thead>
                                    <tr className="bg-gold text-black">
                                        <th className="p-4 text-left font-serif">Method</th>
                                        <th className="p-4 text-center">Permanency</th>
                                        <th className="p-4 text-center">Pain Level</th>
                                        <th className="p-4 text-center">Cost Over Time</th>
                                        <th className="p-4 text-center">Ingrown Hairs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-secondary/20">
                                        <td className="p-4 font-medium">IPL Laser</td>
                                        <td className="p-4 text-center text-green-600 font-bold">80-95% Permanent</td>
                                        <td className="p-4 text-center">Minimal</td>
                                        <td className="p-4 text-center text-green-600">Low</td>
                                        <td className="p-4 text-center text-green-600">Eliminated</td>
                                    </tr>
                                    <tr className="border-b border-secondary/20">
                                        <td className="p-4 font-medium">Shaving</td>
                                        <td className="p-4 text-center text-red-600">Temporary (daily)</td>
                                        <td className="p-4 text-center">None</td>
                                        <td className="p-4 text-center text-red-600">High</td>
                                        <td className="p-4 text-center text-red-600">Common</td>
                                    </tr>
                                    <tr className="border-b border-secondary/20">
                                        <td className="p-4 font-medium">Waxing</td>
                                        <td className="p-4 text-center text-red-600">Temporary (3-4 weeks)</td>
                                        <td className="p-4 text-center text-red-600">High</td>
                                        <td className="p-4 text-center text-red-600">Very High</td>
                                        <td className="p-4 text-center text-red-600">Common</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium">Depilatory Cream</td>
                                        <td className="p-4 text-center text-red-600">Temporary (few days)</td>
                                        <td className="p-4 text-center text-yellow-600">Skin irritation</td>
                                        <td className="p-4 text-center text-red-600">Moderate</td>
                                        <td className="p-4 text-center text-yellow-600">Sometimes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                                IPL Hair Removal Questions
                            </h2>
                        </div>
                        <div className="space-y-6">
                            {[
                                {
                                    q: "Does laser hair removal hurt?",
                                    a: "Most clients describe it as a quick rubber band snap or mild pinch. Modern IPL technology includes cooling systems to minimize discomfort. Sensitive areas may feel more intense, but sessions are quick (5-15 minutes for small areas). Most find it far less painful than waxing."
                                },
                                {
                                    q: "How many sessions will I need?",
                                    a: "Most areas require 6-8 sessions for optimal results. Factors affecting session count include hair color (darker responds better), hair thickness, treatment area, hormones, and individual hair growth cycle. Face may need 8-10 sessions due to hormonal influence."
                                },
                                {
                                    q: "Is IPL hair removal permanent?",
                                    a: "IPL provides permanent hair reduction (80-95% of treated hair). Treated follicles are destroyed permanently, but hormones, medication, or aging may activate new follicles. Most clients enjoy years of smooth skin with occasional touch-ups."
                                },
                                {
                                    q: "Who is a good candidate for IPL?",
                                    a: "IPL works best on light to medium skin with dark hair (high contrast). Technology limitations: not effective on white, grey, red, or very blonde hair (lack melanin). Very dark skin may not be suitable (risk of burns). Consultation determines candidacy."
                                },
                                {
                                    q: "What should I do before treatment?",
                                    a: "Shave treatment area 24 hours before (don't wax or pluck – follicle must be intact). Avoid sun exposure for 2 weeks prior. No fake tan, retinoids, or photosensitizing medications. Clean skin with no lotions, deodorant, or makeup on treatment day."
                                },
                                {
                                    q: "What's the aftercare like?",
                                    a: "Mild redness and slight swelling are normal, fading within hours. Avoid sun exposure for 2 weeks post-treatment. Use SPF 50+ daily. Don't wax or pluck between sessions (shaving is fine). Treated hair falls out naturally over 1-2 weeks."
                                },
                                {
                                    q: "When will I see results?",
                                    a: "Immediate: Treated hair is damaged but still visible. 1-2 weeks: Hair sheds naturally. 2-4 weeks: Noticeably less hair regrowth. After 3-4 sessions: Significant reduction visible. Full results: 6-12 months after completing treatment series."
                                },
                                {
                                    q: "How much does a full treatment cost?",
                                    a: "Cost depends on area treated and number of sessions needed. Example: Full legs (6 sessions @ R2,070) = R12,420 total. Compare to lifetime of waxing: R500/month × 12 months × 30 years = R180,000! IPL pays for itself quickly."
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
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                            Ready for Smooth, Hair-Free Skin?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Book your free consultation to discuss treatment areas, see our technology, and get a personalized treatment plan with pricing.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
                                <NavLink href="/booking">Book Free Consultation</NavLink>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <NavLink href="/services/ipl-hair-removal">View All Prices</NavLink>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Related */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="font-serif text-3xl text-center text-foreground mb-12">
                            Related Treatments
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <NavLink href="/services/brazilian-wax" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Waxing Services</h3>
                                <p className="text-sm text-muted-foreground">Temporary alternative</p>
                            </NavLink>
                            <NavLink href="/body-contouring" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Body Contouring</h3>
                                <p className="text-sm text-muted-foreground">Sculpt your body</p>
                            </NavLink>
                            <NavLink href="/services/dermalogica-facial" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Skincare</h3>
                                <p className="text-sm text-muted-foreground">Professional facials</p>
                            </NavLink>
                            <NavLink href="/medical-spa" className="group block p-6 bg-secondary/5 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">Medical Spa</h3>
                                <p className="text-sm text-muted-foreground">All treatments</p>
                            </NavLink>
                        </div>
                    </div>
                </section>

                {/* Nearby Locations - Internal Linking for SEO */}
                <NearbyLocationsSection serviceName="Laser Hair Removal" />
            </main>
            <Footer />
        </>
    );
}
