
import { db } from "@/db";
import { notifications, notificationTypes } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NotificationsClient } from "./client";

async function getNotifications() {
    return await db.query.notifications.findMany({
        with: {
            type: true,
        },
        orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
    });
}

async function getNotificationTypes() {
    return await db.select().from(notificationTypes).orderBy(desc(notificationTypes.createdAt));
}

export default async function NotificationsPage() {
    const notificationsData = await getNotifications();
    const typesData = await getNotificationTypes();

    return <NotificationsClient initialNotifications={notificationsData} types={typesData} />;
}
