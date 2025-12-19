"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, User, Heart, Loader2, Eye } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BookWithCategory, toggleBookSave } from "@/app/actions/books";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";

interface BooksListProps {
    books: BookWithCategory[];
    savedBookIds: string[];
    viewMode: "grid" | "list";
}

export function BooksList({ books, savedBookIds: initialSavedBookIds, viewMode }: BooksListProps) {
    const router = useRouter();
    const { userId } = useAuth();
    const [savedBooks, setSavedBooks] = useState<Set<string>>(new Set(initialSavedBookIds));
    const [savingId, setSavingId] = useState<string | null>(null);

    const handleSave = async (e: React.MouseEvent, bookId: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!userId) {
            toast.error("Please login to save books");
            router.push("/sign-in");
            return;
        }

        if (savingId) return;

        setSavingId(bookId);
        try {
            const result = await toggleBookSave(bookId);
            setSavedBooks(prev => {
                const next = new Set(prev);
                if (result.saved) {
                    next.add(bookId);
                    toast.success("Book saved");
                } else {
                    next.delete(bookId);
                    toast.success("Book removed from saved");
                }
                return next;
            });
        } catch (error) {
            toast.error("Failed to update save status");
        } finally {
            setSavingId(null);
        }
    };

    if (books.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
                <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No books found</h3>
                <p className="text-muted-foreground">
                    Try adjusting your search or filter to find what you're looking for.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-muted-foreground mb-6">
                Showing {books.length} {books.length === 1 ? 'book' : 'books'}
            </p>

            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {books.map((book, index) => {
                        const isSaved = savedBooks.has(book.id);
                        const isSaving = savingId === book.id;

                        return (
                            <div
                                key={book.id}
                                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 relative"
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
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-3 right-3 h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white text-black rounded-full"
                                        onClick={(e) => handleSave(e, book.id)}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                        ) : (
                                            <Heart className={cn("h-4 w-4 transition-colors", isSaved ? "fill-red-500 text-red-500" : "text-black")} />
                                        )}
                                    </Button>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                        {book.description}
                                    </p>

                                    {userId ? (
                                        <Button className="w-full" asChild>
                                            <Link href={`/books/${book.id}`}>
                                                <Eye className="h-4 w-4" />
                                                View
                                            </Link>
                                        </Button>
                                    ) : (
                                        <SignInButton mode="modal">
                                            <Button className="w-full">
                                                <User className="h-4 w-4" />
                                                Sign in to view
                                            </Button>
                                        </SignInButton>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-4">
                    {books.map((book, index) => {
                        const isSaved = savedBooks.has(book.id);
                        const isSaving = savingId === book.id;

                        return (
                            <div
                                key={book.id}
                                className="group bg-card rounded-2xl border border-border p-4 sm:p-6 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-6 relative"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                {/* Save Button for List View */}
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-4 right-4 h-8 w-8 text-muted-foreground hover:text-red-500"
                                    onClick={(e) => handleSave(e, book.id)}
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Heart className={cn("h-4 w-4 transition-colors", isSaved ? "fill-red-500 text-red-500" : "")} />
                                    )}
                                </Button>

                                {/* Thumbnail */}
                                <div className="relative w-full sm:w-40 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden shrink-0">
                                    <img
                                        src={book.thumbnailUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"}
                                        alt={book.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 pr-8">
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

                                    </div>
                                </div>

                                {/* Action */}
                                <div className="shrink-0 self-end sm:self-center">
                                    {userId ? (
                                        <Button className="gap-2" asChild>
                                            <Link href={`/books/${book.id}`}>
                                                <Eye className="h-4 w-4" />
                                                View
                                            </Link>
                                        </Button>
                                    ) : (
                                        <SignInButton mode="modal">
                                            <Button className="gap-2">
                                                <User className="h-4 w-4" />
                                                Sign in to view
                                            </Button>
                                        </SignInButton>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
