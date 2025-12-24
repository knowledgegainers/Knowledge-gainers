import { db } from "@/db";
import { books } from "@/db/schema";
import { slugify } from "@/lib/utils";
import { eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Get all books without slugs
        const booksWithoutSlugs = await db.select().from(books).where(isNull(books.slug));

        console.log(`Found ${booksWithoutSlugs.length} books without slugs`);

        const updates = [];

        for (const book of booksWithoutSlugs) {
            const slug = slugify(book.title);
            await db.update(books)
                .set({ slug })
                .where(eq(books.id, book.id));

            updates.push({ id: book.id, title: book.title, slug });
        }

        return NextResponse.json({
            success: true,
            message: `Updated ${updates.length} books`,
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
