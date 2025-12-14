import { Suspense } from "react";
import { getNotifications, getNotificationTypes } from "@/app/actions/notifications";
import NotificationsClient from "./client";

export default async function NotificationsPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; typeId?: string }>;
}) {
    const { query, typeId } = await searchParams;
    const types = await getNotificationTypes();
    const notifications = await getNotifications(query, typeId);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NotificationsClient initialNotifications={notifications} types={types} />
        </Suspense>
    );
}
