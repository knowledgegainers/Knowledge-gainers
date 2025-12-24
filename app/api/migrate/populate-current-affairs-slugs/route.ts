import { db } from "@/db";
import { currentAffairs } from "@/db/schema";
import { slugify } from "@/lib/utils";
import { eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Get all current affairs without slugs
        const itemsWithoutSlugs = await db.select().from(currentAffairs).where(isNull(currentAffairs.slug));

        console.log(`Found ${itemsWithoutSlugs.length} current affairs without slugs`);

        const updates = [];

        for (const item of itemsWithoutSlugs) {
            const slug = slugify(item.title);
            await db.update(currentAffairs)
                .set({ slug })
                .where(eq(currentAffairs.id, item.id));

            updates.push({ id: item.id, title: item.title, slug });
        }

        return NextResponse.json({
            success: true,
            message: `Updated ${updates.length} current affairs`,
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
