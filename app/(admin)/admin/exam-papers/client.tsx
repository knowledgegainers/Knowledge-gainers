
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { ExamPaperDialog } from "./exam-paper-dialog";
import { Separator } from "@/components/ui/separator";

interface ExamPaper {
    id: string;
    title: string;
    typeId: string;
    year: number;
    description: string | null;
    fileUrl: string;
    createdAt: Date;
    type: {
        id: string;
        name: string;
    };
}

interface ExamPapersClientProps {
    initialPapers: any[];
    types: any[];
}

export function ExamPapersClient({ initialPapers, types }: ExamPapersClientProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPaper, setSelectedPaper] = useState<any>(null);

    const handleEdit = (paper: any) => {
        setSelectedPaper(paper);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setSelectedPaper(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Exam Papers</h2>
                    <p className="text-muted-foreground">
                        Manage your past exam papers.
                    </p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns({ onEdit: handleEdit })}
                data={initialPapers}
                searchKey="title"
            />
            <ExamPaperDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                initialData={selectedPaper}
                types={types}
            />
        </div>
    );
}
