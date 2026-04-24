import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Beauty Products",
  description:
    "Shop curated skincare, haircare, nail care, and body products from Dermalogica, Olaplex, QMS and more at Galeo Beauty, Hartbeespoort.",
  alternates: {
    canonical: "https://www.galeobeauty.com/shop",
  },
  openGraph: {
    title: "Shop Beauty Products | Galeo Beauty",
    description:
      "Browse and buy premium beauty products from Galeo Beauty in Hartbeespoort.",
    url: "https://www.galeobeauty.com/shop",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
