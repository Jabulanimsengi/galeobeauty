import { Metadata } from "next";
import { generateBreadcrumbSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
    title: "Contact Galeo Beauty | Book Appointments, Location & Hours",
    description: "Get in touch with Galeo Beauty in Hartbeespoort. Book via WhatsApp or phone. Shop 6, Landsmeer, Jan Smuts Rd, Hartbeespoort, 0216. Open Mon-Fri 8am-6pm, Sat 8am-4pm. Walk-ins welcome.",
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
        description: "Book your appointment at Galeo Beauty. Shop 6, Landsmeer, Jan Smuts Rd, Hartbeespoort. WhatsApp, phone, or walk-in.",
        url: "https://www.galeobeauty.com/contact",
        type: "website",
    },
};

const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.galeobeauty.com" },
    { name: "Contact", url: "https://www.galeobeauty.com/contact" },
]);

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
