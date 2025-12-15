import { Skeleton } from "@/components/ui/skeleton";

export function BooksLoader() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
                        {/* Thumbnail Skeleton */}
                        <div className="relative aspect-[4/3]">
                            <Skeleton className="w-full h-full" />
                        </div>

                        {/* Content Skeleton */}
                        <div className="p-5 space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                            <div className="pt-2">
                                <Skeleton className="h-9 w-full rounded-md" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
