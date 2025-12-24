import { db } from "@/db";
import { blogs } from "@/db/schema";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export async function GET() {
    const result = await db.execute(sql`
    SELECT 
      title, 
      slug, 
      length(slug) as len,
      encode(slug::bytea, 'hex') as hex
    FROM blogs 
  `);

    return NextResponse.json(result.rows);
}
