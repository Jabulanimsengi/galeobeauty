import { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
    title: "About Galeo Beauty | Hartbeespoort Salon & Medical Aesthetics",
    description: "Meet Dandi Meyer and the Galeo Beauty team in Hartbeespoort. Learn about our approach to hair, nails, skin, beauty, and advanced aesthetics at Landsmeer Estate.",
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
        title: "About Galeo Beauty | Hartbeespoort Salon & Medical Aesthetics",
        description: "Meet the team behind Galeo Beauty in Hartbeespoort and learn more about our refined treatment approach and client care.",
        url: "https://www.galeobeauty.com/about",
        type: "website",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
