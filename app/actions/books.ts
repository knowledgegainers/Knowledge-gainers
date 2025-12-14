"use server";

import { db } from "@/db";
import { books, bookCategories } from "@/db/schema";
import { eq, desc, like, and, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type BookWithCategory = typeof books.$inferSelect & {
    category: typeof bookCategories.$inferSelect;
};

export async function getBooks(search?: string, categoryId?: string) {
    let whereClause = undefined;

    if (search && categoryId && categoryId !== "all") {
        whereClause = and(
            eq(books.categoryId, categoryId),
            or(like(books.title, `%${search}%`), like(books.description, `%${search}%`))
        );
    } else if (search) {
        whereClause = or(like(books.title, `%${search}%`), like(books.description, `%${search}%`));
    } else if (categoryId && categoryId !== "all") {
        whereClause = eq(books.categoryId, categoryId);
    }

    const data = await db.query.books.findMany({
        where: whereClause,
        with: {
            category: true,
        },
        orderBy: desc(books.createdAt),
    });

    return data;
}

export async function getBookCategories() {
    return await db.select().from(bookCategories).orderBy(desc(bookCategories.createdAt));
}
