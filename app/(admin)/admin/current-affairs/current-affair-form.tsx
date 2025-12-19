"use client";

import { useState } from "react";
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
import { ImageKitUpload } from "@/components/admin/imagekit-upload";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, LayoutTemplate, Calendar, ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { CategoryCombobox } from "@/components/admin/category-combobox";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    imageUrl: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    date: z.string().min(1, "Date is required"),
});

interface CurrentAffairFormProps {
    initialData?: any;
}

export function CurrentAffairForm({ initialData }: CurrentAffairFormProps) {
    const router = useRouter();
    const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            content: initialData?.content || "",
            imageUrl: initialData?.imageUrl || "",
            category: initialData?.category || "General",
            date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        },
    });

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
                const data = await res.json();
                toast.success("Created successfully");
                router.push("/admin/current-affairs");
                router.refresh(); // Ensure list is updated
                return;
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
                        <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/admin/current-affairs")} type="button">
                            <ArrowLeft className="w-4 h-4" />
                            Back to List
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <span className="text-sm font-medium text-muted-foreground">{initialData ? "Editing Current Affair" : "New Current Affair"}</span>
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
                                                placeholder="News Headline"
                                                className="text-3xl font-bold border-none px-0 shadow-none focus-visible:ring-0 h-auto placeholder:text-muted-foreground/50"
                                                {...field}
                                            />
                                        </FormControl>
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
                                                placeholder="News content details..."
                                                className="min-h-[400px] border-none shadow-none focus-within:ring-0"
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
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Category</Label>
                                                    <FormControl>
                                                        <CategoryCombobox
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        />
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
                                                    <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Date</Label>
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

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    Featured Image
                                </h3>
                                <Card>
                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Source</Label>
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    variant={imageMode === "upload" ? "default" : "outline"}
                                                    size="xs"
                                                    className="h-6"
                                                    onClick={() => setImageMode("upload")}
                                                >
                                                    Upload
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant={imageMode === "url" ? "default" : "outline"}
                                                    size="xs"
                                                    className="h-6"
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
