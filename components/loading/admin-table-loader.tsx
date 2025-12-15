
import { Skeleton } from "@/components/ui/skeleton";

export function AdminTableLoader() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-32" />
            </div>

            <div className="border border-border rounded-md">
                <div className="p-4 border-b border-border">
                    <div className="flex gap-4">
                        <Skeleton className="h-6 w-full" />
                    </div>
                </div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-4 border-b border-border last:border-0">
                        <div className="flex gap-4">
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
