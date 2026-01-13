import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    return (
        <div className="flex h-[80vh] w-full items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <Spinner size={64} />
                <p className="text-gold font-serif text-lg animate-pulse">
                    Loading Beauty...
                </p>
            </div>
        </div>
    );
}
