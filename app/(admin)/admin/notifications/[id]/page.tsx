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
        <div className="flex-1 space-y-4 p-4 pt-0">
            <div className="py-4">
                <NotificationForm initialData={notification} types={types} />
            </div>
        </div>
    );
}
