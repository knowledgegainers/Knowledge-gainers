
import { db } from "@/db";
import { examPapers } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/utils";

export async function GET() {
    try {
        const data = await db.query.examPapers.findMany({
            with: {
                type: true,
            },
            orderBy: (examPapers, { desc }) => [desc(examPapers.createdAt)],
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch exam papers" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, typeId, year, description, fileUrl } = body;

        if (!title || !typeId || !year || !fileUrl) {
            return NextResponse.json({ error: "Title, Type, Year, and File URL are required" }, { status: 400 });
        }

        const slug = slugify(title);

        const data = await db.insert(examPapers).values({
            title,
            slug,
            typeId,
            year: parseInt(year),
            description,
            fileUrl,
        }).returning();
        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create exam paper" }, { status: 500 });
    }
}
