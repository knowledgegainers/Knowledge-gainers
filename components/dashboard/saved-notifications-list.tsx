"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Briefcase, GraduationCap, Calendar, Clock, ExternalLink } from "lucide-react";
import { NotificationWithType } from "@/app/actions/notifications";
import { cn } from "@/lib/utils";

interface SavedNotificationsListProps {
    notifications: NotificationWithType[];
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

export function SavedNotificationsList({ notifications }: SavedNotificationsListProps) {
    if (notifications.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No saved notifications</h3>
                <p className="text-muted-foreground mt-1">
                    Important updates you save will appear here.
                </p>
                <Button className="mt-4" asChild>
                    <a href="/notifications">Browse Notifications</a>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {notifications.map((notification) => {
                    const daysRemaining = getDaysRemaining(notification.expiryDate);
                    const isUrgent = daysRemaining > 0 && daysRemaining <= 7;
                    const isExpired = daysRemaining <= 0;
                    const isJob = notification.type.slug.includes("job");

                    return (
                        <div
                            key={notification.id}
                            className="group bg-card rounded-xl border border-border p-6 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                                <div className={cn(
                                    "shrink-0 p-4 rounded-xl",
                                    isJob ? "bg-green-500/10" : "bg-blue-500/10"
                                )}>
                                    {isJob ? (
                                        <Briefcase className="h-6 w-6 text-green-600" />
                                    ) : (
                                        <GraduationCap className="h-6 w-6 text-blue-600" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                            {notification.title}
                                        </h3>
                                        <Badge variant={isJob ? 'default' : 'secondary'}>
                                            {notification.type.name}
                                        </Badge>
                                        {isUrgent && !isExpired && (
                                            <Badge variant="destructive" className="animate-pulse">Urgent</Badge>
                                        )}
                                        {isExpired && (
                                            <Badge variant="outline">Expired</Badge>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground line-clamp-1 mb-3">
                                        {notification.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4" />
                                            <span>Posted: {formatDate(notification.createdAt)}</span>
                                        </div>
                                        {notification.expiryDate && (
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="h-4 w-4" />
                                                <span>{daysRemaining} days left</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <Button variant="outline" asChild>
                                        <a href={notification.applyLink || "#"} target="_blank" rel="noopener noreferrer">
                                            Apply Now <ExternalLink className="h-4 w-4 ml-2" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
