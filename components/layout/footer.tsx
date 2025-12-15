"use client";

import Link from "next/link";
import {
    GraduationCap,
    Send,
    MessageCircle,
    Facebook,
    Twitter,
    Youtube
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
    resources: [
        { label: "Books", href: "/books" },
        { label: "Exam Papers", href: "/exam-papers" },
        { label: "Notifications", href: "/notifications" },
        { label: "Current Affairs", href: "/current-affairs" },
    ],
    categories: [
        { label: "Job Books", href: "/books?category=job-books" },
        { label: "Engineering", href: "/books?category=engineering" },
        { label: "General Knowledge", href: "/books?category=gk" },
        { label: "Current Affairs", href: "/books?category=current-affairs" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-card border-t border-border">
            {/* Newsletter Section */}
            {/*
            <div className="border-b border-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-bold mb-2">
                            Stay Updated
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Get the latest exam notifications and study materials delivered to your inbox
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1"
                            />
                            <Button type="submit" className="gap-2">
                                <Send className="h-4 w-4" />
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            */}

            {/* Main Footer */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="gradient-hero p-2 rounded-xl">
                                <GraduationCap className="h-6 w-6 text-white " />
                            </div>
                            <span className="font-bold text-xl">
                                Knowledge Gainers
                            </span>
                        </Link>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            Your one-stop destination for educational resources, exam preparations,
                            and career guidance. Learn. Prepare. Succeed.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://wa.me/1234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="h-5 w-5" />
                            </a>
                            <a
                                href="https://t.me/knowledgegainers"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
                                aria-label="Telegram"
                            >
                                <Send className="h-5 w-5" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold mb-4">Categories</h4>
                        <ul className="space-y-3">
                            {footerLinks.categories.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Knowledge Gainers. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <Link href="/about" className="hover:text-primary transition-colors">
                                About
                            </Link>
                            <Link href="/contact" className="hover:text-primary transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
