"use client";

import { useState, useRef } from "react";
import { upload, ImageKitAbortError, ImageKitInvalidRequestError, ImageKitUploadNetworkError, ImageKitServerError } from "@imagekit/next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageKitUploadProps {
    folder: string;
    onUploadComplete: (url: string) => void;
    currentImageUrl?: string;
    label?: string;
}

export function ImageKitUpload({ folder, onUploadComplete, currentImageUrl, label = "Upload Image" }: ImageKitUploadProps) {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const authenticator = async () => {
        try {
            const response = await fetch("/api/upload-auth");
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
            throw error;
        }
    };

    const handleUpload = async () => {
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            toast.error("Please select a file to upload");
            return;
        }

        const file = fileInput.files[0];

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast.error("File size must be less than 10MB");
            return;
        }

        setUploading(true);
        setProgress(0);

        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            toast.error(authError instanceof Error ? authError.message : "Failed to authenticate upload");
            setUploading(false);
            return;
        }

        const { signature, expire, token, publicKey } = authParams;
        abortControllerRef.current = new AbortController();

        try {
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                folder: folder,
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                abortSignal: abortControllerRef.current.signal,
            });

            if (uploadResponse && uploadResponse.url) {
                setPreviewUrl(uploadResponse.url);
                onUploadComplete(uploadResponse.url);
                toast.success("Image uploaded successfully");
            }
        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                toast.error("Upload cancelled");
            } else if (error instanceof ImageKitInvalidRequestError) {
                toast.error("Invalid upload request");
            } else if (error instanceof ImageKitUploadNetworkError) {
                toast.error("Network error during upload");
            } else if (error instanceof ImageKitServerError) {
                toast.error("Server error during upload");
            } else {
                toast.error("Upload failed");
            }
            console.error("Upload error:", error);
        } finally {
            setUploading(false);
            setProgress(0);
            abortControllerRef.current = null;
        }
    };

    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const handleRemove = () => {
        setPreviewUrl(null);
        onUploadComplete("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-3">
            <Label>{label}</Label>

            {previewUrl ? (
                <div className="relative">
                    <div className="relative w-full h-40 border rounded-lg overflow-hidden bg-muted">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="flex gap-2">
                        <Input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            disabled={uploading}
                            className="flex-1"
                        />
                        {uploading ? (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={handleUpload}
                                disabled={uploading}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                            </Button>
                        )}
                    </div>

                    {uploading && (
                        <div className="space-y-1">
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-primary h-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground text-center">
                                {Math.round(progress)}%
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
