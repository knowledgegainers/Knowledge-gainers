
import { getExamPapers, getExamTypes } from "@/app/actions/exam-papers";
import { ExamPapersList } from "@/components/exam-papers/exam-papers-list";

interface ExamPapersResultsProps {
    query: string;
    typeId: string;
    year: string;
}

export async function ExamPapersResults({ query, typeId, year }: ExamPapersResultsProps) {
    // We need types for labels in the list component display
    // Fetching types again here is cheap (likely cached or small query), 
    // or we could pass them down from page if preferred, but keeping Results self-contained for data fetching is cleaner for Suspense boundary (though types are passed to Filters outside).
    // Actually, List uses types just for the label "Showing X papers for [Type Label]".
    const types = await getExamTypes();
    const papers = await getExamPapers(query, typeId, year);

    return (
        <ExamPapersList
            papers={papers}
            types={types}
            selectedExamType={typeId}
            selectedYear={year}
        />
    );
}
