import { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
    title: "About Galeo Beauty | Hartbeespoort Hair, Nails & Beauty Salon",
    description: "Meet Dandi Meyer and the Galeo Beauty team in Hartbeespoort. Learn about our hair salon, nail salon, beauty treatments, Hart Aesthetics services and trusted client reviews near Hartbeespoort Dam.",
    keywords: [
        "about Galeo Beauty Hartbeespoort",
        "beauty salon Harties",
        "Galeo Beauty reviews",
        "Galeo Hartbeespoort reviews",
        "Hart Aesthetics Hartbeespoort",
        "Dandi Meyer Galeo Beauty",
        "salon Hartbeespoort Dam",
        "medical spa near Pretoria",
        "beauty team Harties",
        "Landsmeer salon Hartbeespoort",
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
