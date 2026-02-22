
import { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
    title: "About Galeo Beauty | Premier Beauty Salon in Hartbeespoort (Harties)",
    description: "Meet Dandi Meyer and the Galeo Beauty team in Hartbeespoort. 16 specialist treatment categories — facials, injectables, body contouring, permanent makeup, nails, hair & more at our Harties salon near Hartbeespoort Dam.",
    keywords: [
        "about Galeo Beauty Hartbeespoort",
        "beauty salon Harties",
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
        title: "About Galeo Beauty | Premier Beauty Salon in Hartbeespoort",
        description: "Meet the expert team at Galeo Beauty Harties. 16 specialist categories — facials, injectables, body contouring, permanent makeup & more.",
        url: "https://www.galeobeauty.com/about",
        type: "website",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
