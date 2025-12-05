import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, ArrowRight, User } from "lucide-react";

// Mock data - will be replaced with real data from database
const latestBooks = [
    {
        id: 1,
        title: "Complete Guide to EAMCET",
        category: "Engineering",
        thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
        uploadedBy: "Admin",
        downloads: 1250,
    },
    {
        id: 2,
        title: "General Knowledge 2024",
        category: "General Knowledge",
        thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
        uploadedBy: "Contributor",
        downloads: 890,
    },
    {
        id: 3,
        title: "Current Affairs Monthly",
        category: "Current Affairs",
        thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop",
        uploadedBy: "Admin",
        downloads: 2100,
    },
    {
        id: 4,
        title: "SSC CGL Complete Guide",
        category: "Job Books",
        thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
        uploadedBy: "Contributor",
        downloads: 1560,
    },
];

export function LatestBooksSection() {
    return (
        <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
                            <BookOpen className="h-4 w-4" />
                            Latest Additions
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Newest <span className="gradient-text">Books</span>
                        </h2>
                    </div>
                    <Link href="/books">
                        <Button variant="secondary" className="gap-2 group">
                            View All Books
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {latestBooks.map((book, index) => (
                        <div
                            key={book.id}
                            className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={book.thumbnail}
                                    alt={book.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Badge className="absolute top-3 left-3 bg-white text-black hover:bg-primary hover:text-white">
                                    {book.category}
                                </Badge>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {book.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                    <User className="h-4 w-4" />
                                    <span>{book.uploadedBy}</span>
                                    <span className="text-border">•</span>
                                    <Download className="h-4 w-4" />
                                    <span>{book.downloads.toLocaleString()}</span>
                                </div>
                                <Button variant="secondary" size="sm" className="w-full gap-2">
                                    <Download className="h-4 w-4" />
                                    Download
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
