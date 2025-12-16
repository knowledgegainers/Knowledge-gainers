import { getContacts } from "@/app/actions/contact";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactViewDialog } from "@/components/admin/contact-view-dialog";

export default async function AdminContactPage() {
    const contacts = await getContacts();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Contact Messages</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Messages ({contacts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead className="w-[80px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No messages found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                contacts.map((contact) => (
                                    <TableRow key={contact.id}>
                                        <TableCell className="whitespace-nowrap">
                                            {format(contact.createdAt, "MMM d, yyyy")}
                                            <br />
                                            <span className="text-xs text-muted-foreground">
                                                {format(contact.createdAt, "h:mm a")}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium">{contact.name}</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                        <TableCell>{contact.subject}</TableCell>
                                        <TableCell className="max-w-md">
                                            <p className="line-clamp-2" title={contact.message}>
                                                {contact.message}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <ContactViewDialog contact={contact} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}