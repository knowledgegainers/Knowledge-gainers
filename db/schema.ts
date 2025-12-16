import { pgTable, text, timestamp, integer, pgEnum, uuid, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Book Categories table
export const bookCategories = pgTable("book_categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Exam Types table
export const examTypes = pgTable("exam_types", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Notification Types table
export const notificationTypes = pgTable("notification_types", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

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
    categoryId: uuid("category_id").notNull().references(() => bookCategories.id, { onDelete: "cascade" }),
    description: text("description"),
    fileUrl: text("file_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Exam Papers table
export const examPapers = pgTable("exam_papers", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    typeId: uuid("type_id").notNull().references(() => examTypes.id, { onDelete: "cascade" }),
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
    typeId: uuid("type_id").notNull().references(() => notificationTypes.id, { onDelete: "cascade" }),
    applyLink: text("apply_link"),
    expiryDate: timestamp("expiry_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Current Affairs table
export const currentAffairs = pgTable("current_affairs", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    category: text("category").notNull().default("General"), // Added category column with default
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

// Saved Exam Papers (junction table)
export const savedExamPapers = pgTable("saved_exam_papers", {
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    paperId: uuid("paper_id").notNull().references(() => examPapers.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.userId, table.paperId] }),
}));

// Contact Submissions table
export const contacts = pgTable("contacts", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    savedBooks: many(savedBooks),
    savedNotifications: many(savedNotifications),
    savedExamPapers: many(savedExamPapers),
}));

export const bookCategoriesRelations = relations(bookCategories, ({ many }) => ({
    books: many(books),
}));

export const booksRelations = relations(books, ({ one, many }) => ({
    category: one(bookCategories, {
        fields: [books.categoryId],
        references: [bookCategories.id],
    }),
    savedBy: many(savedBooks),
}));

export const examTypesRelations = relations(examTypes, ({ many }) => ({
    papers: many(examPapers),
}));

export const examPapersRelations = relations(examPapers, ({ one, many }) => ({
    type: one(examTypes, {
        fields: [examPapers.typeId],
        references: [examTypes.id],
    }),
    savedBy: many(savedExamPapers),
}));

export const notificationTypesRelations = relations(notificationTypes, ({ many }) => ({
    notifications: many(notifications),
}));

export const notificationsRelations = relations(notifications, ({ one, many }) => ({
    type: one(notificationTypes, {
        fields: [notifications.typeId],
        references: [notificationTypes.id],
    }),
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

export const savedExamPapersRelations = relations(savedExamPapers, ({ one }) => ({
    user: one(users, {
        fields: [savedExamPapers.userId],
        references: [users.id],
    }),
    paper: one(examPapers, {
        fields: [savedExamPapers.paperId],
        references: [examPapers.id],
    }),
}));
