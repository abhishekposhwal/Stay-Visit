
import { Mail } from "lucide-react";

export default function InboxPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-16">
        <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-6 text-3xl md:text-4xl font-bold">Inbox</h1>
        <p className="mt-2 text-muted-foreground">Your messages will appear here.</p>
      </div>
    </div>
  );
}
