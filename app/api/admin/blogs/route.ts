import { db } from "@/db";
import { blogs } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
        return NextResponse.json(data);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, slug, content, excerpt, imageUrl, isPublished, category, author, publishedAt } = body;

        const data = await db.insert(blogs).values({
            title,
            slug,
            content,
            excerpt,
            imageUrl,
            isPublished,
            category,
            author,
            publishedAt: publishedAt ? new Date(publishedAt) : null,
        }).returning();

        return NextResponse.json(data[0]);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
