
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageKitUpload } from "@/components/admin/imagekit-upload";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    categoryId: z.string().min(1, "Category is required"),
    description: z.string().optional(),
    fileUrl: z.string().min(1, "File URL is required"),
    thumbnailUrl: z.string().optional(),
});

interface BookDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: any;
    categories: any[];
}

export function BookDialog({ open, onOpenChange, initialData, categories }: BookDialogProps) {
    const router = useRouter();
    const [thumbnailMode, setThumbnailMode] = useState<"upload" | "url">("upload");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            categoryId: "",
            description: "",
            fileUrl: "",
            thumbnailUrl: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                categoryId: initialData.categoryId,
                description: initialData.description || "",
                fileUrl: initialData.fileUrl,
                thumbnailUrl: initialData.thumbnailUrl || "",
            });
        } else {
            form.reset({
                title: "",
                categoryId: "",
                description: "",
                fileUrl: "",
                thumbnailUrl: "",
            });
        }
    }, [initialData, form]);

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
                toast.success("Book created");
            }
            router.refresh();
            onOpenChange(false);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Book" : "Add Book"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Edit the book details below." : "Add a new book to the library."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Book Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fileUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>PDF URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Cover Image</label>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant={thumbnailMode === "upload" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setThumbnailMode("upload")}
                                    >
                                        Upload
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={thumbnailMode === "url" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setThumbnailMode("url")}
                                    >
                                        URL
                                    </Button>
                                </div>
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
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Book description..." className="h-24" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">{initialData ? "Save changes" : "Add Book"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
