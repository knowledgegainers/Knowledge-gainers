import { getDashboardStats } from "@/app/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, GraduationCap, Bell, Newspaper, Activity, FileText } from "lucide-react";

export default async function AdminPage() {
    const stats = await getDashboardStats();

    const statCards = [
        {
            title: "Total Users",
            value: stats.users,
            icon: Users,
            description: "Registered users on the platform",
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "Books",
            value: stats.books,
            icon: BookOpen,
            description: "Available books in library",
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: "Exam Papers",
            value: stats.exams,
            icon: GraduationCap,
            description: "Past exam papers uploaded",
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            title: "Notifications",
            value: stats.notifications,
            icon: Bell,
            description: "Active alerts and updates",
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
        },
        {
            title: "Current Affairs",
            value: stats.currentAffairs,
            icon: Newspaper,
            description: "News and updates posts",
            color: "text-red-600",
            bgColor: "bg-red-100",
        },
        {
            title: "Blogs",
            value: stats.blogs,
            icon: FileText,
            description: "Published blog posts",
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}