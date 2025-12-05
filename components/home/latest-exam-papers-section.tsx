import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, ArrowRight, Calendar } from "lucide-react";

// Mock data - will be replaced with real data from database
const latestPapers = [
    {
        id: 1,
        title: "EAMCET Engineering 2024",
        examType: "EAMCET",
        year: 2024,
        downloads: 3200,
    },
    {
        id: 2,
        title: "Polycet Previous Year Paper",
        examType: "Polycet",
        year: 2024,
        downloads: 1890,
    },
    {
        id: 3,
        title: "SSC CGL Tier 1",
        examType: "Job Exams",
        year: 2024,
        downloads: 4500,
    },
    {
        id: 4,
        title: "10th Board Mathematics",
        examType: "10th",
        year: 2024,
        downloads: 2100,
    },
    {
        id: 5,
        title: "ECET Engineering",
        examType: "ECET",
        year: 2024,
        downloads: 1650,
    },
    {
        id: 6,
        title: "12th Board Physics",
        examType: "12th",
        year: 2024,
        downloads: 2800,
    },
];

const examTypeColors: Record<string, string> = {
    "EAMCET": "bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20",
    "Polycet": "bg-purple-500/10 text-purple-600 border-purple-200 hover:bg-purple-500/20",
    "Job Exams": "bg-green-500/10 text-green-600 border-green-200 hover:bg-green-500/20",
    "10th": "bg-orange-500/10 text-orange-600 border-orange-200 hover:bg-orange-500/20",
    "12th": "bg-pink-500/10 text-pink-600 border-pink-200 hover:bg-pink-500/20",
    "ECET": "bg-cyan-500/10 text-cyan-600 border-cyan-200 hover:bg-cyan-500/20",
};

export function LatestExamPapersSection() {
    return (
        <section className="py-20 lg:py-28 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
                            <FileText className="h-4 w-4" />
                            Previous Year Papers
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Latest <span className="gradient-text">Exam Papers</span>
                        </h2>
                    </div>
                    <Link href="/exam-papers">
                        <Button variant="secondary" className="gap-2 group">
                            View All Papers
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {/* Papers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestPapers.map((paper, index) => (
                        <div
                            key={paper.id}
                            className="group bg-background rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-primary/10">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <Badge className={examTypeColors[paper.examType] || "bg-secondary"}>
                                    {paper.examType}
                                </Badge>
                            </div>

                            {/* Content */}
                            <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                                {paper.title}
                            </h3>

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

                            <Button variant="secondary" size="sm" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                                <Download className="h-4 w-4" />
                                Download Paper
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
