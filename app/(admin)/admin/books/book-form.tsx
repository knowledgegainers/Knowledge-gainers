"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { TypeCombobox } from "@/components/admin/type-combobox";
import { ArrowLeft, Save, LayoutTemplate, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ImageKitUpload } from "@/components/admin/imagekit-upload";
import { useState } from "react";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    categoryId: z.string().min(1, "Category is required"),
    fileUrl: z.string().min(1, "PDF URL is required"),
    thumbnailUrl: z.string().optional(),
});

interface BookFormProps {
    initialData?: any;
    categories: any[];
}

export function BookForm({ initialData, categories }: BookFormProps) {
    const router = useRouter();
    const [thumbnailMode, setThumbnailMode] = useState<"upload" | "url">("upload");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            categoryId: initialData?.categoryId || "",
            fileUrl: initialData?.fileUrl || "",
            thumbnailUrl: initialData?.thumbnailUrl || "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                const res = await fetch(`/api/admin/books/${initialData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to update");
                toast.success("Book updated");
            } else {
                const res = await fetch("/api/admin/books", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to create");
                const data = await res.json();
                toast.success("Book created");
                router.push(`/admin/books/${data.id}`);
            }
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-[calc(100vh-80px)] flex flex-col">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/admin/books")} type="button">
                            <ArrowLeft className="w-4 h-4" />
                            Back to List
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <span className="text-sm font-medium text-muted-foreground">{initialData ? "Editing Book" : "New Book"}</span>
                    </div>
                    <Button type="submit" size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
                    {/* Left Column: Content */}
                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Book Title"
                                                className="text-4xl font-bold border-none px-0 shadow-none focus-visible:ring-0 h-auto placeholder:text-muted-foreground/50"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RichTextEditor
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                placeholder="Write book description..."
                                                className="min-h-[400px] border-none shadow-none focus-within:ring-0 [&>div:first-child]:sticky [&>div:first-child]:top-0 [&>div:first-child]:z-50 [&>div:first-child]:bg-background [&>div:first-child]:border-b"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="w-full lg:w-80 border-l pl-6 overflow-y-auto space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium flex items-center gap-2">
                                    <LayoutTemplate className="w-4 h-4" />
                                    Properties
                                </h3>
                                <Card>
                                    <CardContent className="p-4 space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="categoryId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Category</Label>
                                                    <FormControl>
                                                        <TypeCombobox
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            types={categories}
                                                            typeLabel="Book Category"
                                                            createUrl="/api/admin/categories"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium flex items-center gap-2">
                                    <LinkIcon className="w-4 h-4" />
                                    Resources
                                </h3>
                                <Card>
                                    <CardContent className="p-4 space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="fileUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">PDF URL</Label>
                                                    <FormControl>
                                                        <Input placeholder="https://..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    Cover Image
                                </h3>
                                <Card>
                                    <CardContent className="p-4 space-y-4">
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <Button
                                                type="button"
                                                variant={thumbnailMode === "upload" ? "default" : "outline"}
                                                size="xs"
                                                onClick={() => setThumbnailMode("upload")}
                                            >
                                                Upload
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={thumbnailMode === "url" ? "default" : "outline"}
                                                size="xs"
                                                onClick={() => setThumbnailMode("url")}
                                            >
                                                URL
                                            </Button>
                                        </div>
                                        {thumbnailMode === "upload" ? (
                                            <ImageKitUpload
                                                folder="/books"
                                                currentImageUrl={form.watch("thumbnailUrl")}
                                                onUploadComplete={(url) => form.setValue("thumbnailUrl", url)}
                                                label=""
                                            />
                                        ) : (
                                            <FormField
                                                control={form.control}
                                                name="thumbnailUrl"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="https://..." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}
