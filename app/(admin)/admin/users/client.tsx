
"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";

interface User {
    id: string;
    imageUrl: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    lastActiveAt: Date | null;
    createdAt: Date;
}

interface UsersClientProps {
    initialUsers: User[];
}

export function UsersClient({ initialUsers }: UsersClientProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground">
                        View all registered users ({initialUsers.length}).
                    </p>
                </div>
            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={initialUsers}
                searchKey="email"
            />
        </div>
    );
}
