import { db } from "@/db";
import { examPapers } from "@/db/schema";
import { slugify } from "@/lib/utils";
import { eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Get all exam papers without slugs
        const papersWithoutSlugs = await db.select().from(examPapers).where(isNull(examPapers.slug));

        console.log(`Found ${papersWithoutSlugs.length} exam papers without slugs`);

        const updates = [];

        for (const paper of papersWithoutSlugs) {
            const slug = slugify(paper.title);
            await db.update(examPapers)
                .set({ slug })
                .where(eq(examPapers.id, paper.id));

            updates.push({ id: paper.id, title: paper.title, slug });
        }

        return NextResponse.json({
            success: true,
            message: `Updated ${updates.length} exam papers`,
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
