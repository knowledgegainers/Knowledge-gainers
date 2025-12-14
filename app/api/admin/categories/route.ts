
import { db } from "@/db";
import { bookCategories } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await db.select().from(bookCategories).orderBy(desc(bookCategories.createdAt));
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, slug, description } = body;

        if (!name || !slug) {
            return NextResponse.json({ error: "Name and Slug are required" }, { status: 400 });
        }

        const data = await db.insert(bookCategories).values({ name, slug, description }).returning();
        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}
