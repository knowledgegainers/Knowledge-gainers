"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    Search,
    Download,
    User,
    Upload,
    Grid,
    List
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
    { id: "all", label: "All Books" },
    { id: "job-books", label: "Job Books" },
    { id: "current-affairs", label: "Current Affairs" },
    { id: "gk", label: "General Knowledge" },
    { id: "engineering", label: "Engineering" },
    { id: "history", label: "History" },
];

// Mock data - will be replaced with real data from database
const books = [
    {
        id: 1,
        title: "Complete Guide to EAMCET Engineering",
        category: "engineering",
        thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
        uploadedBy: "Admin",
        downloads: 1250,
        description: "Comprehensive guide covering all EAMCET engineering topics with solved examples.",
    },
    {
        id: 2,
        title: "General Knowledge Encyclopedia 2024",
        category: "gk",
        thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
        uploadedBy: "Contributor",
        downloads: 890,
        description: "Complete GK book covering all important topics for competitive exams.",
    },
    {
        id: 3,
        title: "Current Affairs Monthly Digest",
        category: "current-affairs",
        thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop",
        uploadedBy: "Admin",
        downloads: 2100,
        description: "Monthly compilation of current affairs for all competitive examinations.",
    },
    {
        id: 4,
        title: "SSC CGL Complete Preparation Guide",
        category: "job-books",
        thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
        uploadedBy: "Contributor",
        downloads: 1560,
        description: "All-in-one guide for SSC CGL preparation with previous year questions.",
    },
    {
        id: 5,
        title: "Indian History for Competitive Exams",
        category: "history",
        thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400&h=300&fit=crop",
        uploadedBy: "Admin",
        downloads: 980,
        description: "Detailed coverage of Indian history from ancient to modern times.",
    },
    {
        id: 6,
        title: "Railway NTPC Complete Guide",
        category: "job-books",
        thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
        uploadedBy: "Contributor",
        downloads: 1340,
        description: "Comprehensive preparation material for Railway NTPC examination.",
    },
    {
        id: 7,
        title: "Physics for Engineering Entrance",
        category: "engineering",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
        uploadedBy: "Admin",
        downloads: 1120,
        description: "Complete physics guide with problems and solutions for JEE/EAMCET.",
    },
    {
        id: 8,
        title: "World Geography Handbook",
        category: "gk",
        thumbnail: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop",
        uploadedBy: "Contributor",
        downloads: 760,
        description: "Comprehensive world geography for UPSC and other competitive exams.",
    },
];

const categoryLabels: Record<string, string> = {
    "job-books": "Job Books",
    "current-affairs": "Current Affairs",
    "gk": "General Knowledge",
    "engineering": "Engineering",
    "history": "History",
};

export default function BooksPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredBooks = books.filter((book) => {
        const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
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
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="whitespace-nowrap"
                                >
                                    {category.label}
                                </Button>
                            ))}
                        </div>

                        {/* Search & Actions */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search books..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={cn(
                                        "p-2 rounded-md transition-colors",
                                        viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                                    )}
                                    aria-label="Grid view"
                                >
                                    <Grid className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={cn(
                                        "p-2 rounded-md transition-colors",
                                        viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                                    )}
                                    aria-label="List view"
                                >
                                    <List className="h-4 w-4" />
                                </button>
                            </div>
                            <Button className="gap-2 hidden sm:flex">
                                <Upload className="h-4 w-4" />
                                Upload Book
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Books Grid/List */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Count */}
                    <p className="text-sm text-muted-foreground mb-6">
                        Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
                        {selectedCategory !== "all" && ` in ${categoryLabels[selectedCategory]}`}
                    </p>

                    {/* Grid View */}
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredBooks.map((book, index) => (
                                <div
                                    key={book.id}
                                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={book.thumbnail}
                                            alt={book.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Badge className="absolute top-3 left-3 bg-white hover:bg-primary text-primary">
                                            {categoryLabels[book.category]}
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
                                            <span>{book.uploadedBy}</span>
                                            <span className="text-border">•</span>
                                            <Download className="h-4 w-4" />
                                            <span>{book.downloads.toLocaleString()}</span>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full gap-2">
                                            <Download className="h-4 w-4" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* List View */
                        <div className="space-y-4">
                            {filteredBooks.map((book, index) => (
                                <div
                                    key={book.id}
                                    className="group bg-card rounded-2xl border border-border p-4 sm:p-6 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-6"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Thumbnail */}
                                    <div className="relative w-full sm:w-40 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden shrink-0">
                                        <img
                                            src={book.thumbnail}
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
                                            <Badge>{categoryLabels[book.category]}</Badge>
                                        </div>
                                        <p className="text-muted-foreground mb-4 line-clamp-2">
                                            {book.description}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <User className="h-4 w-4" />
                                                <span>{book.uploadedBy}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Download className="h-4 w-4" />
                                                <span>{book.downloads.toLocaleString()} downloads</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="shrink-0 self-end sm:self-center">
                                        <Button className="gap-2">
                                            <Download className="h-4 w-4" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredBooks.length === 0 && (
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
