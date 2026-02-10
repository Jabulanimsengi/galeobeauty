"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 sm:px-6 pt-28 lg:pt-36 pb-0">
            <ol className="flex items-center flex-wrap gap-1.5 text-sm text-muted-foreground">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="flex items-center gap-1.5">
                            {index > 0 && (
                                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
                            )}
                            {isLast || !item.href ? (
                                <span className="text-foreground font-medium truncate max-w-[200px]">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-gold transition-colors truncate max-w-[200px]"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
