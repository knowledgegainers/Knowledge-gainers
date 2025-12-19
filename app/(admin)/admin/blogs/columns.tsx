"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Globe, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export type BlogColumn = {
    id: string;
    title: string;
    category: string;
    updatedAt: Date;
    isPublished: boolean;
};

export const columns: ColumnDef<BlogColumn>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <span className="font-medium">{row.getValue("title")}</span>,
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <Badge variant="secondary">{row.getValue("category")}</Badge>,
    },
    {
        accessorKey: "isPublished",
        header: "Status",
        cell: ({ row }) => {
            const isPublished = row.getValue("isPublished");
            return (
                <Badge variant={isPublished ? "default" : "outline"} className={isPublished ? "bg-green-600 hover:bg-green-700" : ""}>
                    {isPublished ? (
                        <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3" /> Published
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
        accessorKey: "updatedAt",
        header: "Last Modified",
        cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString('en-US'),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const blog = row.original;
            const router = useRouter();

            const handleDelete = async () => {
                try {
                    const res = await fetch(`/api/admin/blogs/${blog.id}`, {
                        method: "DELETE",
                    });
                    if (!res.ok) throw new Error("Failed to delete");
                    toast.success("Blog deleted");
                    router.refresh();
                } catch (error) {
                    toast.error("Failed to delete blog");
                }
            };

            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/blogs/${blog.id}`)}>
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
