
import { db } from "@/db";
import { notificationTypes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, slug, description } = body;

        await db.update(notificationTypes)
            .set({ name, slug, description, updatedAt: new Date() })
            .where(eq(notificationTypes.id, id));

        return NextResponse.json({ message: "Notification type updated" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update notification type" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await db.delete(notificationTypes).where(eq(notificationTypes.id, id));
        return NextResponse.json({ message: "Notification type deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete notification type" }, { status: 500 });
    }
}
