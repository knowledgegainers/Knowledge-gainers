"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Globe, EyeOff, LayoutList } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export type MockTestColumn = {
    id: string;
    title: string;
    duration: number;
    totalQuestions: number;
    difficulty: string;
    isActive: boolean;
};

export const columns: ColumnDef<MockTestColumn>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <span className="font-medium">{row.getValue("title")}</span>,
    },
    {
        accessorKey: "difficulty",
        header: "Difficulty",
        cell: ({ row }) => <Badge variant="secondary">{row.getValue("difficulty")}</Badge>,
    },
    {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row }) => <span>{row.getValue("duration")} mins</span>,
    },
    {
        accessorKey: "totalQuestions",
        header: "Questions",
        cell: ({ row }) => <span>{row.getValue("totalQuestions")}</span>,
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.getValue("isActive");
            return (
                <Badge variant={isActive ? "default" : "outline"} className={isActive ? "bg-green-600 hover:bg-green-700" : ""}>
                    {isActive ? (
                        <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3" /> Active
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <EyeOff className="w-3 h-3" /> Draft
                        </div>
                    )}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const mockTest = row.original;
            const router = useRouter();

            const handleDelete = async () => {
                try {
                    const res = await fetch(`/api/admin/mock-test/${mockTest.id}`, {
                        method: "DELETE",
                    });
                    if (!res.ok) throw new Error("Failed to delete");
                    toast.success("Mock test deleted");
                    router.refresh();
                } catch (error) {
                    toast.error("Failed to delete mock test");
                }
            };

            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" title="Edit Mock Test" onClick={() => router.push(`/admin/mock-test/${mockTest.id}`)}>
                        <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Manage Questions" onClick={() => router.push(`/admin/mock-test/${mockTest.id}/questions`)}>
                        <LayoutList className="h-4 w-4 text-emerald-500" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete Mock Test" onClick={handleDelete}>
                        <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            );
        },
    },
];
