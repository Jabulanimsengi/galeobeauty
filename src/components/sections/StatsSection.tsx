"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, Sparkles, Clock } from "lucide-react";

interface StatItemProps {
    value: number;
    suffix: string;
    label: string;
    description: string;
    delay?: number;
    icon: React.ElementType;
}

function StatItem({ value, suffix, label, description, delay = 0, icon: Icon }: StatItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            className="text-center p-4 sm:p-6 rounded-xl bg-white/50 dark:bg-white/5 border border-border/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground">
                    {count}
                </span>
                <span className="font-serif text-xl sm:text-2xl text-gold">
                    {suffix}
                </span>
            </div>
            <span className="text-sm sm:text-base font-medium text-foreground block mb-1">
                {label}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">
                {description}
            </span>
        </motion.div>
    );
}

export function StatsSection() {
    const stats = [
        {
            value: 500,
            suffix: "+",
            label: "Clients",
            description: "Satisfied customers",
            icon: Users
        },
        {
            value: 15,
            suffix: "+",
            label: "Years Experience",
            description: "In medical aesthetics",
            icon: Award
        },
        {
            value: 100,
            suffix: "+",
            label: "Treatments",
            description: "From facials to body",
            icon: Sparkles
        },
        {
            value: 6,
            suffix: "",
            label: "Days a Week",
            description: "Mon-Sat availability",
            icon: Clock
        },
    ];

    return (
        <section className="py-16 md:py-24 lg:py-28 bg-gold/10">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-10 md:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-gold text-xs uppercase tracking-[0.3em] mb-3 block font-sans font-semibold">
                        Why Choose Us
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold">
                        The Numbers Speak
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={stat.label}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            description={stat.description}
                            icon={stat.icon}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
