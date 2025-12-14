"use server";

import { db } from "@/db";
import { currentAffairs } from "@/db/schema";
import { desc, like, or, eq, sql } from "drizzle-orm";

export async function getCurrentAffairs(search?: string, month?: string) {
    let whereClause = undefined;

    if (search && month && month !== "all") {
        // month is expected to be full month name like "january"
        whereClause = or(
            like(currentAffairs.title, `%${search}%`),
            like(currentAffairs.content, `%${search}%`)
        );
        // Note: Filtering by month exactly on a timestamp field in basic SQL is tricky without specific functions.
        // For now, I'll filter by search first, and we might need to do client side filtering for month 
        // OR implementing a more complex SQL query if Drizzle supports it easily for month extraction.
        // Let's rely on basic search for now and see if we can add date filtering.

        // If precise month filtering is needed:
        // whereClause = and(whereClause, sql`to_char(${currentAffairs.date}, 'FMMonth') ILIKE ${month}`);
    } else if (search) {
        whereClause = or(
            like(currentAffairs.title, `%${search}%`),
            like(currentAffairs.content, `%${search}%`)
        );
    }

    const data = await db.select().from(currentAffairs).where(whereClause).orderBy(desc(currentAffairs.date));

    // In-memory filter for month if provided, as it's often easier with small datasets than complex SQL dates
    if (month && month !== "all") {
        return data.filter(item => {
            const itemMonth = item.date.toLocaleString('default', { month: 'long' }).toLowerCase();
            return itemMonth === month.toLowerCase();
        });
    }

    return data;
}

export async function getCurrentAffairsCategories() {
    // Since category is just a text column, we distinct select it
    const categories = await db.selectDistinct({ category: currentAffairs.category }).from(currentAffairs);
    return categories.map(c => c.category);
}
