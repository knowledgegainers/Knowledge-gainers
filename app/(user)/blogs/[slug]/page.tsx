import { getBlogBySlug, getBlogBySlugDebug, getAdjacentBlogs } from "@/app/actions/blogs";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    console.log("Blog Page Debug - Received slug:", slug);
    const { blog, logs } = await getBlogBySlugDebug(slug);
    console.log("Blog Page Debug - Blog found:", blog ? "Yes" : "No", blog?.id);

    // Fetch adjacent blogs for navigation
    const { previousBlog, nextBlog } = blog
        ? await getAdjacentBlogs(blog.id, blog.publishedAt)
        : { previousBlog: null, nextBlog: null };

    if (!blog) {
        // Fetch all slugs for comparison
        const { getAllBlogSlugs } = await import("@/app/actions/blogs");
        const allSlugs = await getAllBlogSlugs();

        return (
            <div className="p-20 text-center">
                <h1 className="text-2xl font-bold text-red-500">Blog Not Found</h1>
                <p><strong>Raw Slug:</strong> "{rawSlug}"</p>
                <p><strong>Decoded Slug:</strong> "{slug}"</p>
                <p><strong>Length:</strong> {slug.length}</p>

                <div className="mt-8 text-left max-w-2xl mx-auto">
                    <h2 className="font-bold mb-2">Debug Logs:</h2>
                    <pre className="bg-slate-100 p-4 rounded text-xs mb-4 overflow-auto">
                        {logs.join("\n")}
                    </pre>

                    <h2 className="font-bold mb-2">Did you mean one of these?</h2>
                    <div className="bg-slate-100 p-4 rounded text-xs max-h-60 overflow-auto">
                        {allSlugs.map(s => (
                            <div key={s} className="mb-1 border-b border-gray-200 pb-1">
                                <span className={s === slug ? "text-green-600 font-bold" : ""}>{s}</span>
                                <span className="text-gray-400 ml-2">({s.length})</span>
                                {s === slug && <span className="text-green-600 font-bold ml-2"> MATCH!</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
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



                {/* Previous/Next Post Navigation */}
                {(previousBlog || nextBlog) && (
                    <div className="mt-12 pt-8 border-t border-border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Previous Post */}
                            {previousBlog ? (
                                <Link
                                    href={`/blogs/${previousBlog.slug}`}
                                    className="group flex flex-col p-6 rounded-xl bg-muted hover:bg-accent transition-all duration-300 border border-border hover:border-primary"
                                >
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                        <ArrowLeft className="h-4 w-4" />
                                        <span className="font-medium">Previous Post</span>
                                    </div>
                                    <div className="flex gap-4">
                                        {previousBlog.imageUrl && (
                                            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                                                <img
                                                    src={previousBlog.imageUrl}
                                                    alt={previousBlog.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                {previousBlog.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="hidden md:block" />
                            )}

                            {/* Next Post */}
                            {nextBlog && (
                                <Link
                                    href={`/blogs/${nextBlog.slug}`}
                                    className="group flex flex-col p-6 rounded-xl bg-muted hover:bg-accent transition-all duration-300 border border-border hover:border-primary"
                                >
                                    <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-3">
                                        <span className="font-medium">Next Post</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                    <div className="flex gap-4 flex-row-reverse">
                                        {nextBlog.imageUrl && (
                                            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                                                <img
                                                    src={nextBlog.imageUrl}
                                                    alt={nextBlog.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0 text-right">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                {nextBlog.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                )}

                <div className="mt-8 rounded-xl bg-blue-500 p-6 text-center text-black">
                    <h3 className="mb-2 text-2xl font-bold text-white">
                        Join our WhatsApp and Telegram Channels
                    </h3>
                    <p className="mb-6 font-medium text-white">
                        Get Knowledge Gainers updates on our WhatsApp and Telegram Channels
                    </p>
                    <div className="mx-auto flex max-w-md flex-col gap-4 md:flex-row">
                        <Button
                            className="w-full bg-white text-black hover:bg-gray-200 border-none"
                            asChild
                        >
                            <a
                                href="https://whatsapp.com/channel/0029VafHWmfKrWQvDrF8P11L"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Join Our WhatsApp Channel
                            </a>
                        </Button>
                        <Button
                            className="w-full bg-white text-black hover:bg-gray-200 border-none"
                            asChild
                        >
                            <a
                                href="https://t.me/KNOWLEDGE_GAINERS"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Join Our Telegram Channel
                            </a>
                        </Button>
                    </div>
                </div>
            </article>


        </div>
    );
}
