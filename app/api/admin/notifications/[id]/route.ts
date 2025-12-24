
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/utils";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, description, typeId, applyLink, expiryDate } = body;

        const slug = slugify(title);

        await db.update(notifications)
            .set({
                title,
                description,
                typeId,
                applyLink,
                expiryDate: expiryDate ? new Date(expiryDate) : null,
                slug,
            })
            .where(eq(notifications.id, id));

        return NextResponse.json({ message: "Notification updated" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await db.delete(notifications).where(eq(notifications.id, id));
        return NextResponse.json({ message: "Notification deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete notification" }, { status: 500 });
    }
}
