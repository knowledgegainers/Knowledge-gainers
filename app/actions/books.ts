"use server";

import { db } from "@/db";
import { books, bookCategories, savedBooks, users } from "@/db/schema";
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

import { auth, currentUser } from "@clerk/nextjs/server";

export async function getSavedBooks(clerkId: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) return [];

    const saved = await db.query.savedBooks.findMany({
        where: eq(savedBooks.userId, user.id),
        with: {
            book: {
                with: {
                    category: true,
                },
            },
        },
        orderBy: desc(savedBooks.createdAt),
    });

    return saved.map((s) => s.book);
}

export async function getSavedBookIds(clerkId: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) return [];

    const saved = await db.query.savedBooks.findMany({
        where: eq(savedBooks.userId, user.id),
        columns: {
            bookId: true,
        },
    });

    return saved.map((s) => s.bookId);
}

export async function toggleBookSave(bookId: string) {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Unauthorized");

    let user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) {
        const clerkUser = await currentUser();
        if (!clerkUser) throw new Error("Unauthorized");

        const email = clerkUser.emailAddresses[0]?.emailAddress;
        if (!email) throw new Error("Email required");

        const [newUser] = await db.insert(users).values({
            clerkId,
            email,
        }).returning();

        user = newUser;
    }

    const existing = await db.query.savedBooks.findFirst({
        where: and(eq(savedBooks.userId, user.id), eq(savedBooks.bookId, bookId)),
    });

    if (existing) {
        await db.delete(savedBooks).where(and(eq(savedBooks.userId, user.id), eq(savedBooks.bookId, bookId)));
        return { saved: false };
    } else {
        await db.insert(savedBooks).values({
            userId: user.id,
            bookId: bookId,
        });
        return { saved: true };
    }
}

export async function isBookSaved(clerkId: string, bookId: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) return false;

    const existing = await db.query.savedBooks.findFirst({
        where: and(eq(savedBooks.userId, user.id), eq(savedBooks.bookId, bookId)),
    });

    return !!existing;
}
