import { TestTube, Clock, Target, Award, CheckCircle, Sparkles, BookOpen, Key, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/db";
import { mockTests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function MockTestsPage() {
    const activeTests = await db.query.mockTests.findMany({
        where: eq(mockTests.isActive, true),
        orderBy: (mockTests, { desc }) => [desc(mockTests.createdAt)],
    });

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <TestTube className="h-16 w-16 text-primary" />
                            <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Mock Tests
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Sharpen your knowledge with comprehensive mock tests designed to assess your preparation and track your progress.
                    </p>
                </div>

                {activeTests.length === 0 ? (
                    <Card className="mb-8 border-dashed border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-blue-50/50">
                        <CardHeader className="text-center pb-4">
                            <div className="flex justify-center mb-4">
                                <Clock className="h-12 w-12 text-primary animate-bounce" />
                            </div>
                            <CardTitle className="text-2xl text-primary">Coming Soon!</CardTitle>
                            <CardDescription className="text-lg">
                                We are currently preparing new mock tests for you. Check back later!
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {activeTests.map((test) => (
                            <Card key={test.id} className="hover:shadow-xl transition-all duration-300 flex flex-col group border-primary/10 hover:border-primary/30">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-medium px-2 py-1 bg-muted rounded-full text-muted-foreground flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {format(new Date(test.createdAt), "MMM d, yyyy")}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl line-clamp-1">{test.title}</CardTitle>
                                    <CardDescription className="line-clamp-2 mt-2">
                                        {test.description || "Take this mock test to evaluate your skills."}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                                        <div className="flex items-center text-muted-foreground bg-muted/50 p-2 rounded-md">
                                            <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                            <span className="font-semibold text-foreground mr-1">{test.duration}</span> mins
                                        </div>
                                        <div className="flex items-center text-muted-foreground bg-muted/50 p-2 rounded-md">
                                            <Target className="w-4 h-4 mr-2 text-green-500" />
                                            <span className="font-semibold text-foreground mr-1">{test.totalQuestions}</span> Qs
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between text-sm">
                                        <span className="flex items-center text-muted-foreground">
                                            <Award className="w-4 h-4 mr-1 text-purple-500" />
                                            Level:
                                        </span>
                                        <span className="font-medium px-2 py-0.5 rounded text-xs bg-primary/10 text-primary uppercase">
                                            {test.difficulty}
                                        </span>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-4 border-t">
                                    <Button asChild className="w-full group-hover:bg-primary">
                                        <Link href={`/mock-tests/${test.slug}`}>
                                            View Details
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}