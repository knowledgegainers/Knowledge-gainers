import { db } from "@/db";
import { blogs } from "@/db/schema";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export async function GET() {
    const result = await db.execute(sql`
    SELECT 
      slug, 
      is_published,
      length(slug) as len
    FROM blogs 
    WHERE slug like 'unlocking%'
  `);

    return NextResponse.json({
        ts: Date.now(),
        data: result.rows
    });
}
