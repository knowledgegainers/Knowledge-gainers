"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const PdfViewer = dynamic(() => import("@/components/books/pdf-viewer").then(mod => mod.PdfViewer), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center p-12 bg-slate-50 border rounded-lg h-[500px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    ),
});

interface PdfViewerWrapperProps {
    url: string;
}

export function PdfViewerWrapper({ url }: PdfViewerWrapperProps) {
    return <PdfViewer url={url} />;
}
