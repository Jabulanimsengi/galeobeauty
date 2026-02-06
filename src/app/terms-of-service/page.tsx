import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { businessInfo } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms of Service for Galeo Beauty Salon & Spa. Read our booking policies, cancellation terms, and service conditions.",
    alternates: {
        canonical: "https://www.galeobeauty.com/terms-of-service",
    },
};

export default function TermsOfServicePage() {
    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 bg-gradient-to-b from-secondary/20 to-background">
                    <div className="container mx-auto max-w-4xl">
                        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4">
                            Terms of <span className="text-gold">Service</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Last updated: February 2026
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12 px-6">
                    <div className="container mx-auto max-w-4xl prose prose-lg prose-neutral dark:prose-invert">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By booking an appointment or using the services of Galeo Beauty (Pty) Ltd, you agree
                            to be bound by these Terms of Service. If you do not agree to these terms, please
                            do not use our services.
                        </p>

                        <h2>2. Services</h2>
                        <p>
                            Galeo Beauty provides professional beauty, skincare, and aesthetic services at our
                            salon located in Hartbeespoort. Service descriptions, prices, and durations are
                            available on our website and may be updated periodically.
                        </p>

                        <h2>3. Booking Policy</h2>
                        <h3>Appointments</h3>
                        <ul>
                            <li>Appointments can be made via WhatsApp, phone, or walk-in (subject to availability)</li>
                            <li>A 50% deposit may be required for certain treatments to secure your booking</li>
                            <li>Please arrive 5-10 minutes before your scheduled appointment</li>
                            <li>Late arrivals may result in shortened treatment time or rescheduling</li>
                        </ul>

                        <h3>Deposits</h3>
                        <p>
                            For treatments above R500, a 50% deposit is required to confirm your booking.
                            Deposits can be paid via EFT to:
                        </p>
                        <ul>
                            <li><strong>Account Name:</strong> {businessInfo.banking.companyName}</li>
                            <li><strong>Bank:</strong> {businessInfo.banking.bank}</li>
                            <li><strong>Account Number:</strong> {businessInfo.banking.accountNumber}</li>
                            <li><strong>Branch Code:</strong> {businessInfo.banking.branchCode}</li>
                            <li><strong>Reference:</strong> Your Name + Surname</li>
                        </ul>

                        <h2>4. Cancellation Policy</h2>
                        <ul>
                            <li><strong>24+ hours notice:</strong> Full refund or reschedule at no charge</li>
                            <li><strong>Less than 24 hours:</strong> 50% of the service fee may be charged</li>
                            <li><strong>No-show:</strong> Full service fee may be charged</li>
                        </ul>
                        <p>
                            We understand emergencies happen. Please contact us as soon as possible if you
                            need to cancel or reschedule.
                        </p>

                        <h2>5. Health & Safety</h2>
                        <h3>Client Responsibilities</h3>
                        <ul>
                            <li>Inform us of any allergies, skin conditions, or medical treatments</li>
                            <li>Disclose if you are pregnant or breastfeeding</li>
                            <li>Follow pre-treatment and post-treatment instructions provided</li>
                            <li>Attend a patch test if required (especially for lash extensions, tinting, or chemical treatments)</li>
                        </ul>

                        <h3>Our Commitment</h3>
                        <ul>
                            <li>We maintain strict hygiene and sterilization protocols</li>
                            <li>All staff are trained and certified in their respective treatments</li>
                            <li>We use professional-grade, quality-tested products</li>
                        </ul>

                        <h2>6. Treatment Consent</h2>
                        <p>
                            By booking a treatment, you consent to receive the service as described. For
                            certain treatments (e.g., aesthetic injections, chemical peels, microneedling),
                            you may be required to sign a separate consent form.
                        </p>

                        <h2>7. Results & Expectations</h2>
                        <p>
                            Results vary between individuals based on factors including skin type, lifestyle,
                            and adherence to aftercare instructions. We do not guarantee specific outcomes
                            but strive to achieve the best possible results for each client.
                        </p>

                        <h2>8. Prices & Payment</h2>
                        <ul>
                            <li>Prices are quoted in South African Rand (ZAR)</li>
                            <li>Payment is due upon completion of services</li>
                            <li>We accept cash, card, and EFT payments</li>
                            <li>Prices are subject to change without prior notice</li>
                        </ul>

                        <h2>9. Gift Vouchers</h2>
                        <ul>
                            <li>Gift vouchers are valid for 6 months from date of purchase</li>
                            <li>Vouchers are non-refundable and non-transferable for cash</li>
                            <li>Lost or stolen vouchers cannot be replaced</li>
                        </ul>

                        <h2>10. Complaints & Feedback</h2>
                        <p>
                            We value your feedback. If you are not satisfied with a service, please notify
                            us within 48 hours so we can address your concerns. Contact us via WhatsApp,
                            phone, or email.
                        </p>

                        <h2>11. Liability</h2>
                        <p>
                            Galeo Beauty is not liable for any adverse reactions or outcomes resulting from
                            failure to disclose relevant medical information, or failure to follow pre/post-treatment
                            instructions. Clients undergo treatments at their own risk.
                        </p>

                        <h2>12. Intellectual Property</h2>
                        <p>
                            All content on galeobeauty.com, including text, images, logos, and design, is
                            owned by Galeo Beauty (Pty) Ltd and protected by copyright laws.
                        </p>

                        <h2>13. Governing Law</h2>
                        <p>
                            These Terms of Service are governed by the laws of the Republic of South Africa.
                            Any disputes shall be subject to the exclusive jurisdiction of the South African courts.
                        </p>

                        <h2>14. Changes to Terms</h2>
                        <p>
                            We reserve the right to update these Terms of Service at any time. Continued use
                            of our services constitutes acceptance of any changes.
                        </p>

                        <h2>15. Contact Us</h2>
                        <p>For questions about these Terms of Service, contact us:</p>
                        <ul>
                            <li><strong>Email:</strong> {businessInfo.email}</li>
                            <li><strong>Phone:</strong> 012 111 1730</li>
                            <li><strong>WhatsApp:</strong> {businessInfo.cell}</li>
                            <li><strong>Address:</strong> {businessInfo.address.street}, {businessInfo.address.area}</li>
                        </ul>

                        <p className="text-sm text-muted-foreground mt-8">
                            Company Registration: {businessInfo.banking.regNumber}
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
