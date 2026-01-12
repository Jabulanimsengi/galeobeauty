import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { businessInfo } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Contact Galeo Beauty for appointments and inquiries. Visit us at Hartbeespoort Dam or reach us by phone, email, or WhatsApp.",
};

export default function ContactPage() {
    return (
        <>
            <Header />
            <main>
                {/* Page Hero */}
                <section className="bg-muted/30 py-20 md:py-28">
                    <div className="container mx-auto px-4 text-center">
                        <span className="text-gold text-sm uppercase tracking-[0.2em] mb-2 block">
                            Get In Touch
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
                            <span className="text-gold">Contact</span> Us
                        </h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            We&apos;d love to hear from you
                        </p>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Cards */}
                            <div className="space-y-6">
                                <div className="glass-card rounded-xl p-6 flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg font-semibold mb-1">
                                            Visit Us
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            {businessInfo.address.street}
                                            <br />
                                            {businessInfo.address.area}
                                        </p>
                                    </div>
                                </div>

                                <div className="glass-card rounded-xl p-6 flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg font-semibold mb-1">
                                            Call Us
                                        </h3>
                                        <a
                                            href={`tel:${businessInfo.phone}`}
                                            className="text-muted-foreground text-sm hover:text-gold transition-colors"
                                        >
                                            012 111 1730
                                        </a>
                                    </div>
                                </div>

                                <div className="glass-card rounded-xl p-6 flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg font-semibold mb-1">
                                            Email Us
                                        </h3>
                                        <a
                                            href={`mailto:${businessInfo.email}`}
                                            className="text-muted-foreground text-sm hover:text-gold transition-colors"
                                        >
                                            {businessInfo.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="glass-card rounded-xl p-6 flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg font-semibold mb-1">
                                            Business Hours
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            {businessInfo.hours.weekday}
                                            <br />
                                            {businessInfo.hours.saturday}
                                            <br />
                                            {businessInfo.hours.publicHoliday}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Section */}
                            <div id="booking" className="glass-card rounded-xl p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">
                                    Book Your Appointment
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Ready to experience the Galeo difference? Contact us to
                                    schedule your treatment. We recommend booking 24-48 hours in
                                    advance for your preferred time slot.
                                </p>
                                <div className="space-y-4">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full bg-gold hover:bg-gold-dark text-foreground font-medium"
                                    >
                                        <a href={`tel:${businessInfo.phone}`}>
                                            <Phone className="w-4 h-4 mr-2" />
                                            Call to Book
                                        </a>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <a
                                            href={`https://wa.me/${businessInfo.socials.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <MessageCircle className="w-4 h-4 mr-2" />
                                            WhatsApp Us
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Placeholder */}
                <section className="h-[400px] bg-muted/50 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
                        <p className="text-muted-foreground">
                            Interactive map coming soon
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            {businessInfo.address.street}, {businessInfo.address.area}
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
