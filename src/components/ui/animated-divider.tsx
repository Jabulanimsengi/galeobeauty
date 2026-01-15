"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface AnimatedDividerProps {
    variant?: "simple" | "animated" | "with-icon";
    className?: string;
}

export function AnimatedDivider({
    variant = "animated",
    className
}: AnimatedDividerProps) {
    if (variant === "simple") {
        return <div className={cn("gold-divider", className)} />;
    }

    if (variant === "with-icon") {
        return (
            <div className={cn("relative flex items-center justify-center py-8", className)}>
                <div className="gold-divider flex-1" />
                <motion.div
                    className="mx-4 p-2 rounded-full bg-gold/10"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <Sparkles className="w-5 h-5 text-gold" />
                </motion.div>
                <div className="gold-divider flex-1" />
            </div>
        );
    }

    // Default: animated
    return <div className={cn("gold-divider-animated", className)} />;
}

interface SectionDividerProps {
    className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
    return (
        <div className={cn("relative py-12", className)}>
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-background px-4 flex items-center gap-2">
                    <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-gold" />
                    <Sparkles className="w-4 h-4 text-gold" />
                    <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-gold" />
                </span>
            </div>
        </div>
    );
}
