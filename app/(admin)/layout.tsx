
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const { userId } = await auth();

    if (userId !== "user_36pbtzfIAPH0tcDf5fXjYEq1jKQ") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AdminSidebar />
            <AdminHeader />
            <div className="p-4 sm:ml-64 pt-20">
                {children}
            </div>
        </div>
    );
}