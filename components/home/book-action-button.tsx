"use client";

import { Button } from "@/components/ui/button";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Eye, User } from "lucide-react";
import Link from "next/link";

interface BookActionButtonProps {
    bookId: string;
}

export function BookActionButton({ bookId }: BookActionButtonProps) {
    const { userId, isLoaded } = useAuth();

    if (!isLoaded) {
        return (
            <Button variant="secondary" size="sm" className="w-full gap-2 opacity-50 font-mono text-xs" disabled>
                Loading...
            </Button>
        );
    }

    if (userId) {
        return (
            <Button className="w-full gap-2" asChild>
                <Link href={`/books/${bookId}`}>
                    View
                </Link>
            </Button>
        );
    }

    return (
        <SignInButton mode="modal">
            <Button>
                <User className="h-4 w-4" />
                Sign in to view
            </Button>
        </SignInButton>
    );
}
