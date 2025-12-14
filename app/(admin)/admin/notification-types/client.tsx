
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { NotificationTypeDialog } from "./notification-type-dialog"
import { Separator } from "@/components/ui/separator";

interface Result {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}

interface ClientProps {
    initialData: Result[];
}

export function NotificationTypesClient({ initialData }: ClientProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Notification Types</h2>
                    <p className="text-muted-foreground">
                        Manage types for your notifications.
                    </p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns({ onEdit: handleEdit })}
                data={initialData}
                searchKey="name"
            />
            <NotificationTypeDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                initialData={selectedItem}
            />
        </div>
    );
}
