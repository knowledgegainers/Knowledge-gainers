"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button } from "../ui/button";

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
    url: string;
}

export function PdfViewer({ url }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);

    // Use proxy to avoid CORS issues
    const pdfUrl = `/api/pdf-proxy?url=${encodeURIComponent(url)}`;

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center w-full bg-slate-50 p-4 rounded-lg border min-h-[500px]">
            {loading && (
                <div className="flex items-center justify-center h-64 w-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}

            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex items-center justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                }
                error={
                    <div className="text-red-500 p-4 text-center">
                        <p >It is not accessible by view please contact the admin</p>
                        <Link href="/contact">
                            <Button className="mt-2" variant="outline">
                                Contact us
                            </Button>
                        </Link>
                    </div>
                }
                className="max-w-full overflow-hidden"
            >
                <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={Math.min(600, typeof window !== 'undefined' ? window.innerWidth - 64 : 600)}
                    className="shadow-lg mb-4"
                />
            </Document>

            {numPages > 0 && (
                <div className="flex items-center gap-4 mt-4">
                    <button
                        onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                        disabled={pageNumber <= 1}
                        className="px-3 py-1 bg-white border rounded text-sm disabled:opacity-50 hover:bg-slate-100"
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Page {pageNumber} of {numPages}
                    </span>
                    <button
                        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                        disabled={pageNumber >= numPages}
                        className="px-3 py-1 bg-white border rounded text-sm disabled:opacity-50 hover:bg-slate-100"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
