import { Suspense } from "react";
import { FileText } from "lucide-react";
import { getExamTypes } from "@/app/actions/exam-papers";
import { ExamPapersFilters } from "@/components/exam-papers/exam-papers-filters";
import { ExamPapersResults } from "./results";
import { ExamPapersLoader } from "@/components/exam-papers/exam-papers-loader";

export default async function ExamPapersPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; typeId?: string; year?: string }>;
}) {
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams.query || "";
    const typeId = resolvedSearchParams.typeId || "all";
    const year = resolvedSearchParams.year || "all";

    const types = await getExamTypes();

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium mb-6">
                            <FileText className="h-4 w-4" />
                            Previous Year Papers
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Download <span className="gradient-text">Exam Papers</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Access previous year question papers for various competitive exams.
                            Practice with real exam papers and boost your preparation.
                        </p>
                    </div>
                </div>
            </section>

            <ExamPapersFilters types={types} />

            <section className="py-12 lg:py-16">
                <Suspense key={`${query}-${typeId}-${year}`} fallback={<ExamPapersLoader />}>
                    <ExamPapersResults query={query} typeId={typeId} year={year} />
                </Suspense>
            </section>
        </div>
    );
}
