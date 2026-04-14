import { db } from "@/db";
import { mockTests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { TestTaker } from "./test-taker";

export const dynamic = 'force-dynamic';

export default async function TakeMockTestPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const test = await db.query.mockTests.findFirst({
        where: eq(mockTests.slug, slug),
        with: {
            questions: {
                orderBy: (questions, { asc }) => [asc(questions.order)],
            }
        }
    });

    if (!test || !test.isActive) {
        notFound();
    }

    if (!test.questions || test.questions.length === 0) {
        return (
            <div className="container mx-auto py-24 text-center">
                <h1 className="text-2xl font-bold mb-4">No questions available</h1>
                <p className="text-muted-foreground">This test doesn't have any questions yet. Please check back later.</p>
            </div>
        );
    }

    // Pass the test data and questions to the client component
    // Note: We're rendering the client component full bleed so it can manage its own full-screen state
    return (
        <div className="min-h-screen bg-background">
            <TestTaker test={test} initialQuestions={test.questions} />
        </div>
    );
}
