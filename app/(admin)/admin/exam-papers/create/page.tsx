import { db } from "@/db";
import { examTypes } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ExamPaperForm } from "../exam-paper-form";

async function getExamTypes() {
    return await db.select().from(examTypes).orderBy(desc(examTypes.createdAt));
}

export default async function CreateExamPaperPage() {
    const types = await getExamTypes();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Create Exam Paper</h2>
                <p className="text-muted-foreground">Add a new past paper.</p>
            </div>
            <ExamPaperForm types={types} />
        </div>
    );
}
