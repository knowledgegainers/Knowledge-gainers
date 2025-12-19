
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export type BookColumn = {
    id: string;
    title: string;
    categoryId: string;
    description: string | null;
    fileUrl: string;
    thumbnailUrl: string | null;
    createdAt: Date;
    category: {
        id: string;
        name: string;
    };
};

interface ColumnsProps { }

export const columns: ColumnDef<BookColumn>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "category.name",
        header: "Category",
        cell: ({ row }) => <Badge variant="secondary">{row.original.category.name}</Badge>,
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString('en-US'),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const book = row.original;
            const router = useRouter();

            const handleDelete = async () => {
                try {
                    const res = await fetch(`/api/admin/books/${book.id}`, {
                        method: "DELETE",
                    });
                    if (!res.ok) throw new Error("Failed to delete");
                    toast.success("Book deleted");
                    router.refresh();
                } catch (error) {
                    toast.error("Failed to delete book");
                }
            };

            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/books/${book.id}`)}>
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
