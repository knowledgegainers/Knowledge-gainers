"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardTabsProps {
    bookCount: number;
    notifCount: number;
}

export function DashboardTabs({ bookCount, notifCount }: DashboardTabsProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeTab = searchParams.get("tab") || "books";

    const handleTabChange = (tab: "books" | "notifications") => {
        const params = new URLSearchParams(searchParams);
        params.set("tab", tab);
        router.push(`/dashboard?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex items-center gap-6 mt-6">
            <button
                onClick={() => handleTabChange("books")}
                className={cn(
                    "flex items-center gap-2 pb-3 text-sm font-medium transition-colors relative",
                    activeTab === "books"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                <BookOpen className="h-4 w-4" />
                Saved Books
                <Badge variant="secondary" className="ml-1 text-xs">
                    {bookCount}
                </Badge>
                {activeTab === "books" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                )}
            </button>
            <button
                onClick={() => handleTabChange("notifications")}
                className={cn(
                    "flex items-center gap-2 pb-3 text-sm font-medium transition-colors relative",
                    activeTab === "notifications"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                <Bell className="h-4 w-4" />
                Saved Notifications
                <Badge variant="secondary" className="ml-1 text-xs">
                    {notifCount}
                </Badge>
                {activeTab === "notifications" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                )}
            </button>
        </div>
    );
}
