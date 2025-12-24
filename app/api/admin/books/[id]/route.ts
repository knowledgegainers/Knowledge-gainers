
import { db } from "@/db";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { slugify } from "@/lib/utils";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, categoryId, description, fileUrl, thumbnailUrl } = body;

        const updateData: any = {
            title,
            categoryId,
            description,
            fileUrl,
            thumbnailUrl
        };

        if (title) {
            updateData.slug = slugify(title);
        }

        await db.update(books)
            .set(updateData)
            .where(eq(books.id, id));

        return NextResponse.json({ message: "Book updated" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await db.delete(books).where(eq(books.id, id));
        return NextResponse.json({ message: "Book deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
    }
}
