
import { db } from "@/db";
export const dynamic = 'force-dynamic';
import { examPapers, examTypes } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ExamPapersClient } from "./client";

async function getExamPapers() {
    return await db.query.examPapers.findMany({
        with: {
            type: true,
        },
        orderBy: (examPapers, { desc }) => [desc(examPapers.createdAt)],
    });
}

async function getExamTypes() {
    return await db.select().from(examTypes).orderBy(desc(examTypes.createdAt));
}

export default async function ExamPapersPage() {
    const papersData = await getExamPapers();
    const typesData = await getExamTypes();

    return <ExamPapersClient initialPapers={papersData} types={typesData} />;
}
