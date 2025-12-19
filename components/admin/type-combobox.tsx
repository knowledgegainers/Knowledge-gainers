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
import { toast } from "sonner";

interface Type {
    id: string;
    name: string;
}

interface TypeComboboxProps {
    value: string;
    onChange: (value: string) => void;
    types: Type[];
    typeLabel: string; // e.g., "Exam Type", "Notification Type"
    createUrl: string; // e.g., "/api/admin/exam-types"
}

export function TypeCombobox({ value, onChange, types, typeLabel, createUrl }: TypeComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [localTypes, setLocalTypes] = React.useState<Type[]>(types);

    // Sync local types if props change
    React.useEffect(() => {
        setLocalTypes(types);
    }, [types]);

    const handleCreate = async () => {
        if (!query) return;
        setLoading(true);
        try {
            const slug = query.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
            const res = await fetch(createUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: query, slug }),
            });

            if (!res.ok) throw new Error("Failed to create type");

            const newType = await res.json();
            setLocalTypes((prev) => [newType, ...prev]);
            onChange(newType.id);
            setOpen(false);
            toast.success(`${typeLabel} created`);
        } catch (error) {
            toast.error("Failed to create type");
        } finally {
            setLoading(false);
        }
    };

    const selectedType = localTypes.find((type) => type.id === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {selectedType ? selectedType.name : `Select ${typeLabel.toLowerCase()}...`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder={`Search or create ${typeLabel.toLowerCase()}...`}
                        value={query}
                        onValueChange={setQuery}
                    />
                    <CommandList>
                        <CommandEmpty>
                            <div className="p-2">
                                <p className="text-sm text-muted-foreground mb-2">No type found.</p>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full h-8"
                                    onClick={handleCreate}
                                    disabled={loading || !query}
                                >
                                    <Plus className="mr-2 h-3 w-3" />
                                    Create "{query}"
                                </Button>
                            </div>
                        </CommandEmpty>
                        <CommandGroup heading="Existing Types">
                            {localTypes.map((type) => (
                                <CommandItem
                                    key={type.id}
                                    value={type.name}
                                    onSelect={() => {
                                        onChange(type.id === value ? "" : type.id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === type.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {type.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
