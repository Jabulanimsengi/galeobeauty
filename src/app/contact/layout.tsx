import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Galeo Beauty | Book Appointments, Location & Hours",
    description: "Get in touch with Galeo Beauty in Hartbeespoort. Book via WhatsApp or phone. Located at Landsmeer Estate, open Mon-Fri 8am-6pm, Sat 8am-4pm. Walk-ins welcome.",
    keywords: [
        "contact galeo beauty",
        "book beauty appointment hartbeespoort",
        "galeo beauty phone number",
        "galeo beauty location",
        "galeo beauty opening hours",
        "beauty salon hartbeespoort contact",
        "landsmeer estate salon",
        "walk-in salon hartbeespoort",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/contact",
    },
    openGraph: {
        title: "Contact Galeo Beauty | Book Appointments & Location",
        description: "Book your appointment at Galeo Beauty. Landsmeer Estate, Hartbeespoort. WhatsApp, phone, or walk-in.",
        url: "https://www.galeobeauty.com/contact",
        type: "website",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
