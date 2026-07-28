export default function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-2 border-border" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
                </div>
                <span className="text-sm font-medium text-text-muted animate-pulse">Loading...</span>
            </div>
        </div>
    );
}
