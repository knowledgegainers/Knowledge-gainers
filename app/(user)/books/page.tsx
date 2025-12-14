import { Suspense } from "react";
import { getBooks, getBookCategories } from "@/app/actions/books";
import BooksClient from "./client";

export default async function BooksPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; query?: string }>;
}) {
    const { category, query } = await searchParams;
    const categories = await getBookCategories();
    const books = await getBooks(query, category);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BooksClient initialBooks={books} categories={categories} />
        </Suspense>
    );
}
