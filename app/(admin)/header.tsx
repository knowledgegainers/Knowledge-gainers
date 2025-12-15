import { UserButton } from "@clerk/nextjs";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function AdminHeader() {
    return (
        <header className="fixed top-0 z-30 flex w-full items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-6 md:pl-72">
            <div className="flex items-center gap-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <VisuallyHidden.Root>
                            <SheetTitle>Admin Menu</SheetTitle>
                        </VisuallyHidden.Root>
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
                <h1 className="text-lg font-semibold text-slate-800">Dashboard</h1>
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