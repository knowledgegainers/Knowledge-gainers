export function UserLoading() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Navbar Skeleton */}
            <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo Skeleton */}
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 bg-slate-200 rounded-xl animate-pulse" />
                            <div className="h-6 w-40 bg-slate-200 rounded animate-pulse" />
                        </div>

                        {/* Nav Links Skeleton (Desktop) */}
                        <div className="hidden lg:flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-8 w-20 bg-slate-200 rounded-lg animate-pulse" />
                            ))}
                        </div>

                        {/* Auth Buttons Skeleton */}
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
                            <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse" />
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content Skeleton */}
            <main className="flex-1 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-6">
                        {/* Hero/Header Skeleton */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-8">
                            <div className="h-10 w-64 bg-slate-200 rounded animate-pulse mb-4" />
                            <div className="h-6 w-full bg-slate-200 rounded animate-pulse mb-2" />
                            <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse" />
                        </div>

                        {/* Grid Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                    {/* Image Skeleton */}
                                    <div className="aspect-[4/3] bg-slate-200 animate-pulse" />
                                    {/* Content Skeleton */}
                                    <div className="p-5 space-y-3">
                                        <div className="h-6 w-full bg-slate-200 rounded animate-pulse" />
                                        <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                                        <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
                                        <div className="h-10 w-full bg-slate-200 rounded animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Skeleton */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="h-6 w-48 bg-slate-200 rounded animate-pulse mx-auto" />
                </div>
            </footer>
        </div>
    );
}
