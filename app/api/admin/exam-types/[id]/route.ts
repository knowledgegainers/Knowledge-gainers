
import { db } from "@/db";
import { examTypes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, slug, description } = body;

        await db.update(examTypes)
            .set({ name, slug, description, updatedAt: new Date() })
            .where(eq(examTypes.id, id));

        return NextResponse.json({ message: "Exam type updated" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update exam type" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await db.delete(examTypes).where(eq(examTypes.id, id));
        return NextResponse.json({ message: "Exam type deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete exam type" }, { status: 500 });
    }
}
