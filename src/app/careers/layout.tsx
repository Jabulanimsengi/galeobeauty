import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.galeobeauty.com/careers",
    },
};

export default function CareersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
