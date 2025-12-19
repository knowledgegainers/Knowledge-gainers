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
import { ArrowLeft, Save, LayoutTemplate, Calendar, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    typeId: z.string().min(1, "Type is required"),
    year: z.coerce.number().min(1900, "Invalid year").max(new Date().getFullYear() + 1, "Invalid year"),
    description: z.string().optional(),
    fileUrl: z.string().min(1, "File URL is required"),
});

interface ExamPaperFormProps {
    initialData?: any;
    types: any[];
}

export function ExamPaperForm({ initialData, types }: ExamPaperFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            typeId: initialData?.typeId || "",
            year: initialData?.year || new Date().getFullYear(),
            description: initialData?.description || "",
            fileUrl: initialData?.fileUrl || "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                const res = await fetch(`/api/admin/exam-papers/${initialData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to update");
                toast.success("Paper updated");
            } else {
                const res = await fetch("/api/admin/exam-papers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to create");
                toast.success("Paper created");
                router.push("/admin/exam-papers");
                router.refresh();
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
                        <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/admin/exam-papers")} type="button">
                            <ArrowLeft className="w-4 h-4" />
                            Back to List
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <span className="text-sm font-medium text-muted-foreground">{initialData ? "Editing Paper" : "New Exam Paper"}</span>
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
                                                placeholder="Add Exam Title"
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
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RichTextEditor
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                placeholder="Add description details..."
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
                                            name="typeId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Exam Type</Label>
                                                    <FormControl>
                                                        <TypeCombobox
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            types={types}
                                                            typeLabel="Exam Type"
                                                            createUrl="/api/admin/exam-types"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="year"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Year</Label>
                                                    <FormControl>
                                                        <Input type="number" {...field} />
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
                                    <FileText className="w-4 h-4" />
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
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}
