import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Bell,
  Newspaper,
  GraduationCap,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import { LatestBooksSection } from "@/components/home/latest-books-section";
import { LatestExamPapersSection } from "@/components/home/latest-exam-papers-section";
import { LatestNotificationsSection } from "@/components/home/latest-notifications-section";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Books",
    description: "Access a vast collection of books covering job preparation, engineering, and general knowledge.",
    href: "/books",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: FileText,
    title: "Exam Papers",
    description: "Download previous year question papers for POLYCET, EAMCET, ECET, and various competitive exams.",
    href: "/exam-papers",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Bell,
    title: "Latest Notifications",
    description: "Stay updated with exam dates, job openings, and application deadlines.",
    href: "/notifications",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    icon: Newspaper,
    title: "Current Affairs",
    description: "Daily updates on current events and GK to keep you ahead in competitive exams.",
    href: "/current-affairs",
    color: "bg-purple-500/10 text-purple-500",
  },
];

const stats = [
  { icon: BookOpen, label: "Books", value: "500+" },
  { icon: FileText, label: "Exam Papers", value: "200+" },
  { icon: Users, label: "Students", value: "10K+" },
  { icon: Award, label: "Success Rate", value: "95%" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 mb-6">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm font-medium">Your Path to Success</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Learn. Prepare.{" "}
              <span className="gradient-text">Succeed.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access comprehensive study materials, exam papers, and stay updated with the latest notifications
              for your competitive exams and career growth.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/books">
                <Button size="lg" variant="default" className="gap-2 text-base">
                  Explore Resources
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Books Section */}
      <LatestBooksSection />

      {/* Latest Exam Papers Section */}
      <LatestExamPapersSection />

      {/* Latest Notifications Section */}
      <LatestNotificationsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Learning Journey Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students who are preparing smarter and achieving their dreams
            </p>
            <Link href="/books">
              <Button size="lg" className="gap-2">
                Get Started for Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
