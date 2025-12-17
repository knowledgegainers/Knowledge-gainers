import { getExamPaperById } from "@/app/actions/exam-papers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, FileText, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";

interface ExamPaperPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ExamPaperPage({ params }: ExamPaperPageProps) {
    const resolvedParams = await params;
    const paper = await getExamPaperById(resolvedParams.id);

    if (!paper) {
        notFound();
    }

    return (
        <div className="container mx-auto py-8">
            <Link href="/exam-papers" className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Exam Papers
            </Link>

            <div className="max-w-4xl mx-auto">
                <div className="space-y-4 mb-8">
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <Badge variant="secondary" className="mb-2">
                                {paper.type.name}
                            </Badge>
                            <Badge variant="outline" className="mb-2">
                                Year: {paper.year}
                            </Badge>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">{paper.title}</h1>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Uploaded on {format(new Date(paper.createdAt), "MMMM d, yyyy")}</span>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="py-2">
                    <p className="text-lg text-muted-foreground whitespace-pre-wrap">{paper.description}</p>
                </div>

                <Separator className="my-8" />

                <div className="flex justify-end pt-4 pb-12">
                    <Button
                        size="lg"
                        className="gap-2 min-w-[140px]"
                        asChild
                    >
                        <a href={paper.fileUrl} target="_blank" rel="noopener noreferrer">
                            Download Paper
                            <Download className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
