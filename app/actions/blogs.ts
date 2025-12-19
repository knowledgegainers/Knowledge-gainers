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
