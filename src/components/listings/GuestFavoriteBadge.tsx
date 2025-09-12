
import { Award } from "lucide-react";

export function GuestFavoriteBadge() {
    return (
        <div className="py-8 border-b">
            <div className="flex items-center gap-4">
                <Award className="h-10 w-10 text-rose-500" />
                <div>
                    <h3 className="text-xl font-bold">Guest favorite</h3>
                    <p className="text-sm text-muted-foreground">One of the most-loved homes on StayVisit, according to guests.</p>
                </div>
            </div>
        </div>
    )
}
