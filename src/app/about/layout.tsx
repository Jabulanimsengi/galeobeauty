import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Galeo Beauty | Our Story, Team & Salon in Hartbeespoort",
    description: "Meet the team behind Galeo Beauty. Founded in 2020, our Hartbeespoort salon delivers premium skincare, medical aesthetics, and luxury beauty treatments with qualified therapists.",
    keywords: [
        "about galeo beauty",
        "galeo beauty story",
        "beauty salon hartbeespoort",
        "galeo beauty team",
        "beauty therapists hartbeespoort",
        "premium salon south africa",
        "hartbeespoort dam salon",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/about",
    },
    openGraph: {
        title: "About Galeo Beauty | Our Story & Team",
        description: "Meet the team behind Galeo Beauty. Premium skincare, medical aesthetics, and luxury beauty treatments in Hartbeespoort.",
        url: "https://www.galeobeauty.com/about",
        type: "website",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
