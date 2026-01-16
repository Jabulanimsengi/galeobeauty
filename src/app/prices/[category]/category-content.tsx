"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { ServiceSubcategory } from "@/lib/services-data";

interface CategoryContentProps {
    subcategories: ServiceSubcategory[];
}

export function CategoryContent({ subcategories }: CategoryContentProps) {
    return (
        <section className="py-12 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {subcategories.map((subcategory, idx) => (
                        <motion.div
                            key={subcategory.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-border/40 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h2 className="font-serif text-xl text-foreground mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                {subcategory.title}
                            </h2>

                            <div className="space-y-4">
                                {subcategory.items.map((item) => (
                                    <div key={item.id} className="flex items-end justify-between border-b border-dashed border-muted/30 pb-2 last:border-0 last:pb-0">
                                        <div className="flex flex-col">
                                            <span className="text-foreground/90 font-medium">{item.name}</span>
                                            {item.duration && (
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {item.duration}
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-semibold text-gold whitespace-nowrap ml-4">{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            {subcategory.note && (
                                <p className="mt-4 text-xs text-muted-foreground italic bg-secondary/50 p-2 rounded-lg text-center">
                                    * {subcategory.note}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
