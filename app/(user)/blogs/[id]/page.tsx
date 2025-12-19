import { getBlogById } from "@/app/actions/blogs";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogById(id);

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Header/Hero */}
            <div className="bg-muted py-12 lg:py-20 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
                    <Button variant="ghost" size="sm" asChild className="mb-8 hover:bg-background/50">
                        <Link href="/blogs" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blogs
                        </Link>
                    </Button>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 flex-wrap">
                            <Badge className="bg-primary text-primary-foreground">{blog.category}</Badge>
                            {blog.publishedAt && (
                                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{blog.title}</h1>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border/20 pt-6">
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">{blog.author || "Admin"}</p>
                                    <p className="text-xs">Author</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl -mt-10 relative z-20">
                {blog.imageUrl && (
                    <div className="rounded-2xl overflow-hidden shadow-xl mb-10 bg-background">
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full max-h-[500px] object-cover"
                        />
                    </div>
                )}

                <div
                    className="prose max-w-none bg-background p-0 md:p-8 rounded-xl"
                    dangerouslySetInnerHTML={{ __html: blog.content || "" }}
                />
            </article>
        </div>
    );
}
