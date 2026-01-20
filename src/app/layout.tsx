import type { Metadata } from "next";
import { cormorant, montserrat } from "@/lib/fonts";
import { FloatingSocials } from "@/components/ui/floating-socials";
import { NavigationLoadingProvider } from "@/components/providers/NavigationLoadingProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://galeobeauty.com"),
  title: {
    default: "Galeo Beauty | Premium Skincare & Beauty Salon",
    template: "%s | Galeo Beauty",
  },
  description:
    "Experience luxury beauty treatments at Galeo Beauty. Premium skincare, facials, nail care, lash extensions, massage therapy and more at Hartbeespoort Dam.",
  keywords: [
    // Core Location Keywords
    "beauty salon",
    "skincare",
    "spa",
    "day spa",
    "beauty parlour",
    "Hartbeespoort",
    "Harties",
    "Hartbeespoort Dam",
    "Landsmeer Estate",

    // Pretoria & Gauteng Regional
    "Pretoria",
    "Pretoria beauty salon",
    "Pretoria spa",
    "beauty salon near Pretoria",
    "Gauteng",
    "Gauteng beauty salon",
    "Centurion",
    "Centurion beauty salon",
    "North West",
    "North West beauty salon",
    "Brits",
    "Brits beauty salon",
    "Magaliesburg",

    // Location + Service Combinations
    "beauty salon Hartbeespoort",
    "spa Hartbeespoort Dam",
    "day spa Hartbeespoort",
    "salon near Hartbeespoort",
    "beauty treatments Pretoria",
    "facials Pretoria",
    "facials Hartbeespoort",
    "lash extensions Pretoria",
    "nails Hartbeespoort",

    // Medical & Aesthetics
    "medical aesthetics",
    "aesthetic clinic",
    "fat freezing",
    "fat freezing Pretoria",
    "fat freezing Hartbeespoort",
    "cryolipolysis",
    "body contouring",
    "slimming treatment",
    "anti-wrinkle injections",
    "dermal fillers",
    "lip fillers",
    "Russian lip fillers",
    "Botox alternative",
    "microneedling",
    "dermaplaning",
    "chemical peels",
    "skin rejuvenation",
    "vaginal tightening",

    // Skin & Brands
    "Dermalogica",
    "Dermalogica facial",
    "Dermalogica salon",
    "QMS Medicosmetics",
    "facials",
    "professional facial",
    "anti-aging facial",
    "hydrating facial",
    "acne treatment",

    // Hair & Nails
    "hair salon",
    "hair salon Hartbeespoort",
    "Brazilian blowout",
    "keratin treatment",
    "hair extensions",
    "tape-in extensions",
    "balayage",
    "hair colour",
    "nail bar",
    "nail salon",
    "acrylic nails",
    "gel nails",
    "manicure",
    "pedicure",

    // Waxing & Hair Removal
    "waxing",
    "Brazilian wax",
    "Hollywood wax",
    "waxing salon",
    "IPL hair removal",
    "laser hair removal",
    "permanent hair removal",

    // Permanent Makeup & Lashes
    "permanent makeup",
    "microblading",
    "powder brows",
    "lash extensions",
    "volume lashes",
    "lash lift",
    "brow lamination",

    // Intent Keywords
    "best beauty salon near me",
    "best salon Pretoria",
    "affordable beauty treatments",
    "book beauty appointment",
    "walk-in salon",
    "pamper day",
    "spa day",
    "bridal makeup",
    "wedding beauty",

    // Luxury & Premium Keywords
    "luxury salon",
    "premium salon",
    "luxury beauty salon",
    "premium beauty salon",
    "luxury spa",
    "premium spa",
    "upmarket salon",
    "exclusive beauty salon",
    "boutique salon",
    "high-end salon",
    "luxury salon Pretoria",
    "luxury salon Hartbeespoort",
    "premium salon Pretoria",
    "premium salon Hartbeespoort",
    "luxury spa Pretoria",
    "exclusive spa Hartbeespoort",

    // Afrikaans Keywords (Local advantage)
    "skoonheidsalon",
    "skoonheidsalon Pretoria",
    "skoonheidsalon Hartbeespoort",
    "naels",
    "naelsalon",
    "gesigbehandeling",
    "haarverwydering",
    "permanente grimering",
    "wimper verlengings",
    "wenkbrou",
    "harsentwas",
    "spa naby my",
    "skoonheid",
    "vetsoeë behandeling",

    // Long-tail Question Keywords (High intent)
    "where to get lash extensions in Pretoria",
    "best facials near Hartbeespoort",
    "how much does fat freezing cost",
    "lip fillers price Pretoria",
    "wedding makeup artist Hartbeespoort",
    "bridal packages near me",
    "where to get microblading done",
    "best nail salon near me",
    "where to get Brazilian wax",
    "how much do lash extensions cost",

    // Seasonal & Event Keywords
    "matric ball makeup",
    "matric ball hair",
    "matric dance makeup artist",
    "matric farewell makeup",
    "wedding season specials",
    "bridal beauty packages",
    "Valentine's Day pamper",
    "Valentine's Day spa",
    "Mother's Day spa gift",
    "Mother's Day pamper package",
    "Christmas beauty specials",
    "festive season beauty",
    "year-end function makeup",

    // Problem-based Keywords
    "acne scar treatment",
    "acne treatment Pretoria",
    "anti-aging clinic near me",
    "wrinkle treatment",
    "stubborn fat removal",
    "double chin treatment",
    "skin pigmentation treatment",
    "sun damage treatment",
    "damaged hair repair",
    "dry skin treatment",
    "oily skin treatment",
    "sensitive skin facial",
    "ingrown hair treatment",
    "stretch mark treatment",
    "cellulite treatment",

    // Price-intent Keywords
    "affordable beauty salon Pretoria",
    "cheap lash extensions near me",
    "budget-friendly spa",
    "beauty specials Hartbeespoort",
    "salon deals near me",
    "discount beauty treatments",
  ],
  authors: [{ name: "Galeo Beauty" }],
  creator: "Galeo Beauty",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://galeobeauty.com",
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
              image: "https://galeobeauty.com/images/logo.png",
              "@id": "https://galeobeauty.com",
              url: "https://galeobeauty.com",
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
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "302",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
        {/* FAQ Schema for Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How much does fat freezing cost in South Africa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Fat freezing (cryolipolysis) at Galeo Beauty costs R799.20 per session. We use CE-approved equipment for safe, non-invasive body contouring with no downtime.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the best facial for anti-aging?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our QMS Collagen Facial and Dermalogica Pro Firm Treatment are excellent for anti-aging. They boost collagen production, reduce fine lines, and improve skin elasticity. Prices start from R799.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long do lash extensions last?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Lash extensions typically last 2-4 weeks depending on your natural lash cycle. We recommend fills every 2-3 weeks to maintain a full look. Full sets start from R450.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is IPL hair removal permanent?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "IPL provides permanent hair reduction, not complete removal. Most clients see 70-90% reduction after 6-8 sessions. Our CE-approved IPL treatments start from R270.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is microblading and how long does it last?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Microblading is a semi-permanent eyebrow technique using fine strokes to create natural-looking brows. Results last 12-18 months. Our microblading service costs R1,350.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between powder brows and microblading?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Microblading creates hair-like strokes for a natural look, while powder brows give a soft, filled-in makeup appearance. Powder brows last longer (2-3 years) and work better on oily skin. Powder brows cost R1,710.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much does lip filler cost in Pretoria?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "At Galeo Beauty near Pretoria, dermal lip fillers cost R2,800 for 1ml. Russian lip fillers, which create a more defined shape, cost R3,000 for 1ml.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What treatments help with acne scars?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We recommend microneedling (R1,620), chemical peels (R809), or our Pro Power Peel (R1,100) for acne scars. These treatments stimulate collagen production and improve skin texture.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you offer bridal makeup packages?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! Our bridal makeup service costs R1,620 and includes professional Kryolan makeup application. We recommend a trial session before your wedding day.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where is Galeo Beauty located?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We are located at Shop 6, Landsmeer Estate, Jan Smuts Ave, Hartbeespoort Dam. We're a 45-minute drive from Pretoria and easily accessible from Johannesburg, Centurion, and surrounding areas.",
                  },
                },
              ],
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
