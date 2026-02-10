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
                    text: "We are located at Shop 6, Landsmeer, Jan Smuts Rd, Hartbeespoort, 0216, North West, South Africa. We're a 45-minute drive from Pretoria and easily accessible from Johannesburg, Centurion, and surrounding areas.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much does a Brazilian wax cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Brazilian waxing at Galeo Beauty costs R279. We also offer Hollywood waxing (complete hair removal) for R315. Our therapists use premium wax and gentle techniques.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the Tesla EMS slimming treatment?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tesla EMS uses High-Intensity Focused Electromagnetic technology to build muscle and burn fat simultaneously. It's like doing 20,000 sit-ups in 30 minutes! Sessions cost R450-R720.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you offer hair extensions?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! We offer premium European Remy human hair extensions including tape-in, clip-in, micro loop, keratin bonds, and halo extensions. Prices start from R2,500 for clip-ins.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much does a gel manicure cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Gel manicures at Galeo Beauty cost R315. We also offer acrylic full sets from R450, nail art, and spa pedicures. Our nail technicians create stunning, long-lasting results.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What skincare brands do you use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We use Dermalogica and QMS Medicosmetics - two of the world's leading professional skincare brands. Both are known for their effective, science-backed formulations.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you offer matric ball makeup?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! Matric ball makeup costs R594 and includes professional application with long-lasting Kryolan products. We also offer hair styling and lash services for your special night.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can men get treatments at Galeo Beauty?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely! We welcome all clients. Popular treatments for men include facials, IPL hair removal, waxing (back, chest), massages, and grooming services.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you offer couples treatments?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! We can accommodate couples for side-by-side massages and treatments. Contact us to arrange a couples spa day or romantic pamper package.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are your opening hours?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We're open Monday to Friday 8am-6pm and Saturday 8am-4pm. We're closed on Sundays. We recommend booking in advance, especially for weekends.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you accept walk-ins?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, walk-ins are welcome subject to availability! However, we recommend booking in advance to secure your preferred time, especially for longer treatments.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I book an appointment?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can book via WhatsApp, phone (012 111 1730), or walk in. WhatsApp is the quickest way to book - just message us with your desired treatment and preferred time.",
                  },
                },
                // Local SEO Questions
                {
                  "@type": "Question",
                  name: "What is the best beauty salon near Pretoria?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Galeo Beauty in Hartbeespoort is rated one of the top beauty salons near Pretoria with a 4.9 star rating and over 300 reviews. We're just 45 minutes from Pretoria and offer premium treatments including Dermalogica facials, lash extensions, and medical aesthetics.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which is the top rated beauty salon in Hartbeespoort?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Galeo Beauty is the top rated beauty salon in Hartbeespoort with a 4.9 star Google rating. Located at Landsmeer Estate by Hartbeespoort Dam, we offer over 100 beauty treatments from facials to fat freezing.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there a good spa near Johannesburg for a day trip?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Galeo Beauty in Hartbeespoort is perfect for a spa day trip from Johannesburg. Located by Hartbeespoort Dam, it's about an hour's scenic drive and offers a tranquil escape with premium beauty and spa treatments.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where can I get fat freezing treatment in Gauteng?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Galeo Beauty offers professional fat freezing (cryolipolysis) treatments at R799.20 per session. We serve clients from across Gauteng including Pretoria, Johannesburg, Centurion, and Midrand. Our CE-approved equipment ensures safe, effective body contouring.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the best facial treatments available near Centurion?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Galeo Beauty near Centurion offers premium Dermalogica and QMS Medicosmetics facials. Our best-sellers include the QMS Collagen Facial, Dermalogica Pro Power Peel, and Age Bright Clearing Facial for acne. Prices range from R550 to R1,100.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there a salon open on Saturday near Pretoria?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! Galeo Beauty is open on Saturdays from 8am to 4pm. We're located in Hartbeespoort, a scenic 45-minute drive from Pretoria. Book via WhatsApp for same-day appointments.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Who has the best lash extensions in Pretoria area?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Galeo Beauty is known for premium lash extensions serving the Pretoria area. We offer Classic, Hybrid, and Russian Volume lashes with full sets starting from R450. Our experienced technicians create natural-looking, long-lasting results.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What beauty treatments are popular in Hartbeespoort?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Popular treatments at Galeo Beauty in Hartbeespoort include Dermalogica facials, lash extensions, gel manicures, Brazilian waxing, fat freezing, and massage therapy. We're the go-to salon for both locals and day-trippers from Pretoria and Johannesburg.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are there any highly rated nail salons near Hartbeespoort?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Galeo Beauty is a 5-star rated salon in Hartbeespoort offering full nail services including gel manicures (R315), acrylic full sets (R450), pedicures, and nail art. We use premium products for long-lasting, beautiful results.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where can I get microblading done near Pretoria?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Galeo Beauty offers professional microblading for R1,350 serving clients from Pretoria, Centurion, and surrounding areas. We also offer powder brows (R1,710) and combination brows for semi-permanent eyebrow enhancement.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the best day spa near Hartbeespoort Dam?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Galeo Beauty at Landsmeer Estate is the premier day spa near Hartbeespoort Dam. With a 4.9 star rating, we offer a full range of spa treatments including massages, facials, body treatments, and beauty services in a tranquil lakeside setting.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there a medical aesthetics clinic near Pretoria?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Galeo Beauty offers medical aesthetics including dermal fillers, anti-wrinkle treatments, and fat freezing. We're located in Hartbeespoort, serving clients from Pretoria, Centurion, Midrand, and Johannesburg. All treatments are administered by qualified professionals.",
                  },
                },
              ],
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
