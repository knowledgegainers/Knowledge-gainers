import { Skeleton } from "@/components/ui/skeleton";

export function NotificationsLoader() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Skeleton className="h-4 w-64" />
            </div>

            <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card rounded-2xl border border-border p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                            {/* Icon */}
                            <Skeleton className="shrink-0 h-14 w-14 rounded-xl" />

                            {/* Content */}
                            <div className="flex-1 min-w-0 space-y-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Skeleton className="h-6 w-48" />
                                    <Skeleton className="h-5 w-24 rounded-full" />
                                </div>
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <div className="flex flex-wrap items-center gap-4">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>

                            {/* Action */}
                            <Skeleton className="shrink-0 h-10 w-32 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
