
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

export type CurrentAffairColumn = {
    id: string;
    title: string;
    content: string;
    imageUrl: string | null;
    date: Date;
};

interface ColumnsProps {
    onEdit: (item: CurrentAffairColumn) => void;
}

export const columns = ({ onEdit }: ColumnsProps): ColumnDef<CurrentAffairColumn>[] => [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
    },
    {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => {
            const content = row.original.content;
            return content.length > 50 ? content.slice(0, 50) + "..." : content;
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const item = row.original;
            const router = useRouter();

            const handleDelete = async () => {
                try {
                    const res = await fetch(`/api/admin/current-affairs/${item.id}`, {
                        method: "DELETE",
                    });
                    if (!res.ok) throw new Error("Failed to delete");
                    toast.success("Item deleted");
                    router.refresh();
                } catch (error) {
                    toast.error("Failed to delete item");
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
                        <DropdownMenuItem onClick={() => onEdit(item)}>
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
