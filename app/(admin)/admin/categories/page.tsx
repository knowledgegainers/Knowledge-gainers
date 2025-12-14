
import { getBookCategories } from "@/app/actions/book-categories";
import { CategoriesClient } from "./client";

export default async function CategoriesPage() {
    const categories = await getBookCategories();

    return <CategoriesClient initialCategories={categories} />;
}
