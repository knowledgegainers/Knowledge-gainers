
import { getBookCategories } from "@/app/actions/book-categories";
export const dynamic = 'force-dynamic';
import { CategoriesClient } from "./client";

export default async function CategoriesPage() {
    const categories = await getBookCategories();

    return <CategoriesClient initialCategories={categories} />;
}
