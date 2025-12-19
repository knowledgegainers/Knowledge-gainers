import { db } from "@/db";
import { examPapers, examTypes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ExamPaperForm } from "../exam-paper-form";
import { notFound } from "next/navigation";

async function getExamTypes() {
    return await db.select().from(examTypes).orderBy(desc(examTypes.createdAt));
}

async function getExamPaper(id: string) {
    const paper = await db.query.examPapers.findFirst({
        where: eq(examPapers.id, id),
    });
    return paper;
}

export default async function EditExamPaperPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const paper = await getExamPaper(id);
    const types = await getExamTypes();

    if (!paper) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Exam Paper</h2>
                <p className="text-muted-foreground">Edit details for {paper.title}</p>
            </div>
            <ExamPaperForm initialData={paper} types={types} />
        </div>
    );
}
