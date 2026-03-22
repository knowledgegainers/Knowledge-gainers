//coming soon
import { TestTube, Clock, Target, Award, CheckCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MockTestsPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-4xl mx-auto">
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

                {/* Coming Soon Card */}
                <Card className="mb-8 border-dashed border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-blue-50/50">
                    <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-4">
                            <Clock className="h-12 w-12 text-primary animate-bounce" />
                        </div>
                        <CardTitle className="text-2xl text-primary">Coming Soon!</CardTitle>
                        <CardDescription className="text-lg">
                            We're working hard to bring you the best mock testing experience. Stay tuned for weekly assessments that will help you excel in your exams.
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-3">
                                <Target className="h-8 w-8 text-green-600" />
                                <CardTitle className="text-lg">Comprehensive Coverage</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Tests covering all major topics and subjects to ensure thorough preparation.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-8 w-8 text-blue-600" />
                                <CardTitle className="text-lg">Instant Results</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Get immediate feedback with detailed explanations for each question.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-3">
                                <Award className="h-8 w-8 text-purple-600" />
                                <CardTitle className="text-lg">Performance Tracking</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Track your progress over time with detailed analytics and improvement insights.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Info */}
                <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">What to Expect</h3>
                            <p className="text-muted-foreground mb-4">
                                Our mock tests will include multiple-choice questions, time-bound assessments, and comprehensive result analysis to help you identify strengths and areas for improvement.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 text-sm">
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">Weekly Tests</span>
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">Timed Assessments</span>
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">Detailed Analytics</span>
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">Progress Tracking</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}