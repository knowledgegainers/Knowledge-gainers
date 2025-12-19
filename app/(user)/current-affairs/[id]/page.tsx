import { getCurrentAffairById } from "@/app/actions/current-affairs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";

interface CurrentAffairPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CurrentAffairPage({ params }: CurrentAffairPageProps) {
    const resolvedParams = await params;
    const item = await getCurrentAffairById(resolvedParams.id);

    if (!item) {
        notFound();
    }

    return (
        <div className="container mx-auto p-4">
            <Link href="/current-affairs" className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Current Affairs
            </Link>

            <div className="max-w-4xl mx-auto">
                {item.imageUrl && (
                    <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden shadow-md">
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="space-y-4 mb-8">
                    <div className="space-y-3">
                        <Badge variant="secondary" className="mb-2">
                            {item.category}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">{item.title}</h1>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(item.date), "MMMM d, yyyy")}</span>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="py-2">
                    <div

                        dangerouslySetInnerHTML={{ __html: item.content }} // Assuming content could be HTML, if not just render as text
                    />
                </div>

                {/* Fallback if content is plain text and not HTML logic above handles both if well structured, but let's be safe if it's just text db field */}
                {/* If content is known to be plain text, replace div above with: <p className="whitespace-pre-wrap">{item.content}</p> */}
                {/* Assuming HTML based on notification pattern */}

                <Separator className="my-8" />
            </div>
        </div>
    );
}
