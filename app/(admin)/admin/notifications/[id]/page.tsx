import { db } from "@/db";
import { notificationTypes, notifications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { NotificationForm } from "../notification-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NotificationEditPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function NotificationEditPage({ params }: NotificationEditPageProps) {
    const resolvedParams = await params;
    const notification = await db.query.notifications.findFirst({
        where: eq(notifications.id, resolvedParams.id),
    });

    if (!notification) {
        notFound();
    }

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
                    <h2 className="text-3xl font-bold tracking-tight">Edit Notification</h2>
                    <p className="text-muted-foreground">
                        Edit notification details and settings.
                    </p>
                </div>
            </div>
            <div className="py-4">
                <NotificationForm initialData={notification} types={types} />
            </div>
        </div>
    );
}
