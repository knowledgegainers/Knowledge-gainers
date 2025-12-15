
import { auth } from "@clerk/nextjs/server";
import { getBooks, getSavedBookIds } from "@/app/actions/books";
import { BooksList } from "@/components/books/books-list";

interface BooksResultsProps {
    query: string;
    category: string;
    viewMode: "grid" | "list";
}

export async function BooksResults({ query, category, viewMode }: BooksResultsProps) {
    const { userId } = await auth();
    // Intentionally await here inside the Suspense boundary
    const books = await getBooks(query, category);
    const savedBookIds = userId ? await getSavedBookIds(userId) : [];

    return (
        <BooksList
            books={books}
            savedBookIds={savedBookIds}
            viewMode={viewMode}
        />
    );
}
