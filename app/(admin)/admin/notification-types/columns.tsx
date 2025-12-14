
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

export type NotificationTypeColumn = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: Date;
};

interface ColumnsProps {
    onEdit: (item: NotificationTypeColumn) => void;
}

export const columns = ({ onEdit }: ColumnsProps): ColumnDef<NotificationTypeColumn>[] => [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const item = row.original;
            const router = useRouter();

            const handleDelete = async () => {
                try {
                    const res = await fetch(`/api/admin/notification-types/${item.id}`, {
                        method: "DELETE",
                    });
                    if (!res.ok) throw new Error("Failed to delete");
                    toast.success("Notification type deleted");
                    router.refresh();
                } catch (error) {
                    toast.error("Failed to delete notification type");
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
