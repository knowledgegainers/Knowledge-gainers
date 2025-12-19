import { db } from "@/db";
import { currentAffairs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CurrentAffairForm } from "../current-affair-form";
import { notFound } from "next/navigation";

async function getCurrentAffair(id: string) {
    const item = await db.query.currentAffairs.findFirst({
        where: eq(currentAffairs.id, id),
    });
    return item;
}

export default async function EditCurrentAffairPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getCurrentAffair(id);

    if (!item) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Current Affair</h2>
                <p className="text-muted-foreground">Edit details for {item.title}</p>
            </div>
            <CurrentAffairForm initialData={item} />
        </div>
    );
}
