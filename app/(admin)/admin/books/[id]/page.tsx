
import { db } from "@/db";
import { books, bookCategories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { BookForm } from "../book-form";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditBookPage({ params }: PageProps) {
    const { id } = await params;
    const book = await db.query.books.findFirst({
        where: eq(books.id, id),
    });

    if (!book) return notFound();

    const categories = await db.select().from(bookCategories);

    return (
        <div className="flex-1 space-y-4 p-4 pt-0">
            <div className="py-4">
                <BookForm initialData={book} categories={categories} />
            </div>
        </div>
    );
}
