
import { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact Galeo Beauty | Hartbeespoort Salon Details",
    description: "Contact Galeo Beauty in Hartbeespoort. Call, WhatsApp, or visit our salon at Shop 6, Landsmeer, Jan Smuts Rd near Hartbeespoort Dam.",
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
        description: "Get in touch with Galeo Beauty in Hartbeespoort. Call, WhatsApp, or visit our Landsmeer salon near Hartbeespoort Dam.",
        url: "https://www.galeobeauty.com/contact",
        type: "website",
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
