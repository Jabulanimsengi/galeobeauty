import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";

import { TrustBadge } from "@/components/ui/trust-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { ArrowRight, ArrowLeft, Phone, MapPin, Clock, Star, Shield, Sparkles } from "lucide-react";
import { serviceCategories, getCategoryById } from "@/lib/services-data";
import { CategoryContent } from "./category-content";

// Comprehensive SEO metadata for each category - optimized for South African search
const categoryMeta: Record<string, {
    title: string;
    description: string;
    keywords: string[];
    h1: string;
    intro: string;
    benefits: string[];
    faqs: { q: string; a: string }[];
}> = {
    "hart-aesthetics": {
        title: "Medical Aesthetics & Anti-Aging Hartbeespoort | Botox & Fillers",
        description: "Premier medical aesthetics in Hartbeespoort (Harties). Specializing in Botox, Dermal Fillers, Liquid Facelifts, Threads, and IV Drips. Advanced anti-aging treatments near Hartbeespoort Dam.",
        keywords: ["medical aesthetics Hartbeespoort", "Botox Harties", "dermal fillers Hartbeespoort", "thread lifts Harties", "IV drip bar Hartbeespoort", "liquid facelift Harties", "anti-aging clinic North West", "skin boosters Pretoria", "aesthetic doctor Hartbeespoort", "Nefertiti lift Harties", "lip fillers Hartbeespoort"],
        h1: "Medical Aesthetics & Anti-Aging in Hartbeespoort",
        intro: "Experience world-class medical aesthetics at Galeo Beauty in Hartbeespoort. Our comprehensive range of advanced treatments includes Botulinum Toxin, Dermal Fillers, Thread Lifts, and IV Vitamin Therapy. We combine medical expertise with artistic precision to deliver natural, rejuvenating results for clients from Harties, Pretoria, and Centurion.",
        benefits: ["Qualified medical professionals", "Comprehensive treatment menu", "Premium FDA-approved products", "Natural-looking results"],
        faqs: [
            { q: "Which Hart Aesthetics treatments can I book in Hartbeespoort?", a: "You can book Botox, dermal fillers, Russian lips, skin boosters, liquid facelifts, Nefertiti lifts and selected advanced injectable treatments through our Hart Aesthetics offering at Galeo Beauty." },
            { q: "How do I know which injectable treatment is right for me?", a: "We start with a consultation to assess your goals, facial structure, previous treatment history and downtime preferences, then recommend the most suitable option instead of pushing a single treatment." },
            { q: "Are your medical aesthetics practitioners qualified?", a: "Yes. Advanced injectable and aesthetic treatments are performed by qualified professionals using approved products and treatment protocols." },
        ],
    },
    "fat-freezing": {
        title: "Fat Freezing Hartbeespoort | Cryolipolysis Harties Dam Area",
        description: "Non-invasive fat freezing (cryolipolysis) in Hartbeespoort & Harties. Target stubborn belly fat, love handles & thighs near Hartbeespoort Dam. CE approved. Near Centurion & Pretoria.",
        keywords: ["fat freezing Hartbeespoort", "cryolipolysis Harties", "fat freezing near Hartbeespoort Dam", "body contouring Harties Dam", "fat freezing near Centurion", "belly fat removal Hartbeespoort", "love handles treatment Harties", "non-surgical fat removal North West", "fat freezing near Pretoria", "body sculpting around Harties", "cryolipolysis prices Hartbeespoort Dam area"],
        h1: "Fat Freezing in Hartbeespoort & Harties",
        intro: "Eliminate stubborn fat without surgery at Galeo Beauty in Hartbeespoort (Harties). Our CE-approved cryolipolysis treatment near Hartbeespoort Dam targets fat cells that diet and exercise can't reach. Serving clients from Harties Village, Centurion, Pretoria, and North West.",
        benefits: ["Non-invasive procedure", "No downtime required", "Permanent fat cell reduction", "CE approved equipment"],
        faqs: [
            { q: "How many fat freezing sessions do I usually need?", a: "Most clients need 1 to 3 sessions per area depending on how much stubborn fat they want to reduce and how their body responds after the first treatment." },
            { q: "When do fat freezing results start showing?", a: "You may notice early changes within a few weeks, but the clearest results usually show between 8 and 12 weeks as the body processes the treated fat cells." },
            { q: "Is fat freezing a weight-loss treatment?", a: "No. Fat freezing is best for shaping specific areas such as the stomach, thighs or love handles rather than for overall scale weight loss." },
        ],
    },
    "slimming": {
        title: "Medical Weight Loss & Body Contouring Hartbeespoort | Slimming Injections",
        description: "Advanced weight loss & body contouring in Hartbeespoort (Harties). Lemon Bottle fat dissolving, Slimming Injections & Tesla EMS. Effective results near Hartbeespoort Dam. Serving Centurion & Pretoria.",
        keywords: ["weight loss Hartbeespoort", "slimming injections Harties", "Lemon Bottle fat dissolving Hartbeespoort", "body contouring Harties Dam", "Tesla EMS slimming Hartbeespoort", "medical weight loss North West", "fat loss injections Pretoria", "slimming clinic Harties", "cellulite treatment Hartbeespoort Dam area"],
        h1: "Medical Weight Loss & Body Contouring in Hartbeespoort",
        intro: "Achieve your body goals with our medical weight loss and contouring solutions at Galeo Beauty in Hartbeespoort (Harties). We offer advanced treatments including Lemon Bottle fat dissolving injections and Tesla EMS muscle toning. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Medical-grade solutions", "Targeted fat reduction", "Non-surgical options", "Visible results"],
        faqs: [
            { q: "What slimming and body contouring treatments do you offer?", a: "We offer selected slimming injections, fat-dissolving options and body contouring technologies designed for clients who want targeted shaping without surgery." },
            { q: "Will these treatments help with weight loss or inch loss?", a: "Most clients use these treatments for inch loss, contouring and stubborn areas rather than relying on them as a stand-alone weight-loss solution." },
            { q: "Are slimming treatments safe?", a: "Yes, when used appropriately. We review your goals and suitability first, then recommend only treatments that make sense for your body and medical history." },
        ],
    },
    "dermalogica": {
        title: "Dermalogica Skincare, Peels & Microneedling Hartbeespoort",
        description: "Advanced Dermalogica skincare in Hartbeespoort (Harties). Chemical peels, microneedling, dermaplaning & pro skin treatments near Hartbeespoort Dam. Expert skin therapists. Near Centurion & Pretoria.",
        keywords: ["Dermalogica skincare Hartbeespoort", "chemical peels Harties", "microneedling near Hartbeespoort Dam", "dermaplaning Harties Dam area", "pro skin treatments Hartbeespoort", "acne treatment North West", "anti-aging facials Pretoria", "pigmentation treatment Harties", "Dermalogica expert Hartbeespoort Dam area"],
        h1: "Dermalogica Skincare & Advanced Peels in Hartbeespoort",
        intro: "Transform your skin with advanced Dermalogica treatments at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, our expert therapists specialise in chemical peels, microneedling, dermaplaning, and customised Pro Skin facials. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Expert skin analysis", "Advanced chemical peels", "Clinical microneedling", "Personalized treatment plans"],
        faqs: [
            { q: "Do you offer chemical peels and microneedling in Hartbeespoort?", a: "Yes. Our Dermalogica category includes professional peels, Pro Microneedling, dermaplaning and customized skin treatments based on your concern." },
            { q: "Which Dermalogica treatment is best for acne, pigmentation or dull skin?", a: "That depends on your skin barrier, sensitivity and goals. We usually recommend a peel, microneedling or Pro Skin treatment only after assessing your skin properly." },
            { q: "Is Dermalogica suitable for sensitive skin?", a: "Yes, many Dermalogica treatments can be adapted for sensitive skin, but the exact products and intensity should be customized to your tolerance level." },
        ],
    },
    "ipl": {
        title: "IPL Hair Removal & Laser Tattoo Removal Hartbeespoort",
        description: "Permanent IPL hair removal & laser tattoo removal in Hartbeespoort (Harties). Safe, CE-approved treatments for face & body near Hartbeespoort Dam. Ladies & gents. Near Centurion & Pretoria.",
        keywords: ["IPL hair removal Hartbeespoort", "laser tattoo removal Harties", "permanent hair reduction Hartbeespoort Dam", "tattoo removal near Centurion", "IPL laser Harties", "hair removal clinic North West", "laser treatments Pretoria", "tattoo fading Hartbeespoort", "mens hair removal Harties"],
        h1: "IPL Hair Removal & Laser Tattoo Removal in Hartbeespoort",
        intro: "Achieve smooth, hair-free skin and remove unwanted tattoos at Galeo Beauty in Hartbeespoort (Harties). We use CE-approved IPL technology for permanent hair reduction and laser tattoo removal. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Permanent hair reduction", "Effective tattoo removal", "CE approved technology", "Safe for most skin types"],
        faqs: [
            { q: "Do you offer both IPL hair removal and tattoo removal in Hartbeespoort?", a: "Yes. This category covers both IPL hair reduction for unwanted hair and laser-style tattoo removal services for fading unwanted ink." },
            { q: "Is IPL hair removal permanent?", a: "IPL is best described as permanent hair reduction. Most clients see a major drop in regrowth after a full course, with occasional maintenance depending on the area." },
            { q: "How many sessions are usually needed?", a: "Most IPL and tattoo-removal plans require multiple sessions because hair and pigment clear in stages, so we build a course based on the area being treated." },
        ],
    },
    "makeup": {
        title: "Professional Make-Up Hartbeespoort | Bridal Makeup Harties",
        description: "Professional make-up services in Hartbeespoort & Harties. Kryolan trained artists for bridal, evening & matric dance makeup near Hartbeespoort Dam. Near Centurion & Pretoria.",
        keywords: ["bridal makeup Hartbeespoort", "makeup artist Harties", "wedding makeup near Hartbeespoort Dam", "makeup Harties Dam area", "bridal makeup near Centurion", "matric dance makeup Hartbeespoort", "professional makeup Harties", "evening makeup North West", "makeup artist near Pretoria", "makeup around Harties", "Kryolan makeup Hartbeespoort Dam area"],
        h1: "Professional Make-Up in Hartbeespoort & Harties",
        intro: "Look stunning for any occasion with professional make-up at Galeo Beauty in Hartbeespoort (Harties). Our Kryolan-trained artists near Hartbeespoort Dam create flawless bridal, evening, and special occasion looks. Serving Harties Village, Centurion, Pretoria, and North West.",
        benefits: ["Kryolan professional products", "Trained makeup artists", "Long-lasting formulas", "Personalized looks"],
        faqs: [
            { q: "Can I book bridal, evening and matric makeup in Hartbeespoort?", a: "Yes. We offer bridal makeup, special occasion makeup, day and evening makeup, plus matric dance bookings from our Hartbeespoort salon." },
            { q: "Do you recommend a bridal makeup trial?", a: "Yes. A trial helps us test your preferred look, skin prep and timing so there are no surprises on the wedding day." },
            { q: "How long should I allow for bridal makeup?", a: "Bridal makeup usually takes around 60 to 90 minutes depending on the look, skin prep and whether lashes are included." },
        ],
    },
    "medical": {
        title: "Clinical Skin & Laser Treatments Hartbeespoort | Advanced Aesthetics",
        description: "Advanced clinical skin treatments in Hartbeespoort (Harties). Fractional laser, Plasmage, Vaginal Tightening & IV Drips near Hartbeespoort Dam. Medical-grade technology. Near Centurion & Pretoria.",
        keywords: ["clinical skin treatments Hartbeespoort", "fractional laser Harties", "plasmage non-surgical lift Hartbeespoort", "vaginal tightening Harties", "IV drip clinic Hartbeespoort", "laser skin resurfacing North West", "advanced aesthetics Pretoria", "medical skin clinic Harties"],
        h1: "Advanced Clinical Skin & Laser Treatments in Hartbeespoort",
        intro: "Experience advanced clinical skin and laser treatments at Galeo Beauty in Hartbeespoort (Harties). Our medical-grade offering includes Fractional Laser resurfacing, Plasmage non-surgical lifting, Vaginal Tightening, and IV Vitamin Therapy. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Clinical-grade technology", "Non-surgical solutions", "Advanced skin rejuvenation", "Private & professional"],
        faqs: [
            { q: "What advanced clinical treatments are available in this category?", a: "This category includes treatments such as fractional laser, Plasmage, vaginal tightening and selected advanced skin procedures depending on suitability." },
            { q: "How much downtime should I expect from clinical skin treatments?", a: "Downtime depends on the treatment. Some involve little to none, while stronger resurfacing treatments may need a few recovery days." },
            { q: "Is fractional laser painful?", a: "Most clients feel heat and discomfort rather than sharp pain, and we use topical numbing where appropriate to make treatment more manageable." },
        ],
    },
    "permanent-makeup": {
        title: "Permanent Makeup Hartbeespoort | Microblading & Powder Brows Harties",
        description: "Permanent makeup in Hartbeespoort for microblading, powder brows, hybrid brows, lip blush and eyeliner. Visit Galeo Beauty near Hartbeespoort Dam for natural-looking semi-permanent brows.",
        keywords: ["permanent makeup Hartbeespoort", "microblading Harties", "powder brows Hartbeespoort", "microblading near me", "powder brows near me", "powder brows vs microblading", "permanent brows Hartbeespoort", "lip blush Harties", "eyeliner tattoo North West", "microblading near Pretoria", "semi-permanent makeup Hartbeespoort Dam area"],
        h1: "Permanent Makeup, Microblading & Powder Brows in Hartbeespoort",
        intro: "Simplify your beauty routine with permanent makeup at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, we offer microblading, powder brows, hybrid brows, lip blush and eyeliner for clients comparing the best brow treatment near Hartbeespoort, Centurion and Pretoria.",
        benefits: ["Long-lasting results", "Natural-looking enhancement", "Time-saving beauty", "Certified technicians"],
        faqs: [
            { q: "Where can I book microblading or powder brows in Hartbeespoort?", a: "Galeo Beauty offers microblading, powder brows, hybrid brows, lip blush and eyeliner near Hartbeespoort Dam for clients from Harties, Centurion and Pretoria." },
            { q: "What is the difference between microblading and powder brows?", a: "Microblading creates finer hair-like strokes, while powder brows create a softer shaded finish that often suits oily skin and clients who like a more defined brow." },
            { q: "How long does permanent makeup last?", a: "Most permanent makeup results last around 1 to 3 years depending on the treatment, your skin type, sun exposure and whether you maintain touch-up appointments." },
        ],
    },
    "massages": {
        title: "Massage Hartbeespoort | Relaxing & Deep Tissue Massage in Harties",
        description: "Book massage therapy in Hartbeespoort at Galeo Beauty. Swedish, aromatherapy, hot stone and deep tissue massage near Hartbeespoort Dam for clients from Harties, Centurion and Pretoria.",
        keywords: ["massage Hartbeespoort", "massage in Hartbeespoort", "massage Harties", "spa in Hartbeespoort", "day spa Hartbeespoort", "massage near Hartbeespoort Dam", "aromatherapy massage Harties Dam area", "deep tissue massage near Centurion", "hot stone massage Hartbeespoort", "massage near Pretoria", "back massage Hartbeespoort Dam area"],
        h1: "Massage Therapy in Hartbeespoort & Harties",
        intro: "Unwind with professional massage therapy at Galeo Beauty in Hartbeespoort (Harties). Located near Hartbeespoort Dam, our therapists offer Swedish, aromatherapy, hot stone and deep tissue massage for clients searching for a day spa, relaxation massage or full body massage in Hartbeespoort.",
        benefits: ["Certified massage therapists", "Aromatherapy oils", "Multiple massage styles", "Relaxing environment"],
        faqs: [
            { q: "Where can I get a massage in Hartbeespoort?", a: "Galeo Beauty offers massage therapy near Hartbeespoort Dam, including relaxation, deep tissue, aromatherapy and hot stone options." },
            { q: "Which massage is best for stress relief versus muscle tension?", a: "Swedish and aromatherapy are usually best for relaxation, while deep tissue and targeted treatments suit clients with tight muscles or recovery needs." },
            { q: "How long should I book for a massage?", a: "A 60-minute massage is the most balanced option for most clients, while shorter sessions suit focused tension relief and longer sessions suit a more indulgent spa experience." },
        ],
    },
    "qms": {
        title: "QMS Medicosmetics Facials Hartbeespoort | Premium Skincare Harties",
        description: "Premium QMS Medicosmetics facials in Hartbeespoort & Harties. Medical-grade collagen treatments & chemical peels near Hartbeespoort Dam. German precision skincare. Near Centurion & Pretoria.",
        keywords: ["QMS facial Hartbeespoort", "collagen facial Harties", "premium facial near Hartbeespoort Dam", "QMS Harties Dam area", "luxury facial near Centurion", "anti-aging facial Hartbeespoort", "QMS Medicosmetics Harties", "collagen treatment North West", "skin rejuvenation near Pretoria", "QMS around Harties", "medical grade facial Hartbeespoort Dam area"],
        h1: "QMS Medicosmetics Facials in Hartbeespoort & Harties",
        intro: "Experience German precision skincare with QMS Medicosmetics at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, our premium facials use medical-grade collagen formulations. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["German precision formulas", "Medical-grade ingredients", "Collagen-boosting treatments", "Visible results"],
        faqs: [
            { q: "What makes QMS different from a standard facial?", a: "QMS focuses on premium medical-grade skincare, collagen support and more corrective anti-aging results than a basic relaxation facial." },
            { q: "Which QMS facial is best for me?", a: "That depends on whether you are targeting dehydration, dullness, fine lines or firmness. We match the facial to your skin goals after assessment." },
            { q: "Are QMS facials mainly for mature skin?", a: "They are especially popular for anti-aging concerns, but they can also suit younger clients who want stronger corrective skincare and visible skin-refining results." },
        ],
    },
    "sunbed": {
        title: "Sunbed Tanning & Spray Tan Hartbeespoort | Tanning Harties",
        description: "Safe sunbed tanning & professional spray tan in Hartbeespoort & Harties. Golden glow year-round near Hartbeespoort Dam. Package deals available. Near Centurion & Pretoria, North West.",
        keywords: ["sunbed Hartbeespoort", "spray tan Harties", "tanning near Hartbeespoort Dam", "sunbed Harties Dam area", "spray tan near Centurion", "tanning salon Hartbeespoort", "indoor tanning Harties", "spray tan North West", "sunbed near Pretoria", "tanning around Harties", "bridal spray tan Hartbeespoort Dam area"],
        h1: "Sunbed & Spray Tan in Hartbeespoort (Harties)",
        intro: "Achieve a beautiful sun-kissed glow at Galeo Beauty in Hartbeespoort (Harties). Located near Hartbeespoort Dam, we offer safe sunbed tanning and professional spray tans. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Controlled UV exposure", "Professional spray tans", "Package savings", "Year-round glow"],
        faqs: [
            { q: "Can I book both sunbed tanning and spray tanning in Hartbeespoort?", a: "Yes. We offer both sunbed sessions and professional spray tanning, depending on whether you want a UV tan or a quicker cosmetic glow." },
            { q: "How long does a spray tan last?", a: "A spray tan usually lasts around 5 to 7 days with proper prep and aftercare, including gentle showering and moisturising." },
            { q: "How often should I use a sunbed?", a: "That depends on your skin type and tanning history. We keep sessions controlled and spaced responsibly rather than recommending overuse." },
        ],
    },
    "waxing": {
        title: "Professional Waxing Hartbeespoort | Brazilian Wax Harties",
        description: "Professional waxing in Hartbeespoort & Harties. Brazilian, Hollywood & full body waxing near Hartbeespoort Dam. Ladies & gents. Gentle techniques. Near Centurion & Pretoria, North West.",
        keywords: ["waxing Hartbeespoort", "Brazilian wax Harties", "waxing near Hartbeespoort Dam", "Hollywood wax Harties Dam area", "waxing near Centurion", "bikini wax Hartbeespoort", "intimate waxing Harties", "full body wax North West", "waxing near Pretoria", "waxing around Harties", "painless wax Hartbeespoort Dam area"],
        h1: "Professional Waxing in Hartbeespoort & Harties",
        intro: "Achieve silky smooth skin with professional waxing at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, we use gentle techniques and premium wax for minimal discomfort. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["Hygienic environment", "Premium quality wax", "Gentle techniques", "Long-lasting smoothness"],
        faqs: [
            { q: "How long should hair be before waxing?", a: "Hair should usually be at least 5 mm long so the wax can grip properly without causing unnecessary irritation." },
            { q: "What is the difference between a Brazilian and a Hollywood wax?", a: "A Brazilian usually leaves a small strip or shape, while a Hollywood removes everything. If you are unsure, we can explain both before treatment starts." },
            { q: "How often should I book waxing appointments?", a: "Most clients rebook every 3 to 6 weeks depending on the area and how quickly their hair grows back." },
        ],
    },
    "hair": {
        title: "Hair Salon Hartbeespoort | Hairdresser, Colour & Styling in Harties",
        description: "Professional hair salon in Hartbeespoort for cuts, colour, balayage, foils, toner and Brazilian blowouts. Book your Harties hairdresser at Galeo Beauty near Hartbeespoort Dam.",
        keywords: ["hair salon Hartbeespoort", "hairdresser Hartbeespoort", "hair salon Harties", "hair salon near me", "hair salon in Hartbeespoort", "haircut near Hartbeespoort Dam", "balayage Harties Dam area", "hair colour near Centurion", "blow dry Hartbeespoort", "Brazilian blowout Harties", "best hairdresser Hartbeespoort Dam area"],
        h1: "Hair Salon & Styling in Hartbeespoort",
        intro: "Transform your look at Galeo Beauty hair salon in Hartbeespoort (Harties). Located near Hartbeespoort Dam, our stylists create precision cuts, beautiful colour, balayage and styling for clients searching for a trusted hairdresser in Hartbeespoort, Harties, Centurion and Pretoria.",
        benefits: ["Expert stylists", "Premium products", "All hair types welcome", "Latest techniques"],
        faqs: [
            { q: "Where can I find a hair salon in Hartbeespoort for colour and styling?", a: "Galeo Beauty offers cuts, blow-dries, balayage, foils, toner and Brazilian treatments from our Hartbeespoort salon near Hartbeespoort Dam." },
            { q: "Do you offer colour, foils and Brazilian blowouts?", a: "Yes. We offer colour services, foils, toner, balayage and Brazilian smoothing treatments using professional salon products." },
            { q: "How often should I book cuts or colour maintenance?", a: "That depends on your service, but many clients rebook cuts every 6 to 8 weeks and colour or toner maintenance based on fading, regrowth and the look they want to maintain." },
        ],
    },
    "nails": {
        title: "Nail Salon Hartbeespoort | Gel Nails, Acrylics & Pedicures in Harties",
        description: "Professional nail salon in Hartbeespoort for manicures, pedicures, gel nails, acrylic nails and nail art. Visit Galeo Beauty near Hartbeespoort Dam for hygienic, long-lasting nail services.",
        keywords: ["nail salon Hartbeespoort", "nails Hartbeespoort", "nails Harties", "nail salon near me", "manicure Harties", "gel nails near Hartbeespoort Dam", "acrylic nails Harties Dam area", "pedicure Hartbeespoort", "nail art Harties", "gel manicure North West", "acrylic full set Hartbeespoort Dam area"],
        h1: "Nail Salon in Hartbeespoort & Harties",
        intro: "Pamper your hands and feet at Galeo Beauty nail salon in Hartbeespoort (Harties). Near Hartbeespoort Dam, we offer manicures, pedicures, acrylic nails, gel nails and nail art for clients searching for a nail salon in Hartbeespoort, Harties, Centurion and Pretoria.",
        benefits: ["Hygienic practices", "Premium nail products", "Skilled nail technicians", "Lasting results"],
        faqs: [
            { q: "Where can I find a nail salon in Hartbeespoort for gel and acrylic nails?", a: "Galeo Beauty offers gel nails, acrylic nails, manicures, pedicures and nail art from our Hartbeespoort salon near Hartbeespoort Dam." },
            { q: "Do you do both gel nails and acrylic nails in Harties?", a: "Yes. We offer gel overlays, acrylic full sets, fills, manicures and pedicures with strict hygiene protocols and professional nail products." },
            { q: "How often should I book a fill or maintenance appointment?", a: "Most nail clients rebook every 2 to 3 weeks for fills, rebalancing or soak-offs depending on growth, wear and the system they are wearing." },
        ],
    },
    "lashes-brows": {
        title: "Lash Extensions Hartbeespoort | Eyelash Extensions & Brows in Harties",
        description: "Professional lash extensions and brow treatments in Hartbeespoort. Book eyelash extensions, lash lifts, brow lamination and brow tinting at Galeo Beauty near Hartbeespoort Dam.",
        keywords: ["lash extensions Hartbeespoort", "eyelash extensions Hartbeespoort", "eyelash extensions", "lashes near me", "eyelash extensions near me", "lashes near Hartbeespoort Dam", "brow lamination Harties Dam area", "lash lift near Centurion", "volume lashes Hartbeespoort", "classic lashes Harties", "lash lift Hartbeespoort Dam area"],
        h1: "Lash Extensions & Brows in Hartbeespoort",
        intro: "Enhance your natural beauty with professional lash and brow services at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, we offer classic lashes, hybrid lashes, volume lashes, lash lifts, brow lamination and tinting for clients searching for eyelash extensions near Hartbeespoort, Centurion and Pretoria.",
        benefits: ["Certified lash technicians", "Premium lash materials", "Customized looks", "Long-lasting results"],
        faqs: [
            { q: "Where can I get eyelash extensions in Hartbeespoort?", a: "Galeo Beauty offers eyelash extensions near Hartbeespoort Dam, including classic, hybrid and volume sets, plus lash lifts and brow treatments." },
            { q: "Will lash extensions damage my natural lashes?", a: "Not when they are applied correctly and maintained properly. Healthy natural lashes should be protected by correct lash mapping, weight selection and aftercare." },
            { q: "How often do I need lash fills or brow maintenance?", a: "Most lash extension clients need fills every 2 to 3 weeks, while brow tinting, lamination and similar services vary based on growth and aftercare." },
        ],
    },
    "hair-extensions": {
        title: "Hair Extensions Hartbeespoort | Remy Human Hair Harties",
        description: "Premium European Remy hair extensions in Hartbeespoort & Harties. Tape-in, clip-in, U-tip & micro loop near Hartbeespoort Dam. Double drawn quality. Near Centurion & Pretoria, North West.",
        keywords: ["hair extensions Hartbeespoort", "tape-in extensions Harties", "hair extensions near Hartbeespoort Dam", "clip-in hair Harties Dam area", "extensions near Centurion", "keratin extensions Hartbeespoort", "Remy hair Harties", "micro loop extensions North West", "hair extensions near Pretoria", "extensions around Harties", "halo hair Hartbeespoort Dam area"],
        h1: "Hair Extensions in Hartbeespoort & Harties",
        intro: "Add length, volume, and dimension with premium European Remy hair extensions at Galeo Beauty in Hartbeespoort (Harties). Near Hartbeespoort Dam, we offer tape-in, clip-in, U-tip, micro loop, and halo extensions. Serving Harties Village, Centurion, Pretoria, and the North West.",
        benefits: ["100% Remy human hair", "Double drawn quality", "Multiple methods available", "Expert application"],
        faqs: [
            { q: "Where can I get hair extensions in Hartbeespoort?", a: "Galeo Beauty offers premium hair extensions near Hartbeespoort Dam, including tape-ins, clip-ins, U-tip, micro loop and halo options." },
            { q: "Which hair extension method is best for me?", a: "That depends on your hair density, lifestyle, maintenance budget and styling goals. We recommend a method only after checking your natural hair properly." },
            { q: "How long do hair extensions usually last?", a: "Longevity depends on the method, home care and how often you maintain them, but professional extensions can last from several weeks to a few months before refitting or replacement." },
        ],
    },
};

// Generate static paths for all categories
export function generateStaticParams() {
    return serviceCategories.map((category) => ({
        category: category.id,
    }));
}

// Fully static - no ISR
export const dynamic = "force-static";
export const revalidate = false;

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categoryId } = await params;
    const category = getCategoryById(categoryId);
    const meta = categoryMeta[categoryId];

    if (!category) {
        return { title: "Service Not Found" };
    }

    // 1. Generate Dynamic Service Keywords
    const serviceKeywords: string[] = [];

    // Add variations for each service
    category.subcategories.forEach(sub => {
        sub.items.forEach(item => {
            // Add raw service name
            serviceKeywords.push(item.name.toLowerCase());
            // Add location variations
            serviceKeywords.push(`${item.name.toLowerCase()} hartbeespoort`);
            serviceKeywords.push(`${item.name.toLowerCase()} harties`);
        });
    });

    // 2. Base Keywords from Category Meta (or default)
    const baseKeywords = meta?.keywords || [category.title.toLowerCase(), "beauty salon", "spa"];

    // 3. Combine and Deduplicate
    const allKeywords = Array.from(new Set([
        ...baseKeywords,
        ...serviceKeywords
    ]));

    // 4. Construct Title & Description
    const title = meta?.title || `${category.title} | Prices & Booking Hartbeespoort`;

    // Ensure Description has location
    let description = meta?.description || `${category.title} treatments at Galeo Beauty Hartbeespoort. ${category.subtitle}. View prices and book your appointment online.`;
    if (!description.toLowerCase().includes("hartbeespoort") || !description.toLowerCase().includes("harties")) {
        description = `${description} Serving Hartbeespoort | Harties.`;
    }

    return {
        title: `${title} | Galeo Beauty`,
        description,
        keywords: allKeywords, // Now includes every single service + location variants
        openGraph: {
            title: `${title} | Galeo Beauty`,
            description,
            type: "website",
            images: [{ url: category.image, alt: category.title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        alternates: {
            canonical: `https://www.galeobeauty.com/prices/${categoryId}`,
        },
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category: categoryId } = await params;
    const category = getCategoryById(categoryId);

    if (!category) {
        notFound();
    }

    const meta = categoryMeta[categoryId];
    const h1 = meta?.h1 || category.title;
    const intro = meta?.intro || `${category.subtitle}. Browse our treatments and book your appointment today.`;
    const benefits = meta?.benefits || [];
    const faqs = meta?.faqs || [];

    // JSON-LD structured data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": category.title,
        "description": meta?.description || category.subtitle,
        "provider": {
            "@type": "BeautySalon",
            "name": "Galeo Beauty",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hartbeespoort",
                "addressRegion": "North West",
                "addressCountry": "ZA"
            }
        },
        "areaServed": {
            "@type": "City",
            "name": "Hartbeespoort"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `${category.title} Services`,
            "itemListElement": category.subcategories.flatMap(sub =>
                sub.items.map(item => ({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": item.name,
                    },
                    "price": item.price.replace(/[^\d.]/g, ''),
                    "priceCurrency": "ZAR"
                }))
            )
        }
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.galeobeauty.com" },
            { "@type": "ListItem", "position": 2, "name": "Prices", "item": "https://www.galeobeauty.com/prices" },
            { "@type": "ListItem", "position": 3, "name": category.title, "item": `https://www.galeobeauty.com/prices/${categoryId}` },
        ],
    };

    const faqJsonLd = faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    } : null;

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}

            <Header />
            <main className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 -z-10">
                        <CloudinaryImage
                            src={category.image}
                            alt={category.title}
                            fill
                            className="object-cover opacity-20"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
                    </div>

                    <div className="container mx-auto px-4 sm:px-6">
                        {/* Breadcrumb */}
                        <Link
                            href="/prices"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-6 text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            All Services
                        </Link>

                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-4">
                                <TrustBadge variant={category.badgeVariant}>
                                    {category.badge}
                                </TrustBadge>
                            </div>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-4">
                                {h1}
                            </h1>
                            <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-2xl">
                                {intro}
                            </p>

                            {/* Benefits */}
                            {benefits.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-6">
                                    {benefits.map((benefit, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1.5 bg-gold/10 text-gold px-3 py-1.5 rounded-full text-sm font-medium"
                                        >
                                            <Sparkles className="w-3.5 h-3.5" />
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Booking Instructions */}
                <section className="py-6 border-b border-border/30">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="bg-secondary/30 rounded-2xl p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex-1">
                                    <h2 className="font-medium text-foreground mb-1">How to Book</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Select the treatments you want, then click "Book Now" to complete your reservation. You can select multiple treatments.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gold">
                                    <Phone className="w-4 h-4" />
                                    <span>Or call: 012 253 9850</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Treatment List with Booking - Client Component */}
                <CategoryContent
                    subcategories={category.subcategories}
                    categoryId={category.id}
                    categoryTitle={category.title}
                />

                {/* FAQ Section */}
                {faqs.length > 0 && (
                    <section className="py-16 bg-secondary/20">
                        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                            <h2 className="font-serif text-2xl sm:text-3xl text-foreground text-center mb-8">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                                        <h3 className="font-medium text-foreground mb-2">{faq.q}</h3>
                                        <p className="text-muted-foreground text-sm">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Reviews Section */}


                {/* CTA */}
                <section className="py-20 bg-foreground text-background text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                            Ready to book your {category.title.toLowerCase()} treatment?
                        </h2>
                        <p className="text-background/70 mb-8 max-w-lg mx-auto">
                            Our specialists are ready to help you achieve your beauty goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground font-semibold px-10">
                                <Link href="/contact">
                                    Contact Us
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" className="border border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background px-10">
                                <Link href="/prices">
                                    View All Services
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
