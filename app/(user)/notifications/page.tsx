import { Suspense } from "react";
import { Bell } from "lucide-react";
import { getNotificationTypes } from "@/app/actions/notifications";
import { NotificationsFilters } from "@/components/notifications/notifications-filters";
import { NotificationsResults } from "./results";
import { NotificationsLoader } from "@/components/notifications/notifications-loader";

export default async function NotificationsPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; typeId?: string }>;
}) {
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams.query || "";
    const typeId = resolvedSearchParams.typeId || "all";

    const types = await getNotificationTypes();

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium mb-6">
                            <Bell className="h-4 w-4 " />
                            Stay Updated
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Latest <span className="gradient-text">Notifications</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Never miss important exam dates and job application deadlines.
                            Get all government job and exam notifications in one place.
                        </p>
                    </div>
                </div>
            </section>

            <NotificationsFilters types={types} />

            <section className="py-12 lg:py-16">
                <Suspense key={`${query}-${typeId}`} fallback={<NotificationsLoader />}>
                    <NotificationsResults query={query} typeId={typeId} />
                </Suspense>
            </section>
        </div>
    );
}
