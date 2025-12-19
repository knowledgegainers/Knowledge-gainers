"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface CategoryComboboxProps {
    value: string;
    onChange: (value: string) => void;
    fetchUrl?: string;
}

export function CategoryCombobox({ value, onChange, fetchUrl = "/api/admin/current-affairs/categories" }: CategoryComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [categories, setCategories] = React.useState<string[]>([]);

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(fetchUrl);
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data.map((c: any) => c.category || c)); // Handle both string[] and {category: string}[]
                }
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, [fetchUrl]);

    const handleCreate = () => {
        if (!query) return;
        // Just set the value directly, it's a string based category
        onChange(query);
        // Optimistically add to list
        if (!categories.includes(query)) {
            setCategories((prev) => [...prev, query]);
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value || "Select category..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Search or add category..."
                        value={query}
                        onValueChange={setQuery}
                    />
                    <CommandList>
                        <CommandEmpty>
                            <div className="p-2">
                                <p className="text-sm text-muted-foreground mb-2">No category found.</p>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full h-8"
                                    onClick={handleCreate}
                                    disabled={!query}
                                >
                                    <Plus className="mr-2 h-3 w-3" />
                                    Use "{query}"
                                </Button>
                            </div>
                        </CommandEmpty>
                        <CommandGroup heading="Existing Categories">
                            {categories.map((category) => (
                                <CommandItem
                                    key={category}
                                    value={category}
                                    onSelect={(currentValue) => {
                                        // CommandItem sometimes lowercases value, but we want exact string if possible.
                                        // But here `category` is the source of truth.
                                        onChange(category);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === category ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {category}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
