
import { db } from "@/db";
import { books, bookCategories } from "@/db/schema";
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

async function getCategories() {
    return await db.select().from(bookCategories).orderBy(desc(bookCategories.createdAt));
}

export default async function BooksPage() {
    const booksData = await getBooks();
    const categoriesData = await getCategories();

    return <BooksClient initialBooks={booksData} categories={categoriesData} />;
}
