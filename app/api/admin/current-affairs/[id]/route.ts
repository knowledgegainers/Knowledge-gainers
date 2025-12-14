
import { db } from "@/db";
import { currentAffairs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, content, imageUrl, date } = body;

        await db.update(currentAffairs)
            .set({
                title,
                content,
                imageUrl,
                date: new Date(date)
            })
            .where(eq(currentAffairs.id, id));

        return NextResponse.json({ message: "Current affair updated" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update current affair" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await db.delete(currentAffairs).where(eq(currentAffairs.id, id));
        return NextResponse.json({ message: "Current affair deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete current affair" }, { status: 500 });
    }
}
