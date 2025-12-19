
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

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

interface ColumnsProps { }

export const columns = (props: ColumnsProps = {}): ColumnDef<NotificationColumn>[] => [
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
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/notifications/${notification.id}`)}>
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
