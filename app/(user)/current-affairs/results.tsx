
import { getCurrentAffairs } from "@/app/actions/current-affairs";
import { CurrentAffairsList } from "@/components/current-affairs/current-affairs-list";

interface CurrentAffairsResultsProps {
    query: string;
    month: string;
}

export async function CurrentAffairsResults({ query, month }: CurrentAffairsResultsProps) {
    const posts = await getCurrentAffairs(query, month);

    return <CurrentAffairsList posts={posts} />;
}
