"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq, desc, and, ilike, or } from "drizzle-orm";

export type Blog = typeof blogs.$inferSelect;

export async function getPublishedBlogs(search?: string) {
    if (search) {
        return await db.query.blogs.findMany({
            where: and(
                eq(blogs.isPublished, true),
                or(
                    ilike(blogs.title, `%${search}%`),
                    ilike(blogs.excerpt, `%${search}%`),
                    ilike(blogs.content, `%${search}%`)
                )
            ),
            orderBy: desc(blogs.publishedAt),
        });
    }

    return await db.query.blogs.findMany({
        where: eq(blogs.isPublished, true),
        orderBy: desc(blogs.publishedAt),
    });
}

export async function getBlogById(id: string) {
    return await db.query.blogs.findFirst({
        where: and(eq(blogs.id, id), eq(blogs.isPublished, true)),
    });
}


export async function getBlogBySlug(slug: string) {
    return await db.query.blogs.findFirst({
        where: and(eq(blogs.slug, slug), eq(blogs.isPublished, true)),
    });
}

export async function getBlogBySlugDebug(slug: string) {
    const logs: string[] = [];
    logs.push(`Searching for slug: "${slug}" (len: ${slug.length})`);

    // Method 1: Standard ORM
    const exact = await db.query.blogs.findFirst({
        where: and(eq(blogs.slug, slug), eq(blogs.isPublished, true)),
    });
    logs.push(`Exact match result: ${exact ? "Found" : "Not Found"}`);

    if (exact) return { blog: exact, logs };

    // Method 2: Without isPublished
    const unpublished = await db.query.blogs.findFirst({
        where: eq(blogs.slug, slug),
    });
    logs.push(`Unpublished match result: ${unpublished ? `Found (Published: ${unpublished.isPublished})` : "Not Found"}`);

    // Method 3: Trimmed slug
    const trimmed = await db.query.blogs.findFirst({
        where: eq(blogs.slug, slug.trim()),
    });
    logs.push(`Trimmed match result: ${trimmed ? "Found" : "Not Found"}`);

    // Method 4: ILIKE
    const like = await db.query.blogs.findFirst({
        where: ilike(blogs.slug, slug),
    });
    logs.push(`ILIKE match result: ${like ? "Found" : "Not Found"}`);

    return { blog: exact || unpublished || trimmed || like, logs };
}

export async function getAllBlogSlugs() {
    const all = await db.query.blogs.findMany({
        columns: {
            slug: true
        }
    });
    return all.map(b => b.slug);
}
