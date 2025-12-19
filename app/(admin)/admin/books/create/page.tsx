
import { db } from "@/db";
import { bookCategories } from "@/db/schema";
import { BookForm } from "../book-form";

export default async function CreateBookPage() {
    const categories = await db.select().from(bookCategories);
    return (
        <div className="flex-1 space-y-4 p-4 pt-0">
            <div className="py-4">
                <BookForm categories={categories} />
            </div>
        </div>
    );
}
