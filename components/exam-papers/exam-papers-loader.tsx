import { Skeleton } from "@/components/ui/skeleton";

export function ExamPapersLoader() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Skeleton className="h-4 w-64" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-card rounded-2xl border border-border p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <Skeleton className="h-12 w-12 rounded-xl" />
                            <Skeleton className="h-5 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="flex items-center gap-4 mb-5">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-9 w-full rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    );
}
