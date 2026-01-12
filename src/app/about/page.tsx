import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Galeo Beauty - our philosophy, team, and commitment to excellence in skincare and beauty treatments.",
};

const teamMembers = [
    {
        name: "Sarah Johnson",
        role: "Lead Aesthetician",
        bio: "10+ years specializing in advanced facial treatments and skin rejuvenation.",
        image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    },
    {
        name: "Emily Chen",
        role: "Nail Artist",
        bio: "Award-winning nail technician with expertise in nail art and gel extensions.",
        image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
        name: "Maria Santos",
        role: "Massage Therapist",
        bio: "Certified in Swedish, deep tissue, and hot stone massage techniques.",
        image:
            "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
    },
    {
        name: "Jessica Williams",
        role: "Hair Stylist",
        bio: "Master colorist and styling expert with international training.",
        image:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop",
    },
];

const features = [
    {
        title: "Premium Products",
        description:
            "We use only the finest cosmeceutical products from internationally acclaimed brands",
    },
    {
        title: "Expert Team",
        description:
            "Our skilled therapists are certified professionals passionate about your beauty journey",
    },
    {
        title: "Flexible Hours",
        description:
            "Convenient scheduling options to fit your busy lifestyle, including weekends",
    },
    {
        title: "Personalized Care",
        description:
            "Every treatment is customized to your unique skin type and personal goals",
    },
];

export default function AboutPage() {
    return (
        <>
            <Header />
            <main>
                {/* Page Hero */}
                <section className="bg-muted/30 py-20 md:py-28">
                    <div className="container mx-auto px-4 text-center">
                        <span className="text-gold text-sm uppercase tracking-[0.2em] mb-2 block">
                            Our Story
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
                            About <span className="text-gold">Galeo Beauty</span>
                        </h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Where science meets elegance for your beauty journey
                        </p>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
                                    Our <span className="text-gold">Philosophy</span>
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    At Galeo Beauty, we believe that true beauty radiates from
                                    within. Our expert therapists combine cutting-edge skincare
                                    technology with time-honored techniques to deliver
                                    transformative results.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-8">
                                    Every treatment is tailored to your unique needs, ensuring a
                                    personalized journey to your most radiant self. We are
                                    committed to using only premium products and maintaining the
                                    highest standards of service.
                                </p>
                                <Button
                                    asChild
                                    className="bg-gold hover:bg-gold-dark text-foreground font-medium"
                                >
                                    <Link href="/contact#booking">Book a Consultation</Link>
                                </Button>
                            </div>
                            <div className="relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=700&fit=crop"
                                    alt="Galeo Beauty Salon"
                                    width={600}
                                    height={700}
                                    className="rounded-xl object-cover w-full h-[500px]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-16 md:py-24 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="text-gold text-sm uppercase tracking-[0.2em] mb-2 block">
                                Why Galeo Beauty
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                                The <span className="text-gold">Galeo</span> Difference
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="glass-card rounded-xl p-6 text-center"
                                >
                                    <h3 className="font-serif text-lg font-semibold mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="text-gold text-sm uppercase tracking-[0.2em] mb-2 block">
                                Meet Our Experts
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                                Our <span className="text-gold">Team</span>
                            </h2>
                            <p className="text-muted-foreground max-w-xl mx-auto mt-4">
                                Passionate professionals dedicated to your beauty journey
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member) => (
                                <div
                                    key={member.name}
                                    className="glass-card rounded-xl overflow-hidden text-center"
                                >
                                    <div className="relative h-64">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-serif text-lg font-semibold">
                                            {member.name}
                                        </h3>
                                        <span className="text-gold text-sm">{member.role}</span>
                                        <p className="text-muted-foreground text-sm mt-2">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
