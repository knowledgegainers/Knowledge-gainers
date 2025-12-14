
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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