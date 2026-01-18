import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ShieldCheck, Star, Activity, CheckCircle2 } from "lucide-react";

const badgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
                medical:
                    "border-transparent bg-[var(--clinical-slate)] text-white hover:bg-[var(--clinical-slate)]/90",
                premium:
                    "border-gold text-white bg-gold/80 hover:bg-gold",
                safe:
                    "border-transparent bg-[var(--medical-green)] text-white hover:bg-[var(--medical-green)]/90",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface TrustBadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    icon?: "shield" | "star" | "activity" | "check";
}

const icons = {
    shield: ShieldCheck,
    star: Star,
    activity: Activity,
    check: CheckCircle2,
};

function TrustBadge({ className, variant, icon, children, ...props }: TrustBadgeProps) {
    const IconComponent = icon ? icons[icon] : null;

    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props}>
            {IconComponent && <IconComponent className="h-3 w-3" />}
            {children}
        </div>
    );
}

export { TrustBadge, badgeVariants };
