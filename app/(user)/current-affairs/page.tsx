import { Suspense } from "react";
import { getCurrentAffairs, getCurrentAffairsCategories } from "@/app/actions/current-affairs";
import CurrentAffairsClient from "./client";

export default async function CurrentAffairsPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; month?: string }>;
}) {
    const { query, month } = await searchParams;
    // "month" param could be full name e.g. "january"
    const categories = await getCurrentAffairsCategories();
    // Assuming getCategories returns array of strings
    const categoriesList = categories.map(c => c || "Uncategorized"); // Handle nulls if any

    const posts = await getCurrentAffairs(query, month);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CurrentAffairsClient initialPosts={posts} categories={categoriesList} />
        </Suspense>
    );
}
