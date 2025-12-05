import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, ArrowRight, Calendar, ExternalLink, Clock } from "lucide-react";

// Mock data - will be replaced with real data from database
const latestNotifications = [
    {
        id: 1,
        title: "SSC CGL 2024 Notification Released",
        description: "Staff Selection Commission has released the notification for Combined Graduate Level Examination 2024.",
        type: "job",
        lastDate: "2024-12-15",
        applyLink: "#",
    },
    {
        id: 2,
        title: "EAMCET 2024 Registration Open",
        description: "AP EAMCET 2024 online application process has started. Last date to apply with late fee is approaching.",
        type: "exam",
        lastDate: "2024-12-28",
        applyLink: "#",
    },
    {
        id: 3,
        title: "Railway NTPC Recruitment 2024",
        description: "RRB has announced recruitment for Non-Technical Popular Categories with over 10,000 vacancies.",
        type: "job",
        lastDate: "2024-12-20",
        applyLink: "#",
    },
    {
        id: 4,
        title: "JEE Main 2025 Session 1",
        description: "NTA has released the notification for JEE Main 2025 Session 1. Check eligibility and exam pattern.",
        type: "exam",
        lastDate: "2025-01-10",
        applyLink: "#",
    },
];

function getDaysRemaining(dateString: string): number {
    const lastDate = new Date(dateString);
    const today = new Date();
    const diffTime = lastDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export function LatestNotificationsSection() {
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
                        const daysRemaining = getDaysRemaining(notification.lastDate);
                        const isUrgent = daysRemaining <= 7 && daysRemaining > 0;

                        return (
                            <div
                                key={notification.id}
                                className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                                    {/* Icon */}
                                    <div className={`shrink-0 p-4 rounded-xl ${notification.type === 'job' ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                                        <Bell className={`h-6 w-6 ${notification.type === 'job' ? 'text-green-600' : 'text-blue-600'}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                {notification.title}
                                            </h3>
                                            <Badge variant={notification.type === 'job' ? 'default' : 'secondary'}>
                                                {notification.type === 'job' ? 'Job' : 'Exam'}
                                            </Badge>
                                            {isUrgent && (
                                                <Badge variant="destructive" className="animate-pulse">
                                                    Urgent
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground line-clamp-2 mb-3">
                                            {notification.description}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                <span>Last Date: {new Date(notification.lastDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            <div className={`flex items-center gap-1.5 ${isUrgent ? 'text-destructive' : 'text-muted-foreground'}`}>
                                                <Clock className="h-4 w-4" />
                                                <span className={isUrgent ? 'font-medium' : ''}>
                                                    {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Expired'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="shrink-0">
                                        <Button className="gap-2">
                                            Apply Now
                                            <ExternalLink className="h-4 w-4" />
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
