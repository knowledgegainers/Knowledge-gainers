"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Briefcase, GraduationCap, Calendar, Clock, ExternalLink } from "lucide-react";
import { NotificationWithType } from "@/app/actions/notifications";
import { notificationTypes } from "@/db/schema";
import { cn } from "@/lib/utils";

type NotificationType = typeof notificationTypes.$inferSelect;

interface NotificationsListProps {
    notifications: NotificationWithType[];
    selectedType: string;
    // types mainly used for looking up label of selected type if "all" isn't selected, 
    // but we can pass currentTypeLabel if easier, or pass types.
    // Let's pass types to be robust.
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

export function NotificationsList({ notifications, types, selectedType }: NotificationsListProps) {
    if (notifications.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
                <Bell className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No notifications found</h3>
                <p className="text-muted-foreground">
                    Try adjusting your search or filter to find what you're looking for.
                </p>
            </div>
        );
    }

    const typeLabel = types.find(t => t.id === selectedType)?.name || 'Type';

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
                Showing {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
                {selectedType !== "all" && ` for ${typeLabel}`}
            </p>

            <div className="space-y-4">
                {notifications.map((notification, index) => {
                    const daysRemaining = getDaysRemaining(notification.expiryDate);
                    const isUrgent = daysRemaining > 0 && daysRemaining <= 7;
                    const isExpired = daysRemaining <= 0;
                    const isJob = notification.type.slug.includes("job");

                    return (
                        <div
                            key={notification.id}
                            className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                                {/* Icon */}
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
                                            <div className={cn(
                                                "flex items-center gap-1.5",
                                                isUrgent ? "text-destructive" : "text-muted-foreground"
                                            )}>
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
        </div>
    );
}
