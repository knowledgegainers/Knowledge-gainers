
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

interface Notification {
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
}

interface NotificationsClientProps {
    initialNotifications: any[];
    types: any[];
}

export function NotificationsClient({ initialNotifications, types }: NotificationsClientProps) {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
                    <p className="text-muted-foreground">
                        Manage your alerts and notifications.
                    </p>
                </div>
                <Button onClick={() => router.push("/admin/notifications/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns()}
                data={initialNotifications}
                searchKey="title"
            />
        </div>
    );
}
