
import { UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
    return (
        <header className="fixed top-0 z-30 flex w-full items-center justify-between border-b bg-background px-6 py-3 pl-72">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                <UserButton afterSignOutUrl="/" />
            </div>
        </header>
    );
}