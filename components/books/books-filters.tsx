"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { bookCategories } from "@/db/schema";

type Category = typeof bookCategories.$inferSelect;

interface BooksFiltersProps {
    categories: Category[];
}

export function BooksFilters({ categories }: BooksFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get initial state from URL
    const initialCategory = searchParams.get("category") || "all";
    const initialQuery = searchParams.get("query") || "";
    const initialView = (searchParams.get("view") as "grid" | "list") || "grid";

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [viewMode, setViewMode] = useState<"grid" | "list">(initialView);

    // Sync local state with URL params if they change externally (e.g. back button)
    useEffect(() => {
        setSelectedCategory(initialCategory);
        setSearchQuery(initialQuery);
        setViewMode(initialView);
    }, [initialCategory, initialQuery, initialView]);

    // Debounce search update
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery !== initialQuery) {
                updateUrl(selectedCategory, searchQuery, viewMode);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const updateUrl = (category: string, query: string, view: string) => {
        const params = new URLSearchParams(searchParams);

        if (category && category !== "all") params.set("category", category);
        else params.delete("category");

        if (query) params.set("query", query);
        else params.delete("query");

        if (view && view !== "grid") params.set("view", view);
        else params.delete("view");

        router.push(`/books?${params.toString()}`, { scroll: false });
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        updateUrl(categoryId, searchQuery, viewMode);
    };

    const handleViewChange = (mode: "grid" | "list") => {
        setViewMode(mode);
        updateUrl(selectedCategory, searchQuery, mode);
    };

    const categoryList = [
        { id: "all", label: "All Books" },
        ...categories.map(c => ({ id: c.id, label: c.name }))
    ];

    return (
        <section className="py-8 bg-card border-y border-border sticky top-16 z-40 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    {/* Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                        {categoryList.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleCategoryChange(category.id)}
                                className="whitespace-nowrap"
                            >
                                {category.label}
                            </Button>
                        ))}
                    </div>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
                            <Input
                                placeholder="Search books..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 text-black"
                            />
                        </div>
                        <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                            <button
                                onClick={() => handleViewChange("grid")}
                                className={cn(
                                    "p-2 rounded-md transition-colors",
                                    viewMode === "grid" ? "bg-primary text-black" : "hover:bg-blue-50"
                                )}
                                aria-label="Grid view"
                            >
                                <Grid className="h-4 w-4 text-black" />
                            </button>
                            <button
                                onClick={() => handleViewChange("list")}
                                className={cn(
                                    "p-2 rounded-md transition-colors",
                                    viewMode === "list" ? "bg-primary text-black" : "hover:bg-blue-50"
                                )}
                                aria-label="List view"
                            >
                                <List className="h-4 w-4 text-black" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
