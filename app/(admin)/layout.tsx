
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Suspense } from "react";
import { AdminLoading } from "@/components/loading/admin-loading";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const { userId } = await auth();
    console.log("Admin Check:", { current: userId, expected: process.env.NEXT_PUBLIC_ADMIN_USER_ID });

    // Check both server and public env vars just in case
    const adminId = process.env.ADMIN_USER_ID || process.env.NEXT_PUBLIC_ADMIN_USER_ID;

    if (userId !== adminId) {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <AdminSidebar />
            <AdminHeader />
            <div className="p-4 pt-20 md:ml-64">
                <Suspense fallback={<AdminLoading />}>
                    {children}
                </Suspense>
            </div>
        </div>
    );
}