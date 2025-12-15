
import { getNotifications, getNotificationTypes } from "@/app/actions/notifications";
import { NotificationsList } from "@/components/notifications/notifications-list";

interface NotificationsResultsProps {
    query: string;
    typeId: string;
}

export async function NotificationsResults({ query, typeId }: NotificationsResultsProps) {
    const types = await getNotificationTypes();
    const notifications = await getNotifications(query, typeId);

    return <NotificationsList notifications={notifications} types={types} selectedType={typeId} />;
}
