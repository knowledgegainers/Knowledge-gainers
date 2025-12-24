
import { db } from "@/db";
import { currentAffairs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/utils";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, content, imageUrl, date } = body;

        const slug = slugify(title);

        await db.update(currentAffairs)
            .set({
                title,
                content,
                imageUrl,
                date: new Date(date),
                slug,
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
