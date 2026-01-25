import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.galeobeauty.com/specials",
    },
};

export default function SpecialsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
