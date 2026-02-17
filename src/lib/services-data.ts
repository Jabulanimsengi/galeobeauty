import { Sparkles, Scissors, Eye, Star, Zap, Heart, Syringe, Sun, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { serviceCategoriesContent, type ServiceCategoryContent } from "./services-content";

// ============================================
// CENTRALIZED SERVICES DATA
// ============================================
// This file is the single source of truth for all services.
// Update prices here and they reflect on both Prices and Booking pages.
// Prices sourced from Fresha booking system.
// ============================================

export type { ServiceItem, ServiceSubcategory } from "./services-content";

export interface ServiceCategory extends ServiceCategoryContent {
    Icon: LucideIcon;
}

// Map icons to categories
const iconMap: Record<string, LucideIcon> = {
    "hart-aesthetics": Syringe,
    "fat-freezing": Zap,
    "slimming": Heart, // Inferred
    "massages": Heart,
    "dermalogica": Sparkles,
    "ipl": Zap,
    "makeup": Palette,
    "medical": Syringe,
    "permanent-makeup": Palette, // Inferred
    "qms": Star,
    "sunbed": Sun,
    "waxing": Scissors,
    "hair": Scissors,
    "nails": Palette, // Using Palette for Art/Nails
    "lashes-brows": Eye,
    "hair-extensions": Scissors,
};

// Fallback icon
const DefaultIcon = Sparkles;

export const serviceCategories: ServiceCategory[] = serviceCategoriesContent.map((cat) => ({
    ...cat,
    Icon: iconMap[cat.id] || DefaultIcon,
}));


// Helper functions
export function getCategoryById(id: string): ServiceCategory | undefined {
    return serviceCategories.find((cat) => cat.id === id);
}

export function getAllCategories(): ServiceCategory[] {
    return serviceCategories;
}
