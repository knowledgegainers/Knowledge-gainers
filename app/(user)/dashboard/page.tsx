import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSavedBooks } from "@/app/actions/books";
import { getSavedNotifications } from "@/app/actions/notifications";
import { DashboardClient } from "./client";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const savedBooks = await getSavedBooks(userId);
    const savedNotifications = await getSavedNotifications(userId);

    return <DashboardClient savedBooks={savedBooks} savedNotifications={savedNotifications} />;
}