import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number;
}

export function Spinner({ className, size = 48, ...props }: SpinnerProps) {
    return (
        <div
            className={cn("flex justify-center items-center", className)}
            {...props}
        >
            <Loader2
                className="animate-spin text-gold"
                size={size}
                strokeWidth={1.5}
            />
        </div>
    );
}
