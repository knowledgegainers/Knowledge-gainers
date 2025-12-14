
import { db } from "@/db";
import { currentAffairs } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await db.select().from(currentAffairs).orderBy(desc(currentAffairs.date));
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch current affairs" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, content, imageUrl, date } = body;

        if (!title || !content || !date) {
            return NextResponse.json({ error: "Title, Content, and Date are required" }, { status: 400 });
        }

        const data = await db.insert(currentAffairs).values({
            title,
            content,
            imageUrl,
            date: new Date(date),
        }).returning();
        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create current affair" }, { status: 500 });
    }
}
