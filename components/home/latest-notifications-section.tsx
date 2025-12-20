import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, ArrowRight, Calendar, ExternalLink, Clock } from "lucide-react";
import { getLatestNotifications } from "@/app/actions/notifications";

function getDaysRemaining(date: Date | null): number {
    if (!date) return 0;
    const lastDate = new Date(date);
    const today = new Date();
    const diffTime = lastDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export async function LatestNotificationsSection() {
    const latestNotifications = await getLatestNotifications(4);

    return (
        <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
                            <Bell className="h-4 w-4" />
                            Stay Updated
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Latest <span className="gradient-text">Notifications</span>
                        </h2>
                    </div>
                    <Link href="/notifications">
                        <Button variant="secondary" className="gap-2 group">
                            View All Notifications
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {latestNotifications.map((notification, index) => {
                        const daysRemaining = getDaysRemaining(notification.expiryDate);
                        const isUrgent = daysRemaining <= 7 && daysRemaining > 0;
                        const isJob = notification.type.slug.includes("job") || notification.type.name.toLowerCase().includes("job");

                        return (
                            <div
                                key={notification.id}
                                className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                                    {/* Icon */}
                                    <div className={`shrink-0 p-4 rounded-xl ${isJob ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                                        <Bell className={`h-6 w-6 ${isJob ? 'text-green-600' : 'text-blue-600'}`} />
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
                                            {isUrgent && (
                                                <Badge variant="destructive" className="animate-pulse">
                                                    Urgent
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground line-clamp-2 mb-3">
                                            {notification.description?.replace(/<[^>]+>/g, "")}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                <span>Posted: {new Date(notification.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            {notification.expiryDate && (
                                                <div className={`flex items-center gap-1.5 ${isUrgent ? 'text-destructive' : 'text-muted-foreground'}`}>
                                                    <Clock className="h-4 w-4" />
                                                    <span className={isUrgent ? 'font-medium' : ''}>
                                                        {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Expired'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="shrink-0">
                                        <Button className="gap-2" asChild>
                                            <Link href={`/notifications/${notification.id}`}>
                                                View Details
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
