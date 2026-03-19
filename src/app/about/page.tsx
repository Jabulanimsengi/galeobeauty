import { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
    title: "About Galeo Beauty | Hartbeespoort Hair, Nails & Beauty Salon",
    description: "Meet Dandi Meyer and the Galeo Beauty team in Hartbeespoort. Learn about our hair salon, nail salon, beauty treatments, Hart Aesthetics services and trusted client reviews near Hartbeespoort Dam.",
    keywords: [
        "about galeo beauty hartbeespoort",
        "galeo beauty harties",
        "galeo beauty reviews",
        "dandi meyer galeo beauty",
        "galeo beauty team",
        "hart aesthetics hartbeespoort",
        "landsmeer salon hartbeespoort",
        "beauty salon hartbeespoort story",
        "hair nails beauty hartbeespoort",
    ],
    alternates: {
        canonical: "https://www.galeobeauty.com/about",
    },
    openGraph: {
        title: "About Galeo Beauty | Hartbeespoort Hair, Nails & Beauty Salon",
        description: "Meet the team behind Galeo Beauty in Hartbeespoort, including our hair, nails, beauty and Hart Aesthetics offering plus trusted client reviews.",
        url: "https://www.galeobeauty.com/about",
        type: "website",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
