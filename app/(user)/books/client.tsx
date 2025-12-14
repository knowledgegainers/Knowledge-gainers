"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    Search,
    Download,
    User,
    Grid,
    List
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { BookWithCategory } from "@/app/actions/books";
import { bookCategories } from "@/db/schema";

type Category = typeof bookCategories.$inferSelect;

interface BooksClientProps {
    initialBooks: BookWithCategory[];
    categories: Category[];
}

export default function BooksClient({ initialBooks, categories }: BooksClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // transform categories for easier lookup
    const categoryLabels = categories.reduce((acc, cat) => {
        acc[cat.slug] = cat.name;
        return acc;
    }, {} as Record<string, string>);

    // Get initial state from URL
    const initialCategory = searchParams.get("category") || "all";
    const initialQuery = searchParams.get("query") || "";

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Debounce search update
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery !== initialQuery) {
                updateUrl(selectedCategory, searchQuery);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const updateUrl = (category: string, query: string) => {
        const params = new URLSearchParams();
        if (category && category !== "all") params.set("category", category);
        if (query) params.set("query", query);
        router.push(`/books?${params.toString()}`);
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        updateUrl(categoryId, searchQuery);
    };

    const categoryList = [
        { id: "all", label: "All Books" },
        ...categories.map(c => ({ id: c.id, label: c.name })) // Using ID for filtering in DB, but UI might want slugs? 
        // The previous code used IDs like "job-books" which look like slugs. 
        // My schema has both ID (uuid) and Slug. 
        // To keep it simple and consistent with how I wrote the getBooks action (which expects categoryId), I should use ID.
        // However, standard practiced is to use slugs in URL.
        // For now, let's stick to ID to ensure it matches the DB query exactly without extra lookup, 
        // OR I can change the action to look up by slug. 
        // The action `getBooks` takes `categoryId`. I'll stick to ID for now to be safe, or update action.
        // Let's use ID for reliability.
    ];

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

            {/* Filters & Search */}
            <section className="py-8 bg-card border-y border-border sticky top-16 z-40 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        {/* Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto  pb-2 lg:pb-0 w-full lg:w-auto">
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
                                    onClick={() => setViewMode("grid")}
                                    className={cn(
                                        "p-2 rounded-md transition-colors",
                                        viewMode === "grid" ? "bg-primary text-black" : "hover:bg-blue"
                                    )}
                                    aria-label="Grid view"
                                >
                                    <Grid className="h-4 w-4 text-black" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={cn(
                                        "p-2 rounded-md transition-colors",
                                        viewMode === "list" ? "bg-primary text-black" : "hover:bg-blue"
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

            {/* Books Grid/List */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Count */}
                    <p className="text-sm text-muted-foreground mb-6">
                        Showing {initialBooks.length} {initialBooks.length === 1 ? 'book' : 'books'}
                        {selectedCategory !== "all" && ` in ${categoryList.find(c => c.id === selectedCategory)?.label || 'Category'}`}
                    </p>

                    {/* Grid View */}
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {initialBooks.map((book, index) => (
                                <div
                                    key={book.id}
                                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={book.thumbnailUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"}
                                            alt={book.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Badge className="absolute top-3 left-3 bg-white hover:bg-primary text-black">
                                            {book.category.name}
                                        </Badge>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                            {book.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                            <User className="h-4 w-4" />
                                            <span>Admin</span>
                                            <span className="text-border">•</span>
                                            <Download className="h-4 w-4" />
                                            <span>0</span>
                                        </div>
                                        <Button variant="secondary" size="sm" className="w-full gap-2" asChild>
                                            <a href={book.fileUrl} target="_blank" rel="noopener noreferrer">
                                                <Download className="h-4 w-4" />
                                                Download
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* List View */
                        <div className="space-y-4">
                            {initialBooks.map((book, index) => (
                                <div
                                    key={book.id}
                                    className="group bg-card rounded-2xl border border-border p-4 sm:p-6 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-6"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Thumbnail */}
                                    <div className="relative w-full sm:w-40 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden shrink-0">
                                        <img
                                            src={book.thumbnailUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                {book.title}
                                            </h3>
                                            <Badge>{book.category.name}</Badge>
                                        </div>
                                        <p className="text-muted-foreground mb-4 line-clamp-2">
                                            {book.description}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <User className="h-4 w-4" />
                                                <span>Admin</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Download className="h-4 w-4" />
                                                <span>0 downloads</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="shrink-0 self-end sm:self-center">
                                        <Button className="gap-2" asChild>
                                            <a href={book.fileUrl} target="_blank" rel="noopener noreferrer">
                                                <Download className="h-4 w-4" />
                                                Download
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {initialBooks.length === 0 && (
                        <div className="text-center py-16">
                            <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No books found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filter to find what you're looking for.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
