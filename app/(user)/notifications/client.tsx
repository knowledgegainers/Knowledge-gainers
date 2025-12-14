"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Bell,
    Search,
    Calendar,
    ExternalLink,
    Clock,
    Briefcase,
    GraduationCap,
    Plus
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { NotificationWithType } from "@/app/actions/notifications";
import { notificationTypes } from "@/db/schema";

type NotificationType = typeof notificationTypes.$inferSelect;

interface NotificationsClientProps {
    initialNotifications: NotificationWithType[];
    types: NotificationType[];
}

function getDaysRemaining(date: Date | null): number {
    if (!date) return 0;
    const lastDate = new Date(date);
    const today = new Date();
    const diffTime = lastDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

export default function NotificationsClient({ initialNotifications, types }: NotificationsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialType = searchParams.get("typeId") || "all";
    const initialQuery = searchParams.get("query") || "";

    const [selectedType, setSelectedType] = useState(initialType);
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery !== initialQuery) {
                updateUrl(selectedType, searchQuery);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const updateUrl = (typeId: string, query: string) => {
        const params = new URLSearchParams();
        if (typeId && typeId !== "all") params.set("typeId", typeId);
        if (query) params.set("query", query);
        router.push(`/notifications?${params.toString()}`);
    };

    const handleTypeChange = (typeId: string) => {
        setSelectedType(typeId);
        updateUrl(typeId, searchQuery);
    };

    // Helper to guess icon based on name/slug if possible, or default
    const getIconForType = (type: NotificationType) => {
        if (type.slug.includes("job") || type.name.toLowerCase().includes("job")) return Briefcase;
        if (type.slug.includes("exam") || type.name.toLowerCase().includes("exam")) return GraduationCap;
        return Bell;
    };

    const filterOptions = [
        { id: "all", label: "All", icon: Bell },
        ...types.map(t => ({ id: t.id, label: t.name, icon: getIconForType(t), slug: t.slug }))
    ];

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium mb-6">
                            <Bell className="h-4 w-4 " />
                            Stay Updated
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Latest <span className="gradient-text">Notifications</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Never miss important exam dates and job application deadlines.
                            Get all government job and exam notifications in one place.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters */}
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

            {/* Notifications List */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Count */}
                    <p className="text-sm text-muted-foreground mb-6">
                        Showing {initialNotifications.length} {initialNotifications.length === 1 ? 'notification' : 'notifications'}
                        {selectedType !== "all" && ` for ${filterOptions.find(o => o.id === selectedType)?.label || 'Type'}`}
                    </p>

                    {/* List */}
                    <div className="space-y-4">
                        {initialNotifications.map((notification, index) => {
                            const daysRemaining = getDaysRemaining(notification.expiryDate);
                            const isUrgent = daysRemaining > 0 && daysRemaining <= 7;
                            const isExpired = daysRemaining <= 0;
                            // Basic logic to determine icon style based on type slug (assuming 'job' or 'exam' in slug)
                            // Fallback to blue if unknown
                            const isJob = notification.type.slug.includes("job");

                            return (
                                <div
                                    key={notification.id}
                                    className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                                        {/* Icon */}
                                        <div className={`shrink-0 p-4 rounded-xl ${isJob ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                                            {isJob ? (
                                                <Briefcase className="h-6 w-6 text-green-600" />
                                            ) : (
                                                <GraduationCap className="h-6 w-6 text-blue-600" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                    {notification.title}
                                                </h3>
                                                <Badge variant={isJob ? 'default' : 'secondary'}>
                                                    {notification.type.name}
                                                </Badge>
                                                {isUrgent && !isExpired && (
                                                    <Badge variant="destructive" className="animate-pulse">
                                                        Urgent
                                                    </Badge>
                                                )}
                                                {isExpired && (
                                                    <Badge variant="outline" className="text-muted-foreground">
                                                        Expired
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-muted-foreground line-clamp-2 mb-3">
                                                {notification.description}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>Posted: {formatDate(notification.createdAt)}</span>
                                                </div>
                                                {notification.expiryDate && (
                                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>Last Date: {formatDate(notification.expiryDate)}</span>
                                                    </div>
                                                )}
                                                {notification.expiryDate && (
                                                    <div className={`flex items-center gap-1.5 ${isUrgent ? 'text-destructive' : isExpired ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                                                        <Clock className="h-4 w-4" />
                                                        <span className={isUrgent ? 'font-medium' : ''}>
                                                            {isExpired ? 'Expired' : `${daysRemaining} days remaining`}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="shrink-0">
                                            <Button
                                                className="gap-2"
                                                disabled={isExpired}
                                                variant={isExpired ? "outline" : "default"}
                                                asChild={!isExpired}
                                            >
                                                {isExpired ? (
                                                    'Closed'
                                                ) : (
                                                    <a href={notification.applyLink || "#"} target="_blank" rel="noopener noreferrer">
                                                        Apply Now
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {initialNotifications.length === 0 && (
                        <div className="text-center py-16">
                            <Bell className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No notifications found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filter to find what you're looking for.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
