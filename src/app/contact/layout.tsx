import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.galeobeauty.com/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
