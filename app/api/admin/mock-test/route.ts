import { db } from "@/db";
import { mockTests } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await db.select().from(mockTests).orderBy(desc(mockTests.createdAt));
        return NextResponse.json(data);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, slug, description, duration, totalQuestions, difficulty, displayMode, isActive, scheduledDate } = body;

        const data = await db.insert(mockTests).values({
            title,
            slug,
            description,
            duration: Number(duration),
            totalQuestions: Number(totalQuestions),
            difficulty,
            displayMode,
            isActive,
            scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        }).returning();

        return NextResponse.json(data[0]);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
