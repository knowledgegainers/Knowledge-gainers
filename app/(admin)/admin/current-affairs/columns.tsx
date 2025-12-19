"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

export type CurrentAffairColumn = {
    id: string;
    title: string;
    content: string;
    imageUrl: string | null;
    date: Date;
};

export const columns: ColumnDef<CurrentAffairColumn>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString('en-US'),
    },
    {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => {
            // Strip HTML tags for preview and truncate
            const content = row.original.content.replace(/<[^>]*>?/gm, '');
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
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/current-affairs/${item.id}`)}>
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
