"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

export const WhatsAppButton = () => {
    return (
        <Link
            href="https://chat.whatsapp.com/CHgxHUw1xPuHwnhuqJk5fe"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl dark:bg-[#25D366] dark:text-white"
            aria-label="Join WhatsApp Group"
        >
            <MessageCircle className="h-8 w-8" />
        </Link>
    );
};
