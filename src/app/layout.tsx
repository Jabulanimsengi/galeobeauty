import type { Metadata } from "next";
import { cormorant, montserrat } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://galeobeauty.co.za"),
  title: {
    default: "Galeo Beauty | Premium Skincare & Beauty Salon",
    template: "%s | Galeo Beauty",
  },
  description:
    "Experience luxury beauty treatments at Galeo Beauty. Premium skincare, facials, nail care, lash extensions, massage therapy and more at Hartbeespoort Dam.",
  keywords: [
    "beauty salon",
    "skincare",
    "facials",
    "nail care",
    "lash extensions",
    "massage",
    "Hartbeespoort",
    "spa",
  ],
  authors: [{ name: "Galeo Beauty" }],
  creator: "Galeo Beauty",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://galeobeauty.co.za",
    siteName: "Galeo Beauty",
    title: "Galeo Beauty | Premium Skincare & Beauty Salon",
    description:
      "Experience luxury beauty treatments at Galeo Beauty. Premium skincare, facials, nail care, and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Galeo Beauty Salon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeo Beauty | Premium Skincare & Beauty Salon",
    description:
      "Experience luxury beauty treatments at Galeo Beauty. Premium skincare, facials, nail care, and more.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        {/* JSON-LD Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              name: "Galeo Beauty",
              image: "https://galeobeauty.co.za/images/logo.png",
              "@id": "https://galeobeauty.co.za",
              url: "https://galeobeauty.co.za",
              telephone: "+27121111730",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Shop 6, Landsmeer Estate, Jan Smuts Ave",
                addressLocality: "Hartbeespoort Dam",
                addressRegion: "North West",
                postalCode: "",
                addressCountry: "ZA",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "08:00",
                  closes: "16:00",
                },
              ],
              priceRange: "$$",
              servesCuisine: undefined,
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
