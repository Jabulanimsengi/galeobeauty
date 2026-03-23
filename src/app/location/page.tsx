import type { Metadata } from "next";
import { LocationClient } from "./LocationClient";

export const metadata: Metadata = {
    title: "Visit Galeo Beauty | Salon Location in Hartbeespoort",
    description:
        "Find Galeo Beauty in Hartbeespoort. View our salon location, address, opening hours, and map directions to Landsmeer Estate.",
    alternates: {
        canonical: "https://www.galeobeauty.com/location",
    },
    openGraph: {
        title: "Visit Galeo Beauty | Hartbeespoort Salon Location",
        description:
            "View Galeo Beauty's salon location, address, and map directions in Hartbeespoort.",
        url: "https://www.galeobeauty.com/location",
        type: "website",
    },
};

export default function LocationPage() {
    return <LocationClient />;
}
