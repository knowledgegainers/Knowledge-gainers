
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

export type NotificationColumn = {
    id: string;
    title: string;
    description: string;
    typeId: string;
    applyLink: string | null;
    expiryDate: Date | null;
    createdAt: Date;
    type: {
        id: string;
        name: string;
    };
};

interface ColumnsProps {
    onEdit: (notification: NotificationColumn) => void;
}

export const columns = ({ onEdit }: ColumnsProps): ColumnDef<NotificationColumn>[] => [
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
        accessorKey: "expiryDate",
        header: "Expiry Date",
        cell: ({ row }) => row.original.expiryDate ? new Date(row.original.expiryDate).toLocaleDateString('en-US') : "-",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString('en-US'),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const notification = row.original;
            const router = useRouter();

            const handleDelete = async () => {
                try {
                    const res = await fetch(`/api/admin/notifications/${notification.id}`, {
                        method: "DELETE",
                    });
                    if (!res.ok) throw new Error("Failed to delete");
                    toast.success("Notification deleted");
                    router.refresh();
                } catch (error) {
                    toast.error("Failed to delete notification");
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
                        <DropdownMenuItem onClick={() => onEdit(notification)}>
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
