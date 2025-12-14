
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    typeId: z.string().min(1, "Type is required"),
    year: z.coerce.number().min(1900, "Invalid year").max(new Date().getFullYear() + 1, "Invalid year"),
    description: z.string().optional(),
    fileUrl: z.string().min(1, "File URL is required"),
});

interface ExamPaperDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: any;
    types: any[];
}

export function ExamPaperDialog({ open, onOpenChange, initialData, types }: ExamPaperDialogProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            typeId: "",
            year: new Date().getFullYear(),
            description: "",
            fileUrl: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                typeId: initialData.typeId,
                year: initialData.year,
                description: initialData.description || "",
                fileUrl: initialData.fileUrl,
            });
        } else {
            form.reset({
                title: "",
                typeId: "",
                year: new Date().getFullYear(),
                description: "",
                fileUrl: "",
            });
        }
    }, [initialData, form]);

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
                    <DialogTitle>{initialData ? "Edit Paper" : "Add Exam Paper"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Edit the exam paper details below." : "Add a new past paper."}
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
                                        <Input placeholder="Exam Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="typeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Exam Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {types.map((type) => (
                                                    <SelectItem key={type.id} value={type.id}>
                                                        {type.name}
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
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Details..." className="h-24" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">{initialData ? "Save changes" : "Add Paper"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
