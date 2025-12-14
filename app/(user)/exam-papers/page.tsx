import { Suspense } from "react";
import { getExamPapers, getExamTypes } from "@/app/actions/exam-papers";
import ExamPapersClient from "./client";

export default async function ExamPapersPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; typeId?: string; year?: string }>;
}) {
    const { query, typeId, year } = await searchParams;
    const types = await getExamTypes();
    const papers = await getExamPapers(query, typeId, year);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ExamPapersClient initialPapers={papers} types={types} />
        </Suspense>
    );
}
