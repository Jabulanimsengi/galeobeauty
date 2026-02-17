
import { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact Galeo Beauty | Book Your Appointment",
    description: "Get in touch with Galeo Beauty Salon in Hartbeespoort. Call 012 111 1730 or visit us at Shop 6, Landsmeer, Jan Smuts Rd. Book your luxury treatment today.",
    alternates: {
        canonical: "https://www.galeobeauty.com/contact",
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
