import { db } from "@/db";
import { blogs } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await db.selectDistinct({ category: blogs.category }).from(blogs);
        return NextResponse.json(data);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
