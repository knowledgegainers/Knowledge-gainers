
import { db } from "@/db";
import { notificationTypes } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NotificationTypesClient } from "./client";

async function getNotificationTypes() {
    return await db.select().from(notificationTypes).orderBy(desc(notificationTypes.createdAt));
}

export default async function NotificationTypesPage() {
    const data = await getNotificationTypes();
    return <NotificationTypesClient initialData={data} />;
}
