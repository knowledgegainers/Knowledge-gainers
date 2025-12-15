
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type UserColumn = {
    id: string;
    imageUrl: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    lastActiveAt: Date | null;
    createdAt: Date;
};

export const columns: ColumnDef<UserColumn>[] = [
    {
        accessorKey: "imageUrl",
        header: "Avatar",
        cell: ({ row }) => (
            <Avatar>
                <AvatarImage src={row.original.imageUrl} alt={row.original.firstName || "User"} />
                <AvatarFallback>{row.original.firstName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => `${row.original.firstName || ""} ${row.original.lastName || ""}`.trim() || "N/A",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "lastActiveAt",
        header: "Last Active",
        cell: ({ row }) => row.original.lastActiveAt ? row.original.lastActiveAt.toLocaleDateString('en-US') : "Never",
    },
    {
        accessorKey: "createdAt",
        header: "Joined At",
        cell: ({ row }) => row.original.createdAt.toLocaleDateString('en-US'),
    },
];
