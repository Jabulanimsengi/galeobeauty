import type { Metadata } from "next";
import { cormorant, montserrat } from "@/lib/fonts";
import { FloatingSocials } from "@/components/ui/floating-socials";
import { NavigationLoadingProvider } from "@/components/providers/NavigationLoadingProvider";
import { AGGREGATE_RATING } from "@/lib/reviews-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.galeobeauty.com"),
  title: {
    default: "Galeo Beauty Hartbeespoort | Beauty Salon & Spa Harties",
    template: "%s | Galeo Beauty Hartbeespoort",
  },
  description:
    "Premium beauty salon in Hartbeespoort (Harties), near Hartbeespoort Dam. Skincare, facials, injectables, IPL, nails, lashes, waxing, hair & more. Serving Harties Village, Centurion & Pretoria, North West.",

  keywords: [
    "beauty salon Hartbeespoort",
    "beauty salon Harties",
    "spa near Hartbeespoort Dam",
    "Harties Dam beauty salon",
    "Galeo Beauty",
    "beauty treatments Harties Village",
    "salon near Centurion",
    "salon near Pretoria",
    "beauty salon North West",
    "Hartbeespoort Dam area salon",
    "beauty treatments around Harties",
    "best beauty salon Hartbeespoort",
    "facials nails lashes Harties",
    "day spa Hartbeespoort Dam",
    "skoonheidsalon Hartbeespoort",
    "massage spa Hartbeespoort",
    "permanent makeup Harties",
    "fat freezing clinic North West",
    "chemical peel near me",
    "laser hair removal Hartbeespoort",
    "bridal makeup artist Harties",
    "dermal fillers Hartbeespoort",
    "anti-aging treatments Harties",
    "gel nails and acrylics Hartbeespoort",
    "best lash extensions Harties"
  ],
  authors: [{ name: "Galeo Beauty" }],
  creator: "Galeo Beauty",
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.png?v=2", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png?v=2", type: "image/png" },
    ],
    shortcut: "/favicon.svg?v=2",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://www.galeobeauty.com",
    siteName: "Galeo Beauty",
    title: "Galeo Beauty Hartbeespoort | Beauty Salon & Spa Harties",
    description:
      "Premium beauty salon in Hartbeespoort (Harties), near Hartbeespoort Dam. Skincare, facials, nails, lashes & more. Serving Centurion & Pretoria.",
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
    title: "Galeo Beauty Hartbeespoort | Beauty Salon & Spa Harties",
    description:
      "Premium beauty salon in Hartbeespoort (Harties), near Hartbeespoort Dam. Facials, nails, lashes & more.",
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
              image: "https://www.galeobeauty.com/images/logo.png",
              logo: "https://www.galeobeauty.com/images/logo.png",
              "@id": "https://www.galeobeauty.com",
              url: "https://www.galeobeauty.com",
              telephone: "+27121111730",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Shop 6, Landsmeer, Jan Smuts Rd",
                addressLocality: "Hartbeespoort",
                addressRegion: "North West",
                postalCode: "0216",
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
              areaServed: [
                { "@type": "City", name: "Hartbeespoort" },
                { "@type": "City", name: "Harties" },
                { "@type": "City", name: "Centurion" },
                { "@type": "City", name: "Pretoria" },
                { "@type": "City", name: "Johannesburg" },
                { "@type": "AdministrativeArea", name: "North West Province" },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ...AGGREGATE_RATING,
              },
            }),
          }}
        />

        {/* Organization Schema for AI/Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Galeo Beauty",
              alternateName: ["Galeo Beauty Salon", "Galeo Spa", "Galeo Beauty Hartbeespoort"],
              url: "https://www.galeobeauty.com",
              logo: "https://www.galeobeauty.com/images/logo.png",
              description: "Premium beauty salon and spa in Hartbeespoort Dam offering facials, lash extensions, nail care, fat freezing, medical aesthetics, and over 100 beauty treatments. Serving Pretoria, Johannesburg, Centurion, and Gauteng.",
              foundingDate: "2020",
              areaServed: [
                { "@type": "City", name: "Hartbeespoort" },
                { "@type": "City", name: "Pretoria" },
                { "@type": "City", name: "Johannesburg" },
                { "@type": "City", name: "Centurion" },
                { "@type": "City", name: "Midrand" },
                { "@type": "State", name: "Gauteng" },
                { "@type": "State", name: "North West" },
              ],
              sameAs: [
                "https://www.facebook.com/galeobeauty",
                "https://www.instagram.com/galeobeauty",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+27121111730",
                contactType: "reservations",
                availableLanguage: ["English", "Afrikaans"],
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Beauty & Spa Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fat Freezing Hartbeespoort", url: "https://www.galeobeauty.com/prices/fat-freezing" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Medical Aesthetics Hartbeespoort", url: "https://www.galeobeauty.com/prices/hart-aesthetics" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Permanent Makeup Hartbeespoort", url: "https://www.galeobeauty.com/prices/permanent-makeup" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "IPL Hair Removal Hartbeespoort", url: "https://www.galeobeauty.com/prices/ipl" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Clinical Skin Treatments Hartbeespoort", url: "https://www.galeobeauty.com/prices/medical" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laser Hair Removal Hartbeespoort", url: "https://www.galeobeauty.com/prices/ipl" } },
                  { "@type": "OfferCatalog", name: "Facials & Skincare", description: "Dermalogica and QMS professional facials" },
                  { "@type": "OfferCatalog", name: "Lash & Brow Services", description: "Extensions, lifts, tints, and microblading" },
                  { "@type": "OfferCatalog", name: "Nail Services", description: "Manicures, pedicures, gel, and acrylic nails" },
                ],
              },
            }),
          }}
        />
        {/* WebSite Schema with SearchAction for AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Galeo Beauty",
              url: "https://www.galeobeauty.com",
              description: "Top rated beauty salon in Hartbeespoort Dam serving Pretoria, Johannesburg and Gauteng with premium skincare, facials, lashes, nails, and medical aesthetics.",
              publisher: {
                "@type": "Organization",
                name: "Galeo Beauty",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.galeobeauty.com/images/logo.png"
                }
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.galeobeauty.com/prices?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">


        <NavigationLoadingProvider>
          {children}
          <FloatingSocials />
        </NavigationLoadingProvider>
      </body>
    </html>
  );
}
