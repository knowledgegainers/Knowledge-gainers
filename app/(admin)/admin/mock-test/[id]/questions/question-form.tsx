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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
    question: z.string().min(1, "Question is required"),
    options: z.array(z.string().min(1, "Option is required")).length(4),
    correctAnswer: z.string().or(z.number()),
    explanation: z.string().optional(),
    order: z.string().or(z.number()).optional(),
    imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    marks: z.coerce.number().min(0).optional(),
    negativeMarks: z.coerce.number().min(0).optional(),
});

interface QuestionFormProps {
    testId: string;
    initialData?: any;
    isOpen: boolean;
    onClose: () => void;
}

export function QuestionForm({ testId, initialData, isOpen, onClose }: QuestionFormProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: initialData?.question || "",
            options: initialData?.options || ["", "", "", ""],
            correctAnswer: initialData?.correctAnswer?.toString() || "0",
            explanation: initialData?.explanation || "",
            order: initialData?.order || 1,
            imageUrl: initialData?.imageUrl || "",
            marks: initialData?.marks || 1,
            negativeMarks: initialData?.negativeMarks || 0,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                const res = await fetch(`/api/admin/mock-test/${testId}/questions/${initialData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to update");
                toast.success("Question updated");
            } else {
                const res = await fetch(`/api/admin/mock-test/${testId}/questions`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to create");
                toast.success("Question created");
            }
            onClose();
            form.reset();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Question" : "Add New Question"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Question text</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter your question here..."
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="correctAnswer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Options & Correct Answer</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value.toString()}
                                                className="space-y-4"
                                            >
                                                {[0, 1, 2, 3].map((index) => (
                                                    <div key={index} className="flex items-center space-x-3">
                                                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                                                        <FormField
                                                            control={form.control}
                                                            name={`options.${index}`}
                                                            render={({ field: optionField }) => (
                                                                <FormItem className="flex-1 w-full m-0 space-y-0">
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder={`Option ${index + 1}`}
                                                                            {...optionField}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="explanation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Explanation (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Explanation for the correct answer..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL (Optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            placeholder="https://example.com/image.png"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="marks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Marks (Positive)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.5"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="negativeMarks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Negative Marking Penalty</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.25"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="order"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Order number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save Question</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
