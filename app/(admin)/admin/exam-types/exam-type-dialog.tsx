
"use client";

import { useEffect } from "react";
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

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().optional(),
});

interface ExamTypeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: any;
}

export function ExamTypeDialog({ open, onOpenChange, initialData }: ExamTypeDialogProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                slug: initialData.slug,
                description: initialData.description || "",
            });
        } else {
            form.reset({
                name: "",
                slug: "",
                description: "",
            });
        }
    }, [initialData, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                const res = await fetch(`/api/admin/exam-types/${initialData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to update");
                toast.success("Exam type updated");
            } else {
                const res = await fetch("/api/admin/exam-types", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to create");
                toast.success("Exam type created");
            }
            router.refresh();
            onOpenChange(false);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Exam Type" : "Create Exam Type"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Edit the exam type details below." : "Add a new exam type."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Entrance Exams"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                if (!initialData) {
                                                    const slug = e.target.value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
                                                    form.setValue("slug", slug);
                                                }
                                            }}
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
                                    <FormControl>
                                        <Input placeholder="entrance-exams" {...field} />
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
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">{initialData ? "Save changes" : "Create exam type"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
