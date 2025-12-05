"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
    BookOpen,
    FileText,
    Bell,
    Newspaper,
    Menu,
    X,
    GraduationCap,
    User,
    LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home", icon: null },
    { href: "/books", label: "Books", icon: BookOpen },
    { href: "/exam-papers", label: "Exam Papers", icon: FileText },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/current-affairs", label: "Current Affairs", icon: Newspaper },
    { href: "/about", label: "About", icon: null },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 gradient-hero rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative gradient-hero p-2 rounded-xl">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <span className="font-bold text-xl gradient-text">
                            Knowledge Gainers
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    pathname === link.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <LogIn className="h-4 w-4" />
                                    Sign In
                                </Button>
                            </SignInButton>
                            <SignInButton mode="modal">
                                <Button size="sm" className="gap-2">
                                    <User className="h-4 w-4" />
                                    Get Started
                                </Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">
                                    Dashboard
                                </Button>
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-black  "
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6  text-black" />
                        ) : (
                            <Menu className="h-6 w-6 text-black" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                        pathname === link.href
                                            ? "bg-primary/10 text-black"
                                            : "text-black hover:text-black hover:bg-accent"
                                    )}
                                >
                                    {link.icon && <link.icon className="h-4 w-4" />}
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-2">
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <Button variant="outline" className="w-full gap-2">
                                            <LogIn className="h-4 w-4" />
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                    <SignInButton mode="modal">
                                        <Button className="w-full gap-2">
                                            <User className="h-4 w-4" />
                                            Get Started
                                        </Button>
                                    </SignInButton>
                                </SignedOut>
                                <SignedIn>
                                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <div className="flex justify-center pt-2">
                                        <UserButton afterSignOutUrl="/" />
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
