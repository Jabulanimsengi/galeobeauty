import type { Metadata } from "next";
import Script from "next/script";
import { cormorant, montserrat } from "@/lib/fonts";
import { AttributionTracker } from "@/components/providers/AttributionTracker";
import { NavigationLoadingProvider } from "@/components/providers/NavigationLoadingProvider";
import { AppBootLoader } from "@/components/providers/AppBootLoader";
import { DeferredFloatingSocials } from "@/components/ui/DeferredFloatingSocials";
import { AGGREGATE_RATING } from "@/lib/reviews-data";
import { buildGlobalKeywords, buildOfferCatalogEntries } from "@/lib/seo-keywords";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-8JRBY6T1GQ";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.galeobeauty.com"),
  title: {
    default: "Galeo Beauty | Premium Salon & Medical Aesthetics in Hartbeespoort",
    template: "%s | Galeo Beauty Hartbeespoort",
  },
  description:
    "Premium hair, nails, facials, massage, body treatments, and medical aesthetics in Hartbeespoort at Galeo Beauty.",

  keywords: buildGlobalKeywords(),
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
    title: "Galeo Beauty | Premium Salon & Medical Aesthetics in Hartbeespoort",
    description:
      "A refined Hartbeespoort beauty destination for hair, nails, facials, massage, body treatments, and advanced aesthetics.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Galeo Beauty Salon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeo Beauty | Premium Salon & Medical Aesthetics in Hartbeespoort",
    description:
      "A refined Hartbeespoort beauty destination for hair, nails, facials, massage, body treatments, and advanced aesthetics.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
              description: "Galeo Beauty is a premium Hartbeespoort salon offering hair, nails, facials, massage, body treatments, and medical aesthetics.",
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
                itemListElement: buildOfferCatalogEntries(),
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
              description: "Galeo Beauty is a premium Hartbeespoort salon for skincare, hair, nails, massage, body treatments, and advanced aesthetics.",
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        <NavigationLoadingProvider>
          <AttributionTracker />
          <AppBootLoader />
          {children}
          <DeferredFloatingSocials />
        </NavigationLoadingProvider>
      </body>
    </html>
  );
}
