import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { getBooks, getBookCategories, getSavedBookIds } from "@/app/actions/books";
import BooksClient from "./client";

export default async function BooksPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; query?: string }>;
}) {
    const { category, query } = await searchParams;
    const { userId } = await auth();
    const categories = await getBookCategories();
    const books = await getBooks(query, category);
    const savedBookIds = userId ? await getSavedBookIds(userId) : [];

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BooksClient initialBooks={books} categories={categories} savedBookIds={savedBookIds} />
        </Suspense>
    );
}
