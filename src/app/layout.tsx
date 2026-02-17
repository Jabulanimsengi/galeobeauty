import type { Metadata } from "next";
import { cormorant, montserrat } from "@/lib/fonts";
import { FloatingSocials } from "@/components/ui/floating-socials";
import { NavigationLoadingProvider } from "@/components/providers/NavigationLoadingProvider";
import { AGGREGATE_RATING } from "@/lib/reviews-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.galeobeauty.com"),
  title: {
    default: "Galeo Beauty | Premium Skincare & Beauty Salon",
    template: "%s | Galeo Beauty",
  },
  description:
    "Experience luxury beauty treatments at Galeo Beauty. Premium skincare, facials, nail care, lash extensions, massage therapy and more at Hartbeespoort Dam.",

  keywords: [
    "beauty salon Hartbeespoort",
    "spa Hartbeespoort Dam",
    "Galeo Beauty",
    "skoonheidsalon Hartbeespoort",
    "beauty treatments near me",
    "day spa Hartbeespoort",
    "salon Landsmeer Estate",
    "beauty salon near Pretoria",
    "best beauty salon Hartbeespoort",
    "facials nails lashes Hartbeespoort",
    "luxury spa Gauteng",
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
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Body Contouring Hartbeespoort", url: "https://www.galeobeauty.com/body-contouring" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Anti-Aging Treatments", url: "https://www.galeobeauty.com/anti-aging" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Permanent Makeup Hartbeespoort", url: "https://www.galeobeauty.com/permanent-makeup" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Medical Spa Treatments", url: "https://www.galeobeauty.com/medical-spa" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bridal Beauty Packages", url: "https://www.galeobeauty.com/bridal-beauty" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laser Hair Removal Hartbeespoort", url: "https://www.galeobeauty.com/laser-hair-removal" } },
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
