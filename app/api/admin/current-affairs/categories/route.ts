import { db } from "@/db";
import { currentAffairs } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await db.selectDistinct({ category: currentAffairs.category }).from(currentAffairs);
        // Map to simple array of strings, filtering out nulls if any (though schema says not null default)
        const categories = data.map(d => d.category).filter(Boolean);
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}
