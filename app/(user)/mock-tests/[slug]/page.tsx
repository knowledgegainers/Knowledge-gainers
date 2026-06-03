import { db } from "@/db";
import { mockTests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, Target, Award, AlertTriangle, CheckCircle2, ChevronLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function MockTestPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const test = await db.query.mockTests.findFirst({
        where: eq(mockTests.slug, slug),
    });

    if (!test || !test.isActive) {
        notFound();
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-6 -ml-4">
                    <Link href="/mock-tests">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Mock Tests
                    </Link>
                </Button>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold mb-4">{test.title}</h1>
                            <p className="text-lg text-muted-foreground">
                                {test.description || "Evaluate your skills and preparation level with this comprehensive mock test."}
                            </p>
                        </div>

                        <Card className="border-primary/20 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center">
                                    <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600" />
                                    Exam Guidelines & Rules
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                        <span><strong>Full Screen Mode:</strong> The test must be taken in full-screen mode to minimize distractions.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                        <span><strong>Anti-Cheating Tracking:</strong> Tab switching, right-clicking, and text selection are restricted. You will receive a warning if you navigate away from the test tab.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                        <span><strong>Timer:</strong> A countdown timer is displayed at the top. The test will auto-submit when the time reaches zero.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                        <span><strong>Immediate Results:</strong> Upon submission, you can immediately review your score, correct answers, and detailed explanations.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                        <span><strong>Download Results:</strong> After completing the test, you can download a PDF copy of your results, including all questions and explanations.</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="shadow-lg border-t-4 border-t-primary">
                            <CardHeader>
                                <CardTitle>Test Summary</CardTitle>
                                <CardDescription>Key details about this exam</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                                        <Clock className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Duration</p>
                                        <p className="font-semibold text-lg">{test.duration} Minutes</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                                        <Target className="h-6 w-6 text-green-600 dark:text-green-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Questions</p>
                                        <p className="font-semibold text-lg">{test.totalQuestions} Questions</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4">
                                        <Award className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Difficulty</p>
                                        <p className="font-semibold text-lg capitalize">{test.difficulty}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button size="lg" className="w-full text-lg font-bold" asChild>
                                    <Link href={`/mock-tests/${test.slug}/take`}>
                                        Start Test Now
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
