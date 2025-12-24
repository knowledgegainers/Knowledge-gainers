import { db } from "@/db";
import { books } from "@/db/schema";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";

async function populateBookSlugs() {
    console.log("Starting to populate book slugs...");

    const allBooks = await db.select().from(books);

    console.log(`Found ${allBooks.length} books to process`);

    for (const book of allBooks) {
        if (!book.slug) {
            const slug = slugify(book.title);
            await db.update(books)
                .set({ slug })
                .where(eq(books.id, book.id));
            console.log(`Updated book: ${book.title} -> ${slug}`);
        } else {
            console.log(`Book already has slug: ${book.title} -> ${book.slug}`);
        }
    }

    console.log("Done!");
    process.exit(0);
}

populateBookSlugs().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
