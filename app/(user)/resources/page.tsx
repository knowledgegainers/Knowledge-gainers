import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Bell, Newspaper, FileText } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      title: "Books",
      description: "Access a comprehensive collection of educational books and study materials.",
      icon: BookOpen,
      href: "/books",
      color: "text-blue-600",
    },
    {
      title: "Notifications",
      description: "Stay updated with important notifications, exam alerts, and announcements.",
      icon: Bell,
      href: "/notifications",
      color: "text-orange-600",
    },
    {
      title: "Current Affairs",
      description: "Read the latest current affairs articles and stay informed about recent events.",
      icon: Newspaper,
      href: "/current-affairs",
      color: "text-green-600",
    },
    {
      title: "Blogs",
      description: "Explore insightful blog posts, study tips, and educational content.",
      icon: FileText,
      href: "/blogs",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Resources Hub
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              All Your <span className="gradient-text">Resources</span> in One Place
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover books, notifications, current affairs, and blogs to enhance your knowledge and stay updated.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link key={resource.href} href={resource.href}>
                  <Card className="group h-full hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                    <CardHeader className="text-center pb-4">
                      <div className={`mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 ${resource.color}`} />
                      </div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground">{resource.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
