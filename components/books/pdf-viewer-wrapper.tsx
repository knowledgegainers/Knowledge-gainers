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
    // Check if it's a Google Drive URL
    const isGoogleDrive = url.includes("drive.google.com");

    if (isGoogleDrive) {
        // Extract ID and convert to preview URL
        // Supports: 
        // - https://drive.google.com/file/d/ID/view...
        // - https://drive.google.com/open?id=ID
        let embedUrl = url;

        const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);

        if (fileIdMatch && fileIdMatch[1]) {
            embedUrl = `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
        }

        return (
            <div className="flex flex-col items-center w-full bg-slate-50 p-4 rounded-lg border min-h-[500px]">
                <iframe
                    src={embedUrl}
                    className="w-full h-[600px] border-none rounded shadow-sm"
                    allow="autoplay"
                    title="PDF Preview"
                />
            </div>
        );
    }

    return <PdfViewer url={url} />;
}
