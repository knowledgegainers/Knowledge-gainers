"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { examTypes } from "@/db/schema";

type ExamType = typeof examTypes.$inferSelect;

interface ExamPapersFiltersProps {
    types: ExamType[];
}

const years = ["2024", "2023", "2022", "2021", "2020"];

export function ExamPapersFilters({ types }: ExamPapersFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialType = searchParams.get("typeId") || "all";
    const initialYear = searchParams.get("year") || "all";
    const initialQuery = searchParams.get("query") || "";

    const [selectedExamType, setSelectedExamType] = useState(initialType);
    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    // Sync from URL
    useEffect(() => {
        setSelectedExamType(initialType);
        setSelectedYear(initialYear);
        setSearchQuery(initialQuery);
    }, [initialType, initialYear, initialQuery]);

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery !== initialQuery) {
                updateUrl(selectedExamType, selectedYear, searchQuery);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const updateUrl = (typeId: string, year: string, query: string) => {
        const params = new URLSearchParams(searchParams);
        if (typeId && typeId !== "all") params.set("typeId", typeId);
        else params.delete("typeId");

        if (year && year !== "all") params.set("year", year);
        else params.delete("year");

        if (query) params.set("query", query);
        else params.delete("query");

        router.push(`/exam-papers?${params.toString()}`, { scroll: false });
    };

    const handleTypeChange = (typeId: string) => {
        setSelectedExamType(typeId);
        updateUrl(typeId, selectedYear, searchQuery);
    };

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        updateUrl(selectedExamType, year, searchQuery);
    };

    const typeList = [
        { id: "all", label: "All Exams" },
        ...types.map(t => ({ id: t.id, label: t.name }))
    ];

    return (
        <section className="py-8 bg-card border-y border-border sticky top-16 z-40 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    {/* Exam Type Filters */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                        {typeList.map((type) => (
                            <Button
                                key={type.id}
                                variant={selectedExamType === type.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleTypeChange(type.id)}
                                className="whitespace-nowrap"
                            >
                                {type.label}
                            </Button>
                        ))}
                    </div>

                    {/* Search & Year Filter */}
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
                            <Input
                                placeholder="Search papers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 text-black"
                            />
                        </div>
                        <Select value={selectedYear} onValueChange={handleYearChange}>
                            <SelectTrigger className="w-32 text-black bg-white">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-black">
                                <SelectItem value="all">All Years</SelectItem>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>
                </div>
            </div>
        </section>
    );
}
