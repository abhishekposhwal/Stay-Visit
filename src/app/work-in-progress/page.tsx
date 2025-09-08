
import { Button } from "@/components/ui/button";
import { HardHat } from "lucide-react";
import Link from "next/link";

export default function WorkInProgressPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <HardHat className="h-16 w-16 text-accent mb-4" />
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Work in Progress</h1>
      <p className="text-lg text-muted-foreground mb-6">
        This feature is currently under construction. Please check back later!
      </p>
      <Button asChild>
        <Link href="/">Go back to Home</Link>
      </Button>
    </div>
  );
}
