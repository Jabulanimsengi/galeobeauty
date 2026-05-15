import { Inter, Montserrat } from "next/font/google";

export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-montserrat",
    display: "swap",
});

export const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
    display: "swap",
});
