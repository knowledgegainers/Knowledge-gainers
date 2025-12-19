"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export type ExamPaperColumn = {
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
};

export const columns: ColumnDef<ExamPaperColumn>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "type.name",
        header: "Type",
        cell: ({ row }) => <Badge variant="outline">{row.original.type.name}</Badge>,
    },
    {
        accessorKey: "year",
        header: "Year",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString('en-US'),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const paper = row.original;
            const router = useRouter();

            const handleDelete = async () => {
                try {
                    const res = await fetch(`/api/admin/exam-papers/${paper.id}`, {
                        method: "DELETE",
                    });
                    if (!res.ok) throw new Error("Failed to delete");
                    toast.success("Paper deleted");
                    router.refresh();
                } catch (error) {
                    toast.error("Failed to delete paper");
                }
            };

            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/exam-papers/${paper.id}`)}>
                        <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleDelete}>
                        <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            );
        },
    },
];
