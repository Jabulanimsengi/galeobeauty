import { Metadata } from "next";
import { buildServicesPageKeywords } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "Services & Treatment Menu in Hartbeespoort",
  description:
    "View the full service menu for 260+ beauty treatments at Galeo Beauty in Hartbeespoort. Facials, IPL, nails, lashes, permanent makeup, injectables, body contouring & more.",
  keywords: buildServicesPageKeywords(),
  alternates: {
    canonical: "https://www.galeobeauty.com/services",
  },
  openGraph: {
    title: "Services & Treatment Menu in Hartbeespoort",
    description:
      "Full service menu for 260+ beauty treatments in Hartbeespoort. Facials, IPL, nails, lashes, permanent makeup & more.",
    url: "https://www.galeobeauty.com/services",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
