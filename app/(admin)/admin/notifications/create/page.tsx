import { db } from "@/db";
import { notificationTypes } from "@/db/schema";
import { NotificationForm } from "../notification-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NotificationCreatePage() {
    const types = await db.select().from(notificationTypes);

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-4">
                <Link href="/admin/notifications">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="space-y-0.5">
                    <h2 className="text-3xl font-bold tracking-tight">Create Notification</h2>
                    <p className="text-muted-foreground">
                        Add a new notification or alert.
                    </p>
                </div>
            </div>
            <div className="py-4">
                <NotificationForm types={types} />
            </div>
        </div>
    );
}
