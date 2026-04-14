import { db } from "@/db";
import { mockTests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data = await db.select().from(mockTests).where(eq(mockTests.id, id));
        return NextResponse.json(data[0]);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, slug, description, duration, totalQuestions, difficulty, displayMode, isActive, scheduledDate } = body;

        const data = await db.update(mockTests)
            .set({
                title,
                slug,
                description,
                duration: Number(duration),
                totalQuestions: Number(totalQuestions),
                difficulty,
                displayMode,
                isActive,
                scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
                updatedAt: new Date(),
            })
            .where(eq(mockTests.id, id))
            .returning();

        return NextResponse.json(data[0]);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await db.delete(mockTests).where(eq(mockTests.id, id));
        return new NextResponse("Deleted", { status: 200 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
