import { getBookById } from "@/app/actions/books";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PdfViewerWrapper } from "@/components/books/pdf-viewer-wrapper";

interface BookPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function BookPage({ params }: BookPageProps) {
    const { id } = await params;
    const book = await getBookById(id);

    if (!book) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link
                href="/books"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Books
            </Link>

            <div className="space-y-6">
                <div>
                    <Badge className="mb-2">{book.category.name}</Badge>
                    <h1 className="text-3xl font-bold">{book.title}</h1>
                </div>

                {book.description && (
                    <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                        <p>{book.description}</p>
                    </div>
                )}

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Preview</h2>
                    <PdfViewerWrapper url={book.fileUrl} />
                </div>

                <div className="flex justify-center pt-4">
                    <Button size="lg" className="w-full sm:w-auto gap-2" asChild>
                        <a href={book.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                            Download PDF
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
