import { db } from "@/db";
import { mockTestQuestions, mockTests } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { MockTestQuestionsClient } from "./client";

export const dynamic = 'force-dynamic';

export default async function ManageQuestionsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        notFound();
    }
    
    const testData = await db.query.mockTests.findFirst({
        where: eq(mockTests.id, id),
    });

    if (!testData) {
        notFound();
    }

    const questionsData = await db.select().from(mockTestQuestions)
        .where(eq(mockTestQuestions.testId, id))
        .orderBy(asc(mockTestQuestions.order), asc(mockTestQuestions.createdAt));

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <MockTestQuestionsClient mockTest={testData} questions={questionsData} />
        </div>
    );
}
