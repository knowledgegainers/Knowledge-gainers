"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Newspaper,
    Search,
    Calendar,
    Download,
    ArrowRight,
    BookOpen,
    TrendingUp
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { currentAffairs } from "@/db/schema";

type CurrentAffair = typeof currentAffairs.$inferSelect;

interface CurrentAffairsClientProps {
    initialPosts: CurrentAffair[];
    categories: string[];
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Keep static for now as no DB table exists for digests
const monthlyDigests = [
    { month: "January 2024", downloadCount: 5600 },
    { month: "December 2023", downloadCount: 4800 },
    { month: "November 2023", downloadCount: 4200 },
    { month: "October 2023", downloadCount: 3900 },
];

const categoryColors: Record<string, string> = {
    "International": "bg-blue-500/10 text-blue-600 border-blue-200",
    "Economy": "bg-green-500/10 text-green-600 border-green-200",
    "Science & Tech": "bg-purple-500/10 text-purple-600 border-purple-200",
    "Education": "bg-orange-500/10 text-orange-600 border-orange-200",
    "Environment": "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    "Technology": "bg-cyan-500/10 text-cyan-600 border-cyan-200",
};

function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

export default function CurrentAffairsClient({ initialPosts, categories }: CurrentAffairsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialMonth = searchParams.get("month") || "all";
    const initialQuery = searchParams.get("query") || "";

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery !== initialQuery) {
                updateUrl(selectedMonth, searchQuery);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const updateUrl = (month: string, query: string) => {
        const params = new URLSearchParams();
        if (month && month !== "all") params.set("month", month);
        if (query) params.set("query", query);
        router.push(`/current-affairs?${params.toString()}`);
    };

    const handleMonthChange = (value: string) => {
        setSelectedMonth(value);
        updateUrl(value, searchQuery);
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                <div className="absolute top-10 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Newspaper className="h-4 w-4" />
                            Stay Informed
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Current <span className="gradient-text">Affairs</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Daily and monthly current affairs updates to keep you prepared for competitive exams.
                            Comprehensive coverage of national and international events.
                        </p>
                    </div>
                </div>
            </section>

            {/* Monthly Digests */}
            <section className="py-8 bg-card border-y border-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Download className="h-5 w-5 text-primary" />
                            Monthly PDF Digests
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {monthlyDigests.map((digest, index) => (
                            <div
                                key={index}
                                className="group bg-background rounded-xl border border-border p-4 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium">{digest.month}</span>
                                    <Badge variant="secondary" className="text-xs">
                                        {digest.downloadCount.toLocaleString()}
                                    </Badge>
                                </div>
                                <Button variant="secondary" size="sm" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                                    <Download className="h-4 w-4" />
                                    Download PDF
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Search */}
            <section className="py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search current affairs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={selectedMonth} onValueChange={handleMonthChange}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Filter by month" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Months</SelectItem>
                                {months.map((month) => (
                                    <SelectItem key={month} value={month.toLowerCase()}>{month}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Posts */}
            <section className="py-8 lg:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-8">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h2 className="text-2xl font-semibold">Latest Updates</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {initialPosts.map((post, index) => (
                            <div
                                key={post.id}
                                className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <Badge className={categoryColors[post.category] || "bg-secondary"}>
                                        {post.category}
                                    </Badge>
                                    {/* Read time not in DB, removed or mocked if needed. Removed from display or use constant. */}
                                </div>

                                <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                    {post.content}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatDate(post.date)}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="gap-1 group-hover:text-primary">
                                        Read More
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {initialPosts.length === 0 && (
                        <div className="text-center py-16">
                            <Newspaper className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search to find what you're looking for.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* GK Quiz Section */}
            <section className="py-12 lg:py-16 bg-card">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <BookOpen className="h-4 w-4" />
                            Test Your Knowledge
                        </div>
                        <h2 className="text-3xl font-bold mb-4">
                            Daily <span className="gradient-text">GK Quiz</span>
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Practice with our daily general knowledge quizzes to test your preparation
                            and improve your scores in competitive exams.
                        </p>
                        <Button size="lg" className="gap-2">
                            Start Quiz
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
