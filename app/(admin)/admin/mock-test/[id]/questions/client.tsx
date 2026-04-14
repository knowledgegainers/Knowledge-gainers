"use client";

import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, Edit, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QuestionForm } from "./question-form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface MockTestQuestionsClientProps {
    mockTest: any;
    questions: any[];
}

export function MockTestQuestionsClient({ mockTest, questions }: MockTestQuestionsClientProps) {
    const router = useRouter();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<any>(null);

    const handleOpenCreate = () => {
        setEditingQuestion(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (question: any) => {
        setEditingQuestion(question);
        setIsFormOpen(true);
    };

    const handleDelete = async (questionId: string) => {
        if (!confirm("Are you sure you want to delete this question?")) return;
        
        try {
            const res = await fetch(`/api/admin/mock-test/${mockTest.id}/questions/${questionId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete");
            toast.success("Question deleted");
            router.refresh();
        } catch (error) {
            toast.error("Failed to delete question");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.push("/admin/mock-test")}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Questions: {mockTest.title}</h2>
                        <p className="text-muted-foreground">
                            Manage questions for this mock test. ({questions.length} / {mockTest.totalQuestions} questions)
                        </p>
                    </div>
                </div>
                <Button onClick={handleOpenCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add Question
                </Button>
            </div>
            
            <Separator />

            <div className="space-y-4">
                {questions.length === 0 ? (
                    <div className="text-center p-12 border border-dashed rounded-lg">
                        <p className="text-muted-foreground mb-4">No questions added yet.</p>
                        <Button variant="outline" onClick={handleOpenCreate}>
                            <Plus className="mr-2 h-4 w-4" /> Add First Question
                        </Button>
                    </div>
                ) : (
                    questions.map((q, index) => (
                        <Card key={q.id}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="secondary">Q{index + 1}</Badge>
                                            <span className="font-semibold text-lg">{q.question}</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                            {q.options.map((opt: string, i: number) => (
                                                <div 
                                                    key={i} 
                                                    className={`p-3 rounded border ${q.correctAnswer === i ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 font-medium' : 'bg-muted/50'}`}
                                                >
                                                    <span className="mr-2 text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                                                    {opt}
                                                    {q.correctAnswer === i && <span className="ml-2 text-green-600 text-xs font-bold">(Correct)</span>}
                                                </div>
                                            ))}
                                        </div>
                                        {q.explanation && (
                                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded text-sm text-blue-800 dark:text-blue-300">
                                                <strong>Explanation: </strong>
                                                {q.explanation}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2 shrink-0">
                                        <Button variant="outline" size="sm" onClick={() => handleOpenEdit(q)}>
                                            <Edit className="w-4 h-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(q.id)}>
                                            <Trash className="w-4 h-4 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {isFormOpen && (
                <QuestionForm 
                    testId={mockTest.id} 
                    initialData={editingQuestion} 
                    isOpen={isFormOpen} 
                    onClose={() => setIsFormOpen(false)} 
                />
            )}
        </div>
    );
}
