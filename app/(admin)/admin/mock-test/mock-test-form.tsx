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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, LayoutTemplate, Globe, Clock, Target, ListTodo } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
    description: z.string().optional(),
    duration: z.string().or(z.number()),
    totalQuestions: z.string().or(z.number()),
    difficulty: z.string().min(1, "Difficulty is required"),
    displayMode: z.string().min(1, "Display Mode is required").default("single"),
    isActive: z.boolean().default(false),
    scheduledDate: z.string().optional(),
});

interface MockTestFormProps {
    initialData?: any;
}

export function MockTestForm({ initialData }: MockTestFormProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            duration: initialData?.duration || 60,
            totalQuestions: initialData?.totalQuestions || 50,
            difficulty: initialData?.difficulty || "Medium",
            displayMode: initialData?.displayMode || "single",
            isActive: initialData?.isActive || false,
            scheduledDate: initialData?.scheduledDate ? new Date(initialData.scheduledDate).toISOString().split('T')[0] : "",
        },
    });

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
                const res = await fetch(`/api/admin/mock-test/${initialData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to update");
                toast.success("Mock Test updated");
            } else {
                const res = await fetch("/api/admin/mock-test", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to create");
                const data = await res.json();
                toast.success("Mock Test created");
                router.push(`/admin/mock-test/${data.id}`);
            }
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-[calc(100vh-80px)] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/admin/mock-test")} type="button">
                            <ArrowLeft className="w-4 h-4" />
                            Back to List
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <span className="text-sm font-medium text-muted-foreground">{initialData ? "Editing Test" : "New Mock Test"}</span>
                        {form.watch("isActive") && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                <Globe className="w-3 h-3" /> Active
                            </span>
                        )}
                    </div>
                    <Button type="submit" size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        {initialData ? "Update Test" : "Save Test"}
                    </Button>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
                    {/* Left Column: Content */}
                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Test Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter mock test title"
                                            className="text-xl font-bold h-auto py-2"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="font-medium">URL:</span>
                                        <span className="bg-muted px-2 py-0.5 rounded text-xs">/mock-tests/</span>
                                        <FormControl>
                                            <Input
                                                className="h-8"
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Test instructions and description..."
                                            className="min-h-[150px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Right Column: Settings */}
                    <div className="w-full lg:w-80 border-l pl-6 overflow-y-auto space-y-6 pb-20">
                        {/* Status */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Status
                            </h3>
                            <Card>
                                <CardContent className="p-4 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="isActive"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>Active</FormLabel>
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
                                        name="scheduledDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Scheduled Date (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} value={field.value || ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Configuration */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                                <LayoutTemplate className="w-4 h-4" />
                                Configuration
                            </h3>
                            <Card>
                                <CardContent className="p-4 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="duration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2"><Clock className="w-3 h-3" />Duration (mins)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="totalQuestions"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2"><ListTodo className="w-3 h-3" />Total Questions</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="difficulty"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2"><Target className="w-3 h-3" />Difficulty</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select difficulty" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Easy">Easy</SelectItem>
                                                        <SelectItem value="Medium">Medium</SelectItem>
                                                        <SelectItem value="Hard">Hard</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="displayMode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2"><LayoutTemplate className="w-3 h-3" />Display Mode</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select display mode" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="single">Single Question (Pagination)</SelectItem>
                                                        <SelectItem value="multiple">All Questions at Once</SelectItem>
                                                    </SelectContent>
                                                </Select>
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
