import { CurrentAffairForm } from "../current-affair-form";

export default function CreateCurrentAffairPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Create Current Affair</h2>
                <p className="text-muted-foreground">Add a new current affair item.</p>
            </div>
            <CurrentAffairForm />
        </div>
    );
}
