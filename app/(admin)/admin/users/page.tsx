
import { clerkClient } from "@clerk/nextjs/server";
import { UsersClient } from "./client";

export default async function UsersPage() {
    const client = await clerkClient();
    const users = await client.users.getUserList();

    // Serializing data to pass to client component
    const formattedUsers = users.data.map((user) => ({
        id: user.id,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress || user.emailAddresses[0]?.emailAddress || "N/A",
        lastActiveAt: user.lastActiveAt ? new Date(user.lastActiveAt) : null,
        createdAt: new Date(user.createdAt),
    }));

    return <UsersClient initialUsers={formattedUsers} />;
}
