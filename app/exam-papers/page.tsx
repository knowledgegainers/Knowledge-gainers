"use client";

import { useState } from "react";
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

const examTypes = [
    { id: "all", label: "All Exams" },
    { id: "polycet", label: "Polycet" },
    { id: "10th", label: "10th Class" },
    { id: "12th", label: "12th Class" },
    { id: "ecet", label: "ECET" },
    { id: "eamcet", label: "EAMCET" },
    { id: "job-exams", label: "Job Exams" },
];

const years = ["2024", "2023", "2022", "2021", "2020"];

// Mock data
const examPapers = [
    {
        id: 1,
        title: "EAMCET Engineering Full Paper",
        examType: "eamcet",
        year: "2024",
        subject: "Engineering",
        downloads: 3200,
    },
    {
        id: 2,
        title: "Polycet Previous Year Paper",
        examType: "polycet",
        year: "2024",
        subject: "All Subjects",
        downloads: 1890,
    },
    {
        id: 3,
        title: "SSC CGL Tier 1 Paper",
        examType: "job-exams",
        year: "2024",
        subject: "General",
        downloads: 4500,
    },
    {
        id: 4,
        title: "10th Board Mathematics",
        examType: "10th",
        year: "2024",
        subject: "Mathematics",
        downloads: 2100,
    },
    {
        id: 5,
        title: "ECET Engineering Paper",
        examType: "ecet",
        year: "2024",
        subject: "Engineering",
        downloads: 1650,
    },
    {
        id: 6,
        title: "12th Board Physics",
        examType: "12th",
        year: "2024",
        subject: "Physics",
        downloads: 2800,
    },
    {
        id: 7,
        title: "EAMCET Medical Paper",
        examType: "eamcet",
        year: "2023",
        subject: "Medical",
        downloads: 2100,
    },
    {
        id: 8,
        title: "Railway NTPC Paper",
        examType: "job-exams",
        year: "2023",
        subject: "General",
        downloads: 3800,
    },
    {
        id: 9,
        title: "10th Board Science",
        examType: "10th",
        year: "2023",
        subject: "Science",
        downloads: 1950,
    },
    {
        id: 10,
        title: "12th Board Chemistry",
        examType: "12th",
        year: "2023",
        subject: "Chemistry",
        downloads: 2300,
    },
    {
        id: 11,
        title: "Polycet Model Paper",
        examType: "polycet",
        year: "2023",
        subject: "All Subjects",
        downloads: 1450,
    },
    {
        id: 12,
        title: "ECET Previous Year",
        examType: "ecet",
        year: "2023",
        subject: "Engineering",
        downloads: 1200,
    },
];

const examTypeLabels: Record<string, string> = {
    "polycet": "Polycet",
    "10th": "10th Class",
    "12th": "12th Class",
    "ecet": "ECET",
    "eamcet": "EAMCET",
    "job-exams": "Job Exams",
};

const examTypeColors: Record<string, string> = {
    "eamcet": "bg-blue-500/10 text-blue-600 border-blue-200",
    "polycet": "bg-purple-500/10 text-purple-600 border-purple-200",
    "job-exams": "bg-green-500/10 text-green-600 border-green-200",
    "10th": "bg-orange-500/10 text-orange-600 border-orange-200",
    "12th": "bg-pink-500/10 text-pink-600 border-pink-200",
    "ecet": "bg-cyan-500/10 text-cyan-600 border-cyan-200",
};

export default function ExamPapersPage() {
    const [selectedExamType, setSelectedExamType] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPapers = examPapers.filter((paper) => {
        const matchesType = selectedExamType === "all" || paper.examType === selectedExamType;
        const matchesYear = selectedYear === "all" || paper.year === selectedYear;
        const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            paper.subject.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesYear && matchesSearch;
    });

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
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
                            {examTypes.map((type) => (
                                <Button
                                    key={type.id}
                                    variant={selectedExamType === type.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedExamType(type.id)}
                                    className="whitespace-nowrap"
                                >
                                    {type.label}
                                </Button>
                            ))}
                        </div>

                        {/* Search & Year Filter */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search papers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={selectedYear} onValueChange={setSelectedYear}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Years</SelectItem>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year}>{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button className="gap-2 hidden sm:flex">
                                <Upload className="h-4 w-4" />
                                Upload Paper
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Papers Grid */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Count */}
                    <p className="text-sm text-muted-foreground mb-6">
                        Showing {filteredPapers.length} {filteredPapers.length === 1 ? 'paper' : 'papers'}
                        {selectedExamType !== "all" && ` for ${examTypeLabels[selectedExamType]}`}
                        {selectedYear !== "all" && ` from ${selectedYear}`}
                    </p>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPapers.map((paper, index) => (
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
                                    <Badge className={examTypeColors[paper.examType] || "bg-secondary"}>
                                        {examTypeLabels[paper.examType]}
                                    </Badge>
                                </div>

                                {/* Content */}
                                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {paper.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Subject: {paper.subject}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4" />
                                        <span>{paper.year}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Download className="h-4 w-4" />
                                        <span>{paper.downloads.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Button variant="outline" size="sm" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                                    <Download className="h-4 w-4" />
                                    Download Paper
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredPapers.length === 0 && (
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
