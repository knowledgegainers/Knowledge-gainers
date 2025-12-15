"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, TrendingUp, Newspaper } from "lucide-react";
import { currentAffairs } from "@/db/schema";

type CurrentAffair = typeof currentAffairs.$inferSelect;

interface CurrentAffairsListProps {
    posts: CurrentAffair[];
}

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

export function CurrentAffairsList({ posts }: CurrentAffairsListProps) {
    if (posts.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
                <Newspaper className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                    Try adjusting your search to find what you're looking for.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Latest Updates</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {posts.map((post, index) => (
                    <div
                        key={post.id}
                        className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <Badge className={categoryColors[post.category] || "bg-secondary"}>
                                {post.category}
                            </Badge>
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
        </div>
    );
}
