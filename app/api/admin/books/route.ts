
import { db } from "@/db";
import { books } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { slugify } from "@/lib/utils";

export async function GET() {
    try {
        const data = await db.query.books.findMany({
            with: {
                category: true,
            },
            orderBy: (books, { desc }) => [desc(books.createdAt)],
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, categoryId, description, fileUrl, thumbnailUrl } = body;

        if (!title || !categoryId || !fileUrl) {
            return NextResponse.json({ error: "Title, Category, and File URL are required" }, { status: 400 });
        }

        const slug = slugify(title);

        const data = await db.insert(books).values({
            title,
            slug,
            categoryId,
            description,
            fileUrl,
            thumbnailUrl,
        }).returning();
        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
    }
}
