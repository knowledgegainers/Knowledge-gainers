import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
        const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
        const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

        if (!privateKey || !publicKey) {
            return NextResponse.json(
                { error: "Missing ImageKit configuration (privateKey or publicKey)" },
                { status: 500 }
            );
        }

        const { token, expire, signature } = getUploadAuthParams({
            privateKey,
            publicKey,
            // urlEndpoint is not required for auth params generation generally, but good to have context
        });

        return NextResponse.json({
            token,
            expire,
            signature,
            publicKey,
        });
    } catch (error) {
        console.error("Upload auth error:", error);
        return NextResponse.json(
            { error: "Failed to generate upload authentication" },
            { status: 500 }
        );
    }
}
