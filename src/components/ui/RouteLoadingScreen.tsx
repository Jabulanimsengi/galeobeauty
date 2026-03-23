import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { cn } from "@/lib/utils";

interface RouteLoadingScreenProps {
    className?: string;
    message?: string;
}

export function RouteLoadingScreen({
    className,
    message = "Loading...",
}: RouteLoadingScreenProps) {
    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background",
                className
            )}
        >
            <div className="relative mb-8">
                <CloudinaryImage
                    src="/images/logo.png"
                    alt="Galeo Beauty"
                    width={200}
                    height={80}
                    className="h-20 w-auto animate-pulse"
                    priority
                    noSpinner
                />
            </div>

            <div className="h-1 w-48 overflow-hidden rounded-full bg-secondary/30">
                <div className="animate-loading-shimmer h-full w-1/2 rounded-full bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark" />
            </div>

            <p className="mt-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {message}
            </p>
        </div>
    );
}
