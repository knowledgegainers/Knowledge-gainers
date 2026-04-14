import { db } from "@/db";
import { mockTestQuestions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string, questionId: string }> }) {
    try {
        const { questionId } = await params;
        const body = await req.json();
        const { question, options, correctAnswer, explanation, order, imageUrl, marks, negativeMarks } = body;

        const data = await db.update(mockTestQuestions)
            .set({
                question,
                options,
                correctAnswer: Number(correctAnswer),
                explanation,
                imageUrl,
                marks: Number(marks || 1),
                negativeMarks: Number(negativeMarks || 0),
                order: Number(order || 0),
            })
            .where(eq(mockTestQuestions.id, questionId))
            .returning();

        return NextResponse.json(data[0]);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string, questionId: string }> }) {
    try {
        const { questionId } = await params;
        await db.delete(mockTestQuestions).where(eq(mockTestQuestions.id, questionId));
        return new NextResponse("Deleted", { status: 200 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
