
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageKitUpload } from "@/components/admin/imagekit-upload";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    imageUrl: z.string().optional(),
    date: z.string().min(1, "Date is required"),
});

interface CurrentAffairDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: any;
}

export function CurrentAffairDialog({ open, onOpenChange, initialData }: CurrentAffairDialogProps) {
    const router = useRouter();
    const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            imageUrl: "",
            date: new Date().toISOString().split('T')[0],
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                content: initialData.content,
                imageUrl: initialData.imageUrl || "",
                // Format date to YYYY-MM-DD for input type="date"
                date: new Date(initialData.date).toISOString().split('T')[0],
            });
        } else {
            form.reset({
                title: "",
                content: "",
                imageUrl: "",
                date: new Date().toISOString().split('T')[0],
            });
        }
    }, [initialData, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                const res = await fetch(`/api/admin/current-affairs/${initialData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to update");
                toast.success("Updated successfully");
            } else {
                const res = await fetch("/api/admin/current-affairs", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to create");
                toast.success("Created successfully");
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
                    <DialogTitle>{initialData ? "Edit Current Affair" : "Add Current Affair"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Edit the news details below." : "Add a new current affair item."}
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
                                        <Input placeholder="News Headline" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Image (Optional)</label>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant={imageMode === "upload" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setImageMode("upload")}
                                    >
                                        Upload
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={imageMode === "url" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setImageMode("url")}
                                    >
                                        URL
                                    </Button>
                                </div>
                            </div>

                            {imageMode === "upload" ? (
                                <ImageKitUpload
                                    folder="/current-affairs"
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
                                                <Input placeholder="https://example.com/image.jpg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="News content details..." className="h-32" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">{initialData ? "Save changes" : "Create Item"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
