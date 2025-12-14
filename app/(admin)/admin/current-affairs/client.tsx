
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { CurrentAffairDialog } from "./current-affair-dialog";
import { Separator } from "@/components/ui/separator";

interface Result {
    id: string;
    title: string;
    content: string;
    imageUrl: string | null;
    date: Date;
    createdAt: Date;
}

interface ClientProps {
    initialData: Result[];
}

export function CurrentAffairsClient({ initialData }: ClientProps) {
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
                    <h2 className="text-3xl font-bold tracking-tight">Current Affairs</h2>
                    <p className="text-muted-foreground">
                        Manage daily current affairs news.
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
                searchKey="title"
            />
            <CurrentAffairDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                initialData={selectedItem}
            />
        </div>
    );
}
