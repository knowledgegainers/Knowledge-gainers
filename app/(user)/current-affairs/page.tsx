import { Suspense } from "react";
import { Newspaper, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrentAffairsFilters } from "@/components/current-affairs/current-affairs-filters";
import { CurrentAffairsDigests } from "@/components/current-affairs/current-affairs-digests";
import { CurrentAffairsResults } from "./results";
import { CurrentAffairsLoader } from "@/components/current-affairs/current-affairs-loader";

export default async function CurrentAffairsPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; month?: string }>;
}) {
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams.query || "";
    const month = resolvedSearchParams.month || "all";

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                <div className="absolute top-10 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Newspaper className="h-4 w-4" />
                            Stay Informed
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Current <span className="gradient-text">Affairs</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Daily and monthly current affairs updates to keep you prepared for competitive exams.
                            Comprehensive coverage of national and international events.
                        </p>
                    </div>
                </div>
            </section>

            {/* TODO: <CurrentAffairsDigests /> */}

            <CurrentAffairsFilters />

            <section className="py-8 lg:py-12">
                <Suspense key={`${query}-${month}`} fallback={<CurrentAffairsLoader />}>
                    <CurrentAffairsResults query={query} month={month} />
                </Suspense>
            </section>

            {/* GK Quiz Section */}
            {/* TODO: <CurrentAffairsQuiz />
                <section className="py-12 lg:py-16 bg-card">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <BookOpen className="h-4 w-4" />
                            Test Your Knowledge
                        </div>
                        <h2 className="text-3xl font-bold mb-4">
                            Daily <span className="gradient-text">GK Quiz</span>
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Practice with our daily general knowledge quizzes to test your preparation
                            and improve your scores in competitive exams.
                        </p>
                        <Button size="lg" className="gap-2">
                            Start Quiz
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>
            */}

        </div>
    );
}
