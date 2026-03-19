
import { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact Galeo Beauty Hartbeespoort | Book at Our Harties Salon",
    description: "Contact Galeo Beauty in Hartbeespoort (Harties). Call 012 111 1730 or WhatsApp 082 444 7389. Visit us at Shop 6, Landsmeer, Jan Smuts Rd near Hartbeespoort Dam. Book today.",
    keywords: [
        "contact galeo beauty hartbeespoort",
        "galeo beauty whatsapp",
        "galeo beauty phone number",
        "book beauty appointment hartbeespoort",
        "galeo beauty directions",
        "landsmeer hartbeespoort salon",
        "hartbeespoort salon contact",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/contact",
    },
    openGraph: {
        title: "Contact Galeo Beauty | Hartbeespoort Salon",
        description: "Get in touch with Galeo Beauty Harties. Call, WhatsApp, or visit our Landsmeer salon near Hartbeespoort Dam.",
        url: "https://www.galeobeauty.com/contact",
        type: "website",
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
