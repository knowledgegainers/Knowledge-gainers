"use server";

import { db } from "@/db";
import { notifications, notificationTypes } from "@/db/schema";
import { eq, desc, like, and, or } from "drizzle-orm";

export type NotificationWithType = typeof notifications.$inferSelect & {
    type: typeof notificationTypes.$inferSelect;
};

export async function getNotifications(search?: string, typeId?: string) {
    let whereClause = undefined;
    const conditions = [];

    if (search) {
        conditions.push(or(like(notifications.title, `%${search}%`), like(notifications.description, `%${search}%`)));
    }
    if (typeId && typeId !== "all") {
        conditions.push(eq(notifications.typeId, typeId));
    }

    if (conditions.length > 0) {
        whereClause = and(...conditions);
    }

    const data = await db.query.notifications.findMany({
        where: whereClause,
        with: {
            type: true,
        },
        orderBy: desc(notifications.createdAt),
    });

    return data;
}

export async function getNotificationTypes() {
    return await db.select().from(notificationTypes).orderBy(desc(notificationTypes.createdAt));
}
