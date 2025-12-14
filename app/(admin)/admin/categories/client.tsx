
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table"; // Will be created
import { columns } from "./columns"; // Will be created
import { CategoryDialog } from "./category-dialog"; // Will be created
import { Separator } from "@/components/ui/separator";

interface CategoriesClientProps {
    initialCategories: any[];
}

export function CategoriesClient({ initialCategories }: CategoriesClientProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const handleEdit = (category: any) => {
        setSelectedCategory(category);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setSelectedCategory(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Book Categories</h2>
                    <p className="text-muted-foreground">
                        Manage categories for your book library.
                    </p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns({ onEdit: handleEdit })}
                data={initialCategories}
                searchKey="name"
            />
            <CategoryDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                initialData={selectedCategory}
            />
        </div>
    );
}
