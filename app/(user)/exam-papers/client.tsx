"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Search,
    Download,
    Calendar,
    Upload
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { ExamPaperWithType } from "@/app/actions/exam-papers";
import { examTypes } from "@/db/schema";

type ExamType = typeof examTypes.$inferSelect;

interface ExamPapersClientProps {
    initialPapers: ExamPaperWithType[];
    types: ExamType[];
}

const years = ["2024", "2023", "2022", "2021", "2020"];

const examTypeColors: Record<string, string> = {
    "eamcet": "bg-blue-500/10 text-blue-600 border-blue-200",
    "polycet": "bg-purple-500/10 text-purple-600 border-purple-200",
    "job-exams": "bg-green-500/10 text-green-600 border-green-200",
    "10th": "bg-orange-500/10 text-orange-600 border-orange-200",
    "12th": "bg-pink-500/10 text-pink-600 border-pink-200",
    "ecet": "bg-cyan-500/10 text-cyan-600 border-cyan-200",
};

export default function ExamPapersClient({ initialPapers, types }: ExamPapersClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialType = searchParams.get("typeId") || "all";
    const initialYear = searchParams.get("year") || "all";
    const initialQuery = searchParams.get("query") || "";

    const [selectedExamType, setSelectedExamType] = useState(initialType);
    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery !== initialQuery) {
                updateUrl(selectedExamType, selectedYear, searchQuery);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const updateUrl = (typeId: string, year: string, query: string) => {
        const params = new URLSearchParams();
        if (typeId && typeId !== "all") params.set("typeId", typeId);
        if (year && year !== "all") params.set("year", year);
        if (query) params.set("query", query);
        router.push(`/exam-papers?${params.toString()}`);
    };

    const handleTypeChange = (typeId: string) => {
        setSelectedExamType(typeId);
        updateUrl(typeId, selectedYear, searchQuery);
    };

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        updateUrl(selectedExamType, year, searchQuery);
    };

    const typeList = [
        { id: "all", label: "All Exams" },
        ...types.map(t => ({ id: t.id, label: t.name, slug: t.slug }))
    ];

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

            {/* Filters */}
            <section className="py-8 bg-card border-y border-border sticky top-16 z-40 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        {/* Exam Type Filters */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                            {typeList.map((type) => (
                                <Button
                                    key={type.id}
                                    variant={selectedExamType === type.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleTypeChange(type.id)}
                                    className="whitespace-nowrap"
                                >
                                    {type.label}
                                </Button>
                            ))}
                        </div>

                        {/* Search & Year Filter */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
                                <Input
                                    placeholder="Search papers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 text-black"
                                />
                            </div>
                            <Select value={selectedYear} onValueChange={handleYearChange}>
                                <SelectTrigger className="w-32 text-black bg-white">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-black">
                                    <SelectItem value="all">All Years</SelectItem>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year}>{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>
                    </div>
                </div>
            </section>

            {/* Papers Grid */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Count */}
                    <p className="text-sm text-muted-foreground mb-6">
                        Showing {initialPapers.length} {initialPapers.length === 1 ? 'paper' : 'papers'}
                        {selectedExamType !== "all" && ` for ${typeList.find(t => t.id === selectedExamType)?.label || 'Type'}`}
                        {selectedYear !== "all" && ` from ${selectedYear}`}
                    </p>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {initialPapers.map((paper, index) => (
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
                                    {/* Handle dynamic coloring logic if needed, falling back to slug or just random */}
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
                                    <a href={paper.fileUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="h-4 w-4" />
                                        Download Paper
                                    </a>
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {initialPapers.length === 0 && (
                        <div className="text-center py-16">
                            <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No papers found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your filters to find what you're looking for.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
