
import { db } from "@/db";
export const dynamic = 'force-dynamic';
import { books } from "@/db/schema";
import { desc } from "drizzle-orm";
import { BooksClient } from "./client";

async function getBooks() {
    return await db.query.books.findMany({
        with: {
            category: true,
        },
        orderBy: (books, { desc }) => [desc(books.createdAt)],
    });
}

export default async function BooksPage() {
    const booksData = await getBooks();

    return <BooksClient initialBooks={booksData} />;
}
