"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, ArrowRight, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
    className?: string;
    variant?: "default" | "minimal" | "inline";
}

export function NewsletterSignup({
    className,
    variant = "default"
}: NewsletterSignupProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Simulate API call (replace with actual newsletter signup)
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus("success");
        setEmail("");

        // Reset after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
    };

    if (variant === "minimal") {
        return (
            <form onSubmit={handleSubmit} className={cn("relative", className)}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 pr-12 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold"
                    disabled={status === "loading" || status === "success"}
                />
                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gold text-white hover:bg-gold-light transition-colors disabled:opacity-50"
                >
                    {status === "loading" ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : status === "success" ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <ArrowRight className="w-4 h-4" />
                    )}
                </button>
            </form>
        );
    }

    return (
        <div className={cn("glass-premium rounded-2xl p-6 sm:p-8", className)}>
            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-4"
                    >
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                            <Check className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="font-serif text-xl text-foreground mb-2">You&apos;re In!</h4>
                        <p className="text-sm text-muted-foreground">
                            Check your inbox for your 10% off code.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Incentive Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-4">
                            <Gift className="w-4 h-4 text-gold" />
                            <span className="text-xs font-bold text-gold uppercase tracking-wider">
                                Get 10% Off
                            </span>
                        </div>

                        <h4 className="font-serif text-xl sm:text-2xl text-foreground mb-2">
                            Join Our Beauty Circle
                        </h4>
                        <p className="text-sm text-muted-foreground mb-6">
                            Subscribe for exclusive offers, beauty tips, and be first to know about new treatments.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-white border border-border rounded-xl px-5 py-3 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                    required
                                    disabled={status === "loading"}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="btn-sheen bg-foreground text-background hover:bg-gold px-6 py-3 rounded-xl font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {status === "loading" ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                        Joining...
                                    </>
                                ) : (
                                    <>
                                        Subscribe
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-xs text-muted-foreground mt-4">
                            No spam, unsubscribe anytime. We respect your privacy.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
