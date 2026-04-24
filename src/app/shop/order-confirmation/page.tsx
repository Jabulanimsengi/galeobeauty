"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, ShoppingBag, MapPin, Phone } from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { NavLink } from "@/components/ui/nav-link";
import { businessInfo } from "@/lib/constants";

function OrderConfirmationContent() {
  const prefersReducedMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f6efe6]">
        <section className="flex flex-col items-center px-6 pb-16 pt-32 text-center sm:pt-40 lg:pt-44">
          <motion.div
            initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="mt-6 font-sans text-[1.6rem] font-bold text-[#17120f] sm:text-[2rem]">
              Thank You for Your Order!
            </h1>

            {orderNumber && (
              <p className="mt-3 text-[0.88rem] text-[#7a6f62]">
                Order reference:{" "}
                <span className="font-semibold text-[#17120f]">{orderNumber}</span>
              </p>
            )}

            <p className="mx-auto mt-4 max-w-lg text-[0.86rem] leading-relaxed text-[#5d5348]">
              Your payment has been processed successfully. We&apos;ll prepare your order
              and notify you when it&apos;s ready for collection or dispatch.
            </p>
          </motion.div>

          {/* What happens next */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-10 max-w-md"
          >
            <div className="space-y-4 bg-white p-6 text-left">
              <h2 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#17120f]">
                What Happens Next
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[0.6rem] font-bold text-gold">
                    1
                  </div>
                  <p className="text-[0.8rem] text-[#5d5348]">
                    We&apos;ll confirm your order via WhatsApp or SMS to the phone number you provided.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[0.6rem] font-bold text-gold">
                    2
                  </div>
                  <p className="text-[0.8rem] text-[#5d5348]">
                    Your products will be packaged and prepared for pickup or delivery.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[0.6rem] font-bold text-gold">
                    3
                  </div>
                  <p className="text-[0.8rem] text-[#5d5348]">
                    You&apos;ll receive a notification when your order is ready or shipped.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="mt-4 space-y-2 bg-white p-5">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[#9a8e7f]">
                Need help with your order?
              </p>
              <div className="flex items-center gap-2 text-[0.8rem] text-[#5d5348]">
                <Phone className="h-3.5 w-3.5 text-[#a89272]" />
                <span>012 111 1730</span>
              </div>
              <div className="flex items-center gap-2 text-[0.8rem] text-[#5d5348]">
                <MapPin className="h-3.5 w-3.5 text-[#a89272]" />
                <span>{businessInfo.address.street}, {businessInfo.address.area}</span>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <NavLink
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-[#17120f] px-8 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-gold"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Continue Shopping
            </NavLink>
            <NavLink
              href="/"
              className="inline-flex items-center justify-center border border-black/15 px-8 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#17120f] transition-colors hover:border-gold hover:text-gold"
            >
              Back to Home
            </NavLink>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense>
      <OrderConfirmationContent />
    </Suspense>
  );
}
