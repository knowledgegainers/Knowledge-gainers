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
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: book.description }}
                    />
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

            <div className="mt-8 rounded-xl bg-blue-500 p-6 text-center text-black">
                <h3 className="mb-2 text-2xl font-bold text-white">
                    Join our WhatsApp and Telegram Channels
                </h3>
                <p className="mb-6 font-medium text-white">
                    Get Knowledge Gainers updates on our WhatsApp and Telegram Channels
                </p>
                <div className="mx-auto flex max-w-md flex-col gap-4 md:flex-row">
                    <Button
                        className="w-full bg-white text-black hover:bg-gray-200 border-none"
                        asChild
                    >
                        <a
                            href="https://whatsapp.com/channel/0029VafHWmfKrWQvDrF8P11L"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Join Our WhatsApp Channel
                        </a>
                    </Button>
                    <Button
                        className="w-full bg-white text-black hover:bg-gray-200 border-none"
                        asChild
                    >
                        <a
                            href="https://t.me/KNOWLEDGE_GAINERS"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Join Our Telegram Channel
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
