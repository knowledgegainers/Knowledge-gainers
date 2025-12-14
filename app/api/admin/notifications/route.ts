
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await db.query.notifications.findMany({
            with: {
                type: true,
            },
            orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, description, typeId, applyLink, expiryDate } = body;

        if (!title || !description || !typeId) {
            return NextResponse.json({ error: "Title, Description, and Type are required" }, { status: 400 });
        }

        const data = await db.insert(notifications).values({
            title,
            description,
            typeId,
            applyLink,
            expiryDate: expiryDate ? new Date(expiryDate) : null,
        }).returning();
        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create notification" }, { status: 500 });
    }
}
