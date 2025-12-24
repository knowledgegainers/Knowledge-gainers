"use server";

import { db } from "@/db";
import { notifications, notificationTypes, savedNotifications, users } from "@/db/schema";
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

import { unstable_noStore as noStore } from "next/cache";

export async function getLatestNotifications(limit: number = 4) {
    noStore();
    return await db.query.notifications.findMany({
        with: {
            type: true,
        },
        orderBy: desc(notifications.createdAt),
        limit: limit,
    });
}

export async function getNotificationTypes() {
    return await db.select().from(notificationTypes).orderBy(desc(notificationTypes.createdAt));
}

import { auth, currentUser } from "@clerk/nextjs/server";

export async function getSavedNotifications(clerkId: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) return [];

    const saved = await db.query.savedNotifications.findMany({
        where: eq(savedNotifications.userId, user.id),
        with: {
            notification: {
                with: {
                    type: true,
                },
            },
        },
        orderBy: desc(savedNotifications.createdAt),
    });

    return saved.map((s) => s.notification);
}

export async function getSavedNotificationIds(clerkId: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) return [];

    const saved = await db.query.savedNotifications.findMany({
        where: eq(savedNotifications.userId, user.id),
        columns: {
            notificationId: true,
        },
    });

    return saved.map((s) => s.notificationId);
}

export async function toggleNotificationSave(notificationId: string) {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Unauthorized");

    let user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) {
        const clerkUser = await currentUser();
        if (!clerkUser) throw new Error("Unauthorized");

        const email = clerkUser.emailAddresses[0]?.emailAddress;
        if (!email) throw new Error("Email required");

        const [newUser] = await db.insert(users).values({
            clerkId,
            email,
        }).returning();

        user = newUser;
    }

    const existing = await db.query.savedNotifications.findFirst({
        where: and(eq(savedNotifications.userId, user.id), eq(savedNotifications.notificationId, notificationId)),
    });

    if (existing) {
        await db.delete(savedNotifications).where(and(eq(savedNotifications.userId, user.id), eq(savedNotifications.notificationId, notificationId)));
        return { saved: false };
    } else {
        await db.insert(savedNotifications).values({
            userId: user.id,
            notificationId: notificationId,
        });
        return { saved: true };
    }
}

export async function isNotificationSaved(clerkId: string, notificationId: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) return false;

    const existing = await db.query.savedNotifications.findFirst({
        where: and(eq(savedNotifications.userId, user.id), eq(savedNotifications.notificationId, notificationId)),
    });

    return !!existing;
}

export async function getNotificationById(id: string) {
    const notification = await db.query.notifications.findFirst({
        where: eq(notifications.id, id),
        with: {
            type: true,
        },
    });

    return notification;
}

export async function getNotificationBySlug(slug: string) {
    const notification = await db.query.notifications.findFirst({
        where: eq(notifications.slug, slug),
        with: {
            type: true,
        },
    });

    return notification;
}
