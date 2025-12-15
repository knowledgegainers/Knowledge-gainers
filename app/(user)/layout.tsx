
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { Suspense } from "react";
import { UserLoading } from "@/components/loading/user-loading";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <Suspense fallback={<UserLoading />}>
                    {children}
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}