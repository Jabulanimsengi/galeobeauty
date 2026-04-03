import { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
    title: "About the Salon, Reviews & Team in Hartbeespoort",
    description: "Meet Dandi Meyer and the Galeo Beauty team in Hartbeespoort and learn why clients trust our hair, nails, skin, beauty, and advanced aesthetics services at Landsmeer Estate.",
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
        title: "About the Salon, Reviews & Team in Hartbeespoort",
        description: "Meet the team behind Galeo Beauty in Hartbeespoort and learn more about the client care and trusted reputation behind the salon.",
        url: "https://www.galeobeauty.com/about",
        type: "website",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
