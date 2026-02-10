import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prices & Treatment Menu | Galeo Beauty Hartbeespoort",
  description:
    "View our full price list for 260+ beauty treatments at Galeo Beauty in Hartbeespoort. Facials from R490, IPL from R270, nails, lashes, permanent makeup, injectables, body contouring & more.",
  keywords: [
    "beauty salon prices Hartbeespoort",
    "facial prices near me",
    "IPL hair removal cost Hartbeespoort",
    "nail salon prices Hartbeespoort",
    "lash extension prices near me",
    "permanent makeup cost Hartbeespoort",
    "dermal filler prices South Africa",
    "body contouring cost near me",
    "Galeo Beauty price list",
    "affordable beauty treatments Hartbeespoort",
  ],
  alternates: {
    canonical: "https://www.galeobeauty.com/prices",
  },
  openGraph: {
    title: "Prices & Treatment Menu | Galeo Beauty Hartbeespoort",
    description:
      "Full price list for 260+ beauty treatments in Hartbeespoort. Facials, IPL, nails, lashes, permanent makeup & more.",
    url: "https://www.galeobeauty.com/prices",
    type: "website",
  },
};

export default function PricesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
