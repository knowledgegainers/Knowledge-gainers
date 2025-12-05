"use client";

import { useState } from "react";
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

const filterOptions = [
    { id: "all", label: "All", icon: Bell },
    { id: "job", label: "Jobs", icon: Briefcase },
    { id: "exam", label: "Exams", icon: GraduationCap },
];

// Mock data
const notifications = [
    {
        id: 1,
        title: "SSC CGL 2024 Notification Released",
        description: "Staff Selection Commission has released the notification for Combined Graduate Level Examination 2024. Applications are now open for various Group B and Group C posts.",
        type: "job",
        lastDate: "2024-12-15",
        applyLink: "#",
        postedDate: "2024-11-15",
    },
    {
        id: 2,
        title: "EAMCET 2024 Registration Open",
        description: "AP EAMCET 2024 online application process has started. Eligible candidates can apply through the official website. Last date to apply with late fee is approaching.",
        type: "exam",
        lastDate: "2024-12-28",
        applyLink: "#",
        postedDate: "2024-11-10",
    },
    {
        id: 3,
        title: "Railway NTPC Recruitment 2024",
        description: "RRB has announced recruitment for Non-Technical Popular Categories with over 10,000 vacancies across various zones. Graduates can apply for multiple posts.",
        type: "job",
        lastDate: "2024-12-20",
        applyLink: "#",
        postedDate: "2024-11-20",
    },
    {
        id: 4,
        title: "JEE Main 2025 Session 1",
        description: "NTA has released the notification for JEE Main 2025 Session 1. Check eligibility criteria, exam pattern, and important dates for engineering aspirants.",
        type: "exam",
        lastDate: "2025-01-10",
        applyLink: "#",
        postedDate: "2024-12-01",
    },
    {
        id: 5,
        title: "IBPS PO Recruitment 2024",
        description: "Institute of Banking Personnel Selection has announced recruitment for Probationary Officers. Over 4,000 vacancies in various public sector banks.",
        type: "job",
        lastDate: "2024-12-25",
        applyLink: "#",
        postedDate: "2024-11-25",
    },
    {
        id: 6,
        title: "GATE 2025 Registration Started",
        description: "IIT Roorkee has opened GATE 2025 registration. Candidates can apply for various engineering and science disciplines. Early bird discount available.",
        type: "exam",
        lastDate: "2025-01-15",
        applyLink: "#",
        postedDate: "2024-12-05",
    },
    {
        id: 7,
        title: "UPSC Civil Services 2025",
        description: "Union Public Service Commission has released the notification for Civil Services Examination 2025. Approximately 1,000+ vacancies for IAS, IPS, and other services.",
        type: "job",
        lastDate: "2024-12-05",
        applyLink: "#",
        postedDate: "2024-11-14",
    },
    {
        id: 8,
        title: "NEET UG 2025 Registration",
        description: "NTA has opened registration for NEET UG 2025. Medical aspirants can apply for admission to MBBS, BDS, and other medical courses across India.",
        type: "exam",
        lastDate: "2024-12-10",
        applyLink: "#",
        postedDate: "2024-11-09",
    },
];

function getDaysRemaining(dateString: string): number {
    const lastDate = new Date(dateString);
    const today = new Date();
    const diffTime = lastDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

export default function NotificationsPage() {
    const [selectedType, setSelectedType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredNotifications = notifications.filter((notification) => {
        const matchesType = selectedType === "all" || notification.type === selectedType;
        const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Bell className="h-4 w-4" />
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
                        <div className="flex items-center gap-2">
                            {filterOptions.map((option) => (
                                <Button
                                    key={option.id}
                                    variant={selectedType === option.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedType(option.id)}
                                    className="gap-2"
                                >
                                    <option.icon className="h-4 w-4" />
                                    {option.label}
                                </Button>
                            ))}
                        </div>

                        {/* Search & Add */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search notifications..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button className="gap-2 hidden sm:flex">
                                <Plus className="h-4 w-4" />
                                Add Notification
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Notifications List */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Count */}
                    <p className="text-sm text-muted-foreground mb-6">
                        Showing {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'}
                        {selectedType !== "all" && ` for ${selectedType === 'job' ? 'Jobs' : 'Exams'}`}
                    </p>

                    {/* List */}
                    <div className="space-y-4">
                        {filteredNotifications.map((notification, index) => {
                            const daysRemaining = getDaysRemaining(notification.lastDate);
                            const isUrgent = daysRemaining > 0 && daysRemaining <= 7;
                            const isExpired = daysRemaining <= 0;

                            return (
                                <div
                                    key={notification.id}
                                    className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                                        {/* Icon */}
                                        <div className={`shrink-0 p-4 rounded-xl ${notification.type === 'job' ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                                            {notification.type === 'job' ? (
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
                                                <Badge variant={notification.type === 'job' ? 'default' : 'secondary'}>
                                                    {notification.type === 'job' ? 'Job' : 'Exam'}
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
                                                    <span>Posted: {formatDate(notification.postedDate)}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>Last Date: {formatDate(notification.lastDate)}</span>
                                                </div>
                                                <div className={`flex items-center gap-1.5 ${isUrgent ? 'text-destructive' : isExpired ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                                                    <Clock className="h-4 w-4" />
                                                    <span className={isUrgent ? 'font-medium' : ''}>
                                                        {isExpired ? 'Expired' : `${daysRemaining} days remaining`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="shrink-0">
                                            <Button
                                                className="gap-2"
                                                disabled={isExpired}
                                                variant={isExpired ? "outline" : "default"}
                                            >
                                                {isExpired ? 'Closed' : 'Apply Now'}
                                                {!isExpired && <ExternalLink className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {filteredNotifications.length === 0 && (
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
