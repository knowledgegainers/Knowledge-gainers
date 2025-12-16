"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Mail, User, Calendar, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface ContactViewDialogProps {
    contact: {
        id: string;
        name: string;
        email: string;
        subject: string;
        message: string;
        createdAt: Date;
    };
}

export function ContactViewDialog({ contact }: ContactViewDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">View Details</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Message Details</DialogTitle>
                    <DialogDescription>
                        Received on {format(contact.createdAt, "PPP 'at' p")}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <User className="h-4 w-4" />
                                Sender
                            </div>
                            <p className="text-sm font-medium pl-6">{contact.name}</p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                Email
                            </div>
                            <p className="text-sm font-medium pl-6">{contact.email}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            Subject
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg text-sm font-medium">
                            {contact.subject}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Message Content</div>
                        <div className="p-4 bg-muted/30 border rounded-lg text-sm whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
                            {contact.message}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
