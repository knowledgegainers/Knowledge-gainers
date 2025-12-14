
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
    description: z.string().min(1, "Description is required"),
    typeId: z.string().min(1, "Type is required"),
    applyLink: z.string().optional(),
    expiryDate: z.string().optional(),
});

interface NotificationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: any;
    types: any[];
}

export function NotificationDialog({ open, onOpenChange, initialData, types }: NotificationDialogProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            typeId: "",
            applyLink: "",
            expiryDate: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                description: initialData.description,
                typeId: initialData.typeId,
                applyLink: initialData.applyLink || "",
                expiryDate: initialData.expiryDate ? new Date(initialData.expiryDate).toISOString().split('T')[0] : "",
            });
        } else {
            form.reset({
                title: "",
                description: "",
                typeId: "",
                applyLink: "",
                expiryDate: "",
            });
        }
    }, [initialData, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                const res = await fetch(`/api/admin/notifications/${initialData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to update");
                toast.success("Notification updated");
            } else {
                const res = await fetch("/api/admin/notifications", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to create");
                toast.success("Notification created");
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
                    <DialogTitle>{initialData ? "Edit Notification" : "Add Notification"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Edit the notification details below." : "Create a new alert."}
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
                                        <Input placeholder="Notification Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="typeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
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
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="applyLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expiry Date (Optional)</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
                            <Button type="submit">{initialData ? "Save changes" : "Create"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
