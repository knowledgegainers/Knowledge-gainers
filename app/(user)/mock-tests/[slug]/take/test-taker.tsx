"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle, Clock, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, Maximize, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { toast } from "sonner";

interface TestTakerProps {
    test: any;
    initialQuestions: any[];
}

export function TestTaker({ test, initialQuestions }: TestTakerProps) {
    const activeQuestions = initialQuestions.slice(0, test.totalQuestions || initialQuestions.length);
    const questionsCount = activeQuestions.length;

    const [isStarted, setIsStarted] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({}); // Maps question ID to selected answer index (as string)
    const [timeLeft, setTimeLeft] = useState(test.duration * 60);
    const [warnings, setWarnings] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Format time remaining
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Calculate score
    const calculateResults = () => {
        let correctCount = 0;
        let incorrectCount = 0;
        let marksObtained = 0;
        let totalPossibleMarks = 0;
        let attemptedCount = 0;

        activeQuestions.forEach((q) => {
            const marks = q.marks ?? 1;
            const negativeMarks = q.negativeMarks ?? 0;
            totalPossibleMarks += marks;

            const userAnswer = answers[q.id];
            if (userAnswer !== undefined) {
                attemptedCount++;
                if (userAnswer === q.correctAnswer.toString()) {
                    correctCount++;
                    marksObtained += marks;
                } else {
                    incorrectCount++;
                    marksObtained -= negativeMarks;
                }
            }
        });

        return {
            score: totalPossibleMarks > 0 ? Math.max(0, (marksObtained / totalPossibleMarks) * 100) : 0,
            marks: marksObtained,
            totalMarks: totalPossibleMarks,
            correct: correctCount,
            incorrect: incorrectCount,
            attempted: attemptedCount,
            skipped: questionsCount - attemptedCount,
        };
    };

    const submitTest = useCallback(() => {
        setIsCompleted(true);
        if (timerRef.current) clearInterval(timerRef.current);
        
        // Exit full screen if active
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.log("Failed to exit full screen:", err));
        }
    }, []);

    // Timer logic
    useEffect(() => {
        if (isStarted && !isCompleted && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        submitTest();
                        toast.info("Time is up! Your test has been submitted automatically.");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isStarted, isCompleted, timeLeft, submitTest]);

    // Anti-cheating: Tab visibility & blur
    useEffect(() => {
        const handleVisibilityChange = () => {
            if ((document.hidden || !document.hasFocus()) && isStarted && !isCompleted) {
                setWarnings((prev) => {
                    const newWarnings = prev + 1;
                    if (newWarnings >= 3) {
                        toast.error("Test Auto-Submitted due to multiple violations (tab switches/window changes).");
                        submitTest();
                    } else {
                        toast.warning(`Warning ${newWarnings}/3: Tab switching or leaving the window is strictly prohibited. Your test will be auto-submitted on the 3rd warning.`, {
                            duration: 5000,
                        });
                    }
                    return newWarnings;
                });
            }
        };

        const handleBlur = () => handleVisibilityChange();

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur); // To catch when they switch focus but don't hide the tab
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
        };
    }, [isStarted, isCompleted, submitTest]);

    // Start Test Handle
    const handleStartTest = async () => {
        try {
            if (containerRef.current) {
                await containerRef.current.requestFullscreen();
            }
        } catch (err) {
            console.log("Fullscreen request failed, proceeding anyway", err);
        }
        setIsStarted(true);
    };

    // Before starting
    if (!isStarted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center" ref={containerRef}>
                <Card className="max-w-md w-full border-primary/20 shadow-xl">
                    <CardHeader className="pb-4 border-b">
                        <CardTitle className="text-2xl">Ready to begin?</CardTitle>
                        <CardDescription>You are about to start the test: <br/> <strong className="text-foreground">{test.title}</strong></CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex justify-center mb-4">
                            <AlertCircle className="w-12 h-12 text-primary animate-pulse" />
                        </div>
                        <p className="text-sm text-muted-foreground text-left">
                            <strong>1. Full Screen:</strong> The test requires full screen mode. Do not exit until submitted.
                            <br/><strong>2. Do Not Stray:</strong> If you switch tabs or leave the window, you will receive a warning. 3 warnings trigger auto-submission.
                            <br/><strong>3. Format:</strong> {test.displayMode === "multiple" ? "All questions displayed." : "Questions appear one at a time."} {test.totalQuestions} Questions total.
                            <br/><strong>4. Timer:</strong> Ensure you have an uninterrupted {test.duration} minutes.
                        </p>
                        <Button className="w-full mt-6" size="lg" onClick={handleStartTest}>
                            <Maximize className="mr-2 w-4 h-4" /> Start Exam
                        </Button>
                        <Button className="w-full" variant="outline" asChild>
                            <Link href={`/mock-tests/${test.slug}`}>Cancel</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Results Dashboard
    if (isCompleted) {
        const results = calculateResults();
        
        return (
            <div className="container mx-auto py-12 px-4 max-w-4xl space-y-8">
                <div className="text-center">
                    <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Test Submitted Successfully</h1>
                    <p className="text-muted-foreground">Here is a detailed review of your performance.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-primary/5 border-primary/20 flex flex-col items-center justify-center p-4 text-center">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Score</p>
                        <p className="text-3xl font-bold text-primary">{results.score.toFixed(1)}%</p>
                    </Card>
                    <Card className="flex flex-col items-center justify-center p-4 text-center shadow-sm">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Marks Obtained</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{results.marks.toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">out of {results.totalMarks}</p>
                    </Card>
                    <Card className="flex flex-col items-center justify-center p-4 text-center shadow-sm">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Attempted</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{results.attempted}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">out of {questionsCount}</p>
                    </Card>
                    <Card className="flex flex-col items-center justify-center p-4 text-center shadow-sm">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Skipped / Wrong</p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">{results.skipped} / {results.incorrect}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Questions</p>
                    </Card>
                </div>

                <div className="mt-12 space-y-8">
                    <h2 className="text-2xl font-bold border-b pb-2">Detailed Review</h2>
                    {activeQuestions.map((q, idx) => {
                        const userAnswer = answers[q.id];
                        const isSkipped = userAnswer === undefined;
                        const isUserCorrect = !isSkipped && userAnswer === q.correctAnswer.toString();

                        return (
                            <Card key={q.id} className={isUserCorrect ? "border-l-4 border-l-green-500" : isSkipped ? "border-l-4 border-l-yellow-500" : "border-l-4 border-l-red-500"}>
                                <CardHeader className="bg-muted/40 pb-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <CardTitle className="text-lg leading-relaxed">
                                            <span className="text-muted-foreground font-medium mr-2">Q{idx + 1}.</span>
                                            {q.question}
                                        </CardTitle>
                                        <div className="shrink-0 pt-1">
                                            {isUserCorrect ? (
                                                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-semibold rounded-full flex items-center">
                                                    <CheckCircle2 className="w-3 h-3 mr-1" /> Correct (+{q.marks || 1})
                                                </span>
                                            ) : isSkipped ? (
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-semibold rounded-full flex items-center">
                                                    <AlertTriangle className="w-3 h-3 mr-1" /> Skipped
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-semibold rounded-full flex items-center">
                                                    <XCircle className="w-3 h-3 mr-1" /> Incorrect (-{q.negativeMarks || 0})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    {q.imageUrl && (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div className="mb-4 rounded-lg overflow-hidden border max-w-sm cursor-pointer hover:opacity-80 transition-opacity">
                                                    <img src={q.imageUrl} alt="Question Reference" className="max-h-60 object-contain w-full" />
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl p-1 bg-transparent border-none shadow-none flex justify-center">
                                                <DialogTitle className="sr-only">Image Preview</DialogTitle>
                                                <img src={q.imageUrl} alt="Question Reference enlarged" className="max-h-[90vh] object-contain rounded-md" />
                                            </DialogContent>
                                        </Dialog>
                                    )}

                                    <div className="grid gap-3">
                                        {q.options.map((option: string, optIdx: number) => {
                                            const isThisCorrect = q.correctAnswer === optIdx;
                                            const didUserPickThis = userAnswer === optIdx.toString();
                                            
                                            // Requirements: "Wrong answers: Should not be shown in final result analysis" -> we conceal the right answer if they got it wrong.
                                            const revealCorrect = isUserCorrect;

                                            let badgeClasses = "bg-muted text-foreground border";
                                            if (revealCorrect && isThisCorrect) badgeClasses = "bg-green-100/50 border-green-500/50 text-green-900 dark:text-green-100";
                                            else if (didUserPickThis && !isThisCorrect) badgeClasses = "bg-red-100/50 border-red-500/50 text-red-900 dark:text-red-100";

                                            return (
                                                <div key={optIdx} className={`p-3 rounded-lg flex items-center ${badgeClasses}`}>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold shrink-0
                                                        ${revealCorrect && isThisCorrect ? 'bg-green-500 text-white' : didUserPickThis ? 'bg-red-500 text-white' : 'bg-background border text-foreground'}
                                                    `}>
                                                        {String.fromCharCode(65 + optIdx)}
                                                    </div>
                                                    <span>{option}</span>
                                                    {didUserPickThis && <span className="ml-auto text-xs font-medium italic opacity-70">(Your Answer)</span>}
                                                    {revealCorrect && isThisCorrect && !didUserPickThis && <span className="ml-auto text-xs font-medium italic text-green-600 dark:text-green-400 opacity-80">(Correct Answer)</span>}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {q.explanation && isUserCorrect && (
                                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900">
                                            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1.5" /> Explanation
                                            </p>
                                            <p className="text-sm text-blue-900/80 dark:text-blue-200/80 leading-relaxed">
                                                {q.explanation}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
                
                <div className="flex justify-center pt-8 pb-16">
                    <Button asChild size="lg">
                        <Link href="/mock-tests">Return to Mock Tests</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const currentQuestion = activeQuestions[currentQuestionIndex];

    const OptionsList = ({ q }: { q: any }) => (
        <RadioGroup 
            value={answers[q.id] || ""}
            onValueChange={(val) => setAnswers(prev => ({...prev, [q.id]: val}))}
            className="space-y-4"
        >
            {q.options.map((option: string, idx: number) => (
                <div key={idx} className="flex">
                    <Label 
                        htmlFor={`q${q.id}-opt${idx}`} 
                        className={`flex-1 flex items-center p-4 border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors
                            ${answers[q.id] === idx.toString() ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-input'}
                        `}
                    >
                        <RadioGroupItem 
                            value={idx.toString()} 
                            id={`q${q.id}-opt${idx}`} 
                            className="sr-only" 
                        />
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-4 text-sm font-bold border shrink-0 transition-colors
                            ${answers[q.id] === idx.toString() ? 'bg-primary text-primary-foreground border-primary' : 'text-muted-foreground border-input'}
                        `}>
                            {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-base font-normal">{option}</span>
                    </Label>
                </div>
            ))}
        </RadioGroup>
    );

    return (
        <div 
            className="flex flex-col min-h-screen bg-background select-none" 
            ref={containerRef}
            // Anti-cheating handlers
            onContextMenu={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
        >
            {/* Header Toolbar */}
            <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm flex items-center justify-between px-4 py-3 shrink-0">
                <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 text-primary font-bold px-3 py-1.5 rounded-md truncate max-w-[200px] md:max-w-md text-sm">
                        {test.title}
                    </div>
                </div>
                
                <div className="flex items-center space-x-6">
                    {test.displayMode === "single" && (
                        <div className="hidden md:flex items-center text-sm font-medium">
                            Progress: <span className="ml-2 w-32"><Progress value={((currentQuestionIndex + 1) / questionsCount) * 100} className="h-2" /></span>
                            <span className="ml-2 text-muted-foreground">{currentQuestionIndex + 1}/{questionsCount}</span>
                        </div>
                    )}

                    <div className={`flex items-center px-4 py-1.5 rounded-full font-mono text-lg font-bold
                        ${timeLeft < 300 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-muted text-foreground'}
                    `}>
                        <Clock className="w-4 h-4 mr-2 hidden sm:block" />
                        {formatTime(timeLeft)}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden flex flex-col md:flex-row relative">
                
                {/* Question Section */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 pb-24 scroll-smooth" id="questions-container">
                    <div className="max-w-3xl mx-auto space-y-12">
                        {test.displayMode === "multiple" ? (
                            activeQuestions.map((q, idx) => (
                                <div key={q.id} id={`question-${idx}`} className="scroll-mt-24 p-6 bg-card border rounded-xl shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                                            Question {idx + 1}
                                        </div>
                                        {(q.marks || q.negativeMarks) && (
                                            <div className="text-xs font-medium bg-muted px-2 py-1 rounded border">
                                                +{q.marks || 1} / -{q.negativeMarks || 0}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <h2 className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                                        {q.question}
                                    </h2>

                                    {q.imageUrl && (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div className="mb-6 rounded-lg overflow-hidden border max-w-md cursor-pointer hover:opacity-80 transition-opacity">
                                                    <img src={q.imageUrl} alt="Question Reference" className="max-h-80 object-contain w-full" />
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-5xl p-1 bg-transparent border-none shadow-none flex justify-center">
                                                <DialogTitle className="sr-only">Image Preview</DialogTitle>
                                                <img src={q.imageUrl} alt="Question Reference enlarged" className="max-h-[90vh] object-contain rounded-md" />
                                            </DialogContent>
                                        </Dialog>
                                    )}

                                    <OptionsList q={q} />
                                </div>
                            ))
                        ) : (
                            <div id={`question-${currentQuestionIndex}`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold flex items-center">
                                        Question {currentQuestionIndex + 1} of {questionsCount}
                                    </div>
                                    {(currentQuestion.marks || currentQuestion.negativeMarks > 0) && (
                                        <div className="text-xs font-medium bg-muted px-2 py-1 rounded border">
                                            +{currentQuestion.marks || 1} / -{currentQuestion.negativeMarks || 0}
                                        </div>
                                    )}
                                </div>
                                
                                <h2 className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                                    {currentQuestion.question}
                                </h2>

                                {currentQuestion.imageUrl && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="mb-6 rounded-lg overflow-hidden border max-w-md cursor-pointer hover:opacity-80 transition-opacity">
                                                <img src={currentQuestion.imageUrl} alt="Question Reference" className="max-h-80 object-contain w-full" />
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-5xl p-1 bg-transparent border-none shadow-none flex justify-center">
                                            <DialogTitle className="sr-only">Image Preview</DialogTitle>
                                            <img src={currentQuestion.imageUrl} alt="Question Reference enlarged" className="max-h-[90vh] object-contain rounded-md" />
                                        </DialogContent>
                                    </Dialog>
                                )}
                                <OptionsList q={currentQuestion} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <aside className="w-full md:w-80 border-l bg-muted/20 flex flex-col shrink-0 h-48 md:h-auto border-t md:border-t-0 p-4">
                    <h3 className="font-semibold mb-4 hidden md:block">Question Navigator</h3>
                    <div className="grid grid-cols-5 md:grid-cols-4 gap-2 overflow-y-auto pr-2 pb-4 flex-1 content-start">
                        {activeQuestions.map((q, idx) => {
                            const isAnswered = answers[q.id] !== undefined;
                            const isCurrent = idx === currentQuestionIndex && test.displayMode === "single";
                            return (
                                <button
                                    key={q.id}
                                    onClick={() => {
                                        setCurrentQuestionIndex(idx);
                                        if (test.displayMode === "multiple") {
                                            document.getElementById(`question-${idx}`)?.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className={`
                                        h-10 w-full flex items-center justify-center rounded-md font-medium text-sm transition-all
                                        ${isCurrent ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                                        ${isAnswered 
                                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                                            : 'bg-background border hover:bg-muted text-muted-foreground'}
                                    `}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                    
                    <div className="hidden md:block pt-4 border-t mt-auto">
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <span className="w-3 h-3 rounded-full bg-primary mr-2"></span> Answered
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                            <span className="w-3 h-3 rounded-full bg-background border mr-2"></span> Unanswered (Skipped)
                        </div>
                        <Button 
                            variant="destructive" 
                            className="w-full font-bold" 
                            onClick={() => {
                                if(confirm("Are you sure you want to completely finish and submit the test? You cannot return.")) {
                                    submitTest();
                                }
                            }}
                        >
                            Submit Test
                        </Button>
                    </div>
                </aside>

            </main>

            {/* Bottom Actions Bar (Mobile + Next/Prev only in single mode) */}
            <footer className="sticky bottom-0 z-10 bg-background border-t p-4 flex items-center justify-between shadow-md shrink-0">
                {test.displayMode === "single" ? (
                    <>
                        <Button 
                            variant="outline" 
                            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestionIndex === 0}
                            className="w-24 md:w-32"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                        </Button>

                        <div className="md:hidden">
                            <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => {
                                    if(confirm("Are you sure you want to finish and submit the test?")) submitTest();
                                }}
                            >
                                Submit
                            </Button>
                        </div>

                        <Button 
                            onClick={() => setCurrentQuestionIndex(prev => Math.min(questionsCount - 1, prev + 1))}
                            disabled={currentQuestionIndex === questionsCount - 1}
                            className="w-24 md:w-32"
                        >
                            Next <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </>
                ) : (
                    <div className="w-full flex justify-end md:hidden">
                        <Button 
                            variant="destructive" 
                            className="w-full"
                            onClick={() => {
                                if(confirm("Are you sure you want to finish and submit the test?")) submitTest();
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                )}
            </footer>

        </div>
    );
}
