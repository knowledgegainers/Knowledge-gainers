"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function CurrentAffairsFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialMonth = searchParams.get("month") || "all";
    const initialQuery = searchParams.get("query") || "";

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);

    // Sync from URL
    useEffect(() => {
        setSelectedMonth(initialMonth);
        setSearchQuery(initialQuery);
    }, [initialMonth, initialQuery]);

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery !== initialQuery) {
                updateUrl(selectedMonth, searchQuery);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const updateUrl = (month: string, query: string) => {
        const params = new URLSearchParams(searchParams);
        if (month && month !== "all") params.set("month", month);
        else params.delete("month");

        if (query) params.set("query", query);
        else params.delete("query");

        router.push(`/current-affairs?${params.toString()}`, { scroll: false });
    };

    const handleMonthChange = (value: string) => {
        setSelectedMonth(value);
        updateUrl(value, searchQuery);
    };

    return (
        <section className="py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search current affairs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={selectedMonth} onValueChange={handleMonthChange}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Filter by month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Months</SelectItem>
                            {months.map((month) => (
                                <SelectItem key={month} value={month.toLowerCase()}>{month}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    );
}
