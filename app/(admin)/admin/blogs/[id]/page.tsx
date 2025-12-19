
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { BlogForm } from "../blog-form";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: PageProps) {
    const { id } = await params;
    const blog = await db.query.blogs.findFirst({
        where: eq(blogs.id, id),
    });

    if (!blog) return notFound();

    return (
        <div className="flex-1 space-y-4 p-4 pt-0">
            <div className="py-4">
                <BlogForm initialData={blog} />
            </div>
        </div>
    );
}
