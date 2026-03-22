import { pgTable, text, timestamp, integer, pgEnum, uuid, primaryKey, boolean, uniqueIndex } from "drizzle-orm/pg-core";
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
    slug: text("slug").unique(),
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
    slug: text("slug").unique(),
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
    slug: text("slug").unique(),
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
    slug: text("slug").unique(),
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

// Blogs table
export const blogs = pgTable("blogs", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content"),
    excerpt: text("excerpt"),
    imageUrl: text("image_url"),
    isPublished: boolean("is_published").default(false).notNull(),
    publishedAt: timestamp("published_at"),
    category: text("category").notNull().default("General"),
    author: text("author"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Mock Tests table
export const mockTests = pgTable("mock_tests", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    duration: integer("duration").notNull(), // in minutes
    totalQuestions: integer("total_questions").notNull(),
    difficulty: text("difficulty").notNull().default("Medium"),
    isActive: boolean("is_active").default(false).notNull(),
    scheduledDate: timestamp("scheduled_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Mock Test Questions table
export const mockTestQuestions = pgTable("mock_test_questions", {
    id: uuid("id").primaryKey().defaultRandom(),
    testId: uuid("test_id").notNull().references(() => mockTests.id, { onDelete: "cascade" }),
    question: text("question").notNull(),
    options: text("options").array().notNull(), // array of 4 options
    correctAnswer: integer("correct_answer").notNull(), // index of correct answer (0-3)
    explanation: text("explanation"),
    order: integer("order").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Mock Test Attempts table
export const mockTestAttempts = pgTable("mock_test_attempts", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    testId: uuid("test_id").notNull().references(() => mockTests.id, { onDelete: "cascade" }),
    score: integer("score"), // percentage
    totalCorrect: integer("total_correct"),
    totalAttempted: integer("total_attempted"),
    timeTaken: integer("time_taken"), // in seconds
    completedAt: timestamp("completed_at"),
    startedAt: timestamp("started_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
    uniqueAttempt: uniqueIndex("unique_user_test_attempt").on(table.userId, table.testId),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    savedBooks: many(savedBooks),
    savedNotifications: many(savedNotifications),
    savedExamPapers: many(savedExamPapers),
    mockTestAttempts: many(mockTestAttempts),
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

// Mock Tests Relations
export const mockTestsRelations = relations(mockTests, ({ many }) => ({
    attempts: many(mockTestAttempts),
    questions: many(mockTestQuestions),
}));

export const mockTestQuestionsRelations = relations(mockTestQuestions, ({ one }) => ({
    test: one(mockTests, {
        fields: [mockTestQuestions.testId],
        references: [mockTests.id],
    }),
}));

export const mockTestAttemptsRelations = relations(mockTestAttempts, ({ one }) => ({
    user: one(users, {
        fields: [mockTestAttempts.userId],
        references: [users.id],
    }),
    test: one(mockTests, {
        fields: [mockTestAttempts.testId],
        references: [mockTests.id],
    }),
}));
