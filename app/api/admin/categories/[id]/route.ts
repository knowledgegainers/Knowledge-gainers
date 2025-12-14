
import { db } from "@/db";
import { bookCategories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, slug, description } = body;

        await db.update(bookCategories)
            .set({ name, slug, description, updatedAt: new Date() })
            .where(eq(bookCategories.id, id));

        return NextResponse.json({ message: "Category updated" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await db.delete(bookCategories).where(eq(bookCategories.id, id));
        return NextResponse.json({ message: "Category deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
