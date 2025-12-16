import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
        return new NextResponse("Missing URL parameter", { status: 400 });
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return new NextResponse(`Failed to fetch PDF: ${response.statusText}`, { status: response.status });
        }

        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        headers.set("Cache-Control", "public, max-age=3600");

        return new NextResponse(response.body, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error("PDF Proxy Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
