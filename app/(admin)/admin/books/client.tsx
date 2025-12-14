
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { BookDialog } from "./book-dialog";
import { Separator } from "@/components/ui/separator";

interface Book {
    id: string;
    title: string;
    categoryId: string;
    description: string | null;
    fileUrl: string;
    thumbnailUrl: string | null;
    createdAt: Date;
    category: {
        id: string;
        name: string;
    };
}

interface BooksClientProps {
    initialBooks: any[];
    categories: any[];
}

export function BooksClient({ initialBooks, categories }: BooksClientProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);

    const handleEdit = (book: any) => {
        setSelectedBook(book);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setSelectedBook(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Books</h2>
                    <p className="text-muted-foreground">
                        Manage your book library.
                    </p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns({ onEdit: handleEdit })}
                data={initialBooks}
                searchKey="title"
            />
            <BookDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                initialData={selectedBook}
                categories={categories}
            />
        </div>
    );
}
