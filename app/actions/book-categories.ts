
"use server";

import { db } from "@/db";
import { bookCategories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getBookCategories() {
    return await db.select().from(bookCategories).orderBy(desc(bookCategories.createdAt));
}

export async function createBookCategory(data: { name: string; slug: string; description: string }) {
    await db.insert(bookCategories).values(data);
    revalidatePath("/admin/categories");
}

export async function updateBookCategory(id: string, data: { name: string; slug: string; description: string }) {
    await db.update(bookCategories).set({ ...data, updatedAt: new Date() }).where(eq(bookCategories.id, id));
    revalidatePath("/admin/categories");
}

export async function deleteBookCategory(id: string) {
    await db.delete(bookCategories).where(eq(bookCategories.id, id));
    revalidatePath("/admin/categories");
}
