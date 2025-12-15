"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, BookOpen } from "lucide-react";
import { BookWithCategory } from "@/app/actions/books";

interface SavedBooksListProps {
    books: BookWithCategory[];
}

export function SavedBooksList({ books }: SavedBooksListProps) {
    if (books.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No saved books</h3>
                <p className="text-muted-foreground mt-1">
                    Books you save will appear here for quick access.
                </p>
                <Button className="mt-4" asChild>
                    <a href="/books">Browse Books</a>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                                src={book.thumbnailUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"}
                                alt={book.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <Badge className="absolute top-3 left-3 bg-white/90 text-black backdrop-blur-sm">
                                {book.category.name}
                            </Badge>
                        </div>
                        <div className="p-5">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                {book.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                                {book.description}
                            </p>
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
        </div>
    );
}
