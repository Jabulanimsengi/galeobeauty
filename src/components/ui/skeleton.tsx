import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div className={cn("skeleton", className)} />
    );
}

export function SkeletonCard({ className }: SkeletonProps) {
    return (
        <div className={cn("glass-premium rounded-2xl p-6 space-y-4", className)}>
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
            </div>
        </div>
    );
}

export function SkeletonText({
    lines = 3,
    className
}: SkeletonProps & { lines?: number }) {
    return (
        <div className={cn("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn(
                        "h-4",
                        i === lines - 1 ? "w-2/3" : "w-full"
                    )}
                />
            ))}
        </div>
    );
}

export function SkeletonAvatar({ className }: SkeletonProps) {
    return (
        <Skeleton className={cn("h-12 w-12 rounded-full", className)} />
    );
}

export function SkeletonImage({ className }: SkeletonProps) {
    return (
        <Skeleton className={cn("aspect-video w-full rounded-xl", className)} />
    );
}
