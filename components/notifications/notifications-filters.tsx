"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, GraduationCap, Bell } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { notificationTypes } from "@/db/schema";

type NotificationType = typeof notificationTypes.$inferSelect;

interface NotificationsFiltersProps {
    types: NotificationType[];
}

export function NotificationsFilters({ types }: NotificationsFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialType = searchParams.get("typeId") || "all";
    const initialQuery = searchParams.get("query") || "";

    const [selectedType, setSelectedType] = useState(initialType);
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    // Sync from URL
    useEffect(() => {
        setSelectedType(initialType);
        setSearchQuery(initialQuery);
    }, [initialType, initialQuery]);

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery !== initialQuery) {
                updateUrl(selectedType, searchQuery);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const updateUrl = (typeId: string, query: string) => {
        const params = new URLSearchParams(searchParams);
        if (typeId && typeId !== "all") params.set("typeId", typeId);
        else params.delete("typeId");

        if (query) params.set("query", query);
        else params.delete("query");

        router.push(`/notifications?${params.toString()}`, { scroll: false });
    };

    const handleTypeChange = (typeId: string) => {
        setSelectedType(typeId);
        updateUrl(typeId, searchQuery);
    };

    const getIconForType = (type: NotificationType) => {
        if (type.slug.includes("job") || type.name.toLowerCase().includes("job")) return Briefcase;
        if (type.slug.includes("exam") || type.name.toLowerCase().includes("exam")) return GraduationCap;
        return Bell;
    };

    const filterOptions = [
        { id: "all", label: "All", icon: Bell },
        ...types.map(t => ({ id: t.id, label: t.name, icon: getIconForType(t) }))
    ];

    return (
        <section className="py-8 bg-card border-y border-border sticky top-16 z-40 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Type Filters */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                        {filterOptions.map((option) => (
                            <Button
                                key={option.id}
                                variant={selectedType === option.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleTypeChange(option.id)}
                                className="gap-2 whitespace-nowrap"
                            >
                                <option.icon className="h-4 w-4" />
                                {option.label}
                            </Button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
                            <Input
                                placeholder="Search notifications..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 text-black"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
