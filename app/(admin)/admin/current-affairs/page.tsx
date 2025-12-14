
import { db } from "@/db";
export const dynamic = 'force-dynamic';
import { currentAffairs } from "@/db/schema";
import { desc } from "drizzle-orm";
import { CurrentAffairsClient } from "./client";

async function getCurrentAffairs() {
    return await db.select().from(currentAffairs).orderBy(desc(currentAffairs.date));
}

export default async function CurrentAffairsPage() {
    const data = await getCurrentAffairs();
    return <CurrentAffairsClient initialData={data} />;
}
