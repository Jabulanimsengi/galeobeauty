import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { businessInfo } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for Galeo Beauty Salon & Spa. Learn how we collect, use, and protect your personal information.",
    alternates: {
        canonical: "https://www.galeobeauty.com/privacy-policy",
    },
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 bg-gradient-to-b from-secondary/20 to-background">
                    <div className="container mx-auto max-w-4xl">
                        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4">
                            Privacy <span className="text-gold">Policy</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Last updated: February 2026
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12 px-6">
                    <div className="container mx-auto max-w-4xl prose prose-lg prose-neutral dark:prose-invert">
                        <h2>1. Introduction</h2>
                        <p>
                            Galeo Beauty (Pty) Ltd (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                            when you visit our website at galeobeauty.com or use our salon services.
                        </p>

                        <h2>2. Information We Collect</h2>
                        <h3>Personal Information</h3>
                        <p>We may collect personal information that you voluntarily provide, including:</p>
                        <ul>
                            <li>Name and surname</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Physical address</li>
                            <li>Payment information (processed securely via third-party providers)</li>
                            <li>Booking preferences and history</li>
                            <li>Medical information relevant to treatments (e.g., allergies, skin conditions)</li>
                        </ul>

                        <h3>Automatically Collected Information</h3>
                        <p>When you visit our website, we may automatically collect:</p>
                        <ul>
                            <li>IP address</li>
                            <li>Browser type and version</li>
                            <li>Pages visited and time spent</li>
                            <li>Referring website</li>
                            <li>Device information</li>
                        </ul>

                        <h2>3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul>
                            <li>Process and manage your bookings</li>
                            <li>Provide and improve our services</li>
                            <li>Send appointment reminders and confirmations</li>
                            <li>Respond to your inquiries and requests</li>
                            <li>Send promotional offers and newsletters (with your consent)</li>
                            <li>Process payments securely</li>
                            <li>Comply with legal obligations</li>
                            <li>Ensure safe treatment delivery by maintaining medical records</li>
                        </ul>

                        <h2>4. Information Sharing</h2>
                        <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
                        <ul>
                            <li>Service providers who assist in our operations (e.g., payment processors, booking systems)</li>
                            <li>Professional advisors (e.g., accountants, lawyers) as required</li>
                            <li>Law enforcement when required by law</li>
                        </ul>

                        <h2>5. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal
                            information against unauthorized access, alteration, disclosure, or destruction. However,
                            no method of transmission over the Internet is 100% secure.
                        </p>

                        <h2>6. Your Rights (POPIA Compliance)</h2>
                        <p>Under the Protection of Personal Information Act (POPIA), you have the right to:</p>
                        <ul>
                            <li>Request access to your personal information</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your information</li>
                            <li>Object to the processing of your information</li>
                            <li>Withdraw consent at any time</li>
                            <li>Lodge a complaint with the Information Regulator</li>
                        </ul>

                        <h2>7. Cookies</h2>
                        <p>
                            Our website uses cookies to enhance your browsing experience. You can control cookie
                            settings through your browser. Essential cookies are required for the website to function properly.
                        </p>

                        <h2>8. Third-Party Links</h2>
                        <p>
                            Our website may contain links to third-party websites. We are not responsible for the
                            privacy practices of these external sites.
                        </p>

                        <h2>9. Children&apos;s Privacy</h2>
                        <p>
                            Our services are not directed to individuals under 18. We do not knowingly collect
                            personal information from children without parental consent.
                        </p>

                        <h2>10. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy periodically. Changes will be posted on this page
                            with an updated revision date.
                        </p>

                        <h2>11. Contact Us</h2>
                        <p>For questions about this Privacy Policy or to exercise your rights, contact us:</p>
                        <ul>
                            <li><strong>Email:</strong> {businessInfo.email}</li>
                            <li><strong>Phone:</strong> 012 111 1730</li>
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
