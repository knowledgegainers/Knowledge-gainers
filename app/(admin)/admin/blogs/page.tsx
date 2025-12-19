
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import { BlogsClient } from "./client";

export const dynamic = 'force-dynamic';

export default async function BlogsPage() {
    const data = await db.select().from(blogs).orderBy(desc(blogs.updatedAt));
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BlogsClient data={data} />
        </div>
    );
}
