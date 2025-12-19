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
    FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CategoryCombobox } from "@/components/admin/category-combobox";
import { ArrowLeft, Save, LayoutTemplate, Image as ImageIcon, Globe, Calendar, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ImageKitUpload } from "@/components/admin/imagekit-upload";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
    content: z.string().optional(),
    excerpt: z.string().optional(),
    imageUrl: z.string().optional(),
    isPublished: z.boolean().default(false),
    publishedAt: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    author: z.string().optional(),
});

interface BlogFormProps {
    initialData?: any;
}

export function BlogForm({ initialData }: BlogFormProps) {
    const router = useRouter();
    const [thumbnailMode, setThumbnailMode] = useState<"upload" | "url">("upload");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            content: initialData?.content || "",
            excerpt: initialData?.excerpt || "",
            imageUrl: initialData?.imageUrl || "",
            isPublished: initialData?.isPublished || false,
            publishedAt: initialData?.publishedAt ? new Date(initialData.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            category: initialData?.category || "General",
            author: initialData?.author || "",
        },
    });

    // Auto-generate slug from title if slug is empty
    const { watch, setValue } = form;
    const title = watch("title");

    useEffect(() => {
        if (!initialData && title && !form.getFieldState("slug").isDirty) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");
            setValue("slug", slug);
        }
    }, [title, initialData, setValue, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                const res = await fetch(`/api/admin/blogs/${initialData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to update");
                toast.success("Blog updated");
            } else {
                const res = await fetch("/api/admin/blogs", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to create");
                const data = await res.json();
                toast.success("Blog created");
                router.push(`/admin/blogs/${data.id}`);
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
                        <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/admin/blogs")} type="button">
                            <ArrowLeft className="w-4 h-4" />
                            Back to List
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <span className="text-sm font-medium text-muted-foreground">{initialData ? "Editing Post" : "New Post"}</span>
                        {form.watch("isPublished") && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                <Globe className="w-3 h-3" /> Published
                            </span>
                        )}
                    </div>
                    <Button type="submit" size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        {initialData ? "Update Post" : "Publish Post"}
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
                                                placeholder="Add title"
                                                className="text-4xl font-bold border-none px-0 shadow-none focus-visible:ring-0 h-auto placeholder:text-muted-foreground/50"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Permalink/Slug Display */}
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem className="-mt-4 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="font-medium">Permalink:</span>
                                            <span className="bg-muted px-2 py-0.5 rounded text-xs select-all">/blogs/</span>
                                            <FormControl>
                                                <input
                                                    className="bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm text-muted-foreground h-auto w-full max-w-[400px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RichTextEditor
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                placeholder="Start writing..."
                                                className="min-h-[500px] border-none shadow-none focus-within:ring-0 [&>div:first-child]:sticky [&>div:first-child]:top-0 [&>div:first-child]:z-50 [&>div:first-child]:bg-background [&>div:first-child]:border-b"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="w-full lg:w-80 border-l pl-6 overflow-y-auto space-y-6 pb-20">
                        {/* Publish Status */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Publish
                            </h3>
                            <Card>
                                <CardContent className="p-4 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="isPublished"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>Published</FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="publishedAt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Publish Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Category & Tags */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                                <LayoutTemplate className="w-4 h-4" />
                                Organization
                            </h3>
                            <Card>
                                <CardContent className="p-4 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Category</FormLabel>
                                                <FormControl>
                                                    <CategoryCombobox
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        fetchUrl="/api/admin/blogs/categories"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="author"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Author</FormLabel>
                                                <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                                                    <User className="w-4 h-4 text-muted-foreground" />
                                                    <FormControl>
                                                        <input
                                                            className="flex-1 bg-transparent border-none focus:outline-none text-sm h-full"
                                                            placeholder="Author Name"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Featured Image */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                Featured Image
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
                                            folder="/blogs"
                                            currentImageUrl={form.watch("imageUrl")}
                                            onUploadComplete={(url) => form.setValue("imageUrl", url)}
                                            label=""
                                        />
                                    ) : (
                                        <FormField
                                            control={form.control}
                                            name="imageUrl"
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

                        {/* Excerpt */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                                <LayoutTemplate className="w-4 h-4" />
                                Excerpt
                            </h3>
                            <Card>
                                <CardContent className="p-4">
                                    <FormField
                                        control={form.control}
                                        name="excerpt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormDescription>
                                                    Write a short summary (optional).
                                                </FormDescription>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Excerpt..."
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </form>
        </Form>
    );
}
