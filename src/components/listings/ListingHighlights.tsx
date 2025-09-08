
import { DoorOpen, Medal, Sparkles } from 'lucide-react';

const highlights = [
    {
        icon: <DoorOpen className="h-6 w-6" />,
        title: 'Self check-in',
        subtitle: 'Check yourself in with the lockbox.',
    },
    {
        icon: <Medal className="h-6 w-6" />,
        title: 'Superhost',
        subtitle: 'Superhosts are experienced, highly-rated hosts who are committed to providing great stays for guests.',
    },
    {
        icon: <Sparkles className="h-6 w-6" />,
        title: 'Clean and tidy',
        subtitle: '15 recent guests said this place was sparkling clean.',
    },
]

export function ListingHighlights() {
    return (
        <div className="py-8 border-b">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {highlights.map((highlight) => (
                    <div key={highlight.title} className="flex items-start gap-4">
                        {highlight.icon}
                        <div>
                            <h3 className="font-semibold">{highlight.title}</h3>
                            <p className="text-sm text-muted-foreground">{highlight.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
