import { Skeleton } from "@/components/ui/skeleton";

export function CurrentAffairsLoader() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-8 w-48" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card rounded-2xl border border-border p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <Skeleton className="h-5 w-24 rounded-full" />
                        </div>
                        <Skeleton className="h-7 w-3/4 mb-3" />
                        <div className="space-y-2 mb-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
