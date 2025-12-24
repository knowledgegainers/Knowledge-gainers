
import { db } from "@/db";
import { examPapers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { slugify } from "@/lib/utils";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, typeId, year, description, fileUrl } = body;

        const updateData: any = {
            title,
            typeId,
            year: parseInt(year),
            description,
            fileUrl
        };

        if (title) {
            updateData.slug = slugify(title);
        }

        await db.update(examPapers)
            .set(updateData)
            .where(eq(examPapers.id, id));

        return NextResponse.json({ message: "Exam paper updated" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update exam paper" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await db.delete(examPapers).where(eq(examPapers.id, id));
        return NextResponse.json({ message: "Exam paper deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete exam paper" }, { status: 500 });
    }
}
