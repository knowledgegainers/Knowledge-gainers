"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, TrendingUp, Newspaper } from "lucide-react";
import Link from "next/link";
import { currentAffairs } from "@/db/schema";

type CurrentAffair = typeof currentAffairs.$inferSelect;

interface CurrentAffairsListProps {
    posts: CurrentAffair[];
}

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
                            <Badge className="bg-black text-white">
                                {post.category}
                            </Badge>
                        </div>

                        <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                            {post.content?.replace(/<[^>]*>?/gm, '') || ''}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(post.date)}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1 group-hover:text-primary" asChild>
                                <Link href={`/current-affairs/${post.slug}`}>
                                    Read More
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
