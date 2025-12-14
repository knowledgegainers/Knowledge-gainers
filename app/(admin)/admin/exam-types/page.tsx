
import { db } from "@/db";
import { examTypes } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ExamTypesClient } from "./client";

async function getExamTypes() {
    return await db.select().from(examTypes).orderBy(desc(examTypes.createdAt));
}

export default async function ExamTypesPage() {
    const data = await getExamTypes();
    return <ExamTypesClient initialData={data} />;
}
