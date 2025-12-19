"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function BlogsFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("query") || "";
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery !== initialQuery) {
                const params = new URLSearchParams(searchParams);
                if (searchQuery) {
                    params.set("query", searchQuery);
                } else {
                    params.delete("query");
                }
                router.push(`/blogs?${params.toString()}`);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery, initialQuery, router, searchParams]);

    return (
        <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
            />
        </div>
    );
}
