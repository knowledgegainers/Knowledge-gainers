"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

interface BlogsClientProps {
    data: any[];
}

export function BlogsClient({ data }: BlogsClientProps) {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Blogs</h2>
                    <p className="text-muted-foreground">
                        Manage your blog posts.
                    </p>
                </div>
                <Button onClick={() => router.push("/admin/blogs/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                searchKey="title"
            />
        </div>
    );
}
