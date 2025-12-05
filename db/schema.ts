import { pgTable, text, timestamp, integer, pgEnum, uuid, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const bookCategoryEnum = pgEnum("book_category", [
    "job_books",
    "current_affairs",
    "general_knowledge",
    "engineering",
    "history",
]);

export const examTypeEnum = pgEnum("exam_type", [
    "polycet",
    "tenth",
    "twelfth",
    "ecet",
    "eamcet",
    "job_exams",
]);

export const notificationTypeEnum = pgEnum("notification_type", [
    "exam",
    "job",
    "application",
    "requirement",
    "other",
]);

// Users table
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").notNull().unique(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Books table
export const books = pgTable("books", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    category: bookCategoryEnum("category").notNull(),
    description: text("description"),
    fileUrl: text("file_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Exam Papers table
export const examPapers = pgTable("exam_papers", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    examType: examTypeEnum("exam_type").notNull(),
    year: integer("year").notNull(),
    description: text("description"),
    fileUrl: text("file_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Notifications table
export const notifications = pgTable("notifications", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    type: notificationTypeEnum("type").notNull(),
    applyLink: text("apply_link"),
    expiryDate: timestamp("expiry_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Current Affairs table
export const currentAffairs = pgTable("current_affairs", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    imageUrl: text("image_url"),
    date: timestamp("date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Saved Books (junction table)
export const savedBooks = pgTable("saved_books", {
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    bookId: uuid("book_id").notNull().references(() => books.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.userId, table.bookId] }),
}));

// Saved Notifications (junction table)
export const savedNotifications = pgTable("saved_notifications", {
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    notificationId: uuid("notification_id").notNull().references(() => notifications.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.userId, table.notificationId] }),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    savedBooks: many(savedBooks),
    savedNotifications: many(savedNotifications),
}));

export const booksRelations = relations(books, ({ many }) => ({
    savedBy: many(savedBooks),
}));

export const notificationsRelations = relations(notifications, ({ many }) => ({
    savedBy: many(savedNotifications),
}));

export const savedBooksRelations = relations(savedBooks, ({ one }) => ({
    user: one(users, {
        fields: [savedBooks.userId],
        references: [users.id],
    }),
    book: one(books, {
        fields: [savedBooks.bookId],
        references: [books.id],
    }),
}));

export const savedNotificationsRelations = relations(savedNotifications, ({ one }) => ({
    user: one(users, {
        fields: [savedNotifications.userId],
        references: [users.id],
    }),
    notification: one(notifications, {
        fields: [savedNotifications.notificationId],
        references: [notifications.id],
    }),
}));
