import { getPublishedBlogs } from "@/app/actions/blogs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogsFilters } from "@/components/blogs/blogs-filters";

export default async function BlogsPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>;
}) {
    const { query } = await searchParams;
    const blogs = await getPublishedBlogs(query);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-medium mb-6">
                                <BookOpen className="h-4 w-4" />
                                Blog & Articles
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                                Latest <span className="gradient-text">Insights</span>
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Stay updated with our latest articles, study tips, and educational resources.
                            </p>
                        </div>
                        <BlogsFilters />
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {blogs.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground">No blogs found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <Card key={blog.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    {blog.imageUrl && (
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={blog.imageUrl}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <CardHeader className="p-6 pb-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <Badge variant="secondary">{blog.category}</Badge>
                                            {blog.publishedAt && (
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    {new Date(blog.publishedAt).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-xl line-clamp-2 hover:text-primary transition-colors">
                                            <Link href={`/blogs/${blog.id}`}>
                                                {blog.title}
                                            </Link>
                                        </h3>
                                    </CardHeader>
                                    <CardContent className="p-6 pt-0 flex-1">
                                        <p className="text-muted-foreground line-clamp-3 text-sm">
                                            {blog.excerpt}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <User className="h-3 w-3 mr-1" />
                                            {blog.author || "Admin"}
                                        </div>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/blogs/${blog.id}`}>
                                                Read More
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
