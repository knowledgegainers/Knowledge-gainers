"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

const monthlyDigests = [
    { month: "January 2024", downloadCount: 5600 },
    { month: "December 2023", downloadCount: 4800 },
    { month: "November 2023", downloadCount: 4200 },
    { month: "October 2023", downloadCount: 3900 },
];

export function CurrentAffairsDigests() {
    return (
        <section className="py-8 bg-card border-y border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Download className="h-5 w-5 text-primary" />
                        Monthly PDF Digests
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {monthlyDigests.map((digest, index) => (
                        <div
                            key={index}
                            className="group bg-background rounded-xl border border-border p-4 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-medium">{digest.month}</span>
                                <Badge variant="secondary" className="text-xs">
                                    {digest.downloadCount.toLocaleString()}
                                </Badge>
                            </div>
                            <Button variant="secondary" size="sm" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                                <Download className="h-4 w-4" />
                                Download PDF
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
