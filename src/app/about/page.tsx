
import { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
    title: "About Galeo Beauty | Luxury Salon & Spa in Hartbeespoort",
    description: "Meet Dandi Meyer and the expert team at Galeo Beauty. Combining medical precision with luxury aesthetics to deliver results-driven beauty treatments in Hartbeespoort.",
    alternates: {
        canonical: "https://www.galeobeauty.com/about",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
