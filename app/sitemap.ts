import { MetadataRoute } from "next";
import { getBooks } from "./actions/books";
import { getPublishedBlogs } from "./actions/blogs";
import { getExamPapers } from "./actions/exam-papers";
import { getNotifications } from "./actions/notifications";
import { getCurrentAffairs } from "./actions/current-affairs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://knowledgegainers.in";

    // Static routes
    const staticRoutes = [
        "",
        "/about",
        "/contact",
        "/blogs",
        "/books",
        "/current-affairs",
        "/exam-papers",
        "/notifications",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic routes

    // Blogs
    const blogs = await getPublishedBlogs();
    const blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog.id}`,
        lastModified: new Date(blog.updatedAt || blog.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    // Books
    const books = await getBooks();
    const bookRoutes = books.map((book) => ({
        url: `${baseUrl}/books/${book.id}`,
        lastModified: new Date(book.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Exam Papers
    const examPapers = await getExamPapers();
    const examPaperRoutes = examPapers.map((paper) => ({
        url: `${baseUrl}/exam-papers/${paper.id}`,
        lastModified: new Date(paper.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Notifications
    const notifications = await getNotifications();
    const notificationRoutes = notifications.map((notification) => ({
        url: `${baseUrl}/notifications/${notification.id}`,
        lastModified: new Date(notification.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    // Current Affairs
    const currentAffairs = await getCurrentAffairs();
    const currentAffairRoutes = currentAffairs.map((item) => ({
        url: `${baseUrl}/current-affairs/${item.id}`,
        lastModified: new Date(item.date),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [
        ...staticRoutes,
        ...blogRoutes,
        ...bookRoutes,
        ...examPaperRoutes,
        ...notificationRoutes,
        ...currentAffairRoutes,
    ];
}
