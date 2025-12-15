import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSavedBooks } from "@/app/actions/books";
import { getSavedNotifications } from "@/app/actions/notifications";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { DashboardResults } from "./results";
import { DashboardLoader } from "@/components/dashboard/dashboard-loader";

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ tab?: string }>;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const resolvedSearchParams = await searchParams;
    const tab = resolvedSearchParams.tab || "books";

    // We fetch counts for the tabs separately or we can just fetch all?
    // The previous implementation fetched everything.
    // To keep tabs showing correct counts, we sadly need to fetch the lists or at least counts.
    // Let's fetch both for now to support the counts in the tabs, 
    // BUT we can use Suspense for the MAIN content list.
    // Wait, if we fetch both here just for counts, we defeat the purpose of Suspense for the list loading if we await them here.
    // We should probably just pass the counts if we can get them cheaply, or move the fetch into the Tabs component?
    // React Server Components allowing parallel fetching:
    const savedBooksPromise = getSavedBooks(userId);
    const savedNotificationsPromise = getSavedNotifications(userId);

    // We await here for the initial page load to get counts. 
    // To make it truly Suspense-y for the *switch*, we might want to avoid blocking the whole page.
    // However, the counts are in the tabs which are above the fold. 
    // If we want the tabs to load instantly, we might need a separate component for counts that suspends itself?
    // For now, let's keep it simple: await both for the tabs (since they need counts), 
    // but the LIST (the heavy part if paginated eventually) could be suspended.
    // Actually, if we await top level, Suspense won't trigger on initial load for the children unless we use a loading.tsx.
    // But for fast tab switching, we want the *content* to suspend.

    // Let's await the data for counts.
    const [savedBooks, savedNotifications] = await Promise.all([savedBooksPromise, savedNotificationsPromise]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">My Dashboard</h1>
                    </div>
                    <DashboardTabs bookCount={savedBooks.length} notifCount={savedNotifications.length} />
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Suspense key={tab} fallback={<DashboardLoader />}>
                    <DashboardResults tab={tab} />
                </Suspense>
            </main>
        </div>
    );
}