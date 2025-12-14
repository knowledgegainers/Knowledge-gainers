"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BookWithCategory } from "@/app/actions/books";
import { NotificationWithType } from "@/app/actions/notifications";
import {
    BookOpen,
    Bell,
    Download,
    User,
    Calendar,
    ExternalLink,
    Briefcase,
    GraduationCap,
    Clock
} from "lucide-react";

interface DashboardClientProps {
    savedBooks: BookWithCategory[];
    savedNotifications: NotificationWithType[];
}

function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function getDaysRemaining(date: Date | null): number {
    if (!date) return 0;
    const lastDate = new Date(date);
    const today = new Date();
    const diffTime = lastDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export function DashboardClient({ savedBooks, savedNotifications }: DashboardClientProps) {
    const [activeTab, setActiveTab] = useState<"books" | "notifications">("books");

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
            {/* Header */}
            <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">My Dashboard</h1>
                    </div>
                    {/* Tabs */}
                    <div className="flex items-center gap-6 mt-6">
                        <button
                            onClick={() => setActiveTab("books")}
                            className={cn(
                                "flex items-center gap-2 pb-3 text-sm font-medium transition-colors relative",
                                activeTab === "books"
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <BookOpen className="h-4 w-4" />
                            Saved Books
                            <Badge variant="secondary" className="ml-1 text-xs">
                                {savedBooks.length}
                            </Badge>
                            {activeTab === "books" && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("notifications")}
                            className={cn(
                                "flex items-center gap-2 pb-3 text-sm font-medium transition-colors relative",
                                activeTab === "notifications"
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Bell className="h-4 w-4" />
                            Saved Notifications
                            <Badge variant="secondary" className="ml-1 text-xs">
                                {savedNotifications.length}
                            </Badge>
                            {activeTab === "notifications" && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === "books" && (
                    <div className="space-y-6">
                        {savedBooks.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {savedBooks.map((book) => (
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
                        ) : (
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
                        )}
                    </div>
                )}

                {activeTab === "notifications" && (
                    <div className="space-y-6">
                        {savedNotifications.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                                {savedNotifications.map((notification) => {
                                    const daysRemaining = getDaysRemaining(notification.expiryDate);
                                    const isUrgent = daysRemaining > 0 && daysRemaining <= 7;
                                    const isExpired = daysRemaining <= 0;
                                    const isJob = notification.type.slug.includes("job");

                                    return (
                                        <div
                                            key={notification.id}
                                            className="group bg-card rounded-xl border border-border p-6 hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                                                <div className={`shrink-0 p-4 rounded-xl ${isJob ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                                                    {isJob ? (
                                                        <Briefcase className="h-6 w-6 text-green-600" />
                                                    ) : (
                                                        <GraduationCap className="h-6 w-6 text-blue-600" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                            {notification.title}
                                                        </h3>
                                                        <Badge variant={isJob ? 'default' : 'secondary'}>
                                                            {notification.type.name}
                                                        </Badge>
                                                        {isUrgent && !isExpired && (
                                                            <Badge variant="destructive" className="animate-pulse">Urgent</Badge>
                                                        )}
                                                        {isExpired && (
                                                            <Badge variant="outline">Expired</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-1 mb-3">
                                                        {notification.description}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar className="h-4 w-4" />
                                                            <span>Posted: {formatDate(notification.createdAt)}</span>
                                                        </div>
                                                        {notification.expiryDate && (
                                                            <div className="flex items-center gap-1.5">
                                                                <Clock className="h-4 w-4" />
                                                                <span>{daysRemaining} days left</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="shrink-0">
                                                    <Button variant="outline" asChild>
                                                        <a href={notification.applyLink || "#"} target="_blank" rel="noopener noreferrer">
                                                            Apply Now <ExternalLink className="h-4 w-4 ml-2" />
                                                        </a>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bell className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold">No saved notifications</h3>
                                <p className="text-muted-foreground mt-1">
                                    Important updates you save will appear here.
                                </p>
                                <Button className="mt-4" asChild>
                                    <a href="/notifications">Browse Notifications</a>
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
