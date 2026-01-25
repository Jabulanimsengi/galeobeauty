import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.galeobeauty.com/prices",
  },
};

export default function PricesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
