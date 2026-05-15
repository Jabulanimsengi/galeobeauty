
import { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { generateBreadcrumbSchema } from "@/lib/schema-utils";

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
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://www.galeobeauty.com" },
        { name: "Contact", url: "https://www.galeobeauty.com/contact" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ContactClient />
        </>
    );
}
