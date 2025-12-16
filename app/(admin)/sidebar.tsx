
import Link from "next/link";
import {
    LayoutDashboard,
    BookOpen,
    FileText,
    Bell,
    Newspaper,
    Settings,
    LogOut,
    Library,
    User,
    Mail
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Book Categories",
        href: "/admin/categories",
        icon: Library,
    },
    {
        title: "Books",
        href: "/admin/books",
        icon: BookOpen,
    },
    {
        title: "Exam Types",
        href: "/admin/exam-types",
        icon: FileText,
    },
    {
        title: "Exam Papers",
        href: "/admin/exam-papers",
        icon: FileText,
    },
    {
        title: "Notification Types",
        href: "/admin/notification-types",
        icon: Bell,
    },
    {
        title: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
    },
    {
        title: "Current Affairs",
        href: "/admin/current-affairs",
        icon: Newspaper,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: User,
    },
    {
        title: "Contact",
        href: "/admin/contact",
        icon: Mail,
    }
];

export function SidebarContent() {
    return (
        <div className="flex h-full flex-col px-3 py-4">
            <div className="mb-10 flex items-center pl-2.5">
                <span className="self-center whitespace-nowrap text-xl font-semibold text-slate-800">
                    Admin Panel
                </span>
            </div>
            <ul className="space-y-2 font-medium">
                {sidebarItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className="group flex items-center rounded-lg p-2 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        >
                            <item.icon className="h-5 w-5 text-slate-500 transition-colors group-hover:text-blue-600" />
                            <span className="ml-3">{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="mt-auto">
                <Link href="/">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function AdminSidebar() {
    return (
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-slate-200 bg-white shadow-sm md:block">
            <SidebarContent />
        </aside>
    );
}