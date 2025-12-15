
import { auth } from "@clerk/nextjs/server";
import { getSavedBooks } from "@/app/actions/books";
import { getSavedNotifications } from "@/app/actions/notifications";
import { SavedBooksList } from "@/components/dashboard/saved-books-list";
import { SavedNotificationsList } from "@/components/dashboard/saved-notifications-list";

interface DashboardResultsProps {
    tab: string;
}

export async function DashboardResults({ tab }: DashboardResultsProps) {
    const { userId } = await auth();
    if (!userId) return null;

    if (tab === "notifications") {
        const savedNotifications = await getSavedNotifications(userId);
        return <SavedNotificationsList notifications={savedNotifications} />;
    }

    // Default to books
    const savedBooks = await getSavedBooks(userId);
    return <SavedBooksList books={savedBooks} />;
}
