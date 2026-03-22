"use server";

import { db } from "@/db";
import { books, examPapers, notifications, currentAffairs, blogs, mockTests } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";

export async function getDashboardStats() {
    const client = await clerkClient();
    const userCount = await client.users.getCount();
    const [bookCount] = await db.select({ count: count() }).from(books);
    const [examCount] = await db.select({ count: count() }).from(examPapers);
    const [notificationCount] = await db.select({ count: count() }).from(notifications);
    const [currentAffairsCount] = await db.select({ count: count() }).from(currentAffairs);
    const [blogCount] = await db.select({ count: count() }).from(blogs);
    const [mockTestCount] = await db.select({ count: count() }).from(mockTests);

    const activeMockTest = await db
        .select({
            title: mockTests.title,
            scheduledDate: mockTests.scheduledDate,
        })
        .from(mockTests)
        .where(eq(mockTests.isActive, true))
        .limit(1);

    return {
        users: userCount || 0,
        books: bookCount?.count || 0,
        exams: examCount?.count || 0,
        notifications: notificationCount?.count || 0,
        currentAffairs: currentAffairsCount?.count || 0,
        blogs: blogCount?.count || 0,
        mockTests: mockTestCount?.count || 0,
        weeklyMockTest: activeMockTest[0] || null,
    };
}
