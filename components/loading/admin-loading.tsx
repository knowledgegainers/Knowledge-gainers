export function AdminLoading() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar Skeleton */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white shadow-sm">
                <div className="flex h-full flex-col px-3 py-4">
                    {/* Logo Skeleton */}
                    <div className="mb-10 flex items-center pl-2.5">
                        <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
                    </div>
                    {/* Menu Items Skeleton */}
                    <div className="space-y-2">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 rounded-lg p-2">
                                <div className="h-5 w-5 bg-slate-200 rounded animate-pulse" />
                                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Header Skeleton */}
            <header className="fixed top-0 z-30 flex w-full items-center justify-between border-b border-slate-200 bg-white px-6 py-3 pl-72">
                <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse" />
                    <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse" />
                </div>
            </header>

            {/* Main Content Skeleton */}
            <div className="p-4 sm:ml-64 pt-20">
                <div className="space-y-4">
                    {/* Title Skeleton */}
                    <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />

                    {/* Cards Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-4" />
                                <div className="h-4 w-full bg-slate-200 rounded animate-pulse mb-2" />
                                <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
