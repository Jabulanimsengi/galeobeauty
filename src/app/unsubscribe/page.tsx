import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { unsubscribeByToken } from "@/lib/server/subscribers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Unsubscribe from Galeo Beauty member emails.",
  robots: {
    index: false,
    follow: false,
  },
};

interface UnsubscribePageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const params = await searchParams;
  const subscriber = await unsubscribeByToken(params.token);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background px-5 pb-16 pt-32 lg:pt-40">
        <section className="mx-auto max-w-2xl border border-black/10 bg-white p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Galeo Beauty
          </p>
          <h1 className="mt-4 font-sans text-3xl text-foreground">
            {subscriber ? "You have been unsubscribed" : "Unsubscribe link not found"}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
            {subscriber
              ? "You will no longer receive Galeo Beauty member offers or marketing updates. Transactional booking messages may still be sent when you make a booking."
              : "This unsubscribe link is invalid or has already been removed. You can contact Galeo Beauty if you need help with your email preferences."}
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:bg-gold hover:text-foreground"
          >
            Return home
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
