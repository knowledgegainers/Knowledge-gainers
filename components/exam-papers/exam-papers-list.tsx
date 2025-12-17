"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Download } from "lucide-react";
import Link from "next/link";
import { ExamPaperWithType } from "@/app/actions/exam-papers";
import { examTypes } from "@/db/schema";

type ExamType = typeof examTypes.$inferSelect;

interface ExamPapersListProps {
    papers: ExamPaperWithType[];
    types: ExamType[]; // Used for labels if needed but papers already have joined type
    selectedExamType: string;
    selectedYear: string;
}

const examTypeColors: Record<string, string> = {
    "eamcet": "bg-blue-500/10 text-blue-600 border-blue-200",
    "polycet": "bg-purple-500/10 text-purple-600 border-purple-200",
    "job-exams": "bg-green-500/10 text-green-600 border-green-200",
    "10th": "bg-orange-500/10 text-orange-600 border-orange-200",
    "12th": "bg-pink-500/10 text-pink-600 border-pink-200",
    "ecet": "bg-cyan-500/10 text-cyan-600 border-cyan-200",
};

export function ExamPapersList({ papers, types, selectedExamType, selectedYear }: ExamPapersListProps) {
    if (papers.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
                <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No papers found</h3>
                <p className="text-muted-foreground">
                    Try adjusting your filters to find what you're looking for.
                </p>
            </div>
        );
    }

    const typeLabel = types.find(t => t.id === selectedExamType)?.name || 'Type';

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
                Showing {papers.length} {papers.length === 1 ? 'paper' : 'papers'}
                {selectedExamType !== "all" && ` for ${typeLabel}`}
                {selectedYear !== "all" && ` from ${selectedYear}`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {papers.map((paper, index) => (
                    <div
                        key={paper.id}
                        className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-primary/10">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <Badge className={examTypeColors[paper.type.slug] || "bg-secondary"}>
                                {paper.type.name}
                            </Badge>
                        </div>

                        {/* Content */}
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {paper.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            {paper.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-black" />
                                <span>{paper.year}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Download className="h-4 w-4 text-black" />
                                <span>0</span>
                            </div>
                        </div>

                        <Button variant="secondary" size="sm" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors" asChild>
                            <Link href={`/exam-papers/${paper.id}`}>
                                View Details
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
