
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
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

interface ColumnsProps {
    onEdit: (book: BookColumn) => void;
}

export const columns = ({ onEdit }: ColumnsProps): ColumnDef<BookColumn>[] => [
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit(book)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
