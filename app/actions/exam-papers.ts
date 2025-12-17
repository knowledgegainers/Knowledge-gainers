import { db } from "@/db";
import { examPapers, examTypes, savedExamPapers, users } from "@/db/schema";
import { eq, desc, like, and, or } from "drizzle-orm";

export type ExamPaperWithType = typeof examPapers.$inferSelect & {
    type: typeof examTypes.$inferSelect;
};

// ... existing getExamPapers ...

export async function getExamPapers(search?: string, typeId?: string, year?: string) {
    let whereClause = undefined;
    const conditions = [];

    if (search) {
        conditions.push(or(like(examPapers.title, `%${search}%`), like(examPapers.description, `%${search}%`)));
    }
    if (typeId && typeId !== "all") {
        conditions.push(eq(examPapers.typeId, typeId));
    }
    if (year && year !== "all") {
        conditions.push(eq(examPapers.year, parseInt(year)));
    }

    if (conditions.length > 0) {
        whereClause = and(...conditions);
    }

    const data = await db.query.examPapers.findMany({
        where: whereClause,
        with: {
            type: true,
        },
        orderBy: desc(examPapers.createdAt),
    });

    return data;
}

export async function getLatestExamPapers(limit: number = 6) {
    return await db.query.examPapers.findMany({
        with: {
            type: true,
        },
        orderBy: desc(examPapers.createdAt),
        limit: limit,
    });
}

export async function getExamTypes() {
    return await db.select().from(examTypes).orderBy(desc(examTypes.createdAt));
}

import { auth, currentUser } from "@clerk/nextjs/server";

// ... existing getExamTypes ...

export async function getSavedExamPapers(clerkId: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) return [];

    const saved = await db.query.savedExamPapers.findMany({
        where: eq(savedExamPapers.userId, user.id),
        with: {
            paper: {
                with: {
                    type: true,
                },
            },
        },
        orderBy: desc(savedExamPapers.createdAt),
    });

    return saved.map((s) => s.paper);
}

export async function getSavedExamPaperIds(clerkId: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) return [];

    const saved = await db.query.savedExamPapers.findMany({
        where: eq(savedExamPapers.userId, user.id),
        columns: {
            paperId: true,
        },
    });

    return saved.map((s) => s.paperId);
}

export async function toggleExamPaperSave(paperId: string) {
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

    const existing = await db.query.savedExamPapers.findFirst({
        where: and(eq(savedExamPapers.userId, user.id), eq(savedExamPapers.paperId, paperId)),
    });

    if (existing) {
        await db.delete(savedExamPapers).where(and(eq(savedExamPapers.userId, user.id), eq(savedExamPapers.paperId, paperId)));
        return { saved: false };
    } else {
        await db.insert(savedExamPapers).values({
            userId: user.id,
            paperId: paperId,
        });
        return { saved: true };
    }
}

export async function isExamPaperSaved(clerkId: string, paperId: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) return false;

    const existing = await db.query.savedExamPapers.findFirst({
        where: and(eq(savedExamPapers.userId, user.id), eq(savedExamPapers.paperId, paperId)),
    });

    return !!existing;
}

export async function getExamPaperById(id: string) {
    const paper = await db.query.examPapers.findFirst({
        where: eq(examPapers.id, id),
        with: {
            type: true,
        },
    });

    return paper;
}
