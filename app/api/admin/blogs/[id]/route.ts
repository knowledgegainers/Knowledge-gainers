import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, slug, content, excerpt, imageUrl, isPublished, category, author, publishedAt } = body;

        const data = await db.update(blogs).set({
            title,
            slug,
            content,
            excerpt,
            imageUrl,
            isPublished,
            category,
            author,
            publishedAt: publishedAt ? new Date(publishedAt) : null,
            updatedAt: new Date(),
        }).where(eq(blogs.id, id)).returning();

        return NextResponse.json(data[0]);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await db.delete(blogs).where(eq(blogs.id, id));
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
