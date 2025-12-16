"use server";

import { db } from "@/db";
import { contacts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type ContactInput = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export async function submitContactForm(data: ContactInput) {
    try {
        await db.insert(contacts).values(data);
        revalidatePath("/admin/contact");
        return { success: true };
    } catch (error) {
        console.error("Failed to submit contact form:", error);
        return { success: false, error: "Failed to submit form" };
    }
}

export async function getContacts() {
    try {
        return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
    } catch (error) {
        console.error("Failed to fetch contacts:", error);
        return [];
    }
}
