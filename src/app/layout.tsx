import type { Metadata } from "next";
import { cormorant, montserrat } from "@/lib/fonts";
import { FloatingSocials } from "@/components/ui/floating-socials";
import { NavigationLoadingProvider } from "@/components/providers/NavigationLoadingProvider";
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
    "Johannesburg beauty salon",
    "Sandton spa",
    "Midrand beauty salon",

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
    "fat freezing South Africa",
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
    "non-surgical facelift",
    "skin tightening treatment",
    "collagen induction therapy",

    // Body Contouring & Slimming
    "body sculpting",
    "inch loss treatment",
    "tummy slimming",
    "arm fat treatment",
    "thigh slimming",
    "bra bulge treatment",
    "love handle removal",
    "non-surgical liposuction",
    "body tightening",
    "skin firming treatment",
    "post-pregnancy body treatment",
    "mommy makeover non-surgical",
    "EMS body sculpting",
    "muscle toning treatment",
    "bum lift non-surgical",
    "Tesla slimming",

    // Skin & Brands
    "Dermalogica",
    "Dermalogica facial",
    "Dermalogica salon",
    "Dermalogica stockist",
    "QMS Medicosmetics",
    "QMS facial",
    "QMS stockist",
    "facials",
    "professional facial",
    "anti-aging facial",
    "hydrating facial",
    "acne treatment",
    "LED light therapy",
    "red light therapy",
    "blue light therapy",
    "oxygen facial",
    "glass skin facial",
    "Korean skincare",
    "K-beauty facial",

    // Skincare Concerns
    "rosacea treatment",
    "dark circles treatment",
    "eye bag treatment",
    "hyperpigmentation treatment",
    "melasma treatment",
    "age spots removal",
    "sun spots treatment",
    "blackhead removal",
    "enlarged pores treatment",
    "uneven skin tone treatment",
    "dull skin treatment",
    "dehydrated skin treatment",
    "fine lines treatment",
    "crow's feet treatment",
    "forehead lines treatment",
    "frown lines treatment",
    "neck wrinkles treatment",

    // Hair Services
    "hair salon",
    "hair salon Hartbeespoort",
    "Brazilian blowout",
    "keratin treatment",
    "hair extensions",
    "tape-in extensions",
    "clip-in extensions",
    "micro loop extensions",
    "keratin bond extensions",
    "halo hair extensions",
    "Remy human hair",
    "balayage",
    "hair colour",
    "highlights",
    "lowlights",
    "babylights",
    "ombre hair",
    "colour correction",
    "blonde specialist",
    "grey coverage",
    "root touch up",
    "deep conditioning treatment",
    "protein treatment",
    "Olaplex treatment",
    "bond repair treatment",
    "scalp treatment",
    "hair growth treatment",
    "thinning hair treatment",

    // Nail Services
    "nail bar",
    "nail salon",
    "acrylic nails",
    "gel nails",
    "manicure",
    "pedicure",
    "nail art",
    "ombre nails",
    "French tip nails",
    "chrome nails",
    "glitter nails",
    "matte nails",
    "stiletto nails",
    "coffin nails",
    "almond nails",
    "SNS nails",
    "dip powder nails",
    "polygel nails",
    "builder gel nails",
    "BIAB nails",
    "Russian manicure",
    "nail repair",
    "nail strengthening",
    "gel removal",
    "acrylic removal",
    "infills",

    // Waxing & Hair Removal
    "waxing",
    "Brazilian wax",
    "Hollywood wax",
    "waxing salon",
    "IPL hair removal",
    "laser hair removal",
    "permanent hair removal",
    "full body wax",
    "leg waxing",
    "arm waxing",
    "underarm waxing",
    "facial waxing",
    "upper lip wax",
    "eyebrow wax",
    "bikini wax",
    "mens waxing",
    "back wax men",
    "chest wax",

    // Permanent Makeup
    "permanent makeup",
    "microblading",
    "powder brows",
    "ombre brows",
    "combination brows",
    "nano brows",
    "lip blush",
    "lip liner tattoo",
    "full lip colour tattoo",
    "permanent eyeliner",
    "beauty spot tattoo",
    "freckle tattoo",
    "PMU touch up",
    "permanent makeup correction",
    "scar camouflage",

    // Lashes & Brows
    "lash extensions",
    "volume lashes",
    "mega volume lashes",
    "Russian volume lashes",
    "classic lashes",
    "hybrid lashes",
    "wispy lashes",
    "cat eye lashes",
    "doll eye lashes",
    "lash lift",
    "lash tint",
    "lash removal",
    "brow lamination",
    "brow tint",
    "brow wax",
    "brow threading",
    "brow sculpting",
    "henna brows",

    // Massage & Body Treatments
    "massage therapy",
    "Swedish massage",
    "deep tissue massage",
    "hot stone massage",
    "aromatherapy massage",
    "couples massage",
    "pregnancy massage",
    "prenatal massage",
    "sports massage",
    "relaxation massage",
    "full body massage",
    "back massage",
    "neck and shoulder massage",
    "foot massage",
    "reflexology",
    "body wrap",
    "body scrub",
    "detox treatment",

    // Tanning
    "spray tan",
    "airbrush tan",
    "sunless tanning",
    "sunbed",
    "indoor tanning",
    "bridal tan",
    "competition tan",
    "event tan",

    // Mens Grooming
    "mens grooming",
    "mens facial",
    "mens skincare",
    "mens waxing",
    "male grooming salon",
    "mens manicure",
    "mens pedicure",
    "grooming salon for men",
    "male beauty treatments",

    // Spa Packages & Experiences
    "spa packages",
    "pamper packages",
    "couples spa day",
    "girls day out spa",
    "bachelorette spa party",
    "hen party spa",
    "birthday spa package",
    "gift vouchers spa",
    "spa gift card",
    "spa experience",
    "full day spa",
    "half day spa",
    "spa retreat",
    "wellness retreat",
    "relaxation package",

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
    "same day beauty appointments",
    "last minute salon booking",
    "salon with parking",

    // Near Me Keywords (High-intent local searches)
    "facial near me",
    "spa near me",
    "waxing near me",
    "Brazilian wax near me",
    "lash extensions near me",
    "microblading near me",
    "lip fillers near me",
    "fat freezing near me",
    "massage near me",
    "manicure near me",
    "pedicure near me",
    "nail salon near me",
    "hair extensions near me",
    "brow lamination near me",
    "lash lift near me",
    "body contouring near me",
    "slimming treatment near me",
    "permanent makeup near me",
    "beauty treatments near me",
    "skin clinic near me",
    "aesthetics clinic near me",
    "IPL hair removal near me",
    "laser hair removal near me",
    "deep tissue massage near me",
    "couples massage near me",
    "gel nails near me",
    "acrylic nails near me",
    "spray tan near me",
    "eyebrow wax near me",
    "Hollywood wax near me",
    "makeup artist near me",
    "bridal makeup near me",
    "wedding makeup near me",
    "pamper day near me",
    "day spa near me",

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
    "massering",
    "haarsalon",
    "bruidsgrimmering",
    "velversorging",
    "liggaamsbehandeling",

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
    "best spa near Pretoria",
    "where to get hair extensions",
    "how much does microblading cost",
    "best massage near me",

    // Seasonal & Event Keywords (South African)
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
    "Heritage Day spa special",
    "Women's Day spa special",
    "Easter pamper package",

    // Teen & Young Adult
    "teen facial",
    "teenage skincare",
    "acne facial for teens",
    "teen spa party",
    "sweet 16 spa",
    "21st birthday spa",
    "student specials",
    "matric results pamper",

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
    "beauty salon prices",
    "facial prices South Africa",
    "lash extension prices",
    "nail prices near me",

    // South African Competitor Alternatives
    "Sorbet alternative",
    "Placecol alternative",
    "Skin Renewal alternative",
    "Dermalogica salon near me",
    "professional skincare products",
    "salon quality products",

    // Trending Treatments
    "skin cycling",
    "slugging facial",
    "vampire facial",
    "PRP facial",
    "radiofrequency treatment",
    "HIFU treatment",
    "ultrasound facial",

    // ============================================
    // LOCAL DOMINATION KEYWORDS
    // ============================================

    // Top/Best Qualifiers (High-intent)
    "top beauty salon Pretoria",
    "top beauty salon Hartbeespoort",
    "top beauty salon Gauteng",
    "top rated beauty salon near me",
    "best beauty salon Pretoria",
    "best beauty salon Hartbeespoort",
    "best beauty salon near Johannesburg",
    "best salon in Pretoria",
    "best salon Hartbeespoort Dam",
    "best spa Pretoria",
    "best spa Hartbeespoort",
    "best facials Pretoria",
    "best lash technician Pretoria",
    "best nail salon Pretoria",
    "best waxing salon Pretoria",
    "number 1 beauty salon Pretoria",
    "#1 beauty salon Hartbeespoort",

    // Trust Signal Keywords
    "5 star beauty salon Pretoria",
    "5 star salon Hartbeespoort",
    "highly rated beauty salon",
    "highly rated salon Pretoria",
    "highly rated spa near me",
    "top rated spa Pretoria",
    "trusted beauty salon",
    "trusted salon Hartbeespoort",
    "recommended beauty salon Pretoria",
    "most reviewed salon Pretoria",
    "award winning salon",
    "professional beauty salon",
    "qualified beauty therapists",
    "certified aestheticians Pretoria",
    "experienced beauty therapists",

    // Urgency & Convenience Keywords
    "beauty salon open now",
    "beauty salon open today",
    "beauty salon open Saturday",
    "beauty salon open weekends",
    "salon open late Pretoria",
    "walk-in beauty salon Pretoria",
    "same day beauty appointment",
    "last minute salon booking",
    "instant booking beauty salon",
    "no waiting salon",
    "quick beauty treatments",
    "express facial near me",
    "lunch time beauty treatments",

    // Voice Search Phrases
    "where is the best beauty salon near me",
    "which salon is best in Pretoria",
    "what is the best spa near Hartbeespoort",
    "find me a good beauty salon",
    "beauty salon that does lash extensions near me",
    "where can I get a facial near me",
    "who does the best nails in Pretoria",
    "salon that does fat freezing near me",

    // Differentiator Keywords
    "boutique beauty salon Pretoria",
    "intimate spa experience",
    "personalised beauty treatments",
    "one-on-one salon service",
    "exclusive beauty salon",
    "VIP salon experience",
    "tranquil spa Hartbeespoort",
    "lakeside beauty salon",
    "scenic spa location",
    "destination spa Hartbeespoort",
    "getaway spa near Pretoria",
    "escape to spa",

    // South African Local Terms
    "beauty salon Harties",
    "spa by the dam",
    "Hartbeespoort Dam spa",
    "beauty treatments near Harties",
    "salon near Harties Dam",
    "Gauteng beauty destination",
    "North West spa",
    "beauty salon near N1",
    "salon near Mall of Africa",
    "beauty salon Lanseria area",

    // Price-Intent Local Keywords
    "affordable salon Pretoria",
    "value for money beauty salon",
    "quality beauty treatments Pretoria",
    "fair prices beauty salon",
    "competitive prices salon",
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
                  { "@type": "OfferCatalog", name: "Facials & Skincare", description: "Dermalogica and QMS professional facials" },
                  { "@type": "OfferCatalog", name: "Lash & Brow Services", description: "Extensions, lifts, tints, and microblading" },
                  { "@type": "OfferCatalog", name: "Nail Services", description: "Manicures, pedicures, gel, and acrylic nails" },
                  { "@type": "OfferCatalog", name: "Body Treatments", description: "Fat freezing, massages, and body contouring" },
                  { "@type": "OfferCatalog", name: "Medical Aesthetics", description: "Fillers, anti-wrinkle treatments" },
                  { "@type": "OfferCatalog", name: "Hair Removal", description: "Waxing and IPL hair removal" },
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
