"use server";

import { db } from "@/db";
import { examPapers, examTypes } from "@/db/schema";
import { eq, desc, like, and, or } from "drizzle-orm";

export type ExamPaperWithType = typeof examPapers.$inferSelect & {
    type: typeof examTypes.$inferSelect;
};

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

export async function getExamTypes() {
    return await db.select().from(examTypes).orderBy(desc(examTypes.createdAt));
}
