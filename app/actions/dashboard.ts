"use server";

import { db } from "@/db";
import { books, examPapers, notifications, currentAffairs } from "@/db/schema";
import { count } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";

export async function getDashboardStats() {
    const client = await clerkClient();
    const userCount = await client.users.getCount();
    const [bookCount] = await db.select({ count: count() }).from(books);
    const [examCount] = await db.select({ count: count() }).from(examPapers);
    const [notificationCount] = await db.select({ count: count() }).from(notifications);
    const [currentAffairsCount] = await db.select({ count: count() }).from(currentAffairs);

    return {
        users: userCount || 0,
        books: bookCount?.count || 0,
        exams: examCount?.count || 0,
        notifications: notificationCount?.count || 0,
        currentAffairs: currentAffairsCount?.count || 0,
    };
}
