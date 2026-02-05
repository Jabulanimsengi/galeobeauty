import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Careers at Galeo Beauty | Join Our Team in Hartbeespoort",
    description: "Join the Galeo Beauty team. We're hiring beauty therapists, aestheticians, nail technicians, and stylists at our Hartbeespoort salon. Apply today!",
    keywords: [
        "beauty salon jobs hartbeespoort",
        "aesthetician jobs south africa",
        "beauty therapist vacancies",
        "nail technician jobs",
        "galeo beauty careers",
        "salon jobs north west",
        "beauty industry careers",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/careers",
    },
    openGraph: {
        title: "Careers at Galeo Beauty | Join Our Team",
        description: "Join the Galeo Beauty team in Hartbeespoort. Beauty therapist, aesthetician, and stylist positions available.",
        url: "https://www.galeobeauty.com/careers",
        type: "website",
    },
};

export default function CareersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
