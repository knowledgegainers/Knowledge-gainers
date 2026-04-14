import { db } from "@/db";
import { mockTestQuestions } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data = await db.select().from(mockTestQuestions)
            .where(eq(mockTestQuestions.testId, id))
            .orderBy(asc(mockTestQuestions.order));
        return NextResponse.json(data);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { question, options, correctAnswer, explanation, order, imageUrl, marks, negativeMarks } = body;

        const data = await db.insert(mockTestQuestions).values({
            testId: id,
            question,
            options,
            correctAnswer: Number(correctAnswer),
            explanation,
            imageUrl,
            marks: Number(marks || 1),
            negativeMarks: Number(negativeMarks || 0),
            order: Number(order || 0),
        }).returning();

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
