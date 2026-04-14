import { db } from "@/db";
import { mockTests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MockTestForm } from "../mock-test-form";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditMockTestPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        notFound();
    }
    
    const data = await db.query.mockTests.findFirst({
        where: eq(mockTests.id, id),
    });

    if (!data) {
        notFound();
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <MockTestForm initialData={data} />
        </div>
    );
}
