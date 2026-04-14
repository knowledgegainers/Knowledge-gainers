import { db } from "@/db";
import { mockTests } from "@/db/schema";
import { desc } from "drizzle-orm";
import { MockTestClient } from "./client";

export const dynamic = 'force-dynamic';

export default async function MockTestsPage() {
    const data = await db.select().from(mockTests).orderBy(desc(mockTests.createdAt));
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <MockTestClient data={data} />
        </div>
    );
}
