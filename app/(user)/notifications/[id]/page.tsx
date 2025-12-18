import { getNotificationById } from "@/app/actions/notifications";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { ExternalLink, Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface NotificationPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function NotificationPage({ params }: NotificationPageProps) {
    const resolvedParams = await params;
    const notification = await getNotificationById(resolvedParams.id);

    if (!notification) {
        notFound();
    }

    const isExpired = notification.expiryDate ? new Date(notification.expiryDate) < new Date() : false;

    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <Link href="/notifications" className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Notifications
            </Link>

            <div className="max-w-4xl mx-auto">
                <div className="space-y-4 mb-8">
                    <div className="space-y-3">
                        <Badge variant="secondary" className="mb-2">
                            {notification.type.name}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">{notification.title}</h1>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Posted on {format(new Date(notification.createdAt), "MMMM d, yyyy")}</span>
                        </div>
                        {notification.expiryDate && (
                            <div className={`flex items-center gap-2 ${isExpired ? "text-destructive font-medium" : ""}`}>
                                <Tag className="h-4 w-4" />
                                <span>Expires: {format(new Date(notification.expiryDate), "MMMM d, yyyy")}</span>
                            </div>
                        )}
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="py-2">
                    <div
                        className="prose prose-blue max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:underline tiptap"
                        dangerouslySetInnerHTML={{ __html: notification.description }}
                    />
                </div>

                <Separator className="my-8" />

                <div className="flex justify-end pt-4 pb-12">
                    <Button
                        size="lg"
                        className="gap-2 min-w-[140px]"
                        disabled={isExpired}
                        asChild={!isExpired}
                    >
                        {isExpired ? (
                            "Expired"
                        ) : (
                            <a href={notification.applyLink || "#"} target="_blank" rel="noopener noreferrer">
                                Apply Now
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
