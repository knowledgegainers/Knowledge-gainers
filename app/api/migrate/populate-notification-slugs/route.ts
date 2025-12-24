import { db } from "@/db";
import { notifications } from "@/db/schema";
import { slugify } from "@/lib/utils";
import { eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Get all notifications without slugs
        const notificationsWithoutSlugs = await db.select().from(notifications).where(isNull(notifications.slug));

        console.log(`Found ${notificationsWithoutSlugs.length} notifications without slugs`);

        const updates = [];

        for (const notification of notificationsWithoutSlugs) {
            const slug = slugify(notification.title);
            await db.update(notifications)
                .set({ slug })
                .where(eq(notifications.id, notification.id));

            updates.push({ id: notification.id, title: notification.title, slug });
        }

        return NextResponse.json({
            success: true,
            message: `Updated ${updates.length} notifications`,
            updates
        });
    } catch (error) {
        console.error("Migration error:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
