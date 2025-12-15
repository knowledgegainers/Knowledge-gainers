import { Suspense } from "react";
import { getBookCategories } from "@/app/actions/books";
import { BooksFilters } from "@/components/books/books-filters";
import { BooksResults } from "./results";
import { BooksLoader } from "@/components/books/books-loader";
import { BookOpen } from "lucide-react";

export default async function BooksPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; query?: string; view?: string }>;
}) {
    const resolvedSearchParams = await searchParams;
    const category = resolvedSearchParams.category || "all";
    const query = resolvedSearchParams.query || "";
    const viewMode = (resolvedSearchParams.view as "grid" | "list") || "grid";

    // Fetch categories for the filter component (fast, cached)
    const categories = await getBookCategories();

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium mb-6">
                            <BookOpen className="h-4 w-4" />
                            Study Materials
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Explore Our <span className="gradient-text">Book Library</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Browse through thousands of books across various categories. Download study materials
                            for free and ace your exams.
                        </p>
                    </div>
                </div>
            </section>

            <BooksFilters categories={categories} />

            <section className="py-12 lg:py-16">
                <Suspense key={`${category}-${query}-${viewMode}`} fallback={<BooksLoader />}>
                    <BooksResults query={query} category={category} viewMode={viewMode} />
                </Suspense>
            </section>
        </div>
    );
}
